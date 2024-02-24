//**************************************
// 手のポーズ検出サンプルアプリ
//**************************************

//======================================
// モジュールのインポート
//======================================
// 手のポーズ検出モデル
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
// TensorFlow.js
import * as tf from "@tensorflow/tfjs-core";
// WASMバックエンド
import * as tfjsWasm from "@tensorflow/tfjs-backend-wasm";
// CPUバックエンド(JavaScriptのみで動作)
import "@tensorflow/tfjs-backend-cpu";

//======================================
// 出力先のHTML要素取得
//======================================
const video = document.querySelector("#video");
const canvas = document.querySelector("#output");
const msgBox = document.querySelector("#msgBox");
const log = document.querySelector("#log");

//======================================
// 固定値の設定
//======================================
const VIDEO_WIDTH = 360;
const VIDEO_HEIGHT = 450;
const WARMUP_LOOP = 5;

//======================================
// グローバル変数の定義
//======================================
let loopCount = 0;
let totalTime = 0;
let logMsg = "";
let detector = null;

//======================================
// URLからパラメータ取得（DEMO,BACKEND)
//======================================
//現在のURLを取得
const url = new URL(location.href);
// URLSearchParamsオブジェクト取得
const params = url.searchParams;
// デモか？(true/false)
const DEMO = JSON.parse(params.get("DEMO"));
// 使用するバックエンドは？(wasm/cpu)
const BACKEND = params.get("BACKEND");

//======================================
// バックエンドの初期化
//======================================
async function setBackend() {
  // WASMバックエンドが利用するwasmファイルを指定;
  if (BACKEND === "wasm") {
    const baseUrl =
      "https://cdn.jsdelivr.net/npm/" +
      "@tensorflow/tfjs-backend-wasm@" +
      tfjsWasm.version_wasm +
      "/dist/";
    tfjsWasm.setWasmPaths({
      "tfjs-backend-wasm.wasm": baseUrl + "tfjs-backend-wasm.wasm",
      "tfjs-backend-wasm-simd.wasm": baseUrl + "tfjs-backend-wasm-simd.wasm",
      "tfjs-backend-wasm-threaded-simd.wasm":
        baseUrl + "tfjs-backend-wasm-threaded-simd.wasm",
    });
  }

  // iOSの不具合ためマルチスレッド機能を無効化
  const ua = navigator.userAgent;
  if (ua.indexOf("iPhone") > 0 || ua.indexOf("iPad") > 0) {
    writeLog("iOSの不具合のためマルチスレッド無効化");
    tf.env().set("WASM_HAS_MULTITHREAD_SUPPORT", false);
  }

  //バックエンドを設定(wasm/cpu)
  const backendResult = await tf.setBackend(BACKEND).catch(asyncError);
  if (backendResult) {
    writeLog("setBackend 成功");
  } else {
    writeLog("setBackend 失敗");
    throw new Error("setBackend 失敗");
  }

  //バックエンドの初期化待ち
  await tf.ready().catch(asyncError);
  writeLog("バックエンド初期化 完了");

  //バックエンドの環境確認
  writeLog("設定済のバックエンド：" + tf.getBackend());

  // WASMバックエンド環境確認
  if (BACKEND === "wasm") {
    // マルチスレッド対応は？
    const threadSupport = await tf
      .env()
      .getAsync("WASM_HAS_MULTITHREAD_SUPPORT")
      .catch(asyncError);
    writeLog("マルチスレッド対応:" + threadSupport);

    // 生成スレッド数は？
    const threadCount = tfjsWasm.getThreadsCount();
    writeLog("生成スレッド数:" + threadCount);

    // SIMD対応は？
    const simdSupport = await tf
      .env()
      .getAsync("WASM_HAS_SIMD_SUPPORT")
      .catch(asyncError);
    writeLog("SIMD対応:" + simdSupport);
  }
}

//======================================
// ビデオの再生
//======================================
async function setVideo() {
  //パラメータ設定
  video.width = VIDEO_WIDTH;
  video.height = VIDEO_HEIGHT;
  // video.src = "video/handpose_video_360x450.mp4";
  const cameraSetting = {
    audio: false,
    video: {
      width: VIDEO_WIDTH,
      height: VIDEO_HEIGHT,
      facingMode: "environment",
    },
  };

  navigator.mediaDevices
    .getUserMedia(cameraSetting)
    .then((mediaStream) => {
      video.srcObject = mediaStream;
    })
    .catch((err) => {
      console.log(err.toString());
    });

  // ロード
  video.load();
  writeLog("ビデオをロード中");

  // 再生
  await video.play().catch(asyncError);
  writeLog("ビデオ再生中");
}

//======================================
// 手の検出器を生成
//======================================
async function setDetector() {
  //モデルの取得
  const model = handPoseDetection.SupportedModels.MediaPipeHands;

  //検出器の構成
  const detectorConfig = {
    runtime: "tfjs", //固定値
    maxHands: 1, //検出する手の最大数
    modelType: "lite", //lite:速度優先、full:精度優先
  };

  //検出器の生成
  detector = await handPoseDetection
    .createDetector(model, detectorConfig)
    .catch(asyncError);
  if (detector) {
    writeLog("detector 生成成功");
  } else {
    writeLog("detector 生成失敗");
  }
}

//======================================
// 手のポーズ検出（繰り返し）
//======================================
async function detectHand() {
  // 検出繰り返し回数（デモは3000回、計測時は15回）
  const MAX_LOOP = DEMO ? 3000 : 15;

  // 繰り返し回数のカウントアップ
  loopCount++;

  // 手のポーズ検出と所要時間計測
  const startTime = performance.now();
  const hands = await detector.estimateHands(video).catch(asyncError);
  const endTime = performance.now();
  const processTime = endTime - startTime;

  // 繰り返しがウォームアップ回数を超えているか？
  if (loopCount > WARMUP_LOOP) {
    // 超えている場合はログ表示と計測値の積算
    writeLog(
      loopCount - WARMUP_LOOP + "回目の計測:" + processTime.toFixed(2) + "msec"
    );
    totalTime += processTime; //積算
  } else {
    // 超えていない場合はログ表示のみ
    writeLog(
      "#" + loopCount + "ウォームアップ中:" + processTime.toFixed(2) + "msec"
    );
  }

  // 手の検出があるか？
  if (hands.length) {
    // 検出があればキーポイントを描画
    drawResult(hands[0].keypoints);
  } else {
    writeLog("手の検出なし");
  }

  // 最大繰り返し回数に到達？
  if (loopCount < MAX_LOOP) {
    // 未到達の場合は検出処理を再度呼び出し
    requestAnimationFrame(detectHand);
  } else {
    // 到達の場合はビデオ停止、平均処理時間を出力
    video.pause();
    const averageTime = (totalTime / (MAX_LOOP - WARMUP_LOOP)).toFixed(2);
    writeLog("平均処理時間:" + averageTime + "msec");
  }
}

//======================================
// キーポイントを描画
//======================================
function drawResult(keypoints) {
  // 指ごとに線で結ぶキーポイントの配列
  const fingerLookup = {
    thumb: [0, 1, 2, 3, 4], //親指
    indexFinger: [0, 5, 6, 7, 8], //人差し指
    middleFinger: [0, 9, 10, 11, 12], //中指
    ringFinger: [0, 13, 14, 15, 16], //薬指
    pinky: [0, 17, 18, 19, 20], //小指
  };

  // ビデオに上書きするcanvasを生成
  canvas.width = VIDEO_WIDTH;
  canvas.height = VIDEO_HEIGHT;
  const ctx = canvas.getContext("2d");

  // canvasをクリア
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 指の名前リストを取得
  const fingers = Object.keys(fingerLookup);
  for (let i = 0; i < fingers.length; i++) {
    // 指ごとのキーポイント間を線で描画
    const finger = fingers[i];
    const points = fingerLookup[finger].map((index) => keypoints[index]);
    drawLine(ctx, points);
  }

  // キーポイントの点を描画
  for (let i = 0; i < keypoints.length; i++) {
    drawPoint(ctx, keypoints[i].x, keypoints[i].y);
  }
}

//======================================
// 指定されたポイント間を結ぶ線を描画
//======================================
function drawLine(ctx, points) {
  // 線の色と幅を設定
  ctx.strokeStyle = "red";
  ctx.lineWidth = 4;

  // パスを初期化
  ctx.beginPath();

  // パス始点の移動
  ctx.moveTo(points[0].x, points[0].y);

  // ポイント間をパスでつなぐ
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }

  // 線を描画
  ctx.stroke();
}

//======================================
// 指定されポイントに四角形の点を描画
//======================================
function drawPoint(ctx, x, y) {
  // 四角形の色を指定
  ctx.fillStyle = "blue";

  //四角形のサイズ
  const POINT_WIDTH = 10;
  const POINT_HEIGHT = 10;

  // パスを初期化
  ctx.beginPath();

  // 四角形の座標と大きさを指定
  ctx.rect(
    x - POINT_WIDTH / 2,
    y - POINT_HEIGHT / 2,
    POINT_WIDTH,
    POINT_HEIGHT
  );

  // 四角形を描画
  ctx.fill();
}

//======================================
// ログを出力
//======================================
function writeLog(msg) {
  // タイトル下にメッセージ出力（1行）
  msgBox.innerText = msg;

  // ビデオ下のボックスにログ出力
  if (logMsg.length > 2000) {
    // 2000文字以上でログをクリア
    logMsg = "";
  }
  logMsg += msg + "\n";
  log.value = logMsg;

  // コンソールログ出力
  console.log(msg);
}

//======================================
// 非同期処理のエラーハンドラー
//======================================
function asyncError(e) {
  // エラーメッセージを出力
  const str = e.toString();
  writeLog(str);

  // 強制終了
  throw new Error(str);
}

//======================================
// メインルーチン
//======================================
async function main() {
  await setBackend(); //バックエンド初期化
  await setVideo(); //ビデオの再生
  await setDetector(); //検出器の生成
  await detectHand(); //手のポーズ検出
}

main();

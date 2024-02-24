// モデルのインポート
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
// TensorFlow.jsのインポート
import * as tf from "@tensorflow/tfjs-core";
// JavaScriptのみで動作するCPUバックエンドのインポート
import "@tensorflow/tfjs-backend-cpu";

(async () => {
  //バックエンドをCPU(JavaScriptのみ）に設定
  await tf.setBackend("cpu");

  //TensorFlowの準備待ち
  await tf.ready();
  console.log("back-end:" + tf.getBackend() + " ready!");

  //TensorFlowの環境確認
  console.log(tf.env().features);

  //画像データへの参照取得
  const handImage = [
    document.querySelector("#hand01"),
    document.querySelector("#hand02"),
    document.querySelector("#hand03"),
    document.querySelector("#hand04"),
  ];

  //モデルの取得
  const model = handPoseDetection
        .SupportedModels.MediaPipeHands;

  //検出器の構成
  const detectorConfig = {
    runtime: "tfjs", //固定値
    maxHands: 2, //検出する手の最大数
    modelType: "lite", //lite:速度優先、full:精度優先
  };

  //検出器の生成
  const detector = await handPoseDetection
    .createDetector(
      model,
      detectorConfig
  );

  //入力データの扱い
  const estimationConfig = {
    flipHorizontal: true, //画像を左右反転する
  };

  let processTime = 0; //検出にかかった合計時間

  //４枚の画像を順に処理
  for (let i = 0; i < 4; i++) {

    let startTime = performance.now(); //処理開始
    const hands = await detector.estimateHands(
        handImage[i], estimationConfig); //手を検出
    const endTime = performance.now(); //処理終了

    processTime += endTime - startTime; //所要時間を積算
    console.dir(hands); //検出結果をログ出力
  }
  
  //処理時間の合計をログ出力
  console.log("processTime:" + processTime.toFixed(2) + "msec");
})();

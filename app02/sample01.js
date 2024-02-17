(async () => {
  //========グルーコード(開始)========
  //WebAssemblyのインスタンス化
  const myObj = await WebAssembly.instantiateStreaming(
    fetch("sample01.wasm")
  );
  
  //WebAssemblyの関数取得
  const { getFactorial } = myObj.instance.exports;
  //========グルーコード(終了)========
  
  //========アプリコード(開始)========
  //HTML要素を取得
  const output = document.querySelector("#output");
  
  // 1～5までの階乗を出力
  let str = "";
  for (i = 1; i <= 5; i++) {
    const ret = getFactorial(i);
    str += i + "!=" + ret + ", ";
  }
  output.innerText = str.toString();
  //========アプリコード(終了)========
})();
  
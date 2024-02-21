// ライブラリに登録するJavaScript関数の定義
function returnJS(code) {
  console.log("Lib: returnJS()");
  onWasmAppReady(code);
}

// ライブラリに関数を登録
mergeInto(
  LibraryManager.library, 
  { returnJS }
  );

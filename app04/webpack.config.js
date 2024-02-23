module.exports = {
   
  devServer: {
    static: "./",   //静的ファイルのディレクトリ
    open: true,     //サーバー起動時にブラウザを開く
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    }
  },

  // webpackのバンドル機能は利用しないので
  // 空白のエントリーポイントを設定
  entry: `./tmp/index.js`,
  output: {path: `${__dirname}/tmp`,filename: "main.js",},
  mode: "development"

};

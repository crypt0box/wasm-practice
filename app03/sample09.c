#include <stdio.h>
#include <emscripten/emscripten.h>

// 呼びだすJavaScriptの関数を定義
EM_JS(
    void,       //戻り値の型
    returnJS,   //関数名
    (int code), //引数
    {
        onWasmAppReady(code);
    });

// エントリーポイント
int main(int argc, char **argv)
{
    printf("WASM: main() start\n");
    int returnCode = 15;
    
    // EM_JSマクロで定義したJavaScript関数を呼び出す
    printf("WASM: code=%d\n",returnCode);

    returnJS(returnCode);
    
    return 0;
}
#include <stdio.h>
#include <emscripten/emscripten.h>

EMSCRIPTEN_KEEPALIVE
int getSquare(int n)
{
    // 戻り値
    int ret;

    // 引数の値をコンソールへ出力
    printf("WASM: input=%d\n", n);

    // 2乗を計算
    ret = n * n;

    // 結果をコンソールへ出力
    printf("WASM: return=%d\n", ret);

    return ret;
}

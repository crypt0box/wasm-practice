#include <stdio.h>
#include <emscripten/emscripten.h>

EMSCRIPTEN_KEEPALIVE
char* inputStr(char *str)
{
    // 引数の値をコンソールへ出力
    printf("WASM: input=%s\n", str);
           
    // 引数を戻り値に代入
    char* ret=str;
           
    // 結果をコンソールへ出力
    printf("WASM: return=%s\n", ret);

    return ret;
}

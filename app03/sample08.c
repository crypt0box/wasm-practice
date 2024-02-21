#include <stdio.h>
#include <emscripten/emscripten.h>

EMSCRIPTEN_KEEPALIVE
int sumArray32(int *array, int size)
{
    // 戻り値
    int ret = 0;

    for (int i = 0; i < size; i++)
    {
        // 引数の値をコンソールへ出力
        printf("WASM: input[%d]=%d\n", i, array[i]);
        // 配列の要素の値を加算
        ret += array[i];
    }

    // 結果をコンソールへ出力
    printf("WASM: return=%d\n", ret);

    return ret;
}

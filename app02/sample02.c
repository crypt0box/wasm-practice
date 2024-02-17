#include <stdio.h>
#include <emscripten/emscripten.h>

EMSCRIPTEN_KEEPALIVE
int getFactorial(int n)
{
    // 一時変数
    int tmp = 1;

    // 引数の値をコンソールへ出力
    printf("input=%d\n",n);

    // 階乗を計算
    for (int i = 1; i <= n; i++)
    {
        tmp = tmp * i;
    };

    // 結果をコンソールへ出力
    printf("result=%d\n", tmp);

    return tmp;
}

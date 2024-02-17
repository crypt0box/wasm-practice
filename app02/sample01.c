#include <emscripten/emscripten.h>

EMSCRIPTEN_KEEPALIVE
int getFactorial(int n)
{
    // 一時変数
    int tmp = 1;

    // 階乗を計算
    for (int i = 1; i <= n; i++)
    {
        tmp = tmp * i;
    };

    return tmp;
}

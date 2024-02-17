#include <stdio.h>
// #include <emscripten/emscripten.h>

//EMSCRIPTEN_KEEPALIVE
int getFactorial(int n)
{

    // ループカウンター
    int i;

    // 一時変数
    int tmp = 1;

    // 階乗を計算
    for (i = 1; i <= n; i++)
    {
        tmp = tmp * i;
    };

    return tmp;
}

// メイン関数（WebAssemblyのインスタンス化時に呼ばれる）
int main(int argc, char **argv)
{
    printf("sample03 start!!\n");
    for (int i = 1; i <= 5; i++)
    {
        printf("%d!=%d\n", i, getFactorial(i));
    }
    return 0;
}
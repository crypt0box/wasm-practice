#include <stdio.h>

// 外部ファイルに定義された関数
extern void returnJS(int);

// エントリーポイント
int main(int argc, char **argv)
{
    printf("WASM: main() start\n");
    
    // JavaScript側へ渡す値
    int returnCode = 15;
    printf("WASM: code=%d\n", returnCode);

    // JavaScriptライブラリファイルの関数を呼びだす
    returnJS(returnCode);
        
    return 0;
}
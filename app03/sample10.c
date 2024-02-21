#include <stdio.h>
#include <emscripten/emscripten.h>

// エントリーポイント
int main(int argc, char **argv)
{
    printf("WASM: main() start\n");
    
    // JavaScript側へ渡す値
    int returnCode = 15;
    printf("WASM: code=%d\n", returnCode);

    // JavaScript側の関数を呼びだす $0=returnCode
    EM_ASM({
        onWasmAppReady($0);
    },
        returnCode);

    return 0;
}
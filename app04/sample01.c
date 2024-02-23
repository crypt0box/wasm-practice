#include <emscripten/emscripten.h>

EMSCRIPTEN_KEEPALIVE
void editArray(int *arr, int len)
{
    for (int i = 0; i < len; i++)
    {
        arr[i] += 3;
    }
}

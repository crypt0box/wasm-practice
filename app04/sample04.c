#include <stdio.h>
#include <unistd.h>

void *func(void *arg)
{
    // 引数を整数として受け取り
    int *label = (int *)arg;

    //関数の処理をログに出力 
    for (int i = 0; i < 5; i++)
    {
        printf("function#%d: %d\n", *label, i);
        sleep(1);
    }

    // 終了
    printf("function#%d: complete.....\n", *label);
    return NULL;
}

int main(void)
{
    // ログ出力時の識別番号
    int label[2] = {1, 2};
 
    // サブルーチン呼び出し
    func(&label[0]);
    func(&label[1]);

    return 0;
}
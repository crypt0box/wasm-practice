#include <stdio.h>
#include <pthread.h>
#include <unistd.h>

void *func(void *arg)
{
    // 引数を整数として受け取り
    int *label = (int *)arg;

    // //関数の処理をログに出力
    for (int i = 0; i < 5; i++)
    {
        printf("thread#%d: %d\n", *label, i);
        sleep(1);
    }

    // 終了
    printf("thread#%d: complete.....\n", *label);
    return NULL;
}

int main(void)
{
    int ret;               // 処理結果コードを受ける変数
    pthread_t t_id[2];     // スレッドごとの識別子
    int label[2] = {1, 2}; // ログ出力時の識別番号

    // スレッドを生成してサブルーチン呼び出し
    ret = pthread_create(&t_id[0], NULL, func, &label[0]);
    printf("thread create#1 ret:%d\n", ret);
    ret = pthread_create(&t_id[1], NULL, func, &label[1]);
    printf("thread create#2 ret:%d\n", ret);

    // スレッドの終了を待機
    ret = pthread_join(t_id[0], NULL);
    printf("thread join#1 ret:%d\n", ret);
    ret = pthread_join(t_id[1], NULL);
    printf("thread join#2 ret:%d\n", ret);

    return 0;
}
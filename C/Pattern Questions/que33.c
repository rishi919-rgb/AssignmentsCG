#include <stdio.h>
int main () {
    int n = 5;
    for (int i = 1; i <= n; i++)
    {
        for (int j = 5; j >= i; j--)
        {
           if (i==1||i==n)
           {
           printf("*");
           }else if (j==5||j==i)
           {
           printf("*");
           }else printf(" ");
        }
        printf("\n");
    }
    
}
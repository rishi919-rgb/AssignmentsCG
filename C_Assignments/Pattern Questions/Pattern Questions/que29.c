#include <stdio.h>
int main () {
     for (int i = 0; i <= 5; i++)
    {
       for (int j = 0; j <=6-i; j++)
       {
         printf(" ");
       }
       for (int k = 1; k < ((2*i)); k++)
       {
        printf("*");
       }
       printf("\n");
    }
     for (int i = 0; i <= 5; i++)
   {
    for (int j = 5; j >= 5-i; j--)
    {
       printf(" ");
    }
    for (int k = 5; k >= i ; k--)
    {
       printf("*");
    }
     for (int k = 5; k > i ; k--)
    {
       printf("*");
    }
     printf("\n");
   }
}
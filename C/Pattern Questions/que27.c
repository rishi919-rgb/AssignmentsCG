#include <stdio.h>
int main () {
    for (int i = 0; i < 5; i++)
    {
       for (int j = 5; j > 5-i; j--)
       {
        printf("  ");
       }
       for (int k = 1; k < 2*(5-i); k++)
       {
      printf("%d ",k);
       }
       printf("\n");
    }
    
}
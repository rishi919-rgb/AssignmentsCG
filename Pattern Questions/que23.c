#include <stdio.h>
int main () {
    for (int i = 70; i > 65; i--)
    {
       for (int j = 0; j <= 70-i; j++)
       {
       printf("  ");
       }
       for (int j = 65; j <i ; j++)
       {
       printf(" %c",j);
       }
       printf("\n");
       
    }
    
}
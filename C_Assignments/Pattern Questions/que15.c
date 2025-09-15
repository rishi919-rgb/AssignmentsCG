#include <stdio.h>
int main () {
    for (int i = 65; i <= 70; i++)
    {
       for (int j = 0; j < 70-i; j++)
       {
       printf("   ");
       }
       for (int k = 65; k < (2*i-'A')-1; k++)
       {
        printf(" %c ",k);
       }
       printf("\n");
    }    
}
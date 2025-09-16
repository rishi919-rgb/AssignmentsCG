#include <stdio.h>
int main () {
    for (int i = 65; i <= 70; i++)
    {
       for (int j = 65; j < i; j++)
       {
        printf("%c ",j);
       }
       for (int j = i; j >=65 ; j--)
       {
      printf("%c ",j);
       }
       
       printf("\n");
    }
    
}
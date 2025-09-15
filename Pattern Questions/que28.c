#include <stdio.h>
int main () {
    for (int i = 65; i <= 70; i++)
    {
        for (int j = 70; j >= 70-i+'A'; j--)
        {
          printf("  ");
        }
        for (int k = 65; k < 2*(70-i+32); k++)
        {
           printf("%c ",k);
        }
       printf("\n"); 
    }
    
}
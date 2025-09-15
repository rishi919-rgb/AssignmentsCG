#include <stdio.h>
int main () {
    for (int i = 65; i <= 70; i++)
    {
       for (int j = 65; j<=70-(i-65); j++)
       {
       printf(" ");
       } 
       for (int j = 65; j < i; j++)
       {
        printf("%c",j);
       }
       
       printf("\n");
    }
    
}
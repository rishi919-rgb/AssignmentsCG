// Que10
#include <stdio.h>
int main () {
    for (int i = 1; i <= 5; i++)
    {
       for (int j = 5; j >=0; j--)
       {
        if (i>j)
        {
           printf("*");
        }else printf(" ");
        
       }printf("\n");
       
    }
    
}
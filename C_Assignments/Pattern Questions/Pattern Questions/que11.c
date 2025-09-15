#include <stdio.h>
int main () {
    for (int i = 0; i <=5 ; i++)
    {
        for (int j = 0; j <6-i; j++)
        {
           printf(" ");
        }
        for (int k = 1; k <=i; k++)
        {
           printf("%d",k);
        }
        
        printf("\n");
        
    }
    
}
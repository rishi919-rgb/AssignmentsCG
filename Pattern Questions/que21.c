#include <stdio.h>
int main () {
    for (int i = 5; i >=0 ; i--)
    {
        for (int j = 0; j <6-i; j++)
        {
           printf(" ");
        }
        for (int k = 1; k <=i; k++)
        {
           printf("*");
        }
        
        printf("\n");
        
    }
    
}
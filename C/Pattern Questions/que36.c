#include <stdio.h>
int main () {
    int n=5;
    for (int i = 1; i <= n; i++)
    {
        for (int j = 0; j <= n*2; j++)
        {
            if (i>j)printf(" ");
            else if(i>j-i) printf("%c",j-i+'A');
        }
       printf("\n"); 
    }
    
}
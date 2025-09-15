#include <stdio.h>
int main () {
    int n=5;
    for (int i = n*2; i >= 0; i--)
    {
        for (int j = 0; j <= n*2; j++)
        {
           if (j<i-n)
           {
            printf(" ");
           }if (j>i+n)
           {
            printf(" ");
           } 
        }
        for (int k = n*2; k >= 1; k--)
        {
            if (i<=n)
            {
                if(k>=n-i && k<=n+i)
                 if (k <= n) 
                        printf("%c", 'A' + (k-(n-i)));  
                    else 
                        printf("%c", 'A' + ((n+i)-k));
            } else
            { if(k>=i -n && k<=3*n-i)
                 if (k <= n) 
                        printf("%c", 'A' + (k-(i-n)));  
                    else 
                        printf("%c", 'A' + ((3*n-i)-k));
            }  
        }
        printf("\n");
    }
}
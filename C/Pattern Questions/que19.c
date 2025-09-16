#include <stdio.h>
int main () {
    int j;
    int count=1;
    for (int i = 0; i < 5; i++)
    {
        
       for ( j = count; j <=count+i; j++)
       {
       printf("%d ",j);

       }count=j;
       printf("\n");
    }
    
}
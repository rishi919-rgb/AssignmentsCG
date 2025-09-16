#include <stdio.h>
int main () {
    int count=65;
    int j=0;
    for (int i = 65; i <= 71; i++)
    {
       for ( j = count; j < count+(i-'A'); j++)
       {
       printf("%c ",j);
       }
       count=j;
       printf("\n");
    }
    
}
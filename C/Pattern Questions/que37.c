#include <stdio.h>
int main () {
    int n = 5;
   for (int i = n; i >= 0; i--)
   {
  for (int j = n; j >= 0; j--)
  {
   if (j<i)
   {
    printf("*");
   }else printf(" ");
  }
  printf("\n");
   }
    
}
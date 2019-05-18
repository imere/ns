# 走进后端工程师的世界

```c
// name.c
#include <stdio.h>
int main(int argc, const char *argv[])
{
  printf("count: %d\n", argc);
  int i = 0;
  for (; i < argc; ++i)
  {
    printf("%s\n", argv[i]);
  }
  printf("Hello World");
  return 0;
}
```

```bash
gcc ./name.c
./a.out
```
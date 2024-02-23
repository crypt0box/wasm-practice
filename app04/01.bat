emcc sample01.c ^
-o sample01.js ^
-s EXPORTED_RUNTIME_METHODS=cwrap ^
-s ENVIRONMENT=web ^
-s NO_FILESYSTEM=1 ^
-s EXPORTED_FUNCTIONS=_malloc,_free ^
-O3 ^
-msimd128


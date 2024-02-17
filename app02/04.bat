emcc sample02.c ^
-o sample02.js ^
-sEXPORTED_RUNTIME_METHODS=cwrap ^
-sENVIRONMENT=web ^
-sNO_FILESYSTEM=1 ^
--no-entry ^
-O3

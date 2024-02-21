emcc sample08.c ^
-o sample08.js ^
-sEXPORTED_RUNTIME_METHODS=ccall ^
-sENVIRONMENT=web ^
-sNO_FILESYSTEM=1 ^
--no-entry ^
-sEXPORTED_FUNCTIONS=_malloc,_free


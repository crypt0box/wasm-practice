emcc sample04.c ^
-o sample04.js ^
-sEXPORTED_RUNTIME_METHODS=cwrap ^
-sENVIRONMENT=web ^
-sNO_FILESYSTEM=1 ^
--no-entry ^
-sEXPORTED_FUNCTIONS=_malloc,_free


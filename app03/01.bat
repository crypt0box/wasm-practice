emcc sample01.c ^
-o sample01.js ^
-sEXPORTED_RUNTIME_METHODS=cwrap ^
-sENVIRONMENT=web ^
-sNO_FILESYSTEM=1 ^
--no-entry 

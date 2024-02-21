emcc sample05.c ^
-o sample05.js ^
-sEXPORTED_RUNTIME_METHODS=ccall ^
-sENVIRONMENT=web ^
-sNO_FILESYSTEM=1 ^
--no-entry 

emcc sample03.c ^
-o sample03.js ^
-sEXPORTED_RUNTIME_METHODS=cwrap ^
-sENVIRONMENT=web ^
-sNO_FILESYSTEM=1 ^
--no-entry 

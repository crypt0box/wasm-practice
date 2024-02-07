emcc add100.c ^
-o add100.wasm ^
-s "EXPORTED_FUNCTIONS=['_add100']" ^
--no-entry
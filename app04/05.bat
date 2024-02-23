emcc sample05.c ^
-o sample05.js ^
-s ENVIRONMENT=web,worker ^
-s NO_FILESYSTEM=1 ^
-s EXIT_RUNTIME ^
-pthread ^
-s PROXY_TO_PTHREAD


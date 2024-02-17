var b;
b || (b = typeof Module !== 'undefined' ? Module : {});
var d = Object.assign({}, b);
if (b.ENVIRONMENT) {
  throw Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)");
}
var p = "";
"undefined" != typeof document && document.currentScript && (p = document.currentScript.src);
p = 0 !== p.indexOf("blob:") ? p.substr(0, p.replace(/[?#].*/, "").lastIndexOf("/") + 1) : "";
if ("object" != typeof window && "function" != typeof importScripts) {
  throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
}
var aa = b.print || console.log.bind(console), q = b.printErr || console.error.bind(console);
Object.assign(b, d);
d = null;
Object.getOwnPropertyDescriptor(b, "fetchSettings") && r("`Module.fetchSettings` was supplied but `fetchSettings` not included in INCOMING_MODULE_JS_API");
v("arguments", "arguments_");
v("thisProgram", "thisProgram");
v("quit", "quit_");
y("undefined" == typeof b.memoryInitializerPrefixURL, "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");
y("undefined" == typeof b.pthreadMainPrefixURL, "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");
y("undefined" == typeof b.cdInitializerPrefixURL, "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");
y("undefined" == typeof b.filePackagePrefixURL, "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
y("undefined" == typeof b.read, "Module.read option was removed (modify read_ in JS)");
y("undefined" == typeof b.readAsync, "Module.readAsync option was removed (modify readAsync in JS)");
y("undefined" == typeof b.readBinary, "Module.readBinary option was removed (modify readBinary in JS)");
y("undefined" == typeof b.setWindowTitle, "Module.setWindowTitle option was removed (modify setWindowTitle in JS)");
y("undefined" == typeof b.TOTAL_MEMORY, "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY");
v("asm", "wasmExports");
v("read", "read_");
v("readAsync", "readAsync");
v("readBinary", "readBinary");
v("setWindowTitle", "setWindowTitle");
y(!0, "worker environment detected but not enabled at build time.  Add 'worker' to `-sENVIRONMENT` to enable.");
y(!0, "node environment detected but not enabled at build time.  Add 'node' to `-sENVIRONMENT` to enable.");
y(!0, "shell environment detected but not enabled at build time.  Add 'shell' to `-sENVIRONMENT` to enable.");
var z;
b.wasmBinary && (z = b.wasmBinary);
v("wasmBinary", "wasmBinary");
var noExitRuntime = b.noExitRuntime || !0;
v("noExitRuntime", "noExitRuntime");
"object" != typeof WebAssembly && r("no native wasm support detected");
var A, B, C = !1;
function y(a, c) {
  a || r("Assertion failed" + (c ? ": " + c : ""));
}
var D, F, G;
y(!b.STACK_SIZE, "STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time");
y("undefined" != typeof Int32Array && "undefined" !== typeof Float64Array && void 0 != Int32Array.prototype.subarray && void 0 != Int32Array.prototype.set, "JS engine does not provide full typed array support");
y(!b.wasmMemory, "Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally");
y(!b.INITIAL_MEMORY, "Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically");
var H;
function ba() {
  var a = I();
  y(0 == (a & 3));
  0 == a && (a += 4);
  G[a >> 2] = 34821223;
  G[a + 4 >> 2] = 2310721022;
  G[0] = 1668509029;
}
function J() {
  if (!C) {
    var a = I();
    0 == a && (a += 4);
    var c = G[a >> 2], e = G[a + 4 >> 2];
    34821223 == c && 2310721022 == e || r(`Stack overflow! Stack cookie has been overwritten at ${K(a)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${K(e)} ${K(c)}`);
    1668509029 != G[0] && r("Runtime error: The application has corrupted its heap memory area (address zero)!");
  }
}
var L = new Int16Array(1), M = new Int8Array(L.buffer);
L[0] = 25459;
if (115 !== M[0] || 99 !== M[1]) {
  throw "Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)";
}
var O = [], ca = [], da = [], P = !1;
function ea() {
  var a = b.preRun.shift();
  O.unshift(a);
}
y(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
y(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
y(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
y(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
var Q = 0, R = null, S = null, T = {};
function fa() {
  Q++;
  b.monitorRunDependencies && b.monitorRunDependencies(Q);
  y(!T["wasm-instantiate"]);
  T["wasm-instantiate"] = 1;
  null === R && "undefined" != typeof setInterval && (R = setInterval(() => {
    if (C) {
      clearInterval(R), R = null;
    } else {
      var a = !1, c;
      for (c in T) {
        a || (a = !0, q("still waiting on run dependencies:")), q("dependency: " + c);
      }
      a && q("(end of list)");
    }
  }, 10000));
}
function r(a) {
  if (b.onAbort) {
    b.onAbort(a);
  }
  a = "Aborted(" + a + ")";
  q(a);
  C = !0;
  throw new WebAssembly.RuntimeError(a);
}
function ha() {
  r("Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with -sFORCE_FILESYSTEM");
}
b.FS_createDataFile = function() {
  ha();
};
b.FS_createPreloadedFile = function() {
  ha();
};
function ia(a) {
  return a.startsWith("data:application/octet-stream;base64,");
}
function U(a) {
  return function() {
    y(P, `native function \`${a}\` called before runtime initialization`);
    var c = B[a];
    y(c, `exported native function \`${a}\` not found`);
    return c.apply(null, arguments);
  };
}
var V;
V = "sample02.wasm";
if (!ia(V)) {
  var ja = V;
  V = b.locateFile ? b.locateFile(ja, p) : p + ja;
}
function ka(a) {
  if (a == V && z) {
    return new Uint8Array(z);
  }
  throw "both async and sync fetching of the wasm failed";
}
function la(a) {
  return z || "function" != typeof fetch ? Promise.resolve().then(() => ka(a)) : fetch(a, {credentials:"same-origin"}).then(c => {
    if (!c.ok) {
      throw "failed to load wasm binary file at '" + a + "'";
    }
    return c.arrayBuffer();
  }).catch(() => ka(a));
}
function ma(a, c, e) {
  return la(a).then(g => WebAssembly.instantiate(g, c)).then(g => g).then(e, g => {
    q("failed to asynchronously prepare wasm: " + g);
    V.startsWith("file://") && q("warning: Loading from a file URI (" + V + ") is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing");
    r(g);
  });
}
function na(a, c) {
  var e = V;
  z || "function" != typeof WebAssembly.instantiateStreaming || ia(e) || "function" != typeof fetch ? ma(e, a, c) : fetch(e, {credentials:"same-origin"}).then(g => WebAssembly.instantiateStreaming(g, a).then(c, function(f) {
    q("wasm streaming compile failed: " + f);
    q("falling back to ArrayBuffer instantiation");
    return ma(e, a, c);
  }));
}
function v(a, c) {
  Object.getOwnPropertyDescriptor(b, a) || Object.defineProperty(b, a, {configurable:!0, get() {
    r(`\`Module.${a}\` has been replaced by \`${c}\`` + " (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)");
  }});
}
function oa(a) {
  return "FS_createPath" === a || "FS_createDataFile" === a || "FS_createPreloadedFile" === a || "FS_unlink" === a || "addRunDependency" === a || "FS_createLazyFile" === a || "FS_createDevice" === a || "removeRunDependency" === a;
}
(function(a, c) {
  "undefined" !== typeof globalThis && Object.defineProperty(globalThis, a, {configurable:!0, get() {
    W("`" + a + "` is not longer defined by emscripten. " + c);
  }});
})("buffer", "Please use HEAP8.buffer or wasmMemory.buffer");
function pa(a) {
  Object.getOwnPropertyDescriptor(b, a) || Object.defineProperty(b, a, {configurable:!0, get() {
    var c = "'" + a + "' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)";
    oa(a) && (c += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you");
    r(c);
  }});
}
var X = a => {
  for (; 0 < a.length;) {
    a.shift()(b);
  }
}, K = a => {
  y("number" === typeof a);
  return "0x" + (a >>> 0).toString(16).padStart(8, "0");
}, W = a => {
  Y || (Y = {});
  Y[a] || (Y[a] = 1, q(a));
}, Y, qa = [null, [], []], ra = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0, sa = (a, c) => {
  for (var e = c + NaN, g = c; a[g] && !(g >= e);) {
    ++g;
  }
  if (16 < g - c && a.buffer && ra) {
    return ra.decode(a.subarray(c, g));
  }
  for (e = ""; c < g;) {
    var f = a[c++];
    if (f & 128) {
      var t = a[c++] & 63;
      if (192 == (f & 224)) {
        e += String.fromCharCode((f & 31) << 6 | t);
      } else {
        var w = a[c++] & 63;
        224 == (f & 240) ? f = (f & 15) << 12 | t << 6 | w : (240 != (f & 248) && W("Invalid UTF-8 leading byte " + K(f) + " encountered when deserializing a UTF-8 string in wasm memory to a JS string!"), f = (f & 7) << 18 | t << 12 | w << 6 | a[c++] & 63);
        65536 > f ? e += String.fromCharCode(f) : (f -= 65536, e += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023));
      }
    } else {
      e += String.fromCharCode(f);
    }
  }
  return e;
};
function ta(a) {
  var c = b["_" + a];
  y(c, "Cannot call unknown function " + a + ", make sure it is exported");
  return c;
}
function ua(a, c, e, g) {
  var f = {string:h => {
    var l = 0;
    if (null !== h && void 0 !== h && 0 !== h) {
      for (var k = l = 0; k < h.length; ++k) {
        var n = h.charCodeAt(k);
        127 >= n ? l++ : 2047 >= n ? l += 2 : 55296 <= n && 57343 >= n ? (l += 4, ++k) : l += 3;
      }
      var x = l + 1;
      l = va(x);
      y("number" == typeof x, "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
      k = l;
      n = F;
      y("string" === typeof h);
      if (0 < x) {
        x = k + x - 1;
        for (var N = 0; N < h.length; ++N) {
          var m = h.charCodeAt(N);
          if (55296 <= m && 57343 >= m) {
            var za = h.charCodeAt(++N);
            m = 65536 + ((m & 1023) << 10) | za & 1023;
          }
          if (127 >= m) {
            if (k >= x) {
              break;
            }
            n[k++] = m;
          } else {
            if (2047 >= m) {
              if (k + 1 >= x) {
                break;
              }
              n[k++] = 192 | m >> 6;
            } else {
              if (65535 >= m) {
                if (k + 2 >= x) {
                  break;
                }
                n[k++] = 224 | m >> 12;
              } else {
                if (k + 3 >= x) {
                  break;
                }
                1114111 < m && W("Invalid Unicode code point " + K(m) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).");
                n[k++] = 240 | m >> 18;
                n[k++] = 128 | m >> 12 & 63;
              }
              n[k++] = 128 | m >> 6 & 63;
            }
            n[k++] = 128 | m & 63;
          }
        }
        n[k] = 0;
      }
    }
    return l;
  }, array:h => {
    var l = va(h.length);
    y(0 <= h.length, "writeArrayToMemory array must have a length (should be an array or typed array)");
    D.set(h, l);
    return l;
  }};
  a = ta(a);
  var t = [], w = 0;
  y("array" !== c, 'Return type should not be "array".');
  if (g) {
    for (var u = 0; u < g.length; u++) {
      var E = f[e[u]];
      E ? (0 === w && (w = wa()), t[u] = E(g[u])) : t[u] = g[u];
    }
  }
  e = a.apply(null, t);
  return e = function(h) {
    0 !== w && xa(w);
    "string" === c ? (y("number" == typeof h), h = h ? sa(F, h) : "") : h = "boolean" === c ? !!h : h;
    return h;
  }(e);
}
var ya = {emscripten_memcpy_big:(a, c, e) => F.copyWithin(a, c, c + e), fd_write:(a, c, e, g) => {
  for (var f = 0, t = 0; t < e; t++) {
    var w = G[c >> 2], u = G[c + 4 >> 2];
    c += 8;
    for (var E = 0; E < u; E++) {
      var h = a, l = F[w + E], k = qa[h];
      y(k);
      0 === l || 10 === l ? ((1 === h ? aa : q)(sa(k, 0)), k.length = 0) : k.push(l);
    }
    f += u;
  }
  G[g >> 2] = f;
  return 0;
}};
(function() {
  function a(g) {
    B = g = g.exports;
    A = B.memory;
    y(A, "memory not found in wasm exports");
    var f = A.buffer;
    b.HEAP8 = D = new Int8Array(f);
    b.HEAP16 = new Int16Array(f);
    b.HEAP32 = new Int32Array(f);
    b.HEAPU8 = F = new Uint8Array(f);
    b.HEAPU16 = new Uint16Array(f);
    b.HEAPU32 = G = new Uint32Array(f);
    b.HEAPF32 = new Float32Array(f);
    b.HEAPF64 = new Float64Array(f);
    H = B.__indirect_function_table;
    y(H, "table not found in wasm exports");
    ca.unshift(B.__wasm_call_ctors);
    Q--;
    b.monitorRunDependencies && b.monitorRunDependencies(Q);
    y(T["wasm-instantiate"]);
    delete T["wasm-instantiate"];
    0 == Q && (null !== R && (clearInterval(R), R = null), S && (f = S, S = null, f()));
    return g;
  }
  var c = {env:ya, wasi_snapshot_preview1:ya,};
  fa();
  var e = b;
  if (b.instantiateWasm) {
    try {
      return b.instantiateWasm(c, a);
    } catch (g) {
      return q("Module.instantiateWasm callback failed with error: " + g), !1;
    }
  }
  na(c, function(g) {
    y(b === e, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
    e = null;
    a(g.instance);
  });
  return {};
})();
b._getFactorial = U("getFactorial");
b._fflush = U("fflush");
var Aa = () => (Aa = B.emscripten_stack_init)(), I = () => (I = B.emscripten_stack_get_end)(), wa = U("stackSave"), xa = U("stackRestore"), va = U("stackAlloc");
b.dynCall_jiji = U("dynCall_jiji");
b.cwrap = function(a, c, e) {
  return function() {
    return ua(a, c, e, arguments);
  };
};
"writeI53ToI64 writeI53ToI64Clamped writeI53ToI64Signaling writeI53ToU64Clamped writeI53ToU64Signaling readI53FromI64 readI53FromU64 convertI32PairToI53 convertI32PairToI53Checked convertU32PairToI53 zeroMemory exitJS getHeapMax abortOnCannotGrowMemory growMemory isLeapYear ydayFromDate arraySum addDays setErrNo inetPton4 inetNtop4 inetPton6 inetNtop6 readSockaddr writeSockaddr getHostByName initRandomFill randomFill getCallstack emscriptenLog convertPCtoSourceLocation readEmAsmArgs jstoi_q jstoi_s getExecutableName listenOnce autoResumeAudioContext dynCallLegacy getDynCaller dynCall handleException runtimeKeepalivePush runtimeKeepalivePop callUserCallback maybeExit safeSetTimeout asmjsMangle asyncLoad alignMemory mmapAlloc handleAllocatorInit HandleAllocator getNativeTypeSize STACK_SIZE STACK_ALIGN POINTER_SIZE ASSERTIONS uleb128Encode sigToWasmTypes generateFuncType convertJsFunctionToWasm getEmptyTableSlot updateTableMap getFunctionAddress addFunction removeFunction reallyNegative unSign strLen reSign formatString intArrayFromString intArrayToString AsciiToString stringToAscii UTF16ToString stringToUTF16 lengthBytesUTF16 UTF32ToString stringToUTF32 lengthBytesUTF32 stringToNewUTF8 registerKeyEventCallback maybeCStringToJsString findEventTarget findCanvasEventTarget getBoundingClientRect fillMouseEventData registerMouseEventCallback registerWheelEventCallback registerUiEventCallback registerFocusEventCallback fillDeviceOrientationEventData registerDeviceOrientationEventCallback fillDeviceMotionEventData registerDeviceMotionEventCallback screenOrientation fillOrientationChangeEventData registerOrientationChangeEventCallback fillFullscreenChangeEventData registerFullscreenChangeEventCallback JSEvents_requestFullscreen JSEvents_resizeCanvasForFullscreen registerRestoreOldStyle hideEverythingExceptGivenElement restoreHiddenElements setLetterbox softFullscreenResizeWebGLRenderTarget doRequestFullscreen fillPointerlockChangeEventData registerPointerlockChangeEventCallback registerPointerlockErrorEventCallback requestPointerLock fillVisibilityChangeEventData registerVisibilityChangeEventCallback registerTouchEventCallback fillGamepadEventData registerGamepadEventCallback registerBeforeUnloadEventCallback fillBatteryEventData battery registerBatteryEventCallback setCanvasElementSize getCanvasElementSize demangle demangleAll jsStackTrace stackTrace getEnvStrings checkWasiClock wasiRightsToMuslOFlags wasiOFlagsToMuslOFlags createDyncallWrapper setImmediateWrapped clearImmediateWrapped polyfillSetImmediate getPromise makePromise idsToPromises makePromiseCallback ExceptionInfo findMatchingCatch setMainLoop getSocketFromFD getSocketAddress heapObjectForWebGLType heapAccessShiftForWebGLHeap webgl_enable_ANGLE_instanced_arrays webgl_enable_OES_vertex_array_object webgl_enable_WEBGL_draw_buffers webgl_enable_WEBGL_multi_draw emscriptenWebGLGet computeUnpackAlignedImageSize colorChannelsInGlTextureFormat emscriptenWebGLGetTexPixelData __glGenObject emscriptenWebGLGetUniform webglGetUniformLocation webglPrepareUniformLocationsBeforeFirstUse webglGetLeftBracePos emscriptenWebGLGetVertexAttrib __glGetActiveAttribOrUniform writeGLArray registerWebGlEventCallback runAndAbortIfError SDL_unicode SDL_ttfContext SDL_audio GLFW_Window ALLOC_NORMAL ALLOC_STACK allocate writeStringToMemory writeAsciiToMemory".split(" ").forEach(function(a) {
  "undefined" === typeof globalThis || Object.getOwnPropertyDescriptor(globalThis, a) || Object.defineProperty(globalThis, a, {configurable:!0, get() {
    var c = "`" + a + "` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line", e = a;
    e.startsWith("_") || (e = "$" + a);
    c += " (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='" + e + "')";
    oa(a) && (c += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you");
    W(c);
  }});
  pa(a);
});
"run addOnPreRun addOnInit addOnPreMain addOnExit addOnPostRun addRunDependency removeRunDependency FS_createFolder FS_createPath FS_createDataFile FS_createLazyFile FS_createLink FS_createDevice FS_unlink out err callMain abort keepRuntimeAlive wasmMemory wasmTable wasmExports stackAlloc stackSave stackRestore getTempRet0 setTempRet0 writeStackCookie checkStackCookie ptrToString ENV MONTH_DAYS_REGULAR MONTH_DAYS_LEAP MONTH_DAYS_REGULAR_CUMULATIVE MONTH_DAYS_LEAP_CUMULATIVE ERRNO_CODES ERRNO_MESSAGES DNS Protocols Sockets timers warnOnce UNWIND_CACHE readEmAsmArgsArray getCFunc ccall freeTableIndexes functionsInTableMap setValue getValue PATH PATH_FS UTF8Decoder UTF8ArrayToString UTF8ToString stringToUTF8Array stringToUTF8 lengthBytesUTF8 UTF16Decoder stringToUTF8OnStack writeArrayToMemory JSEvents specialHTMLTargets currentFullscreenStrategy restoreOldWindowedStyle ExitStatus flush_NO_FILESYSTEM promiseMap uncaughtExceptionCount exceptionLast exceptionCaught Browser wget SYSCALLS tempFixedLengthArray miniTempWebGLFloatBuffers miniTempWebGLIntBuffers GL emscripten_webgl_power_preferences AL GLUT EGL GLEW IDBStore SDL SDL_gfx GLFW allocateUTF8 allocateUTF8OnStack".split(" ").forEach(pa);
var Z;
S = function Ba() {
  Z || Ca();
  Z || (S = Ba);
};
function Ca() {
  function a() {
    if (!Z && (Z = !0, b.calledRun = !0, !C)) {
      y(!P);
      P = !0;
      J();
      X(ca);
      if (b.onRuntimeInitialized) {
        b.onRuntimeInitialized();
      }
      y(!b._main, 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]');
      J();
      if (b.postRun) {
        for ("function" == typeof b.postRun && (b.postRun = [b.postRun]); b.postRun.length;) {
          var c = b.postRun.shift();
          da.unshift(c);
        }
      }
      X(da);
    }
  }
  if (!(0 < Q)) {
    Aa();
    ba();
    if (b.preRun) {
      for ("function" == typeof b.preRun && (b.preRun = [b.preRun]); b.preRun.length;) {
        ea();
      }
    }
    X(O);
    0 < Q || (b.setStatus ? (b.setStatus("Running..."), setTimeout(function() {
      setTimeout(function() {
        b.setStatus("");
      }, 1);
      a();
    }, 1)) : a(), J());
  }
}
if (b.preInit) {
  for ("function" == typeof b.preInit && (b.preInit = [b.preInit]); 0 < b.preInit.length;) {
    b.preInit.pop()();
  }
}
Ca();


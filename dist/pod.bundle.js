this.Pod = (function() {
  "use strict";
  var runsInPrince$2 = typeof Prince !== "undefined";
  function logInfo$1(info) {
    if (runsInPrince$2) {
      Prince.Log.info(info);
    } else {
      console.log(info);
    }
  }
  var runsInPrince$1 = typeof Prince !== "undefined";
  var handleSeparators = function handleSeparators2() {
    logInfo$1("HANDLING SEPARATORS 02 - 101");
    var separatorNodeList = document.querySelectorAll(".separator");
    var separators = Array.from(separatorNodeList);
    logInfo$1("SEPARATORS", separators.length);
    separators.map(function(separator) {
      var next = separator.nextElementSibling;
      if (next) {
        logInfo$1("NEXT");
        logInfo$1("getYCoordinate(separator)", getYCoordinate(separator));
        logInfo$1("getYCoordinate(next)", getYCoordinate(next));
        if (getYCoordinate(separator) !== getYCoordinate(next)) {
          logInfo$1("HIDE SEPARATOR");
          separator.style.visibility = "hidden";
        } else {
          separator.style.visibility = "visible";
        }
      }
    });
  };
  var getYCoordinate = function getYCoordinate2(element) {
    if (runsInPrince$1) {
      return element.getPrinceBoxes()[0].y;
    } else {
      return element.getBoundingClientRect().top;
    }
  };
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  var fails;
  var hasRequiredFails;
  function requireFails() {
    if (hasRequiredFails) return fails;
    hasRequiredFails = 1;
    fails = function(exec) {
      try {
        return !!exec();
      } catch (error) {
        return true;
      }
    };
    return fails;
  }
  var functionBindNative;
  var hasRequiredFunctionBindNative;
  function requireFunctionBindNative() {
    if (hasRequiredFunctionBindNative) return functionBindNative;
    hasRequiredFunctionBindNative = 1;
    var fails2 = requireFails();
    functionBindNative = !fails2(function() {
      var test = (function() {
      }).bind();
      return typeof test != "function" || test.hasOwnProperty("prototype");
    });
    return functionBindNative;
  }
  var functionUncurryThis;
  var hasRequiredFunctionUncurryThis;
  function requireFunctionUncurryThis() {
    if (hasRequiredFunctionUncurryThis) return functionUncurryThis;
    hasRequiredFunctionUncurryThis = 1;
    var NATIVE_BIND = requireFunctionBindNative();
    var FunctionPrototype = Function.prototype;
    var call = FunctionPrototype.call;
    var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);
    functionUncurryThis = NATIVE_BIND ? uncurryThisWithBind : function(fn) {
      return function() {
        return call.apply(fn, arguments);
      };
    };
    return functionUncurryThis;
  }
  var classofRaw;
  var hasRequiredClassofRaw;
  function requireClassofRaw() {
    if (hasRequiredClassofRaw) return classofRaw;
    hasRequiredClassofRaw = 1;
    var uncurryThis = requireFunctionUncurryThis();
    var toString = uncurryThis({}.toString);
    var stringSlice = uncurryThis("".slice);
    classofRaw = function(it) {
      return stringSlice(toString(it), 8, -1);
    };
    return classofRaw;
  }
  var functionUncurryThisClause;
  var hasRequiredFunctionUncurryThisClause;
  function requireFunctionUncurryThisClause() {
    if (hasRequiredFunctionUncurryThisClause) return functionUncurryThisClause;
    hasRequiredFunctionUncurryThisClause = 1;
    var classofRaw2 = requireClassofRaw();
    var uncurryThis = requireFunctionUncurryThis();
    functionUncurryThisClause = function(fn) {
      if (classofRaw2(fn) === "Function") return uncurryThis(fn);
    };
    return functionUncurryThisClause;
  }
  var isCallable;
  var hasRequiredIsCallable;
  function requireIsCallable() {
    if (hasRequiredIsCallable) return isCallable;
    hasRequiredIsCallable = 1;
    var documentAll = typeof document == "object" && document.all;
    isCallable = typeof documentAll == "undefined" && documentAll !== void 0 ? function(argument) {
      return typeof argument == "function" || argument === documentAll;
    } : function(argument) {
      return typeof argument == "function";
    };
    return isCallable;
  }
  var tryToString;
  var hasRequiredTryToString;
  function requireTryToString() {
    if (hasRequiredTryToString) return tryToString;
    hasRequiredTryToString = 1;
    var $String = String;
    tryToString = function(argument) {
      try {
        return $String(argument);
      } catch (error) {
        return "Object";
      }
    };
    return tryToString;
  }
  var aCallable;
  var hasRequiredACallable;
  function requireACallable() {
    if (hasRequiredACallable) return aCallable;
    hasRequiredACallable = 1;
    var isCallable2 = requireIsCallable();
    var tryToString2 = requireTryToString();
    var $TypeError = TypeError;
    aCallable = function(argument) {
      if (isCallable2(argument)) return argument;
      throw new $TypeError(tryToString2(argument) + " is not a function");
    };
    return aCallable;
  }
  var functionBindContext;
  var hasRequiredFunctionBindContext;
  function requireFunctionBindContext() {
    if (hasRequiredFunctionBindContext) return functionBindContext;
    hasRequiredFunctionBindContext = 1;
    var uncurryThis = requireFunctionUncurryThisClause();
    var aCallable2 = requireACallable();
    var NATIVE_BIND = requireFunctionBindNative();
    var bind = uncurryThis(uncurryThis.bind);
    functionBindContext = function(fn, that) {
      aCallable2(fn);
      return that === void 0 ? fn : NATIVE_BIND ? bind(fn, that) : function() {
        return fn.apply(that, arguments);
      };
    };
    return functionBindContext;
  }
  var indexedObject;
  var hasRequiredIndexedObject;
  function requireIndexedObject() {
    if (hasRequiredIndexedObject) return indexedObject;
    hasRequiredIndexedObject = 1;
    var uncurryThis = requireFunctionUncurryThis();
    var fails2 = requireFails();
    var classof2 = requireClassofRaw();
    var $Object = Object;
    var split = uncurryThis("".split);
    indexedObject = fails2(function() {
      return !$Object("z").propertyIsEnumerable(0);
    }) ? function(it) {
      return classof2(it) === "String" ? split(it, "") : $Object(it);
    } : $Object;
    return indexedObject;
  }
  var isNullOrUndefined;
  var hasRequiredIsNullOrUndefined;
  function requireIsNullOrUndefined() {
    if (hasRequiredIsNullOrUndefined) return isNullOrUndefined;
    hasRequiredIsNullOrUndefined = 1;
    isNullOrUndefined = function(it) {
      return it === null || it === void 0;
    };
    return isNullOrUndefined;
  }
  var requireObjectCoercible;
  var hasRequiredRequireObjectCoercible;
  function requireRequireObjectCoercible() {
    if (hasRequiredRequireObjectCoercible) return requireObjectCoercible;
    hasRequiredRequireObjectCoercible = 1;
    var isNullOrUndefined2 = requireIsNullOrUndefined();
    var $TypeError = TypeError;
    requireObjectCoercible = function(it) {
      if (isNullOrUndefined2(it)) throw new $TypeError("Can't call method on " + it);
      return it;
    };
    return requireObjectCoercible;
  }
  var toObject;
  var hasRequiredToObject;
  function requireToObject() {
    if (hasRequiredToObject) return toObject;
    hasRequiredToObject = 1;
    var requireObjectCoercible2 = requireRequireObjectCoercible();
    var $Object = Object;
    toObject = function(argument) {
      return $Object(requireObjectCoercible2(argument));
    };
    return toObject;
  }
  var mathTrunc;
  var hasRequiredMathTrunc;
  function requireMathTrunc() {
    if (hasRequiredMathTrunc) return mathTrunc;
    hasRequiredMathTrunc = 1;
    var ceil = Math.ceil;
    var floor = Math.floor;
    mathTrunc = Math.trunc || function trunc(x) {
      var n = +x;
      return (n > 0 ? floor : ceil)(n);
    };
    return mathTrunc;
  }
  var toIntegerOrInfinity;
  var hasRequiredToIntegerOrInfinity;
  function requireToIntegerOrInfinity() {
    if (hasRequiredToIntegerOrInfinity) return toIntegerOrInfinity;
    hasRequiredToIntegerOrInfinity = 1;
    var trunc = requireMathTrunc();
    toIntegerOrInfinity = function(argument) {
      var number = +argument;
      return number !== number || number === 0 ? 0 : trunc(number);
    };
    return toIntegerOrInfinity;
  }
  var toLength;
  var hasRequiredToLength;
  function requireToLength() {
    if (hasRequiredToLength) return toLength;
    hasRequiredToLength = 1;
    var toIntegerOrInfinity2 = requireToIntegerOrInfinity();
    var min = Math.min;
    toLength = function(argument) {
      var len = toIntegerOrInfinity2(argument);
      return len > 0 ? min(len, 9007199254740991) : 0;
    };
    return toLength;
  }
  var lengthOfArrayLike;
  var hasRequiredLengthOfArrayLike;
  function requireLengthOfArrayLike() {
    if (hasRequiredLengthOfArrayLike) return lengthOfArrayLike;
    hasRequiredLengthOfArrayLike = 1;
    var toLength2 = requireToLength();
    lengthOfArrayLike = function(obj) {
      return toLength2(obj.length);
    };
    return lengthOfArrayLike;
  }
  var isArray;
  var hasRequiredIsArray;
  function requireIsArray() {
    if (hasRequiredIsArray) return isArray;
    hasRequiredIsArray = 1;
    var classof2 = requireClassofRaw();
    isArray = Array.isArray || function isArray2(argument) {
      return classof2(argument) === "Array";
    };
    return isArray;
  }
  var globalThis_1;
  var hasRequiredGlobalThis;
  function requireGlobalThis() {
    if (hasRequiredGlobalThis) return globalThis_1;
    hasRequiredGlobalThis = 1;
    var check = function(it) {
      return it && it.Math === Math && it;
    };
    globalThis_1 = // eslint-disable-next-line es/no-global-this -- safe
    check(typeof globalThis == "object" && globalThis) || check(typeof window == "object" && window) || // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == "object" && self) || check(typeof commonjsGlobal == "object" && commonjsGlobal) || check(typeof globalThis_1 == "object" && globalThis_1) || // eslint-disable-next-line no-new-func -- fallback
    /* @__PURE__ */ (function() {
      return this;
    })() || Function("return this")();
    return globalThis_1;
  }
  var sharedStore = { exports: {} };
  var isPure;
  var hasRequiredIsPure;
  function requireIsPure() {
    if (hasRequiredIsPure) return isPure;
    hasRequiredIsPure = 1;
    isPure = false;
    return isPure;
  }
  var defineGlobalProperty;
  var hasRequiredDefineGlobalProperty;
  function requireDefineGlobalProperty() {
    if (hasRequiredDefineGlobalProperty) return defineGlobalProperty;
    hasRequiredDefineGlobalProperty = 1;
    var globalThis2 = requireGlobalThis();
    var defineProperty = Object.defineProperty;
    defineGlobalProperty = function(key, value) {
      try {
        defineProperty(globalThis2, key, { value: value, configurable: true, writable: true });
      } catch (error) {
        globalThis2[key] = value;
      }
      return value;
    };
    return defineGlobalProperty;
  }
  var hasRequiredSharedStore;
  function requireSharedStore() {
    if (hasRequiredSharedStore) return sharedStore.exports;
    hasRequiredSharedStore = 1;
    var IS_PURE = requireIsPure();
    var globalThis2 = requireGlobalThis();
    var defineGlobalProperty2 = requireDefineGlobalProperty();
    var SHARED = "__core-js_shared__";
    var store = sharedStore.exports = globalThis2[SHARED] || defineGlobalProperty2(SHARED, {});
    (store.versions || (store.versions = [])).push({
      version: "3.45.1",
      mode: IS_PURE ? "pure" : "global",
      copyright: "© 2014-2025 Denis Pushkarev (zloirock.ru)",
      license: "https://github.com/zloirock/core-js/blob/v3.45.1/LICENSE",
      source: "https://github.com/zloirock/core-js"
    });
    return sharedStore.exports;
  }
  var shared;
  var hasRequiredShared;
  function requireShared() {
    if (hasRequiredShared) return shared;
    hasRequiredShared = 1;
    var store = requireSharedStore();
    shared = function(key, value) {
      return store[key] || (store[key] = value || {});
    };
    return shared;
  }
  var hasOwnProperty_1;
  var hasRequiredHasOwnProperty;
  function requireHasOwnProperty() {
    if (hasRequiredHasOwnProperty) return hasOwnProperty_1;
    hasRequiredHasOwnProperty = 1;
    var uncurryThis = requireFunctionUncurryThis();
    var toObject2 = requireToObject();
    var hasOwnProperty = uncurryThis({}.hasOwnProperty);
    hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
      return hasOwnProperty(toObject2(it), key);
    };
    return hasOwnProperty_1;
  }
  var uid;
  var hasRequiredUid;
  function requireUid() {
    if (hasRequiredUid) return uid;
    hasRequiredUid = 1;
    var uncurryThis = requireFunctionUncurryThis();
    var id = 0;
    var postfix = Math.random();
    var toString = uncurryThis(1.1.toString);
    uid = function(key) {
      return "Symbol(" + (key === void 0 ? "" : key) + ")_" + toString(++id + postfix, 36);
    };
    return uid;
  }
  var environmentUserAgent;
  var hasRequiredEnvironmentUserAgent;
  function requireEnvironmentUserAgent() {
    if (hasRequiredEnvironmentUserAgent) return environmentUserAgent;
    hasRequiredEnvironmentUserAgent = 1;
    var globalThis2 = requireGlobalThis();
    var navigator = globalThis2.navigator;
    var userAgent = navigator && navigator.userAgent;
    environmentUserAgent = userAgent ? String(userAgent) : "";
    return environmentUserAgent;
  }
  var environmentV8Version;
  var hasRequiredEnvironmentV8Version;
  function requireEnvironmentV8Version() {
    if (hasRequiredEnvironmentV8Version) return environmentV8Version;
    hasRequiredEnvironmentV8Version = 1;
    var globalThis2 = requireGlobalThis();
    var userAgent = requireEnvironmentUserAgent();
    var process = globalThis2.process;
    var Deno = globalThis2.Deno;
    var versions = process && process.versions || Deno && Deno.version;
    var v8 = versions && versions.v8;
    var match, version;
    if (v8) {
      match = v8.split(".");
      version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
    }
    if (!version && userAgent) {
      match = userAgent.match(/Edge\/(\d+)/);
      if (!match || match[1] >= 74) {
        match = userAgent.match(/Chrome\/(\d+)/);
        if (match) version = +match[1];
      }
    }
    environmentV8Version = version;
    return environmentV8Version;
  }
  var symbolConstructorDetection;
  var hasRequiredSymbolConstructorDetection;
  function requireSymbolConstructorDetection() {
    if (hasRequiredSymbolConstructorDetection) return symbolConstructorDetection;
    hasRequiredSymbolConstructorDetection = 1;
    var V8_VERSION = requireEnvironmentV8Version();
    var fails2 = requireFails();
    var globalThis2 = requireGlobalThis();
    var $String = globalThis2.String;
    symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails2(function() {
      var symbol = Symbol("symbol detection");
      return !$String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && V8_VERSION && V8_VERSION < 41;
    });
    return symbolConstructorDetection;
  }
  var useSymbolAsUid;
  var hasRequiredUseSymbolAsUid;
  function requireUseSymbolAsUid() {
    if (hasRequiredUseSymbolAsUid) return useSymbolAsUid;
    hasRequiredUseSymbolAsUid = 1;
    var NATIVE_SYMBOL = requireSymbolConstructorDetection();
    useSymbolAsUid = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == "symbol";
    return useSymbolAsUid;
  }
  var wellKnownSymbol;
  var hasRequiredWellKnownSymbol;
  function requireWellKnownSymbol() {
    if (hasRequiredWellKnownSymbol) return wellKnownSymbol;
    hasRequiredWellKnownSymbol = 1;
    var globalThis2 = requireGlobalThis();
    var shared2 = requireShared();
    var hasOwn = requireHasOwnProperty();
    var uid2 = requireUid();
    var NATIVE_SYMBOL = requireSymbolConstructorDetection();
    var USE_SYMBOL_AS_UID = requireUseSymbolAsUid();
    var Symbol2 = globalThis2.Symbol;
    var WellKnownSymbolsStore = shared2("wks");
    var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol2["for"] || Symbol2 : Symbol2 && Symbol2.withoutSetter || uid2;
    wellKnownSymbol = function(name) {
      if (!hasOwn(WellKnownSymbolsStore, name)) {
        WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol2, name) ? Symbol2[name] : createWellKnownSymbol("Symbol." + name);
      }
      return WellKnownSymbolsStore[name];
    };
    return wellKnownSymbol;
  }
  var toStringTagSupport;
  var hasRequiredToStringTagSupport;
  function requireToStringTagSupport() {
    if (hasRequiredToStringTagSupport) return toStringTagSupport;
    hasRequiredToStringTagSupport = 1;
    var wellKnownSymbol2 = requireWellKnownSymbol();
    var TO_STRING_TAG = wellKnownSymbol2("toStringTag");
    var test = {};
    test[TO_STRING_TAG] = "z";
    toStringTagSupport = String(test) === "[object z]";
    return toStringTagSupport;
  }
  var classof;
  var hasRequiredClassof;
  function requireClassof() {
    if (hasRequiredClassof) return classof;
    hasRequiredClassof = 1;
    var TO_STRING_TAG_SUPPORT = requireToStringTagSupport();
    var isCallable2 = requireIsCallable();
    var classofRaw2 = requireClassofRaw();
    var wellKnownSymbol2 = requireWellKnownSymbol();
    var TO_STRING_TAG = wellKnownSymbol2("toStringTag");
    var $Object = Object;
    var CORRECT_ARGUMENTS = classofRaw2(/* @__PURE__ */ (function() {
      return arguments;
    })()) === "Arguments";
    var tryGet = function(it, key) {
      try {
        return it[key];
      } catch (error) {
      }
    };
    classof = TO_STRING_TAG_SUPPORT ? classofRaw2 : function(it) {
      var O, tag, result;
      return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw2(O) : (result = classofRaw2(O)) === "Object" && isCallable2(O.callee) ? "Arguments" : result;
    };
    return classof;
  }
  var getBuiltIn;
  var hasRequiredGetBuiltIn;
  function requireGetBuiltIn() {
    if (hasRequiredGetBuiltIn) return getBuiltIn;
    hasRequiredGetBuiltIn = 1;
    var globalThis2 = requireGlobalThis();
    var isCallable2 = requireIsCallable();
    var aFunction = function(argument) {
      return isCallable2(argument) ? argument : void 0;
    };
    getBuiltIn = function(namespace, method) {
      return arguments.length < 2 ? aFunction(globalThis2[namespace]) : globalThis2[namespace] && globalThis2[namespace][method];
    };
    return getBuiltIn;
  }
  var inspectSource;
  var hasRequiredInspectSource;
  function requireInspectSource() {
    if (hasRequiredInspectSource) return inspectSource;
    hasRequiredInspectSource = 1;
    var uncurryThis = requireFunctionUncurryThis();
    var isCallable2 = requireIsCallable();
    var store = requireSharedStore();
    var functionToString = uncurryThis(Function.toString);
    if (!isCallable2(store.inspectSource)) {
      store.inspectSource = function(it) {
        return functionToString(it);
      };
    }
    inspectSource = store.inspectSource;
    return inspectSource;
  }
  var isConstructor;
  var hasRequiredIsConstructor;
  function requireIsConstructor() {
    if (hasRequiredIsConstructor) return isConstructor;
    hasRequiredIsConstructor = 1;
    var uncurryThis = requireFunctionUncurryThis();
    var fails2 = requireFails();
    var isCallable2 = requireIsCallable();
    var classof2 = requireClassof();
    var getBuiltIn2 = requireGetBuiltIn();
    var inspectSource2 = requireInspectSource();
    var noop = function() {
    };
    var construct = getBuiltIn2("Reflect", "construct");
    var constructorRegExp = /^\s*(?:class|function)\b/;
    var exec = uncurryThis(constructorRegExp.exec);
    var INCORRECT_TO_STRING = !constructorRegExp.test(noop);
    var isConstructorModern = function isConstructor2(argument) {
      if (!isCallable2(argument)) return false;
      try {
        construct(noop, [], argument);
        return true;
      } catch (error) {
        return false;
      }
    };
    var isConstructorLegacy = function isConstructor2(argument) {
      if (!isCallable2(argument)) return false;
      switch (classof2(argument)) {
        case "AsyncFunction":
        case "GeneratorFunction":
        case "AsyncGeneratorFunction":
          return false;
      }
      try {
        return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource2(argument));
      } catch (error) {
        return true;
      }
    };
    isConstructorLegacy.sham = true;
    isConstructor = !construct || fails2(function() {
      var called;
      return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function() {
        called = true;
      }) || called;
    }) ? isConstructorLegacy : isConstructorModern;
    return isConstructor;
  }
  var isObject;
  var hasRequiredIsObject;
  function requireIsObject() {
    if (hasRequiredIsObject) return isObject;
    hasRequiredIsObject = 1;
    var isCallable2 = requireIsCallable();
    isObject = function(it) {
      return typeof it == "object" ? it !== null : isCallable2(it);
    };
    return isObject;
  }
  var arraySpeciesConstructor;
  var hasRequiredArraySpeciesConstructor;
  function requireArraySpeciesConstructor() {
    if (hasRequiredArraySpeciesConstructor) return arraySpeciesConstructor;
    hasRequiredArraySpeciesConstructor = 1;
    var isArray2 = requireIsArray();
    var isConstructor2 = requireIsConstructor();
    var isObject2 = requireIsObject();
    var wellKnownSymbol2 = requireWellKnownSymbol();
    var SPECIES = wellKnownSymbol2("species");
    var $Array = Array;
    arraySpeciesConstructor = function(originalArray) {
      var C;
      if (isArray2(originalArray)) {
        C = originalArray.constructor;
        if (isConstructor2(C) && (C === $Array || isArray2(C.prototype))) C = void 0;
        else if (isObject2(C)) {
          C = C[SPECIES];
          if (C === null) C = void 0;
        }
      }
      return C === void 0 ? $Array : C;
    };
    return arraySpeciesConstructor;
  }
  var arraySpeciesCreate;
  var hasRequiredArraySpeciesCreate;
  function requireArraySpeciesCreate() {
    if (hasRequiredArraySpeciesCreate) return arraySpeciesCreate;
    hasRequiredArraySpeciesCreate = 1;
    var arraySpeciesConstructor2 = requireArraySpeciesConstructor();
    arraySpeciesCreate = function(originalArray, length) {
      return new (arraySpeciesConstructor2(originalArray))(length === 0 ? 0 : length);
    };
    return arraySpeciesCreate;
  }
  var arrayIteration;
  var hasRequiredArrayIteration;
  function requireArrayIteration() {
    if (hasRequiredArrayIteration) return arrayIteration;
    hasRequiredArrayIteration = 1;
    var bind = requireFunctionBindContext();
    var uncurryThis = requireFunctionUncurryThis();
    var IndexedObject = requireIndexedObject();
    var toObject2 = requireToObject();
    var lengthOfArrayLike2 = requireLengthOfArrayLike();
    var arraySpeciesCreate2 = requireArraySpeciesCreate();
    var push = uncurryThis([].push);
    var createMethod = function(TYPE) {
      var IS_MAP = TYPE === 1;
      var IS_FILTER = TYPE === 2;
      var IS_SOME = TYPE === 3;
      var IS_EVERY = TYPE === 4;
      var IS_FIND_INDEX = TYPE === 6;
      var IS_FILTER_REJECT = TYPE === 7;
      var NO_HOLES = TYPE === 5 || IS_FIND_INDEX;
      return function($this, callbackfn, that, specificCreate) {
        var O = toObject2($this);
        var self2 = IndexedObject(O);
        var length = lengthOfArrayLike2(self2);
        var boundFunction = bind(callbackfn, that);
        var index = 0;
        var create = specificCreate || arraySpeciesCreate2;
        var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : void 0;
        var value, result;
        for (; length > index; index++) if (NO_HOLES || index in self2) {
          value = self2[index];
          result = boundFunction(value, index, O);
          if (TYPE) {
            if (IS_MAP) target[index] = result;
            else if (result) switch (TYPE) {
              case 3:
                return true;
              // some
              case 5:
                return value;
              // find
              case 6:
                return index;
              // findIndex
              case 2:
                push(target, value);
            }
            else switch (TYPE) {
              case 4:
                return false;
              // every
              case 7:
                push(target, value);
            }
          }
        }
        return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
      };
    };
    arrayIteration = {
      // `Array.prototype.forEach` method
      // https://tc39.es/ecma262/#sec-array.prototype.foreach
      forEach: createMethod(0),
      // `Array.prototype.map` method
      // https://tc39.es/ecma262/#sec-array.prototype.map
      map: createMethod(1),
      // `Array.prototype.filter` method
      // https://tc39.es/ecma262/#sec-array.prototype.filter
      filter: createMethod(2),
      // `Array.prototype.some` method
      // https://tc39.es/ecma262/#sec-array.prototype.some
      some: createMethod(3),
      // `Array.prototype.every` method
      // https://tc39.es/ecma262/#sec-array.prototype.every
      every: createMethod(4),
      // `Array.prototype.find` method
      // https://tc39.es/ecma262/#sec-array.prototype.find
      find: createMethod(5),
      // `Array.prototype.findIndex` method
      // https://tc39.es/ecma262/#sec-array.prototype.findIndex
      findIndex: createMethod(6),
      // `Array.prototype.filterReject` method
      // https://github.com/tc39/proposal-array-filtering
      filterReject: createMethod(7)
    };
    return arrayIteration;
  }
  requireArrayIteration();
  function smartCaps() {
    function getTextNodesInSmartCap() {
      var root = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document;
      var result = [];
      var elements = root.querySelectorAll(".smartCap");
      elements.forEach(function(el) {
        var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        var node;
        while (node = walker.nextNode()) {
          var text = node.nodeValue;
          if (text.trim().length > 0) {
            node.nodeValue = text.replace(/\w\S*/g, function(word) {
              return word.charAt(0).toUpperCase() + word.slice(1);
            });
            result.push(node);
          }
        }
      });
      return result;
    }
    var smartCapsNodeList = getTextNodesInSmartCap();
    var smartCaps2 = Array.from(smartCapsNodeList);
    smartCaps2.forEach(function(smartCap) {
      console.log(smartCap);
    });
  }
  function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
      return typeof o2;
    } : function(o2) {
      return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
    }, _typeof(o);
  }
  var indentIncrement = 4;
  var indent = 0;
  var runsInPrince = typeof Prince !== "undefined";
  function logInfo(info) {
    {
      if (runsInPrince) {
        Prince.Log.info("|" + getIndentation() + info);
      } else {
        console.log("|" + getIndentation() + info);
      }
    }
  }
  function getIndentation() {
    var indentation = "";
    for (var i = 0; i < indent; i++) {
      indentation = indentation + " ";
    }
    return indentation;
  }
  function increaseIndentation() {
    indent += indentIncrement;
  }
  function decreaseIndentation() {
    indent -= indentIncrement;
  }
  function calculateSqueezedFontSize(maxFontSizePt, maxWidthPt, actualWidthPt, actualFontSizePt) {
    logInfo("--- FONT SIZE CALCULATION STARTED");
    logInfo("");
    increaseIndentation();
    var scale = maxWidthPt / actualWidthPt;
    var newFontSizePt = scale;
    logInfo("maxFontSizePt: " + maxFontSizePt);
    logInfo("actualFontSizePt: " + actualFontSizePt);
    logInfo("maxWidthPt: " + maxWidthPt);
    logInfo("actualWidthPt: " + actualWidthPt);
    logInfo("scale: " + scale);
    logInfo("NEW fontSize: " + newFontSizePt);
    logInfo("NEW fontSize: " + Math.min(newFontSizePt, maxFontSizePt));
    decreaseIndentation();
    logInfo("");
    logInfo("--- FONT SIZE CALCULATION ENDED");
    return Math.min(newFontSizePt, maxFontSizePt);
  }
  function getElementBoxWidth(el) {
    if (runsInPrince) {
      var boxes = el.getPrinceBoxes();
      return boxes[0].w;
    } else {
      return convertToPt(el.clientWidth + "px");
    }
  }
  function squeeze(s) {
    logInfo("=== " + s.element.id + " ===");
    var newFontSizePt = calculateSqueezedFontSize(s.maxFontSizePt, s.maxWidthPt, getElementBoxWidth(s.element), s.element.style.fontSize);
    s.element.style.fontSize = newFontSizePt.toString() + "pt";
    s.element.style.maxWidth = s.maxWidth + "pt";
  }
  function getElementsToSqueeze() {
    var squeezeElements = document.querySelectorAll(".squeeze");
    var squeezeElementsWithParams = [];
    for (var i = 0; i < squeezeElements.length; i++) {
      squeezeElementsWithParams.push(squeezeElements[i]);
    }
    return squeezeElementsWithParams;
  }
  function squeezeAll() {
    for (var i in elementsToSqueeze) {
      squeeze(elementsToSqueeze[i]);
    }
  }
  var elementsToSqueeze = [];
  function prepareElements() {
    var elements = getElementsToSqueeze();
    elements.map(function(element, index) {
      logInfo(element.id);
      var maxWidth = window.getComputedStyle(element).maxWidth;
      var maxFontSize = window.getComputedStyle(element).fontSize;
      if (!maxWidth || !maxFontSize || maxWidth === "none" || maxFontSize === "none") {
        return;
      }
      var maxWidthPt = convertToPt(maxWidth);
      var maxFontSizePt = convertToPt(maxFontSize);
      elementsToSqueeze[index] = {
        element: elements[index],
        maxWidthPt: maxWidthPt,
        maxFontSizePt: maxFontSizePt
      };
      element.style.fontSize = "1pt";
      element.style.width = "";
      element.style.maxWidth = "";
      element.style.whiteSpace = "nowrap";
    });
  }
  function calculateSqueezedLetterSpacing(element, maxWidthPt) {
    var dpi = runsInPrince ? 1 : 0.74999943307122;
    logInfo("--- CALCULATION STARTED");
    logInfo("");
    increaseIndentation();
    maxWidthPt = maxWidthPt * dpi;
    var text = element.textContent || "";
    var currentLetterSpacing = parseFloat(window.getComputedStyle(element).letterSpacing) || 0;
    currentLetterSpacing = currentLetterSpacing * dpi;
    var currentWidth = getElementBoxWidth(element);
    currentWidth = currentWidth * dpi;
    logInfo("maxWidthPt: " + maxWidthPt);
    logInfo("currentWidth: " + currentWidth);
    logInfo("text: " + (typeof text == "undefined"));
    logInfo("text: " + (typeof text == "string"));
    logInfo("text: " + !!text);
    logInfo("text: " + (!!text ? "AAA" : "BBB"));
    logInfo("text length: " + (!!text ? text.length : 0));
    logInfo("currentLetterSpacing: " + currentLetterSpacing + "pt (assuming)");
    logInfo("scale: " + (maxWidthPt - currentWidth));
    var newLetterSpacing = currentLetterSpacing;
    if (text.length > 1) {
      var extraSpacing = (maxWidthPt - currentWidth) / (text.length - 1);
      newLetterSpacing = currentLetterSpacing + extraSpacing;
    }
    logInfo("newLetterSpacing: " + newLetterSpacing);
    decreaseIndentation();
    logInfo("");
    logInfo("--- CALCULATION ENDED");
    return newLetterSpacing;
  }
  function squeezeLetterSpacing(s) {
    logInfo("=== " + s.element.id + " ===");
    var originalLetterSpacing = parseFloat(window.getComputedStyle(s.element).letterSpacing) || 0;
    console.log("originalLetterSpacing: " + originalLetterSpacing);
    var newLetterSpacingPt = calculateSqueezedLetterSpacing(
      s.element,
      s.maxWidthPt
      // getElementBoxWidth(s.element),
      // originalLetterSpacing
    );
    s.element.style.letterSpacing = newLetterSpacingPt.toString() + "pt";
    s.element.style.maxWidth = s.maxWidth + "pt";
  }
  function squeezeAllLetterSpacing() {
    for (var i in elementsToSqueezeSpacing) {
      squeezeLetterSpacing(elementsToSqueezeSpacing[i]);
    }
  }
  function getElementsToSqueezeLetterSpacing() {
    var squeezeElements = document.querySelectorAll(".squeeze-spacing");
    var squeezeElementsWithParams = [];
    for (var i = 0; i < squeezeElements.length; i++) {
      squeezeElementsWithParams.push(squeezeElements[i]);
    }
    return squeezeElementsWithParams;
  }
  var elementsToSqueezeSpacing = [];
  function prepareElementsForLetterSpacing() {
    console.log("----------------------- prepareElementsForLetterSpacing");
    var elements = getElementsToSqueezeLetterSpacing();
    elements.map(function(element, index) {
      logInfo(element.id);
      var maxWidth = window.getComputedStyle(element).maxWidth;
      if (!maxWidth || maxWidth === "none") {
        return;
      }
      var maxWidthPt = convertToPt(maxWidth);
      elementsToSqueezeSpacing[index] = {
        element: elements[index],
        maxWidthPt: maxWidthPt
      };
      element.style.letterSpacing = "0.1px";
      element.style.maxWidth = "";
      element.style.whiteSpace = "nowrap";
    });
  }
  function convertToPt(size) {
    var dpi;
    if (runsInPrince) {
      dpi = 74.999943307122;
    } else {
      dpi = 74.999943307122;
    }
    var pointsPerInch = 72;
    var conversionFactors = {
      pt: 1,
      // 1 pt = 1 pt
      //        px: pointsPerInch / dpi,       // px to pt depends on DPI
      px: dpi / 100,
      // px to pt depends on DPI
      mm: 3.7795275591 * dpi / 100,
      // 1 mm = 1 inch / 25.4
      // mm: pointsPerInch / 25.4,   // 1 mm = 1 inch / 25.4
      cm: pointsPerInch / 2.54,
      // 1 cm = 1 inch / 2.54
      in: 96 * dpi / 100,
      // 1 inch = 72 pt
      // in: pointsPerInch,          // 1 inch = 72 pt
      pc: 16 * dpi,
      // 1 pica (pc) = 12 pt
      em: 16 * dpi,
      // Assuming 1 em ≈ 12 pt (adjust if needed)
      rem: 16 * dpi
      // Assuming 1 rem ≈ 12 pt (adjust if needed)
    };
    var match = size.match(/^([\d.]+)([a-z%]*)$/i);
    if (!match) {
      throw new Error("Invalid size format: " + size);
    }
    var value = parseFloat(match[1]);
    var unit = match[2].toLowerCase();
    if (!unit) {
      unit = "px";
    }
    if (!conversionFactors[unit]) {
      throw new Error("Unsupported unit: " + unit);
    }
    logInfo("IN: " + size);
    logInfo("OUT: " + value * conversionFactors[unit]);
    return value * conversionFactors[unit];
  }
  function runSqueeze() {
    if (runsInPrince) {
      logInfo("--- STARTED");
      Prince.Log.info(typeof window === "undefined" ? "undefined" : _typeof(window));
      Prince.trackBoxes = true;
      prepareElements();
      prepareElementsForLetterSpacing();
      Prince.registerPostLayoutFunc(function() {
        squeezeAll();
        squeezeAllLetterSpacing();
        handleSeparators();
      });
      Prince.addEventListener("complete", function() {
      }, false);
    } else {
      prepareElements();
      prepareElementsForLetterSpacing();
      squeezeAll();
      squeezeAllLetterSpacing();
      handleSeparators();
    }
  }
  window.addEventListener("message", function(event) {
    var data = {};
    Object.keys(event.data.data).map(function(key) {
      if (Array.isArray(event.data.data[key]) && event.data.data[key].length > 0) {
        data[key] = event.data.data[key][0].label;
      } else {
        data[key] = event.data.data[key];
      }
    });
    if (event.data.msgId === "dataChanged") {
      renderTemplate(data, event.data.templateId, event.data.orderLineUuid, event.data.options, false);
      zoom(event.data.zoom / 100);
    }
    if (event.data.msgId === "getRenderedMarkup") {
      renderTemplate(data, event.data.templateId, event.data.orderLineUuid, event.data.options, true);
      zoom(event.data.zoom / 100);
    }
    if (event.data.msgId === "zoom") {
      zoom(event.data.data / 100);
    }
  });
  function scriptFromTheTemplate() {
    logInfo$1("scriptFromTheTemplate");
  }
  function renderTemplate(data, templateId, orderLineUuid, options, sendData) {
    var source = document.getElementById("entry-template").innerHTML;
    var safeData = JSON.parse(JSON.stringify(data), function(key, value) {
      return typeof value === "string" ? value.replace(/\\n/g, "<br />") : value;
    });
    var renderer = Twig.twig({
      data: source
    });
    var html = renderer.render(safeData);
    document.getElementsByTagName("body")[0].outerHTML = html;
    scriptFromTheTemplate();
    smartCaps();
    runSqueeze();
    handleSeparators();
    if (sendData) {
      window.parent.postMessage({
        source: "template-processor",
        html: html,
        data: data,
        templateId: templateId,
        orderLineUuid: orderLineUuid,
        options: options
      }, "*");
    }
  }
  function zoom(ratio) {
    document.getElementsByTagName("body")[0].style.scale = ratio;
  }
  function addPodScripts() {
    var runsInPrince2 = typeof Prince !== "undefined";
    function init() {
      if (runsInPrince2) {
        Prince.Log.info("POD_PRINCE");
        Prince.trackBoxes = true;
        Prince.registerPostLayoutFunc(function() {
          handleSeparators();
        });
      } else {
        renderTemplate({});
        smartCaps();
        runSqueeze();
        handleSeparators();
      }
    }
    if (runsInPrince2) {
      init();
    } else {
      init();
    }
  }
  return addPodScripts;
})();
//# sourceMappingURL=pod.bundle.js.map

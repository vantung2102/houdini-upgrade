/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 702);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var curryN = __webpack_require__(157);

// Utility
function isFunction(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
}
function trueFn() { return true; }

// Globals
var toUpdate = [];
var inStream;
var order = [];
var orderNextIdx = -1;
var flushing = false;

/** @namespace */
var flyd = {}

// /////////////////////////// API ///////////////////////////////// //

/**
 * Creates a new stream
 *
 * __Signature__: `a -> Stream a`
 *
 * @name flyd.stream
 * @param {*} initialValue - (Optional) the initial value of the stream
 * @return {stream} the stream
 *
 * @example
 * var n = flyd.stream(1); // Stream with initial value `1`
 * var s = flyd.stream(); // Stream with no initial value
 */
flyd.stream = function(initialValue) {
  var endStream = createDependentStream([], trueFn);
  var s = createStream();
  s.end = endStream;
  s.fnArgs = [];
  endStream.listeners.push(s);
  if (arguments.length > 0) s(initialValue);
  return s;
}

/**
 * Create a new dependent stream
 *
 * __Signature__: `(...Stream * -> Stream b -> b) -> [Stream *] -> Stream b`
 *
 * @name flyd.combine
 * @param {Function} fn - the function used to combine the streams
 * @param {Array<stream>} dependencies - the streams that this one depends on
 * @return {stream} the dependent stream
 *
 * @example
 * var n1 = flyd.stream(0);
 * var n2 = flyd.stream(0);
 * var max = flyd.combine(function(n1, n2, self, changed) {
 *   return n1() > n2() ? n1() : n2();
 * }, [n1, n2]);
 */
flyd.combine = curryN(2, combine);
function combine(fn, streams) {
  var i, s, deps, depEndStreams;
  var endStream = createDependentStream([], trueFn);
  deps = []; depEndStreams = [];
  for (i = 0; i < streams.length; ++i) {
    if (streams[i] !== undefined) {
      deps.push(streams[i]);
      if (streams[i].end !== undefined) depEndStreams.push(streams[i].end);
    }
  }
  s = createDependentStream(deps, fn);
  s.depsChanged = [];
  s.fnArgs = s.deps.concat([s, s.depsChanged]);
  s.end = endStream;
  endStream.listeners.push(s);
  addListeners(depEndStreams, endStream);
  endStream.deps = depEndStreams;
  updateStream(s);
  return s;
}

/**
 * Returns `true` if the supplied argument is a Flyd stream and `false` otherwise.
 *
 * __Signature__: `* -> Boolean`
 *
 * @name flyd.isStream
 * @param {*} value - the value to test
 * @return {Boolean} `true` if is a Flyd streamn, `false` otherwise
 *
 * @example
 * var s = flyd.stream(1);
 * var n = 1;
 * flyd.isStream(s); //=> true
 * flyd.isStream(n); //=> false
 */
flyd.isStream = function(stream) {
  return isFunction(stream) && 'hasVal' in stream;
}

/**
 * Invokes the body (the function to calculate the value) of a dependent stream
 *
 * By default the body of a dependent stream is only called when all the streams
 * upon which it depends has a value. `immediate` can circumvent this behaviour.
 * It immediately invokes the body of a dependent stream.
 *
 * __Signature__: `Stream a -> Stream a`
 *
 * @name flyd.immediate
 * @param {stream} stream - the dependent stream
 * @return {stream} the same stream
 *
 * @example
 * var s = flyd.stream();
 * var hasItems = flyd.immediate(flyd.combine(function(s) {
 *   return s() !== undefined && s().length > 0;
 * }, [s]);
 * console.log(hasItems()); // logs `false`. Had `immediate` not been
 *                          // used `hasItems()` would've returned `undefined`
 * s([1]);
 * console.log(hasItems()); // logs `true`.
 * s([]);
 * console.log(hasItems()); // logs `false`.
 */
flyd.immediate = function(s) {
  if (s.depsMet === false) {
    s.depsMet = true;
    updateStream(s);
  }
  return s;
}

/**
 * Changes which `endsStream` should trigger the ending of `s`.
 *
 * __Signature__: `Stream a -> Stream b -> Stream b`
 *
 * @name flyd.endsOn
 * @param {stream} endStream - the stream to trigger the ending
 * @param {stream} stream - the stream to be ended by the endStream
 * @param {stream} the stream modified to be ended by endStream
 *
 * @example
 * var n = flyd.stream(1);
 * var killer = flyd.stream();
 * // `double` ends when `n` ends or when `killer` emits any value
 * var double = flyd.endsOn(flyd.merge(n.end, killer), flyd.combine(function(n) {
 *   return 2 * n();
 * }, [n]);
*/
flyd.endsOn = function(endS, s) {
  detachDeps(s.end);
  endS.listeners.push(s.end);
  s.end.deps.push(endS);
  return s;
}

/**
 * Map a stream
 *
 * Returns a new stream consisting of every value from `s` passed through
 * `fn`. I.e. `map` creates a new stream that listens to `s` and
 * applies `fn` to every new value.
 * __Signature__: `(a -> result) -> Stream a -> Stream result`
 *
 * @name flyd.map
 * @param {Function} fn - the function that produces the elements of the new stream
 * @param {stream} stream - the stream to map
 * @return {stream} a new stream with the mapped values
 *
 * @example
 * var numbers = flyd.stream(0);
 * var squaredNumbers = flyd.map(function(n) { return n*n; }, numbers);
 */
// Library functions use self callback to accept (null, undefined) update triggers.
flyd.map = curryN(2, function(f, s) {
  return combine(function(s, self) { self(f(s.val)); }, [s]);
})

/**
 * Listen to stream events
 *
 * Similar to `map` except that the returned stream is empty. Use `on` for doing
 * side effects in reaction to stream changes. Use the returned stream only if you
 * need to manually end it.
 *
 * __Signature__: `(a -> result) -> Stream a -> Stream undefined`
 *
 * @name flyd.on
 * @param {Function} cb - the callback
 * @param {stream} stream - the stream
 * @return {stream} an empty stream (can be ended)
 */
flyd.on = curryN(2, function(f, s) {
  return combine(function(s) { f(s.val); }, [s]);
})

/**
 * Creates a new stream with the results of calling the function on every incoming
 * stream with and accumulator and the incoming value.
 *
 * __Signature__: `(a -> b -> a) -> a -> Stream b -> Stream a`
 *
 * @name flyd.scan
 * @param {Function} fn - the function to call
 * @param {*} val - the initial value of the accumulator
 * @param {stream} stream - the stream source
 * @return {stream} the new stream
 *
 * @example
 * var numbers = flyd.stream();
 * var sum = flyd.scan(function(sum, n) { return sum+n; }, 0, numbers);
 * numbers(2)(3)(5);
 * sum(); // 10
 */
flyd.scan = curryN(3, function(f, acc, s) {
  var ns = combine(function(s, self) {
    self(acc = f(acc, s.val));
  }, [s]);
  if (!ns.hasVal) ns(acc);
  return ns;
});

/**
 * Creates a new stream down which all values from both `stream1` and `stream2`
 * will be sent.
 *
 * __Signature__: `Stream a -> Stream a -> Stream a`
 *
 * @name flyd.merge
 * @param {stream} source1 - one stream to be merged
 * @param {stream} source2 - the other stream to be merged
 * @return {stream} a stream with the values from both sources
 *
 * @example
 * var btn1Clicks = flyd.stream();
 * button1Elm.addEventListener(btn1Clicks);
 * var btn2Clicks = flyd.stream();
 * button2Elm.addEventListener(btn2Clicks);
 * var allClicks = flyd.merge(btn1Clicks, btn2Clicks);
 */
flyd.merge = curryN(2, function(s1, s2) {
  var s = flyd.immediate(combine(function(s1, s2, self, changed) {
    if (changed[0]) {
      self(changed[0]());
    } else if (s1.hasVal) {
      self(s1.val);
    } else if (s2.hasVal) {
      self(s2.val);
    }
  }, [s1, s2]));
  flyd.endsOn(combine(function() {
    return true;
  }, [s1.end, s2.end]), s);
  return s;
});

/**
 * Creates a new stream resulting from applying `transducer` to `stream`.
 *
 * __Signature__: `Transducer -> Stream a -> Stream b`
 *
 * @name flyd.transduce
 * @param {Transducer} xform - the transducer transformation
 * @param {stream} source - the stream source
 * @return {stream} the new stream
 *
 * @example
 * var t = require('transducers.js');
 *
 * var results = [];
 * var s1 = flyd.stream();
 * var tx = t.compose(t.map(function(x) { return x * 2; }), t.dedupe());
 * var s2 = flyd.transduce(tx, s1);
 * flyd.combine(function(s2) { results.push(s2()); }, [s2]);
 * s1(1)(1)(2)(3)(3)(3)(4);
 * results; // => [2, 4, 6, 8]
 */
flyd.transduce = curryN(2, function(xform, source) {
  xform = xform(new StreamTransformer());
  return combine(function(source, self) {
    var res = xform['@@transducer/step'](undefined, source.val);
    if (res && res['@@transducer/reduced'] === true) {
      self.end(true);
      return res['@@transducer/value'];
    } else {
      return res;
    }
  }, [source]);
});

/**
 * Returns `fn` curried to `n`. Use this function to curry functions exposed by
 * modules for Flyd.
 *
 * @name flyd.curryN
 * @function
 * @param {Integer} arity - the function arity
 * @param {Function} fn - the function to curry
 * @return {Function} the curried function
 *
 * @example
 * function add(x, y) { return x + y; };
 * var a = flyd.curryN(2, add);
 * a(2)(4) // => 6
 */
flyd.curryN = curryN

/**
 * Returns a new stream identical to the original except every
 * value will be passed through `f`.
 *
 * _Note:_ This function is included in order to support the fantasy land
 * specification.
 *
 * __Signature__: Called bound to `Stream a`: `(a -> b) -> Stream b`
 *
 * @name stream.map
 * @param {Function} function - the function to apply
 * @return {stream} a new stream with the values mapped
 *
 * @example
 * var numbers = flyd.stream(0);
 * var squaredNumbers = numbers.map(function(n) { return n*n; });
 */
function boundMap(f) { return flyd.map(f, this); }

/**
 * Returns a new stream which is the result of applying the
 * functions from `this` stream to the values in `stream` parameter.
 *
 * `this` stream must be a stream of functions.
 *
 * _Note:_ This function is included in order to support the fantasy land
 * specification.
 *
 * __Signature__: Called bound to `Stream (a -> b)`: `a -> Stream b`
 *
 * @name stream.ap
 * @param {stream} stream - the values stream
 * @return {stream} a new stram with the functions applied to values
 *
 * @example
 * var add = flyd.curryN(2, function(x, y) { return x + y; });
 * var numbers1 = flyd.stream();
 * var numbers2 = flyd.stream();
 * var addToNumbers1 = flyd.map(add, numbers1);
 * var added = addToNumbers1.ap(numbers2);
 */
function ap(s2) {
  var s1 = this;
  return combine(function(s1, s2, self) { self(s1.val(s2.val)); }, [s1, s2]);
}

/**
 * Get a human readable view of a stream
 * @name stream.toString
 * @return {String} the stream string representation
 */
function streamToString() {
  return 'stream(' + this.val + ')';
}

/**
 * @name stream.end
 * @memberof stream
 * A stream that emits `true` when the stream ends. If `true` is pushed down the
 * stream the parent stream ends.
 */

/**
 * @name stream.of
 * @function
 * @memberof stream
 * Returns a new stream with `value` as its initial value. It is identical to
 * calling `flyd.stream` with one argument.
 *
 * __Signature__: Called bound to `Stream (a)`: `b -> Stream b`
 *
 * @param {*} value - the initial value
 * @return {stream} the new stream
 *
 * @example
 * var n = flyd.stream(1);
 * var m = n.of(1);
 */

// /////////////////////////// PRIVATE ///////////////////////////////// //
/**
 * @private
 * Create a stream with no dependencies and no value
 * @return {Function} a flyd stream
 */
function createStream() {
  function s(n) {
    if (arguments.length === 0) return s.val
    updateStreamValue(s, n)
    return s
  }
  s.hasVal = false;
  s.val = undefined;
  s.vals = [];
  s.listeners = [];
  s.queued = false;
  s.end = undefined;
  s.map = boundMap;
  s.ap = ap;
  s.of = flyd.stream;
  s.toString = streamToString;
  return s;
}

/**
 * @private
 * Create a dependent stream
 * @param {Array<stream>} dependencies - an array of the streams
 * @param {Function} fn - the function used to calculate the new stream value
 * from the dependencies
 * @return {stream} the created stream
 */
function createDependentStream(deps, fn) {
  var s = createStream();
  s.fn = fn;
  s.deps = deps;
  s.depsMet = false;
  s.depsChanged = deps.length > 0 ? [] : undefined;
  s.shouldUpdate = false;
  addListeners(deps, s);
  return s;
}

/**
 * @private
 * Check if all the dependencies have values
 * @param {stream} stream - the stream to check depencencies from
 * @return {Boolean} `true` if all dependencies have vales, `false` otherwise
 */
function initialDepsNotMet(stream) {
  stream.depsMet = stream.deps.every(function(s) {
    return s.hasVal;
  });
  return !stream.depsMet;
}

/**
 * @private
 * Update a dependent stream using its dependencies in an atomic way
 * @param {stream} stream - the stream to update
 */
function updateStream(s) {
  if ((s.depsMet !== true && initialDepsNotMet(s)) ||
      (s.end !== undefined && s.end.val === true)) return;
  if (inStream !== undefined) {
    toUpdate.push(s);
    return;
  }
  inStream = s;
  if (s.depsChanged) s.fnArgs[s.fnArgs.length - 1] = s.depsChanged;
  var returnVal = s.fn.apply(s.fn, s.fnArgs);
  if (returnVal !== undefined) {
    s(returnVal);
  }
  inStream = undefined;
  if (s.depsChanged !== undefined) s.depsChanged = [];
  s.shouldUpdate = false;
  if (flushing === false) flushUpdate();
}

/**
 * @private
 * Update the dependencies of a stream
 * @param {stream} stream
 */
function updateDeps(s) {
  var i, o, list
  var listeners = s.listeners;
  for (i = 0; i < listeners.length; ++i) {
    list = listeners[i];
    if (list.end === s) {
      endStream(list);
    } else {
      if (list.depsChanged !== undefined) list.depsChanged.push(s);
      list.shouldUpdate = true;
      findDeps(list);
    }
  }
  for (; orderNextIdx >= 0; --orderNextIdx) {
    o = order[orderNextIdx];
    if (o.shouldUpdate === true) updateStream(o);
    o.queued = false;
  }
}

/**
 * @private
 * Add stream dependencies to the global `order` queue.
 * @param {stream} stream
 * @see updateDeps
 */
function findDeps(s) {
  var i
  var listeners = s.listeners;
  if (s.queued === false) {
    s.queued = true;
    for (i = 0; i < listeners.length; ++i) {
      findDeps(listeners[i]);
    }
    order[++orderNextIdx] = s;
  }
}

/**
 * @private
 */
function flushUpdate() {
  flushing = true;
  while (toUpdate.length > 0) {
    var s = toUpdate.shift();
    if (s.vals.length > 0) s.val = s.vals.shift();
    updateDeps(s);
  }
  flushing = false;
}

/**
 * @private
 * Push down a value into a stream
 * @param {stream} stream
 * @param {*} value
 */
function updateStreamValue(s, n) {
  if (n !== undefined && n !== null && isFunction(n.then)) {
    n.then(s);
    return;
  }
  s.val = n;
  s.hasVal = true;
  if (inStream === undefined) {
    flushing = true;
    updateDeps(s);
    if (toUpdate.length > 0) flushUpdate(); else flushing = false;
  } else if (inStream === s) {
    markListeners(s, s.listeners);
  } else {
    s.vals.push(n);
    toUpdate.push(s);
  }
}

/**
 * @private
 */
function markListeners(s, lists) {
  var i, list;
  for (i = 0; i < lists.length; ++i) {
    list = lists[i];
    if (list.end !== s) {
      if (list.depsChanged !== undefined) {
        list.depsChanged.push(s);
      }
      list.shouldUpdate = true;
    } else {
      endStream(list);
    }
  }
}

/**
 * @private
 * Add dependencies to a stream
 * @param {Array<stream>} dependencies
 * @param {stream} stream
 */
function addListeners(deps, s) {
  for (var i = 0; i < deps.length; ++i) {
    deps[i].listeners.push(s);
  }
}

/**
 * @private
 * Removes an stream from a dependency array
 * @param {stream} stream
 * @param {Array<stream>} dependencies
 */
function removeListener(s, listeners) {
  var idx = listeners.indexOf(s);
  listeners[idx] = listeners[listeners.length - 1];
  listeners.length--;
}

/**
 * @private
 * Detach a stream from its dependencies
 * @param {stream} stream
 */
function detachDeps(s) {
  for (var i = 0; i < s.deps.length; ++i) {
    removeListener(s, s.deps[i].listeners);
  }
  s.deps.length = 0;
}

/**
 * @private
 * Ends a stream
 */
function endStream(s) {
  if (s.deps !== undefined) detachDeps(s);
  if (s.end !== undefined) detachDeps(s.end);
}

/**
 * @private
 * transducer stream transformer
 */
function StreamTransformer() { }
StreamTransformer.prototype['@@transducer/init'] = function() { };
StreamTransformer.prototype['@@transducer/result'] = function() { };
StreamTransformer.prototype['@@transducer/step'] = function(s, v) { return v; };

module.exports = flyd;


/***/ }),

/***/ 10:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 11:
/***/ (function(module, exports) {

module.exports = isWidget

function isWidget(w) {
    return w && w.type === "Widget"
}


/***/ }),

/***/ 12:
/***/ (function(module, exports) {

module.exports = function _arity(n, fn) {
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0: return function() { return fn.apply(this, arguments); };
    case 1: return function(a0) { return fn.apply(this, arguments); };
    case 2: return function(a0, a1) { return fn.apply(this, arguments); };
    case 3: return function(a0, a1, a2) { return fn.apply(this, arguments); };
    case 4: return function(a0, a1, a2, a3) { return fn.apply(this, arguments); };
    case 5: return function(a0, a1, a2, a3, a4) { return fn.apply(this, arguments); };
    case 6: return function(a0, a1, a2, a3, a4, a5) { return fn.apply(this, arguments); };
    case 7: return function(a0, a1, a2, a3, a4, a5, a6) { return fn.apply(this, arguments); };
    case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) { return fn.apply(this, arguments); };
    case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) { return fn.apply(this, arguments); };
    case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) { return fn.apply(this, arguments); };
    default: throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
};


/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

var _isPlaceholder = __webpack_require__(6);


/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
module.exports = function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
};


/***/ }),

/***/ 142:
/***/ (function(module, exports) {

module.exports = "2"


/***/ }),

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

var version = __webpack_require__(142)

module.exports = isVirtualNode

function isVirtualNode(x) {
    return x && x.type === "VirtualNode" && x.version === version
}


/***/ }),

/***/ 144:
/***/ (function(module, exports, __webpack_require__) {

var flyd = __webpack_require__(1);

module.exports = flyd.curryN(2, function(pairs, acc) {
  var streams = pairs.map(function(p) { return p[0]; });
  // use immediate because we want each stream to fire regardless of if the others have ever had a value
  return flyd.immediate(flyd.combine(function() {
    var changed = arguments[arguments.length - 1];
    // var self = arguments[arguments.length - 2];
    // because of atomic updates we can have more than one changed
    // meaning more than one function should be fired, lets do it in order so its predictable
    for (var p = 0; p < pairs.length; p++) {
      // because changed is an array of references it doesn't matter if we pull the first match in the case of multiple matches
      var idx = changed.indexOf(pairs[p][0]);
      if (idx !== -1) {
        acc = pairs[p][1](acc, changed[idx]());
      }
    }
    return acc;
  }, streams));
});


/***/ }),

/***/ 150:
/***/ (function(module, exports) {

module.exports = isThunk

function isThunk(t) {
    return t && t.type === "Thunk"
}


/***/ }),

/***/ 151:
/***/ (function(module, exports) {

module.exports = isHook

function isHook(hook) {
    return hook &&
      (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") ||
       typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"))
}


/***/ }),

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

var version = __webpack_require__(142)

module.exports = isVirtualText

function isVirtualText(x) {
    return x && x.type === "VirtualText" && x.version === version
}


/***/ }),

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

var _arity = __webpack_require__(12);
var _curry1 = __webpack_require__(13);
var _curry2 = __webpack_require__(158);
var _curryN = __webpack_require__(159);


/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. The curried function has two unusual capabilities. First, its
 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value `R.__` may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is `R.__`, the
 * following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      var sumArgs = (...args) => R.sum(args);
 *
 *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */
module.exports = _curry2(function curryN(length, fn) {
  if (length === 1) {
    return _curry1(fn);
  }
  return _arity(length, _curryN(length, [], fn));
});


/***/ }),

/***/ 158:
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(13);
var _isPlaceholder = __webpack_require__(6);


/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
module.exports = function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return _isPlaceholder(a) ? f2
             : _curry1(function(_b) { return fn(a, _b); });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f2
             : _isPlaceholder(a) ? _curry1(function(_a) { return fn(_a, b); })
             : _isPlaceholder(b) ? _curry1(function(_b) { return fn(a, _b); })
             : fn(a, b);
    }
  };
};


/***/ }),

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

var _arity = __webpack_require__(12);
var _isPlaceholder = __webpack_require__(6);


/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @param {Array} received An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
module.exports = function _curryN(length, received, fn) {
  return function() {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;
    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;
      if (combinedIdx < received.length &&
          (!_isPlaceholder(received[combinedIdx]) ||
           argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }
      combined[combinedIdx] = result;
      if (!_isPlaceholder(result)) {
        left -= 1;
      }
      combinedIdx += 1;
    }
    return left <= 0 ? fn.apply(this, combined)
                     : _arity(left, _curryN(length, combined, fn));
  };
};


/***/ }),

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

var h = __webpack_require__(204)

module.exports = h


/***/ }),

/***/ 170:
/***/ (function(module, exports) {

var nativeIsArray = Array.isArray
var toString = Object.prototype.toString

module.exports = nativeIsArray || isArray

function isArray(obj) {
    return toString.call(obj) === "[object Array]"
}


/***/ }),

/***/ 182:
/***/ (function(module, exports, __webpack_require__) {

var createElement = __webpack_require__(214)
var patch = __webpack_require__(216)
var diff = __webpack_require__(221)
var curryN = __webpack_require__(224).curryN

var view = curryN(3, function(rootFn, parentNode, state) {
 var view = {root: rootFn, tree: rootFn(state)}
 view.rootNode = createElement(view.tree)
 parentNode.appendChild(view.rootNode)
 return rerender(view)
})

var rerender = curryN(2, function(view, newState) {
 var newTree = view.root(newState)
 var patches = diff(view.tree, newTree)
 view.rootNode = patch(view.rootNode, patches)
 view.tree = newTree
 return newTree
})

module.exports = view



/***/ }),

/***/ 183:
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(184)

var applyProperties = __webpack_require__(185)

var isVNode = __webpack_require__(143)
var isVText = __webpack_require__(152)
var isWidget = __webpack_require__(11)
var handleThunk = __webpack_require__(187)

module.exports = createElement

function createElement(vnode, opts) {
    var doc = opts ? opts.document || document : document
    var warn = opts ? opts.warn : null

    vnode = handleThunk(vnode).a

    if (isWidget(vnode)) {
        return vnode.init()
    } else if (isVText(vnode)) {
        return doc.createTextNode(vnode.text)
    } else if (!isVNode(vnode)) {
        if (warn) {
            warn("Item is not a valid virtual dom node", vnode)
        }
        return null
    }

    var node = (vnode.namespace === null) ?
        doc.createElement(vnode.tagName) :
        doc.createElementNS(vnode.namespace, vnode.tagName)

    var props = vnode.properties
    applyProperties(node, props)

    var children = vnode.children

    for (var i = 0; i < children.length; i++) {
        var childNode = createElement(children[i], opts)
        if (childNode) {
            node.appendChild(childNode)
        }
    }

    return node
}


/***/ }),

/***/ 184:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = __webpack_require__(215);

var doccy;

if (typeof document !== 'undefined') {
    doccy = document;
} else {
    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }
}

module.exports = doccy;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),

/***/ 185:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(186)
var isHook = __webpack_require__(151)

module.exports = applyProperties

function applyProperties(node, props, previous) {
    for (var propName in props) {
        var propValue = props[propName]

        if (propValue === undefined) {
            removeProperty(node, propName, propValue, previous);
        } else if (isHook(propValue)) {
            removeProperty(node, propName, propValue, previous)
            if (propValue.hook) {
                propValue.hook(node,
                    propName,
                    previous ? previous[propName] : undefined)
            }
        } else {
            if (isObject(propValue)) {
                patchObject(node, props, previous, propName, propValue);
            } else {
                node[propName] = propValue
            }
        }
    }
}

function removeProperty(node, propName, propValue, previous) {
    if (previous) {
        var previousValue = previous[propName]

        if (!isHook(previousValue)) {
            if (propName === "attributes") {
                for (var attrName in previousValue) {
                    node.removeAttribute(attrName)
                }
            } else if (propName === "style") {
                for (var i in previousValue) {
                    node.style[i] = ""
                }
            } else if (typeof previousValue === "string") {
                node[propName] = ""
            } else {
                node[propName] = null
            }
        } else if (previousValue.unhook) {
            previousValue.unhook(node, propName, propValue)
        }
    }
}

function patchObject(node, props, previous, propName, propValue) {
    var previousValue = previous ? previous[propName] : undefined

    // Set attributes
    if (propName === "attributes") {
        for (var attrName in propValue) {
            var attrValue = propValue[attrName]

            if (attrValue === undefined) {
                node.removeAttribute(attrName)
            } else {
                node.setAttribute(attrName, attrValue)
            }
        }

        return
    }

    if(previousValue && isObject(previousValue) &&
        getPrototype(previousValue) !== getPrototype(propValue)) {
        node[propName] = propValue
        return
    }

    if (!isObject(node[propName])) {
        node[propName] = {}
    }

    var replacer = propName === "style" ? "" : undefined

    for (var k in propValue) {
        var value = propValue[k]
        node[propName][k] = (value === undefined) ? replacer : value
    }
}

function getPrototype(value) {
    if (Object.getPrototypeOf) {
        return Object.getPrototypeOf(value)
    } else if (value.__proto__) {
        return value.__proto__
    } else if (value.constructor) {
        return value.constructor.prototype
    }
}


/***/ }),

/***/ 186:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isObject(x) {
	return typeof x === "object" && x !== null;
};


/***/ }),

/***/ 187:
/***/ (function(module, exports, __webpack_require__) {

var isVNode = __webpack_require__(143)
var isVText = __webpack_require__(152)
var isWidget = __webpack_require__(11)
var isThunk = __webpack_require__(150)

module.exports = handleThunk

function handleThunk(a, b) {
    var renderedA = a
    var renderedB = b

    if (isThunk(b)) {
        renderedB = renderThunk(b, a)
    }

    if (isThunk(a)) {
        renderedA = renderThunk(a, null)
    }

    return {
        a: renderedA,
        b: renderedB
    }
}

function renderThunk(thunk, previous) {
    var renderedThunk = thunk.vnode

    if (!renderedThunk) {
        renderedThunk = thunk.vnode = thunk.render(previous)
    }

    if (!(isVNode(renderedThunk) ||
            isVText(renderedThunk) ||
            isWidget(renderedThunk))) {
        throw new Error("thunk did not return a valid node");
    }

    return renderedThunk
}


/***/ }),

/***/ 188:
/***/ (function(module, exports, __webpack_require__) {

var version = __webpack_require__(142)

VirtualPatch.NONE = 0
VirtualPatch.VTEXT = 1
VirtualPatch.VNODE = 2
VirtualPatch.WIDGET = 3
VirtualPatch.PROPS = 4
VirtualPatch.ORDER = 5
VirtualPatch.INSERT = 6
VirtualPatch.REMOVE = 7
VirtualPatch.THUNK = 8

module.exports = VirtualPatch

function VirtualPatch(type, vNode, patch) {
    this.type = Number(type)
    this.vNode = vNode
    this.patch = patch
}

VirtualPatch.prototype.version = version
VirtualPatch.prototype.type = "VirtualPatch"


/***/ }),

/***/ 204:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArray = __webpack_require__(170);

var VNode = __webpack_require__(205);
var VText = __webpack_require__(206);
var isVNode = __webpack_require__(143);
var isVText = __webpack_require__(152);
var isWidget = __webpack_require__(11);
var isHook = __webpack_require__(151);
var isVThunk = __webpack_require__(150);

var parseTag = __webpack_require__(207);
var softSetHook = __webpack_require__(209);
var evHook = __webpack_require__(210);

module.exports = h;

function h(tagName, properties, children) {
    var childNodes = [];
    var tag, props, key, namespace;

    if (!children && isChildren(properties)) {
        children = properties;
        props = {};
    }

    props = props || properties || {};
    tag = parseTag(tagName, props);

    // support keys
    if (props.hasOwnProperty('key')) {
        key = props.key;
        props.key = undefined;
    }

    // support namespace
    if (props.hasOwnProperty('namespace')) {
        namespace = props.namespace;
        props.namespace = undefined;
    }

    // fix cursor bug
    if (tag === 'INPUT' &&
        !namespace &&
        props.hasOwnProperty('value') &&
        props.value !== undefined &&
        !isHook(props.value)
    ) {
        props.value = softSetHook(props.value);
    }

    transformProperties(props);

    if (children !== undefined && children !== null) {
        addChild(children, childNodes, tag, props);
    }


    return new VNode(tag, props, childNodes, key, namespace);
}

function addChild(c, childNodes, tag, props) {
    if (typeof c === 'string') {
        childNodes.push(new VText(c));
    } else if (typeof c === 'number') {
        childNodes.push(new VText(String(c)));
    } else if (isChild(c)) {
        childNodes.push(c);
    } else if (isArray(c)) {
        for (var i = 0; i < c.length; i++) {
            addChild(c[i], childNodes, tag, props);
        }
    } else if (c === null || c === undefined) {
        return;
    } else {
        throw UnexpectedVirtualElement({
            foreignObject: c,
            parentVnode: {
                tagName: tag,
                properties: props
            }
        });
    }
}

function transformProperties(props) {
    for (var propName in props) {
        if (props.hasOwnProperty(propName)) {
            var value = props[propName];

            if (isHook(value)) {
                continue;
            }

            if (propName.substr(0, 3) === 'ev-') {
                // add ev-foo support
                props[propName] = evHook(value);
            }
        }
    }
}

function isChild(x) {
    return isVNode(x) || isVText(x) || isWidget(x) || isVThunk(x);
}

function isChildren(x) {
    return typeof x === 'string' || isArray(x) || isChild(x);
}

function UnexpectedVirtualElement(data) {
    var err = new Error();

    err.type = 'virtual-hyperscript.unexpected.virtual-element';
    err.message = 'Unexpected virtual child passed to h().\n' +
        'Expected a VNode / Vthunk / VWidget / string but:\n' +
        'got:\n' +
        errorString(data.foreignObject) +
        '.\n' +
        'The parent vnode is:\n' +
        errorString(data.parentVnode)
        '\n' +
        'Suggested fix: change your `h(..., [ ... ])` callsite.';
    err.foreignObject = data.foreignObject;
    err.parentVnode = data.parentVnode;

    return err;
}

function errorString(obj) {
    try {
        return JSON.stringify(obj, null, '    ');
    } catch (e) {
        return String(obj);
    }
}


/***/ }),

/***/ 205:
/***/ (function(module, exports, __webpack_require__) {

var version = __webpack_require__(142)
var isVNode = __webpack_require__(143)
var isWidget = __webpack_require__(11)
var isThunk = __webpack_require__(150)
var isVHook = __webpack_require__(151)

module.exports = VirtualNode

var noProperties = {}
var noChildren = []

function VirtualNode(tagName, properties, children, key, namespace) {
    this.tagName = tagName
    this.properties = properties || noProperties
    this.children = children || noChildren
    this.key = key != null ? String(key) : undefined
    this.namespace = (typeof namespace === "string") ? namespace : null

    var count = (children && children.length) || 0
    var descendants = 0
    var hasWidgets = false
    var hasThunks = false
    var descendantHooks = false
    var hooks

    for (var propName in properties) {
        if (properties.hasOwnProperty(propName)) {
            var property = properties[propName]
            if (isVHook(property) && property.unhook) {
                if (!hooks) {
                    hooks = {}
                }

                hooks[propName] = property
            }
        }
    }

    for (var i = 0; i < count; i++) {
        var child = children[i]
        if (isVNode(child)) {
            descendants += child.count || 0

            if (!hasWidgets && child.hasWidgets) {
                hasWidgets = true
            }

            if (!hasThunks && child.hasThunks) {
                hasThunks = true
            }

            if (!descendantHooks && (child.hooks || child.descendantHooks)) {
                descendantHooks = true
            }
        } else if (!hasWidgets && isWidget(child)) {
            if (typeof child.destroy === "function") {
                hasWidgets = true
            }
        } else if (!hasThunks && isThunk(child)) {
            hasThunks = true;
        }
    }

    this.count = count + descendants
    this.hasWidgets = hasWidgets
    this.hasThunks = hasThunks
    this.hooks = hooks
    this.descendantHooks = descendantHooks
}

VirtualNode.prototype.version = version
VirtualNode.prototype.type = "VirtualNode"


/***/ }),

/***/ 206:
/***/ (function(module, exports, __webpack_require__) {

var version = __webpack_require__(142)

module.exports = VirtualText

function VirtualText(text) {
    this.text = String(text)
}

VirtualText.prototype.version = version
VirtualText.prototype.type = "VirtualText"


/***/ }),

/***/ 207:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var split = __webpack_require__(208);

var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
var notClassId = /^\.|#/;

module.exports = parseTag;

function parseTag(tag, props) {
    if (!tag) {
        return 'DIV';
    }

    var noId = !(props.hasOwnProperty('id'));

    var tagParts = split(tag, classIdSplit);
    var tagName = null;

    if (notClassId.test(tagParts[1])) {
        tagName = 'DIV';
    }

    var classes, part, type, i;

    for (i = 0; i < tagParts.length; i++) {
        part = tagParts[i];

        if (!part) {
            continue;
        }

        type = part.charAt(0);

        if (!tagName) {
            tagName = part;
        } else if (type === '.') {
            classes = classes || [];
            classes.push(part.substring(1, part.length));
        } else if (type === '#' && noId) {
            props.id = part.substring(1, part.length);
        }
    }

    if (classes) {
        if (props.className) {
            classes.push(props.className);
        }

        props.className = classes.join(' ');
    }

    return props.namespace ? tagName : tagName.toUpperCase();
}


/***/ }),

/***/ 208:
/***/ (function(module, exports) {

/*!
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 * ECMAScript compliant, uniform cross-browser split method
 */

/**
 * Splits a string into an array of strings using a regex or string separator. Matches of the
 * separator are not included in the result array. However, if `separator` is a regex that contains
 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
 * cross-browser.
 * @param {String} str String to split.
 * @param {RegExp|String} separator Regex or string to use for separating the string.
 * @param {Number} [limit] Maximum number of items to include in the result array.
 * @returns {Array} Array of substrings.
 * @example
 *
 * // Basic use
 * split('a b c d', ' ');
 * // -> ['a', 'b', 'c', 'd']
 *
 * // With limit
 * split('a b c d', ' ', 2);
 * // -> ['a', 'b']
 *
 * // Backreferences in result array
 * split('..word1 word2..', /([a-z]+)(\d+)/i);
 * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
 */
module.exports = (function split(undef) {

  var nativeSplit = String.prototype.split,
    compliantExecNpcg = /()??/.exec("")[1] === undef,
    // NPCG: nonparticipating capturing group
    self;

  self = function(str, separator, limit) {
    // If `separator` is not a regex, use `nativeSplit`
    if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
      return nativeSplit.call(str, separator, limit);
    }
    var output = [],
      flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + // Proposed for ES6
      (separator.sticky ? "y" : ""),
      // Firefox 3+
      lastLastIndex = 0,
      // Make `global` and avoid `lastIndex` issues by working with a copy
      separator = new RegExp(separator.source, flags + "g"),
      separator2, match, lastIndex, lastLength;
    str += ""; // Type-convert
    if (!compliantExecNpcg) {
      // Doesn't need flags gy, but they don't hurt
      separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
    }
    /* Values for `limit`, per the spec:
     * If undefined: 4294967295 // Math.pow(2, 32) - 1
     * If 0, Infinity, or NaN: 0
     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
     * If other: Type-convert, then use the above rules
     */
    limit = limit === undef ? -1 >>> 0 : // Math.pow(2, 32) - 1
    limit >>> 0; // ToUint32(limit)
    while (match = separator.exec(str)) {
      // `separator.lastIndex` is not reliable cross-browser
      lastIndex = match.index + match[0].length;
      if (lastIndex > lastLastIndex) {
        output.push(str.slice(lastLastIndex, match.index));
        // Fix browsers whose `exec` methods don't consistently return `undefined` for
        // nonparticipating capturing groups
        if (!compliantExecNpcg && match.length > 1) {
          match[0].replace(separator2, function() {
            for (var i = 1; i < arguments.length - 2; i++) {
              if (arguments[i] === undef) {
                match[i] = undef;
              }
            }
          });
        }
        if (match.length > 1 && match.index < str.length) {
          Array.prototype.push.apply(output, match.slice(1));
        }
        lastLength = match[0].length;
        lastLastIndex = lastIndex;
        if (output.length >= limit) {
          break;
        }
      }
      if (separator.lastIndex === match.index) {
        separator.lastIndex++; // Avoid an infinite loop
      }
    }
    if (lastLastIndex === str.length) {
      if (lastLength || !separator.test("")) {
        output.push("");
      }
    } else {
      output.push(str.slice(lastLastIndex));
    }
    return output.length > limit ? output.slice(0, limit) : output;
  };

  return self;
})();


/***/ }),

/***/ 209:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = SoftSetHook;

function SoftSetHook(value) {
    if (!(this instanceof SoftSetHook)) {
        return new SoftSetHook(value);
    }

    this.value = value;
}

SoftSetHook.prototype.hook = function (node, propertyName) {
    if (node[propertyName] !== this.value) {
        node[propertyName] = this.value;
    }
};


/***/ }),

/***/ 210:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EvStore = __webpack_require__(211);

module.exports = EvHook;

function EvHook(value) {
    if (!(this instanceof EvHook)) {
        return new EvHook(value);
    }

    this.value = value;
}

EvHook.prototype.hook = function (node, propertyName) {
    var es = EvStore(node);
    var propName = propertyName.substr(3);

    es[propName] = this.value;
};

EvHook.prototype.unhook = function(node, propertyName) {
    var es = EvStore(node);
    var propName = propertyName.substr(3);

    es[propName] = undefined;
};


/***/ }),

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var OneVersionConstraint = __webpack_require__(212);

var MY_VERSION = '7';
OneVersionConstraint('ev-store', MY_VERSION);

var hashKey = '__EV_STORE_KEY@' + MY_VERSION;

module.exports = EvStore;

function EvStore(elem) {
    var hash = elem[hashKey];

    if (!hash) {
        hash = elem[hashKey] = {};
    }

    return hash;
}


/***/ }),

/***/ 212:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Individual = __webpack_require__(213);

module.exports = OneVersion;

function OneVersion(moduleName, version, defaultValue) {
    var key = '__INDIVIDUAL_ONE_VERSION_' + moduleName;
    var enforceKey = key + '_ENFORCE_SINGLETON';

    var versionValue = Individual(enforceKey, version);

    if (versionValue !== version) {
        throw new Error('Can only have one copy of ' +
            moduleName + '.\n' +
            'You already have version ' + versionValue +
            ' installed.\n' +
            'This means you cannot install version ' + version);
    }

    return Individual(key, defaultValue);
}


/***/ }),

/***/ 213:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

/*global window, global*/

var root = typeof window !== 'undefined' ?
    window : typeof global !== 'undefined' ?
    global : {};

module.exports = Individual;

function Individual(key, value) {
    if (key in root) {
        return root[key];
    }

    root[key] = value;

    return value;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),

/***/ 214:
/***/ (function(module, exports, __webpack_require__) {

var createElement = __webpack_require__(183)

module.exports = createElement


/***/ }),

/***/ 215:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 216:
/***/ (function(module, exports, __webpack_require__) {

var patch = __webpack_require__(217)

module.exports = patch


/***/ }),

/***/ 217:
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(184)
var isArray = __webpack_require__(170)

var render = __webpack_require__(183)
var domIndex = __webpack_require__(218)
var patchOp = __webpack_require__(219)
module.exports = patch

function patch(rootNode, patches, renderOptions) {
    renderOptions = renderOptions || {}
    renderOptions.patch = renderOptions.patch && renderOptions.patch !== patch
        ? renderOptions.patch
        : patchRecursive
    renderOptions.render = renderOptions.render || render

    return renderOptions.patch(rootNode, patches, renderOptions)
}

function patchRecursive(rootNode, patches, renderOptions) {
    var indices = patchIndices(patches)

    if (indices.length === 0) {
        return rootNode
    }

    var index = domIndex(rootNode, patches.a, indices)
    var ownerDocument = rootNode.ownerDocument

    if (!renderOptions.document && ownerDocument !== document) {
        renderOptions.document = ownerDocument
    }

    for (var i = 0; i < indices.length; i++) {
        var nodeIndex = indices[i]
        rootNode = applyPatch(rootNode,
            index[nodeIndex],
            patches[nodeIndex],
            renderOptions)
    }

    return rootNode
}

function applyPatch(rootNode, domNode, patchList, renderOptions) {
    if (!domNode) {
        return rootNode
    }

    var newNode

    if (isArray(patchList)) {
        for (var i = 0; i < patchList.length; i++) {
            newNode = patchOp(patchList[i], domNode, renderOptions)

            if (domNode === rootNode) {
                rootNode = newNode
            }
        }
    } else {
        newNode = patchOp(patchList, domNode, renderOptions)

        if (domNode === rootNode) {
            rootNode = newNode
        }
    }

    return rootNode
}

function patchIndices(patches) {
    var indices = []

    for (var key in patches) {
        if (key !== "a") {
            indices.push(Number(key))
        }
    }

    return indices
}


/***/ }),

/***/ 218:
/***/ (function(module, exports) {

// Maps a virtual DOM tree onto a real DOM tree in an efficient manner.
// We don't want to read all of the DOM nodes in the tree so we use
// the in-order tree indexing to eliminate recursion down certain branches.
// We only recurse into a DOM node if we know that it contains a child of
// interest.

var noChild = {}

module.exports = domIndex

function domIndex(rootNode, tree, indices, nodes) {
    if (!indices || indices.length === 0) {
        return {}
    } else {
        indices.sort(ascending)
        return recurse(rootNode, tree, indices, nodes, 0)
    }
}

function recurse(rootNode, tree, indices, nodes, rootIndex) {
    nodes = nodes || {}


    if (rootNode) {
        if (indexInRange(indices, rootIndex, rootIndex)) {
            nodes[rootIndex] = rootNode
        }

        var vChildren = tree.children

        if (vChildren) {

            var childNodes = rootNode.childNodes

            for (var i = 0; i < tree.children.length; i++) {
                rootIndex += 1

                var vChild = vChildren[i] || noChild
                var nextIndex = rootIndex + (vChild.count || 0)

                // skip recursion down the tree if there are no nodes down here
                if (indexInRange(indices, rootIndex, nextIndex)) {
                    recurse(childNodes[i], vChild, indices, nodes, rootIndex)
                }

                rootIndex = nextIndex
            }
        }
    }

    return nodes
}

// Binary search for an index in the interval [left, right]
function indexInRange(indices, left, right) {
    if (indices.length === 0) {
        return false
    }

    var minIndex = 0
    var maxIndex = indices.length - 1
    var currentIndex
    var currentItem

    while (minIndex <= maxIndex) {
        currentIndex = ((maxIndex + minIndex) / 2) >> 0
        currentItem = indices[currentIndex]

        if (minIndex === maxIndex) {
            return currentItem >= left && currentItem <= right
        } else if (currentItem < left) {
            minIndex = currentIndex + 1
        } else  if (currentItem > right) {
            maxIndex = currentIndex - 1
        } else {
            return true
        }
    }

    return false;
}

function ascending(a, b) {
    return a > b ? 1 : -1
}


/***/ }),

/***/ 219:
/***/ (function(module, exports, __webpack_require__) {

var applyProperties = __webpack_require__(185)

var isWidget = __webpack_require__(11)
var VPatch = __webpack_require__(188)

var updateWidget = __webpack_require__(220)

module.exports = applyPatch

function applyPatch(vpatch, domNode, renderOptions) {
    var type = vpatch.type
    var vNode = vpatch.vNode
    var patch = vpatch.patch

    switch (type) {
        case VPatch.REMOVE:
            return removeNode(domNode, vNode)
        case VPatch.INSERT:
            return insertNode(domNode, patch, renderOptions)
        case VPatch.VTEXT:
            return stringPatch(domNode, vNode, patch, renderOptions)
        case VPatch.WIDGET:
            return widgetPatch(domNode, vNode, patch, renderOptions)
        case VPatch.VNODE:
            return vNodePatch(domNode, vNode, patch, renderOptions)
        case VPatch.ORDER:
            reorderChildren(domNode, patch)
            return domNode
        case VPatch.PROPS:
            applyProperties(domNode, patch, vNode.properties)
            return domNode
        case VPatch.THUNK:
            return replaceRoot(domNode,
                renderOptions.patch(domNode, patch, renderOptions))
        default:
            return domNode
    }
}

function removeNode(domNode, vNode) {
    var parentNode = domNode.parentNode

    if (parentNode) {
        parentNode.removeChild(domNode)
    }

    destroyWidget(domNode, vNode);

    return null
}

function insertNode(parentNode, vNode, renderOptions) {
    var newNode = renderOptions.render(vNode, renderOptions)

    if (parentNode) {
        parentNode.appendChild(newNode)
    }

    return parentNode
}

function stringPatch(domNode, leftVNode, vText, renderOptions) {
    var newNode

    if (domNode.nodeType === 3) {
        domNode.replaceData(0, domNode.length, vText.text)
        newNode = domNode
    } else {
        var parentNode = domNode.parentNode
        newNode = renderOptions.render(vText, renderOptions)

        if (parentNode && newNode !== domNode) {
            parentNode.replaceChild(newNode, domNode)
        }
    }

    return newNode
}

function widgetPatch(domNode, leftVNode, widget, renderOptions) {
    var updating = updateWidget(leftVNode, widget)
    var newNode

    if (updating) {
        newNode = widget.update(leftVNode, domNode) || domNode
    } else {
        newNode = renderOptions.render(widget, renderOptions)
    }

    var parentNode = domNode.parentNode

    if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode)
    }

    if (!updating) {
        destroyWidget(domNode, leftVNode)
    }

    return newNode
}

function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
    var parentNode = domNode.parentNode
    var newNode = renderOptions.render(vNode, renderOptions)

    if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode)
    }

    return newNode
}

function destroyWidget(domNode, w) {
    if (typeof w.destroy === "function" && isWidget(w)) {
        w.destroy(domNode)
    }
}

function reorderChildren(domNode, moves) {
    var childNodes = domNode.childNodes
    var keyMap = {}
    var node
    var remove
    var insert

    for (var i = 0; i < moves.removes.length; i++) {
        remove = moves.removes[i]
        node = childNodes[remove.from]
        if (remove.key) {
            keyMap[remove.key] = node
        }
        domNode.removeChild(node)
    }

    var length = childNodes.length
    for (var j = 0; j < moves.inserts.length; j++) {
        insert = moves.inserts[j]
        node = keyMap[insert.key]
        // this is the weirdest bug i've ever seen in webkit
        domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to])
    }
}

function replaceRoot(oldRoot, newRoot) {
    if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) {
        oldRoot.parentNode.replaceChild(newRoot, oldRoot)
    }

    return newRoot;
}


/***/ }),

/***/ 220:
/***/ (function(module, exports, __webpack_require__) {

var isWidget = __webpack_require__(11)

module.exports = updateWidget

function updateWidget(a, b) {
    if (isWidget(a) && isWidget(b)) {
        if ("name" in a && "name" in b) {
            return a.id === b.id
        } else {
            return a.init === b.init
        }
    }

    return false
}


/***/ }),

/***/ 221:
/***/ (function(module, exports, __webpack_require__) {

var diff = __webpack_require__(222)

module.exports = diff


/***/ }),

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(170)

var VPatch = __webpack_require__(188)
var isVNode = __webpack_require__(143)
var isVText = __webpack_require__(152)
var isWidget = __webpack_require__(11)
var isThunk = __webpack_require__(150)
var handleThunk = __webpack_require__(187)

var diffProps = __webpack_require__(223)

module.exports = diff

function diff(a, b) {
    var patch = { a: a }
    walk(a, b, patch, 0)
    return patch
}

function walk(a, b, patch, index) {
    if (a === b) {
        return
    }

    var apply = patch[index]
    var applyClear = false

    if (isThunk(a) || isThunk(b)) {
        thunks(a, b, patch, index)
    } else if (b == null) {

        // If a is a widget we will add a remove patch for it
        // Otherwise any child widgets/hooks must be destroyed.
        // This prevents adding two remove patches for a widget.
        if (!isWidget(a)) {
            clearState(a, patch, index)
            apply = patch[index]
        }

        apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b))
    } else if (isVNode(b)) {
        if (isVNode(a)) {
            if (a.tagName === b.tagName &&
                a.namespace === b.namespace &&
                a.key === b.key) {
                var propsPatch = diffProps(a.properties, b.properties)
                if (propsPatch) {
                    apply = appendPatch(apply,
                        new VPatch(VPatch.PROPS, a, propsPatch))
                }
                apply = diffChildren(a, b, patch, apply, index)
            } else {
                apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
                applyClear = true
            }
        } else {
            apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
            applyClear = true
        }
    } else if (isVText(b)) {
        if (!isVText(a)) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
            applyClear = true
        } else if (a.text !== b.text) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
        }
    } else if (isWidget(b)) {
        if (!isWidget(a)) {
            applyClear = true
        }

        apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b))
    }

    if (apply) {
        patch[index] = apply
    }

    if (applyClear) {
        clearState(a, patch, index)
    }
}

function diffChildren(a, b, patch, apply, index) {
    var aChildren = a.children
    var orderedSet = reorder(aChildren, b.children)
    var bChildren = orderedSet.children

    var aLen = aChildren.length
    var bLen = bChildren.length
    var len = aLen > bLen ? aLen : bLen

    for (var i = 0; i < len; i++) {
        var leftNode = aChildren[i]
        var rightNode = bChildren[i]
        index += 1

        if (!leftNode) {
            if (rightNode) {
                // Excess nodes in b need to be added
                apply = appendPatch(apply,
                    new VPatch(VPatch.INSERT, null, rightNode))
            }
        } else {
            walk(leftNode, rightNode, patch, index)
        }

        if (isVNode(leftNode) && leftNode.count) {
            index += leftNode.count
        }
    }

    if (orderedSet.moves) {
        // Reorder nodes last
        apply = appendPatch(apply, new VPatch(
            VPatch.ORDER,
            a,
            orderedSet.moves
        ))
    }

    return apply
}

function clearState(vNode, patch, index) {
    // TODO: Make this a single walk, not two
    unhook(vNode, patch, index)
    destroyWidgets(vNode, patch, index)
}

// Patch records for all destroyed widgets must be added because we need
// a DOM node reference for the destroy function
function destroyWidgets(vNode, patch, index) {
    if (isWidget(vNode)) {
        if (typeof vNode.destroy === "function") {
            patch[index] = appendPatch(
                patch[index],
                new VPatch(VPatch.REMOVE, vNode, null)
            )
        }
    } else if (isVNode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
        var children = vNode.children
        var len = children.length
        for (var i = 0; i < len; i++) {
            var child = children[i]
            index += 1

            destroyWidgets(child, patch, index)

            if (isVNode(child) && child.count) {
                index += child.count
            }
        }
    } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index)
    }
}

// Create a sub-patch for thunks
function thunks(a, b, patch, index) {
    var nodes = handleThunk(a, b)
    var thunkPatch = diff(nodes.a, nodes.b)
    if (hasPatches(thunkPatch)) {
        patch[index] = new VPatch(VPatch.THUNK, null, thunkPatch)
    }
}

function hasPatches(patch) {
    for (var index in patch) {
        if (index !== "a") {
            return true
        }
    }

    return false
}

// Execute hooks when two nodes are identical
function unhook(vNode, patch, index) {
    if (isVNode(vNode)) {
        if (vNode.hooks) {
            patch[index] = appendPatch(
                patch[index],
                new VPatch(
                    VPatch.PROPS,
                    vNode,
                    undefinedKeys(vNode.hooks)
                )
            )
        }

        if (vNode.descendantHooks || vNode.hasThunks) {
            var children = vNode.children
            var len = children.length
            for (var i = 0; i < len; i++) {
                var child = children[i]
                index += 1

                unhook(child, patch, index)

                if (isVNode(child) && child.count) {
                    index += child.count
                }
            }
        }
    } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index)
    }
}

function undefinedKeys(obj) {
    var result = {}

    for (var key in obj) {
        result[key] = undefined
    }

    return result
}

// List diff, naive left to right reordering
function reorder(aChildren, bChildren) {
    // O(M) time, O(M) memory
    var bChildIndex = keyIndex(bChildren)
    var bKeys = bChildIndex.keys
    var bFree = bChildIndex.free

    if (bFree.length === bChildren.length) {
        return {
            children: bChildren,
            moves: null
        }
    }

    // O(N) time, O(N) memory
    var aChildIndex = keyIndex(aChildren)
    var aKeys = aChildIndex.keys
    var aFree = aChildIndex.free

    if (aFree.length === aChildren.length) {
        return {
            children: bChildren,
            moves: null
        }
    }

    // O(MAX(N, M)) memory
    var newChildren = []

    var freeIndex = 0
    var freeCount = bFree.length
    var deletedItems = 0

    // Iterate through a and match a node in b
    // O(N) time,
    for (var i = 0 ; i < aChildren.length; i++) {
        var aItem = aChildren[i]
        var itemIndex

        if (aItem.key) {
            if (bKeys.hasOwnProperty(aItem.key)) {
                // Match up the old keys
                itemIndex = bKeys[aItem.key]
                newChildren.push(bChildren[itemIndex])

            } else {
                // Remove old keyed items
                itemIndex = i - deletedItems++
                newChildren.push(null)
            }
        } else {
            // Match the item in a with the next free item in b
            if (freeIndex < freeCount) {
                itemIndex = bFree[freeIndex++]
                newChildren.push(bChildren[itemIndex])
            } else {
                // There are no free items in b to match with
                // the free items in a, so the extra free nodes
                // are deleted.
                itemIndex = i - deletedItems++
                newChildren.push(null)
            }
        }
    }

    var lastFreeIndex = freeIndex >= bFree.length ?
        bChildren.length :
        bFree[freeIndex]

    // Iterate through b and append any new keys
    // O(M) time
    for (var j = 0; j < bChildren.length; j++) {
        var newItem = bChildren[j]

        if (newItem.key) {
            if (!aKeys.hasOwnProperty(newItem.key)) {
                // Add any new keyed items
                // We are adding new items to the end and then sorting them
                // in place. In future we should insert new items in place.
                newChildren.push(newItem)
            }
        } else if (j >= lastFreeIndex) {
            // Add any leftover non-keyed items
            newChildren.push(newItem)
        }
    }

    var simulate = newChildren.slice()
    var simulateIndex = 0
    var removes = []
    var inserts = []
    var simulateItem

    for (var k = 0; k < bChildren.length;) {
        var wantedItem = bChildren[k]
        simulateItem = simulate[simulateIndex]

        // remove items
        while (simulateItem === null && simulate.length) {
            removes.push(remove(simulate, simulateIndex, null))
            simulateItem = simulate[simulateIndex]
        }

        if (!simulateItem || simulateItem.key !== wantedItem.key) {
            // if we need a key in this position...
            if (wantedItem.key) {
                if (simulateItem && simulateItem.key) {
                    // if an insert doesn't put this key in place, it needs to move
                    if (bKeys[simulateItem.key] !== k + 1) {
                        removes.push(remove(simulate, simulateIndex, simulateItem.key))
                        simulateItem = simulate[simulateIndex]
                        // if the remove didn't put the wanted item in place, we need to insert it
                        if (!simulateItem || simulateItem.key !== wantedItem.key) {
                            inserts.push({key: wantedItem.key, to: k})
                        }
                        // items are matching, so skip ahead
                        else {
                            simulateIndex++
                        }
                    }
                    else {
                        inserts.push({key: wantedItem.key, to: k})
                    }
                }
                else {
                    inserts.push({key: wantedItem.key, to: k})
                }
                k++
            }
            // a key in simulate has no matching wanted key, remove it
            else if (simulateItem && simulateItem.key) {
                removes.push(remove(simulate, simulateIndex, simulateItem.key))
            }
        }
        else {
            simulateIndex++
            k++
        }
    }

    // remove all the remaining nodes from simulate
    while(simulateIndex < simulate.length) {
        simulateItem = simulate[simulateIndex]
        removes.push(remove(simulate, simulateIndex, simulateItem && simulateItem.key))
    }

    // If the only moves we have are deletes then we can just
    // let the delete patch remove these items.
    if (removes.length === deletedItems && !inserts.length) {
        return {
            children: newChildren,
            moves: null
        }
    }

    return {
        children: newChildren,
        moves: {
            removes: removes,
            inserts: inserts
        }
    }
}

function remove(arr, index, key) {
    arr.splice(index, 1)

    return {
        from: index,
        key: key
    }
}

function keyIndex(children) {
    var keys = {}
    var free = []
    var length = children.length

    for (var i = 0; i < length; i++) {
        var child = children[i]

        if (child.key) {
            keys[child.key] = i
        } else {
            free.push(i)
        }
    }

    return {
        keys: keys,     // A hash of key name to index
        free: free      // An array of unkeyed item indices
    }
}

function appendPatch(apply, patch) {
    if (apply) {
        if (isArray(apply)) {
            apply.push(patch)
        } else {
            apply = [apply, patch]
        }

        return apply
    } else {
        return patch
    }
}


/***/ }),

/***/ 223:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(186)
var isHook = __webpack_require__(151)

module.exports = diffProps

function diffProps(a, b) {
    var diff

    for (var aKey in a) {
        if (!(aKey in b)) {
            diff = diff || {}
            diff[aKey] = undefined
        }

        var aValue = a[aKey]
        var bValue = b[aKey]

        if (aValue === bValue) {
            continue
        } else if (isObject(aValue) && isObject(bValue)) {
            if (getPrototype(bValue) !== getPrototype(aValue)) {
                diff = diff || {}
                diff[aKey] = bValue
            } else if (isHook(bValue)) {
                 diff = diff || {}
                 diff[aKey] = bValue
            } else {
                var objectDiff = diffProps(aValue, bValue)
                if (objectDiff) {
                    diff = diff || {}
                    diff[aKey] = objectDiff
                }
            }
        } else {
            diff = diff || {}
            diff[aKey] = bValue
        }
    }

    for (var bKey in b) {
        if (!(bKey in a)) {
            diff = diff || {}
            diff[bKey] = b[bKey]
        }
    }

    return diff
}

function getPrototype(value) {
  if (Object.getPrototypeOf) {
    return Object.getPrototypeOf(value)
  } else if (value.__proto__) {
    return value.__proto__
  } else if (value.constructor) {
    return value.constructor.prototype
  }
}


/***/ }),

/***/ 224:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.curry = curry;
exports.curryN = curryN;
var slice = Array.prototype.slice;

function _curry(n, fn, curryArgs) {
  return function () {
    var args = slice.call(arguments),
        concatArgs = curryArgs.concat(args);

    if (n > concatArgs.length) {
      return _curry(n, fn, concatArgs);
    } else {
      return fn.apply(this, slice.call(concatArgs, 0, n));
    }
  };
}

function curry(fn) {
  return _curry(fn.length, fn, []);
}

function curryN(n, fn) {
  return _curry(n, fn, []);
}

var curry1 = exports.curry1 = curryN(2, curryN)(1);
var curry2 = exports.curry2 = curryN(2, curryN)(2);
var curry3 = exports.curry3 = curryN(2, curryN)(3);
var curry4 = exports.curry4 = curryN(2, curryN)(4);
exports.__esModule = true;

/***/ }),

/***/ 311:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// License: LGPL-3.0-or-later
var flyd = __webpack_require__(1);
var h = __webpack_require__(167);

var footerStream = flyd.stream();

function root(text, next) {
	return h('footer.step-footer', h('button.button', { data: { next: next }, onclick: footerStream }, text));
}

module.exports = { root: root, stream: footerStream };

/***/ }),

/***/ 477:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// License: LGPL-3.0-or-later
var h = __webpack_require__(167);

// a constructor function for creating radio-label pairs
module.exports = function (id, name, customAttributes, content, stream) {
	var customAttributes = customAttributes ? customAttributes : {};
	return [h('input', { type: 'radio', name: name, id: id, attributes: customAttributes, onclick: stream }), h('label', { attributes: { 'for': id } }, content)];
};

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = function _isPlaceholder(a) {
  return a != null &&
         typeof a === 'object' &&
         a['@@functional/placeholder'] === true;
};


/***/ }),

/***/ 702:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// License: LGPL-3.0-or-later
var view = __webpack_require__(182);
var flyd = __webpack_require__(1);
flyd.scanmerge = __webpack_require__(144);
var h = __webpack_require__(167);

var setStateFromValue = __webpack_require__(703);

var appearance = __webpack_require__(704);
var designations = __webpack_require__(705);
var amounts = __webpack_require__(706);
var type = __webpack_require__(707);
var hideDedication = __webpack_require__(708);
var thankYou = __webpack_require__(709);
var preview = __webpack_require__(710);

var $footer = __webpack_require__(311).stream;

var state = {
	page: window.location.hash.replace('#', '') ? window.location.hash.replace('#', '') : 'appearance',
	settings: {
		appearance: {
			name: 'default',
			customText: 'Donate'
		},
		designations: { count: 1, multiples: {} },
		amounts: {
			name: 'multiple',
			single: 30,
			multiples: { 0: 10, 1: 20, 2: 30, 3: 70, 4: 100, 5: 200, 6: 1000 }
		},
		type: { name: 'both' },
		thankYou: {}
	}
};

function root(state) {
	return h('div', [menu(state), pages(state)]);
}

var $page = flyd.stream();

var $pageClick = flyd.stream();

flyd.map(function (ev) {
	if (ev.target.data.page === 'preview') {
		appendScript();
	} else {
		removeScript();
	}
}, $pageClick);

$page = flyd.merge($page, flyd.map(function (ev) {
	return ev.target.data.page;
}, $pageClick));

function appendScript() {
	var script = document.createElement('script');
	script.id = 'commitchange-donation-script';
	script.setAttribute('data-npo-id', app.nonprofit_id);
	script.setAttribute('src', app.host_with_port + '/js/donate-button.v2.js');
	document.body.appendChild(script);
}

function removeScript() {
	if (document.getElementById('commitchange-donation-script')) {
		document.getElementById('commitchange-donation-script').remove();
	}
	removeButtonContent();
}

function removeButtonContent() {
	var donateButton = document.querySelector('.commitchange-donate');
	while (donateButton.lastChild) {
		donateButton.removeChild(donateButton.lastChild);
	}
}

function appendButtonCode() {
	document.getElementById('choose-role-modal').classList.add('inView');
	document.body.classList.add('is-showingModal');
	var buttonWrapper = document.getElementById('js-donateButtonWrapper').cloneNode(true);
	while (buttonWrapper.querySelector('iframe')) {
		buttonWrapper.querySelector('iframe').remove();
	}
	while (buttonWrapper.querySelector('div')) {
		buttonWrapper.querySelector('div').remove();
	}
	var code = buttonWrapper.innerHTML.replace(/"/g, "'");
	document.getElementById('js-donateButtonAnchor').value = code;
	document.querySelector('#send-code-modal input[name="code"]').value = code;
}

function menu(state) {
	var menuItems = [{ name: 'appearance', text: 'Appearance' }, { name: 'designations', text: 'Designations' }, { name: 'amounts', text: 'Preset amounts' }, { name: 'type', text: 'Preset recurring or one-time' }, { name: 'hideDedication', text: 'Hide dedication' }, { name: 'thankYou', text: 'Thank-you page' }, { name: 'preview', text: 'Live preview' }];

	var lis = [];
	var button = h('div.u-paddingX-10', h('a.button--large.orange.u-width--full', { onclick: appendButtonCode }, 'Finish'));

	menuItems.map(function (item) {
		var liClass = state.page === item.name ? '.active' : '';
		lis.push(h('li' + liClass, { data: { page: item.name }, onclick: $pageClick }, item.text));
	});
	return h('aside.stepsMenu', [h('ul', lis), button]);
}

function pageWrapper(state, pageName, content) {
	return h('section.step.' + pageName, {
		style: { display: state.page === pageName ? 'block' : 'none' }
	}, content);
}

function pages(state) {
	return [pageWrapper(state, 'appearance', appearance.root(state)), pageWrapper(state, 'designations', designations.root(state)), pageWrapper(state, 'amounts', amounts.root(state)), pageWrapper(state, 'type', type.root(state)), pageWrapper(state, 'hideDedication', hideDedication.root(state)), pageWrapper(state, 'thankYou', thankYou.root(state)), pageWrapper(state, 'preview', preview.root(state))];
}

var donateFormBuilder = view(root, document.getElementById('js-donateFormBuilder'), state);

var nameStreams = [appearance.stream, designations.streams.name, amounts.stream, type.stream, hideDedication.stream, thankYou.stream].map(function (stream) {
	return [stream, setStateFromValue];
});

window.state = state;

var scanPairs = [[$page, setPage], [$footer, advancePage], [designations.streams.count, addDesignation]].concat(nameStreams);

var $state = flyd.immediate(flyd.scanmerge(scanPairs, state));

// rerenders the view based on state changes
// takes the view and state stream
flyd.map(donateFormBuilder, $state);

function setPage(state, pageName) {
	state.page = window.location.hash = pageName;
	return state;
}

function addDesignation(state, ev) {
	if (state.settings.designations.count < 20) {
		state.settings.designations.count++;
	}
	return state;
}

function advancePage(state, ev) {
	state.page = ev.target.data.next;
	return state;
}

// // Send email to webmaster
$('#send-code-modal form').on('submit', function (e) {
	var self = this;
	e.preventDefault();
	var data = $(this).serializeObject();
	$(this).find('button').loading('Sending...');
	$.post('/nonprofits/' + app.nonprofit_id + '/button/send_code.json', data).done(function () {
		notification('Email sent!');
		appl.close_modal();
	}).complete(function () {
		$(self).find('button').disableLoading();
	}).fail(function (d) {
		notification('Error: ' + utils.print_error(d));
	});
});

/***/ }),

/***/ 703:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// License: LGPL-3.0-or-later
module.exports = function (state, ev) {
	var target = ev.target;
	var names = target.name.split('.');
	var value = target.type === 'checkbox' ? target.checked : target.value;
	var nestedState = state;

	for (var i = 0, len = names.length - 1; i < len; ++i) {
		if (nestedState[names[i]] === undefined) return state;
		nestedState = nestedState[names[i]];
	}

	var lastKey = names[names.length - 1];

	nestedState[lastKey] = value;

	return state;
};

/***/ }),

/***/ 704:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// License: LGPL-3.0-or-later
var flyd = __webpack_require__(1);
var h = __webpack_require__(167);

var footer = __webpack_require__(311);
var radioAndLabelWrapper = __webpack_require__(477);

var appearanceStream = flyd.stream();

module.exports = {
	root: root,
	stream: appearanceStream
};

function root(state) {
	return [h('header.step-header', [h('h4.step-title', 'Appearance'), h('p', 'How would you like to accept donations?')]), h('div.step-inner', [table(state), customText(state), footer.root('Next', 'designations')])];
}

function table(state) {
	return h('table', [h('tr', [defaultButton(), fixedButton()]), h('tr', [embeddedButton(), imageButton(state)])]);
}

function contentWrapper(title, content) {
	return [title, h('div.u-paddingTop--15', content)];
}

var color = app.nonprofit.brand_color ? app.nonprofit.brand_color : '#42B3DF';
var font = app.nonprofit.brand_font ? app.nonprofit.brand_font : 'inherit';
var buttonStyles = { background: color, 'font-family': font };

var namePrefix = 'settings.appearance.';

function defaultButton() {
	var title = 'Default button';
	var content = [h('p.branded-donate-button', { style: buttonStyles }, 'Donate'), brandedButtonMessage()];
	function brandedButtonMessage() {
		if (app.nonprofit.brand_color) {
			return;
		}
		return h('p.u-paddingTop--15', h('small', "To customize the color and font of your button, \
				head over to your settings page and click on 'branding'"));
	}
	return h('td', [radioAndLabelWrapper('radio-default', namePrefix + 'name', { 'value': 'default', 'checked': 'checked' }, contentWrapper(title, content), appearanceStream)]);
}

function fixedButton() {
	var title = 'Fixed position button';
	var content = [h('p.branded-donate-button.is-fixed', { style: buttonStyles }, 'Donate')];
	return h('td', [radioAndLabelWrapper('radio-fixed', namePrefix + 'name', { 'value': 'fixed' }, contentWrapper(title, content), appearanceStream)]);
}

function embeddedButton() {
	var title = 'Embed directly on page';
	var content = [h('img', { src: app.asset_path + "/graphics/mini-amount-step.png", title: title })];
	return h('td', [radioAndLabelWrapper('radio-embedded', namePrefix + 'name', { 'value': 'embedded' }, contentWrapper(title, content), appearanceStream)]);
}

function imageButton(state) {
	var title = 'Custom image';
	var defaultImg = app.asset_path + "/graphics/donate-elephant.png";
	var imgUrl = state.settings.appearance.customImg ? state.settings.appearance.customImg : defaultImg;
	var content = [h('img', { src: imgUrl, title: title }), h('input', { type: 'text', name: namePrefix + 'customImg', placeholder: 'Add your image URL here', onkeyup: appearanceStream })];
	return h('td', [radioAndLabelWrapper('radio-custom-image', namePrefix + 'name', { 'value': 'custom image' }, contentWrapper(title, content), appearanceStream)]);
}

function customText(state) {
	var text = state.settings.appearance.customText ? state.settings.appearance.customText : 'Donate';
	var title = 'Custom text';
	var content = [h('a.customText-text', text), h('input', { type: 'text', name: namePrefix + 'customText', placeholder: 'Type here to change text', onkeyup: appearanceStream })];
	return h('section.customText-wrapper', [radioAndLabelWrapper('radio-custom-text', namePrefix + 'name', { 'value': 'custom text' }, contentWrapper(title, content), appearanceStream)]);
}

/***/ }),

/***/ 705:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// License: LGPL-3.0-or-later
var flyd = __webpack_require__(1);
var h = __webpack_require__(167);

var footer = __webpack_require__(311);
var radioAndLabelWrapper = __webpack_require__(477);

var nameStream = flyd.stream();
var countStream = flyd.stream();
var inputStream = flyd.stream();

flyd.map(function (keyup) {
	keyup.target.value = keyup.target.value.replace(/[&"_*`'~]/g, "");
}, inputStream);

var namePrefix = 'settings.designations.';

module.exports = {
	root: root,
	streams: {
		name: flyd.merge(nameStream, inputStream),
		count: countStream
	}
};

function root(state) {
	return [h('header.step-header', h('h4.step-title', 'Designations')), h('div.step-inner', [body(state), footer.root('Next', 'amounts')])];
}

function body(state) {
	var desigs = state.settings.designations;
	return [menu(), input(desigs), inputs(desigs)];
}

function menu() {
	return h('aside', [radioAndLabelWrapper('radio-no-designations', namePrefix + 'name', { 'checked': 'checked', 'value': '' }, ["I want ", h('strong', 'no'), " designation."], nameStream), radioAndLabelWrapper('radio-single-designations', namePrefix + 'name', { 'value': 'single' }, ["I want a ", h('strong', 'single,  preset'), " designation."], nameStream), radioAndLabelWrapper('radio-multiple-designations', namePrefix + 'name', { 'value': 'multiple' }, ["I want donors to be able to select from ", h('strong', 'multiple'), " designations (up to 20)."], nameStream)]);
}

function input(desigs) {
	return h('input.u-marginTop--15.input--400', { placeholder: 'Designation name', attributes: { 'maxlength': 50 }, name: namePrefix + 'single', style: { display: desigs.name === 'single' ? 'block' : 'none' },
		onchange: inputStream
	});
}

function inputs(desigs) {
	var prompt = [h('p.pastelBox--green.u-padding--10.u-marginY--10', 'If you would like to add a custom prompt to your donors, \
		please enter it below. Example: "Which radio show would you like to donate to?".  The default prompt is "Please select a designation".'), h('input.u-marginTop--10.input--400', { placeholder: 'Prompt to donors', attributes: { 'maxlength': 50 }, name: namePrefix + 'prompt', onkeyup: inputStream })];
	var inputs = [];
	for (var i = 0; i < desigs.count; i++) {
		inputs.push(h('li', h('input.input--400', { attributes: { 'maxlength': 50 }, placeholder: 'Designation name', name: namePrefix + 'multiples.' + i, onchange: inputStream })));
	}
	return h('div', { style: { display: desigs.name === 'multiple' ? 'block' : 'none' } }, [prompt, h('p.pastelBox--blue.u-padding--10.u-marginY--10', 'Enter your designations below.'), h('ol', [inputs, h('a.button--tiny.edit', { onclick: countStream, attributes: isDisabled(desigs.count) }, [h('i.fa.fa-plus'), ' Add another designation'])])]);
}

function isDisabled(count) {
	if (count >= 20) {
		return { 'disabled': '' };
	}
}

/***/ }),

/***/ 706:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// License: LGPL-3.0-or-later
var flyd = __webpack_require__(1);
var h = __webpack_require__(167);

var footer = __webpack_require__(311);
var radioAndLabelWrapper = __webpack_require__(477);

var namePrefix = 'settings.amounts.';

var nameStream = flyd.stream();

module.exports = { root: root, stream: nameStream };

function root(state) {
	return [h('header.step-header', [h('h4.step-title', 'Amounts')]), body(state)];
}

function body(state) {
	return h('div.step-inner', [menu(), singleInput(state), multipleInputs(state), footer.root('Next', 'type')]);
}

function menu() {
	return h('section', [radioAndLabelWrapper('radio-multiple-amounts', namePrefix + 'name', { 'checked': 'checked', 'value': 'multiple' }, ["I want donors to be able to select from ", h('strong', 'multiple'), " amounts."], nameStream), radioAndLabelWrapper('radio-single-amount', namePrefix + 'name', { 'value': 'single' }, ["I want a ", h('strong', 'single, preset'), " amount."], nameStream)]);
}

function input(value, key) {
	return h('span.prepend--dollar', h('input.input--200', { name: namePrefix + key, value: value, onchange: nameStream }));
}

function displayIf(state, matcher) {
	return state.settings.amounts.name === matcher ? 'block' : 'none';
}

function singleInput(state) {
	return h('div.u-marginTop--15', { style: { display: displayIf(state, 'single') } }, input(state.settings.amounts.single, 'single'));
}

function multipleInputs(state) {
	var multiples = state.settings.amounts.multiples;
	var inputs = [];
	for (var key in multiples) {
		inputs.push(input(multiples[key], 'multiples.' + key));
	}
	return h('section.layout--three.u-marginTop--15', { style: { display: displayIf(state, 'multiple') } }, inputs);
}

/***/ }),

/***/ 707:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// License: LGPL-3.0-or-later
var flyd = __webpack_require__(1);
var h = __webpack_require__(167);
var footer = __webpack_require__(311);
var radioAndLabelWrapper = __webpack_require__(477);

var namePrefix = 'settings.type.';

var nameStream = flyd.stream();

module.exports = { root: root, stream: nameStream };

function root() {
	return [h('header.step-header', [h('h4.step-title', 'Recurring or One-Time')]), body()];
}

function body() {
	return h('div.step-inner', [menu(), footer.root('Next', 'hideDedication')]);
}

function menu() {
	var recurringImg = h('img', { src: app.asset_path + "/graphics/recurring.svg" });
	var oneTimeImg = h('img', { src: app.asset_path + "/graphics/one-time.svg" });
	var message = "We highly recommend that you accept recurring donations whenever possible. They are a great source of recurring revenue!";

	return h('section', [h('p', message), radioAndLabelWrapper('radio-type-both', namePrefix + 'name', { 'checked': 'checked', 'value': 'both' }, ["Recurring ", h('strong', 'and'), " one time.", recurringImg, oneTimeImg], nameStream), radioAndLabelWrapper('radio-type-oneTime', namePrefix + 'name', { 'value': 'one time' }, [h('strong', 'Only '), " one time.", oneTimeImg], nameStream), radioAndLabelWrapper('radio-type-recurring', namePrefix + 'name', { 'value': 'recurring' }, [h('strong', 'Only '), " recurring.", recurringImg], nameStream)]);
}

/***/ }),

/***/ 708:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// License: LGPL-3.0-or-later
var flyd = __webpack_require__(1);
var h = __webpack_require__(167);

var footer = __webpack_require__(311);

var hideStream = flyd.stream();

var name = 'hideDedication';

module.exports = { root: root, stream: hideStream };

function root(state) {
	return [h('header.step-header', [h('h4.step-title', 'Hide dedication (optional)')]), h('div.step-inner', [body(), footer.root('Next', 'thankYou')])];
}

function body() {
	var message = "If you don't want to give your donors the option to set a dedication, click the checkbox below.";

	return [h('p.u-marginBottom--20', message), h('input.u-marginTop--10', { id: name + '-checkbox', type: 'checkbox', name: 'settings.' + name, onchange: hideStream }), h('label.u-bold', { attributes: { for: name + '-checkbox' } }, 'Hide dedication')];
}

/***/ }),

/***/ 709:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// License: LGPL-3.0-or-later
var flyd = __webpack_require__(1);
var h = __webpack_require__(167);

var footer = __webpack_require__(311);

var namePrefix = 'settings.thankYou.';

var urlStream = flyd.stream();

module.exports = { root: root, stream: urlStream };

function root(state) {
	return [h('header.step-header', h('h4.step-title', 'Thank-you page (optional)')), h('div.step-inner', [body(), footer.root('Next', 'preview')])];
}

function body() {
	var message = "You can provide a custom URL to your own thank-you page. Your donors will be directed to this page when they complete the donation. Be sure to include the 'http://' or 'https://' part of your url.";

	return [h('p', message), h('input.u-marginTop--10', { type: 'url', placeholder: 'Type your thank-you page URL here', name: namePrefix + 'url', onchange: urlStream })];
}

/***/ }),

/***/ 710:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// License: LGPL-3.0-or-later
var flyd = __webpack_require__(1);
var h = __webpack_require__(167);

module.exports = { root: root };

function root(state) {
	return [h('header.step-header', h('h4.step-title', 'Preview')), h('div.step-inner', [body(state.settings)])];
}

function body(settings) {
	if (settings.designations.name === 'multiple') {
		settings.designations.multiples = objToArray(settings.designations.multiples);
	}
	if (settings.amounts.name === 'multiple') {
		settings.amounts.multiples = objToArray(settings.amounts.multiples);
	}
	return [h('p.strong.u-centered', 'Below is a live preview of your donate form'), donateButton(settings), table(settings)];
}

function table(settings) {
	var table = h('table.table--plaid', [h('tr', [h('td', 'Appearance'), appearanceTd(settings.appearance)]), singleOrMultipleRow(settings.designations, 'Designation'), singleOrMultipleRow(settings.amounts, 'Amount'), h('tr', [h('td', 'Recurring or one-time'), h('td', settings.type.name)]), h('tr', [h('td', 'Hide dedication'), h('td', ifAny(settings.hideDedication ? 'true' : h('span.u-color--grey', 'false')))]), h('tr', [h('td', 'Thank-you page url'), h('td', ifAny(settings.thankYou.url))])]);
	return table;
}

function appearanceTd(data) {
	if (data.name === 'custom image') {
		return h('td', [data.name, h('p.u-color--grey', data.customImg)]);
	}
	if (data.name === 'custom text') {
		return h('td', [data.name, h('p.u-color--grey', data.customText)]);
	}
	return h('td', data.name);
}

function singleOrMultipleRow(obj, text) {
	if (obj.name === 'single') {
		return h('tr', [h('td', text), h('td', obj.single += '')]);
	}
	if (obj.name === 'multiple') {
		return h('tr', [h('td', text + 's'), h('td', arrayToList(obj.multiples))]);
	}
	return h('tr', [h('td', text), h('td', h('span.u-color--grey', 'none'))]);
}

function donateButton(settings) {
	return h('div.u-centered.u-margin--20', { id: 'js-donateButtonWrapper' }, h('a.commitchange-donate', { attributes: buttonAttributes(settings) }, [buttonContent(settings.appearance)]));
}

function buttonAttributes(settings) {
	var appearance = settings.appearance.name;
	var attrs = {};
	if (appearance === 'custom image' || appearance === 'custom text') {
		attrs['data-custom'] = '';
	}
	if (appearance === 'fixed') {
		attrs['data-fixed'] = '';
	}
	if (appearance === 'embedded') {
		attrs['data-embedded'] = '';
	}
	if (settings.designations.name === 'single' && settings.designations.single) {
		attrs['data-designation'] = settings.designations.single;
	}
	if (settings.designations.name === 'multiple' && settings.designations.multiples.length) {
		attrs['data-multiple-designations'] = arrayToStringWithSeparator(settings.designations.multiples, '_');
	}
	if (settings.designations.name === 'multiple' && settings.designations.prompt) {
		attrs['data-designations-prompt'] = settings.designations.prompt;
	}
	if (settings.amounts.name === 'single' && settings.amounts.single) {
		attrs['data-amount'] = settings.amounts.single;
	}
	if (settings.amounts.name === 'multiple' && settings.amounts.multiples.length) {
		attrs['data-amounts'] = arrayToStringWithSeparator(settings.amounts.multiples, ',');
	}
	if (settings.thankYou.url) {
		attrs['data-redirect'] = settings.thankYou.url;
	}
	if (settings.type.name === 'one time') {
		attrs['data-type'] = 'one-time';
	}
	if (settings.type.name === 'recurring') {
		attrs['data-type'] = 'recurring';
	}
	if (settings.hideDedication) {
		attrs['data-hide-dedication'] = '';
	}
	return attrs;
}

function buttonContent(data) {
	if (data.name === 'custom image') {
		return h('img', { src: data.customImg });
	}
	if (data.name === 'custom text') {
		return h('span', data.customText);
	}
}

// todo: add to helpers or make global once we move away from view-script

function arrayToStringWithSeparator(array, separator) {
	return array.reduce(function (prev, current) {
		return prev + separator + current;
	});
}

function camelCase(string) {
	return string.split(" ").reduce(function (prev, current) {
		return prev + current.charAt(0).toUpperCase() + current.slice(1);
	});
}

function ifAny(data) {
	if (data) {
		return data;
	}
	return h('span.u-color--grey', 'none');
}

function objToArray(obj) {
	var array = [];
	for (var key in obj) {
		if (obj[key]) {
			array.push(obj[key]);
		}
	}
	return array;
}

function arrayToList(array, cssClass) {
	var cssClass = cssClass ? cssClass : '.' + 'hasBullets--grey';
	var lis = [];
	array.map(function (item) {
		item += '';
		if (item && item.length) {
			lis.push(h('li', item));
		}
	});
	return h('ul' + cssClass, lis);
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmRjNzEzMDQ0MjM3ZDQwNWIxZTMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZseWQvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3Zub2RlL2lzLXdpZGdldC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZmx5ZC9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19hcml0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZmx5ZC9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19jdXJyeTEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3Zub2RlL3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3Zub2RlL2lzLXZub2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mbHlkL21vZHVsZS9zY2FubWVyZ2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3Zub2RlL2lzLXRodW5rLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92bm9kZS9pcy12aG9vay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmlydHVhbC1kb20vdm5vZGUvaXMtdnRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZseWQvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9jdXJyeU4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZseWQvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fY3VycnkyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mbHlkL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2N1cnJ5Ti5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmlydHVhbC1kb20vaC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveC1pcy1hcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnZ2dmlldy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmlydHVhbC1kb20vdmRvbS9jcmVhdGUtZWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2xvYmFsL2RvY3VtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92ZG9tL2FwcGx5LXByb3BlcnRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lzLW9iamVjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmlydHVhbC1kb20vdm5vZGUvaGFuZGxlLXRodW5rLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92bm9kZS92cGF0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3ZpcnR1YWwtaHlwZXJzY3JpcHQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3Zub2RlL3Zub2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92bm9kZS92dGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmlydHVhbC1kb20vdmlydHVhbC1oeXBlcnNjcmlwdC9wYXJzZS10YWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jyb3dzZXItc3BsaXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3ZpcnR1YWwtaHlwZXJzY3JpcHQvaG9va3Mvc29mdC1zZXQtaG9vay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmlydHVhbC1kb20vdmlydHVhbC1oeXBlcnNjcmlwdC9ob29rcy9ldi1ob29rLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ldi1zdG9yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW5kaXZpZHVhbC9vbmUtdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW5kaXZpZHVhbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmlydHVhbC1kb20vY3JlYXRlLWVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vL21pbi1kb2N1bWVudCAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3BhdGNoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92ZG9tL3BhdGNoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92ZG9tL2RvbS1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmlydHVhbC1kb20vdmRvbS9wYXRjaC1vcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmlydHVhbC1kb20vdmRvbS91cGRhdGUtd2lkZ2V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS9kaWZmLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92dHJlZS9kaWZmLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92dHJlZS9kaWZmLXByb3BzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mai1jdXJyeS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvanMvbm9ucHJvZml0cy9idXR0b24vZm9vdGVyLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9qcy9jb21wb25lbnRzL3JhZGlvLWFuZC1sYWJlbC13cmFwcGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mbHlkL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2lzUGxhY2Vob2xkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2pzL25vbnByb2ZpdHMvYnV0dG9uL3BhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2pzL2NvbXBvbmVudHMvc2V0LXN0YXRlLWZyb20tdmFsdWUuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2pzL25vbnByb2ZpdHMvYnV0dG9uL2FwcGVhcmFuY2UuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2pzL25vbnByb2ZpdHMvYnV0dG9uL2Rlc2lnbmF0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvanMvbm9ucHJvZml0cy9idXR0b24vYW1vdW50cy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvanMvbm9ucHJvZml0cy9idXR0b24vdHlwZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvanMvbm9ucHJvZml0cy9idXR0b24vaGlkZS1kZWRpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9qcy9ub25wcm9maXRzL2J1dHRvbi90aGFuay15b3UuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2pzL25vbnByb2ZpdHMvYnV0dG9uL3ByZXZpZXcuanMiXSwibmFtZXMiOlsiZmx5ZCIsInJlcXVpcmUiLCJoIiwiZm9vdGVyU3RyZWFtIiwic3RyZWFtIiwicm9vdCIsInRleHQiLCJuZXh0IiwiZGF0YSIsIm9uY2xpY2siLCJtb2R1bGUiLCJleHBvcnRzIiwiaWQiLCJuYW1lIiwiY3VzdG9tQXR0cmlidXRlcyIsImNvbnRlbnQiLCJ0eXBlIiwiYXR0cmlidXRlcyIsInZpZXciLCJzY2FubWVyZ2UiLCJzZXRTdGF0ZUZyb21WYWx1ZSIsImFwcGVhcmFuY2UiLCJkZXNpZ25hdGlvbnMiLCJhbW91bnRzIiwiaGlkZURlZGljYXRpb24iLCJ0aGFua1lvdSIsInByZXZpZXciLCIkZm9vdGVyIiwic3RhdGUiLCJwYWdlIiwid2luZG93IiwibG9jYXRpb24iLCJoYXNoIiwicmVwbGFjZSIsInNldHRpbmdzIiwiY3VzdG9tVGV4dCIsImNvdW50IiwibXVsdGlwbGVzIiwic2luZ2xlIiwibWVudSIsInBhZ2VzIiwiJHBhZ2UiLCIkcGFnZUNsaWNrIiwibWFwIiwiZXYiLCJ0YXJnZXQiLCJhcHBlbmRTY3JpcHQiLCJyZW1vdmVTY3JpcHQiLCJtZXJnZSIsInNjcmlwdCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImFwcCIsIm5vbnByb2ZpdF9pZCIsImhvc3Rfd2l0aF9wb3J0IiwiYm9keSIsImFwcGVuZENoaWxkIiwiZ2V0RWxlbWVudEJ5SWQiLCJyZW1vdmUiLCJyZW1vdmVCdXR0b25Db250ZW50IiwiZG9uYXRlQnV0dG9uIiwicXVlcnlTZWxlY3RvciIsImxhc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwiYXBwZW5kQnV0dG9uQ29kZSIsImNsYXNzTGlzdCIsImFkZCIsImJ1dHRvbldyYXBwZXIiLCJjbG9uZU5vZGUiLCJjb2RlIiwiaW5uZXJIVE1MIiwidmFsdWUiLCJtZW51SXRlbXMiLCJsaXMiLCJidXR0b24iLCJpdGVtIiwibGlDbGFzcyIsInB1c2giLCJwYWdlV3JhcHBlciIsInBhZ2VOYW1lIiwic3R5bGUiLCJkaXNwbGF5IiwiZG9uYXRlRm9ybUJ1aWxkZXIiLCJuYW1lU3RyZWFtcyIsInN0cmVhbXMiLCJzY2FuUGFpcnMiLCJzZXRQYWdlIiwiYWR2YW5jZVBhZ2UiLCJhZGREZXNpZ25hdGlvbiIsImNvbmNhdCIsIiRzdGF0ZSIsImltbWVkaWF0ZSIsIiQiLCJvbiIsImUiLCJzZWxmIiwicHJldmVudERlZmF1bHQiLCJzZXJpYWxpemVPYmplY3QiLCJmaW5kIiwibG9hZGluZyIsInBvc3QiLCJkb25lIiwibm90aWZpY2F0aW9uIiwiYXBwbCIsImNsb3NlX21vZGFsIiwiY29tcGxldGUiLCJkaXNhYmxlTG9hZGluZyIsImZhaWwiLCJkIiwidXRpbHMiLCJwcmludF9lcnJvciIsIm5hbWVzIiwic3BsaXQiLCJjaGVja2VkIiwibmVzdGVkU3RhdGUiLCJpIiwibGVuIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwibGFzdEtleSIsImZvb3RlciIsInJhZGlvQW5kTGFiZWxXcmFwcGVyIiwiYXBwZWFyYW5jZVN0cmVhbSIsInRhYmxlIiwiZGVmYXVsdEJ1dHRvbiIsImZpeGVkQnV0dG9uIiwiZW1iZWRkZWRCdXR0b24iLCJpbWFnZUJ1dHRvbiIsImNvbnRlbnRXcmFwcGVyIiwidGl0bGUiLCJjb2xvciIsIm5vbnByb2ZpdCIsImJyYW5kX2NvbG9yIiwiZm9udCIsImJyYW5kX2ZvbnQiLCJidXR0b25TdHlsZXMiLCJiYWNrZ3JvdW5kIiwibmFtZVByZWZpeCIsImJyYW5kZWRCdXR0b25NZXNzYWdlIiwic3JjIiwiYXNzZXRfcGF0aCIsImRlZmF1bHRJbWciLCJpbWdVcmwiLCJjdXN0b21JbWciLCJwbGFjZWhvbGRlciIsIm9ua2V5dXAiLCJuYW1lU3RyZWFtIiwiY291bnRTdHJlYW0iLCJpbnB1dFN0cmVhbSIsImtleXVwIiwiZGVzaWdzIiwiaW5wdXQiLCJpbnB1dHMiLCJvbmNoYW5nZSIsInByb21wdCIsImlzRGlzYWJsZWQiLCJzaW5nbGVJbnB1dCIsIm11bHRpcGxlSW5wdXRzIiwia2V5IiwiZGlzcGxheUlmIiwibWF0Y2hlciIsInJlY3VycmluZ0ltZyIsIm9uZVRpbWVJbWciLCJtZXNzYWdlIiwiaGlkZVN0cmVhbSIsImZvciIsInVybFN0cmVhbSIsIm9ialRvQXJyYXkiLCJhcHBlYXJhbmNlVGQiLCJzaW5nbGVPck11bHRpcGxlUm93IiwiaWZBbnkiLCJ1cmwiLCJvYmoiLCJhcnJheVRvTGlzdCIsImJ1dHRvbkF0dHJpYnV0ZXMiLCJidXR0b25Db250ZW50IiwiYXR0cnMiLCJhcnJheVRvU3RyaW5nV2l0aFNlcGFyYXRvciIsImFycmF5Iiwic2VwYXJhdG9yIiwicmVkdWNlIiwicHJldiIsImN1cnJlbnQiLCJjYW1lbENhc2UiLCJzdHJpbmci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QUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsbUJBQW1CLHFCQUFxQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDN0NBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7QUNoQkE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ2hHQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDdkNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3JCQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMLHVCQUF1QixjQUFjO0FBQ3JDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7Ozs7OztBQ3hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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dkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLDJCQUEyQiwwQkFBMEI7QUFDckQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7OztBQ3BGQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsMEJBQTBCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLDBCQUEwQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUN0SkE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDZEE7O0FBRUE7Ozs7Ozs7O0FDRkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLHVCQUF1QixTQUFTO0FBQ2hDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLFNBQVM7QUFDcEM7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0Isc0JBQXNCO0FBQzFDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7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RUFBUztBQUNSLFNBQU9BLElBQVA7QUFDQTtBQUNELFFBQU9OLEVBQUUsb0JBQUYsRUFBd0IsTUFBeEIsQ0FBUDtBQUNBOztBQUVELFNBQVNzSyxVQUFULENBQW9CSyxHQUFwQixFQUF5QjtBQUN4QixLQUFJTSxRQUFRLEVBQVo7QUFDQSxNQUFJLElBQUlwQixHQUFSLElBQWVjLEdBQWYsRUFBb0I7QUFDbkIsTUFBR0EsSUFBSWQsR0FBSixDQUFILEVBQWE7QUFBRW9CLFNBQU1yRyxJQUFOLENBQVcrRixJQUFJZCxHQUFKLENBQVg7QUFBcUI7QUFDcEM7QUFDRCxRQUFPb0IsS0FBUDtBQUNBOztBQUVELFNBQVNMLFdBQVQsQ0FBcUJLLEtBQXJCLEVBQTZCVSxRQUE3QixFQUF1QztBQUN0QyxLQUFJQSxXQUFXQSxXQUFXQSxRQUFYLEdBQXNCLE1BQU0sa0JBQTNDO0FBQ0EsS0FBSW5ILE1BQU0sRUFBVjtBQUNBeUcsT0FBTXhJLEdBQU4sQ0FBVSxVQUFTaUMsSUFBVCxFQUFjO0FBQ3ZCQSxVQUFNLEVBQU47QUFDQSxNQUFHQSxRQUFRQSxLQUFLMEMsTUFBaEIsRUFBd0I7QUFBQzVDLE9BQUlJLElBQUosQ0FBUzVFLEVBQUUsSUFBRixFQUFRMEUsSUFBUixDQUFUO0FBQXdCO0FBQ2pELEVBSEQ7QUFJQSxRQUFPMUUsRUFBRSxPQUFPMkwsUUFBVCxFQUFtQm5ILEdBQW5CLENBQVA7QUFDQSxDIiwiZmlsZSI6Im5vbnByb2ZpdHMvYnV0dG9uL3BhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA3MDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDJkYzcxMzA0NDIzN2Q0MDViMWUzIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3VycnlOID0gcmVxdWlyZSgncmFtZGEvc3JjL2N1cnJ5TicpO1xuXG4vLyBVdGlsaXR5XG5mdW5jdGlvbiBpc0Z1bmN0aW9uKG9iaikge1xuICByZXR1cm4gISEob2JqICYmIG9iai5jb25zdHJ1Y3RvciAmJiBvYmouY2FsbCAmJiBvYmouYXBwbHkpO1xufVxuZnVuY3Rpb24gdHJ1ZUZuKCkgeyByZXR1cm4gdHJ1ZTsgfVxuXG4vLyBHbG9iYWxzXG52YXIgdG9VcGRhdGUgPSBbXTtcbnZhciBpblN0cmVhbTtcbnZhciBvcmRlciA9IFtdO1xudmFyIG9yZGVyTmV4dElkeCA9IC0xO1xudmFyIGZsdXNoaW5nID0gZmFsc2U7XG5cbi8qKiBAbmFtZXNwYWNlICovXG52YXIgZmx5ZCA9IHt9XG5cbi8vIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBBUEkgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIC8vXG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBzdHJlYW1cbiAqXG4gKiBfX1NpZ25hdHVyZV9fOiBgYSAtPiBTdHJlYW0gYWBcbiAqXG4gKiBAbmFtZSBmbHlkLnN0cmVhbVxuICogQHBhcmFtIHsqfSBpbml0aWFsVmFsdWUgLSAoT3B0aW9uYWwpIHRoZSBpbml0aWFsIHZhbHVlIG9mIHRoZSBzdHJlYW1cbiAqIEByZXR1cm4ge3N0cmVhbX0gdGhlIHN0cmVhbVxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgbiA9IGZseWQuc3RyZWFtKDEpOyAvLyBTdHJlYW0gd2l0aCBpbml0aWFsIHZhbHVlIGAxYFxuICogdmFyIHMgPSBmbHlkLnN0cmVhbSgpOyAvLyBTdHJlYW0gd2l0aCBubyBpbml0aWFsIHZhbHVlXG4gKi9cbmZseWQuc3RyZWFtID0gZnVuY3Rpb24oaW5pdGlhbFZhbHVlKSB7XG4gIHZhciBlbmRTdHJlYW0gPSBjcmVhdGVEZXBlbmRlbnRTdHJlYW0oW10sIHRydWVGbik7XG4gIHZhciBzID0gY3JlYXRlU3RyZWFtKCk7XG4gIHMuZW5kID0gZW5kU3RyZWFtO1xuICBzLmZuQXJncyA9IFtdO1xuICBlbmRTdHJlYW0ubGlzdGVuZXJzLnB1c2gocyk7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMCkgcyhpbml0aWFsVmFsdWUpO1xuICByZXR1cm4gcztcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgZGVwZW5kZW50IHN0cmVhbVxuICpcbiAqIF9fU2lnbmF0dXJlX186IGAoLi4uU3RyZWFtICogLT4gU3RyZWFtIGIgLT4gYikgLT4gW1N0cmVhbSAqXSAtPiBTdHJlYW0gYmBcbiAqXG4gKiBAbmFtZSBmbHlkLmNvbWJpbmVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gdGhlIGZ1bmN0aW9uIHVzZWQgdG8gY29tYmluZSB0aGUgc3RyZWFtc1xuICogQHBhcmFtIHtBcnJheTxzdHJlYW0+fSBkZXBlbmRlbmNpZXMgLSB0aGUgc3RyZWFtcyB0aGF0IHRoaXMgb25lIGRlcGVuZHMgb25cbiAqIEByZXR1cm4ge3N0cmVhbX0gdGhlIGRlcGVuZGVudCBzdHJlYW1cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIG4xID0gZmx5ZC5zdHJlYW0oMCk7XG4gKiB2YXIgbjIgPSBmbHlkLnN0cmVhbSgwKTtcbiAqIHZhciBtYXggPSBmbHlkLmNvbWJpbmUoZnVuY3Rpb24objEsIG4yLCBzZWxmLCBjaGFuZ2VkKSB7XG4gKiAgIHJldHVybiBuMSgpID4gbjIoKSA/IG4xKCkgOiBuMigpO1xuICogfSwgW24xLCBuMl0pO1xuICovXG5mbHlkLmNvbWJpbmUgPSBjdXJyeU4oMiwgY29tYmluZSk7XG5mdW5jdGlvbiBjb21iaW5lKGZuLCBzdHJlYW1zKSB7XG4gIHZhciBpLCBzLCBkZXBzLCBkZXBFbmRTdHJlYW1zO1xuICB2YXIgZW5kU3RyZWFtID0gY3JlYXRlRGVwZW5kZW50U3RyZWFtKFtdLCB0cnVlRm4pO1xuICBkZXBzID0gW107IGRlcEVuZFN0cmVhbXMgPSBbXTtcbiAgZm9yIChpID0gMDsgaSA8IHN0cmVhbXMubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoc3RyZWFtc1tpXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBkZXBzLnB1c2goc3RyZWFtc1tpXSk7XG4gICAgICBpZiAoc3RyZWFtc1tpXS5lbmQgIT09IHVuZGVmaW5lZCkgZGVwRW5kU3RyZWFtcy5wdXNoKHN0cmVhbXNbaV0uZW5kKTtcbiAgICB9XG4gIH1cbiAgcyA9IGNyZWF0ZURlcGVuZGVudFN0cmVhbShkZXBzLCBmbik7XG4gIHMuZGVwc0NoYW5nZWQgPSBbXTtcbiAgcy5mbkFyZ3MgPSBzLmRlcHMuY29uY2F0KFtzLCBzLmRlcHNDaGFuZ2VkXSk7XG4gIHMuZW5kID0gZW5kU3RyZWFtO1xuICBlbmRTdHJlYW0ubGlzdGVuZXJzLnB1c2gocyk7XG4gIGFkZExpc3RlbmVycyhkZXBFbmRTdHJlYW1zLCBlbmRTdHJlYW0pO1xuICBlbmRTdHJlYW0uZGVwcyA9IGRlcEVuZFN0cmVhbXM7XG4gIHVwZGF0ZVN0cmVhbShzKTtcbiAgcmV0dXJuIHM7XG59XG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHN1cHBsaWVkIGFyZ3VtZW50IGlzIGEgRmx5ZCBzdHJlYW0gYW5kIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICpcbiAqIF9fU2lnbmF0dXJlX186IGAqIC0+IEJvb2xlYW5gXG4gKlxuICogQG5hbWUgZmx5ZC5pc1N0cmVhbVxuICogQHBhcmFtIHsqfSB2YWx1ZSAtIHRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHtCb29sZWFufSBgdHJ1ZWAgaWYgaXMgYSBGbHlkIHN0cmVhbW4sIGBmYWxzZWAgb3RoZXJ3aXNlXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBzID0gZmx5ZC5zdHJlYW0oMSk7XG4gKiB2YXIgbiA9IDE7XG4gKiBmbHlkLmlzU3RyZWFtKHMpOyAvLz0+IHRydWVcbiAqIGZseWQuaXNTdHJlYW0obik7IC8vPT4gZmFsc2VcbiAqL1xuZmx5ZC5pc1N0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICByZXR1cm4gaXNGdW5jdGlvbihzdHJlYW0pICYmICdoYXNWYWwnIGluIHN0cmVhbTtcbn1cblxuLyoqXG4gKiBJbnZva2VzIHRoZSBib2R5ICh0aGUgZnVuY3Rpb24gdG8gY2FsY3VsYXRlIHRoZSB2YWx1ZSkgb2YgYSBkZXBlbmRlbnQgc3RyZWFtXG4gKlxuICogQnkgZGVmYXVsdCB0aGUgYm9keSBvZiBhIGRlcGVuZGVudCBzdHJlYW0gaXMgb25seSBjYWxsZWQgd2hlbiBhbGwgdGhlIHN0cmVhbXNcbiAqIHVwb24gd2hpY2ggaXQgZGVwZW5kcyBoYXMgYSB2YWx1ZS4gYGltbWVkaWF0ZWAgY2FuIGNpcmN1bXZlbnQgdGhpcyBiZWhhdmlvdXIuXG4gKiBJdCBpbW1lZGlhdGVseSBpbnZva2VzIHRoZSBib2R5IG9mIGEgZGVwZW5kZW50IHN0cmVhbS5cbiAqXG4gKiBfX1NpZ25hdHVyZV9fOiBgU3RyZWFtIGEgLT4gU3RyZWFtIGFgXG4gKlxuICogQG5hbWUgZmx5ZC5pbW1lZGlhdGVcbiAqIEBwYXJhbSB7c3RyZWFtfSBzdHJlYW0gLSB0aGUgZGVwZW5kZW50IHN0cmVhbVxuICogQHJldHVybiB7c3RyZWFtfSB0aGUgc2FtZSBzdHJlYW1cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIHMgPSBmbHlkLnN0cmVhbSgpO1xuICogdmFyIGhhc0l0ZW1zID0gZmx5ZC5pbW1lZGlhdGUoZmx5ZC5jb21iaW5lKGZ1bmN0aW9uKHMpIHtcbiAqICAgcmV0dXJuIHMoKSAhPT0gdW5kZWZpbmVkICYmIHMoKS5sZW5ndGggPiAwO1xuICogfSwgW3NdKTtcbiAqIGNvbnNvbGUubG9nKGhhc0l0ZW1zKCkpOyAvLyBsb2dzIGBmYWxzZWAuIEhhZCBgaW1tZWRpYXRlYCBub3QgYmVlblxuICogICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVzZWQgYGhhc0l0ZW1zKClgIHdvdWxkJ3ZlIHJldHVybmVkIGB1bmRlZmluZWRgXG4gKiBzKFsxXSk7XG4gKiBjb25zb2xlLmxvZyhoYXNJdGVtcygpKTsgLy8gbG9ncyBgdHJ1ZWAuXG4gKiBzKFtdKTtcbiAqIGNvbnNvbGUubG9nKGhhc0l0ZW1zKCkpOyAvLyBsb2dzIGBmYWxzZWAuXG4gKi9cbmZseWQuaW1tZWRpYXRlID0gZnVuY3Rpb24ocykge1xuICBpZiAocy5kZXBzTWV0ID09PSBmYWxzZSkge1xuICAgIHMuZGVwc01ldCA9IHRydWU7XG4gICAgdXBkYXRlU3RyZWFtKHMpO1xuICB9XG4gIHJldHVybiBzO1xufVxuXG4vKipcbiAqIENoYW5nZXMgd2hpY2ggYGVuZHNTdHJlYW1gIHNob3VsZCB0cmlnZ2VyIHRoZSBlbmRpbmcgb2YgYHNgLlxuICpcbiAqIF9fU2lnbmF0dXJlX186IGBTdHJlYW0gYSAtPiBTdHJlYW0gYiAtPiBTdHJlYW0gYmBcbiAqXG4gKiBAbmFtZSBmbHlkLmVuZHNPblxuICogQHBhcmFtIHtzdHJlYW19IGVuZFN0cmVhbSAtIHRoZSBzdHJlYW0gdG8gdHJpZ2dlciB0aGUgZW5kaW5nXG4gKiBAcGFyYW0ge3N0cmVhbX0gc3RyZWFtIC0gdGhlIHN0cmVhbSB0byBiZSBlbmRlZCBieSB0aGUgZW5kU3RyZWFtXG4gKiBAcGFyYW0ge3N0cmVhbX0gdGhlIHN0cmVhbSBtb2RpZmllZCB0byBiZSBlbmRlZCBieSBlbmRTdHJlYW1cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIG4gPSBmbHlkLnN0cmVhbSgxKTtcbiAqIHZhciBraWxsZXIgPSBmbHlkLnN0cmVhbSgpO1xuICogLy8gYGRvdWJsZWAgZW5kcyB3aGVuIGBuYCBlbmRzIG9yIHdoZW4gYGtpbGxlcmAgZW1pdHMgYW55IHZhbHVlXG4gKiB2YXIgZG91YmxlID0gZmx5ZC5lbmRzT24oZmx5ZC5tZXJnZShuLmVuZCwga2lsbGVyKSwgZmx5ZC5jb21iaW5lKGZ1bmN0aW9uKG4pIHtcbiAqICAgcmV0dXJuIDIgKiBuKCk7XG4gKiB9LCBbbl0pO1xuKi9cbmZseWQuZW5kc09uID0gZnVuY3Rpb24oZW5kUywgcykge1xuICBkZXRhY2hEZXBzKHMuZW5kKTtcbiAgZW5kUy5saXN0ZW5lcnMucHVzaChzLmVuZCk7XG4gIHMuZW5kLmRlcHMucHVzaChlbmRTKTtcbiAgcmV0dXJuIHM7XG59XG5cbi8qKlxuICogTWFwIGEgc3RyZWFtXG4gKlxuICogUmV0dXJucyBhIG5ldyBzdHJlYW0gY29uc2lzdGluZyBvZiBldmVyeSB2YWx1ZSBmcm9tIGBzYCBwYXNzZWQgdGhyb3VnaFxuICogYGZuYC4gSS5lLiBgbWFwYCBjcmVhdGVzIGEgbmV3IHN0cmVhbSB0aGF0IGxpc3RlbnMgdG8gYHNgIGFuZFxuICogYXBwbGllcyBgZm5gIHRvIGV2ZXJ5IG5ldyB2YWx1ZS5cbiAqIF9fU2lnbmF0dXJlX186IGAoYSAtPiByZXN1bHQpIC0+IFN0cmVhbSBhIC0+IFN0cmVhbSByZXN1bHRgXG4gKlxuICogQG5hbWUgZmx5ZC5tYXBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gdGhlIGZ1bmN0aW9uIHRoYXQgcHJvZHVjZXMgdGhlIGVsZW1lbnRzIG9mIHRoZSBuZXcgc3RyZWFtXG4gKiBAcGFyYW0ge3N0cmVhbX0gc3RyZWFtIC0gdGhlIHN0cmVhbSB0byBtYXBcbiAqIEByZXR1cm4ge3N0cmVhbX0gYSBuZXcgc3RyZWFtIHdpdGggdGhlIG1hcHBlZCB2YWx1ZXNcbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIG51bWJlcnMgPSBmbHlkLnN0cmVhbSgwKTtcbiAqIHZhciBzcXVhcmVkTnVtYmVycyA9IGZseWQubWFwKGZ1bmN0aW9uKG4pIHsgcmV0dXJuIG4qbjsgfSwgbnVtYmVycyk7XG4gKi9cbi8vIExpYnJhcnkgZnVuY3Rpb25zIHVzZSBzZWxmIGNhbGxiYWNrIHRvIGFjY2VwdCAobnVsbCwgdW5kZWZpbmVkKSB1cGRhdGUgdHJpZ2dlcnMuXG5mbHlkLm1hcCA9IGN1cnJ5TigyLCBmdW5jdGlvbihmLCBzKSB7XG4gIHJldHVybiBjb21iaW5lKGZ1bmN0aW9uKHMsIHNlbGYpIHsgc2VsZihmKHMudmFsKSk7IH0sIFtzXSk7XG59KVxuXG4vKipcbiAqIExpc3RlbiB0byBzdHJlYW0gZXZlbnRzXG4gKlxuICogU2ltaWxhciB0byBgbWFwYCBleGNlcHQgdGhhdCB0aGUgcmV0dXJuZWQgc3RyZWFtIGlzIGVtcHR5LiBVc2UgYG9uYCBmb3IgZG9pbmdcbiAqIHNpZGUgZWZmZWN0cyBpbiByZWFjdGlvbiB0byBzdHJlYW0gY2hhbmdlcy4gVXNlIHRoZSByZXR1cm5lZCBzdHJlYW0gb25seSBpZiB5b3VcbiAqIG5lZWQgdG8gbWFudWFsbHkgZW5kIGl0LlxuICpcbiAqIF9fU2lnbmF0dXJlX186IGAoYSAtPiByZXN1bHQpIC0+IFN0cmVhbSBhIC0+IFN0cmVhbSB1bmRlZmluZWRgXG4gKlxuICogQG5hbWUgZmx5ZC5vblxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgLSB0aGUgY2FsbGJhY2tcbiAqIEBwYXJhbSB7c3RyZWFtfSBzdHJlYW0gLSB0aGUgc3RyZWFtXG4gKiBAcmV0dXJuIHtzdHJlYW19IGFuIGVtcHR5IHN0cmVhbSAoY2FuIGJlIGVuZGVkKVxuICovXG5mbHlkLm9uID0gY3VycnlOKDIsIGZ1bmN0aW9uKGYsIHMpIHtcbiAgcmV0dXJuIGNvbWJpbmUoZnVuY3Rpb24ocykgeyBmKHMudmFsKTsgfSwgW3NdKTtcbn0pXG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBzdHJlYW0gd2l0aCB0aGUgcmVzdWx0cyBvZiBjYWxsaW5nIHRoZSBmdW5jdGlvbiBvbiBldmVyeSBpbmNvbWluZ1xuICogc3RyZWFtIHdpdGggYW5kIGFjY3VtdWxhdG9yIGFuZCB0aGUgaW5jb21pbmcgdmFsdWUuXG4gKlxuICogX19TaWduYXR1cmVfXzogYChhIC0+IGIgLT4gYSkgLT4gYSAtPiBTdHJlYW0gYiAtPiBTdHJlYW0gYWBcbiAqXG4gKiBAbmFtZSBmbHlkLnNjYW5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gdGhlIGZ1bmN0aW9uIHRvIGNhbGxcbiAqIEBwYXJhbSB7Kn0gdmFsIC0gdGhlIGluaXRpYWwgdmFsdWUgb2YgdGhlIGFjY3VtdWxhdG9yXG4gKiBAcGFyYW0ge3N0cmVhbX0gc3RyZWFtIC0gdGhlIHN0cmVhbSBzb3VyY2VcbiAqIEByZXR1cm4ge3N0cmVhbX0gdGhlIG5ldyBzdHJlYW1cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIG51bWJlcnMgPSBmbHlkLnN0cmVhbSgpO1xuICogdmFyIHN1bSA9IGZseWQuc2NhbihmdW5jdGlvbihzdW0sIG4pIHsgcmV0dXJuIHN1bStuOyB9LCAwLCBudW1iZXJzKTtcbiAqIG51bWJlcnMoMikoMykoNSk7XG4gKiBzdW0oKTsgLy8gMTBcbiAqL1xuZmx5ZC5zY2FuID0gY3VycnlOKDMsIGZ1bmN0aW9uKGYsIGFjYywgcykge1xuICB2YXIgbnMgPSBjb21iaW5lKGZ1bmN0aW9uKHMsIHNlbGYpIHtcbiAgICBzZWxmKGFjYyA9IGYoYWNjLCBzLnZhbCkpO1xuICB9LCBbc10pO1xuICBpZiAoIW5zLmhhc1ZhbCkgbnMoYWNjKTtcbiAgcmV0dXJuIG5zO1xufSk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBzdHJlYW0gZG93biB3aGljaCBhbGwgdmFsdWVzIGZyb20gYm90aCBgc3RyZWFtMWAgYW5kIGBzdHJlYW0yYFxuICogd2lsbCBiZSBzZW50LlxuICpcbiAqIF9fU2lnbmF0dXJlX186IGBTdHJlYW0gYSAtPiBTdHJlYW0gYSAtPiBTdHJlYW0gYWBcbiAqXG4gKiBAbmFtZSBmbHlkLm1lcmdlXG4gKiBAcGFyYW0ge3N0cmVhbX0gc291cmNlMSAtIG9uZSBzdHJlYW0gdG8gYmUgbWVyZ2VkXG4gKiBAcGFyYW0ge3N0cmVhbX0gc291cmNlMiAtIHRoZSBvdGhlciBzdHJlYW0gdG8gYmUgbWVyZ2VkXG4gKiBAcmV0dXJuIHtzdHJlYW19IGEgc3RyZWFtIHdpdGggdGhlIHZhbHVlcyBmcm9tIGJvdGggc291cmNlc1xuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgYnRuMUNsaWNrcyA9IGZseWQuc3RyZWFtKCk7XG4gKiBidXR0b24xRWxtLmFkZEV2ZW50TGlzdGVuZXIoYnRuMUNsaWNrcyk7XG4gKiB2YXIgYnRuMkNsaWNrcyA9IGZseWQuc3RyZWFtKCk7XG4gKiBidXR0b24yRWxtLmFkZEV2ZW50TGlzdGVuZXIoYnRuMkNsaWNrcyk7XG4gKiB2YXIgYWxsQ2xpY2tzID0gZmx5ZC5tZXJnZShidG4xQ2xpY2tzLCBidG4yQ2xpY2tzKTtcbiAqL1xuZmx5ZC5tZXJnZSA9IGN1cnJ5TigyLCBmdW5jdGlvbihzMSwgczIpIHtcbiAgdmFyIHMgPSBmbHlkLmltbWVkaWF0ZShjb21iaW5lKGZ1bmN0aW9uKHMxLCBzMiwgc2VsZiwgY2hhbmdlZCkge1xuICAgIGlmIChjaGFuZ2VkWzBdKSB7XG4gICAgICBzZWxmKGNoYW5nZWRbMF0oKSk7XG4gICAgfSBlbHNlIGlmIChzMS5oYXNWYWwpIHtcbiAgICAgIHNlbGYoczEudmFsKTtcbiAgICB9IGVsc2UgaWYgKHMyLmhhc1ZhbCkge1xuICAgICAgc2VsZihzMi52YWwpO1xuICAgIH1cbiAgfSwgW3MxLCBzMl0pKTtcbiAgZmx5ZC5lbmRzT24oY29tYmluZShmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSwgW3MxLmVuZCwgczIuZW5kXSksIHMpO1xuICByZXR1cm4gcztcbn0pO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgc3RyZWFtIHJlc3VsdGluZyBmcm9tIGFwcGx5aW5nIGB0cmFuc2R1Y2VyYCB0byBgc3RyZWFtYC5cbiAqXG4gKiBfX1NpZ25hdHVyZV9fOiBgVHJhbnNkdWNlciAtPiBTdHJlYW0gYSAtPiBTdHJlYW0gYmBcbiAqXG4gKiBAbmFtZSBmbHlkLnRyYW5zZHVjZVxuICogQHBhcmFtIHtUcmFuc2R1Y2VyfSB4Zm9ybSAtIHRoZSB0cmFuc2R1Y2VyIHRyYW5zZm9ybWF0aW9uXG4gKiBAcGFyYW0ge3N0cmVhbX0gc291cmNlIC0gdGhlIHN0cmVhbSBzb3VyY2VcbiAqIEByZXR1cm4ge3N0cmVhbX0gdGhlIG5ldyBzdHJlYW1cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIHQgPSByZXF1aXJlKCd0cmFuc2R1Y2Vycy5qcycpO1xuICpcbiAqIHZhciByZXN1bHRzID0gW107XG4gKiB2YXIgczEgPSBmbHlkLnN0cmVhbSgpO1xuICogdmFyIHR4ID0gdC5jb21wb3NlKHQubWFwKGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHggKiAyOyB9KSwgdC5kZWR1cGUoKSk7XG4gKiB2YXIgczIgPSBmbHlkLnRyYW5zZHVjZSh0eCwgczEpO1xuICogZmx5ZC5jb21iaW5lKGZ1bmN0aW9uKHMyKSB7IHJlc3VsdHMucHVzaChzMigpKTsgfSwgW3MyXSk7XG4gKiBzMSgxKSgxKSgyKSgzKSgzKSgzKSg0KTtcbiAqIHJlc3VsdHM7IC8vID0+IFsyLCA0LCA2LCA4XVxuICovXG5mbHlkLnRyYW5zZHVjZSA9IGN1cnJ5TigyLCBmdW5jdGlvbih4Zm9ybSwgc291cmNlKSB7XG4gIHhmb3JtID0geGZvcm0obmV3IFN0cmVhbVRyYW5zZm9ybWVyKCkpO1xuICByZXR1cm4gY29tYmluZShmdW5jdGlvbihzb3VyY2UsIHNlbGYpIHtcbiAgICB2YXIgcmVzID0geGZvcm1bJ0BAdHJhbnNkdWNlci9zdGVwJ10odW5kZWZpbmVkLCBzb3VyY2UudmFsKTtcbiAgICBpZiAocmVzICYmIHJlc1snQEB0cmFuc2R1Y2VyL3JlZHVjZWQnXSA9PT0gdHJ1ZSkge1xuICAgICAgc2VsZi5lbmQodHJ1ZSk7XG4gICAgICByZXR1cm4gcmVzWydAQHRyYW5zZHVjZXIvdmFsdWUnXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gIH0sIFtzb3VyY2VdKTtcbn0pO1xuXG4vKipcbiAqIFJldHVybnMgYGZuYCBjdXJyaWVkIHRvIGBuYC4gVXNlIHRoaXMgZnVuY3Rpb24gdG8gY3VycnkgZnVuY3Rpb25zIGV4cG9zZWQgYnlcbiAqIG1vZHVsZXMgZm9yIEZseWQuXG4gKlxuICogQG5hbWUgZmx5ZC5jdXJyeU5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtJbnRlZ2VyfSBhcml0eSAtIHRoZSBmdW5jdGlvbiBhcml0eVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSB0aGUgZnVuY3Rpb24gdG8gY3VycnlcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSB0aGUgY3VycmllZCBmdW5jdGlvblxuICpcbiAqIEBleGFtcGxlXG4gKiBmdW5jdGlvbiBhZGQoeCwgeSkgeyByZXR1cm4geCArIHk7IH07XG4gKiB2YXIgYSA9IGZseWQuY3VycnlOKDIsIGFkZCk7XG4gKiBhKDIpKDQpIC8vID0+IDZcbiAqL1xuZmx5ZC5jdXJyeU4gPSBjdXJyeU5cblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IHN0cmVhbSBpZGVudGljYWwgdG8gdGhlIG9yaWdpbmFsIGV4Y2VwdCBldmVyeVxuICogdmFsdWUgd2lsbCBiZSBwYXNzZWQgdGhyb3VnaCBgZmAuXG4gKlxuICogX05vdGU6XyBUaGlzIGZ1bmN0aW9uIGlzIGluY2x1ZGVkIGluIG9yZGVyIHRvIHN1cHBvcnQgdGhlIGZhbnRhc3kgbGFuZFxuICogc3BlY2lmaWNhdGlvbi5cbiAqXG4gKiBfX1NpZ25hdHVyZV9fOiBDYWxsZWQgYm91bmQgdG8gYFN0cmVhbSBhYDogYChhIC0+IGIpIC0+IFN0cmVhbSBiYFxuICpcbiAqIEBuYW1lIHN0cmVhbS5tYXBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmN0aW9uIC0gdGhlIGZ1bmN0aW9uIHRvIGFwcGx5XG4gKiBAcmV0dXJuIHtzdHJlYW19IGEgbmV3IHN0cmVhbSB3aXRoIHRoZSB2YWx1ZXMgbWFwcGVkXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBudW1iZXJzID0gZmx5ZC5zdHJlYW0oMCk7XG4gKiB2YXIgc3F1YXJlZE51bWJlcnMgPSBudW1iZXJzLm1hcChmdW5jdGlvbihuKSB7IHJldHVybiBuKm47IH0pO1xuICovXG5mdW5jdGlvbiBib3VuZE1hcChmKSB7IHJldHVybiBmbHlkLm1hcChmLCB0aGlzKTsgfVxuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgc3RyZWFtIHdoaWNoIGlzIHRoZSByZXN1bHQgb2YgYXBwbHlpbmcgdGhlXG4gKiBmdW5jdGlvbnMgZnJvbSBgdGhpc2Agc3RyZWFtIHRvIHRoZSB2YWx1ZXMgaW4gYHN0cmVhbWAgcGFyYW1ldGVyLlxuICpcbiAqIGB0aGlzYCBzdHJlYW0gbXVzdCBiZSBhIHN0cmVhbSBvZiBmdW5jdGlvbnMuXG4gKlxuICogX05vdGU6XyBUaGlzIGZ1bmN0aW9uIGlzIGluY2x1ZGVkIGluIG9yZGVyIHRvIHN1cHBvcnQgdGhlIGZhbnRhc3kgbGFuZFxuICogc3BlY2lmaWNhdGlvbi5cbiAqXG4gKiBfX1NpZ25hdHVyZV9fOiBDYWxsZWQgYm91bmQgdG8gYFN0cmVhbSAoYSAtPiBiKWA6IGBhIC0+IFN0cmVhbSBiYFxuICpcbiAqIEBuYW1lIHN0cmVhbS5hcFxuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbSAtIHRoZSB2YWx1ZXMgc3RyZWFtXG4gKiBAcmV0dXJuIHtzdHJlYW19IGEgbmV3IHN0cmFtIHdpdGggdGhlIGZ1bmN0aW9ucyBhcHBsaWVkIHRvIHZhbHVlc1xuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgYWRkID0gZmx5ZC5jdXJyeU4oMiwgZnVuY3Rpb24oeCwgeSkgeyByZXR1cm4geCArIHk7IH0pO1xuICogdmFyIG51bWJlcnMxID0gZmx5ZC5zdHJlYW0oKTtcbiAqIHZhciBudW1iZXJzMiA9IGZseWQuc3RyZWFtKCk7XG4gKiB2YXIgYWRkVG9OdW1iZXJzMSA9IGZseWQubWFwKGFkZCwgbnVtYmVyczEpO1xuICogdmFyIGFkZGVkID0gYWRkVG9OdW1iZXJzMS5hcChudW1iZXJzMik7XG4gKi9cbmZ1bmN0aW9uIGFwKHMyKSB7XG4gIHZhciBzMSA9IHRoaXM7XG4gIHJldHVybiBjb21iaW5lKGZ1bmN0aW9uKHMxLCBzMiwgc2VsZikgeyBzZWxmKHMxLnZhbChzMi52YWwpKTsgfSwgW3MxLCBzMl0pO1xufVxuXG4vKipcbiAqIEdldCBhIGh1bWFuIHJlYWRhYmxlIHZpZXcgb2YgYSBzdHJlYW1cbiAqIEBuYW1lIHN0cmVhbS50b1N0cmluZ1xuICogQHJldHVybiB7U3RyaW5nfSB0aGUgc3RyZWFtIHN0cmluZyByZXByZXNlbnRhdGlvblxuICovXG5mdW5jdGlvbiBzdHJlYW1Ub1N0cmluZygpIHtcbiAgcmV0dXJuICdzdHJlYW0oJyArIHRoaXMudmFsICsgJyknO1xufVxuXG4vKipcbiAqIEBuYW1lIHN0cmVhbS5lbmRcbiAqIEBtZW1iZXJvZiBzdHJlYW1cbiAqIEEgc3RyZWFtIHRoYXQgZW1pdHMgYHRydWVgIHdoZW4gdGhlIHN0cmVhbSBlbmRzLiBJZiBgdHJ1ZWAgaXMgcHVzaGVkIGRvd24gdGhlXG4gKiBzdHJlYW0gdGhlIHBhcmVudCBzdHJlYW0gZW5kcy5cbiAqL1xuXG4vKipcbiAqIEBuYW1lIHN0cmVhbS5vZlxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2Ygc3RyZWFtXG4gKiBSZXR1cm5zIGEgbmV3IHN0cmVhbSB3aXRoIGB2YWx1ZWAgYXMgaXRzIGluaXRpYWwgdmFsdWUuIEl0IGlzIGlkZW50aWNhbCB0b1xuICogY2FsbGluZyBgZmx5ZC5zdHJlYW1gIHdpdGggb25lIGFyZ3VtZW50LlxuICpcbiAqIF9fU2lnbmF0dXJlX186IENhbGxlZCBib3VuZCB0byBgU3RyZWFtIChhKWA6IGBiIC0+IFN0cmVhbSBiYFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgLSB0aGUgaW5pdGlhbCB2YWx1ZVxuICogQHJldHVybiB7c3RyZWFtfSB0aGUgbmV3IHN0cmVhbVxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgbiA9IGZseWQuc3RyZWFtKDEpO1xuICogdmFyIG0gPSBuLm9mKDEpO1xuICovXG5cbi8vIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBQUklWQVRFIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyAvL1xuLyoqXG4gKiBAcHJpdmF0ZVxuICogQ3JlYXRlIGEgc3RyZWFtIHdpdGggbm8gZGVwZW5kZW5jaWVzIGFuZCBubyB2YWx1ZVxuICogQHJldHVybiB7RnVuY3Rpb259IGEgZmx5ZCBzdHJlYW1cbiAqL1xuZnVuY3Rpb24gY3JlYXRlU3RyZWFtKCkge1xuICBmdW5jdGlvbiBzKG4pIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHMudmFsXG4gICAgdXBkYXRlU3RyZWFtVmFsdWUocywgbilcbiAgICByZXR1cm4gc1xuICB9XG4gIHMuaGFzVmFsID0gZmFsc2U7XG4gIHMudmFsID0gdW5kZWZpbmVkO1xuICBzLnZhbHMgPSBbXTtcbiAgcy5saXN0ZW5lcnMgPSBbXTtcbiAgcy5xdWV1ZWQgPSBmYWxzZTtcbiAgcy5lbmQgPSB1bmRlZmluZWQ7XG4gIHMubWFwID0gYm91bmRNYXA7XG4gIHMuYXAgPSBhcDtcbiAgcy5vZiA9IGZseWQuc3RyZWFtO1xuICBzLnRvU3RyaW5nID0gc3RyZWFtVG9TdHJpbmc7XG4gIHJldHVybiBzO1xufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKiBDcmVhdGUgYSBkZXBlbmRlbnQgc3RyZWFtXG4gKiBAcGFyYW0ge0FycmF5PHN0cmVhbT59IGRlcGVuZGVuY2llcyAtIGFuIGFycmF5IG9mIHRoZSBzdHJlYW1zXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIHRoZSBmdW5jdGlvbiB1c2VkIHRvIGNhbGN1bGF0ZSB0aGUgbmV3IHN0cmVhbSB2YWx1ZVxuICogZnJvbSB0aGUgZGVwZW5kZW5jaWVzXG4gKiBAcmV0dXJuIHtzdHJlYW19IHRoZSBjcmVhdGVkIHN0cmVhbVxuICovXG5mdW5jdGlvbiBjcmVhdGVEZXBlbmRlbnRTdHJlYW0oZGVwcywgZm4pIHtcbiAgdmFyIHMgPSBjcmVhdGVTdHJlYW0oKTtcbiAgcy5mbiA9IGZuO1xuICBzLmRlcHMgPSBkZXBzO1xuICBzLmRlcHNNZXQgPSBmYWxzZTtcbiAgcy5kZXBzQ2hhbmdlZCA9IGRlcHMubGVuZ3RoID4gMCA/IFtdIDogdW5kZWZpbmVkO1xuICBzLnNob3VsZFVwZGF0ZSA9IGZhbHNlO1xuICBhZGRMaXN0ZW5lcnMoZGVwcywgcyk7XG4gIHJldHVybiBzO1xufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKiBDaGVjayBpZiBhbGwgdGhlIGRlcGVuZGVuY2llcyBoYXZlIHZhbHVlc1xuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbSAtIHRoZSBzdHJlYW0gdG8gY2hlY2sgZGVwZW5jZW5jaWVzIGZyb21cbiAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiBhbGwgZGVwZW5kZW5jaWVzIGhhdmUgdmFsZXMsIGBmYWxzZWAgb3RoZXJ3aXNlXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxEZXBzTm90TWV0KHN0cmVhbSkge1xuICBzdHJlYW0uZGVwc01ldCA9IHN0cmVhbS5kZXBzLmV2ZXJ5KGZ1bmN0aW9uKHMpIHtcbiAgICByZXR1cm4gcy5oYXNWYWw7XG4gIH0pO1xuICByZXR1cm4gIXN0cmVhbS5kZXBzTWV0O1xufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKiBVcGRhdGUgYSBkZXBlbmRlbnQgc3RyZWFtIHVzaW5nIGl0cyBkZXBlbmRlbmNpZXMgaW4gYW4gYXRvbWljIHdheVxuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbSAtIHRoZSBzdHJlYW0gdG8gdXBkYXRlXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVN0cmVhbShzKSB7XG4gIGlmICgocy5kZXBzTWV0ICE9PSB0cnVlICYmIGluaXRpYWxEZXBzTm90TWV0KHMpKSB8fFxuICAgICAgKHMuZW5kICE9PSB1bmRlZmluZWQgJiYgcy5lbmQudmFsID09PSB0cnVlKSkgcmV0dXJuO1xuICBpZiAoaW5TdHJlYW0gIT09IHVuZGVmaW5lZCkge1xuICAgIHRvVXBkYXRlLnB1c2gocyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGluU3RyZWFtID0gcztcbiAgaWYgKHMuZGVwc0NoYW5nZWQpIHMuZm5BcmdzW3MuZm5BcmdzLmxlbmd0aCAtIDFdID0gcy5kZXBzQ2hhbmdlZDtcbiAgdmFyIHJldHVyblZhbCA9IHMuZm4uYXBwbHkocy5mbiwgcy5mbkFyZ3MpO1xuICBpZiAocmV0dXJuVmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICBzKHJldHVyblZhbCk7XG4gIH1cbiAgaW5TdHJlYW0gPSB1bmRlZmluZWQ7XG4gIGlmIChzLmRlcHNDaGFuZ2VkICE9PSB1bmRlZmluZWQpIHMuZGVwc0NoYW5nZWQgPSBbXTtcbiAgcy5zaG91bGRVcGRhdGUgPSBmYWxzZTtcbiAgaWYgKGZsdXNoaW5nID09PSBmYWxzZSkgZmx1c2hVcGRhdGUoKTtcbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogVXBkYXRlIHRoZSBkZXBlbmRlbmNpZXMgb2YgYSBzdHJlYW1cbiAqIEBwYXJhbSB7c3RyZWFtfSBzdHJlYW1cbiAqL1xuZnVuY3Rpb24gdXBkYXRlRGVwcyhzKSB7XG4gIHZhciBpLCBvLCBsaXN0XG4gIHZhciBsaXN0ZW5lcnMgPSBzLmxpc3RlbmVycztcbiAgZm9yIChpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7ICsraSkge1xuICAgIGxpc3QgPSBsaXN0ZW5lcnNbaV07XG4gICAgaWYgKGxpc3QuZW5kID09PSBzKSB7XG4gICAgICBlbmRTdHJlYW0obGlzdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChsaXN0LmRlcHNDaGFuZ2VkICE9PSB1bmRlZmluZWQpIGxpc3QuZGVwc0NoYW5nZWQucHVzaChzKTtcbiAgICAgIGxpc3Quc2hvdWxkVXBkYXRlID0gdHJ1ZTtcbiAgICAgIGZpbmREZXBzKGxpc3QpO1xuICAgIH1cbiAgfVxuICBmb3IgKDsgb3JkZXJOZXh0SWR4ID49IDA7IC0tb3JkZXJOZXh0SWR4KSB7XG4gICAgbyA9IG9yZGVyW29yZGVyTmV4dElkeF07XG4gICAgaWYgKG8uc2hvdWxkVXBkYXRlID09PSB0cnVlKSB1cGRhdGVTdHJlYW0obyk7XG4gICAgby5xdWV1ZWQgPSBmYWxzZTtcbiAgfVxufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKiBBZGQgc3RyZWFtIGRlcGVuZGVuY2llcyB0byB0aGUgZ2xvYmFsIGBvcmRlcmAgcXVldWUuXG4gKiBAcGFyYW0ge3N0cmVhbX0gc3RyZWFtXG4gKiBAc2VlIHVwZGF0ZURlcHNcbiAqL1xuZnVuY3Rpb24gZmluZERlcHMocykge1xuICB2YXIgaVxuICB2YXIgbGlzdGVuZXJzID0gcy5saXN0ZW5lcnM7XG4gIGlmIChzLnF1ZXVlZCA9PT0gZmFsc2UpIHtcbiAgICBzLnF1ZXVlZCA9IHRydWU7XG4gICAgZm9yIChpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7ICsraSkge1xuICAgICAgZmluZERlcHMobGlzdGVuZXJzW2ldKTtcbiAgICB9XG4gICAgb3JkZXJbKytvcmRlck5leHRJZHhdID0gcztcbiAgfVxufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGZsdXNoVXBkYXRlKCkge1xuICBmbHVzaGluZyA9IHRydWU7XG4gIHdoaWxlICh0b1VwZGF0ZS5sZW5ndGggPiAwKSB7XG4gICAgdmFyIHMgPSB0b1VwZGF0ZS5zaGlmdCgpO1xuICAgIGlmIChzLnZhbHMubGVuZ3RoID4gMCkgcy52YWwgPSBzLnZhbHMuc2hpZnQoKTtcbiAgICB1cGRhdGVEZXBzKHMpO1xuICB9XG4gIGZsdXNoaW5nID0gZmFsc2U7XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqIFB1c2ggZG93biBhIHZhbHVlIGludG8gYSBzdHJlYW1cbiAqIEBwYXJhbSB7c3RyZWFtfSBzdHJlYW1cbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqL1xuZnVuY3Rpb24gdXBkYXRlU3RyZWFtVmFsdWUocywgbikge1xuICBpZiAobiAhPT0gdW5kZWZpbmVkICYmIG4gIT09IG51bGwgJiYgaXNGdW5jdGlvbihuLnRoZW4pKSB7XG4gICAgbi50aGVuKHMpO1xuICAgIHJldHVybjtcbiAgfVxuICBzLnZhbCA9IG47XG4gIHMuaGFzVmFsID0gdHJ1ZTtcbiAgaWYgKGluU3RyZWFtID09PSB1bmRlZmluZWQpIHtcbiAgICBmbHVzaGluZyA9IHRydWU7XG4gICAgdXBkYXRlRGVwcyhzKTtcbiAgICBpZiAodG9VcGRhdGUubGVuZ3RoID4gMCkgZmx1c2hVcGRhdGUoKTsgZWxzZSBmbHVzaGluZyA9IGZhbHNlO1xuICB9IGVsc2UgaWYgKGluU3RyZWFtID09PSBzKSB7XG4gICAgbWFya0xpc3RlbmVycyhzLCBzLmxpc3RlbmVycyk7XG4gIH0gZWxzZSB7XG4gICAgcy52YWxzLnB1c2gobik7XG4gICAgdG9VcGRhdGUucHVzaChzKTtcbiAgfVxufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIG1hcmtMaXN0ZW5lcnMocywgbGlzdHMpIHtcbiAgdmFyIGksIGxpc3Q7XG4gIGZvciAoaSA9IDA7IGkgPCBsaXN0cy5sZW5ndGg7ICsraSkge1xuICAgIGxpc3QgPSBsaXN0c1tpXTtcbiAgICBpZiAobGlzdC5lbmQgIT09IHMpIHtcbiAgICAgIGlmIChsaXN0LmRlcHNDaGFuZ2VkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbGlzdC5kZXBzQ2hhbmdlZC5wdXNoKHMpO1xuICAgICAgfVxuICAgICAgbGlzdC5zaG91bGRVcGRhdGUgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmRTdHJlYW0obGlzdCk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqIEFkZCBkZXBlbmRlbmNpZXMgdG8gYSBzdHJlYW1cbiAqIEBwYXJhbSB7QXJyYXk8c3RyZWFtPn0gZGVwZW5kZW5jaWVzXG4gKiBAcGFyYW0ge3N0cmVhbX0gc3RyZWFtXG4gKi9cbmZ1bmN0aW9uIGFkZExpc3RlbmVycyhkZXBzLCBzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZGVwcy5sZW5ndGg7ICsraSkge1xuICAgIGRlcHNbaV0ubGlzdGVuZXJzLnB1c2gocyk7XG4gIH1cbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogUmVtb3ZlcyBhbiBzdHJlYW0gZnJvbSBhIGRlcGVuZGVuY3kgYXJyYXlcbiAqIEBwYXJhbSB7c3RyZWFtfSBzdHJlYW1cbiAqIEBwYXJhbSB7QXJyYXk8c3RyZWFtPn0gZGVwZW5kZW5jaWVzXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHMsIGxpc3RlbmVycykge1xuICB2YXIgaWR4ID0gbGlzdGVuZXJzLmluZGV4T2Yocyk7XG4gIGxpc3RlbmVyc1tpZHhdID0gbGlzdGVuZXJzW2xpc3RlbmVycy5sZW5ndGggLSAxXTtcbiAgbGlzdGVuZXJzLmxlbmd0aC0tO1xufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKiBEZXRhY2ggYSBzdHJlYW0gZnJvbSBpdHMgZGVwZW5kZW5jaWVzXG4gKiBAcGFyYW0ge3N0cmVhbX0gc3RyZWFtXG4gKi9cbmZ1bmN0aW9uIGRldGFjaERlcHMocykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHMuZGVwcy5sZW5ndGg7ICsraSkge1xuICAgIHJlbW92ZUxpc3RlbmVyKHMsIHMuZGVwc1tpXS5saXN0ZW5lcnMpO1xuICB9XG4gIHMuZGVwcy5sZW5ndGggPSAwO1xufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKiBFbmRzIGEgc3RyZWFtXG4gKi9cbmZ1bmN0aW9uIGVuZFN0cmVhbShzKSB7XG4gIGlmIChzLmRlcHMgIT09IHVuZGVmaW5lZCkgZGV0YWNoRGVwcyhzKTtcbiAgaWYgKHMuZW5kICE9PSB1bmRlZmluZWQpIGRldGFjaERlcHMocy5lbmQpO1xufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKiB0cmFuc2R1Y2VyIHN0cmVhbSB0cmFuc2Zvcm1lclxuICovXG5mdW5jdGlvbiBTdHJlYW1UcmFuc2Zvcm1lcigpIHsgfVxuU3RyZWFtVHJhbnNmb3JtZXIucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gZnVuY3Rpb24oKSB7IH07XG5TdHJlYW1UcmFuc2Zvcm1lci5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IGZ1bmN0aW9uKCkgeyB9O1xuU3RyZWFtVHJhbnNmb3JtZXIucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24ocywgdikgeyByZXR1cm4gdjsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmbHlkO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZmx5ZC9saWIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE1IDIwIDIxIDIyIDIzIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIDQgNSA2IDcgOCA5IDEzIDE0IDIwIDIyIDI2IiwibW9kdWxlLmV4cG9ydHMgPSBpc1dpZGdldFxuXG5mdW5jdGlvbiBpc1dpZGdldCh3KSB7XG4gICAgcmV0dXJuIHcgJiYgdy50eXBlID09PSBcIldpZGdldFwiXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92bm9kZS9pcy13aWRnZXQuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNCA1IDkgMjAgMjIiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9hcml0eShuLCBmbikge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuICBzd2l0Y2ggKG4pIHtcbiAgICBjYXNlIDA6IHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH07XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYTApIHsgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24oYTAsIGExKSB7IHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKGEwLCBhMSwgYTIpIHsgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH07XG4gICAgY2FzZSA0OiByZXR1cm4gZnVuY3Rpb24oYTAsIGExLCBhMiwgYTMpIHsgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH07XG4gICAgY2FzZSA1OiByZXR1cm4gZnVuY3Rpb24oYTAsIGExLCBhMiwgYTMsIGE0KSB7IHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICAgIGNhc2UgNjogcmV0dXJuIGZ1bmN0aW9uKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUpIHsgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH07XG4gICAgY2FzZSA3OiByZXR1cm4gZnVuY3Rpb24oYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYpIHsgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH07XG4gICAgY2FzZSA4OiByZXR1cm4gZnVuY3Rpb24oYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3KSB7IHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICAgIGNhc2UgOTogcmV0dXJuIGZ1bmN0aW9uKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgpIHsgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH07XG4gICAgY2FzZSAxMDogcmV0dXJuIGZ1bmN0aW9uKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgsIGE5KSB7IHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICAgIGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcignRmlyc3QgYXJndW1lbnQgdG8gX2FyaXR5IG11c3QgYmUgYSBub24tbmVnYXRpdmUgaW50ZWdlciBubyBncmVhdGVyIHRoYW4gdGVuJyk7XG4gIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9mbHlkL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2FyaXR5LmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTUgMjAgMjEgMjIgMjMiLCJ2YXIgX2lzUGxhY2Vob2xkZXIgPSByZXF1aXJlKCcuL19pc1BsYWNlaG9sZGVyJyk7XG5cblxuLyoqXG4gKiBPcHRpbWl6ZWQgaW50ZXJuYWwgb25lLWFyaXR5IGN1cnJ5IGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgY3VycmllZCBmdW5jdGlvbi5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfY3VycnkxKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBmMShhKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDAgfHwgX2lzUGxhY2Vob2xkZXIoYSkpIHtcbiAgICAgIHJldHVybiBmMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2ZseWQvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fY3VycnkxLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTUgMjAgMjEgMjIgMjMiLCJtb2R1bGUuZXhwb3J0cyA9IFwiMlwiXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92bm9kZS92ZXJzaW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAxNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA0IDUgOSAyMCAyMiIsInZhciB2ZXJzaW9uID0gcmVxdWlyZShcIi4vdmVyc2lvblwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzVmlydHVhbE5vZGVcblxuZnVuY3Rpb24gaXNWaXJ0dWFsTm9kZSh4KSB7XG4gICAgcmV0dXJuIHggJiYgeC50eXBlID09PSBcIlZpcnR1YWxOb2RlXCIgJiYgeC52ZXJzaW9uID09PSB2ZXJzaW9uXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92bm9kZS9pcy12bm9kZS5qc1xuLy8gbW9kdWxlIGlkID0gMTQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNCA1IDkgMjAgMjIiLCJ2YXIgZmx5ZCA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZseWQuY3VycnlOKDIsIGZ1bmN0aW9uKHBhaXJzLCBhY2MpIHtcbiAgdmFyIHN0cmVhbXMgPSBwYWlycy5tYXAoZnVuY3Rpb24ocCkgeyByZXR1cm4gcFswXTsgfSk7XG4gIC8vIHVzZSBpbW1lZGlhdGUgYmVjYXVzZSB3ZSB3YW50IGVhY2ggc3RyZWFtIHRvIGZpcmUgcmVnYXJkbGVzcyBvZiBpZiB0aGUgb3RoZXJzIGhhdmUgZXZlciBoYWQgYSB2YWx1ZVxuICByZXR1cm4gZmx5ZC5pbW1lZGlhdGUoZmx5ZC5jb21iaW5lKGZ1bmN0aW9uKCkge1xuICAgIHZhciBjaGFuZ2VkID0gYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXTtcbiAgICAvLyB2YXIgc2VsZiA9IGFyZ3VtZW50c1thcmd1bWVudHMubGVuZ3RoIC0gMl07XG4gICAgLy8gYmVjYXVzZSBvZiBhdG9taWMgdXBkYXRlcyB3ZSBjYW4gaGF2ZSBtb3JlIHRoYW4gb25lIGNoYW5nZWRcbiAgICAvLyBtZWFuaW5nIG1vcmUgdGhhbiBvbmUgZnVuY3Rpb24gc2hvdWxkIGJlIGZpcmVkLCBsZXRzIGRvIGl0IGluIG9yZGVyIHNvIGl0cyBwcmVkaWN0YWJsZVxuICAgIGZvciAodmFyIHAgPSAwOyBwIDwgcGFpcnMubGVuZ3RoOyBwKyspIHtcbiAgICAgIC8vIGJlY2F1c2UgY2hhbmdlZCBpcyBhbiBhcnJheSBvZiByZWZlcmVuY2VzIGl0IGRvZXNuJ3QgbWF0dGVyIGlmIHdlIHB1bGwgdGhlIGZpcnN0IG1hdGNoIGluIHRoZSBjYXNlIG9mIG11bHRpcGxlIG1hdGNoZXNcbiAgICAgIHZhciBpZHggPSBjaGFuZ2VkLmluZGV4T2YocGFpcnNbcF1bMF0pO1xuICAgICAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICAgICAgYWNjID0gcGFpcnNbcF1bMV0oYWNjLCBjaGFuZ2VkW2lkeF0oKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhY2M7XG4gIH0sIHN0cmVhbXMpKTtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZmx5ZC9tb2R1bGUvc2Nhbm1lcmdlL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxNDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA0IDUgNyA4IDExIDIxIDIyIiwibW9kdWxlLmV4cG9ydHMgPSBpc1RodW5rXHJcblxyXG5mdW5jdGlvbiBpc1RodW5rKHQpIHtcclxuICAgIHJldHVybiB0ICYmIHQudHlwZSA9PT0gXCJUaHVua1wiXHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdmlydHVhbC1kb20vdm5vZGUvaXMtdGh1bmsuanNcbi8vIG1vZHVsZSBpZCA9IDE1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIDQgNSA5IDIwIDIyIiwibW9kdWxlLmV4cG9ydHMgPSBpc0hvb2tcblxuZnVuY3Rpb24gaXNIb29rKGhvb2spIHtcbiAgICByZXR1cm4gaG9vayAmJlxuICAgICAgKHR5cGVvZiBob29rLmhvb2sgPT09IFwiZnVuY3Rpb25cIiAmJiAhaG9vay5oYXNPd25Qcm9wZXJ0eShcImhvb2tcIikgfHxcbiAgICAgICB0eXBlb2YgaG9vay51bmhvb2sgPT09IFwiZnVuY3Rpb25cIiAmJiAhaG9vay5oYXNPd25Qcm9wZXJ0eShcInVuaG9va1wiKSlcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3Zub2RlL2lzLXZob29rLmpzXG4vLyBtb2R1bGUgaWQgPSAxNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA0IDUgOSAyMCAyMiIsInZhciB2ZXJzaW9uID0gcmVxdWlyZShcIi4vdmVyc2lvblwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzVmlydHVhbFRleHRcblxuZnVuY3Rpb24gaXNWaXJ0dWFsVGV4dCh4KSB7XG4gICAgcmV0dXJuIHggJiYgeC50eXBlID09PSBcIlZpcnR1YWxUZXh0XCIgJiYgeC52ZXJzaW9uID09PSB2ZXJzaW9uXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92bm9kZS9pcy12dGV4dC5qc1xuLy8gbW9kdWxlIGlkID0gMTUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNCA1IDkgMjAgMjIiLCJ2YXIgX2FyaXR5ID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fYXJpdHknKTtcbnZhciBfY3VycnkxID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG52YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xudmFyIF9jdXJyeU4gPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeU4nKTtcblxuXG4vKipcbiAqIFJldHVybnMgYSBjdXJyaWVkIGVxdWl2YWxlbnQgb2YgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uLCB3aXRoIHRoZSBzcGVjaWZpZWRcbiAqIGFyaXR5LiBUaGUgY3VycmllZCBmdW5jdGlvbiBoYXMgdHdvIHVudXN1YWwgY2FwYWJpbGl0aWVzLiBGaXJzdCwgaXRzXG4gKiBhcmd1bWVudHMgbmVlZG4ndCBiZSBwcm92aWRlZCBvbmUgYXQgYSB0aW1lLiBJZiBgZ2AgaXMgYFIuY3VycnlOKDMsIGYpYCwgdGhlXG4gKiBmb2xsb3dpbmcgYXJlIGVxdWl2YWxlbnQ6XG4gKlxuICogICAtIGBnKDEpKDIpKDMpYFxuICogICAtIGBnKDEpKDIsIDMpYFxuICogICAtIGBnKDEsIDIpKDMpYFxuICogICAtIGBnKDEsIDIsIDMpYFxuICpcbiAqIFNlY29uZGx5LCB0aGUgc3BlY2lhbCBwbGFjZWhvbGRlciB2YWx1ZSBgUi5fX2AgbWF5IGJlIHVzZWQgdG8gc3BlY2lmeVxuICogXCJnYXBzXCIsIGFsbG93aW5nIHBhcnRpYWwgYXBwbGljYXRpb24gb2YgYW55IGNvbWJpbmF0aW9uIG9mIGFyZ3VtZW50cyxcbiAqIHJlZ2FyZGxlc3Mgb2YgdGhlaXIgcG9zaXRpb25zLiBJZiBgZ2AgaXMgYXMgYWJvdmUgYW5kIGBfYCBpcyBgUi5fX2AsIHRoZVxuICogZm9sbG93aW5nIGFyZSBlcXVpdmFsZW50OlxuICpcbiAqICAgLSBgZygxLCAyLCAzKWBcbiAqICAgLSBgZyhfLCAyLCAzKSgxKWBcbiAqICAgLSBgZyhfLCBfLCAzKSgxKSgyKWBcbiAqICAgLSBgZyhfLCBfLCAzKSgxLCAyKWBcbiAqICAgLSBgZyhfLCAyKSgxKSgzKWBcbiAqICAgLSBgZyhfLCAyKSgxLCAzKWBcbiAqICAgLSBgZyhfLCAyKShfLCAzKSgxKWBcbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC41LjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyBOdW1iZXIgLT4gKCogLT4gYSkgLT4gKCogLT4gYSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGggVGhlIGFyaXR5IGZvciB0aGUgcmV0dXJuZWQgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcsIGN1cnJpZWQgZnVuY3Rpb24uXG4gKiBAc2VlIFIuY3VycnlcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgc3VtQXJncyA9ICguLi5hcmdzKSA9PiBSLnN1bShhcmdzKTtcbiAqXG4gKiAgICAgIHZhciBjdXJyaWVkQWRkRm91ck51bWJlcnMgPSBSLmN1cnJ5Tig0LCBzdW1BcmdzKTtcbiAqICAgICAgdmFyIGYgPSBjdXJyaWVkQWRkRm91ck51bWJlcnMoMSwgMik7XG4gKiAgICAgIHZhciBnID0gZigzKTtcbiAqICAgICAgZyg0KTsgLy89PiAxMFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gY3VycnlOKGxlbmd0aCwgZm4pIHtcbiAgaWYgKGxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBfY3VycnkxKGZuKTtcbiAgfVxuICByZXR1cm4gX2FyaXR5KGxlbmd0aCwgX2N1cnJ5TihsZW5ndGgsIFtdLCBmbikpO1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9mbHlkL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvY3VycnlOLmpzXG4vLyBtb2R1bGUgaWQgPSAxNTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE1IDIwIDIxIDIyIDIzIiwidmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL19jdXJyeTEnKTtcbnZhciBfaXNQbGFjZWhvbGRlciA9IHJlcXVpcmUoJy4vX2lzUGxhY2Vob2xkZXInKTtcblxuXG4vKipcbiAqIE9wdGltaXplZCBpbnRlcm5hbCB0d28tYXJpdHkgY3VycnkgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBjdXJyaWVkIGZ1bmN0aW9uLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9jdXJyeTIoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGYyKGEsIGIpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIGYyO1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gX2lzUGxhY2Vob2xkZXIoYSkgPyBmMlxuICAgICAgICAgICAgIDogX2N1cnJ5MShmdW5jdGlvbihfYikgeyByZXR1cm4gZm4oYSwgX2IpOyB9KTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBfaXNQbGFjZWhvbGRlcihhKSAmJiBfaXNQbGFjZWhvbGRlcihiKSA/IGYyXG4gICAgICAgICAgICAgOiBfaXNQbGFjZWhvbGRlcihhKSA/IF9jdXJyeTEoZnVuY3Rpb24oX2EpIHsgcmV0dXJuIGZuKF9hLCBiKTsgfSlcbiAgICAgICAgICAgICA6IF9pc1BsYWNlaG9sZGVyKGIpID8gX2N1cnJ5MShmdW5jdGlvbihfYikgeyByZXR1cm4gZm4oYSwgX2IpOyB9KVxuICAgICAgICAgICAgIDogZm4oYSwgYik7XG4gICAgfVxuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2ZseWQvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fY3VycnkyLmpzXG4vLyBtb2R1bGUgaWQgPSAxNThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE1IDIwIDIxIDIyIDIzIiwidmFyIF9hcml0eSA9IHJlcXVpcmUoJy4vX2FyaXR5Jyk7XG52YXIgX2lzUGxhY2Vob2xkZXIgPSByZXF1aXJlKCcuL19pc1BsYWNlaG9sZGVyJyk7XG5cblxuLyoqXG4gKiBJbnRlcm5hbCBjdXJyeU4gZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCBUaGUgYXJpdHkgb2YgdGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge0FycmF5fSByZWNlaXZlZCBBbiBhcnJheSBvZiBhcmd1bWVudHMgcmVjZWl2ZWQgdGh1cyBmYXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2N1cnJ5TihsZW5ndGgsIHJlY2VpdmVkLCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvbWJpbmVkID0gW107XG4gICAgdmFyIGFyZ3NJZHggPSAwO1xuICAgIHZhciBsZWZ0ID0gbGVuZ3RoO1xuICAgIHZhciBjb21iaW5lZElkeCA9IDA7XG4gICAgd2hpbGUgKGNvbWJpbmVkSWR4IDwgcmVjZWl2ZWQubGVuZ3RoIHx8IGFyZ3NJZHggPCBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICB2YXIgcmVzdWx0O1xuICAgICAgaWYgKGNvbWJpbmVkSWR4IDwgcmVjZWl2ZWQubGVuZ3RoICYmXG4gICAgICAgICAgKCFfaXNQbGFjZWhvbGRlcihyZWNlaXZlZFtjb21iaW5lZElkeF0pIHx8XG4gICAgICAgICAgIGFyZ3NJZHggPj0gYXJndW1lbnRzLmxlbmd0aCkpIHtcbiAgICAgICAgcmVzdWx0ID0gcmVjZWl2ZWRbY29tYmluZWRJZHhdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gYXJndW1lbnRzW2FyZ3NJZHhdO1xuICAgICAgICBhcmdzSWR4ICs9IDE7XG4gICAgICB9XG4gICAgICBjb21iaW5lZFtjb21iaW5lZElkeF0gPSByZXN1bHQ7XG4gICAgICBpZiAoIV9pc1BsYWNlaG9sZGVyKHJlc3VsdCkpIHtcbiAgICAgICAgbGVmdCAtPSAxO1xuICAgICAgfVxuICAgICAgY29tYmluZWRJZHggKz0gMTtcbiAgICB9XG4gICAgcmV0dXJuIGxlZnQgPD0gMCA/IGZuLmFwcGx5KHRoaXMsIGNvbWJpbmVkKVxuICAgICAgICAgICAgICAgICAgICAgOiBfYXJpdHkobGVmdCwgX2N1cnJ5TihsZW5ndGgsIGNvbWJpbmVkLCBmbikpO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2ZseWQvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fY3VycnlOLmpzXG4vLyBtb2R1bGUgaWQgPSAxNTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE1IDIwIDIxIDIyIDIzIiwidmFyIGggPSByZXF1aXJlKFwiLi92aXJ0dWFsLWh5cGVyc2NyaXB0L2luZGV4LmpzXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gaFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdmlydHVhbC1kb20vaC5qc1xuLy8gbW9kdWxlIGlkID0gMTY3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNCA1IDkgMjAgMjIiLCJ2YXIgbmF0aXZlSXNBcnJheSA9IEFycmF5LmlzQXJyYXlcbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcblxubW9kdWxlLmV4cG9ydHMgPSBuYXRpdmVJc0FycmF5IHx8IGlzQXJyYXlcblxuZnVuY3Rpb24gaXNBcnJheShvYmopIHtcbiAgICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSBcIltvYmplY3QgQXJyYXldXCJcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3gtaXMtYXJyYXkvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDE3MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIDQgNSA5IDIwIDIyIiwidmFyIGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCd2aXJ0dWFsLWRvbS9jcmVhdGUtZWxlbWVudCcpXG52YXIgcGF0Y2ggPSByZXF1aXJlKCd2aXJ0dWFsLWRvbS9wYXRjaCcpXG52YXIgZGlmZiA9IHJlcXVpcmUoJ3ZpcnR1YWwtZG9tL2RpZmYnKVxudmFyIGN1cnJ5TiA9IHJlcXVpcmUoJ2ZqLWN1cnJ5JykuY3VycnlOXG5cbnZhciB2aWV3ID0gY3VycnlOKDMsIGZ1bmN0aW9uKHJvb3RGbiwgcGFyZW50Tm9kZSwgc3RhdGUpIHtcbiB2YXIgdmlldyA9IHtyb290OiByb290Rm4sIHRyZWU6IHJvb3RGbihzdGF0ZSl9XG4gdmlldy5yb290Tm9kZSA9IGNyZWF0ZUVsZW1lbnQodmlldy50cmVlKVxuIHBhcmVudE5vZGUuYXBwZW5kQ2hpbGQodmlldy5yb290Tm9kZSlcbiByZXR1cm4gcmVyZW5kZXIodmlldylcbn0pXG5cbnZhciByZXJlbmRlciA9IGN1cnJ5TigyLCBmdW5jdGlvbih2aWV3LCBuZXdTdGF0ZSkge1xuIHZhciBuZXdUcmVlID0gdmlldy5yb290KG5ld1N0YXRlKVxuIHZhciBwYXRjaGVzID0gZGlmZih2aWV3LnRyZWUsIG5ld1RyZWUpXG4gdmlldy5yb290Tm9kZSA9IHBhdGNoKHZpZXcucm9vdE5vZGUsIHBhdGNoZXMpXG4gdmlldy50cmVlID0gbmV3VHJlZVxuIHJldHVybiBuZXdUcmVlXG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IHZpZXdcblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnZ2dmlldy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTgyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNCA1IDkgMjAgMjIiLCJ2YXIgZG9jdW1lbnQgPSByZXF1aXJlKFwiZ2xvYmFsL2RvY3VtZW50XCIpXG5cbnZhciBhcHBseVByb3BlcnRpZXMgPSByZXF1aXJlKFwiLi9hcHBseS1wcm9wZXJ0aWVzXCIpXG5cbnZhciBpc1ZOb2RlID0gcmVxdWlyZShcIi4uL3Zub2RlL2lzLXZub2RlLmpzXCIpXG52YXIgaXNWVGV4dCA9IHJlcXVpcmUoXCIuLi92bm9kZS9pcy12dGV4dC5qc1wiKVxudmFyIGlzV2lkZ2V0ID0gcmVxdWlyZShcIi4uL3Zub2RlL2lzLXdpZGdldC5qc1wiKVxudmFyIGhhbmRsZVRodW5rID0gcmVxdWlyZShcIi4uL3Zub2RlL2hhbmRsZS10aHVuay5qc1wiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUVsZW1lbnRcblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh2bm9kZSwgb3B0cykge1xuICAgIHZhciBkb2MgPSBvcHRzID8gb3B0cy5kb2N1bWVudCB8fCBkb2N1bWVudCA6IGRvY3VtZW50XG4gICAgdmFyIHdhcm4gPSBvcHRzID8gb3B0cy53YXJuIDogbnVsbFxuXG4gICAgdm5vZGUgPSBoYW5kbGVUaHVuayh2bm9kZSkuYVxuXG4gICAgaWYgKGlzV2lkZ2V0KHZub2RlKSkge1xuICAgICAgICByZXR1cm4gdm5vZGUuaW5pdCgpXG4gICAgfSBlbHNlIGlmIChpc1ZUZXh0KHZub2RlKSkge1xuICAgICAgICByZXR1cm4gZG9jLmNyZWF0ZVRleHROb2RlKHZub2RlLnRleHQpXG4gICAgfSBlbHNlIGlmICghaXNWTm9kZSh2bm9kZSkpIHtcbiAgICAgICAgaWYgKHdhcm4pIHtcbiAgICAgICAgICAgIHdhcm4oXCJJdGVtIGlzIG5vdCBhIHZhbGlkIHZpcnR1YWwgZG9tIG5vZGVcIiwgdm5vZGUpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICB2YXIgbm9kZSA9ICh2bm9kZS5uYW1lc3BhY2UgPT09IG51bGwpID9cbiAgICAgICAgZG9jLmNyZWF0ZUVsZW1lbnQodm5vZGUudGFnTmFtZSkgOlxuICAgICAgICBkb2MuY3JlYXRlRWxlbWVudE5TKHZub2RlLm5hbWVzcGFjZSwgdm5vZGUudGFnTmFtZSlcblxuICAgIHZhciBwcm9wcyA9IHZub2RlLnByb3BlcnRpZXNcbiAgICBhcHBseVByb3BlcnRpZXMobm9kZSwgcHJvcHMpXG5cbiAgICB2YXIgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlblxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2hpbGROb2RlID0gY3JlYXRlRWxlbWVudChjaGlsZHJlbltpXSwgb3B0cylcbiAgICAgICAgaWYgKGNoaWxkTm9kZSkge1xuICAgICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChjaGlsZE5vZGUpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdmlydHVhbC1kb20vdmRvbS9jcmVhdGUtZWxlbWVudC5qc1xuLy8gbW9kdWxlIGlkID0gMTgzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNCA1IDkgMjAgMjIiLCJ2YXIgdG9wTGV2ZWwgPSB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6XG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB7fVxudmFyIG1pbkRvYyA9IHJlcXVpcmUoJ21pbi1kb2N1bWVudCcpO1xuXG52YXIgZG9jY3k7XG5cbmlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZG9jY3kgPSBkb2N1bWVudDtcbn0gZWxzZSB7XG4gICAgZG9jY3kgPSB0b3BMZXZlbFsnX19HTE9CQUxfRE9DVU1FTlRfQ0FDSEVANCddO1xuXG4gICAgaWYgKCFkb2NjeSkge1xuICAgICAgICBkb2NjeSA9IHRvcExldmVsWydfX0dMT0JBTF9ET0NVTUVOVF9DQUNIRUA0J10gPSBtaW5Eb2M7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvY2N5O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2xvYmFsL2RvY3VtZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAxODRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA0IDUgOSAyMCAyMiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoXCJpcy1vYmplY3RcIilcbnZhciBpc0hvb2sgPSByZXF1aXJlKFwiLi4vdm5vZGUvaXMtdmhvb2suanNcIilcblxubW9kdWxlLmV4cG9ydHMgPSBhcHBseVByb3BlcnRpZXNcblxuZnVuY3Rpb24gYXBwbHlQcm9wZXJ0aWVzKG5vZGUsIHByb3BzLCBwcmV2aW91cykge1xuICAgIGZvciAodmFyIHByb3BOYW1lIGluIHByb3BzKSB7XG4gICAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV1cblxuICAgICAgICBpZiAocHJvcFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlbW92ZVByb3BlcnR5KG5vZGUsIHByb3BOYW1lLCBwcm9wVmFsdWUsIHByZXZpb3VzKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0hvb2socHJvcFZhbHVlKSkge1xuICAgICAgICAgICAgcmVtb3ZlUHJvcGVydHkobm9kZSwgcHJvcE5hbWUsIHByb3BWYWx1ZSwgcHJldmlvdXMpXG4gICAgICAgICAgICBpZiAocHJvcFZhbHVlLmhvb2spIHtcbiAgICAgICAgICAgICAgICBwcm9wVmFsdWUuaG9vayhub2RlLFxuICAgICAgICAgICAgICAgICAgICBwcm9wTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMgPyBwcmV2aW91c1twcm9wTmFtZV0gOiB1bmRlZmluZWQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaXNPYmplY3QocHJvcFZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHBhdGNoT2JqZWN0KG5vZGUsIHByb3BzLCBwcmV2aW91cywgcHJvcE5hbWUsIHByb3BWYWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vZGVbcHJvcE5hbWVdID0gcHJvcFZhbHVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVByb3BlcnR5KG5vZGUsIHByb3BOYW1lLCBwcm9wVmFsdWUsIHByZXZpb3VzKSB7XG4gICAgaWYgKHByZXZpb3VzKSB7XG4gICAgICAgIHZhciBwcmV2aW91c1ZhbHVlID0gcHJldmlvdXNbcHJvcE5hbWVdXG5cbiAgICAgICAgaWYgKCFpc0hvb2socHJldmlvdXNWYWx1ZSkpIHtcbiAgICAgICAgICAgIGlmIChwcm9wTmFtZSA9PT0gXCJhdHRyaWJ1dGVzXCIpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBhdHRyTmFtZSBpbiBwcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcE5hbWUgPT09IFwic3R5bGVcIikge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gcHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnN0eWxlW2ldID0gXCJcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHByZXZpb3VzVmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICBub2RlW3Byb3BOYW1lXSA9IFwiXCJcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9kZVtwcm9wTmFtZV0gPSBudWxsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocHJldmlvdXNWYWx1ZS51bmhvb2spIHtcbiAgICAgICAgICAgIHByZXZpb3VzVmFsdWUudW5ob29rKG5vZGUsIHByb3BOYW1lLCBwcm9wVmFsdWUpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBhdGNoT2JqZWN0KG5vZGUsIHByb3BzLCBwcmV2aW91cywgcHJvcE5hbWUsIHByb3BWYWx1ZSkge1xuICAgIHZhciBwcmV2aW91c1ZhbHVlID0gcHJldmlvdXMgPyBwcmV2aW91c1twcm9wTmFtZV0gOiB1bmRlZmluZWRcblxuICAgIC8vIFNldCBhdHRyaWJ1dGVzXG4gICAgaWYgKHByb3BOYW1lID09PSBcImF0dHJpYnV0ZXNcIikge1xuICAgICAgICBmb3IgKHZhciBhdHRyTmFtZSBpbiBwcm9wVmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBhdHRyVmFsdWUgPSBwcm9wVmFsdWVbYXR0ck5hbWVdXG5cbiAgICAgICAgICAgIGlmIChhdHRyVmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYocHJldmlvdXNWYWx1ZSAmJiBpc09iamVjdChwcmV2aW91c1ZhbHVlKSAmJlxuICAgICAgICBnZXRQcm90b3R5cGUocHJldmlvdXNWYWx1ZSkgIT09IGdldFByb3RvdHlwZShwcm9wVmFsdWUpKSB7XG4gICAgICAgIG5vZGVbcHJvcE5hbWVdID0gcHJvcFZhbHVlXG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICghaXNPYmplY3Qobm9kZVtwcm9wTmFtZV0pKSB7XG4gICAgICAgIG5vZGVbcHJvcE5hbWVdID0ge31cbiAgICB9XG5cbiAgICB2YXIgcmVwbGFjZXIgPSBwcm9wTmFtZSA9PT0gXCJzdHlsZVwiID8gXCJcIiA6IHVuZGVmaW5lZFxuXG4gICAgZm9yICh2YXIgayBpbiBwcm9wVmFsdWUpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gcHJvcFZhbHVlW2tdXG4gICAgICAgIG5vZGVbcHJvcE5hbWVdW2tdID0gKHZhbHVlID09PSB1bmRlZmluZWQpID8gcmVwbGFjZXIgOiB2YWx1ZVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0UHJvdG90eXBlKHZhbHVlKSB7XG4gICAgaWYgKE9iamVjdC5nZXRQcm90b3R5cGVPZikge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbHVlKVxuICAgIH0gZWxzZSBpZiAodmFsdWUuX19wcm90b19fKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5fX3Byb3RvX19cbiAgICB9IGVsc2UgaWYgKHZhbHVlLmNvbnN0cnVjdG9yKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5jb25zdHJ1Y3Rvci5wcm90b3R5cGVcbiAgICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92ZG9tL2FwcGx5LXByb3BlcnRpZXMuanNcbi8vIG1vZHVsZSBpZCA9IDE4NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIDQgNSA5IDIwIDIyIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNPYmplY3QoeCkge1xuXHRyZXR1cm4gdHlwZW9mIHggPT09IFwib2JqZWN0XCIgJiYgeCAhPT0gbnVsbDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9pcy1vYmplY3QvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDE4NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIDQgNSA5IDIwIDIyIiwidmFyIGlzVk5vZGUgPSByZXF1aXJlKFwiLi9pcy12bm9kZVwiKVxudmFyIGlzVlRleHQgPSByZXF1aXJlKFwiLi9pcy12dGV4dFwiKVxudmFyIGlzV2lkZ2V0ID0gcmVxdWlyZShcIi4vaXMtd2lkZ2V0XCIpXG52YXIgaXNUaHVuayA9IHJlcXVpcmUoXCIuL2lzLXRodW5rXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gaGFuZGxlVGh1bmtcblxuZnVuY3Rpb24gaGFuZGxlVGh1bmsoYSwgYikge1xuICAgIHZhciByZW5kZXJlZEEgPSBhXG4gICAgdmFyIHJlbmRlcmVkQiA9IGJcblxuICAgIGlmIChpc1RodW5rKGIpKSB7XG4gICAgICAgIHJlbmRlcmVkQiA9IHJlbmRlclRodW5rKGIsIGEpXG4gICAgfVxuXG4gICAgaWYgKGlzVGh1bmsoYSkpIHtcbiAgICAgICAgcmVuZGVyZWRBID0gcmVuZGVyVGh1bmsoYSwgbnVsbClcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhOiByZW5kZXJlZEEsXG4gICAgICAgIGI6IHJlbmRlcmVkQlxuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVuZGVyVGh1bmsodGh1bmssIHByZXZpb3VzKSB7XG4gICAgdmFyIHJlbmRlcmVkVGh1bmsgPSB0aHVuay52bm9kZVxuXG4gICAgaWYgKCFyZW5kZXJlZFRodW5rKSB7XG4gICAgICAgIHJlbmRlcmVkVGh1bmsgPSB0aHVuay52bm9kZSA9IHRodW5rLnJlbmRlcihwcmV2aW91cylcbiAgICB9XG5cbiAgICBpZiAoIShpc1ZOb2RlKHJlbmRlcmVkVGh1bmspIHx8XG4gICAgICAgICAgICBpc1ZUZXh0KHJlbmRlcmVkVGh1bmspIHx8XG4gICAgICAgICAgICBpc1dpZGdldChyZW5kZXJlZFRodW5rKSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidGh1bmsgZGlkIG5vdCByZXR1cm4gYSB2YWxpZCBub2RlXCIpO1xuICAgIH1cblxuICAgIHJldHVybiByZW5kZXJlZFRodW5rXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92bm9kZS9oYW5kbGUtdGh1bmsuanNcbi8vIG1vZHVsZSBpZCA9IDE4N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIDQgNSA5IDIwIDIyIiwidmFyIHZlcnNpb24gPSByZXF1aXJlKFwiLi92ZXJzaW9uXCIpXG5cblZpcnR1YWxQYXRjaC5OT05FID0gMFxuVmlydHVhbFBhdGNoLlZURVhUID0gMVxuVmlydHVhbFBhdGNoLlZOT0RFID0gMlxuVmlydHVhbFBhdGNoLldJREdFVCA9IDNcblZpcnR1YWxQYXRjaC5QUk9QUyA9IDRcblZpcnR1YWxQYXRjaC5PUkRFUiA9IDVcblZpcnR1YWxQYXRjaC5JTlNFUlQgPSA2XG5WaXJ0dWFsUGF0Y2guUkVNT1ZFID0gN1xuVmlydHVhbFBhdGNoLlRIVU5LID0gOFxuXG5tb2R1bGUuZXhwb3J0cyA9IFZpcnR1YWxQYXRjaFxuXG5mdW5jdGlvbiBWaXJ0dWFsUGF0Y2godHlwZSwgdk5vZGUsIHBhdGNoKSB7XG4gICAgdGhpcy50eXBlID0gTnVtYmVyKHR5cGUpXG4gICAgdGhpcy52Tm9kZSA9IHZOb2RlXG4gICAgdGhpcy5wYXRjaCA9IHBhdGNoXG59XG5cblZpcnR1YWxQYXRjaC5wcm90b3R5cGUudmVyc2lvbiA9IHZlcnNpb25cblZpcnR1YWxQYXRjaC5wcm90b3R5cGUudHlwZSA9IFwiVmlydHVhbFBhdGNoXCJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3Zub2RlL3ZwYXRjaC5qc1xuLy8gbW9kdWxlIGlkID0gMTg4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNCA1IDkgMjAgMjIiLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc0FycmF5ID0gcmVxdWlyZSgneC1pcy1hcnJheScpO1xuXG52YXIgVk5vZGUgPSByZXF1aXJlKCcuLi92bm9kZS92bm9kZS5qcycpO1xudmFyIFZUZXh0ID0gcmVxdWlyZSgnLi4vdm5vZGUvdnRleHQuanMnKTtcbnZhciBpc1ZOb2RlID0gcmVxdWlyZSgnLi4vdm5vZGUvaXMtdm5vZGUnKTtcbnZhciBpc1ZUZXh0ID0gcmVxdWlyZSgnLi4vdm5vZGUvaXMtdnRleHQnKTtcbnZhciBpc1dpZGdldCA9IHJlcXVpcmUoJy4uL3Zub2RlL2lzLXdpZGdldCcpO1xudmFyIGlzSG9vayA9IHJlcXVpcmUoJy4uL3Zub2RlL2lzLXZob29rJyk7XG52YXIgaXNWVGh1bmsgPSByZXF1aXJlKCcuLi92bm9kZS9pcy10aHVuaycpO1xuXG52YXIgcGFyc2VUYWcgPSByZXF1aXJlKCcuL3BhcnNlLXRhZy5qcycpO1xudmFyIHNvZnRTZXRIb29rID0gcmVxdWlyZSgnLi9ob29rcy9zb2Z0LXNldC1ob29rLmpzJyk7XG52YXIgZXZIb29rID0gcmVxdWlyZSgnLi9ob29rcy9ldi1ob29rLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gaDtcblxuZnVuY3Rpb24gaCh0YWdOYW1lLCBwcm9wZXJ0aWVzLCBjaGlsZHJlbikge1xuICAgIHZhciBjaGlsZE5vZGVzID0gW107XG4gICAgdmFyIHRhZywgcHJvcHMsIGtleSwgbmFtZXNwYWNlO1xuXG4gICAgaWYgKCFjaGlsZHJlbiAmJiBpc0NoaWxkcmVuKHByb3BlcnRpZXMpKSB7XG4gICAgICAgIGNoaWxkcmVuID0gcHJvcGVydGllcztcbiAgICAgICAgcHJvcHMgPSB7fTtcbiAgICB9XG5cbiAgICBwcm9wcyA9IHByb3BzIHx8IHByb3BlcnRpZXMgfHwge307XG4gICAgdGFnID0gcGFyc2VUYWcodGFnTmFtZSwgcHJvcHMpO1xuXG4gICAgLy8gc3VwcG9ydCBrZXlzXG4gICAgaWYgKHByb3BzLmhhc093blByb3BlcnR5KCdrZXknKSkge1xuICAgICAgICBrZXkgPSBwcm9wcy5rZXk7XG4gICAgICAgIHByb3BzLmtleSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvLyBzdXBwb3J0IG5hbWVzcGFjZVxuICAgIGlmIChwcm9wcy5oYXNPd25Qcm9wZXJ0eSgnbmFtZXNwYWNlJykpIHtcbiAgICAgICAgbmFtZXNwYWNlID0gcHJvcHMubmFtZXNwYWNlO1xuICAgICAgICBwcm9wcy5uYW1lc3BhY2UgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLy8gZml4IGN1cnNvciBidWdcbiAgICBpZiAodGFnID09PSAnSU5QVVQnICYmXG4gICAgICAgICFuYW1lc3BhY2UgJiZcbiAgICAgICAgcHJvcHMuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykgJiZcbiAgICAgICAgcHJvcHMudmFsdWUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAhaXNIb29rKHByb3BzLnZhbHVlKVxuICAgICkge1xuICAgICAgICBwcm9wcy52YWx1ZSA9IHNvZnRTZXRIb29rKHByb3BzLnZhbHVlKTtcbiAgICB9XG5cbiAgICB0cmFuc2Zvcm1Qcm9wZXJ0aWVzKHByb3BzKTtcblxuICAgIGlmIChjaGlsZHJlbiAhPT0gdW5kZWZpbmVkICYmIGNoaWxkcmVuICE9PSBudWxsKSB7XG4gICAgICAgIGFkZENoaWxkKGNoaWxkcmVuLCBjaGlsZE5vZGVzLCB0YWcsIHByb3BzKTtcbiAgICB9XG5cblxuICAgIHJldHVybiBuZXcgVk5vZGUodGFnLCBwcm9wcywgY2hpbGROb2Rlcywga2V5LCBuYW1lc3BhY2UpO1xufVxuXG5mdW5jdGlvbiBhZGRDaGlsZChjLCBjaGlsZE5vZGVzLCB0YWcsIHByb3BzKSB7XG4gICAgaWYgKHR5cGVvZiBjID09PSAnc3RyaW5nJykge1xuICAgICAgICBjaGlsZE5vZGVzLnB1c2gobmV3IFZUZXh0KGMpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjID09PSAnbnVtYmVyJykge1xuICAgICAgICBjaGlsZE5vZGVzLnB1c2gobmV3IFZUZXh0KFN0cmluZyhjKSkpO1xuICAgIH0gZWxzZSBpZiAoaXNDaGlsZChjKSkge1xuICAgICAgICBjaGlsZE5vZGVzLnB1c2goYyk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KGMpKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYWRkQ2hpbGQoY1tpXSwgY2hpbGROb2RlcywgdGFnLCBwcm9wcyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGMgPT09IG51bGwgfHwgYyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBVbmV4cGVjdGVkVmlydHVhbEVsZW1lbnQoe1xuICAgICAgICAgICAgZm9yZWlnbk9iamVjdDogYyxcbiAgICAgICAgICAgIHBhcmVudFZub2RlOiB7XG4gICAgICAgICAgICAgICAgdGFnTmFtZTogdGFnLFxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHByb3BzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdHJhbnNmb3JtUHJvcGVydGllcyhwcm9wcykge1xuICAgIGZvciAodmFyIHByb3BOYW1lIGluIHByb3BzKSB7XG4gICAgICAgIGlmIChwcm9wcy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcblxuICAgICAgICAgICAgaWYgKGlzSG9vayh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHByb3BOYW1lLnN1YnN0cigwLCAzKSA9PT0gJ2V2LScpIHtcbiAgICAgICAgICAgICAgICAvLyBhZGQgZXYtZm9vIHN1cHBvcnRcbiAgICAgICAgICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBldkhvb2sodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0NoaWxkKHgpIHtcbiAgICByZXR1cm4gaXNWTm9kZSh4KSB8fCBpc1ZUZXh0KHgpIHx8IGlzV2lkZ2V0KHgpIHx8IGlzVlRodW5rKHgpO1xufVxuXG5mdW5jdGlvbiBpc0NoaWxkcmVuKHgpIHtcbiAgICByZXR1cm4gdHlwZW9mIHggPT09ICdzdHJpbmcnIHx8IGlzQXJyYXkoeCkgfHwgaXNDaGlsZCh4KTtcbn1cblxuZnVuY3Rpb24gVW5leHBlY3RlZFZpcnR1YWxFbGVtZW50KGRhdGEpIHtcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCk7XG5cbiAgICBlcnIudHlwZSA9ICd2aXJ0dWFsLWh5cGVyc2NyaXB0LnVuZXhwZWN0ZWQudmlydHVhbC1lbGVtZW50JztcbiAgICBlcnIubWVzc2FnZSA9ICdVbmV4cGVjdGVkIHZpcnR1YWwgY2hpbGQgcGFzc2VkIHRvIGgoKS5cXG4nICtcbiAgICAgICAgJ0V4cGVjdGVkIGEgVk5vZGUgLyBWdGh1bmsgLyBWV2lkZ2V0IC8gc3RyaW5nIGJ1dDpcXG4nICtcbiAgICAgICAgJ2dvdDpcXG4nICtcbiAgICAgICAgZXJyb3JTdHJpbmcoZGF0YS5mb3JlaWduT2JqZWN0KSArXG4gICAgICAgICcuXFxuJyArXG4gICAgICAgICdUaGUgcGFyZW50IHZub2RlIGlzOlxcbicgK1xuICAgICAgICBlcnJvclN0cmluZyhkYXRhLnBhcmVudFZub2RlKVxuICAgICAgICAnXFxuJyArXG4gICAgICAgICdTdWdnZXN0ZWQgZml4OiBjaGFuZ2UgeW91ciBgaCguLi4sIFsgLi4uIF0pYCBjYWxsc2l0ZS4nO1xuICAgIGVyci5mb3JlaWduT2JqZWN0ID0gZGF0YS5mb3JlaWduT2JqZWN0O1xuICAgIGVyci5wYXJlbnRWbm9kZSA9IGRhdGEucGFyZW50Vm5vZGU7XG5cbiAgICByZXR1cm4gZXJyO1xufVxuXG5mdW5jdGlvbiBlcnJvclN0cmluZyhvYmopIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqLCBudWxsLCAnICAgICcpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhvYmopO1xuICAgIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3ZpcnR1YWwtaHlwZXJzY3JpcHQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDIwNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIDQgNSA5IDIwIDIyIiwidmFyIHZlcnNpb24gPSByZXF1aXJlKFwiLi92ZXJzaW9uXCIpXG52YXIgaXNWTm9kZSA9IHJlcXVpcmUoXCIuL2lzLXZub2RlXCIpXG52YXIgaXNXaWRnZXQgPSByZXF1aXJlKFwiLi9pcy13aWRnZXRcIilcbnZhciBpc1RodW5rID0gcmVxdWlyZShcIi4vaXMtdGh1bmtcIilcbnZhciBpc1ZIb29rID0gcmVxdWlyZShcIi4vaXMtdmhvb2tcIilcblxubW9kdWxlLmV4cG9ydHMgPSBWaXJ0dWFsTm9kZVxuXG52YXIgbm9Qcm9wZXJ0aWVzID0ge31cbnZhciBub0NoaWxkcmVuID0gW11cblxuZnVuY3Rpb24gVmlydHVhbE5vZGUodGFnTmFtZSwgcHJvcGVydGllcywgY2hpbGRyZW4sIGtleSwgbmFtZXNwYWNlKSB7XG4gICAgdGhpcy50YWdOYW1lID0gdGFnTmFtZVxuICAgIHRoaXMucHJvcGVydGllcyA9IHByb3BlcnRpZXMgfHwgbm9Qcm9wZXJ0aWVzXG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuIHx8IG5vQ2hpbGRyZW5cbiAgICB0aGlzLmtleSA9IGtleSAhPSBudWxsID8gU3RyaW5nKGtleSkgOiB1bmRlZmluZWRcbiAgICB0aGlzLm5hbWVzcGFjZSA9ICh0eXBlb2YgbmFtZXNwYWNlID09PSBcInN0cmluZ1wiKSA/IG5hbWVzcGFjZSA6IG51bGxcblxuICAgIHZhciBjb3VudCA9IChjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGgpIHx8IDBcbiAgICB2YXIgZGVzY2VuZGFudHMgPSAwXG4gICAgdmFyIGhhc1dpZGdldHMgPSBmYWxzZVxuICAgIHZhciBoYXNUaHVua3MgPSBmYWxzZVxuICAgIHZhciBkZXNjZW5kYW50SG9va3MgPSBmYWxzZVxuICAgIHZhciBob29rc1xuXG4gICAgZm9yICh2YXIgcHJvcE5hbWUgaW4gcHJvcGVydGllcykge1xuICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgICAgICAgIHZhciBwcm9wZXJ0eSA9IHByb3BlcnRpZXNbcHJvcE5hbWVdXG4gICAgICAgICAgICBpZiAoaXNWSG9vayhwcm9wZXJ0eSkgJiYgcHJvcGVydHkudW5ob29rKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFob29rcykge1xuICAgICAgICAgICAgICAgICAgICBob29rcyA9IHt9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaG9va3NbcHJvcE5hbWVdID0gcHJvcGVydHlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXVxuICAgICAgICBpZiAoaXNWTm9kZShjaGlsZCkpIHtcbiAgICAgICAgICAgIGRlc2NlbmRhbnRzICs9IGNoaWxkLmNvdW50IHx8IDBcblxuICAgICAgICAgICAgaWYgKCFoYXNXaWRnZXRzICYmIGNoaWxkLmhhc1dpZGdldHMpIHtcbiAgICAgICAgICAgICAgICBoYXNXaWRnZXRzID0gdHJ1ZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWhhc1RodW5rcyAmJiBjaGlsZC5oYXNUaHVua3MpIHtcbiAgICAgICAgICAgICAgICBoYXNUaHVua3MgPSB0cnVlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZGVzY2VuZGFudEhvb2tzICYmIChjaGlsZC5ob29rcyB8fCBjaGlsZC5kZXNjZW5kYW50SG9va3MpKSB7XG4gICAgICAgICAgICAgICAgZGVzY2VuZGFudEhvb2tzID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCFoYXNXaWRnZXRzICYmIGlzV2lkZ2V0KGNoaWxkKSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGlsZC5kZXN0cm95ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICBoYXNXaWRnZXRzID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCFoYXNUaHVua3MgJiYgaXNUaHVuayhjaGlsZCkpIHtcbiAgICAgICAgICAgIGhhc1RodW5rcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmNvdW50ID0gY291bnQgKyBkZXNjZW5kYW50c1xuICAgIHRoaXMuaGFzV2lkZ2V0cyA9IGhhc1dpZGdldHNcbiAgICB0aGlzLmhhc1RodW5rcyA9IGhhc1RodW5rc1xuICAgIHRoaXMuaG9va3MgPSBob29rc1xuICAgIHRoaXMuZGVzY2VuZGFudEhvb2tzID0gZGVzY2VuZGFudEhvb2tzXG59XG5cblZpcnR1YWxOb2RlLnByb3RvdHlwZS52ZXJzaW9uID0gdmVyc2lvblxuVmlydHVhbE5vZGUucHJvdG90eXBlLnR5cGUgPSBcIlZpcnR1YWxOb2RlXCJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3Zub2RlL3Zub2RlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA0IDUgOSAyMCAyMiIsInZhciB2ZXJzaW9uID0gcmVxdWlyZShcIi4vdmVyc2lvblwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IFZpcnR1YWxUZXh0XG5cbmZ1bmN0aW9uIFZpcnR1YWxUZXh0KHRleHQpIHtcbiAgICB0aGlzLnRleHQgPSBTdHJpbmcodGV4dClcbn1cblxuVmlydHVhbFRleHQucHJvdG90eXBlLnZlcnNpb24gPSB2ZXJzaW9uXG5WaXJ0dWFsVGV4dC5wcm90b3R5cGUudHlwZSA9IFwiVmlydHVhbFRleHRcIlxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdmlydHVhbC1kb20vdm5vZGUvdnRleHQuanNcbi8vIG1vZHVsZSBpZCA9IDIwNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIDQgNSA5IDIwIDIyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3BsaXQgPSByZXF1aXJlKCdicm93c2VyLXNwbGl0Jyk7XG5cbnZhciBjbGFzc0lkU3BsaXQgPSAvKFtcXC4jXT9bYS16QS1aMC05XFx1MDA3Ri1cXHVGRkZGXzotXSspLztcbnZhciBub3RDbGFzc0lkID0gL15cXC58Iy87XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyc2VUYWc7XG5cbmZ1bmN0aW9uIHBhcnNlVGFnKHRhZywgcHJvcHMpIHtcbiAgICBpZiAoIXRhZykge1xuICAgICAgICByZXR1cm4gJ0RJVic7XG4gICAgfVxuXG4gICAgdmFyIG5vSWQgPSAhKHByb3BzLmhhc093blByb3BlcnR5KCdpZCcpKTtcblxuICAgIHZhciB0YWdQYXJ0cyA9IHNwbGl0KHRhZywgY2xhc3NJZFNwbGl0KTtcbiAgICB2YXIgdGFnTmFtZSA9IG51bGw7XG5cbiAgICBpZiAobm90Q2xhc3NJZC50ZXN0KHRhZ1BhcnRzWzFdKSkge1xuICAgICAgICB0YWdOYW1lID0gJ0RJVic7XG4gICAgfVxuXG4gICAgdmFyIGNsYXNzZXMsIHBhcnQsIHR5cGUsIGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgdGFnUGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGFydCA9IHRhZ1BhcnRzW2ldO1xuXG4gICAgICAgIGlmICghcGFydCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICB0eXBlID0gcGFydC5jaGFyQXQoMCk7XG5cbiAgICAgICAgaWYgKCF0YWdOYW1lKSB7XG4gICAgICAgICAgICB0YWdOYW1lID0gcGFydDtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnLicpIHtcbiAgICAgICAgICAgIGNsYXNzZXMgPSBjbGFzc2VzIHx8IFtdO1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKHBhcnQuc3Vic3RyaW5nKDEsIHBhcnQubGVuZ3RoKSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJyMnICYmIG5vSWQpIHtcbiAgICAgICAgICAgIHByb3BzLmlkID0gcGFydC5zdWJzdHJpbmcoMSwgcGFydC5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNsYXNzZXMpIHtcbiAgICAgICAgaWYgKHByb3BzLmNsYXNzTmFtZSkge1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKHByb3BzLmNsYXNzTmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBwcm9wcy5jbGFzc05hbWUgPSBjbGFzc2VzLmpvaW4oJyAnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvcHMubmFtZXNwYWNlID8gdGFnTmFtZSA6IHRhZ05hbWUudG9VcHBlckNhc2UoKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3ZpcnR1YWwtaHlwZXJzY3JpcHQvcGFyc2UtdGFnLmpzXG4vLyBtb2R1bGUgaWQgPSAyMDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA0IDUgOSAyMCAyMiIsIi8qIVxuICogQ3Jvc3MtQnJvd3NlciBTcGxpdCAxLjEuMVxuICogQ29weXJpZ2h0IDIwMDctMjAxMiBTdGV2ZW4gTGV2aXRoYW4gPHN0ZXZlbmxldml0aGFuLmNvbT5cbiAqIEF2YWlsYWJsZSB1bmRlciB0aGUgTUlUIExpY2Vuc2VcbiAqIEVDTUFTY3JpcHQgY29tcGxpYW50LCB1bmlmb3JtIGNyb3NzLWJyb3dzZXIgc3BsaXQgbWV0aG9kXG4gKi9cblxuLyoqXG4gKiBTcGxpdHMgYSBzdHJpbmcgaW50byBhbiBhcnJheSBvZiBzdHJpbmdzIHVzaW5nIGEgcmVnZXggb3Igc3RyaW5nIHNlcGFyYXRvci4gTWF0Y2hlcyBvZiB0aGVcbiAqIHNlcGFyYXRvciBhcmUgbm90IGluY2x1ZGVkIGluIHRoZSByZXN1bHQgYXJyYXkuIEhvd2V2ZXIsIGlmIGBzZXBhcmF0b3JgIGlzIGEgcmVnZXggdGhhdCBjb250YWluc1xuICogY2FwdHVyaW5nIGdyb3VwcywgYmFja3JlZmVyZW5jZXMgYXJlIHNwbGljZWQgaW50byB0aGUgcmVzdWx0IGVhY2ggdGltZSBgc2VwYXJhdG9yYCBpcyBtYXRjaGVkLlxuICogRml4ZXMgYnJvd3NlciBidWdzIGNvbXBhcmVkIHRvIHRoZSBuYXRpdmUgYFN0cmluZy5wcm90b3R5cGUuc3BsaXRgIGFuZCBjYW4gYmUgdXNlZCByZWxpYWJseVxuICogY3Jvc3MtYnJvd3Nlci5cbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgU3RyaW5nIHRvIHNwbGl0LlxuICogQHBhcmFtIHtSZWdFeHB8U3RyaW5nfSBzZXBhcmF0b3IgUmVnZXggb3Igc3RyaW5nIHRvIHVzZSBmb3Igc2VwYXJhdGluZyB0aGUgc3RyaW5nLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtsaW1pdF0gTWF4aW11bSBudW1iZXIgb2YgaXRlbXMgdG8gaW5jbHVkZSBpbiB0aGUgcmVzdWx0IGFycmF5LlxuICogQHJldHVybnMge0FycmF5fSBBcnJheSBvZiBzdWJzdHJpbmdzLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBCYXNpYyB1c2VcbiAqIHNwbGl0KCdhIGIgYyBkJywgJyAnKTtcbiAqIC8vIC0+IFsnYScsICdiJywgJ2MnLCAnZCddXG4gKlxuICogLy8gV2l0aCBsaW1pdFxuICogc3BsaXQoJ2EgYiBjIGQnLCAnICcsIDIpO1xuICogLy8gLT4gWydhJywgJ2InXVxuICpcbiAqIC8vIEJhY2tyZWZlcmVuY2VzIGluIHJlc3VsdCBhcnJheVxuICogc3BsaXQoJy4ud29yZDEgd29yZDIuLicsIC8oW2Etel0rKShcXGQrKS9pKTtcbiAqIC8vIC0+IFsnLi4nLCAnd29yZCcsICcxJywgJyAnLCAnd29yZCcsICcyJywgJy4uJ11cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gc3BsaXQodW5kZWYpIHtcblxuICB2YXIgbmF0aXZlU3BsaXQgPSBTdHJpbmcucHJvdG90eXBlLnNwbGl0LFxuICAgIGNvbXBsaWFudEV4ZWNOcGNnID0gLygpPz8vLmV4ZWMoXCJcIilbMV0gPT09IHVuZGVmLFxuICAgIC8vIE5QQ0c6IG5vbnBhcnRpY2lwYXRpbmcgY2FwdHVyaW5nIGdyb3VwXG4gICAgc2VsZjtcblxuICBzZWxmID0gZnVuY3Rpb24oc3RyLCBzZXBhcmF0b3IsIGxpbWl0KSB7XG4gICAgLy8gSWYgYHNlcGFyYXRvcmAgaXMgbm90IGEgcmVnZXgsIHVzZSBgbmF0aXZlU3BsaXRgXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzZXBhcmF0b3IpICE9PSBcIltvYmplY3QgUmVnRXhwXVwiKSB7XG4gICAgICByZXR1cm4gbmF0aXZlU3BsaXQuY2FsbChzdHIsIHNlcGFyYXRvciwgbGltaXQpO1xuICAgIH1cbiAgICB2YXIgb3V0cHV0ID0gW10sXG4gICAgICBmbGFncyA9IChzZXBhcmF0b3IuaWdub3JlQ2FzZSA/IFwiaVwiIDogXCJcIikgKyAoc2VwYXJhdG9yLm11bHRpbGluZSA/IFwibVwiIDogXCJcIikgKyAoc2VwYXJhdG9yLmV4dGVuZGVkID8gXCJ4XCIgOiBcIlwiKSArIC8vIFByb3Bvc2VkIGZvciBFUzZcbiAgICAgIChzZXBhcmF0b3Iuc3RpY2t5ID8gXCJ5XCIgOiBcIlwiKSxcbiAgICAgIC8vIEZpcmVmb3ggMytcbiAgICAgIGxhc3RMYXN0SW5kZXggPSAwLFxuICAgICAgLy8gTWFrZSBgZ2xvYmFsYCBhbmQgYXZvaWQgYGxhc3RJbmRleGAgaXNzdWVzIGJ5IHdvcmtpbmcgd2l0aCBhIGNvcHlcbiAgICAgIHNlcGFyYXRvciA9IG5ldyBSZWdFeHAoc2VwYXJhdG9yLnNvdXJjZSwgZmxhZ3MgKyBcImdcIiksXG4gICAgICBzZXBhcmF0b3IyLCBtYXRjaCwgbGFzdEluZGV4LCBsYXN0TGVuZ3RoO1xuICAgIHN0ciArPSBcIlwiOyAvLyBUeXBlLWNvbnZlcnRcbiAgICBpZiAoIWNvbXBsaWFudEV4ZWNOcGNnKSB7XG4gICAgICAvLyBEb2Vzbid0IG5lZWQgZmxhZ3MgZ3ksIGJ1dCB0aGV5IGRvbid0IGh1cnRcbiAgICAgIHNlcGFyYXRvcjIgPSBuZXcgUmVnRXhwKFwiXlwiICsgc2VwYXJhdG9yLnNvdXJjZSArIFwiJCg/IVxcXFxzKVwiLCBmbGFncyk7XG4gICAgfVxuICAgIC8qIFZhbHVlcyBmb3IgYGxpbWl0YCwgcGVyIHRoZSBzcGVjOlxuICAgICAqIElmIHVuZGVmaW5lZDogNDI5NDk2NzI5NSAvLyBNYXRoLnBvdygyLCAzMikgLSAxXG4gICAgICogSWYgMCwgSW5maW5pdHksIG9yIE5hTjogMFxuICAgICAqIElmIHBvc2l0aXZlIG51bWJlcjogbGltaXQgPSBNYXRoLmZsb29yKGxpbWl0KTsgaWYgKGxpbWl0ID4gNDI5NDk2NzI5NSkgbGltaXQgLT0gNDI5NDk2NzI5NjtcbiAgICAgKiBJZiBuZWdhdGl2ZSBudW1iZXI6IDQyOTQ5NjcyOTYgLSBNYXRoLmZsb29yKE1hdGguYWJzKGxpbWl0KSlcbiAgICAgKiBJZiBvdGhlcjogVHlwZS1jb252ZXJ0LCB0aGVuIHVzZSB0aGUgYWJvdmUgcnVsZXNcbiAgICAgKi9cbiAgICBsaW1pdCA9IGxpbWl0ID09PSB1bmRlZiA/IC0xID4+PiAwIDogLy8gTWF0aC5wb3coMiwgMzIpIC0gMVxuICAgIGxpbWl0ID4+PiAwOyAvLyBUb1VpbnQzMihsaW1pdClcbiAgICB3aGlsZSAobWF0Y2ggPSBzZXBhcmF0b3IuZXhlYyhzdHIpKSB7XG4gICAgICAvLyBgc2VwYXJhdG9yLmxhc3RJbmRleGAgaXMgbm90IHJlbGlhYmxlIGNyb3NzLWJyb3dzZXJcbiAgICAgIGxhc3RJbmRleCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgaWYgKGxhc3RJbmRleCA+IGxhc3RMYXN0SW5kZXgpIHtcbiAgICAgICAgb3V0cHV0LnB1c2goc3RyLnNsaWNlKGxhc3RMYXN0SW5kZXgsIG1hdGNoLmluZGV4KSk7XG4gICAgICAgIC8vIEZpeCBicm93c2VycyB3aG9zZSBgZXhlY2AgbWV0aG9kcyBkb24ndCBjb25zaXN0ZW50bHkgcmV0dXJuIGB1bmRlZmluZWRgIGZvclxuICAgICAgICAvLyBub25wYXJ0aWNpcGF0aW5nIGNhcHR1cmluZyBncm91cHNcbiAgICAgICAgaWYgKCFjb21wbGlhbnRFeGVjTnBjZyAmJiBtYXRjaC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgbWF0Y2hbMF0ucmVwbGFjZShzZXBhcmF0b3IyLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aCAtIDI7IGkrKykge1xuICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzW2ldID09PSB1bmRlZikge1xuICAgICAgICAgICAgICAgIG1hdGNoW2ldID0gdW5kZWY7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWF0Y2gubGVuZ3RoID4gMSAmJiBtYXRjaC5pbmRleCA8IHN0ci5sZW5ndGgpIHtcbiAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShvdXRwdXQsIG1hdGNoLnNsaWNlKDEpKTtcbiAgICAgICAgfVxuICAgICAgICBsYXN0TGVuZ3RoID0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICBsYXN0TGFzdEluZGV4ID0gbGFzdEluZGV4O1xuICAgICAgICBpZiAob3V0cHV0Lmxlbmd0aCA+PSBsaW1pdCkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc2VwYXJhdG9yLmxhc3RJbmRleCA9PT0gbWF0Y2guaW5kZXgpIHtcbiAgICAgICAgc2VwYXJhdG9yLmxhc3RJbmRleCsrOyAvLyBBdm9pZCBhbiBpbmZpbml0ZSBsb29wXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChsYXN0TGFzdEluZGV4ID09PSBzdHIubGVuZ3RoKSB7XG4gICAgICBpZiAobGFzdExlbmd0aCB8fCAhc2VwYXJhdG9yLnRlc3QoXCJcIikpIHtcbiAgICAgICAgb3V0cHV0LnB1c2goXCJcIik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dHB1dC5wdXNoKHN0ci5zbGljZShsYXN0TGFzdEluZGV4KSk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQubGVuZ3RoID4gbGltaXQgPyBvdXRwdXQuc2xpY2UoMCwgbGltaXQpIDogb3V0cHV0O1xuICB9O1xuXG4gIHJldHVybiBzZWxmO1xufSkoKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Jyb3dzZXItc3BsaXQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDIwOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIDQgNSA5IDIwIDIyIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNvZnRTZXRIb29rO1xuXG5mdW5jdGlvbiBTb2Z0U2V0SG9vayh2YWx1ZSkge1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBTb2Z0U2V0SG9vaykpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTb2Z0U2V0SG9vayh2YWx1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xufVxuXG5Tb2Z0U2V0SG9vay5wcm90b3R5cGUuaG9vayA9IGZ1bmN0aW9uIChub2RlLCBwcm9wZXJ0eU5hbWUpIHtcbiAgICBpZiAobm9kZVtwcm9wZXJ0eU5hbWVdICE9PSB0aGlzLnZhbHVlKSB7XG4gICAgICAgIG5vZGVbcHJvcGVydHlOYW1lXSA9IHRoaXMudmFsdWU7XG4gICAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3ZpcnR1YWwtaHlwZXJzY3JpcHQvaG9va3Mvc29mdC1zZXQtaG9vay5qc1xuLy8gbW9kdWxlIGlkID0gMjA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNCA1IDkgMjAgMjIiLCIndXNlIHN0cmljdCc7XG5cbnZhciBFdlN0b3JlID0gcmVxdWlyZSgnZXYtc3RvcmUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBFdkhvb2s7XG5cbmZ1bmN0aW9uIEV2SG9vayh2YWx1ZSkge1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBFdkhvb2spKSB7XG4gICAgICAgIHJldHVybiBuZXcgRXZIb29rKHZhbHVlKTtcbiAgICB9XG5cbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG59XG5cbkV2SG9vay5wcm90b3R5cGUuaG9vayA9IGZ1bmN0aW9uIChub2RlLCBwcm9wZXJ0eU5hbWUpIHtcbiAgICB2YXIgZXMgPSBFdlN0b3JlKG5vZGUpO1xuICAgIHZhciBwcm9wTmFtZSA9IHByb3BlcnR5TmFtZS5zdWJzdHIoMyk7XG5cbiAgICBlc1twcm9wTmFtZV0gPSB0aGlzLnZhbHVlO1xufTtcblxuRXZIb29rLnByb3RvdHlwZS51bmhvb2sgPSBmdW5jdGlvbihub2RlLCBwcm9wZXJ0eU5hbWUpIHtcbiAgICB2YXIgZXMgPSBFdlN0b3JlKG5vZGUpO1xuICAgIHZhciBwcm9wTmFtZSA9IHByb3BlcnR5TmFtZS5zdWJzdHIoMyk7XG5cbiAgICBlc1twcm9wTmFtZV0gPSB1bmRlZmluZWQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdmlydHVhbC1kb20vdmlydHVhbC1oeXBlcnNjcmlwdC9ob29rcy9ldi1ob29rLmpzXG4vLyBtb2R1bGUgaWQgPSAyMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA0IDUgOSAyMCAyMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIE9uZVZlcnNpb25Db25zdHJhaW50ID0gcmVxdWlyZSgnaW5kaXZpZHVhbC9vbmUtdmVyc2lvbicpO1xuXG52YXIgTVlfVkVSU0lPTiA9ICc3Jztcbk9uZVZlcnNpb25Db25zdHJhaW50KCdldi1zdG9yZScsIE1ZX1ZFUlNJT04pO1xuXG52YXIgaGFzaEtleSA9ICdfX0VWX1NUT1JFX0tFWUAnICsgTVlfVkVSU0lPTjtcblxubW9kdWxlLmV4cG9ydHMgPSBFdlN0b3JlO1xuXG5mdW5jdGlvbiBFdlN0b3JlKGVsZW0pIHtcbiAgICB2YXIgaGFzaCA9IGVsZW1baGFzaEtleV07XG5cbiAgICBpZiAoIWhhc2gpIHtcbiAgICAgICAgaGFzaCA9IGVsZW1baGFzaEtleV0gPSB7fTtcbiAgICB9XG5cbiAgICByZXR1cm4gaGFzaDtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2V2LXN0b3JlL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAyMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA0IDUgOSAyMCAyMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEluZGl2aWR1YWwgPSByZXF1aXJlKCcuL2luZGV4LmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT25lVmVyc2lvbjtcblxuZnVuY3Rpb24gT25lVmVyc2lvbihtb2R1bGVOYW1lLCB2ZXJzaW9uLCBkZWZhdWx0VmFsdWUpIHtcbiAgICB2YXIga2V5ID0gJ19fSU5ESVZJRFVBTF9PTkVfVkVSU0lPTl8nICsgbW9kdWxlTmFtZTtcbiAgICB2YXIgZW5mb3JjZUtleSA9IGtleSArICdfRU5GT1JDRV9TSU5HTEVUT04nO1xuXG4gICAgdmFyIHZlcnNpb25WYWx1ZSA9IEluZGl2aWR1YWwoZW5mb3JjZUtleSwgdmVyc2lvbik7XG5cbiAgICBpZiAodmVyc2lvblZhbHVlICE9PSB2ZXJzaW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2FuIG9ubHkgaGF2ZSBvbmUgY29weSBvZiAnICtcbiAgICAgICAgICAgIG1vZHVsZU5hbWUgKyAnLlxcbicgK1xuICAgICAgICAgICAgJ1lvdSBhbHJlYWR5IGhhdmUgdmVyc2lvbiAnICsgdmVyc2lvblZhbHVlICtcbiAgICAgICAgICAgICcgaW5zdGFsbGVkLlxcbicgK1xuICAgICAgICAgICAgJ1RoaXMgbWVhbnMgeW91IGNhbm5vdCBpbnN0YWxsIHZlcnNpb24gJyArIHZlcnNpb24pO1xuICAgIH1cblxuICAgIHJldHVybiBJbmRpdmlkdWFsKGtleSwgZGVmYXVsdFZhbHVlKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2luZGl2aWR1YWwvb25lLXZlcnNpb24uanNcbi8vIG1vZHVsZSBpZCA9IDIxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIDQgNSA5IDIwIDIyIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKmdsb2JhbCB3aW5kb3csIGdsb2JhbCovXG5cbnZhciByb290ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgP1xuICAgIHdpbmRvdyA6IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID9cbiAgICBnbG9iYWwgOiB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbmRpdmlkdWFsO1xuXG5mdW5jdGlvbiBJbmRpdmlkdWFsKGtleSwgdmFsdWUpIHtcbiAgICBpZiAoa2V5IGluIHJvb3QpIHtcbiAgICAgICAgcmV0dXJuIHJvb3Rba2V5XTtcbiAgICB9XG5cbiAgICByb290W2tleV0gPSB2YWx1ZTtcblxuICAgIHJldHVybiB2YWx1ZTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2luZGl2aWR1YWwvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDIxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIDQgNSA5IDIwIDIyIiwidmFyIGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKFwiLi92ZG9tL2NyZWF0ZS1lbGVtZW50LmpzXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlRWxlbWVudFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdmlydHVhbC1kb20vY3JlYXRlLWVsZW1lbnQuanNcbi8vIG1vZHVsZSBpZCA9IDIxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIDQgNSA5IDIwIDIyIiwiLyogKGlnbm9yZWQpICovXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gbWluLWRvY3VtZW50IChpZ25vcmVkKVxuLy8gbW9kdWxlIGlkID0gMjE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNCA1IDkgMjAgMjIiLCJ2YXIgcGF0Y2ggPSByZXF1aXJlKFwiLi92ZG9tL3BhdGNoLmpzXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gcGF0Y2hcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3BhdGNoLmpzXG4vLyBtb2R1bGUgaWQgPSAyMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA0IDUgOSAyMCAyMiIsInZhciBkb2N1bWVudCA9IHJlcXVpcmUoXCJnbG9iYWwvZG9jdW1lbnRcIilcbnZhciBpc0FycmF5ID0gcmVxdWlyZShcIngtaXMtYXJyYXlcIilcblxudmFyIHJlbmRlciA9IHJlcXVpcmUoXCIuL2NyZWF0ZS1lbGVtZW50XCIpXG52YXIgZG9tSW5kZXggPSByZXF1aXJlKFwiLi9kb20taW5kZXhcIilcbnZhciBwYXRjaE9wID0gcmVxdWlyZShcIi4vcGF0Y2gtb3BcIilcbm1vZHVsZS5leHBvcnRzID0gcGF0Y2hcblxuZnVuY3Rpb24gcGF0Y2gocm9vdE5vZGUsIHBhdGNoZXMsIHJlbmRlck9wdGlvbnMpIHtcbiAgICByZW5kZXJPcHRpb25zID0gcmVuZGVyT3B0aW9ucyB8fCB7fVxuICAgIHJlbmRlck9wdGlvbnMucGF0Y2ggPSByZW5kZXJPcHRpb25zLnBhdGNoICYmIHJlbmRlck9wdGlvbnMucGF0Y2ggIT09IHBhdGNoXG4gICAgICAgID8gcmVuZGVyT3B0aW9ucy5wYXRjaFxuICAgICAgICA6IHBhdGNoUmVjdXJzaXZlXG4gICAgcmVuZGVyT3B0aW9ucy5yZW5kZXIgPSByZW5kZXJPcHRpb25zLnJlbmRlciB8fCByZW5kZXJcblxuICAgIHJldHVybiByZW5kZXJPcHRpb25zLnBhdGNoKHJvb3ROb2RlLCBwYXRjaGVzLCByZW5kZXJPcHRpb25zKVxufVxuXG5mdW5jdGlvbiBwYXRjaFJlY3Vyc2l2ZShyb290Tm9kZSwgcGF0Y2hlcywgcmVuZGVyT3B0aW9ucykge1xuICAgIHZhciBpbmRpY2VzID0gcGF0Y2hJbmRpY2VzKHBhdGNoZXMpXG5cbiAgICBpZiAoaW5kaWNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHJvb3ROb2RlXG4gICAgfVxuXG4gICAgdmFyIGluZGV4ID0gZG9tSW5kZXgocm9vdE5vZGUsIHBhdGNoZXMuYSwgaW5kaWNlcylcbiAgICB2YXIgb3duZXJEb2N1bWVudCA9IHJvb3ROb2RlLm93bmVyRG9jdW1lbnRcblxuICAgIGlmICghcmVuZGVyT3B0aW9ucy5kb2N1bWVudCAmJiBvd25lckRvY3VtZW50ICE9PSBkb2N1bWVudCkge1xuICAgICAgICByZW5kZXJPcHRpb25zLmRvY3VtZW50ID0gb3duZXJEb2N1bWVudFxuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kaWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgbm9kZUluZGV4ID0gaW5kaWNlc1tpXVxuICAgICAgICByb290Tm9kZSA9IGFwcGx5UGF0Y2gocm9vdE5vZGUsXG4gICAgICAgICAgICBpbmRleFtub2RlSW5kZXhdLFxuICAgICAgICAgICAgcGF0Y2hlc1tub2RlSW5kZXhdLFxuICAgICAgICAgICAgcmVuZGVyT3B0aW9ucylcbiAgICB9XG5cbiAgICByZXR1cm4gcm9vdE5vZGVcbn1cblxuZnVuY3Rpb24gYXBwbHlQYXRjaChyb290Tm9kZSwgZG9tTm9kZSwgcGF0Y2hMaXN0LCByZW5kZXJPcHRpb25zKSB7XG4gICAgaWYgKCFkb21Ob2RlKSB7XG4gICAgICAgIHJldHVybiByb290Tm9kZVxuICAgIH1cblxuICAgIHZhciBuZXdOb2RlXG5cbiAgICBpZiAoaXNBcnJheShwYXRjaExpc3QpKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0Y2hMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBuZXdOb2RlID0gcGF0Y2hPcChwYXRjaExpc3RbaV0sIGRvbU5vZGUsIHJlbmRlck9wdGlvbnMpXG5cbiAgICAgICAgICAgIGlmIChkb21Ob2RlID09PSByb290Tm9kZSkge1xuICAgICAgICAgICAgICAgIHJvb3ROb2RlID0gbmV3Tm9kZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbmV3Tm9kZSA9IHBhdGNoT3AocGF0Y2hMaXN0LCBkb21Ob2RlLCByZW5kZXJPcHRpb25zKVxuXG4gICAgICAgIGlmIChkb21Ob2RlID09PSByb290Tm9kZSkge1xuICAgICAgICAgICAgcm9vdE5vZGUgPSBuZXdOb2RlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcm9vdE5vZGVcbn1cblxuZnVuY3Rpb24gcGF0Y2hJbmRpY2VzKHBhdGNoZXMpIHtcbiAgICB2YXIgaW5kaWNlcyA9IFtdXG5cbiAgICBmb3IgKHZhciBrZXkgaW4gcGF0Y2hlcykge1xuICAgICAgICBpZiAoa2V5ICE9PSBcImFcIikge1xuICAgICAgICAgICAgaW5kaWNlcy5wdXNoKE51bWJlcihrZXkpKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGluZGljZXNcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3Zkb20vcGF0Y2guanNcbi8vIG1vZHVsZSBpZCA9IDIxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIDQgNSA5IDIwIDIyIiwiLy8gTWFwcyBhIHZpcnR1YWwgRE9NIHRyZWUgb250byBhIHJlYWwgRE9NIHRyZWUgaW4gYW4gZWZmaWNpZW50IG1hbm5lci5cbi8vIFdlIGRvbid0IHdhbnQgdG8gcmVhZCBhbGwgb2YgdGhlIERPTSBub2RlcyBpbiB0aGUgdHJlZSBzbyB3ZSB1c2Vcbi8vIHRoZSBpbi1vcmRlciB0cmVlIGluZGV4aW5nIHRvIGVsaW1pbmF0ZSByZWN1cnNpb24gZG93biBjZXJ0YWluIGJyYW5jaGVzLlxuLy8gV2Ugb25seSByZWN1cnNlIGludG8gYSBET00gbm9kZSBpZiB3ZSBrbm93IHRoYXQgaXQgY29udGFpbnMgYSBjaGlsZCBvZlxuLy8gaW50ZXJlc3QuXG5cbnZhciBub0NoaWxkID0ge31cblxubW9kdWxlLmV4cG9ydHMgPSBkb21JbmRleFxuXG5mdW5jdGlvbiBkb21JbmRleChyb290Tm9kZSwgdHJlZSwgaW5kaWNlcywgbm9kZXMpIHtcbiAgICBpZiAoIWluZGljZXMgfHwgaW5kaWNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHt9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaW5kaWNlcy5zb3J0KGFzY2VuZGluZylcbiAgICAgICAgcmV0dXJuIHJlY3Vyc2Uocm9vdE5vZGUsIHRyZWUsIGluZGljZXMsIG5vZGVzLCAwKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVjdXJzZShyb290Tm9kZSwgdHJlZSwgaW5kaWNlcywgbm9kZXMsIHJvb3RJbmRleCkge1xuICAgIG5vZGVzID0gbm9kZXMgfHwge31cblxuXG4gICAgaWYgKHJvb3ROb2RlKSB7XG4gICAgICAgIGlmIChpbmRleEluUmFuZ2UoaW5kaWNlcywgcm9vdEluZGV4LCByb290SW5kZXgpKSB7XG4gICAgICAgICAgICBub2Rlc1tyb290SW5kZXhdID0gcm9vdE5vZGVcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB2Q2hpbGRyZW4gPSB0cmVlLmNoaWxkcmVuXG5cbiAgICAgICAgaWYgKHZDaGlsZHJlbikge1xuXG4gICAgICAgICAgICB2YXIgY2hpbGROb2RlcyA9IHJvb3ROb2RlLmNoaWxkTm9kZXNcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmVlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcm9vdEluZGV4ICs9IDFcblxuICAgICAgICAgICAgICAgIHZhciB2Q2hpbGQgPSB2Q2hpbGRyZW5baV0gfHwgbm9DaGlsZFxuICAgICAgICAgICAgICAgIHZhciBuZXh0SW5kZXggPSByb290SW5kZXggKyAodkNoaWxkLmNvdW50IHx8IDApXG5cbiAgICAgICAgICAgICAgICAvLyBza2lwIHJlY3Vyc2lvbiBkb3duIHRoZSB0cmVlIGlmIHRoZXJlIGFyZSBubyBub2RlcyBkb3duIGhlcmVcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXhJblJhbmdlKGluZGljZXMsIHJvb3RJbmRleCwgbmV4dEluZGV4KSkge1xuICAgICAgICAgICAgICAgICAgICByZWN1cnNlKGNoaWxkTm9kZXNbaV0sIHZDaGlsZCwgaW5kaWNlcywgbm9kZXMsIHJvb3RJbmRleClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByb290SW5kZXggPSBuZXh0SW5kZXhcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBub2Rlc1xufVxuXG4vLyBCaW5hcnkgc2VhcmNoIGZvciBhbiBpbmRleCBpbiB0aGUgaW50ZXJ2YWwgW2xlZnQsIHJpZ2h0XVxuZnVuY3Rpb24gaW5kZXhJblJhbmdlKGluZGljZXMsIGxlZnQsIHJpZ2h0KSB7XG4gICAgaWYgKGluZGljZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHZhciBtaW5JbmRleCA9IDBcbiAgICB2YXIgbWF4SW5kZXggPSBpbmRpY2VzLmxlbmd0aCAtIDFcbiAgICB2YXIgY3VycmVudEluZGV4XG4gICAgdmFyIGN1cnJlbnRJdGVtXG5cbiAgICB3aGlsZSAobWluSW5kZXggPD0gbWF4SW5kZXgpIHtcbiAgICAgICAgY3VycmVudEluZGV4ID0gKChtYXhJbmRleCArIG1pbkluZGV4KSAvIDIpID4+IDBcbiAgICAgICAgY3VycmVudEl0ZW0gPSBpbmRpY2VzW2N1cnJlbnRJbmRleF1cblxuICAgICAgICBpZiAobWluSW5kZXggPT09IG1heEluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudEl0ZW0gPj0gbGVmdCAmJiBjdXJyZW50SXRlbSA8PSByaWdodFxuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRJdGVtIDwgbGVmdCkge1xuICAgICAgICAgICAgbWluSW5kZXggPSBjdXJyZW50SW5kZXggKyAxXG4gICAgICAgIH0gZWxzZSAgaWYgKGN1cnJlbnRJdGVtID4gcmlnaHQpIHtcbiAgICAgICAgICAgIG1heEluZGV4ID0gY3VycmVudEluZGV4IC0gMVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gYXNjZW5kaW5nKGEsIGIpIHtcbiAgICByZXR1cm4gYSA+IGIgPyAxIDogLTFcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3Zkb20vZG9tLWluZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAyMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA0IDUgOSAyMCAyMiIsInZhciBhcHBseVByb3BlcnRpZXMgPSByZXF1aXJlKFwiLi9hcHBseS1wcm9wZXJ0aWVzXCIpXG5cbnZhciBpc1dpZGdldCA9IHJlcXVpcmUoXCIuLi92bm9kZS9pcy13aWRnZXQuanNcIilcbnZhciBWUGF0Y2ggPSByZXF1aXJlKFwiLi4vdm5vZGUvdnBhdGNoLmpzXCIpXG5cbnZhciB1cGRhdGVXaWRnZXQgPSByZXF1aXJlKFwiLi91cGRhdGUtd2lkZ2V0XCIpXG5cbm1vZHVsZS5leHBvcnRzID0gYXBwbHlQYXRjaFxuXG5mdW5jdGlvbiBhcHBseVBhdGNoKHZwYXRjaCwgZG9tTm9kZSwgcmVuZGVyT3B0aW9ucykge1xuICAgIHZhciB0eXBlID0gdnBhdGNoLnR5cGVcbiAgICB2YXIgdk5vZGUgPSB2cGF0Y2gudk5vZGVcbiAgICB2YXIgcGF0Y2ggPSB2cGF0Y2gucGF0Y2hcblxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFZQYXRjaC5SRU1PVkU6XG4gICAgICAgICAgICByZXR1cm4gcmVtb3ZlTm9kZShkb21Ob2RlLCB2Tm9kZSlcbiAgICAgICAgY2FzZSBWUGF0Y2guSU5TRVJUOlxuICAgICAgICAgICAgcmV0dXJuIGluc2VydE5vZGUoZG9tTm9kZSwgcGF0Y2gsIHJlbmRlck9wdGlvbnMpXG4gICAgICAgIGNhc2UgVlBhdGNoLlZURVhUOlxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZ1BhdGNoKGRvbU5vZGUsIHZOb2RlLCBwYXRjaCwgcmVuZGVyT3B0aW9ucylcbiAgICAgICAgY2FzZSBWUGF0Y2guV0lER0VUOlxuICAgICAgICAgICAgcmV0dXJuIHdpZGdldFBhdGNoKGRvbU5vZGUsIHZOb2RlLCBwYXRjaCwgcmVuZGVyT3B0aW9ucylcbiAgICAgICAgY2FzZSBWUGF0Y2guVk5PREU6XG4gICAgICAgICAgICByZXR1cm4gdk5vZGVQYXRjaChkb21Ob2RlLCB2Tm9kZSwgcGF0Y2gsIHJlbmRlck9wdGlvbnMpXG4gICAgICAgIGNhc2UgVlBhdGNoLk9SREVSOlxuICAgICAgICAgICAgcmVvcmRlckNoaWxkcmVuKGRvbU5vZGUsIHBhdGNoKVxuICAgICAgICAgICAgcmV0dXJuIGRvbU5vZGVcbiAgICAgICAgY2FzZSBWUGF0Y2guUFJPUFM6XG4gICAgICAgICAgICBhcHBseVByb3BlcnRpZXMoZG9tTm9kZSwgcGF0Y2gsIHZOb2RlLnByb3BlcnRpZXMpXG4gICAgICAgICAgICByZXR1cm4gZG9tTm9kZVxuICAgICAgICBjYXNlIFZQYXRjaC5USFVOSzpcbiAgICAgICAgICAgIHJldHVybiByZXBsYWNlUm9vdChkb21Ob2RlLFxuICAgICAgICAgICAgICAgIHJlbmRlck9wdGlvbnMucGF0Y2goZG9tTm9kZSwgcGF0Y2gsIHJlbmRlck9wdGlvbnMpKVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIGRvbU5vZGVcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZU5vZGUoZG9tTm9kZSwgdk5vZGUpIHtcbiAgICB2YXIgcGFyZW50Tm9kZSA9IGRvbU5vZGUucGFyZW50Tm9kZVxuXG4gICAgaWYgKHBhcmVudE5vZGUpIHtcbiAgICAgICAgcGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkb21Ob2RlKVxuICAgIH1cblxuICAgIGRlc3Ryb3lXaWRnZXQoZG9tTm9kZSwgdk5vZGUpO1xuXG4gICAgcmV0dXJuIG51bGxcbn1cblxuZnVuY3Rpb24gaW5zZXJ0Tm9kZShwYXJlbnROb2RlLCB2Tm9kZSwgcmVuZGVyT3B0aW9ucykge1xuICAgIHZhciBuZXdOb2RlID0gcmVuZGVyT3B0aW9ucy5yZW5kZXIodk5vZGUsIHJlbmRlck9wdGlvbnMpXG5cbiAgICBpZiAocGFyZW50Tm9kZSkge1xuICAgICAgICBwYXJlbnROb2RlLmFwcGVuZENoaWxkKG5ld05vZGUpXG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmVudE5vZGVcbn1cblxuZnVuY3Rpb24gc3RyaW5nUGF0Y2goZG9tTm9kZSwgbGVmdFZOb2RlLCB2VGV4dCwgcmVuZGVyT3B0aW9ucykge1xuICAgIHZhciBuZXdOb2RlXG5cbiAgICBpZiAoZG9tTm9kZS5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgICBkb21Ob2RlLnJlcGxhY2VEYXRhKDAsIGRvbU5vZGUubGVuZ3RoLCB2VGV4dC50ZXh0KVxuICAgICAgICBuZXdOb2RlID0gZG9tTm9kZVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBwYXJlbnROb2RlID0gZG9tTm9kZS5wYXJlbnROb2RlXG4gICAgICAgIG5ld05vZGUgPSByZW5kZXJPcHRpb25zLnJlbmRlcih2VGV4dCwgcmVuZGVyT3B0aW9ucylcblxuICAgICAgICBpZiAocGFyZW50Tm9kZSAmJiBuZXdOb2RlICE9PSBkb21Ob2RlKSB7XG4gICAgICAgICAgICBwYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdOb2RlLCBkb21Ob2RlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld05vZGVcbn1cblxuZnVuY3Rpb24gd2lkZ2V0UGF0Y2goZG9tTm9kZSwgbGVmdFZOb2RlLCB3aWRnZXQsIHJlbmRlck9wdGlvbnMpIHtcbiAgICB2YXIgdXBkYXRpbmcgPSB1cGRhdGVXaWRnZXQobGVmdFZOb2RlLCB3aWRnZXQpXG4gICAgdmFyIG5ld05vZGVcblxuICAgIGlmICh1cGRhdGluZykge1xuICAgICAgICBuZXdOb2RlID0gd2lkZ2V0LnVwZGF0ZShsZWZ0Vk5vZGUsIGRvbU5vZGUpIHx8IGRvbU5vZGVcbiAgICB9IGVsc2Uge1xuICAgICAgICBuZXdOb2RlID0gcmVuZGVyT3B0aW9ucy5yZW5kZXIod2lkZ2V0LCByZW5kZXJPcHRpb25zKVxuICAgIH1cblxuICAgIHZhciBwYXJlbnROb2RlID0gZG9tTm9kZS5wYXJlbnROb2RlXG5cbiAgICBpZiAocGFyZW50Tm9kZSAmJiBuZXdOb2RlICE9PSBkb21Ob2RlKSB7XG4gICAgICAgIHBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld05vZGUsIGRvbU5vZGUpXG4gICAgfVxuXG4gICAgaWYgKCF1cGRhdGluZykge1xuICAgICAgICBkZXN0cm95V2lkZ2V0KGRvbU5vZGUsIGxlZnRWTm9kZSlcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3Tm9kZVxufVxuXG5mdW5jdGlvbiB2Tm9kZVBhdGNoKGRvbU5vZGUsIGxlZnRWTm9kZSwgdk5vZGUsIHJlbmRlck9wdGlvbnMpIHtcbiAgICB2YXIgcGFyZW50Tm9kZSA9IGRvbU5vZGUucGFyZW50Tm9kZVxuICAgIHZhciBuZXdOb2RlID0gcmVuZGVyT3B0aW9ucy5yZW5kZXIodk5vZGUsIHJlbmRlck9wdGlvbnMpXG5cbiAgICBpZiAocGFyZW50Tm9kZSAmJiBuZXdOb2RlICE9PSBkb21Ob2RlKSB7XG4gICAgICAgIHBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld05vZGUsIGRvbU5vZGUpXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld05vZGVcbn1cblxuZnVuY3Rpb24gZGVzdHJveVdpZGdldChkb21Ob2RlLCB3KSB7XG4gICAgaWYgKHR5cGVvZiB3LmRlc3Ryb3kgPT09IFwiZnVuY3Rpb25cIiAmJiBpc1dpZGdldCh3KSkge1xuICAgICAgICB3LmRlc3Ryb3koZG9tTm9kZSlcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlb3JkZXJDaGlsZHJlbihkb21Ob2RlLCBtb3Zlcykge1xuICAgIHZhciBjaGlsZE5vZGVzID0gZG9tTm9kZS5jaGlsZE5vZGVzXG4gICAgdmFyIGtleU1hcCA9IHt9XG4gICAgdmFyIG5vZGVcbiAgICB2YXIgcmVtb3ZlXG4gICAgdmFyIGluc2VydFxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtb3Zlcy5yZW1vdmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlbW92ZSA9IG1vdmVzLnJlbW92ZXNbaV1cbiAgICAgICAgbm9kZSA9IGNoaWxkTm9kZXNbcmVtb3ZlLmZyb21dXG4gICAgICAgIGlmIChyZW1vdmUua2V5KSB7XG4gICAgICAgICAgICBrZXlNYXBbcmVtb3ZlLmtleV0gPSBub2RlXG4gICAgICAgIH1cbiAgICAgICAgZG9tTm9kZS5yZW1vdmVDaGlsZChub2RlKVxuICAgIH1cblxuICAgIHZhciBsZW5ndGggPSBjaGlsZE5vZGVzLmxlbmd0aFxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgbW92ZXMuaW5zZXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBpbnNlcnQgPSBtb3Zlcy5pbnNlcnRzW2pdXG4gICAgICAgIG5vZGUgPSBrZXlNYXBbaW5zZXJ0LmtleV1cbiAgICAgICAgLy8gdGhpcyBpcyB0aGUgd2VpcmRlc3QgYnVnIGkndmUgZXZlciBzZWVuIGluIHdlYmtpdFxuICAgICAgICBkb21Ob2RlLmluc2VydEJlZm9yZShub2RlLCBpbnNlcnQudG8gPj0gbGVuZ3RoKysgPyBudWxsIDogY2hpbGROb2Rlc1tpbnNlcnQudG9dKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVwbGFjZVJvb3Qob2xkUm9vdCwgbmV3Um9vdCkge1xuICAgIGlmIChvbGRSb290ICYmIG5ld1Jvb3QgJiYgb2xkUm9vdCAhPT0gbmV3Um9vdCAmJiBvbGRSb290LnBhcmVudE5vZGUpIHtcbiAgICAgICAgb2xkUm9vdC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdSb290LCBvbGRSb290KVxuICAgIH1cblxuICAgIHJldHVybiBuZXdSb290O1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdmlydHVhbC1kb20vdmRvbS9wYXRjaC1vcC5qc1xuLy8gbW9kdWxlIGlkID0gMjE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNCA1IDkgMjAgMjIiLCJ2YXIgaXNXaWRnZXQgPSByZXF1aXJlKFwiLi4vdm5vZGUvaXMtd2lkZ2V0LmpzXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gdXBkYXRlV2lkZ2V0XG5cbmZ1bmN0aW9uIHVwZGF0ZVdpZGdldChhLCBiKSB7XG4gICAgaWYgKGlzV2lkZ2V0KGEpICYmIGlzV2lkZ2V0KGIpKSB7XG4gICAgICAgIGlmIChcIm5hbWVcIiBpbiBhICYmIFwibmFtZVwiIGluIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBhLmlkID09PSBiLmlkXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYS5pbml0ID09PSBiLmluaXRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdmlydHVhbC1kb20vdmRvbS91cGRhdGUtd2lkZ2V0LmpzXG4vLyBtb2R1bGUgaWQgPSAyMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA0IDUgOSAyMCAyMiIsInZhciBkaWZmID0gcmVxdWlyZShcIi4vdnRyZWUvZGlmZi5qc1wiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpZmZcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL2RpZmYuanNcbi8vIG1vZHVsZSBpZCA9IDIyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIDQgNSA5IDIwIDIyIiwidmFyIGlzQXJyYXkgPSByZXF1aXJlKFwieC1pcy1hcnJheVwiKVxuXG52YXIgVlBhdGNoID0gcmVxdWlyZShcIi4uL3Zub2RlL3ZwYXRjaFwiKVxudmFyIGlzVk5vZGUgPSByZXF1aXJlKFwiLi4vdm5vZGUvaXMtdm5vZGVcIilcbnZhciBpc1ZUZXh0ID0gcmVxdWlyZShcIi4uL3Zub2RlL2lzLXZ0ZXh0XCIpXG52YXIgaXNXaWRnZXQgPSByZXF1aXJlKFwiLi4vdm5vZGUvaXMtd2lkZ2V0XCIpXG52YXIgaXNUaHVuayA9IHJlcXVpcmUoXCIuLi92bm9kZS9pcy10aHVua1wiKVxudmFyIGhhbmRsZVRodW5rID0gcmVxdWlyZShcIi4uL3Zub2RlL2hhbmRsZS10aHVua1wiKVxuXG52YXIgZGlmZlByb3BzID0gcmVxdWlyZShcIi4vZGlmZi1wcm9wc1wiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpZmZcblxuZnVuY3Rpb24gZGlmZihhLCBiKSB7XG4gICAgdmFyIHBhdGNoID0geyBhOiBhIH1cbiAgICB3YWxrKGEsIGIsIHBhdGNoLCAwKVxuICAgIHJldHVybiBwYXRjaFxufVxuXG5mdW5jdGlvbiB3YWxrKGEsIGIsIHBhdGNoLCBpbmRleCkge1xuICAgIGlmIChhID09PSBiKSB7XG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHZhciBhcHBseSA9IHBhdGNoW2luZGV4XVxuICAgIHZhciBhcHBseUNsZWFyID0gZmFsc2VcblxuICAgIGlmIChpc1RodW5rKGEpIHx8IGlzVGh1bmsoYikpIHtcbiAgICAgICAgdGh1bmtzKGEsIGIsIHBhdGNoLCBpbmRleClcbiAgICB9IGVsc2UgaWYgKGIgPT0gbnVsbCkge1xuXG4gICAgICAgIC8vIElmIGEgaXMgYSB3aWRnZXQgd2Ugd2lsbCBhZGQgYSByZW1vdmUgcGF0Y2ggZm9yIGl0XG4gICAgICAgIC8vIE90aGVyd2lzZSBhbnkgY2hpbGQgd2lkZ2V0cy9ob29rcyBtdXN0IGJlIGRlc3Ryb3llZC5cbiAgICAgICAgLy8gVGhpcyBwcmV2ZW50cyBhZGRpbmcgdHdvIHJlbW92ZSBwYXRjaGVzIGZvciBhIHdpZGdldC5cbiAgICAgICAgaWYgKCFpc1dpZGdldChhKSkge1xuICAgICAgICAgICAgY2xlYXJTdGF0ZShhLCBwYXRjaCwgaW5kZXgpXG4gICAgICAgICAgICBhcHBseSA9IHBhdGNoW2luZGV4XVxuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHkgPSBhcHBlbmRQYXRjaChhcHBseSwgbmV3IFZQYXRjaChWUGF0Y2guUkVNT1ZFLCBhLCBiKSlcbiAgICB9IGVsc2UgaWYgKGlzVk5vZGUoYikpIHtcbiAgICAgICAgaWYgKGlzVk5vZGUoYSkpIHtcbiAgICAgICAgICAgIGlmIChhLnRhZ05hbWUgPT09IGIudGFnTmFtZSAmJlxuICAgICAgICAgICAgICAgIGEubmFtZXNwYWNlID09PSBiLm5hbWVzcGFjZSAmJlxuICAgICAgICAgICAgICAgIGEua2V5ID09PSBiLmtleSkge1xuICAgICAgICAgICAgICAgIHZhciBwcm9wc1BhdGNoID0gZGlmZlByb3BzKGEucHJvcGVydGllcywgYi5wcm9wZXJ0aWVzKVxuICAgICAgICAgICAgICAgIGlmIChwcm9wc1BhdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGFwcGx5ID0gYXBwZW5kUGF0Y2goYXBwbHksXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgVlBhdGNoKFZQYXRjaC5QUk9QUywgYSwgcHJvcHNQYXRjaCkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFwcGx5ID0gZGlmZkNoaWxkcmVuKGEsIGIsIHBhdGNoLCBhcHBseSwgaW5kZXgpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFwcGx5ID0gYXBwZW5kUGF0Y2goYXBwbHksIG5ldyBWUGF0Y2goVlBhdGNoLlZOT0RFLCBhLCBiKSlcbiAgICAgICAgICAgICAgICBhcHBseUNsZWFyID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXBwbHkgPSBhcHBlbmRQYXRjaChhcHBseSwgbmV3IFZQYXRjaChWUGF0Y2guVk5PREUsIGEsIGIpKVxuICAgICAgICAgICAgYXBwbHlDbGVhciA9IHRydWVcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNWVGV4dChiKSkge1xuICAgICAgICBpZiAoIWlzVlRleHQoYSkpIHtcbiAgICAgICAgICAgIGFwcGx5ID0gYXBwZW5kUGF0Y2goYXBwbHksIG5ldyBWUGF0Y2goVlBhdGNoLlZURVhULCBhLCBiKSlcbiAgICAgICAgICAgIGFwcGx5Q2xlYXIgPSB0cnVlXG4gICAgICAgIH0gZWxzZSBpZiAoYS50ZXh0ICE9PSBiLnRleHQpIHtcbiAgICAgICAgICAgIGFwcGx5ID0gYXBwZW5kUGF0Y2goYXBwbHksIG5ldyBWUGF0Y2goVlBhdGNoLlZURVhULCBhLCBiKSlcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNXaWRnZXQoYikpIHtcbiAgICAgICAgaWYgKCFpc1dpZGdldChhKSkge1xuICAgICAgICAgICAgYXBwbHlDbGVhciA9IHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5ID0gYXBwZW5kUGF0Y2goYXBwbHksIG5ldyBWUGF0Y2goVlBhdGNoLldJREdFVCwgYSwgYikpXG4gICAgfVxuXG4gICAgaWYgKGFwcGx5KSB7XG4gICAgICAgIHBhdGNoW2luZGV4XSA9IGFwcGx5XG4gICAgfVxuXG4gICAgaWYgKGFwcGx5Q2xlYXIpIHtcbiAgICAgICAgY2xlYXJTdGF0ZShhLCBwYXRjaCwgaW5kZXgpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBkaWZmQ2hpbGRyZW4oYSwgYiwgcGF0Y2gsIGFwcGx5LCBpbmRleCkge1xuICAgIHZhciBhQ2hpbGRyZW4gPSBhLmNoaWxkcmVuXG4gICAgdmFyIG9yZGVyZWRTZXQgPSByZW9yZGVyKGFDaGlsZHJlbiwgYi5jaGlsZHJlbilcbiAgICB2YXIgYkNoaWxkcmVuID0gb3JkZXJlZFNldC5jaGlsZHJlblxuXG4gICAgdmFyIGFMZW4gPSBhQ2hpbGRyZW4ubGVuZ3RoXG4gICAgdmFyIGJMZW4gPSBiQ2hpbGRyZW4ubGVuZ3RoXG4gICAgdmFyIGxlbiA9IGFMZW4gPiBiTGVuID8gYUxlbiA6IGJMZW5cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIGxlZnROb2RlID0gYUNoaWxkcmVuW2ldXG4gICAgICAgIHZhciByaWdodE5vZGUgPSBiQ2hpbGRyZW5baV1cbiAgICAgICAgaW5kZXggKz0gMVxuXG4gICAgICAgIGlmICghbGVmdE5vZGUpIHtcbiAgICAgICAgICAgIGlmIChyaWdodE5vZGUpIHtcbiAgICAgICAgICAgICAgICAvLyBFeGNlc3Mgbm9kZXMgaW4gYiBuZWVkIHRvIGJlIGFkZGVkXG4gICAgICAgICAgICAgICAgYXBwbHkgPSBhcHBlbmRQYXRjaChhcHBseSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFZQYXRjaChWUGF0Y2guSU5TRVJULCBudWxsLCByaWdodE5vZGUpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2FsayhsZWZ0Tm9kZSwgcmlnaHROb2RlLCBwYXRjaCwgaW5kZXgpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNWTm9kZShsZWZ0Tm9kZSkgJiYgbGVmdE5vZGUuY291bnQpIHtcbiAgICAgICAgICAgIGluZGV4ICs9IGxlZnROb2RlLmNvdW50XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAob3JkZXJlZFNldC5tb3Zlcykge1xuICAgICAgICAvLyBSZW9yZGVyIG5vZGVzIGxhc3RcbiAgICAgICAgYXBwbHkgPSBhcHBlbmRQYXRjaChhcHBseSwgbmV3IFZQYXRjaChcbiAgICAgICAgICAgIFZQYXRjaC5PUkRFUixcbiAgICAgICAgICAgIGEsXG4gICAgICAgICAgICBvcmRlcmVkU2V0Lm1vdmVzXG4gICAgICAgICkpXG4gICAgfVxuXG4gICAgcmV0dXJuIGFwcGx5XG59XG5cbmZ1bmN0aW9uIGNsZWFyU3RhdGUodk5vZGUsIHBhdGNoLCBpbmRleCkge1xuICAgIC8vIFRPRE86IE1ha2UgdGhpcyBhIHNpbmdsZSB3YWxrLCBub3QgdHdvXG4gICAgdW5ob29rKHZOb2RlLCBwYXRjaCwgaW5kZXgpXG4gICAgZGVzdHJveVdpZGdldHModk5vZGUsIHBhdGNoLCBpbmRleClcbn1cblxuLy8gUGF0Y2ggcmVjb3JkcyBmb3IgYWxsIGRlc3Ryb3llZCB3aWRnZXRzIG11c3QgYmUgYWRkZWQgYmVjYXVzZSB3ZSBuZWVkXG4vLyBhIERPTSBub2RlIHJlZmVyZW5jZSBmb3IgdGhlIGRlc3Ryb3kgZnVuY3Rpb25cbmZ1bmN0aW9uIGRlc3Ryb3lXaWRnZXRzKHZOb2RlLCBwYXRjaCwgaW5kZXgpIHtcbiAgICBpZiAoaXNXaWRnZXQodk5vZGUpKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygdk5vZGUuZGVzdHJveSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBwYXRjaFtpbmRleF0gPSBhcHBlbmRQYXRjaChcbiAgICAgICAgICAgICAgICBwYXRjaFtpbmRleF0sXG4gICAgICAgICAgICAgICAgbmV3IFZQYXRjaChWUGF0Y2guUkVNT1ZFLCB2Tm9kZSwgbnVsbClcbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNWTm9kZSh2Tm9kZSkgJiYgKHZOb2RlLmhhc1dpZGdldHMgfHwgdk5vZGUuaGFzVGh1bmtzKSkge1xuICAgICAgICB2YXIgY2hpbGRyZW4gPSB2Tm9kZS5jaGlsZHJlblxuICAgICAgICB2YXIgbGVuID0gY2hpbGRyZW4ubGVuZ3RoXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldXG4gICAgICAgICAgICBpbmRleCArPSAxXG5cbiAgICAgICAgICAgIGRlc3Ryb3lXaWRnZXRzKGNoaWxkLCBwYXRjaCwgaW5kZXgpXG5cbiAgICAgICAgICAgIGlmIChpc1ZOb2RlKGNoaWxkKSAmJiBjaGlsZC5jb3VudCkge1xuICAgICAgICAgICAgICAgIGluZGV4ICs9IGNoaWxkLmNvdW50XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzVGh1bmsodk5vZGUpKSB7XG4gICAgICAgIHRodW5rcyh2Tm9kZSwgbnVsbCwgcGF0Y2gsIGluZGV4KVxuICAgIH1cbn1cblxuLy8gQ3JlYXRlIGEgc3ViLXBhdGNoIGZvciB0aHVua3NcbmZ1bmN0aW9uIHRodW5rcyhhLCBiLCBwYXRjaCwgaW5kZXgpIHtcbiAgICB2YXIgbm9kZXMgPSBoYW5kbGVUaHVuayhhLCBiKVxuICAgIHZhciB0aHVua1BhdGNoID0gZGlmZihub2Rlcy5hLCBub2Rlcy5iKVxuICAgIGlmIChoYXNQYXRjaGVzKHRodW5rUGF0Y2gpKSB7XG4gICAgICAgIHBhdGNoW2luZGV4XSA9IG5ldyBWUGF0Y2goVlBhdGNoLlRIVU5LLCBudWxsLCB0aHVua1BhdGNoKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaGFzUGF0Y2hlcyhwYXRjaCkge1xuICAgIGZvciAodmFyIGluZGV4IGluIHBhdGNoKSB7XG4gICAgICAgIGlmIChpbmRleCAhPT0gXCJhXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2Vcbn1cblxuLy8gRXhlY3V0ZSBob29rcyB3aGVuIHR3byBub2RlcyBhcmUgaWRlbnRpY2FsXG5mdW5jdGlvbiB1bmhvb2sodk5vZGUsIHBhdGNoLCBpbmRleCkge1xuICAgIGlmIChpc1ZOb2RlKHZOb2RlKSkge1xuICAgICAgICBpZiAodk5vZGUuaG9va3MpIHtcbiAgICAgICAgICAgIHBhdGNoW2luZGV4XSA9IGFwcGVuZFBhdGNoKFxuICAgICAgICAgICAgICAgIHBhdGNoW2luZGV4XSxcbiAgICAgICAgICAgICAgICBuZXcgVlBhdGNoKFxuICAgICAgICAgICAgICAgICAgICBWUGF0Y2guUFJPUFMsXG4gICAgICAgICAgICAgICAgICAgIHZOb2RlLFxuICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWRLZXlzKHZOb2RlLmhvb2tzKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2Tm9kZS5kZXNjZW5kYW50SG9va3MgfHwgdk5vZGUuaGFzVGh1bmtzKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGRyZW4gPSB2Tm9kZS5jaGlsZHJlblxuICAgICAgICAgICAgdmFyIGxlbiA9IGNoaWxkcmVuLmxlbmd0aFxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldXG4gICAgICAgICAgICAgICAgaW5kZXggKz0gMVxuXG4gICAgICAgICAgICAgICAgdW5ob29rKGNoaWxkLCBwYXRjaCwgaW5kZXgpXG5cbiAgICAgICAgICAgICAgICBpZiAoaXNWTm9kZShjaGlsZCkgJiYgY2hpbGQuY291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggKz0gY2hpbGQuY291bnRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzVGh1bmsodk5vZGUpKSB7XG4gICAgICAgIHRodW5rcyh2Tm9kZSwgbnVsbCwgcGF0Y2gsIGluZGV4KVxuICAgIH1cbn1cblxuZnVuY3Rpb24gdW5kZWZpbmVkS2V5cyhvYmopIHtcbiAgICB2YXIgcmVzdWx0ID0ge31cblxuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgcmVzdWx0W2tleV0gPSB1bmRlZmluZWRcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0XG59XG5cbi8vIExpc3QgZGlmZiwgbmFpdmUgbGVmdCB0byByaWdodCByZW9yZGVyaW5nXG5mdW5jdGlvbiByZW9yZGVyKGFDaGlsZHJlbiwgYkNoaWxkcmVuKSB7XG4gICAgLy8gTyhNKSB0aW1lLCBPKE0pIG1lbW9yeVxuICAgIHZhciBiQ2hpbGRJbmRleCA9IGtleUluZGV4KGJDaGlsZHJlbilcbiAgICB2YXIgYktleXMgPSBiQ2hpbGRJbmRleC5rZXlzXG4gICAgdmFyIGJGcmVlID0gYkNoaWxkSW5kZXguZnJlZVxuXG4gICAgaWYgKGJGcmVlLmxlbmd0aCA9PT0gYkNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2hpbGRyZW46IGJDaGlsZHJlbixcbiAgICAgICAgICAgIG1vdmVzOiBudWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBPKE4pIHRpbWUsIE8oTikgbWVtb3J5XG4gICAgdmFyIGFDaGlsZEluZGV4ID0ga2V5SW5kZXgoYUNoaWxkcmVuKVxuICAgIHZhciBhS2V5cyA9IGFDaGlsZEluZGV4LmtleXNcbiAgICB2YXIgYUZyZWUgPSBhQ2hpbGRJbmRleC5mcmVlXG5cbiAgICBpZiAoYUZyZWUubGVuZ3RoID09PSBhQ2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjaGlsZHJlbjogYkNoaWxkcmVuLFxuICAgICAgICAgICAgbW92ZXM6IG51bGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIE8oTUFYKE4sIE0pKSBtZW1vcnlcbiAgICB2YXIgbmV3Q2hpbGRyZW4gPSBbXVxuXG4gICAgdmFyIGZyZWVJbmRleCA9IDBcbiAgICB2YXIgZnJlZUNvdW50ID0gYkZyZWUubGVuZ3RoXG4gICAgdmFyIGRlbGV0ZWRJdGVtcyA9IDBcblxuICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCBhIGFuZCBtYXRjaCBhIG5vZGUgaW4gYlxuICAgIC8vIE8oTikgdGltZSxcbiAgICBmb3IgKHZhciBpID0gMCA7IGkgPCBhQ2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGFJdGVtID0gYUNoaWxkcmVuW2ldXG4gICAgICAgIHZhciBpdGVtSW5kZXhcblxuICAgICAgICBpZiAoYUl0ZW0ua2V5KSB7XG4gICAgICAgICAgICBpZiAoYktleXMuaGFzT3duUHJvcGVydHkoYUl0ZW0ua2V5KSkge1xuICAgICAgICAgICAgICAgIC8vIE1hdGNoIHVwIHRoZSBvbGQga2V5c1xuICAgICAgICAgICAgICAgIGl0ZW1JbmRleCA9IGJLZXlzW2FJdGVtLmtleV1cbiAgICAgICAgICAgICAgICBuZXdDaGlsZHJlbi5wdXNoKGJDaGlsZHJlbltpdGVtSW5kZXhdKVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBvbGQga2V5ZWQgaXRlbXNcbiAgICAgICAgICAgICAgICBpdGVtSW5kZXggPSBpIC0gZGVsZXRlZEl0ZW1zKytcbiAgICAgICAgICAgICAgICBuZXdDaGlsZHJlbi5wdXNoKG51bGwpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBNYXRjaCB0aGUgaXRlbSBpbiBhIHdpdGggdGhlIG5leHQgZnJlZSBpdGVtIGluIGJcbiAgICAgICAgICAgIGlmIChmcmVlSW5kZXggPCBmcmVlQ291bnQpIHtcbiAgICAgICAgICAgICAgICBpdGVtSW5kZXggPSBiRnJlZVtmcmVlSW5kZXgrK11cbiAgICAgICAgICAgICAgICBuZXdDaGlsZHJlbi5wdXNoKGJDaGlsZHJlbltpdGVtSW5kZXhdKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBUaGVyZSBhcmUgbm8gZnJlZSBpdGVtcyBpbiBiIHRvIG1hdGNoIHdpdGhcbiAgICAgICAgICAgICAgICAvLyB0aGUgZnJlZSBpdGVtcyBpbiBhLCBzbyB0aGUgZXh0cmEgZnJlZSBub2Rlc1xuICAgICAgICAgICAgICAgIC8vIGFyZSBkZWxldGVkLlxuICAgICAgICAgICAgICAgIGl0ZW1JbmRleCA9IGkgLSBkZWxldGVkSXRlbXMrK1xuICAgICAgICAgICAgICAgIG5ld0NoaWxkcmVuLnB1c2gobnVsbClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBsYXN0RnJlZUluZGV4ID0gZnJlZUluZGV4ID49IGJGcmVlLmxlbmd0aCA/XG4gICAgICAgIGJDaGlsZHJlbi5sZW5ndGggOlxuICAgICAgICBiRnJlZVtmcmVlSW5kZXhdXG5cbiAgICAvLyBJdGVyYXRlIHRocm91Z2ggYiBhbmQgYXBwZW5kIGFueSBuZXcga2V5c1xuICAgIC8vIE8oTSkgdGltZVxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgYkNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHZhciBuZXdJdGVtID0gYkNoaWxkcmVuW2pdXG5cbiAgICAgICAgaWYgKG5ld0l0ZW0ua2V5KSB7XG4gICAgICAgICAgICBpZiAoIWFLZXlzLmhhc093blByb3BlcnR5KG5ld0l0ZW0ua2V5KSkge1xuICAgICAgICAgICAgICAgIC8vIEFkZCBhbnkgbmV3IGtleWVkIGl0ZW1zXG4gICAgICAgICAgICAgICAgLy8gV2UgYXJlIGFkZGluZyBuZXcgaXRlbXMgdG8gdGhlIGVuZCBhbmQgdGhlbiBzb3J0aW5nIHRoZW1cbiAgICAgICAgICAgICAgICAvLyBpbiBwbGFjZS4gSW4gZnV0dXJlIHdlIHNob3VsZCBpbnNlcnQgbmV3IGl0ZW1zIGluIHBsYWNlLlxuICAgICAgICAgICAgICAgIG5ld0NoaWxkcmVuLnB1c2gobmV3SXRlbSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChqID49IGxhc3RGcmVlSW5kZXgpIHtcbiAgICAgICAgICAgIC8vIEFkZCBhbnkgbGVmdG92ZXIgbm9uLWtleWVkIGl0ZW1zXG4gICAgICAgICAgICBuZXdDaGlsZHJlbi5wdXNoKG5ld0l0ZW0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgc2ltdWxhdGUgPSBuZXdDaGlsZHJlbi5zbGljZSgpXG4gICAgdmFyIHNpbXVsYXRlSW5kZXggPSAwXG4gICAgdmFyIHJlbW92ZXMgPSBbXVxuICAgIHZhciBpbnNlcnRzID0gW11cbiAgICB2YXIgc2ltdWxhdGVJdGVtXG5cbiAgICBmb3IgKHZhciBrID0gMDsgayA8IGJDaGlsZHJlbi5sZW5ndGg7KSB7XG4gICAgICAgIHZhciB3YW50ZWRJdGVtID0gYkNoaWxkcmVuW2tdXG4gICAgICAgIHNpbXVsYXRlSXRlbSA9IHNpbXVsYXRlW3NpbXVsYXRlSW5kZXhdXG5cbiAgICAgICAgLy8gcmVtb3ZlIGl0ZW1zXG4gICAgICAgIHdoaWxlIChzaW11bGF0ZUl0ZW0gPT09IG51bGwgJiYgc2ltdWxhdGUubGVuZ3RoKSB7XG4gICAgICAgICAgICByZW1vdmVzLnB1c2gocmVtb3ZlKHNpbXVsYXRlLCBzaW11bGF0ZUluZGV4LCBudWxsKSlcbiAgICAgICAgICAgIHNpbXVsYXRlSXRlbSA9IHNpbXVsYXRlW3NpbXVsYXRlSW5kZXhdXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXNpbXVsYXRlSXRlbSB8fCBzaW11bGF0ZUl0ZW0ua2V5ICE9PSB3YW50ZWRJdGVtLmtleSkge1xuICAgICAgICAgICAgLy8gaWYgd2UgbmVlZCBhIGtleSBpbiB0aGlzIHBvc2l0aW9uLi4uXG4gICAgICAgICAgICBpZiAod2FudGVkSXRlbS5rZXkpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2ltdWxhdGVJdGVtICYmIHNpbXVsYXRlSXRlbS5rZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgYW4gaW5zZXJ0IGRvZXNuJ3QgcHV0IHRoaXMga2V5IGluIHBsYWNlLCBpdCBuZWVkcyB0byBtb3ZlXG4gICAgICAgICAgICAgICAgICAgIGlmIChiS2V5c1tzaW11bGF0ZUl0ZW0ua2V5XSAhPT0gayArIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZXMucHVzaChyZW1vdmUoc2ltdWxhdGUsIHNpbXVsYXRlSW5kZXgsIHNpbXVsYXRlSXRlbS5rZXkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgc2ltdWxhdGVJdGVtID0gc2ltdWxhdGVbc2ltdWxhdGVJbmRleF1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSByZW1vdmUgZGlkbid0IHB1dCB0aGUgd2FudGVkIGl0ZW0gaW4gcGxhY2UsIHdlIG5lZWQgdG8gaW5zZXJ0IGl0XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNpbXVsYXRlSXRlbSB8fCBzaW11bGF0ZUl0ZW0ua2V5ICE9PSB3YW50ZWRJdGVtLmtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc2VydHMucHVzaCh7a2V5OiB3YW50ZWRJdGVtLmtleSwgdG86IGt9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXRlbXMgYXJlIG1hdGNoaW5nLCBzbyBza2lwIGFoZWFkXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaW11bGF0ZUluZGV4KytcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc2VydHMucHVzaCh7a2V5OiB3YW50ZWRJdGVtLmtleSwgdG86IGt9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpbnNlcnRzLnB1c2goe2tleTogd2FudGVkSXRlbS5rZXksIHRvOiBrfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaysrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBhIGtleSBpbiBzaW11bGF0ZSBoYXMgbm8gbWF0Y2hpbmcgd2FudGVkIGtleSwgcmVtb3ZlIGl0XG4gICAgICAgICAgICBlbHNlIGlmIChzaW11bGF0ZUl0ZW0gJiYgc2ltdWxhdGVJdGVtLmtleSkge1xuICAgICAgICAgICAgICAgIHJlbW92ZXMucHVzaChyZW1vdmUoc2ltdWxhdGUsIHNpbXVsYXRlSW5kZXgsIHNpbXVsYXRlSXRlbS5rZXkpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2ltdWxhdGVJbmRleCsrXG4gICAgICAgICAgICBrKytcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJlbW92ZSBhbGwgdGhlIHJlbWFpbmluZyBub2RlcyBmcm9tIHNpbXVsYXRlXG4gICAgd2hpbGUoc2ltdWxhdGVJbmRleCA8IHNpbXVsYXRlLmxlbmd0aCkge1xuICAgICAgICBzaW11bGF0ZUl0ZW0gPSBzaW11bGF0ZVtzaW11bGF0ZUluZGV4XVxuICAgICAgICByZW1vdmVzLnB1c2gocmVtb3ZlKHNpbXVsYXRlLCBzaW11bGF0ZUluZGV4LCBzaW11bGF0ZUl0ZW0gJiYgc2ltdWxhdGVJdGVtLmtleSkpXG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIG9ubHkgbW92ZXMgd2UgaGF2ZSBhcmUgZGVsZXRlcyB0aGVuIHdlIGNhbiBqdXN0XG4gICAgLy8gbGV0IHRoZSBkZWxldGUgcGF0Y2ggcmVtb3ZlIHRoZXNlIGl0ZW1zLlxuICAgIGlmIChyZW1vdmVzLmxlbmd0aCA9PT0gZGVsZXRlZEl0ZW1zICYmICFpbnNlcnRzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2hpbGRyZW46IG5ld0NoaWxkcmVuLFxuICAgICAgICAgICAgbW92ZXM6IG51bGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNoaWxkcmVuOiBuZXdDaGlsZHJlbixcbiAgICAgICAgbW92ZXM6IHtcbiAgICAgICAgICAgIHJlbW92ZXM6IHJlbW92ZXMsXG4gICAgICAgICAgICBpbnNlcnRzOiBpbnNlcnRzXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZShhcnIsIGluZGV4LCBrZXkpIHtcbiAgICBhcnIuc3BsaWNlKGluZGV4LCAxKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZnJvbTogaW5kZXgsXG4gICAgICAgIGtleToga2V5XG4gICAgfVxufVxuXG5mdW5jdGlvbiBrZXlJbmRleChjaGlsZHJlbikge1xuICAgIHZhciBrZXlzID0ge31cbiAgICB2YXIgZnJlZSA9IFtdXG4gICAgdmFyIGxlbmd0aCA9IGNoaWxkcmVuLmxlbmd0aFxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXVxuXG4gICAgICAgIGlmIChjaGlsZC5rZXkpIHtcbiAgICAgICAgICAgIGtleXNbY2hpbGQua2V5XSA9IGlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZyZWUucHVzaChpKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAga2V5czoga2V5cywgICAgIC8vIEEgaGFzaCBvZiBrZXkgbmFtZSB0byBpbmRleFxuICAgICAgICBmcmVlOiBmcmVlICAgICAgLy8gQW4gYXJyYXkgb2YgdW5rZXllZCBpdGVtIGluZGljZXNcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGFwcGVuZFBhdGNoKGFwcGx5LCBwYXRjaCkge1xuICAgIGlmIChhcHBseSkge1xuICAgICAgICBpZiAoaXNBcnJheShhcHBseSkpIHtcbiAgICAgICAgICAgIGFwcGx5LnB1c2gocGF0Y2gpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhcHBseSA9IFthcHBseSwgcGF0Y2hdXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXBwbHlcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcGF0Y2hcbiAgICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92dHJlZS9kaWZmLmpzXG4vLyBtb2R1bGUgaWQgPSAyMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA0IDUgOSAyMCAyMiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoXCJpcy1vYmplY3RcIilcbnZhciBpc0hvb2sgPSByZXF1aXJlKFwiLi4vdm5vZGUvaXMtdmhvb2tcIilcblxubW9kdWxlLmV4cG9ydHMgPSBkaWZmUHJvcHNcblxuZnVuY3Rpb24gZGlmZlByb3BzKGEsIGIpIHtcbiAgICB2YXIgZGlmZlxuXG4gICAgZm9yICh2YXIgYUtleSBpbiBhKSB7XG4gICAgICAgIGlmICghKGFLZXkgaW4gYikpIHtcbiAgICAgICAgICAgIGRpZmYgPSBkaWZmIHx8IHt9XG4gICAgICAgICAgICBkaWZmW2FLZXldID0gdW5kZWZpbmVkXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYVZhbHVlID0gYVthS2V5XVxuICAgICAgICB2YXIgYlZhbHVlID0gYlthS2V5XVxuXG4gICAgICAgIGlmIChhVmFsdWUgPT09IGJWYWx1ZSkge1xuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgfSBlbHNlIGlmIChpc09iamVjdChhVmFsdWUpICYmIGlzT2JqZWN0KGJWYWx1ZSkpIHtcbiAgICAgICAgICAgIGlmIChnZXRQcm90b3R5cGUoYlZhbHVlKSAhPT0gZ2V0UHJvdG90eXBlKGFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBkaWZmID0gZGlmZiB8fCB7fVxuICAgICAgICAgICAgICAgIGRpZmZbYUtleV0gPSBiVmFsdWVcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNIb29rKGJWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgZGlmZiA9IGRpZmYgfHwge31cbiAgICAgICAgICAgICAgICAgZGlmZlthS2V5XSA9IGJWYWx1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgb2JqZWN0RGlmZiA9IGRpZmZQcm9wcyhhVmFsdWUsIGJWYWx1ZSlcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0RGlmZikge1xuICAgICAgICAgICAgICAgICAgICBkaWZmID0gZGlmZiB8fCB7fVxuICAgICAgICAgICAgICAgICAgICBkaWZmW2FLZXldID0gb2JqZWN0RGlmZlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRpZmYgPSBkaWZmIHx8IHt9XG4gICAgICAgICAgICBkaWZmW2FLZXldID0gYlZhbHVlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBiS2V5IGluIGIpIHtcbiAgICAgICAgaWYgKCEoYktleSBpbiBhKSkge1xuICAgICAgICAgICAgZGlmZiA9IGRpZmYgfHwge31cbiAgICAgICAgICAgIGRpZmZbYktleV0gPSBiW2JLZXldXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGlmZlxufVxuXG5mdW5jdGlvbiBnZXRQcm90b3R5cGUodmFsdWUpIHtcbiAgaWYgKE9iamVjdC5nZXRQcm90b3R5cGVPZikge1xuICAgIHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsdWUpXG4gIH0gZWxzZSBpZiAodmFsdWUuX19wcm90b19fKSB7XG4gICAgcmV0dXJuIHZhbHVlLl9fcHJvdG9fX1xuICB9IGVsc2UgaWYgKHZhbHVlLmNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIHZhbHVlLmNvbnN0cnVjdG9yLnByb3RvdHlwZVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92dHJlZS9kaWZmLXByb3BzLmpzXG4vLyBtb2R1bGUgaWQgPSAyMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA0IDUgOSAyMCAyMiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLmN1cnJ5ID0gY3Vycnk7XG5leHBvcnRzLmN1cnJ5TiA9IGN1cnJ5TjtcbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuZnVuY3Rpb24gX2N1cnJ5KG4sIGZuLCBjdXJyeUFyZ3MpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKSxcbiAgICAgICAgY29uY2F0QXJncyA9IGN1cnJ5QXJncy5jb25jYXQoYXJncyk7XG5cbiAgICBpZiAobiA+IGNvbmNhdEFyZ3MubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gX2N1cnJ5KG4sIGZuLCBjb25jYXRBcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIHNsaWNlLmNhbGwoY29uY2F0QXJncywgMCwgbikpO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gY3VycnkoZm4pIHtcbiAgcmV0dXJuIF9jdXJyeShmbi5sZW5ndGgsIGZuLCBbXSk7XG59XG5cbmZ1bmN0aW9uIGN1cnJ5TihuLCBmbikge1xuICByZXR1cm4gX2N1cnJ5KG4sIGZuLCBbXSk7XG59XG5cbnZhciBjdXJyeTEgPSBleHBvcnRzLmN1cnJ5MSA9IGN1cnJ5TigyLCBjdXJyeU4pKDEpO1xudmFyIGN1cnJ5MiA9IGV4cG9ydHMuY3VycnkyID0gY3VycnlOKDIsIGN1cnJ5TikoMik7XG52YXIgY3VycnkzID0gZXhwb3J0cy5jdXJyeTMgPSBjdXJyeU4oMiwgY3VycnlOKSgzKTtcbnZhciBjdXJyeTQgPSBleHBvcnRzLmN1cnJ5NCA9IGN1cnJ5TigyLCBjdXJyeU4pKDQpO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9mai1jdXJyeS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMjI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNCA1IDkgMjAgMjIiLCIvLyBMaWNlbnNlOiBMR1BMLTMuMC1vci1sYXRlclxudmFyIGZseWQgPSByZXF1aXJlKFwiZmx5ZFwiKVxudmFyIGggPSByZXF1aXJlKFwidmlydHVhbC1kb20vaFwiKVxuXG52YXIgZm9vdGVyU3RyZWFtID0gZmx5ZC5zdHJlYW0oKVxuXG5mdW5jdGlvbiByb290KHRleHQsIG5leHQpIHtcblx0cmV0dXJuIGgoJ2Zvb3Rlci5zdGVwLWZvb3RlcicsIGgoJ2J1dHRvbi5idXR0b24nLCB7ZGF0YToge25leHQ6IG5leHR9LCBvbmNsaWNrOiBmb290ZXJTdHJlYW19LCB0ZXh0KSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7cm9vdDogcm9vdCwgc3RyZWFtOiBmb290ZXJTdHJlYW19XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvanMvbm9ucHJvZml0cy9idXR0b24vZm9vdGVyLmpzIiwiLy8gTGljZW5zZTogTEdQTC0zLjAtb3ItbGF0ZXJcbnZhciBoID0gcmVxdWlyZShcInZpcnR1YWwtZG9tL2hcIilcblxuLy8gYSBjb25zdHJ1Y3RvciBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgcmFkaW8tbGFiZWwgcGFpcnNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaWQsIG5hbWUsIGN1c3RvbUF0dHJpYnV0ZXMsIGNvbnRlbnQsIHN0cmVhbSl7XG5cdHZhciBjdXN0b21BdHRyaWJ1dGVzID0gY3VzdG9tQXR0cmlidXRlcyA/IGN1c3RvbUF0dHJpYnV0ZXMgOiB7fVxuXHRyZXR1cm4gW1xuXHRcdGgoJ2lucHV0Jywge3R5cGU6ICdyYWRpbycsIG5hbWU6IG5hbWUsIGlkOiBpZCwgYXR0cmlidXRlczogY3VzdG9tQXR0cmlidXRlcywgb25jbGljazogc3RyZWFtfSksXG5cdFx0aCgnbGFiZWwnLCB7YXR0cmlidXRlczogeydmb3InOiBpZH19LCBjb250ZW50KVxuXHRdXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvanMvY29tcG9uZW50cy9yYWRpby1hbmQtbGFiZWwtd3JhcHBlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2lzUGxhY2Vob2xkZXIoYSkge1xuICByZXR1cm4gYSAhPSBudWxsICYmXG4gICAgICAgICB0eXBlb2YgYSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgIGFbJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddID09PSB0cnVlO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2ZseWQvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9faXNQbGFjZWhvbGRlci5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTUgMjAgMjEgMjIgMjMiLCIvLyBMaWNlbnNlOiBMR1BMLTMuMC1vci1sYXRlclxudmFyIHZpZXcgPSByZXF1aXJlKFwidnZ2dmlld1wiKVxudmFyIGZseWQgPSByZXF1aXJlKFwiZmx5ZFwiKVxuZmx5ZC5zY2FubWVyZ2UgPSByZXF1aXJlKFwiZmx5ZC9tb2R1bGUvc2Nhbm1lcmdlXCIpXG52YXIgaCA9IHJlcXVpcmUoXCJ2aXJ0dWFsLWRvbS9oXCIpXG5cbnZhciBzZXRTdGF0ZUZyb21WYWx1ZSA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvc2V0LXN0YXRlLWZyb20tdmFsdWUnKVxuXG52YXIgYXBwZWFyYW5jZSA9IHJlcXVpcmUoJy4vYXBwZWFyYW5jZScpXG52YXIgZGVzaWduYXRpb25zID0gcmVxdWlyZSgnLi9kZXNpZ25hdGlvbnMnKVxudmFyIGFtb3VudHMgPSByZXF1aXJlKCcuL2Ftb3VudHMnKVxudmFyIHR5cGUgPSByZXF1aXJlKCcuL3R5cGUnKVxudmFyIGhpZGVEZWRpY2F0aW9uID0gcmVxdWlyZSgnLi9oaWRlLWRlZGljYXRpb24nKVxudmFyIHRoYW5rWW91ID0gcmVxdWlyZSgnLi90aGFuay15b3UnKVxudmFyIHByZXZpZXcgPSByZXF1aXJlKCcuL3ByZXZpZXcnKVxuXG52YXIgJGZvb3RlciA9IHJlcXVpcmUoJy4vZm9vdGVyJykuc3RyZWFtXG5cbnZhciBzdGF0ZSA9IHtcblx0cGFnZTogd2luZG93LmxvY2F0aW9uLmhhc2gucmVwbGFjZSgnIycsICcnKVxuXHQ/IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMnLCAnJylcblx0OiAnYXBwZWFyYW5jZScsXG5cdHNldHRpbmdzOiB7XG5cdFx0YXBwZWFyYW5jZToge1xuXHRcdFx0bmFtZTogJ2RlZmF1bHQnLFxuXHRcdFx0Y3VzdG9tVGV4dDogJ0RvbmF0ZSdcblx0XHR9LFxuXHRcdGRlc2lnbmF0aW9uczoge2NvdW50OiAxLCBtdWx0aXBsZXM6IHt9fSxcblx0XHRhbW91bnRzOiB7XG5cdFx0XHRuYW1lOiAnbXVsdGlwbGUnLFxuXHRcdFx0c2luZ2xlOiAzMCxcblx0XHRcdG11bHRpcGxlczogezA6IDEwLCAxOiAyMCwgMjogMzAsIDM6IDcwLCA0OiAxMDAsIDU6IDIwMCwgNjogMTAwMCB9XG5cdFx0fSxcblx0XHR0eXBlOiB7IG5hbWU6ICdib3RoJ30sXG5cdFx0dGhhbmtZb3U6IHt9XG5cdH1cbn1cblxuZnVuY3Rpb24gcm9vdChzdGF0ZSkge1xuXHRyZXR1cm4gaCgnZGl2JywgW1xuXHRcdG1lbnUoc3RhdGUpLFxuXHRcdHBhZ2VzKHN0YXRlKVxuXHRdKVxufVxuXG52YXIgJHBhZ2UgPSBmbHlkLnN0cmVhbSgpXG5cbnZhciAkcGFnZUNsaWNrID0gZmx5ZC5zdHJlYW0oKVxuXG5mbHlkLm1hcChmdW5jdGlvbihldil7XG5cdGlmKGV2LnRhcmdldC5kYXRhLnBhZ2UgPT09ICdwcmV2aWV3Jykge1xuXHRcdGFwcGVuZFNjcmlwdCgpXG5cdH0gZWxzZSB7XG5cdFx0cmVtb3ZlU2NyaXB0KClcblx0fVxufSwgJHBhZ2VDbGljaylcblxuJHBhZ2UgPSBmbHlkLm1lcmdlKCRwYWdlLFxuXHRmbHlkLm1hcChmdW5jdGlvbihldikge1xuXHRcdHJldHVybiBldi50YXJnZXQuZGF0YS5wYWdlXG5cdH0sICRwYWdlQ2xpY2spKVxuXG5mdW5jdGlvbiBhcHBlbmRTY3JpcHQoKXtcblx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpXG5cdHNjcmlwdC5pZCA9ICdjb21taXRjaGFuZ2UtZG9uYXRpb24tc2NyaXB0J1xuXHRzY3JpcHQuc2V0QXR0cmlidXRlKCdkYXRhLW5wby1pZCcsIGFwcC5ub25wcm9maXRfaWQpXG5cdHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ3NyYycsIGFwcC5ob3N0X3dpdGhfcG9ydCArICcvanMvZG9uYXRlLWJ1dHRvbi52Mi5qcycpXG5cdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KVxufVxuXG5mdW5jdGlvbiByZW1vdmVTY3JpcHQoKXtcblx0aWYoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1pdGNoYW5nZS1kb25hdGlvbi1zY3JpcHQnKSl7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1pdGNoYW5nZS1kb25hdGlvbi1zY3JpcHQnKS5yZW1vdmUoKVxuXHR9XG5cdHJlbW92ZUJ1dHRvbkNvbnRlbnQoKVxufVxuXG5mdW5jdGlvbiByZW1vdmVCdXR0b25Db250ZW50KCl7XG5cdHZhciBkb25hdGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWl0Y2hhbmdlLWRvbmF0ZScpXG5cdHdoaWxlKGRvbmF0ZUJ1dHRvbi5sYXN0Q2hpbGQpe1xuXHRcdGRvbmF0ZUJ1dHRvbi5yZW1vdmVDaGlsZChkb25hdGVCdXR0b24ubGFzdENoaWxkKVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGVuZEJ1dHRvbkNvZGUoKXtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nob29zZS1yb2xlLW1vZGFsJykuY2xhc3NMaXN0LmFkZCgnaW5WaWV3JylcbiAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdpcy1zaG93aW5nTW9kYWwnKVxuXHR2YXIgYnV0dG9uV3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1kb25hdGVCdXR0b25XcmFwcGVyJykuY2xvbmVOb2RlKHRydWUpXG5cdHdoaWxlKGJ1dHRvbldyYXBwZXIucXVlcnlTZWxlY3RvcignaWZyYW1lJykpIHtcblx0XHRidXR0b25XcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJ2lmcmFtZScpLnJlbW92ZSgpXG5cdH1cblx0d2hpbGUoYnV0dG9uV3JhcHBlci5xdWVyeVNlbGVjdG9yKCdkaXYnKSl7XG5cdFx0YnV0dG9uV3JhcHBlci5xdWVyeVNlbGVjdG9yKCdkaXYnKS5yZW1vdmUoKVxuXHR9XG5cdHZhciBjb2RlID0gYnV0dG9uV3JhcHBlci5pbm5lckhUTUwucmVwbGFjZSgvXCIvZywgXCInXCIpXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1kb25hdGVCdXR0b25BbmNob3InKS52YWx1ZSA9IGNvZGVcblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlbmQtY29kZS1tb2RhbCBpbnB1dFtuYW1lPVwiY29kZVwiXScpLnZhbHVlID0gY29kZVxufVxuXG5mdW5jdGlvbiBtZW51KHN0YXRlKXtcblx0dmFyIG1lbnVJdGVtcyA9IFtcblx0e25hbWU6ICdhcHBlYXJhbmNlJywgdGV4dDogJ0FwcGVhcmFuY2UnfSxcblx0e25hbWU6ICdkZXNpZ25hdGlvbnMnLCB0ZXh0OiAnRGVzaWduYXRpb25zJ30sXG5cdHtuYW1lOiAnYW1vdW50cycsIHRleHQ6ICdQcmVzZXQgYW1vdW50cyd9LFxuXHR7bmFtZTogJ3R5cGUnLCB0ZXh0OiAnUHJlc2V0IHJlY3VycmluZyBvciBvbmUtdGltZSd9LFxuICB7bmFtZTogJ2hpZGVEZWRpY2F0aW9uJywgdGV4dDogJ0hpZGUgZGVkaWNhdGlvbicgfSxcblx0e25hbWU6ICd0aGFua1lvdScsIHRleHQ6ICdUaGFuay15b3UgcGFnZSd9LFxuXHR7bmFtZTogJ3ByZXZpZXcnLCB0ZXh0OiAnTGl2ZSBwcmV2aWV3J31dXG5cblx0dmFyIGxpcyA9W11cblx0dmFyIGJ1dHRvbiA9IGgoJ2Rpdi51LXBhZGRpbmdYLTEwJyxcbiAgaCgnYS5idXR0b24tLWxhcmdlLm9yYW5nZS51LXdpZHRoLS1mdWxsJywgIHtvbmNsaWNrOiBhcHBlbmRCdXR0b25Db2RlfSwgJ0ZpbmlzaCcpKVxuXG5cdG1lbnVJdGVtcy5tYXAoZnVuY3Rpb24oaXRlbSkge1xuXHRcdHZhciBsaUNsYXNzID0gc3RhdGUucGFnZSA9PT0gaXRlbS5uYW1lID8gJy5hY3RpdmUnIDogJydcblx0XHRsaXMucHVzaChoKCdsaScgKyBsaUNsYXNzLCB7ZGF0YToge3BhZ2U6IGl0ZW0ubmFtZX0sIG9uY2xpY2s6ICRwYWdlQ2xpY2t9LCBpdGVtLnRleHQpKVxuXHR9KVxuXHRyZXR1cm4gaCgnYXNpZGUuc3RlcHNNZW51JywgW2goJ3VsJywgbGlzKSwgYnV0dG9uXSlcbn1cblxuXG5cbmZ1bmN0aW9uIHBhZ2VXcmFwcGVyKHN0YXRlLCBwYWdlTmFtZSwgY29udGVudCl7XG5cdHJldHVybiBoKCdzZWN0aW9uLnN0ZXAuJyArIHBhZ2VOYW1lLCB7XG5cdFx0c3R5bGU6IHtkaXNwbGF5OiBzdGF0ZS5wYWdlID09PSBwYWdlTmFtZSA/ICdibG9jaycgOiAnbm9uZSd9XG5cdH0sIGNvbnRlbnQpXG59XG5cbmZ1bmN0aW9uIHBhZ2VzKHN0YXRlKXtcblx0cmV0dXJuIFtcblx0XHRwYWdlV3JhcHBlcihzdGF0ZSwgJ2FwcGVhcmFuY2UnLCBhcHBlYXJhbmNlLnJvb3Qoc3RhdGUpKSxcblx0XHRwYWdlV3JhcHBlcihzdGF0ZSwgJ2Rlc2lnbmF0aW9ucycsIGRlc2lnbmF0aW9ucy5yb290KHN0YXRlKSksXG5cdFx0cGFnZVdyYXBwZXIoc3RhdGUsICdhbW91bnRzJywgYW1vdW50cy5yb290KHN0YXRlKSksXG5cdFx0cGFnZVdyYXBwZXIoc3RhdGUsICd0eXBlJywgdHlwZS5yb290KHN0YXRlKSksXG4gICAgcGFnZVdyYXBwZXIoc3RhdGUsICdoaWRlRGVkaWNhdGlvbicsIGhpZGVEZWRpY2F0aW9uLnJvb3Qoc3RhdGUpKSxcblx0XHRwYWdlV3JhcHBlcihzdGF0ZSwgJ3RoYW5rWW91JywgdGhhbmtZb3Uucm9vdChzdGF0ZSkpLFxuXHRcdHBhZ2VXcmFwcGVyKHN0YXRlLCAncHJldmlldycsIHByZXZpZXcucm9vdChzdGF0ZSkpXG5cdF1cbn1cblxudmFyIGRvbmF0ZUZvcm1CdWlsZGVyID0gdmlldyhyb290LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanMtZG9uYXRlRm9ybUJ1aWxkZXInKSwgc3RhdGUpXG5cbnZhciBuYW1lU3RyZWFtcyA9IFthcHBlYXJhbmNlLnN0cmVhbSwgZGVzaWduYXRpb25zLnN0cmVhbXMubmFtZSwgYW1vdW50cy5zdHJlYW0sIHR5cGUuc3RyZWFtLCBoaWRlRGVkaWNhdGlvbi5zdHJlYW0sIHRoYW5rWW91LnN0cmVhbV1cbiAgLm1hcChmdW5jdGlvbihzdHJlYW0pIHsgcmV0dXJuIFtzdHJlYW0sIHNldFN0YXRlRnJvbVZhbHVlXX0pXG5cbndpbmRvdy5zdGF0ZSA9IHN0YXRlXG5cbnZhciBzY2FuUGFpcnMgPSBbXG5cdFskcGFnZSwgc2V0UGFnZV0sXG5cdFskZm9vdGVyLCBhZHZhbmNlUGFnZV0sXG5cdFtkZXNpZ25hdGlvbnMuc3RyZWFtcy5jb3VudCwgYWRkRGVzaWduYXRpb25dXG5dLmNvbmNhdChuYW1lU3RyZWFtcylcblxudmFyICRzdGF0ZSA9IGZseWQuaW1tZWRpYXRlKGZseWQuc2Nhbm1lcmdlKHNjYW5QYWlycywgc3RhdGUpKVxuXG4vLyByZXJlbmRlcnMgdGhlIHZpZXcgYmFzZWQgb24gc3RhdGUgY2hhbmdlc1xuLy8gdGFrZXMgdGhlIHZpZXcgYW5kIHN0YXRlIHN0cmVhbVxuZmx5ZC5tYXAoZG9uYXRlRm9ybUJ1aWxkZXIsICRzdGF0ZSlcblxuZnVuY3Rpb24gc2V0UGFnZShzdGF0ZSwgcGFnZU5hbWUpe1xuXHRzdGF0ZS5wYWdlID0gd2luZG93LmxvY2F0aW9uLmhhc2ggPSBwYWdlTmFtZVxuXHRyZXR1cm4gc3RhdGVcbn1cblxuZnVuY3Rpb24gYWRkRGVzaWduYXRpb24oc3RhdGUsIGV2KSB7XG5cdGlmKHN0YXRlLnNldHRpbmdzLmRlc2lnbmF0aW9ucy5jb3VudCA8IDIwKSB7XG5cdFx0c3RhdGUuc2V0dGluZ3MuZGVzaWduYXRpb25zLmNvdW50Kytcblx0fVxuXHRyZXR1cm4gc3RhdGVcbn1cblxuZnVuY3Rpb24gYWR2YW5jZVBhZ2Uoc3RhdGUsIGV2KSB7XG5cdHN0YXRlLnBhZ2UgPSBldi50YXJnZXQuZGF0YS5uZXh0XG5cdHJldHVybiBzdGF0ZVxufVxuXG5cbi8vIC8vIFNlbmQgZW1haWwgdG8gd2VibWFzdGVyXG4kKCcjc2VuZC1jb2RlLW1vZGFsIGZvcm0nKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuXHR2YXIgc2VsZiA9IHRoaXNcblx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdHZhciBkYXRhID0gJCh0aGlzKS5zZXJpYWxpemVPYmplY3QoKVxuXHQkKHRoaXMpLmZpbmQoJ2J1dHRvbicpLmxvYWRpbmcoJ1NlbmRpbmcuLi4nKVxuXHQkLnBvc3QoJy9ub25wcm9maXRzLycgKyBhcHAubm9ucHJvZml0X2lkICsgJy9idXR0b24vc2VuZF9jb2RlLmpzb24nLCBkYXRhKVxuXHRcdC5kb25lKGZ1bmN0aW9uKCkge1xuXHRcdFx0bm90aWZpY2F0aW9uKCdFbWFpbCBzZW50IScpXG5cdFx0XHRhcHBsLmNsb3NlX21vZGFsKClcblx0XHR9KVxuXHRcdC5jb21wbGV0ZShmdW5jdGlvbigpIHtcblx0XHRcdCQoc2VsZikuZmluZCgnYnV0dG9uJykuZGlzYWJsZUxvYWRpbmcoKVxuXHRcdH0pXG5cdFx0LmZhaWwoZnVuY3Rpb24oZCkge1xuXHRcdFx0bm90aWZpY2F0aW9uKCdFcnJvcjogJyArIHV0aWxzLnByaW50X2Vycm9yKGQpKVxuXHRcdH0pXG59KVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvanMvbm9ucHJvZml0cy9idXR0b24vcGFnZS5qcyIsIi8vIExpY2Vuc2U6IExHUEwtMy4wLW9yLWxhdGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdGF0ZSwgZXYpe1xuICB2YXIgdGFyZ2V0ID0gZXYudGFyZ2V0XG5cdHZhciBuYW1lcyA9IHRhcmdldC5uYW1lLnNwbGl0KCcuJylcblx0dmFyIHZhbHVlID0gdGFyZ2V0LnR5cGUgPT09ICdjaGVja2JveCcgPyB0YXJnZXQuY2hlY2tlZCA6IHRhcmdldC52YWx1ZVxuXHR2YXIgbmVzdGVkU3RhdGUgPSBzdGF0ZVxuXG5cdGZvcih2YXIgaSA9IDAsIGxlbiA9IG5hbWVzLmxlbmd0aCAtIDE7IGkgPCBsZW47ICsraSkge1xuXHRcdGlmKG5lc3RlZFN0YXRlW25hbWVzW2ldXSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gc3RhdGVcblx0XHRuZXN0ZWRTdGF0ZSA9IG5lc3RlZFN0YXRlW25hbWVzW2ldXVxuXHR9XG5cblx0dmFyIGxhc3RLZXkgPSBuYW1lc1tuYW1lcy5sZW5ndGggLSAxXVxuXG5cdG5lc3RlZFN0YXRlW2xhc3RLZXldID0gdmFsdWVcblxuXHRyZXR1cm4gc3RhdGVcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9qcy9jb21wb25lbnRzL3NldC1zdGF0ZS1mcm9tLXZhbHVlLmpzIiwiLy8gTGljZW5zZTogTEdQTC0zLjAtb3ItbGF0ZXJcbnZhciBmbHlkID0gcmVxdWlyZShcImZseWRcIilcbnZhciBoID0gcmVxdWlyZShcInZpcnR1YWwtZG9tL2hcIilcblxudmFyIGZvb3RlciA9IHJlcXVpcmUoJy4vZm9vdGVyJylcbnZhciByYWRpb0FuZExhYmVsV3JhcHBlciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvcmFkaW8tYW5kLWxhYmVsLXdyYXBwZXInKVxuXG52YXIgYXBwZWFyYW5jZVN0cmVhbSA9IGZseWQuc3RyZWFtKClcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdHJvb3Q6IHJvb3QsXG5cdHN0cmVhbTogYXBwZWFyYW5jZVN0cmVhbVxufVxuXG5mdW5jdGlvbiByb290KHN0YXRlKSB7XG5cdHJldHVybiBbXG5cdFx0aCgnaGVhZGVyLnN0ZXAtaGVhZGVyJywgW1xuXHRcdFx0aCgnaDQuc3RlcC10aXRsZScsICdBcHBlYXJhbmNlJyksXG5cdFx0XHRoKCdwJywgJ0hvdyB3b3VsZCB5b3UgbGlrZSB0byBhY2NlcHQgZG9uYXRpb25zPycpXG5cdFx0XSksXG5cdFx0aCgnZGl2LnN0ZXAtaW5uZXInLCBbXG5cdFx0XHRcdHRhYmxlKHN0YXRlKSxcblx0XHRcdFx0Y3VzdG9tVGV4dChzdGF0ZSksXG5cdFx0XHRcdGZvb3Rlci5yb290KCdOZXh0JywgJ2Rlc2lnbmF0aW9ucycpXG5cdFx0XSlcblx0XVxufVxuXG5mdW5jdGlvbiB0YWJsZShzdGF0ZSkge1xuXHRyZXR1cm4gaCgndGFibGUnLCBbXG5cdFx0aCgndHInLCBbZGVmYXVsdEJ1dHRvbigpLCBmaXhlZEJ1dHRvbigpXSksXG5cdFx0aCgndHInLCBbZW1iZWRkZWRCdXR0b24oKSwgaW1hZ2VCdXR0b24oc3RhdGUpXSlcblx0XSlcbn1cblxuZnVuY3Rpb24gY29udGVudFdyYXBwZXIodGl0bGUsIGNvbnRlbnQpIHtcblx0cmV0dXJuIFt0aXRsZSwgaCgnZGl2LnUtcGFkZGluZ1RvcC0tMTUnLCBjb250ZW50KV1cbn1cblxudmFyIGNvbG9yID0gYXBwLm5vbnByb2ZpdC5icmFuZF9jb2xvciA/IGFwcC5ub25wcm9maXQuYnJhbmRfY29sb3IgOiAnIzQyQjNERidcbnZhciBmb250ID0gYXBwLm5vbnByb2ZpdC5icmFuZF9mb250ID8gYXBwLm5vbnByb2ZpdC5icmFuZF9mb250IDogJ2luaGVyaXQnXG52YXIgYnV0dG9uU3R5bGVzID0ge2JhY2tncm91bmQ6IGNvbG9yLCAnZm9udC1mYW1pbHknOiBmb250fVxuXG52YXIgbmFtZVByZWZpeCA9ICdzZXR0aW5ncy5hcHBlYXJhbmNlLidcblxuZnVuY3Rpb24gZGVmYXVsdEJ1dHRvbigpe1xuXHR2YXIgdGl0bGUgPSAnRGVmYXVsdCBidXR0b24nXG5cdHZhciBjb250ZW50ID0gWyBoKCdwLmJyYW5kZWQtZG9uYXRlLWJ1dHRvbicsIHtzdHlsZTogYnV0dG9uU3R5bGVzfSwgJ0RvbmF0ZScpLFxuXHRcdFx0YnJhbmRlZEJ1dHRvbk1lc3NhZ2UoKV1cblx0ZnVuY3Rpb24gYnJhbmRlZEJ1dHRvbk1lc3NhZ2UoKXtcblx0XHRpZihhcHAubm9ucHJvZml0LmJyYW5kX2NvbG9yKXtyZXR1cm59XG5cdFx0cmV0dXJuIGgoJ3AudS1wYWRkaW5nVG9wLS0xNScsXG5cdFx0XHRoKCdzbWFsbCcsIFwiVG8gY3VzdG9taXplIHRoZSBjb2xvciBhbmQgZm9udCBvZiB5b3VyIGJ1dHRvbiwgXFxcblx0XHRcdFx0aGVhZCBvdmVyIHRvIHlvdXIgc2V0dGluZ3MgcGFnZSBhbmQgY2xpY2sgb24gJ2JyYW5kaW5nJ1wiKVxuXHRcdClcblx0fVxuXHRyZXR1cm4gaCgndGQnLCBbcmFkaW9BbmRMYWJlbFdyYXBwZXIoJ3JhZGlvLWRlZmF1bHQnLCBuYW1lUHJlZml4ICsgJ25hbWUnLCB7J3ZhbHVlJzogJ2RlZmF1bHQnLCAnY2hlY2tlZCc6ICdjaGVja2VkJ30sXG5cdFx0Y29udGVudFdyYXBwZXIodGl0bGUsIGNvbnRlbnQpLCBhcHBlYXJhbmNlU3RyZWFtKV0pXG59XG5cbmZ1bmN0aW9uIGZpeGVkQnV0dG9uKCl7XG5cdHZhciB0aXRsZSA9ICdGaXhlZCBwb3NpdGlvbiBidXR0b24nXG5cdHZhciBjb250ZW50ID0gW2goJ3AuYnJhbmRlZC1kb25hdGUtYnV0dG9uLmlzLWZpeGVkJywge3N0eWxlOiBidXR0b25TdHlsZXN9LCAnRG9uYXRlJyldXG5cdHJldHVybiBoKCd0ZCcsIFtyYWRpb0FuZExhYmVsV3JhcHBlcigncmFkaW8tZml4ZWQnLCAgbmFtZVByZWZpeCArICduYW1lJywgeyd2YWx1ZSc6ICdmaXhlZCd9LFxuXHRcdGNvbnRlbnRXcmFwcGVyKHRpdGxlLCBjb250ZW50KSwgYXBwZWFyYW5jZVN0cmVhbSldKVxufVxuXG5mdW5jdGlvbiBlbWJlZGRlZEJ1dHRvbigpe1xuXHR2YXIgdGl0bGUgPSAnRW1iZWQgZGlyZWN0bHkgb24gcGFnZSdcblx0dmFyIGNvbnRlbnQgPSBbIGgoJ2ltZycsIHtzcmM6IGFwcC5hc3NldF9wYXRoICsgXCIvZ3JhcGhpY3MvbWluaS1hbW91bnQtc3RlcC5wbmdcIiwgdGl0bGU6IHRpdGxlfSldXG5cdHJldHVybiBoKCd0ZCcsIFtyYWRpb0FuZExhYmVsV3JhcHBlcigncmFkaW8tZW1iZWRkZWQnLCBuYW1lUHJlZml4ICsgJ25hbWUnLCB7J3ZhbHVlJzogJ2VtYmVkZGVkJ30sXG5cdFx0Y29udGVudFdyYXBwZXIodGl0bGUsIGNvbnRlbnQpLCBhcHBlYXJhbmNlU3RyZWFtKV0pXG59XG5cbmZ1bmN0aW9uIGltYWdlQnV0dG9uKHN0YXRlKXtcblx0dmFyIHRpdGxlID0gJ0N1c3RvbSBpbWFnZSdcblx0dmFyIGRlZmF1bHRJbWcgPSBhcHAuYXNzZXRfcGF0aCArIFwiL2dyYXBoaWNzL2RvbmF0ZS1lbGVwaGFudC5wbmdcIlxuXHR2YXIgaW1nVXJsID0gc3RhdGUuc2V0dGluZ3MuYXBwZWFyYW5jZS5jdXN0b21JbWcgPyBzdGF0ZS5zZXR0aW5ncy5hcHBlYXJhbmNlLmN1c3RvbUltZyA6IGRlZmF1bHRJbWdcblx0dmFyIGNvbnRlbnQgPSBbIGgoJ2ltZycsIHtzcmM6IGltZ1VybCwgdGl0bGU6IHRpdGxlfSksXG5cdFx0aCgnaW5wdXQnLCB7dHlwZTogJ3RleHQnLCBuYW1lOiBuYW1lUHJlZml4ICsgJ2N1c3RvbUltZycsIHBsYWNlaG9sZGVyOiAnQWRkIHlvdXIgaW1hZ2UgVVJMIGhlcmUnLCBvbmtleXVwOiBhcHBlYXJhbmNlU3RyZWFtfSldXG5cdHJldHVybiBoKCd0ZCcsIFtyYWRpb0FuZExhYmVsV3JhcHBlcigncmFkaW8tY3VzdG9tLWltYWdlJywgbmFtZVByZWZpeCArICduYW1lJywgeyd2YWx1ZSc6ICdjdXN0b20gaW1hZ2UnfSxcblx0XHRjb250ZW50V3JhcHBlcih0aXRsZSwgY29udGVudCksIGFwcGVhcmFuY2VTdHJlYW0pXSlcbn1cblxuZnVuY3Rpb24gY3VzdG9tVGV4dChzdGF0ZSkge1xuXHR2YXIgdGV4dCA9IHN0YXRlLnNldHRpbmdzLmFwcGVhcmFuY2UuY3VzdG9tVGV4dCA/IHN0YXRlLnNldHRpbmdzLmFwcGVhcmFuY2UuY3VzdG9tVGV4dCA6ICdEb25hdGUnXG5cdHZhciB0aXRsZSA9ICdDdXN0b20gdGV4dCdcblx0dmFyIGNvbnRlbnQgPSBbXG5cdFx0aCgnYS5jdXN0b21UZXh0LXRleHQnLCB0ZXh0KSxcblx0XHRoKCdpbnB1dCcsIHt0eXBlOiAndGV4dCcsIG5hbWU6IG5hbWVQcmVmaXggKyAnY3VzdG9tVGV4dCcsIHBsYWNlaG9sZGVyOiAnVHlwZSBoZXJlIHRvIGNoYW5nZSB0ZXh0Jywgb25rZXl1cDogYXBwZWFyYW5jZVN0cmVhbX0pXG5cdF1cblx0cmV0dXJuIGgoJ3NlY3Rpb24uY3VzdG9tVGV4dC13cmFwcGVyJywgW3JhZGlvQW5kTGFiZWxXcmFwcGVyKCdyYWRpby1jdXN0b20tdGV4dCcsICBuYW1lUHJlZml4ICsgJ25hbWUnLCB7J3ZhbHVlJzogJ2N1c3RvbSB0ZXh0J30sXG5cdFx0Y29udGVudFdyYXBwZXIodGl0bGUsIGNvbnRlbnQpLCBhcHBlYXJhbmNlU3RyZWFtKV0pXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvanMvbm9ucHJvZml0cy9idXR0b24vYXBwZWFyYW5jZS5qcyIsIi8vIExpY2Vuc2U6IExHUEwtMy4wLW9yLWxhdGVyXG52YXIgZmx5ZCA9IHJlcXVpcmUoXCJmbHlkXCIpXG52YXIgaCA9IHJlcXVpcmUoXCJ2aXJ0dWFsLWRvbS9oXCIpXG5cbnZhciBmb290ZXIgPSByZXF1aXJlKCcuL2Zvb3RlcicpXG52YXIgcmFkaW9BbmRMYWJlbFdyYXBwZXIgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL3JhZGlvLWFuZC1sYWJlbC13cmFwcGVyJylcblxudmFyIG5hbWVTdHJlYW0gPSBmbHlkLnN0cmVhbSgpXG52YXIgY291bnRTdHJlYW0gPSBmbHlkLnN0cmVhbSgpXG52YXIgaW5wdXRTdHJlYW0gPSBmbHlkLnN0cmVhbSgpXG5cblxuZmx5ZC5tYXAoZnVuY3Rpb24oa2V5dXApe1xuXHRrZXl1cC50YXJnZXQudmFsdWUgPSBrZXl1cC50YXJnZXQudmFsdWUucmVwbGFjZSgvWyZcIl8qYCd+XS9nLCBcIlwiKVxufSwgaW5wdXRTdHJlYW0pXG5cblxudmFyIG5hbWVQcmVmaXggPSAnc2V0dGluZ3MuZGVzaWduYXRpb25zLidcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdHJvb3Q6IHJvb3QsXG5cdHN0cmVhbXM6IHtcblx0XHRuYW1lOiAgZmx5ZC5tZXJnZShuYW1lU3RyZWFtLCBpbnB1dFN0cmVhbSksXG5cdFx0Y291bnQ6IGNvdW50U3RyZWFtXG5cdH1cbn1cblxuZnVuY3Rpb24gcm9vdChzdGF0ZSkge1xuXHRyZXR1cm4gW1xuXHRcdGgoJ2hlYWRlci5zdGVwLWhlYWRlcicsIGgoJ2g0LnN0ZXAtdGl0bGUnLCAnRGVzaWduYXRpb25zJykpLFxuXHRcdGgoJ2Rpdi5zdGVwLWlubmVyJyxcblx0XHRcdFtcblx0XHRcdFx0Ym9keShzdGF0ZSksXG5cdFx0XHRcdGZvb3Rlci5yb290KCdOZXh0JywgJ2Ftb3VudHMnKVxuXHRcdFx0XSlcblx0XHRdXG59XG5cbmZ1bmN0aW9uIGJvZHkoc3RhdGUpe1xuXHR2YXIgZGVzaWdzID0gc3RhdGUuc2V0dGluZ3MuZGVzaWduYXRpb25zXG5cdHJldHVybiBbbWVudSgpLFxuXHRpbnB1dChkZXNpZ3MpLFxuXHRpbnB1dHMoZGVzaWdzKV1cbn1cblxuZnVuY3Rpb24gbWVudSgpe1xuXHRyZXR1cm4gaCgnYXNpZGUnLFtcblx0XHRyYWRpb0FuZExhYmVsV3JhcHBlcigncmFkaW8tbm8tZGVzaWduYXRpb25zJywgbmFtZVByZWZpeCArICduYW1lJywgeydjaGVja2VkJzogJ2NoZWNrZWQnLCAndmFsdWUnOiAnJ30sXG5cdFx0XHRbXCJJIHdhbnQgXCIsIGgoJ3N0cm9uZycsICdubycpLCBcIiBkZXNpZ25hdGlvbi5cIl0sIG5hbWVTdHJlYW0pLFxuXHRcdHJhZGlvQW5kTGFiZWxXcmFwcGVyKCdyYWRpby1zaW5nbGUtZGVzaWduYXRpb25zJywgIG5hbWVQcmVmaXggKyAnbmFtZScsIHsndmFsdWUnOiAnc2luZ2xlJ30sXG5cdFx0XHRbXCJJIHdhbnQgYSBcIiwgaCgnc3Ryb25nJywgJ3NpbmdsZSwgIHByZXNldCcpLCAgXCIgZGVzaWduYXRpb24uXCJdLCBuYW1lU3RyZWFtKSxcblx0XHRyYWRpb0FuZExhYmVsV3JhcHBlcigncmFkaW8tbXVsdGlwbGUtZGVzaWduYXRpb25zJywgIG5hbWVQcmVmaXggKyAnbmFtZScsIHsndmFsdWUnOiAnbXVsdGlwbGUnfSxcblx0XHRcdFtcIkkgd2FudCBkb25vcnMgdG8gYmUgYWJsZSB0byBzZWxlY3QgZnJvbSBcIiwgaCgnc3Ryb25nJywgJ211bHRpcGxlJyksICBcIiBkZXNpZ25hdGlvbnMgKHVwIHRvIDIwKS5cIl0sIG5hbWVTdHJlYW0pLFxuXHRdKVxufVxuXG5mdW5jdGlvbiBpbnB1dChkZXNpZ3Mpe1xuXHRyZXR1cm4gaCgnaW5wdXQudS1tYXJnaW5Ub3AtLTE1LmlucHV0LS00MDAnLFxuXHRcdHtwbGFjZWhvbGRlcjogJ0Rlc2lnbmF0aW9uIG5hbWUnLCBhdHRyaWJ1dGVzOiB7J21heGxlbmd0aCc6IDUwfSwgbmFtZTogbmFtZVByZWZpeCArICdzaW5nbGUnLCBzdHlsZToge2Rpc3BsYXk6IGRlc2lncy5uYW1lID09PSAnc2luZ2xlJyA/ICdibG9jaycgOiAnbm9uZSd9LFxuXHRcdFx0b25jaGFuZ2U6IGlucHV0U3RyZWFtXG5cdFx0fVxuXHQpXG59XG5cbmZ1bmN0aW9uIGlucHV0cyhkZXNpZ3Mpe1xuXHR2YXIgcHJvbXB0ID0gW2goJ3AucGFzdGVsQm94LS1ncmVlbi51LXBhZGRpbmctLTEwLnUtbWFyZ2luWS0tMTAnLCAnSWYgeW91IHdvdWxkIGxpa2UgdG8gYWRkIGEgY3VzdG9tIHByb21wdCB0byB5b3VyIGRvbm9ycywgXFxcblx0XHRwbGVhc2UgZW50ZXIgaXQgYmVsb3cuIEV4YW1wbGU6IFwiV2hpY2ggcmFkaW8gc2hvdyB3b3VsZCB5b3UgbGlrZSB0byBkb25hdGUgdG8/XCIuICBUaGUgZGVmYXVsdCBwcm9tcHQgaXMgXCJQbGVhc2Ugc2VsZWN0IGEgZGVzaWduYXRpb25cIi4nKSxcblx0XHRcdGgoJ2lucHV0LnUtbWFyZ2luVG9wLS0xMC5pbnB1dC0tNDAwJyxcblx0XHRcdHtwbGFjZWhvbGRlcjogJ1Byb21wdCB0byBkb25vcnMnLCBhdHRyaWJ1dGVzOiB7J21heGxlbmd0aCc6IDUwfSwgbmFtZTogbmFtZVByZWZpeCArICdwcm9tcHQnLCBvbmtleXVwOiBpbnB1dFN0cmVhbX0pXG5cdFx0XVxuXHR2YXIgaW5wdXRzID0gW11cblx0Zm9yKHZhciBpID0gMDsgaSA8IGRlc2lncy5jb3VudDsgaSsrKSB7XG5cdFx0aW5wdXRzLnB1c2goaCgnbGknLCBoKCdpbnB1dC5pbnB1dC0tNDAwJywge2F0dHJpYnV0ZXM6IHsnbWF4bGVuZ3RoJzogNTB9LCBwbGFjZWhvbGRlcjogJ0Rlc2lnbmF0aW9uIG5hbWUnLCBuYW1lOiBuYW1lUHJlZml4ICsgJ211bHRpcGxlcy4nICsgaSwgb25jaGFuZ2U6IGlucHV0U3RyZWFtfSkpKVxuXHR9XG5cdHJldHVybiBoKCdkaXYnLCB7c3R5bGU6IHtkaXNwbGF5OiBkZXNpZ3MubmFtZSA9PT0gJ211bHRpcGxlJyA/ICdibG9jaycgOiAnbm9uZSd9fSwgW1xuXHRcdHByb21wdCxcblx0XHRoKCdwLnBhc3RlbEJveC0tYmx1ZS51LXBhZGRpbmctLTEwLnUtbWFyZ2luWS0tMTAnLCAnRW50ZXIgeW91ciBkZXNpZ25hdGlvbnMgYmVsb3cuJyksXG5cdFx0aCgnb2wnLCAgW1xuXHRcdFx0aW5wdXRzLFxuXHRcdFx0aCgnYS5idXR0b24tLXRpbnkuZWRpdCcsIHtvbmNsaWNrOiBjb3VudFN0cmVhbSwgYXR0cmlidXRlczogaXNEaXNhYmxlZChkZXNpZ3MuY291bnQpfSwgW2goJ2kuZmEuZmEtcGx1cycpLCAnIEFkZCBhbm90aGVyIGRlc2lnbmF0aW9uJ10pLFxuXHRcdF0pXG5cdF0pXG59XG5cbmZ1bmN0aW9uIGlzRGlzYWJsZWQoY291bnQpeyBpZihjb3VudCA+PSAyMCl7cmV0dXJuIHsnZGlzYWJsZWQnIDogJyd9fX1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2pzL25vbnByb2ZpdHMvYnV0dG9uL2Rlc2lnbmF0aW9ucy5qcyIsIi8vIExpY2Vuc2U6IExHUEwtMy4wLW9yLWxhdGVyXG52YXIgZmx5ZCA9IHJlcXVpcmUoXCJmbHlkXCIpXG52YXIgaCA9IHJlcXVpcmUoXCJ2aXJ0dWFsLWRvbS9oXCIpXG5cbnZhciBmb290ZXIgPSByZXF1aXJlKCcuL2Zvb3RlcicpXG52YXIgcmFkaW9BbmRMYWJlbFdyYXBwZXIgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL3JhZGlvLWFuZC1sYWJlbC13cmFwcGVyJylcblxudmFyIG5hbWVQcmVmaXggPSAnc2V0dGluZ3MuYW1vdW50cy4nXG5cbnZhciBuYW1lU3RyZWFtID0gZmx5ZC5zdHJlYW0oKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtyb290OiByb290LCBzdHJlYW06IG5hbWVTdHJlYW19XG5cbmZ1bmN0aW9uIHJvb3Qoc3RhdGUpIHtcblx0cmV0dXJuIFtcblx0XHRoKCdoZWFkZXIuc3RlcC1oZWFkZXInLCBbaCgnaDQuc3RlcC10aXRsZScsICdBbW91bnRzJyldKSxcblx0XHRib2R5KHN0YXRlKVxuXHRdXG59XG5cbmZ1bmN0aW9uIGJvZHkoc3RhdGUpe1xuXHRyZXR1cm4gaCgnZGl2LnN0ZXAtaW5uZXInLCBbXG5cdFx0bWVudSgpLFxuXHRcdHNpbmdsZUlucHV0KHN0YXRlKSxcblx0XHRtdWx0aXBsZUlucHV0cyhzdGF0ZSksXG5cdFx0Zm9vdGVyLnJvb3QoJ05leHQnLCAndHlwZScpXG5cdF0pXG59XG5cbmZ1bmN0aW9uIG1lbnUoKSB7XG5cdHJldHVybiBoKCdzZWN0aW9uJyxbXG5cdFx0cmFkaW9BbmRMYWJlbFdyYXBwZXIoJ3JhZGlvLW11bHRpcGxlLWFtb3VudHMnLCBuYW1lUHJlZml4ICsgJ25hbWUnLCB7J2NoZWNrZWQnOiAnY2hlY2tlZCcsICd2YWx1ZSc6ICdtdWx0aXBsZSd9LFxuXHRcdFx0W1wiSSB3YW50IGRvbm9ycyB0byBiZSBhYmxlIHRvIHNlbGVjdCBmcm9tIFwiLCBoKCdzdHJvbmcnLCAnbXVsdGlwbGUnKSwgXCIgYW1vdW50cy5cIl0sIG5hbWVTdHJlYW0pLFxuXHRcdHJhZGlvQW5kTGFiZWxXcmFwcGVyKCdyYWRpby1zaW5nbGUtYW1vdW50JywgbmFtZVByZWZpeCArICduYW1lJywgeyd2YWx1ZSc6ICdzaW5nbGUnfSxcblx0XHRcdFtcIkkgd2FudCBhIFwiLCBoKCdzdHJvbmcnLCAnc2luZ2xlLCBwcmVzZXQnKSwgXCIgYW1vdW50LlwiXSwgbmFtZVN0cmVhbSksXG5cdF0pXG59XG5cbmZ1bmN0aW9uIGlucHV0KHZhbHVlLCBrZXkpIHtcblx0cmV0dXJuIGgoJ3NwYW4ucHJlcGVuZC0tZG9sbGFyJyxcblx0XHRoKCdpbnB1dC5pbnB1dC0tMjAwJywge25hbWU6IG5hbWVQcmVmaXggKyBrZXksIHZhbHVlOiB2YWx1ZSwgb25jaGFuZ2U6IG5hbWVTdHJlYW19KVxuXHQpXG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlJZihzdGF0ZSwgbWF0Y2hlcikge1xuXHRyZXR1cm4gc3RhdGUuc2V0dGluZ3MuYW1vdW50cy5uYW1lID09PSBtYXRjaGVyID8gJ2Jsb2NrJyA6ICdub25lJ1xufVxuXG5mdW5jdGlvbiBzaW5nbGVJbnB1dChzdGF0ZSkge1xuXHRyZXR1cm4gaCgnZGl2LnUtbWFyZ2luVG9wLS0xNScsIHtzdHlsZToge2Rpc3BsYXk6IGRpc3BsYXlJZihzdGF0ZSwgJ3NpbmdsZScpfX0sIGlucHV0KHN0YXRlLnNldHRpbmdzLmFtb3VudHMuc2luZ2xlLCAnc2luZ2xlJykpXG59XG5cbmZ1bmN0aW9uIG11bHRpcGxlSW5wdXRzKHN0YXRlKSB7XG5cdHZhciBtdWx0aXBsZXMgPSBzdGF0ZS5zZXR0aW5ncy5hbW91bnRzLm11bHRpcGxlc1xuXHR2YXIgaW5wdXRzID0gW11cblx0Zm9yICh2YXIga2V5IGluIG11bHRpcGxlcykge1xuXHRcdGlucHV0cy5wdXNoKGlucHV0KG11bHRpcGxlc1trZXldLCAnbXVsdGlwbGVzLicgKyBrZXkpKVxuXHR9XG5cdHJldHVybiBoKCdzZWN0aW9uLmxheW91dC0tdGhyZWUudS1tYXJnaW5Ub3AtLTE1Jywge3N0eWxlOiB7ZGlzcGxheTogZGlzcGxheUlmKHN0YXRlLCAnbXVsdGlwbGUnKX19LCBpbnB1dHMpXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvanMvbm9ucHJvZml0cy9idXR0b24vYW1vdW50cy5qcyIsIi8vIExpY2Vuc2U6IExHUEwtMy4wLW9yLWxhdGVyXG52YXIgZmx5ZCA9IHJlcXVpcmUoXCJmbHlkXCIpXG52YXIgaCA9IHJlcXVpcmUoXCJ2aXJ0dWFsLWRvbS9oXCIpXG52YXIgZm9vdGVyID0gcmVxdWlyZSgnLi9mb290ZXInKVxudmFyIHJhZGlvQW5kTGFiZWxXcmFwcGVyID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9yYWRpby1hbmQtbGFiZWwtd3JhcHBlcicpXG5cbnZhciBuYW1lUHJlZml4ID0gJ3NldHRpbmdzLnR5cGUuJ1xuXG52YXIgbmFtZVN0cmVhbSA9IGZseWQuc3RyZWFtKClcblxubW9kdWxlLmV4cG9ydHMgPSB7cm9vdDogcm9vdCwgc3RyZWFtOiBuYW1lU3RyZWFtfVxuXG5mdW5jdGlvbiByb290KCkge1xuXHRyZXR1cm4gW1xuXHRcdGgoJ2hlYWRlci5zdGVwLWhlYWRlcicsIFtoKCdoNC5zdGVwLXRpdGxlJywgJ1JlY3VycmluZyBvciBPbmUtVGltZScpXSksXG5cdFx0Ym9keSgpXG5cdF1cbn1cblxuZnVuY3Rpb24gYm9keSgpe1xuXHRyZXR1cm4gaCgnZGl2LnN0ZXAtaW5uZXInLCBbXG5cdFx0bWVudSgpLFxuXHRcdGZvb3Rlci5yb290KCdOZXh0JywgJ2hpZGVEZWRpY2F0aW9uJylcblx0XSlcbn1cblxuZnVuY3Rpb24gbWVudSgpIHtcblx0dmFyIHJlY3VycmluZ0ltZyA9IGgoJ2ltZycsIHtzcmM6IGFwcC5hc3NldF9wYXRoICsgXCIvZ3JhcGhpY3MvcmVjdXJyaW5nLnN2Z1wifSlcblx0dmFyIG9uZVRpbWVJbWcgPSBoKCdpbWcnLCB7c3JjOiBhcHAuYXNzZXRfcGF0aCArIFwiL2dyYXBoaWNzL29uZS10aW1lLnN2Z1wifSlcblx0dmFyIG1lc3NhZ2UgPSBcIldlIGhpZ2hseSByZWNvbW1lbmQgdGhhdCB5b3UgYWNjZXB0IHJlY3VycmluZyBkb25hdGlvbnMgd2hlbmV2ZXIgcG9zc2libGUuIFRoZXkgYXJlIGEgZ3JlYXQgc291cmNlIG9mIHJlY3VycmluZyByZXZlbnVlIVwiXG5cblx0cmV0dXJuIGgoJ3NlY3Rpb24nLFtcblx0XHRoKCdwJywgbWVzc2FnZSksXG5cdFx0cmFkaW9BbmRMYWJlbFdyYXBwZXIoJ3JhZGlvLXR5cGUtYm90aCcsIG5hbWVQcmVmaXggKyAnbmFtZScsIHsnY2hlY2tlZCc6ICdjaGVja2VkJywgJ3ZhbHVlJzogJ2JvdGgnfSxcblx0XHRcdFtcIlJlY3VycmluZyBcIiwgaCgnc3Ryb25nJywgJ2FuZCcpLCBcIiBvbmUgdGltZS5cIiwgcmVjdXJyaW5nSW1nLCBvbmVUaW1lSW1nXSwgbmFtZVN0cmVhbSksXG5cdFx0cmFkaW9BbmRMYWJlbFdyYXBwZXIoJ3JhZGlvLXR5cGUtb25lVGltZScsIG5hbWVQcmVmaXggKyAnbmFtZScsIHsndmFsdWUnOiAnb25lIHRpbWUnfSxcblx0XHRcdFtoKCdzdHJvbmcnLCAnT25seSAnKSwgXCIgb25lIHRpbWUuXCIsIG9uZVRpbWVJbWddLCBuYW1lU3RyZWFtKSxcblx0XHRyYWRpb0FuZExhYmVsV3JhcHBlcigncmFkaW8tdHlwZS1yZWN1cnJpbmcnLCBuYW1lUHJlZml4ICsgJ25hbWUnLCB7J3ZhbHVlJzogJ3JlY3VycmluZyd9LFxuXHRcdFx0W2goJ3N0cm9uZycsICdPbmx5ICcpLCBcIiByZWN1cnJpbmcuXCIsIHJlY3VycmluZ0ltZ10sIG5hbWVTdHJlYW0pLFxuXHRdKVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2pzL25vbnByb2ZpdHMvYnV0dG9uL3R5cGUuanMiLCIvLyBMaWNlbnNlOiBMR1BMLTMuMC1vci1sYXRlclxudmFyIGZseWQgPSByZXF1aXJlKFwiZmx5ZFwiKVxudmFyIGggPSByZXF1aXJlKFwidmlydHVhbC1kb20vaFwiKVxuXG52YXIgZm9vdGVyID0gcmVxdWlyZSgnLi9mb290ZXInKVxuXG52YXIgaGlkZVN0cmVhbSA9IGZseWQuc3RyZWFtKClcblxudmFyIG5hbWUgPSAnaGlkZURlZGljYXRpb24nXG5cbm1vZHVsZS5leHBvcnRzID0ge3Jvb3Q6IHJvb3QsIHN0cmVhbTogaGlkZVN0cmVhbX1cblxuZnVuY3Rpb24gcm9vdChzdGF0ZSkge1xuXHRyZXR1cm4gW1xuXHRcdGgoJ2hlYWRlci5zdGVwLWhlYWRlcicsIFtoKCdoNC5zdGVwLXRpdGxlJywgJ0hpZGUgZGVkaWNhdGlvbiAob3B0aW9uYWwpJyldKSxcblx0XHRoKCdkaXYuc3RlcC1pbm5lcicsIFtcblx0XHRcdGJvZHkoKSxcblx0XHRcdGZvb3Rlci5yb290KCdOZXh0JywgJ3RoYW5rWW91Jylcblx0XHRdKVxuXHRdXG59XG5cbmZ1bmN0aW9uIGJvZHkoKSB7XG5cdHZhciBtZXNzYWdlID0gXCJJZiB5b3UgZG9uJ3Qgd2FudCB0byBnaXZlIHlvdXIgZG9ub3JzIHRoZSBvcHRpb24gdG8gc2V0IGEgZGVkaWNhdGlvbiwgY2xpY2sgdGhlIGNoZWNrYm94IGJlbG93LlwiXG5cblx0cmV0dXJuIFtoKCdwLnUtbWFyZ2luQm90dG9tLS0yMCcsIG1lc3NhZ2UpLFxuXHRcdGgoJ2lucHV0LnUtbWFyZ2luVG9wLS0xMCcsXG4gICAgICB7aWQ6IG5hbWUgKyAnLWNoZWNrYm94JywgdHlwZTogJ2NoZWNrYm94JywgbmFtZTogJ3NldHRpbmdzLicgKyBuYW1lLCBvbmNoYW5nZTogaGlkZVN0cmVhbX0pLFxuICAgIGgoJ2xhYmVsLnUtYm9sZCcsIHthdHRyaWJ1dGVzOiB7Zm9yOiBuYW1lICsgJy1jaGVja2JveCd9fSwgJ0hpZGUgZGVkaWNhdGlvbicpXG5cdF1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9qcy9ub25wcm9maXRzL2J1dHRvbi9oaWRlLWRlZGljYXRpb24uanMiLCIvLyBMaWNlbnNlOiBMR1BMLTMuMC1vci1sYXRlclxudmFyIGZseWQgPSByZXF1aXJlKFwiZmx5ZFwiKVxudmFyIGggPSByZXF1aXJlKFwidmlydHVhbC1kb20vaFwiKVxuXG52YXIgZm9vdGVyID0gcmVxdWlyZSgnLi9mb290ZXInKVxuXG52YXIgbmFtZVByZWZpeCA9ICdzZXR0aW5ncy50aGFua1lvdS4nXG5cbnZhciB1cmxTdHJlYW0gPSBmbHlkLnN0cmVhbSgpXG5cbm1vZHVsZS5leHBvcnRzID0ge3Jvb3Q6IHJvb3QsIHN0cmVhbTogdXJsU3RyZWFtfVxuXG5mdW5jdGlvbiByb290KHN0YXRlKSB7XG5cdHJldHVybiBbXG5cdFx0aCgnaGVhZGVyLnN0ZXAtaGVhZGVyJywgaCgnaDQuc3RlcC10aXRsZScsICdUaGFuay15b3UgcGFnZSAob3B0aW9uYWwpJykpLFxuXHRcdGgoJ2Rpdi5zdGVwLWlubmVyJywgW1xuXHRcdFx0Ym9keSgpLFxuXHRcdFx0Zm9vdGVyLnJvb3QoJ05leHQnLCAncHJldmlldycpXG5cdFx0XSlcblx0XVxufVxuXG5mdW5jdGlvbiBib2R5KCkge1xuXHR2YXIgbWVzc2FnZSA9IFwiWW91IGNhbiBwcm92aWRlIGEgY3VzdG9tIFVSTCB0byB5b3VyIG93biB0aGFuay15b3UgcGFnZS4gWW91ciBkb25vcnMgd2lsbCBiZSBkaXJlY3RlZCB0byB0aGlzIHBhZ2Ugd2hlbiB0aGV5IGNvbXBsZXRlIHRoZSBkb25hdGlvbi4gQmUgc3VyZSB0byBpbmNsdWRlIHRoZSAnaHR0cDovLycgb3IgJ2h0dHBzOi8vJyBwYXJ0IG9mIHlvdXIgdXJsLlwiXG5cblx0cmV0dXJuIFtoKCdwJywgbWVzc2FnZSksXG5cdFx0aCgnaW5wdXQudS1tYXJnaW5Ub3AtLTEwJywge3R5cGU6ICd1cmwnLCBwbGFjZWhvbGRlcjogJ1R5cGUgeW91ciB0aGFuay15b3UgcGFnZSBVUkwgaGVyZScsIG5hbWU6IG5hbWVQcmVmaXggKyAndXJsJywgb25jaGFuZ2U6IHVybFN0cmVhbX0pXG5cdF1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9qcy9ub25wcm9maXRzL2J1dHRvbi90aGFuay15b3UuanMiLCIvLyBMaWNlbnNlOiBMR1BMLTMuMC1vci1sYXRlclxudmFyIGZseWQgPSByZXF1aXJlKFwiZmx5ZFwiKVxudmFyIGggPSByZXF1aXJlKFwidmlydHVhbC1kb20vaFwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtyb290OiByb290fVxuXG5mdW5jdGlvbiByb290KHN0YXRlKSB7XG5cdHJldHVybiBbXG5cdFx0aCgnaGVhZGVyLnN0ZXAtaGVhZGVyJywgaCgnaDQuc3RlcC10aXRsZScsICdQcmV2aWV3JykpLFxuXHRcdGgoJ2Rpdi5zdGVwLWlubmVyJywgW1xuXHRcdFx0Ym9keShzdGF0ZS5zZXR0aW5ncylcblx0XHRdKVxuXHRdXG59XG5cbmZ1bmN0aW9uIGJvZHkoc2V0dGluZ3Mpe1xuXHRpZihzZXR0aW5ncy5kZXNpZ25hdGlvbnMubmFtZSA9PT0gJ211bHRpcGxlJyl7XG5cdFx0c2V0dGluZ3MuZGVzaWduYXRpb25zLm11bHRpcGxlcyA9IG9ialRvQXJyYXkoc2V0dGluZ3MuZGVzaWduYXRpb25zLm11bHRpcGxlcylcblx0fVxuXHRpZihzZXR0aW5ncy5hbW91bnRzLm5hbWUgPT09ICdtdWx0aXBsZScpIHtcblx0XHRzZXR0aW5ncy5hbW91bnRzLm11bHRpcGxlcyA9IG9ialRvQXJyYXkoc2V0dGluZ3MuYW1vdW50cy5tdWx0aXBsZXMpXG5cdH1cblx0cmV0dXJuIFtcblx0XHRoKCdwLnN0cm9uZy51LWNlbnRlcmVkJywgJ0JlbG93IGlzIGEgbGl2ZSBwcmV2aWV3IG9mIHlvdXIgZG9uYXRlIGZvcm0nKSxcblx0XHRkb25hdGVCdXR0b24oc2V0dGluZ3MpLFxuXHRcdHRhYmxlKHNldHRpbmdzKVxuXHRdXG59XG5cbmZ1bmN0aW9uIHRhYmxlKHNldHRpbmdzKSB7XG5cdHZhciB0YWJsZSA9IGgoJ3RhYmxlLnRhYmxlLS1wbGFpZCcsW1xuXHRcdGgoJ3RyJywgW2goJ3RkJywgJ0FwcGVhcmFuY2UnKSwgYXBwZWFyYW5jZVRkKHNldHRpbmdzLmFwcGVhcmFuY2UpXSksXG5cdFx0c2luZ2xlT3JNdWx0aXBsZVJvdyhzZXR0aW5ncy5kZXNpZ25hdGlvbnMsICdEZXNpZ25hdGlvbicpLFxuXHRcdHNpbmdsZU9yTXVsdGlwbGVSb3coc2V0dGluZ3MuYW1vdW50cywgJ0Ftb3VudCcpLFxuXHRcdGgoJ3RyJywgW2goJ3RkJywgJ1JlY3VycmluZyBvciBvbmUtdGltZScpLCBoKCd0ZCcsIHNldHRpbmdzLnR5cGUubmFtZSldKSxcbiAgICBoKCd0cicsIFtoKCd0ZCcsICdIaWRlIGRlZGljYXRpb24nKSwgaCgndGQnLCBpZkFueShzZXR0aW5ncy5oaWRlRGVkaWNhdGlvbiA/ICd0cnVlJyA6ICBoKCdzcGFuLnUtY29sb3ItLWdyZXknLCAnZmFsc2UnKSkpXSksXG5cdFx0aCgndHInLCBbaCgndGQnLCAnVGhhbmsteW91IHBhZ2UgdXJsJyksIGgoJ3RkJywgaWZBbnkoc2V0dGluZ3MudGhhbmtZb3UudXJsKSldKSxcblx0XSlcblx0cmV0dXJuIHRhYmxlXG59XG5cbmZ1bmN0aW9uIGFwcGVhcmFuY2VUZChkYXRhKSB7XG5cdGlmKGRhdGEubmFtZSA9PT0gJ2N1c3RvbSBpbWFnZScpIHtcblx0XHRyZXR1cm4gaCgndGQnLCBbZGF0YS5uYW1lLCBoKCdwLnUtY29sb3ItLWdyZXknLCBkYXRhLmN1c3RvbUltZyldKVxuXHR9XG5cdGlmKGRhdGEubmFtZSA9PT0gJ2N1c3RvbSB0ZXh0Jykge1xuXHRcdHJldHVybiBoKCd0ZCcsIFtkYXRhLm5hbWUsIGgoJ3AudS1jb2xvci0tZ3JleScsIGRhdGEuY3VzdG9tVGV4dCldKVxuXHR9XG5cdHJldHVybiBoKCd0ZCcsIGRhdGEubmFtZSlcbn1cblxuZnVuY3Rpb24gc2luZ2xlT3JNdWx0aXBsZVJvdyhvYmosIHRleHQpIHtcblx0aWYob2JqLm5hbWUgPT09ICdzaW5nbGUnKXtcblx0XHRyZXR1cm4gaCgndHInLCBbaCgndGQnLCB0ZXh0KSwgaCgndGQnLCBvYmouc2luZ2xlKz0nJyldKVxuXHR9XG5cdGlmKG9iai5uYW1lID09PSAnbXVsdGlwbGUnKXtcblx0XHRyZXR1cm4gaCgndHInLCBbaCgndGQnLCB0ZXh0ICsgJ3MnKSwgaCgndGQnLCBhcnJheVRvTGlzdChvYmoubXVsdGlwbGVzKSldKVxuXHR9XG5cdHJldHVybiBoKCd0cicsIFtoKCd0ZCcsIHRleHQpLCBoKCd0ZCcsIGgoJ3NwYW4udS1jb2xvci0tZ3JleScsICdub25lJykpXSlcbn1cblxuZnVuY3Rpb24gZG9uYXRlQnV0dG9uKHNldHRpbmdzKSB7XG5cdHJldHVybiBoKCdkaXYudS1jZW50ZXJlZC51LW1hcmdpbi0tMjAnLCB7aWQ6ICdqcy1kb25hdGVCdXR0b25XcmFwcGVyJ30sXG5cdFx0aCgnYS5jb21taXRjaGFuZ2UtZG9uYXRlJywge2F0dHJpYnV0ZXM6IGJ1dHRvbkF0dHJpYnV0ZXMoc2V0dGluZ3MpfSxcblx0XHRcdFtidXR0b25Db250ZW50KHNldHRpbmdzLmFwcGVhcmFuY2UpXVxuXHRcdClcblx0KVxufVxuXG5mdW5jdGlvbiBidXR0b25BdHRyaWJ1dGVzKHNldHRpbmdzKSB7XG5cdHZhciBhcHBlYXJhbmNlID0gc2V0dGluZ3MuYXBwZWFyYW5jZS5uYW1lXG5cdHZhciBhdHRycyA9IHt9XG5cdGlmKGFwcGVhcmFuY2UgPT09ICdjdXN0b20gaW1hZ2UnIHx8IGFwcGVhcmFuY2UgPT09ICdjdXN0b20gdGV4dCcpIHtcblx0XHRhdHRyc1snZGF0YS1jdXN0b20nXSA9ICcnXG5cdH1cblx0aWYgKGFwcGVhcmFuY2UgPT09ICdmaXhlZCcpIHtcblx0XHRhdHRyc1snZGF0YS1maXhlZCddID0gJydcblx0fVxuXHRpZiAoYXBwZWFyYW5jZSA9PT0gJ2VtYmVkZGVkJyl7XG5cdFx0YXR0cnNbJ2RhdGEtZW1iZWRkZWQnXSA9ICcnXG5cdH1cblx0aWYgKHNldHRpbmdzLmRlc2lnbmF0aW9ucy5uYW1lID09PSAnc2luZ2xlJyAmJiBzZXR0aW5ncy5kZXNpZ25hdGlvbnMuc2luZ2xlKSB7XG5cdFx0YXR0cnNbJ2RhdGEtZGVzaWduYXRpb24nXSA9IHNldHRpbmdzLmRlc2lnbmF0aW9ucy5zaW5nbGVcblx0fVxuXHRpZiAoc2V0dGluZ3MuZGVzaWduYXRpb25zLm5hbWUgPT09ICdtdWx0aXBsZScgJiYgc2V0dGluZ3MuZGVzaWduYXRpb25zLm11bHRpcGxlcy5sZW5ndGgpIHtcblx0XHRhdHRyc1snZGF0YS1tdWx0aXBsZS1kZXNpZ25hdGlvbnMnXSA9IGFycmF5VG9TdHJpbmdXaXRoU2VwYXJhdG9yKHNldHRpbmdzLmRlc2lnbmF0aW9ucy5tdWx0aXBsZXMsICdfJylcblx0fVxuXHRpZiAoc2V0dGluZ3MuZGVzaWduYXRpb25zLm5hbWUgPT09ICdtdWx0aXBsZScgJiYgc2V0dGluZ3MuZGVzaWduYXRpb25zLnByb21wdCkge1xuXHRcdGF0dHJzWydkYXRhLWRlc2lnbmF0aW9ucy1wcm9tcHQnXSA9IHNldHRpbmdzLmRlc2lnbmF0aW9ucy5wcm9tcHRcblx0fVxuXHRpZiAoc2V0dGluZ3MuYW1vdW50cy5uYW1lID09PSAnc2luZ2xlJyAmJiBzZXR0aW5ncy5hbW91bnRzLnNpbmdsZSkge1xuXHRcdGF0dHJzWydkYXRhLWFtb3VudCddID0gc2V0dGluZ3MuYW1vdW50cy5zaW5nbGVcblx0fVxuXHRpZiAoc2V0dGluZ3MuYW1vdW50cy5uYW1lID09PSAnbXVsdGlwbGUnICYmIHNldHRpbmdzLmFtb3VudHMubXVsdGlwbGVzLmxlbmd0aCkge1xuXHRcdGF0dHJzWydkYXRhLWFtb3VudHMnXSA9IGFycmF5VG9TdHJpbmdXaXRoU2VwYXJhdG9yKHNldHRpbmdzLmFtb3VudHMubXVsdGlwbGVzLCAnLCcpXG5cdH1cblx0aWYgKHNldHRpbmdzLnRoYW5rWW91LnVybCkge1xuXHRcdGF0dHJzWydkYXRhLXJlZGlyZWN0J10gPSBzZXR0aW5ncy50aGFua1lvdS51cmxcblx0fVxuXHRpZiAoc2V0dGluZ3MudHlwZS5uYW1lID09PSAnb25lIHRpbWUnKSB7XG5cdFx0YXR0cnNbJ2RhdGEtdHlwZSddID0gJ29uZS10aW1lJ1xuXHR9XG5cdGlmIChzZXR0aW5ncy50eXBlLm5hbWUgPT09ICdyZWN1cnJpbmcnKSB7XG5cdFx0YXR0cnNbJ2RhdGEtdHlwZSddID0gJ3JlY3VycmluZydcblx0fVxuICBpZiAoc2V0dGluZ3MuaGlkZURlZGljYXRpb24pIHtcbiAgICBhdHRyc1snZGF0YS1oaWRlLWRlZGljYXRpb24nXSA9ICcnXG4gIH1cblx0cmV0dXJuIGF0dHJzXG59XG5cblxuZnVuY3Rpb24gYnV0dG9uQ29udGVudChkYXRhKSB7XG5cdGlmIChkYXRhLm5hbWUgPT09ICdjdXN0b20gaW1hZ2UnKSB7XG5cdFx0cmV0dXJuIGgoJ2ltZycsIHtzcmM6IGRhdGEuY3VzdG9tSW1nfSlcblx0fVxuXHRpZiAoZGF0YS5uYW1lID09PSAnY3VzdG9tIHRleHQnKSB7XG5cdFx0cmV0dXJuIGgoJ3NwYW4nLCBkYXRhLmN1c3RvbVRleHQpXG5cdH1cbn1cblxuLy8gdG9kbzogYWRkIHRvIGhlbHBlcnMgb3IgbWFrZSBnbG9iYWwgb25jZSB3ZSBtb3ZlIGF3YXkgZnJvbSB2aWV3LXNjcmlwdFxuXG5mdW5jdGlvbiBhcnJheVRvU3RyaW5nV2l0aFNlcGFyYXRvcihhcnJheSwgc2VwYXJhdG9yKSB7XG5cdHJldHVybiBhcnJheS5yZWR1Y2UoZnVuY3Rpb24ocHJldiwgY3VycmVudCl7XG5cdFx0cmV0dXJuIHByZXYgKyBzZXBhcmF0b3IgKyBjdXJyZW50XG5cdH0pXG59XG5cbmZ1bmN0aW9uIGNhbWVsQ2FzZShzdHJpbmcpIHtcblx0cmV0dXJuIHN0cmluZy5zcGxpdChcIiBcIikucmVkdWNlKGZ1bmN0aW9uKHByZXYsIGN1cnJlbnQpe1xuXHRcdHJldHVybiBwcmV2ICsgY3VycmVudC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGN1cnJlbnQuc2xpY2UoMSlcblx0fSlcbn1cblxuZnVuY3Rpb24gaWZBbnkoZGF0YSkge1xuXHRpZihkYXRhKSB7XG5cdFx0cmV0dXJuIGRhdGFcblx0fVxuXHRyZXR1cm4gaCgnc3Bhbi51LWNvbG9yLS1ncmV5JywgJ25vbmUnKVxufVxuXG5mdW5jdGlvbiBvYmpUb0FycmF5KG9iaikge1xuXHR2YXIgYXJyYXkgPSBbXVxuXHRmb3IodmFyIGtleSBpbiBvYmopIHtcblx0XHRpZihvYmpba2V5XSkgeyBhcnJheS5wdXNoKG9ialtrZXldKX1cblx0fVxuXHRyZXR1cm4gYXJyYXlcbn1cblxuZnVuY3Rpb24gYXJyYXlUb0xpc3QoYXJyYXkgLCBjc3NDbGFzcykge1xuXHR2YXIgY3NzQ2xhc3MgPSBjc3NDbGFzcyA/IGNzc0NsYXNzIDogJy4nICsgJ2hhc0J1bGxldHMtLWdyZXknXG5cdHZhciBsaXMgPSBbXVxuXHRhcnJheS5tYXAoZnVuY3Rpb24oaXRlbSl7XG5cdFx0aXRlbSs9Jydcblx0XHRpZihpdGVtICYmIGl0ZW0ubGVuZ3RoKSB7bGlzLnB1c2goaCgnbGknLCBpdGVtKSl9XG5cdH0pXG5cdHJldHVybiBoKCd1bCcgKyBjc3NDbGFzcywgbGlzKVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2pzL25vbnByb2ZpdHMvYnV0dG9uL3ByZXZpZXcuanMiXSwic291cmNlUm9vdCI6IiJ9
import { e as G } from "./index329.js";
import { e as M } from "./index330.js";
import { _ as N } from "./index331.js";
import { r as j } from "./index332.js";
import { r as T } from "./index333.js";
import { s as k } from "./index334.js";
import { t as q } from "./index320.js";
import { u as C } from "./index335.js";
import { a as D } from "./index336.js";
import { f as W } from "./index337.js";
import { m as J } from "./index338.js";
import { m as V } from "./index339.js";
import { p as z } from "./index340.js";
import { r as H } from "./index341.js";
import { s as L } from "./index342.js";
import { g as Y } from "./index343.js";
import { e as K } from "./index344.js";
import { __require as Q } from "./index345.js";
import { __require as X } from "./index346.js";
import { __require as Z } from "./index347.js";
import { __require as rr } from "./index348.js";
import { __require as er } from "./index349.js";
import { __require as tr } from "./index350.js";
import { f as or } from "./index351.js";
import { __require as ar } from "./index352.js";
var r, nr = G, ir = M, yr = N, pr = j, fr = T, d = k, A = q, sr = C, cr = D, lr = W, ur = J, Ar = V, dr = z, mr = H, vr = L, B = Function, _ = function(y) {
  try {
    return B('"use strict"; return (' + y + ").constructor;")();
  } catch {
  }
}, v = Y, Pr = K, w = function() {
  throw new A();
}, gr = v ? function() {
  try {
    return arguments.callee, w;
  } catch {
    try {
      return v(arguments, "callee").get;
    } catch {
      return w;
    }
  }
}() : w, l = Q()(), o = X(), hr = Z(), Sr = rr(), x = er(), P = tr(), u = {}, Er = typeof Uint8Array > "u" || !o ? r : o(Uint8Array), s = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError > "u" ? r : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? r : ArrayBuffer,
  "%ArrayIteratorPrototype%": l && o ? o([][Symbol.iterator]()) : r,
  "%AsyncFromSyncIteratorPrototype%": r,
  "%AsyncFunction%": u,
  "%AsyncGenerator%": u,
  "%AsyncGeneratorFunction%": u,
  "%AsyncIteratorPrototype%": u,
  "%Atomics%": typeof Atomics > "u" ? r : Atomics,
  "%BigInt%": typeof BigInt > "u" ? r : BigInt,
  "%BigInt64Array%": typeof BigInt64Array > "u" ? r : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array > "u" ? r : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView > "u" ? r : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": ir,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": yr,
  "%Float16Array%": typeof Float16Array > "u" ? r : Float16Array,
  "%Float32Array%": typeof Float32Array > "u" ? r : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? r : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? r : FinalizationRegistry,
  "%Function%": B,
  "%GeneratorFunction%": u,
  "%Int8Array%": typeof Int8Array > "u" ? r : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? r : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? r : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": l && o ? o(o([][Symbol.iterator]())) : r,
  "%JSON%": typeof JSON == "object" ? JSON : r,
  "%Map%": typeof Map > "u" ? r : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !l || !o ? r : o((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": nr,
  "%Object.getOwnPropertyDescriptor%": v,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? r : Promise,
  "%Proxy%": typeof Proxy > "u" ? r : Proxy,
  "%RangeError%": pr,
  "%ReferenceError%": fr,
  "%Reflect%": typeof Reflect > "u" ? r : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? r : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !l || !o ? r : o((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? r : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": l && o ? o(""[Symbol.iterator]()) : r,
  "%Symbol%": l ? Symbol : r,
  "%SyntaxError%": d,
  "%ThrowTypeError%": gr,
  "%TypedArray%": Er,
  "%TypeError%": A,
  "%Uint8Array%": typeof Uint8Array > "u" ? r : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? r : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? r : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? r : Uint32Array,
  "%URIError%": sr,
  "%WeakMap%": typeof WeakMap > "u" ? r : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? r : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? r : WeakSet,
  "%Function.prototype.call%": P,
  "%Function.prototype.apply%": x,
  "%Object.defineProperty%": Pr,
  "%Object.getPrototypeOf%": hr,
  "%Math.abs%": cr,
  "%Math.floor%": lr,
  "%Math.max%": ur,
  "%Math.min%": Ar,
  "%Math.pow%": dr,
  "%Math.round%": mr,
  "%Math.sign%": vr,
  "%Reflect.getPrototypeOf%": Sr
};
if (o)
  try {
    null.error;
  } catch (y) {
    var Ir = o(o(y));
    s["%Error.prototype%"] = Ir;
  }
var br = function y(e) {
  var a;
  if (e === "%AsyncFunction%")
    a = _("async function () {}");
  else if (e === "%GeneratorFunction%")
    a = _("function* () {}");
  else if (e === "%AsyncGeneratorFunction%")
    a = _("async function* () {}");
  else if (e === "%AsyncGenerator%") {
    var t = y("%AsyncGeneratorFunction%");
    t && (a = t.prototype);
  } else if (e === "%AsyncIteratorPrototype%") {
    var n = y("%AsyncGenerator%");
    n && o && (a = o(n.prototype));
  }
  return s[e] = a, a;
}, $ = {
  __proto__: null,
  "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
  "%ArrayPrototype%": ["Array", "prototype"],
  "%ArrayProto_entries%": ["Array", "prototype", "entries"],
  "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
  "%ArrayProto_keys%": ["Array", "prototype", "keys"],
  "%ArrayProto_values%": ["Array", "prototype", "values"],
  "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
  "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
  "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
  "%BooleanPrototype%": ["Boolean", "prototype"],
  "%DataViewPrototype%": ["DataView", "prototype"],
  "%DatePrototype%": ["Date", "prototype"],
  "%ErrorPrototype%": ["Error", "prototype"],
  "%EvalErrorPrototype%": ["EvalError", "prototype"],
  "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
  "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
  "%FunctionPrototype%": ["Function", "prototype"],
  "%Generator%": ["GeneratorFunction", "prototype"],
  "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
  "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
  "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
  "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
  "%JSONParse%": ["JSON", "parse"],
  "%JSONStringify%": ["JSON", "stringify"],
  "%MapPrototype%": ["Map", "prototype"],
  "%NumberPrototype%": ["Number", "prototype"],
  "%ObjectPrototype%": ["Object", "prototype"],
  "%ObjProto_toString%": ["Object", "prototype", "toString"],
  "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
  "%PromisePrototype%": ["Promise", "prototype"],
  "%PromiseProto_then%": ["Promise", "prototype", "then"],
  "%Promise_all%": ["Promise", "all"],
  "%Promise_reject%": ["Promise", "reject"],
  "%Promise_resolve%": ["Promise", "resolve"],
  "%RangeErrorPrototype%": ["RangeError", "prototype"],
  "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
  "%RegExpPrototype%": ["RegExp", "prototype"],
  "%SetPrototype%": ["Set", "prototype"],
  "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
  "%StringPrototype%": ["String", "prototype"],
  "%SymbolPrototype%": ["Symbol", "prototype"],
  "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
  "%TypedArrayPrototype%": ["TypedArray", "prototype"],
  "%TypeErrorPrototype%": ["TypeError", "prototype"],
  "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
  "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
  "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
  "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
  "%URIErrorPrototype%": ["URIError", "prototype"],
  "%WeakMapPrototype%": ["WeakMap", "prototype"],
  "%WeakSetPrototype%": ["WeakSet", "prototype"]
}, g = or, F = ar(), Fr = g.call(P, Array.prototype.concat), Rr = g.call(x, Array.prototype.splice), O = g.call(P, String.prototype.replace), R = g.call(P, String.prototype.slice), Ur = g.call(P, RegExp.prototype.exec), _r = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, wr = /\\(\\)?/g, $r = function(e) {
  var a = R(e, 0, 1), t = R(e, -1);
  if (a === "%" && t !== "%")
    throw new d("invalid intrinsic syntax, expected closing `%`");
  if (t === "%" && a !== "%")
    throw new d("invalid intrinsic syntax, expected opening `%`");
  var n = [];
  return O(e, _r, function(p, c, i, h) {
    n[n.length] = i ? O(h, wr, "$1") : c || p;
  }), n;
}, Or = function(e, a) {
  var t = e, n;
  if (F($, t) && (n = $[t], t = "%" + n[0] + "%"), F(s, t)) {
    var p = s[t];
    if (p === u && (p = br(t)), typeof p > "u" && !a)
      throw new A("intrinsic " + e + " exists, but is not available. Please file an issue!");
    return {
      alias: n,
      name: t,
      value: p
    };
  }
  throw new d("intrinsic " + e + " does not exist!");
}, oe = function(e, a) {
  if (typeof e != "string" || e.length === 0)
    throw new A("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof a != "boolean")
    throw new A('"allowMissing" argument must be a boolean');
  if (Ur(/^%?[^%]*%?$/, e) === null)
    throw new d("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var t = $r(e), n = t.length > 0 ? t[0] : "", p = Or("%" + n + "%", a), c = p.name, i = p.value, h = !1, U = p.alias;
  U && (n = U[0], Rr(t, Fr([0, 1], U)));
  for (var S = 1, m = !0; S < t.length; S += 1) {
    var f = t[S], E = R(f, 0, 1), I = R(f, -1);
    if ((E === '"' || E === "'" || E === "`" || I === '"' || I === "'" || I === "`") && E !== I)
      throw new d("property names with quotes must have matching quotes");
    if ((f === "constructor" || !m) && (h = !0), n += "." + f, c = "%" + n + "%", F(s, c))
      i = s[c];
    else if (i != null) {
      if (!(f in i)) {
        if (!a)
          throw new A("base intrinsic for " + e + " exists, but the property is not available.");
        return;
      }
      if (v && S + 1 >= t.length) {
        var b = v(i, f);
        m = !!b, m && "get" in b && !("originalValue" in b.get) ? i = b.get : i = i[f];
      } else
        m = F(i, f), i = i[f];
      m && !h && (s[c] = i);
    }
  }
  return i;
};
export {
  oe as g
};
//# sourceMappingURL=index326.js.map

import { commonjsGlobal as rt } from "./index303.js";
import _t from "./index325.js";
var G = typeof Map == "function" && Map.prototype, C = Object.getOwnPropertyDescriptor && G ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, I = G && C && typeof C.get == "function" ? C.get : null, nt = G && Map.prototype.forEach, K = typeof Set == "function" && Set.prototype, B = Object.getOwnPropertyDescriptor && K ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, T = K && B && typeof B.get == "function" ? B.get : null, at = K && Set.prototype.forEach, Wt = typeof WeakMap == "function" && WeakMap.prototype, w = Wt ? WeakMap.prototype.has : null, Mt = typeof WeakSet == "function" && WeakSet.prototype, E = Mt ? WeakSet.prototype.has : null, It = typeof WeakRef == "function" && WeakRef.prototype, it = It ? WeakRef.prototype.deref : null, Tt = Boolean.prototype.valueOf, qt = Object.prototype.toString, Rt = Function.prototype.toString, Lt = String.prototype.match, Q = String.prototype.slice, y = String.prototype.replace, kt = String.prototype.toUpperCase, ot = String.prototype.toLowerCase, vt = RegExp.prototype.test, lt = Array.prototype.concat, u = Array.prototype.join, At = Array.prototype.slice, ut = Math.floor, F = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, P = Object.getOwnPropertySymbols, H = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, m = typeof Symbol == "function" && typeof Symbol.iterator == "object", $ = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === m || "symbol") ? Symbol.toStringTag : null, St = Object.prototype.propertyIsEnumerable, ft = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(t) {
  return t.__proto__;
} : null);
function ct(t, e) {
  if (t === 1 / 0 || t === -1 / 0 || t !== t || t && t > -1e3 && t < 1e3 || vt.call(/e/, e))
    return e;
  var n = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof t == "number") {
    var a = t < 0 ? -ut(-t) : ut(t);
    if (a !== t) {
      var i = String(a), r = Q.call(e, i.length + 1);
      return y.call(i, n, "$&_") + "." + y.call(y.call(r, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return y.call(e, n, "$&_");
}
var V = _t, pt = V.custom, yt = dt(pt) ? pt : null, ht = {
  __proto__: null,
  double: '"',
  single: "'"
}, Dt = {
  __proto__: null,
  double: /(["\\])/g,
  single: /(['\\])/g
}, ee = function t(e, n, a, i) {
  var r = n || {};
  if (f(r, "quoteStyle") && !f(ht, r.quoteStyle))
    throw new TypeError('option "quoteStyle" must be "single" or "double"');
  if (f(r, "maxStringLength") && (typeof r.maxStringLength == "number" ? r.maxStringLength < 0 && r.maxStringLength !== 1 / 0 : r.maxStringLength !== null))
    throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
  var c = f(r, "customInspect") ? r.customInspect : !0;
  if (typeof c != "boolean" && c !== "symbol")
    throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
  if (f(r, "indent") && r.indent !== null && r.indent !== "	" && !(parseInt(r.indent, 10) === r.indent && r.indent > 0))
    throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
  if (f(r, "numericSeparator") && typeof r.numericSeparator != "boolean")
    throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
  var g = r.numericSeparator;
  if (typeof e > "u")
    return "undefined";
  if (e === null)
    return "null";
  if (typeof e == "boolean")
    return e ? "true" : "false";
  if (typeof e == "string")
    return wt(e, r);
  if (typeof e == "number") {
    if (e === 0)
      return 1 / 0 / e > 0 ? "0" : "-0";
    var o = String(e);
    return g ? ct(e, o) : o;
  }
  if (typeof e == "bigint") {
    var p = String(e) + "n";
    return g ? ct(e, p) : p;
  }
  var q = typeof r.depth > "u" ? 5 : r.depth;
  if (typeof a > "u" && (a = 0), a >= q && q > 0 && typeof e == "object")
    return J(e) ? "[Array]" : "[Object]";
  var S = bt(r, a);
  if (typeof i > "u")
    i = [];
  else if (Ot(i, e) >= 0)
    return "[Circular]";
  function l(h, W, $t) {
    if (W && (i = At.call(i), i.push(W)), $t) {
      var et = {
        depth: r.depth
      };
      return f(r, "quoteStyle") && (et.quoteStyle = r.quoteStyle), t(h, et, a + 1, i);
    }
    return t(h, r, a + 1, i);
  }
  if (typeof e == "function" && !st(e)) {
    var X = Jt(e), Y = M(e, l);
    return "[Function" + (X ? ": " + X : " (anonymous)") + "]" + (Y.length > 0 ? " { " + u.call(Y, ", ") + " }" : "");
  }
  if (dt(e)) {
    var Z = m ? y.call(String(e), /^(Symbol\(.*\))_[^)]*$/, "$1") : H.call(e);
    return typeof e == "object" && !m ? O(Z) : Z;
  }
  if (Yt(e)) {
    for (var d = "<" + ot.call(String(e.nodeName)), R = e.attributes || [], _ = 0; _ < R.length; _++)
      d += " " + R[_].name + "=" + mt(Nt(R[_].value), "double", r);
    return d += ">", e.childNodes && e.childNodes.length && (d += "..."), d += "</" + ot.call(String(e.nodeName)) + ">", d;
  }
  if (J(e)) {
    if (e.length === 0)
      return "[]";
    var L = M(e, l);
    return S && !xt(L) ? "[" + U(L, S) + "]" : "[ " + u.call(L, ", ") + " ]";
  }
  if (Bt(e)) {
    var k = M(e, l);
    return !("cause" in Error.prototype) && "cause" in e && !St.call(e, "cause") ? "{ [" + String(e) + "] " + u.call(lt.call("[cause]: " + l(e.cause), k), ", ") + " }" : k.length === 0 ? "[" + String(e) + "]" : "{ [" + String(e) + "] " + u.call(k, ", ") + " }";
  }
  if (typeof e == "object" && c) {
    if (yt && typeof e[yt] == "function" && V)
      return V(e, { depth: q - a });
    if (c !== "symbol" && typeof e.inspect == "function")
      return e.inspect();
  }
  if (Ut(e)) {
    var x = [];
    return nt && nt.call(e, function(h, W) {
      x.push(l(W, e, !0) + " => " + l(h, e));
    }), gt("Map", I.call(e), x, S);
  }
  if (Qt(e)) {
    var b = [];
    return at && at.call(e, function(h) {
      b.push(l(h, e));
    }), gt("Set", T.call(e), b, S);
  }
  if (Gt(e))
    return z("WeakMap");
  if (Xt(e))
    return z("WeakSet");
  if (Kt(e))
    return z("WeakRef");
  if (zt(e))
    return O(l(Number(e)));
  if (Ht(e))
    return O(l(F.call(e)));
  if (Ft(e))
    return O(Tt.call(e));
  if (Pt(e))
    return O(l(String(e)));
  if (typeof window < "u" && e === window)
    return "{ [object Window] }";
  if (typeof globalThis < "u" && e === globalThis || typeof rt < "u" && e === rt)
    return "{ [object globalThis] }";
  if (!Ct(e) && !st(e)) {
    var A = M(e, l), j = ft ? ft(e) === Object.prototype : e instanceof Object || e.constructor === Object, D = e instanceof Object ? "" : "null prototype", tt = !j && $ && Object(e) === e && $ in e ? Q.call(s(e), 8, -1) : D ? "Object" : "", Et = j || typeof e.constructor != "function" ? "" : e.constructor.name ? e.constructor.name + " " : "", N = Et + (tt || D ? "[" + u.call(lt.call([], tt || [], D || []), ": ") + "] " : "");
    return A.length === 0 ? N + "{}" : S ? N + "{" + U(A, S) + "}" : N + "{ " + u.call(A, ", ") + " }";
  }
  return String(e);
};
function mt(t, e, n) {
  var a = n.quoteStyle || e, i = ht[a];
  return i + t + i;
}
function Nt(t) {
  return y.call(String(t), /"/g, "&quot;");
}
function v(t) {
  return !$ || !(typeof t == "object" && ($ in t || typeof t[$] < "u"));
}
function J(t) {
  return s(t) === "[object Array]" && v(t);
}
function Ct(t) {
  return s(t) === "[object Date]" && v(t);
}
function st(t) {
  return s(t) === "[object RegExp]" && v(t);
}
function Bt(t) {
  return s(t) === "[object Error]" && v(t);
}
function Pt(t) {
  return s(t) === "[object String]" && v(t);
}
function zt(t) {
  return s(t) === "[object Number]" && v(t);
}
function Ft(t) {
  return s(t) === "[object Boolean]" && v(t);
}
function dt(t) {
  if (m)
    return t && typeof t == "object" && t instanceof Symbol;
  if (typeof t == "symbol")
    return !0;
  if (!t || typeof t != "object" || !H)
    return !1;
  try {
    return H.call(t), !0;
  } catch {
  }
  return !1;
}
function Ht(t) {
  if (!t || typeof t != "object" || !F)
    return !1;
  try {
    return F.call(t), !0;
  } catch {
  }
  return !1;
}
var Vt = Object.prototype.hasOwnProperty || function(t) {
  return t in this;
};
function f(t, e) {
  return Vt.call(t, e);
}
function s(t) {
  return qt.call(t);
}
function Jt(t) {
  if (t.name)
    return t.name;
  var e = Lt.call(Rt.call(t), /^function\s*([\w$]+)/);
  return e ? e[1] : null;
}
function Ot(t, e) {
  if (t.indexOf)
    return t.indexOf(e);
  for (var n = 0, a = t.length; n < a; n++)
    if (t[n] === e)
      return n;
  return -1;
}
function Ut(t) {
  if (!I || !t || typeof t != "object")
    return !1;
  try {
    I.call(t);
    try {
      T.call(t);
    } catch {
      return !0;
    }
    return t instanceof Map;
  } catch {
  }
  return !1;
}
function Gt(t) {
  if (!w || !t || typeof t != "object")
    return !1;
  try {
    w.call(t, w);
    try {
      E.call(t, E);
    } catch {
      return !0;
    }
    return t instanceof WeakMap;
  } catch {
  }
  return !1;
}
function Kt(t) {
  if (!it || !t || typeof t != "object")
    return !1;
  try {
    return it.call(t), !0;
  } catch {
  }
  return !1;
}
function Qt(t) {
  if (!T || !t || typeof t != "object")
    return !1;
  try {
    T.call(t);
    try {
      I.call(t);
    } catch {
      return !0;
    }
    return t instanceof Set;
  } catch {
  }
  return !1;
}
function Xt(t) {
  if (!E || !t || typeof t != "object")
    return !1;
  try {
    E.call(t, E);
    try {
      w.call(t, w);
    } catch {
      return !0;
    }
    return t instanceof WeakSet;
  } catch {
  }
  return !1;
}
function Yt(t) {
  return !t || typeof t != "object" ? !1 : typeof HTMLElement < "u" && t instanceof HTMLElement ? !0 : typeof t.nodeName == "string" && typeof t.getAttribute == "function";
}
function wt(t, e) {
  if (t.length > e.maxStringLength) {
    var n = t.length - e.maxStringLength, a = "... " + n + " more character" + (n > 1 ? "s" : "");
    return wt(Q.call(t, 0, e.maxStringLength), e) + a;
  }
  var i = Dt[e.quoteStyle || "single"];
  i.lastIndex = 0;
  var r = y.call(y.call(t, i, "\\$1"), /[\x00-\x1f]/g, Zt);
  return mt(r, "single", e);
}
function Zt(t) {
  var e = t.charCodeAt(0), n = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[e];
  return n ? "\\" + n : "\\x" + (e < 16 ? "0" : "") + kt.call(e.toString(16));
}
function O(t) {
  return "Object(" + t + ")";
}
function z(t) {
  return t + " { ? }";
}
function gt(t, e, n, a) {
  var i = a ? U(n, a) : u.call(n, ", ");
  return t + " (" + e + ") {" + i + "}";
}
function xt(t) {
  for (var e = 0; e < t.length; e++)
    if (Ot(t[e], `
`) >= 0)
      return !1;
  return !0;
}
function bt(t, e) {
  var n;
  if (t.indent === "	")
    n = "	";
  else if (typeof t.indent == "number" && t.indent > 0)
    n = u.call(Array(t.indent + 1), " ");
  else
    return null;
  return {
    base: n,
    prev: u.call(Array(e + 1), n)
  };
}
function U(t, e) {
  if (t.length === 0)
    return "";
  var n = `
` + e.prev + e.base;
  return n + u.call(t, "," + n) + `
` + e.prev;
}
function M(t, e) {
  var n = J(t), a = [];
  if (n) {
    a.length = t.length;
    for (var i = 0; i < t.length; i++)
      a[i] = f(t, i) ? e(t[i], t) : "";
  }
  var r = typeof P == "function" ? P(t) : [], c;
  if (m) {
    c = {};
    for (var g = 0; g < r.length; g++)
      c["$" + r[g]] = r[g];
  }
  for (var o in t)
    f(t, o) && (n && String(Number(o)) === o && o < t.length || m && c["$" + o] instanceof Symbol || (vt.call(/[^\w$]/, o) ? a.push(e(o, t) + ": " + e(t[o], t)) : a.push(o + ": " + e(t[o], t))));
  if (typeof P == "function")
    for (var p = 0; p < r.length; p++)
      St.call(t, r[p]) && a.push("[" + e(r[p]) + "]: " + e(t[r[p]], t));
  return a;
}
export {
  ee as o
};
//# sourceMappingURL=index321.js.map

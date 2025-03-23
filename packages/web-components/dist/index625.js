import { s as q } from "./index628.js";
import { u as x } from "./index629.js";
import { f as J } from "./index627.js";
var V = q, I = x, E = J, L = Object.prototype.hasOwnProperty, $ = {
  brackets: function(e) {
    return e + "[]";
  },
  comma: "comma",
  indices: function(e, a) {
    return e + "[" + a + "]";
  },
  repeat: function(e) {
    return e;
  }
}, d = Array.isArray, W = Array.prototype.push, G = function(i, e) {
  W.apply(i, d(e) ? e : [e]);
}, X = Date.prototype.toISOString, M = E.default, t = {
  addQueryPrefix: !1,
  allowDots: !1,
  allowEmptyArrays: !1,
  arrayFormat: "indices",
  charset: "utf-8",
  charsetSentinel: !1,
  commaRoundTrip: !1,
  delimiter: "&",
  encode: !0,
  encodeDotInKeys: !1,
  encoder: I.encode,
  encodeValuesOnly: !1,
  filter: void 0,
  format: M,
  formatter: E.formatters[M],
  // deprecated
  indices: !1,
  serializeDate: function(e) {
    return X.call(e);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, Y = function(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean" || typeof e == "symbol" || typeof e == "bigint";
}, z = {}, Z = function i(e, a, r, o, l, f, y, b, u, c, v, p, h, s, w, g, S, F) {
  for (var n = e, N = F, T = 0, A = !1; (N = N.get(z)) !== void 0 && !A; ) {
    var k = N.get(e);
    if (T += 1, typeof k < "u") {
      if (k === T)
        throw new RangeError("Cyclic object value");
      A = !0;
    }
    typeof N.get(z) > "u" && (T = 0);
  }
  if (typeof c == "function" ? n = c(a, n) : n instanceof Date ? n = h(n) : r === "comma" && d(n) && (n = I.maybeMap(n, function(R) {
    return R instanceof Date ? h(R) : R;
  })), n === null) {
    if (f)
      return u && !g ? u(a, t.encoder, S, "key", s) : a;
    n = "";
  }
  if (Y(n) || I.isBuffer(n)) {
    if (u) {
      var U = g ? a : u(a, t.encoder, S, "key", s);
      return [w(U) + "=" + w(u(n, t.encoder, S, "value", s))];
    }
    return [w(a) + "=" + w(String(n))];
  }
  var K = [];
  if (typeof n > "u")
    return K;
  var D;
  if (r === "comma" && d(n))
    g && u && (n = I.maybeMap(n, u)), D = [{ value: n.length > 0 ? n.join(",") || null : void 0 }];
  else if (d(c))
    D = c;
  else {
    var Q = Object.keys(n);
    D = v ? Q.sort(v) : Q;
  }
  var H = b ? String(a).replace(/\./g, "%2E") : String(a), j = o && d(n) && n.length === 1 ? H + "[]" : H;
  if (l && d(n) && n.length === 0)
    return j + "[]";
  for (var O = 0; O < D.length; ++O) {
    var m = D[O], B = typeof m == "object" && m && typeof m.value < "u" ? m.value : n[m];
    if (!(y && B === null)) {
      var P = p && b ? String(m).replace(/\./g, "%2E") : String(m), _ = d(n) ? typeof r == "function" ? r(j, P) : j : j + (p ? "." + P : "[" + P + "]");
      F.set(e, T);
      var C = V();
      C.set(z, F), G(K, i(
        B,
        _,
        r,
        o,
        l,
        f,
        y,
        b,
        r === "comma" && g && d(n) ? null : u,
        c,
        v,
        p,
        h,
        s,
        w,
        g,
        S,
        C
      ));
    }
  }
  return K;
}, ee = function(e) {
  if (!e)
    return t;
  if (typeof e.allowEmptyArrays < "u" && typeof e.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof e.encodeDotInKeys < "u" && typeof e.encodeDotInKeys != "boolean")
    throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  if (e.encoder !== null && typeof e.encoder < "u" && typeof e.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  var a = e.charset || t.charset;
  if (typeof e.charset < "u" && e.charset !== "utf-8" && e.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var r = E.default;
  if (typeof e.format < "u") {
    if (!L.call(E.formatters, e.format))
      throw new TypeError("Unknown format option provided.");
    r = e.format;
  }
  var o = E.formatters[r], l = t.filter;
  (typeof e.filter == "function" || d(e.filter)) && (l = e.filter);
  var f;
  if (e.arrayFormat in $ ? f = e.arrayFormat : "indices" in e ? f = e.indices ? "indices" : "repeat" : f = t.arrayFormat, "commaRoundTrip" in e && typeof e.commaRoundTrip != "boolean")
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  var y = typeof e.allowDots > "u" ? e.encodeDotInKeys === !0 ? !0 : t.allowDots : !!e.allowDots;
  return {
    addQueryPrefix: typeof e.addQueryPrefix == "boolean" ? e.addQueryPrefix : t.addQueryPrefix,
    allowDots: y,
    allowEmptyArrays: typeof e.allowEmptyArrays == "boolean" ? !!e.allowEmptyArrays : t.allowEmptyArrays,
    arrayFormat: f,
    charset: a,
    charsetSentinel: typeof e.charsetSentinel == "boolean" ? e.charsetSentinel : t.charsetSentinel,
    commaRoundTrip: !!e.commaRoundTrip,
    delimiter: typeof e.delimiter > "u" ? t.delimiter : e.delimiter,
    encode: typeof e.encode == "boolean" ? e.encode : t.encode,
    encodeDotInKeys: typeof e.encodeDotInKeys == "boolean" ? e.encodeDotInKeys : t.encodeDotInKeys,
    encoder: typeof e.encoder == "function" ? e.encoder : t.encoder,
    encodeValuesOnly: typeof e.encodeValuesOnly == "boolean" ? e.encodeValuesOnly : t.encodeValuesOnly,
    filter: l,
    format: r,
    formatter: o,
    serializeDate: typeof e.serializeDate == "function" ? e.serializeDate : t.serializeDate,
    skipNulls: typeof e.skipNulls == "boolean" ? e.skipNulls : t.skipNulls,
    sort: typeof e.sort == "function" ? e.sort : null,
    strictNullHandling: typeof e.strictNullHandling == "boolean" ? e.strictNullHandling : t.strictNullHandling
  };
}, te = function(i, e) {
  var a = i, r = ee(e), o, l;
  typeof r.filter == "function" ? (l = r.filter, a = l("", a)) : d(r.filter) && (l = r.filter, o = l);
  var f = [];
  if (typeof a != "object" || a === null)
    return "";
  var y = $[r.arrayFormat], b = y === "comma" && r.commaRoundTrip;
  o || (o = Object.keys(a)), r.sort && o.sort(r.sort);
  for (var u = V(), c = 0; c < o.length; ++c) {
    var v = o[c], p = a[v];
    r.skipNulls && p === null || G(f, Z(
      p,
      v,
      y,
      b,
      r.allowEmptyArrays,
      r.strictNullHandling,
      r.skipNulls,
      r.encodeDotInKeys,
      r.encode ? r.encoder : null,
      r.filter,
      r.sort,
      r.allowDots,
      r.serializeDate,
      r.format,
      r.formatter,
      r.encodeValuesOnly,
      r.charset,
      u
    ));
  }
  var h = f.join(r.delimiter), s = r.addQueryPrefix === !0 ? "?" : "";
  return r.charsetSentinel && (r.charset === "iso-8859-1" ? s += "utf8=%26%2310003%3B&" : s += "utf8=%E2%9C%93&"), h.length > 0 ? s + h : "";
};
export {
  te as s
};
//# sourceMappingURL=index625.js.map

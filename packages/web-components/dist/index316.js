import { u as v } from "./index319.js";
var p = v, w = Object.prototype.hasOwnProperty, g = Array.isArray, n = {
  allowDots: !1,
  allowEmptyArrays: !1,
  allowPrototypes: !1,
  allowSparse: !1,
  arrayLimit: 20,
  charset: "utf-8",
  charsetSentinel: !1,
  comma: !1,
  decodeDotInKeys: !1,
  decoder: p.decode,
  delimiter: "&",
  depth: 5,
  duplicates: "combine",
  ignoreQueryPrefix: !1,
  interpretNumericEntities: !1,
  parameterLimit: 1e3,
  parseArrays: !0,
  plainObjects: !1,
  strictDepth: !1,
  strictNullHandling: !1,
  throwOnLimitExceeded: !1
}, L = function(i) {
  return i.replace(/&#(\d+);/g, function(e, r) {
    return String.fromCharCode(parseInt(r, 10));
  });
}, E = function(i, e, r) {
  if (i && typeof i == "string" && e.comma && i.indexOf(",") > -1)
    return i.split(",");
  if (e.throwOnLimitExceeded && r >= e.arrayLimit)
    throw new RangeError("Array limit exceeded. Only " + e.arrayLimit + " element" + (e.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
  return i;
}, D = "utf8=%26%2310003%3B", A = "utf8=%E2%9C%93", x = function(e, r) {
  var t = { __proto__: null }, d = r.ignoreQueryPrefix ? e.replace(/^\?/, "") : e;
  d = d.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  var f = r.parameterLimit === 1 / 0 ? void 0 : r.parameterLimit, l = d.split(
    r.delimiter,
    r.throwOnLimitExceeded ? f + 1 : f
  );
  if (r.throwOnLimitExceeded && l.length > f)
    throw new RangeError("Parameter limit exceeded. Only " + f + " parameter" + (f === 1 ? "" : "s") + " allowed.");
  var o = -1, a, c = r.charset;
  if (r.charsetSentinel)
    for (a = 0; a < l.length; ++a)
      l[a].indexOf("utf8=") === 0 && (l[a] === A ? c = "utf-8" : l[a] === D && (c = "iso-8859-1"), o = a, a = l.length);
  for (a = 0; a < l.length; ++a)
    if (a !== o) {
      var u = l[a], y = u.indexOf("]="), m = y === -1 ? u.indexOf("=") : y + 1, h, s;
      m === -1 ? (h = r.decoder(u, n.decoder, c, "key"), s = r.strictNullHandling ? null : "") : (h = r.decoder(u.slice(0, m), n.decoder, c, "key"), s = p.maybeMap(
        E(
          u.slice(m + 1),
          r,
          g(t[h]) ? t[h].length : 0
        ),
        function(O) {
          return r.decoder(O, n.decoder, c, "value");
        }
      )), s && r.interpretNumericEntities && c === "iso-8859-1" && (s = L(String(s))), u.indexOf("[]=") > -1 && (s = g(s) ? [s] : s);
      var b = w.call(t, h);
      b && r.duplicates === "combine" ? t[h] = p.combine(t[h], s) : (!b || r.duplicates === "last") && (t[h] = s);
    }
  return t;
}, S = function(i, e, r, t) {
  var d = 0;
  if (i.length > 0 && i[i.length - 1] === "[]") {
    var f = i.slice(0, -1).join("");
    d = Array.isArray(e) && e[f] ? e[f].length : 0;
  }
  for (var l = t ? e : E(e, r, d), o = i.length - 1; o >= 0; --o) {
    var a, c = i[o];
    if (c === "[]" && r.parseArrays)
      a = r.allowEmptyArrays && (l === "" || r.strictNullHandling && l === null) ? [] : p.combine([], l);
    else {
      a = r.plainObjects ? { __proto__: null } : {};
      var u = c.charAt(0) === "[" && c.charAt(c.length - 1) === "]" ? c.slice(1, -1) : c, y = r.decodeDotInKeys ? u.replace(/%2E/g, ".") : u, m = parseInt(y, 10);
      !r.parseArrays && y === "" ? a = { 0: l } : !isNaN(m) && c !== y && String(m) === y && m >= 0 && r.parseArrays && m <= r.arrayLimit ? (a = [], a[m] = l) : y !== "__proto__" && (a[y] = l);
    }
    l = a;
  }
  return l;
}, _ = function(e, r, t, d) {
  if (e) {
    var f = t.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e, l = /(\[[^[\]]*])/, o = /(\[[^[\]]*])/g, a = t.depth > 0 && l.exec(f), c = a ? f.slice(0, a.index) : f, u = [];
    if (c) {
      if (!t.plainObjects && w.call(Object.prototype, c) && !t.allowPrototypes)
        return;
      u.push(c);
    }
    for (var y = 0; t.depth > 0 && (a = o.exec(f)) !== null && y < t.depth; ) {
      if (y += 1, !t.plainObjects && w.call(Object.prototype, a[1].slice(1, -1)) && !t.allowPrototypes)
        return;
      u.push(a[1]);
    }
    if (a) {
      if (t.strictDepth === !0)
        throw new RangeError("Input depth exceeded depth option of " + t.depth + " and strictDepth is true");
      u.push("[" + f.slice(a.index) + "]");
    }
    return S(u, r, t, d);
  }
}, N = function(e) {
  if (!e)
    return n;
  if (typeof e.allowEmptyArrays < "u" && typeof e.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof e.decodeDotInKeys < "u" && typeof e.decodeDotInKeys != "boolean")
    throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
  if (e.decoder !== null && typeof e.decoder < "u" && typeof e.decoder != "function")
    throw new TypeError("Decoder has to be a function.");
  if (typeof e.charset < "u" && e.charset !== "utf-8" && e.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  if (typeof e.throwOnLimitExceeded < "u" && typeof e.throwOnLimitExceeded != "boolean")
    throw new TypeError("`throwOnLimitExceeded` option must be a boolean");
  var r = typeof e.charset > "u" ? n.charset : e.charset, t = typeof e.duplicates > "u" ? n.duplicates : e.duplicates;
  if (t !== "combine" && t !== "first" && t !== "last")
    throw new TypeError("The duplicates option must be either combine, first, or last");
  var d = typeof e.allowDots > "u" ? e.decodeDotInKeys === !0 ? !0 : n.allowDots : !!e.allowDots;
  return {
    allowDots: d,
    allowEmptyArrays: typeof e.allowEmptyArrays == "boolean" ? !!e.allowEmptyArrays : n.allowEmptyArrays,
    allowPrototypes: typeof e.allowPrototypes == "boolean" ? e.allowPrototypes : n.allowPrototypes,
    allowSparse: typeof e.allowSparse == "boolean" ? e.allowSparse : n.allowSparse,
    arrayLimit: typeof e.arrayLimit == "number" ? e.arrayLimit : n.arrayLimit,
    charset: r,
    charsetSentinel: typeof e.charsetSentinel == "boolean" ? e.charsetSentinel : n.charsetSentinel,
    comma: typeof e.comma == "boolean" ? e.comma : n.comma,
    decodeDotInKeys: typeof e.decodeDotInKeys == "boolean" ? e.decodeDotInKeys : n.decodeDotInKeys,
    decoder: typeof e.decoder == "function" ? e.decoder : n.decoder,
    delimiter: typeof e.delimiter == "string" || p.isRegExp(e.delimiter) ? e.delimiter : n.delimiter,
    // eslint-disable-next-line no-implicit-coercion, no-extra-parens
    depth: typeof e.depth == "number" || e.depth === !1 ? +e.depth : n.depth,
    duplicates: t,
    ignoreQueryPrefix: e.ignoreQueryPrefix === !0,
    interpretNumericEntities: typeof e.interpretNumericEntities == "boolean" ? e.interpretNumericEntities : n.interpretNumericEntities,
    parameterLimit: typeof e.parameterLimit == "number" ? e.parameterLimit : n.parameterLimit,
    parseArrays: e.parseArrays !== !1,
    plainObjects: typeof e.plainObjects == "boolean" ? e.plainObjects : n.plainObjects,
    strictDepth: typeof e.strictDepth == "boolean" ? !!e.strictDepth : n.strictDepth,
    strictNullHandling: typeof e.strictNullHandling == "boolean" ? e.strictNullHandling : n.strictNullHandling,
    throwOnLimitExceeded: typeof e.throwOnLimitExceeded == "boolean" ? e.throwOnLimitExceeded : !1
  };
}, P = function(i, e) {
  var r = N(e);
  if (i === "" || i === null || typeof i > "u")
    return r.plainObjects ? { __proto__: null } : {};
  for (var t = typeof i == "string" ? x(i, r) : i, d = r.plainObjects ? { __proto__: null } : {}, f = Object.keys(t), l = 0; l < f.length; ++l) {
    var o = f[l], a = _(o, t[o], r, typeof i == "string");
    d = p.merge(d, a, r);
  }
  return r.allowSparse === !0 ? d : p.compact(d);
};
export {
  P as p
};
//# sourceMappingURL=index316.js.map

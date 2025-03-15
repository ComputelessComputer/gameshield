import { f as F } from "./index317.js";
var O = F, s = Object.prototype.hasOwnProperty, c = Array.isArray, l = function() {
  for (var a = [], e = 0; e < 256; ++e)
    a.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
  return a;
}(), g = function(e) {
  for (; e.length > 1; ) {
    var r = e.pop(), n = r.obj[r.prop];
    if (c(n)) {
      for (var f = [], u = 0; u < n.length; ++u)
        typeof n[u] < "u" && f.push(n[u]);
      r.obj[r.prop] = f;
    }
  }
}, b = function(e, r) {
  for (var n = r && r.plainObjects ? { __proto__: null } : {}, f = 0; f < e.length; ++f)
    typeof e[f] < "u" && (n[f] = e[f]);
  return n;
}, E = function a(e, r, n) {
  if (!r)
    return e;
  if (typeof r != "object" && typeof r != "function") {
    if (c(e))
      e.push(r);
    else if (e && typeof e == "object")
      (n && (n.plainObjects || n.allowPrototypes) || !s.call(Object.prototype, r)) && (e[r] = !0);
    else
      return [e, r];
    return e;
  }
  if (!e || typeof e != "object")
    return [e].concat(r);
  var f = e;
  return c(e) && !c(r) && (f = b(e, n)), c(e) && c(r) ? (r.forEach(function(u, t) {
    if (s.call(e, t)) {
      var i = e[t];
      i && typeof i == "object" && u && typeof u == "object" ? e[t] = a(i, u, n) : e.push(u);
    } else
      e[t] = u;
  }), e) : Object.keys(r).reduce(function(u, t) {
    var i = r[t];
    return s.call(u, t) ? u[t] = a(u[t], i, n) : u[t] = i, u;
  }, f);
}, j = function(e, r) {
  return Object.keys(r).reduce(function(n, f) {
    return n[f] = r[f], n;
  }, e);
}, m = function(a, e, r) {
  var n = a.replace(/\+/g, " ");
  if (r === "iso-8859-1")
    return n.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n);
  } catch {
    return n;
  }
}, y = 1024, A = function(e, r, n, f, u) {
  if (e.length === 0)
    return e;
  var t = e;
  if (typeof e == "symbol" ? t = Symbol.prototype.toString.call(e) : typeof e != "string" && (t = String(e)), n === "iso-8859-1")
    return escape(t).replace(/%u[0-9a-f]{4}/gi, function(d) {
      return "%26%23" + parseInt(d.slice(2), 16) + "%3B";
    });
  for (var i = "", v = 0; v < t.length; v += y) {
    for (var x = t.length >= y ? t.slice(v, v + y) : t, p = [], h = 0; h < x.length; ++h) {
      var o = x.charCodeAt(h);
      if (o === 45 || o === 46 || o === 95 || o === 126 || o >= 48 && o <= 57 || o >= 65 && o <= 90 || o >= 97 && o <= 122 || u === O.RFC1738 && (o === 40 || o === 41)) {
        p[p.length] = x.charAt(h);
        continue;
      }
      if (o < 128) {
        p[p.length] = l[o];
        continue;
      }
      if (o < 2048) {
        p[p.length] = l[192 | o >> 6] + l[128 | o & 63];
        continue;
      }
      if (o < 55296 || o >= 57344) {
        p[p.length] = l[224 | o >> 12] + l[128 | o >> 6 & 63] + l[128 | o & 63];
        continue;
      }
      h += 1, o = 65536 + ((o & 1023) << 10 | x.charCodeAt(h) & 1023), p[p.length] = l[240 | o >> 18] + l[128 | o >> 12 & 63] + l[128 | o >> 6 & 63] + l[128 | o & 63];
    }
    i += p.join("");
  }
  return i;
}, S = function(e) {
  for (var r = [{ obj: { o: e }, prop: "o" }], n = [], f = 0; f < r.length; ++f)
    for (var u = r[f], t = u.obj[u.prop], i = Object.keys(t), v = 0; v < i.length; ++v) {
      var x = i[v], p = t[x];
      typeof p == "object" && p !== null && n.indexOf(p) === -1 && (r.push({ obj: t, prop: x }), n.push(p));
    }
  return g(r), e;
}, B = function(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}, C = function(e) {
  return !e || typeof e != "object" ? !1 : !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e));
}, R = function(e, r) {
  return [].concat(e, r);
}, T = function(e, r) {
  if (c(e)) {
    for (var n = [], f = 0; f < e.length; f += 1)
      n.push(r(e[f]));
    return n;
  }
  return r(e);
}, w = {
  arrayToObject: b,
  assign: j,
  combine: R,
  compact: S,
  decode: m,
  encode: A,
  isBuffer: C,
  isRegExp: B,
  maybeMap: T,
  merge: E
};
export {
  w as u
};
//# sourceMappingURL=index319.js.map

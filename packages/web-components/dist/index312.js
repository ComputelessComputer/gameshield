import { commonjsGlobal as S } from "./index303.js";
import { __module as A } from "./index314.js";
/*! https://mths.be/punycode v1.4.1 by @mathias */
A.exports;
(function(y, T) {
  (function(L) {
    var j = T && !T.nodeType && T, O = y && !y.nodeType && y, C = typeof S == "object" && S;
    (C.global === C || C.window === C || C.self === C) && (L = C);
    var w, g = 2147483647, p = 36, k = 1, m = 26, K = 38, P = 700, B = 72, q = 128, G = "-", Q = /^xn--/, W = /[^\x20-\x7E]/, X = /[\x2E\u3002\uFF0E\uFF61]/g, Y = {
      overflow: "Overflow: input needs wider integers to process",
      "not-basic": "Illegal input >= 0x80 (not a basic code point)",
      "invalid-input": "Invalid input"
    }, D = p - k, x = Math.floor, I = String.fromCharCode, M;
    function F(e) {
      throw new RangeError(Y[e]);
    }
    function N(e, r) {
      for (var o = e.length, n = []; o--; )
        n[o] = r(e[o]);
      return n;
    }
    function U(e, r) {
      var o = e.split("@"), n = "";
      o.length > 1 && (n = o[0] + "@", e = o[1]), e = e.replace(X, ".");
      var t = e.split("."), u = N(t, r).join(".");
      return n + u;
    }
    function _(e) {
      for (var r = [], o = 0, n = e.length, t, u; o < n; )
        t = e.charCodeAt(o++), t >= 55296 && t <= 56319 && o < n ? (u = e.charCodeAt(o++), (u & 64512) == 56320 ? r.push(((t & 1023) << 10) + (u & 1023) + 65536) : (r.push(t), o--)) : r.push(t);
      return r;
    }
    function R(e) {
      return N(e, function(r) {
        var o = "";
        return r > 65535 && (r -= 65536, o += I(r >>> 10 & 1023 | 55296), r = 56320 | r & 1023), o += I(r), o;
      }).join("");
    }
    function Z(e) {
      return e - 48 < 10 ? e - 22 : e - 65 < 26 ? e - 65 : e - 97 < 26 ? e - 97 : p;
    }
    function V(e, r) {
      return e + 22 + 75 * (e < 26) - ((r != 0) << 5);
    }
    function z(e, r, o) {
      var n = 0;
      for (e = o ? x(e / P) : e >> 1, e += x(e / r); e > D * m >> 1; n += p)
        e = x(e / D);
      return x(n + (D + 1) * e / (e + K));
    }
    function H(e) {
      var r = [], o = e.length, n, t = 0, u = q, i = B, a, c, h, d, f, s, l, v, b;
      for (a = e.lastIndexOf(G), a < 0 && (a = 0), c = 0; c < a; ++c)
        e.charCodeAt(c) >= 128 && F("not-basic"), r.push(e.charCodeAt(c));
      for (h = a > 0 ? a + 1 : 0; h < o; ) {
        for (d = t, f = 1, s = p; h >= o && F("invalid-input"), l = Z(e.charCodeAt(h++)), (l >= p || l > x((g - t) / f)) && F("overflow"), t += l * f, v = s <= i ? k : s >= i + m ? m : s - i, !(l < v); s += p)
          b = p - v, f > x(g / b) && F("overflow"), f *= b;
        n = r.length + 1, i = z(t - d, n, d == 0), x(t / n) > g - u && F("overflow"), u += x(t / n), t %= n, r.splice(t++, 0, u);
      }
      return R(r);
    }
    function J(e) {
      var r, o, n, t, u, i, a, c, h, d, f, s = [], l, v, b, E;
      for (e = _(e), l = e.length, r = q, o = 0, u = B, i = 0; i < l; ++i)
        f = e[i], f < 128 && s.push(I(f));
      for (n = t = s.length, t && s.push(G); n < l; ) {
        for (a = g, i = 0; i < l; ++i)
          f = e[i], f >= r && f < a && (a = f);
        for (v = n + 1, a - r > x((g - o) / v) && F("overflow"), o += (a - r) * v, r = a, i = 0; i < l; ++i)
          if (f = e[i], f < r && ++o > g && F("overflow"), f == r) {
            for (c = o, h = p; d = h <= u ? k : h >= u + m ? m : h - u, !(c < d); h += p)
              E = c - d, b = p - d, s.push(
                I(V(d + E % b, 0))
              ), c = x(E / b);
            s.push(I(V(c, 0))), u = z(o, v, n == t), o = 0, ++n;
          }
        ++o, ++r;
      }
      return s.join("");
    }
    function $(e) {
      return U(e, function(r) {
        return Q.test(r) ? H(r.slice(4).toLowerCase()) : r;
      });
    }
    function ee(e) {
      return U(e, function(r) {
        return W.test(r) ? "xn--" + J(r) : r;
      });
    }
    if (w = {
      /**
       * A string representing the current Punycode.js version number.
       * @memberOf punycode
       * @type String
       */
      version: "1.4.1",
      /**
       * An object of methods to convert from JavaScript's internal character
       * representation (UCS-2) to Unicode code points, and back.
       * @see <https://mathiasbynens.be/notes/javascript-encoding>
       * @memberOf punycode
       * @type Object
       */
      ucs2: {
        decode: _,
        encode: R
      },
      decode: H,
      encode: J,
      toASCII: ee,
      toUnicode: $
    }, j && O)
      if (y.exports == j)
        O.exports = w;
      else
        for (M in w)
          w.hasOwnProperty(M) && (j[M] = w[M]);
    else
      L.punycode = w;
  })(S);
})(A, A.exports);
var ne = A.exports;
export {
  ne as p
};
//# sourceMappingURL=index312.js.map

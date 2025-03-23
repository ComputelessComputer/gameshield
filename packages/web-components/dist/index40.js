import { p as J } from "./index622.js";
import { l as K } from "./index623.js";
var N = J;
function x() {
  this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
}
var V = /^([a-z0-9.+-]+:)/i, W = /:[0-9]*$/, X = /^(\/\/?(?!\/)[^?\s]*)(\?[^\s]*)?$/, Y = [
  "<",
  ">",
  '"',
  "`",
  " ",
  "\r",
  `
`,
  "	"
], Q = [
  "{",
  "}",
  "|",
  "\\",
  "^",
  "`"
].concat(Y), T = ["'"].concat(Q), F = [
  "%",
  "/",
  "?",
  ";",
  "#"
].concat(T), M = [
  "/",
  "?",
  "#"
], S = 255, B = /^[+a-z0-9A-Z_-]{0,63}$/, H = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, k = {
  javascript: !0,
  "javascript:": !0
}, Z = {
  javascript: !0,
  "javascript:": !0
}, C = {
  http: !0,
  https: !0,
  ftp: !0,
  gopher: !0,
  file: !0,
  "http:": !0,
  "https:": !0,
  "ftp:": !0,
  "gopher:": !0,
  "file:": !0
}, _ = K;
function E(s, e, t) {
  if (s && typeof s == "object" && s instanceof x)
    return s;
  var f = new x();
  return f.parse(s, e, t), f;
}
x.prototype.parse = function(s, e, t) {
  if (typeof s != "string")
    throw new TypeError("Parameter 'url' must be a string, not " + typeof s);
  var f = s.indexOf("?"), n = f !== -1 && f < s.indexOf("#") ? "?" : "#", y = s.split(n), c = /\\/g;
  y[0] = y[0].replace(c, "/"), s = y.join(n);
  var h = s;
  if (h = h.trim(), !t && s.split("#").length === 1) {
    var O = X.exec(h);
    if (O)
      return this.path = h, this.href = h, this.pathname = O[1], O[2] ? (this.search = O[2], e ? this.query = _.parse(this.search.substr(1)) : this.query = this.search.substr(1)) : e && (this.search = "", this.query = {}), this;
  }
  var p = V.exec(h);
  if (p) {
    p = p[0];
    var j = p.toLowerCase();
    this.protocol = j, h = h.substr(p.length);
  }
  if (t || p || h.match(/^\/\/[^@/]+@[^@/]+/)) {
    var P = h.substr(0, 2) === "//";
    P && !(p && Z[p]) && (h = h.substr(2), this.slashes = !0);
  }
  if (!Z[p] && (P || p && !C[p])) {
    for (var i = -1, o = 0; o < M.length; o++) {
      var q = h.indexOf(M[o]);
      q !== -1 && (i === -1 || q < i) && (i = q);
    }
    var I, u;
    i === -1 ? u = h.lastIndexOf("@") : u = h.lastIndexOf("@", i), u !== -1 && (I = h.slice(0, u), h = h.slice(u + 1), this.auth = decodeURIComponent(I)), i = -1;
    for (var o = 0; o < F.length; o++) {
      var q = h.indexOf(F[o]);
      q !== -1 && (i === -1 || q < i) && (i = q);
    }
    i === -1 && (i = h.length), this.host = h.slice(0, i), h = h.slice(i), this.parseHost(), this.hostname = this.hostname || "";
    var R = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
    if (!R)
      for (var a = this.hostname.split(/\./), o = 0, r = a.length; o < r; o++) {
        var g = a[o];
        if (g && !g.match(B)) {
          for (var l = "", m = 0, $ = g.length; m < $; m++)
            g.charCodeAt(m) > 127 ? l += "x" : l += g[m];
          if (!l.match(B)) {
            var A = a.slice(0, o), b = a.slice(o + 1), d = g.match(H);
            d && (A.push(d[1]), b.unshift(d[2])), b.length && (h = "/" + b.join(".") + h), this.hostname = A.join(".");
            break;
          }
        }
      }
    this.hostname.length > S ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), R || (this.hostname = N.toASCII(this.hostname));
    var v = this.port ? ":" + this.port : "", D = this.hostname || "";
    this.host = D + v, this.href += this.host, R && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), h[0] !== "/" && (h = "/" + h));
  }
  if (!k[j])
    for (var o = 0, r = T.length; o < r; o++) {
      var w = T[o];
      if (h.indexOf(w) !== -1) {
        var z = encodeURIComponent(w);
        z === w && (z = escape(w)), h = h.split(w).join(z);
      }
    }
  var L = h.indexOf("#");
  L !== -1 && (this.hash = h.substr(L), h = h.slice(0, L));
  var U = h.indexOf("?");
  if (U !== -1 ? (this.search = h.substr(U), this.query = h.substr(U + 1), e && (this.query = _.parse(this.query)), h = h.slice(0, U)) : e && (this.search = "", this.query = {}), h && (this.pathname = h), C[j] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
    var v = this.pathname || "", G = this.search || "";
    this.path = v + G;
  }
  return this.href = this.format(), this;
};
x.prototype.format = function() {
  var s = this.auth || "";
  s && (s = encodeURIComponent(s), s = s.replace(/%3A/i, ":"), s += "@");
  var e = this.protocol || "", t = this.pathname || "", f = this.hash || "", n = !1, y = "";
  this.host ? n = s + this.host : this.hostname && (n = s + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]"), this.port && (n += ":" + this.port)), this.query && typeof this.query == "object" && Object.keys(this.query).length && (y = _.stringify(this.query, {
    arrayFormat: "repeat",
    addQueryPrefix: !1
  }));
  var c = this.search || y && "?" + y || "";
  return e && e.substr(-1) !== ":" && (e += ":"), this.slashes || (!e || C[e]) && n !== !1 ? (n = "//" + (n || ""), t && t.charAt(0) !== "/" && (t = "/" + t)) : n || (n = ""), f && f.charAt(0) !== "#" && (f = "#" + f), c && c.charAt(0) !== "?" && (c = "?" + c), t = t.replace(/[?#]/g, function(h) {
    return encodeURIComponent(h);
  }), c = c.replace("#", "%23"), e + n + t + c + f;
};
x.prototype.resolve = function(s) {
  return this.resolveObject(E(s, !1, !0)).format();
};
x.prototype.resolveObject = function(s) {
  if (typeof s == "string") {
    var e = new x();
    e.parse(s, !1, !0), s = e;
  }
  for (var t = new x(), f = Object.keys(this), n = 0; n < f.length; n++) {
    var y = f[n];
    t[y] = this[y];
  }
  if (t.hash = s.hash, s.href === "")
    return t.href = t.format(), t;
  if (s.slashes && !s.protocol) {
    for (var c = Object.keys(s), h = 0; h < c.length; h++) {
      var O = c[h];
      O !== "protocol" && (t[O] = s[O]);
    }
    return C[t.protocol] && t.hostname && !t.pathname && (t.pathname = "/", t.path = t.pathname), t.href = t.format(), t;
  }
  if (s.protocol && s.protocol !== t.protocol) {
    if (!C[s.protocol]) {
      for (var p = Object.keys(s), j = 0; j < p.length; j++) {
        var P = p[j];
        t[P] = s[P];
      }
      return t.href = t.format(), t;
    }
    if (t.protocol = s.protocol, !s.host && !Z[s.protocol]) {
      for (var r = (s.pathname || "").split("/"); r.length && !(s.host = r.shift()); )
        ;
      s.host || (s.host = ""), s.hostname || (s.hostname = ""), r[0] !== "" && r.unshift(""), r.length < 2 && r.unshift(""), t.pathname = r.join("/");
    } else
      t.pathname = s.pathname;
    if (t.search = s.search, t.query = s.query, t.host = s.host || "", t.auth = s.auth, t.hostname = s.hostname || s.host, t.port = s.port, t.pathname || t.search) {
      var i = t.pathname || "", o = t.search || "";
      t.path = i + o;
    }
    return t.slashes = t.slashes || s.slashes, t.href = t.format(), t;
  }
  var q = t.pathname && t.pathname.charAt(0) === "/", I = s.host || s.pathname && s.pathname.charAt(0) === "/", u = I || q || t.host && s.pathname, R = u, a = t.pathname && t.pathname.split("/") || [], r = s.pathname && s.pathname.split("/") || [], g = t.protocol && !C[t.protocol];
  if (g && (t.hostname = "", t.port = null, t.host && (a[0] === "" ? a[0] = t.host : a.unshift(t.host)), t.host = "", s.protocol && (s.hostname = null, s.port = null, s.host && (r[0] === "" ? r[0] = s.host : r.unshift(s.host)), s.host = null), u = u && (r[0] === "" || a[0] === "")), I)
    t.host = s.host || s.host === "" ? s.host : t.host, t.hostname = s.hostname || s.hostname === "" ? s.hostname : t.hostname, t.search = s.search, t.query = s.query, a = r;
  else if (r.length)
    a || (a = []), a.pop(), a = a.concat(r), t.search = s.search, t.query = s.query;
  else if (s.search != null) {
    if (g) {
      t.host = a.shift(), t.hostname = t.host;
      var l = t.host && t.host.indexOf("@") > 0 ? t.host.split("@") : !1;
      l && (t.auth = l.shift(), t.hostname = l.shift(), t.host = t.hostname);
    }
    return t.search = s.search, t.query = s.query, (t.pathname !== null || t.search !== null) && (t.path = (t.pathname ? t.pathname : "") + (t.search ? t.search : "")), t.href = t.format(), t;
  }
  if (!a.length)
    return t.pathname = null, t.search ? t.path = "/" + t.search : t.path = null, t.href = t.format(), t;
  for (var m = a.slice(-1)[0], $ = (t.host || s.host || a.length > 1) && (m === "." || m === "..") || m === "", A = 0, b = a.length; b >= 0; b--)
    m = a[b], m === "." ? a.splice(b, 1) : m === ".." ? (a.splice(b, 1), A++) : A && (a.splice(b, 1), A--);
  if (!u && !R)
    for (; A--; A)
      a.unshift("..");
  u && a[0] !== "" && (!a[0] || a[0].charAt(0) !== "/") && a.unshift(""), $ && a.join("/").substr(-1) !== "/" && a.push("");
  var d = a[0] === "" || a[0] && a[0].charAt(0) === "/";
  if (g) {
    t.hostname = d ? "" : a.length ? a.shift() : "", t.host = t.hostname;
    var l = t.host && t.host.indexOf("@") > 0 ? t.host.split("@") : !1;
    l && (t.auth = l.shift(), t.hostname = l.shift(), t.host = t.hostname);
  }
  return u = u || t.host && a.length, u && !d && a.unshift(""), a.length > 0 ? t.pathname = a.join("/") : (t.pathname = null, t.path = null), (t.pathname !== null || t.search !== null) && (t.path = (t.pathname ? t.pathname : "") + (t.search ? t.search : "")), t.auth = s.auth || t.auth, t.slashes = t.slashes || s.slashes, t.href = t.format(), t;
};
x.prototype.parseHost = function() {
  var s = this.host, e = W.exec(s);
  e && (e = e[0], e !== ":" && (this.port = e.substr(1)), s = s.substr(0, s.length - e.length)), s && (this.hostname = s);
};
//# sourceMappingURL=index40.js.map

var l = "Function.prototype.bind called on incompatible ", y = Object.prototype.toString, g = Math.max, h = "[object Function]", v = function(o, t) {
  for (var r = [], n = 0; n < o.length; n += 1)
    r[n] = o[n];
  for (var e = 0; e < t.length; e += 1)
    r[e + o.length] = t[e];
  return r;
}, s = function(o, t) {
  for (var r = [], n = t || 0, e = 0; n < o.length; n += 1, e += 1)
    r[e] = o[n];
  return r;
}, b = function(a, o) {
  for (var t = "", r = 0; r < a.length; r += 1)
    t += a[r], r + 1 < a.length && (t += o);
  return t;
}, d = function(o) {
  var t = this;
  if (typeof t != "function" || y.apply(t) !== h)
    throw new TypeError(l + t);
  for (var r = s(arguments, 1), n, e = function() {
    if (this instanceof n) {
      var u = t.apply(
        this,
        v(r, arguments)
      );
      return Object(u) === u ? u : this;
    }
    return t.apply(
      o,
      v(r, arguments)
    );
  }, f = g(0, t.length - r.length), i = [], p = 0; p < f; p++)
    i[p] = "$" + p;
  if (n = Function("binder", "return function (" + b(i, ",") + "){ return binder.apply(this,arguments); }")(e), t.prototype) {
    var c = function() {
    };
    c.prototype = t.prototype, n.prototype = new c(), c.prototype = null;
  }
  return n;
};
export {
  d as i
};
//# sourceMappingURL=index358.js.map

import { getDefaultExportFromCjs as b } from "./index316.js";
import { __module as x } from "./index621.js";
(function(w) {
  var d = Object.prototype.hasOwnProperty, c = "~";
  function h() {
  }
  Object.create && (h.prototype = /* @__PURE__ */ Object.create(null), new h().__proto__ || (c = !1));
  function g(s, t, n) {
    this.fn = s, this.context = t, this.once = n || !1;
  }
  function m(s, t, n, r, l) {
    if (typeof n != "function")
      throw new TypeError("The listener must be a function");
    var u = new g(n, r || s, l), o = c ? c + t : t;
    return s._events[o] ? s._events[o].fn ? s._events[o] = [s._events[o], u] : s._events[o].push(u) : (s._events[o] = u, s._eventsCount++), s;
  }
  function y(s, t) {
    --s._eventsCount === 0 ? s._events = new h() : delete s._events[t];
  }
  function f() {
    this._events = new h(), this._eventsCount = 0;
  }
  f.prototype.eventNames = function() {
    var t = [], n, r;
    if (this._eventsCount === 0)
      return t;
    for (r in n = this._events)
      d.call(n, r) && t.push(c ? r.slice(1) : r);
    return Object.getOwnPropertySymbols ? t.concat(Object.getOwnPropertySymbols(n)) : t;
  }, f.prototype.listeners = function(t) {
    var n = c ? c + t : t, r = this._events[n];
    if (!r)
      return [];
    if (r.fn)
      return [r.fn];
    for (var l = 0, u = r.length, o = new Array(u); l < u; l++)
      o[l] = r[l].fn;
    return o;
  }, f.prototype.listenerCount = function(t) {
    var n = c ? c + t : t, r = this._events[n];
    return r ? r.fn ? 1 : r.length : 0;
  }, f.prototype.emit = function(t, n, r, l, u, o) {
    var a = c ? c + t : t;
    if (!this._events[a])
      return !1;
    var e = this._events[a], p = arguments.length, v, i;
    if (e.fn) {
      switch (e.once && this.removeListener(t, e.fn, void 0, !0), p) {
        case 1:
          return e.fn.call(e.context), !0;
        case 2:
          return e.fn.call(e.context, n), !0;
        case 3:
          return e.fn.call(e.context, n, r), !0;
        case 4:
          return e.fn.call(e.context, n, r, l), !0;
        case 5:
          return e.fn.call(e.context, n, r, l, u), !0;
        case 6:
          return e.fn.call(e.context, n, r, l, u, o), !0;
      }
      for (i = 1, v = new Array(p - 1); i < p; i++)
        v[i - 1] = arguments[i];
      e.fn.apply(e.context, v);
    } else {
      var E = e.length, _;
      for (i = 0; i < E; i++)
        switch (e[i].once && this.removeListener(t, e[i].fn, void 0, !0), p) {
          case 1:
            e[i].fn.call(e[i].context);
            break;
          case 2:
            e[i].fn.call(e[i].context, n);
            break;
          case 3:
            e[i].fn.call(e[i].context, n, r);
            break;
          case 4:
            e[i].fn.call(e[i].context, n, r, l);
            break;
          default:
            if (!v)
              for (_ = 1, v = new Array(p - 1); _ < p; _++)
                v[_ - 1] = arguments[_];
            e[i].fn.apply(e[i].context, v);
        }
    }
    return !0;
  }, f.prototype.on = function(t, n, r) {
    return m(this, t, n, r, !1);
  }, f.prototype.once = function(t, n, r) {
    return m(this, t, n, r, !0);
  }, f.prototype.removeListener = function(t, n, r, l) {
    var u = c ? c + t : t;
    if (!this._events[u])
      return this;
    if (!n)
      return y(this, u), this;
    var o = this._events[u];
    if (o.fn)
      o.fn === n && (!l || o.once) && (!r || o.context === r) && y(this, u);
    else {
      for (var a = 0, e = [], p = o.length; a < p; a++)
        (o[a].fn !== n || l && !o[a].once || r && o[a].context !== r) && e.push(o[a]);
      e.length ? this._events[u] = e.length === 1 ? e[0] : e : y(this, u);
    }
    return this;
  }, f.prototype.removeAllListeners = function(t) {
    var n;
    return t ? (n = c ? c + t : t, this._events[n] && y(this, n)) : (this._events = new h(), this._eventsCount = 0), this;
  }, f.prototype.off = f.prototype.removeListener, f.prototype.addListener = f.prototype.on, f.prefixed = c, f.EventEmitter = f, w.exports = f;
})(x);
var L = x.exports;
const A = /* @__PURE__ */ b(L);
export {
  A as default
};
//# sourceMappingURL=index157.js.map

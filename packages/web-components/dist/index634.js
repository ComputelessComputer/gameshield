import { g as f } from "./index636.js";
import { c as s } from "./index637.js";
import { o as c } from "./index631.js";
import { s as u } from "./index633.js";
import { t as l } from "./index630.js";
var m = f, o = s, v = c, n = u, M = l, r = m("%WeakMap%", !0), d = o("WeakMap.prototype.get", !0), h = o("WeakMap.prototype.set", !0), $ = o("WeakMap.prototype.has", !0), w = o("WeakMap.prototype.delete", !0), I = r ? (
  /** @type {Exclude<import('.'), false>} */
  function() {
    var e, a, p = {
      assert: function(t) {
        if (!p.has(t))
          throw new M("Side channel does not contain " + v(t));
      },
      delete: function(t) {
        if (r && t && (typeof t == "object" || typeof t == "function")) {
          if (e)
            return w(e, t);
        } else if (n && a)
          return a.delete(t);
        return !1;
      },
      get: function(t) {
        return r && t && (typeof t == "object" || typeof t == "function") && e ? d(e, t) : a && a.get(t);
      },
      has: function(t) {
        return r && t && (typeof t == "object" || typeof t == "function") && e ? $(e, t) : !!a && a.has(t);
      },
      set: function(t, i) {
        r && t && (typeof t == "object" || typeof t == "function") ? (e || (e = new r()), h(e, t, i)) : n && (a || (a = n()), a.set(t, i));
      }
    };
    return p;
  }
) : n;
export {
  I as s
};
//# sourceMappingURL=index634.js.map

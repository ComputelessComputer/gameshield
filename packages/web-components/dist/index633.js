import { g as p } from "./index636.js";
import { c as i } from "./index637.js";
import { o as s } from "./index631.js";
import { t as u } from "./index630.js";
var f = p, r = i, c = s, v = u, o = f("%Map%", !0), m = r("Map.prototype.get", !0), l = r("Map.prototype.set", !0), d = r("Map.prototype.has", !0), M = r("Map.prototype.delete", !0), $ = r("Map.prototype.size", !0), I = !!o && /** @type {Exclude<import('.'), false>} */
function() {
  var e, n = {
    assert: function(t) {
      if (!n.has(t))
        throw new v("Side channel does not contain " + c(t));
    },
    delete: function(t) {
      if (e) {
        var a = M(e, t);
        return $(e) === 0 && (e = void 0), a;
      }
      return !1;
    },
    get: function(t) {
      if (e)
        return m(e, t);
    },
    has: function(t) {
      return e ? d(e, t) : !1;
    },
    set: function(t, a) {
      e || (e = new o()), l(e, t, a);
    }
  };
  return n;
};
export {
  I as s
};
//# sourceMappingURL=index633.js.map

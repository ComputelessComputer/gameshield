import { t as r } from "./index320.js";
import { o as i } from "./index321.js";
import { s } from "./index322.js";
import { s as o } from "./index323.js";
import { s as h } from "./index324.js";
var l = r, p = i, c = s, f = o, d = h, m = d || f || c, k = function() {
  var n, a = {
    assert: function(e) {
      if (!a.has(e))
        throw new l("Side channel does not contain " + p(e));
    },
    delete: function(e) {
      return !!n && n.delete(e);
    },
    get: function(e) {
      return n && n.get(e);
    },
    has: function(e) {
      return !!n && n.has(e);
    },
    set: function(e, t) {
      n || (n = m()), n.set(e, t);
    }
  };
  return a;
};
export {
  k as s
};
//# sourceMappingURL=index318.js.map

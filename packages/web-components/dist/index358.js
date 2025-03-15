import { c as _ } from "./index353.js";
import { g as s } from "./index343.js";
var o, f;
function g() {
  if (f)
    return o;
  f = 1;
  var i = _, c = s, p;
  try {
    p = /** @type {{ __proto__?: typeof Array.prototype }} */
    [].__proto__ === Array.prototype;
  } catch (t) {
    if (!t || typeof t != "object" || !("code" in t) || t.code !== "ERR_PROTO_ACCESS")
      throw t;
  }
  var r = !!p && c && c(
    Object.prototype,
    /** @type {keyof typeof Object.prototype} */
    "__proto__"
  ), a = Object, n = a.getPrototypeOf;
  return o = r && typeof r.get == "function" ? i([r.get]) : typeof n == "function" ? (
    /** @type {import('./get')} */
    function(e) {
      return n(e == null ? e : a(e));
    }
  ) : !1, o;
}
export {
  g as __require
};
//# sourceMappingURL=index358.js.map

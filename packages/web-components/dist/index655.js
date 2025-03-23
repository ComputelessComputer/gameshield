import { __require as a } from "./index667.js";
var r, o;
function i() {
  if (o)
    return r;
  o = 1;
  var e = typeof Symbol < "u" && Symbol, f = a();
  return r = function() {
    return typeof e != "function" || typeof Symbol != "function" || typeof e("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : f();
  }, r;
}
export {
  i as __require
};
//# sourceMappingURL=index655.js.map

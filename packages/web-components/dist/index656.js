import { __require as f } from "./index658.js";
import { __require as a } from "./index657.js";
import { __require as P } from "./index668.js";
var e, u;
function p() {
  if (u)
    return e;
  u = 1;
  var t = f(), o = a(), i = P();
  return e = t ? function(r) {
    return t(r);
  } : o ? function(r) {
    if (!r || typeof r != "object" && typeof r != "function")
      throw new TypeError("getProto: not an object");
    return o(r);
  } : i ? function(r) {
    return i(r);
  } : null, e;
}
export {
  p as __require
};
//# sourceMappingURL=index656.js.map

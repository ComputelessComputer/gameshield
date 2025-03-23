import { Bounds as e } from "./index399.js";
import { getGlobalBounds as u } from "./index447.js";
const a = new e();
function l(o, n, d) {
  const s = a;
  o.measurable = !0, u(o, d, s), n.addBoundsMask(s), o.measurable = !1;
}
export {
  l as addMaskBounds
};
//# sourceMappingURL=index443.js.map

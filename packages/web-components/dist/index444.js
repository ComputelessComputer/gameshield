import { getLocalBounds as i } from "./index448.js";
import { boundsPool as a, matrixPool as s } from "./index449.js";
import { warn as l } from "./index338.js";
function M(o, e, n) {
  const r = a.get();
  o.measurable = !0;
  const t = s.get().identity(), d = u(o, n, t);
  i(o, r, d), o.measurable = !1, e.addBoundsMask(r), s.return(t), a.return(r);
}
function u(o, e, n) {
  return o ? (o !== e && (u(o.parent, e, n), o.updateLocalTransform(), n.append(o.localTransform)), n) : (l("Mask bounds, renderable is not inside the root container"), n);
}
export {
  M as addMaskLocalBounds,
  u as getMatrixRelativeToParent
};
//# sourceMappingURL=index444.js.map

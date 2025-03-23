import { updateQuadBounds as u } from "./index557.js";
function i(t, o) {
  const { texture: a, bounds: n } = t;
  u(n, o._anchor, a);
  const d = o._style.padding;
  n.minX -= d, n.minY -= d, n.maxX -= d, n.maxY -= d;
}
export {
  i as updateTextBounds
};
//# sourceMappingURL=index574.js.map

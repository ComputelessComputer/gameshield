import { Matrix as m } from "./index393.js";
import { applyMatrix as f } from "./index555.js";
function y(o, h) {
  const e = o.texture, c = e.frame.width, x = e.frame.height;
  let r = 0, a = 0;
  o.applyAnchorToTexture && (r = o.anchor.x, a = o.anchor.y), h[0] = h[6] = -r, h[2] = h[4] = 1 - r, h[1] = h[3] = -a, h[5] = h[7] = 1 - a;
  const t = m.shared;
  t.copyFrom(o._tileTransform.matrix), t.tx /= o.width, t.ty /= o.height, t.invert(), t.scale(o.width / c, o.height / x), f(h, 2, 0, t);
}
export {
  y as setUvs
};
//# sourceMappingURL=index554.js.map

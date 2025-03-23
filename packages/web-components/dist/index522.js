import { Color as o } from "./index377.js";
import { Texture as f } from "./index360.js";
import { FillGradient as F } from "./index517.js";
import { FillPattern as d } from "./index518.js";
function b(r) {
  return o.isColorLike(r);
}
function c(r) {
  return r instanceof d;
}
function s(r) {
  return r instanceof F;
}
function L(r) {
  return r instanceof f;
}
function k(r, t, n) {
  const e = o.shared.setValue(t ?? 0);
  return r.color = e.toNumber(), r.alpha = e.alpha === 1 ? n.alpha : e.alpha, r.texture = f.WHITE, { ...n, ...r };
}
function C(r, t, n) {
  return r.texture = t, { ...n, ...r };
}
function u(r, t, n) {
  return r.fill = t, r.color = 16777215, r.texture = t.texture, r.matrix = t.transform, { ...n, ...r };
}
function l(r, t, n) {
  return t.buildGradient(), r.fill = t, r.color = 16777215, r.texture = t.texture, r.matrix = t.transform, r.textureSpace = t.textureSpace, { ...n, ...r };
}
function G(r, t) {
  const n = { ...t, ...r }, e = o.shared.setValue(n.color);
  return n.alpha *= e.alpha, n.color = e.toNumber(), n;
}
function T(r, t) {
  if (r == null)
    return null;
  const n = {}, e = r;
  return b(r) ? k(n, r, t) : L(r) ? C(n, r, t) : c(r) ? u(n, r, t) : s(r) ? l(n, r, t) : e.fill && c(e.fill) ? u(e, e.fill, t) : e.fill && s(e.fill) ? l(e, e.fill, t) : G(e, t);
}
function g(r, t) {
  const { width: n, alignment: e, miterLimit: m, cap: a, join: p, pixelLine: x, ...h } = t, i = T(r, h);
  return i ? {
    width: n,
    alignment: e,
    miterLimit: m,
    cap: a,
    join: p,
    pixelLine: x,
    ...i
  } : null;
}
export {
  T as toFillStyle,
  g as toStrokeStyle
};
//# sourceMappingURL=index522.js.map

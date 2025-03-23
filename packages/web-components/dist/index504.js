import { GraphicsContextSystem as M } from "./index503.js";
const N = 8, O = 11920929e-14, _ = 1;
function C(s, o, c, e, r, t, n, u) {
  const S = Math.min(
    0.99,
    // a value of 1.0 actually inverts smoothing, so we cap it at 0.99
    Math.max(0, u ?? M.defaultOptions.bezierSmoothness)
  );
  let i = (_ - S) / 1;
  return i *= i, p(o, c, e, r, t, n, s, i), s;
}
function p(s, o, c, e, r, t, n, u) {
  b(n, s, o, c, e, r, t, u, 0), n.push(r, t);
}
function b(s, o, c, e, r, t, n, u, I) {
  if (I > N)
    return;
  const S = (o + e) / 2, i = (c + r) / 2, E = (e + t) / 2, L = (r + n) / 2, a = (S + E) / 2, m = (i + L) / 2;
  let f = t - o, h = n - c;
  const d = Math.abs((e - t) * h - (r - n) * f);
  if (d > O) {
    if (d * d <= u * (f * f + h * h)) {
      s.push(a, m);
      return;
    }
  } else if (f = a - (o + t) / 2, h = m - (c + n) / 2, f * f + h * h <= u) {
    s.push(a, m);
    return;
  }
  b(s, o, c, S, i, a, m, u, I + 1), b(s, a, m, E, L, t, n, u, I + 1);
}
export {
  C as buildAdaptiveQuadratic
};
//# sourceMappingURL=index504.js.map

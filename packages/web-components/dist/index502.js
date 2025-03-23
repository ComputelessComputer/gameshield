import { GraphicsContextSystem as R } from "./index503.js";
const B = 8, N = 11920929e-14, D = 1;
function H(r, f, h, i, e, m, t, s, n, u) {
  const L = Math.min(
    0.99,
    // a value of 1.0 actually inverts smoothing, so we cap it at 0.99
    Math.max(0, u ?? R.defaultOptions.bezierSmoothness)
  );
  let b = (D - L) / 1;
  return b *= b, F(f, h, i, e, m, t, s, n, r, b), r;
}
function F(r, f, h, i, e, m, t, s, n, u) {
  O(r, f, h, i, e, m, t, s, n, u, 0), n.push(t, s);
}
function O(r, f, h, i, e, m, t, s, n, u, E) {
  if (E > B)
    return;
  const L = (r + h) / 2, b = (f + i) / 2, _ = (h + e) / 2, d = (i + m) / 2, p = (e + t) / 2, A = (m + s) / 2, C = (L + _) / 2, P = (b + d) / 2, g = (_ + p) / 2, z = (d + A) / 2, I = (C + g) / 2, S = (P + z) / 2;
  if (E > 0) {
    let o = t - r, c = s - f;
    const M = Math.abs((h - t) * c - (i - s) * o), a = Math.abs((e - t) * c - (m - s) * o);
    if (M > N && a > N) {
      if ((M + a) * (M + a) <= u * (o * o + c * c)) {
        n.push(I, S);
        return;
      }
    } else if (M > N) {
      if (M * M <= u * (o * o + c * c)) {
        n.push(I, S);
        return;
      }
    } else if (a > N) {
      if (a * a <= u * (o * o + c * c)) {
        n.push(I, S);
        return;
      }
    } else if (o = I - (r + t) / 2, c = S - (f + s) / 2, o * o + c * c <= u) {
      n.push(I, S);
      return;
    }
  }
  O(r, f, L, b, C, P, I, S, n, u, E + 1), O(I, S, g, z, p, A, t, s, n, u, E + 1);
}
export {
  H as buildAdaptiveBezier
};
//# sourceMappingURL=index502.js.map

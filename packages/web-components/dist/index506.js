import { buildArc as z } from "./index505.js";
function D(t, a, e, j, k, l) {
  const u = t[t.length - 2], c = t[t.length - 1] - e, n = u - a, o = k - e, s = j - a, f = Math.abs(c * s - n * o);
  if (f < 1e-8 || l === 0) {
    (t[t.length - 2] !== a || t[t.length - 1] !== e) && t.push(a, e);
    return;
  }
  const b = c * c + n * n, M = o * o + s * s, q = c * o + n * s, h = l * Math.sqrt(b) / f, r = l * Math.sqrt(M) / f, A = h * q / b, d = r * q / M, m = h * s + r * n, g = h * o + r * c, Y = n * (r + A), T = c * (r + A), X = s * (h + d), v = o * (h + d), w = Math.atan2(T - g, Y - m), x = Math.atan2(v - g, X - m);
  z(
    t,
    m + a,
    g + e,
    l,
    w,
    x,
    n * o > s * c
  );
}
export {
  D as buildArcTo
};
//# sourceMappingURL=index506.js.map

import { buildAdaptiveBezier as G } from "./index502.js";
const A = Math.PI * 2, z = {
  centerX: 0,
  centerY: 0,
  ang1: 0,
  ang2: 0
}, B = ({ x: n, y: c }, h, e, o, t, s, M, r) => {
  n *= h, c *= e;
  const u = o * n - t * c, a = t * n + o * c;
  return r.x = u + s, r.y = a + M, r;
};
function H(n, c) {
  const h = c === -1.5707963267948966 ? -0.551915024494 : 1.3333333333333333 * Math.tan(c / 4), e = c === 1.5707963267948966 ? 0.551915024494 : h, o = Math.cos(n), t = Math.sin(n), s = Math.cos(n + c), M = Math.sin(n + c);
  return [
    {
      x: o - t * e,
      y: t + o * e
    },
    {
      x: s + M * e,
      y: M - s * e
    },
    {
      x: s,
      y: M
    }
  ];
}
const j = (n, c, h, e) => {
  const o = n * e - c * h < 0 ? -1 : 1;
  let t = n * h + c * e;
  return t > 1 && (t = 1), t < -1 && (t = -1), o * Math.acos(t);
}, J = (n, c, h, e, o, t, s, M, r, u, a, i, f) => {
  const v = Math.pow(o, 2), d = Math.pow(t, 2), X = Math.pow(a, 2), g = Math.pow(i, 2);
  let l = v * d - v * g - d * X;
  l < 0 && (l = 0), l /= v * g + d * X, l = Math.sqrt(l) * (s === M ? -1 : 1);
  const b = l * o / t * i, q = l * -t / o * a, S = u * b - r * q + (n + h) / 2, T = r * b + u * q + (c + e) / 2, Y = (a - b) / o, w = (i - q) / t, C = (-a - b) / o, p = (-i - q) / t, U = j(1, 0, Y, w);
  let m = j(Y, w, C, p);
  M === 0 && m > 0 && (m -= A), M === 1 && m < 0 && (m += A), f.centerX = S, f.centerY = T, f.ang1 = U, f.ang2 = m;
};
function L(n, c, h, e, o, t, s, M = 0, r = 0, u = 0) {
  if (t === 0 || s === 0)
    return;
  const a = Math.sin(M * A / 360), i = Math.cos(M * A / 360), f = i * (c - e) / 2 + a * (h - o) / 2, v = -a * (c - e) / 2 + i * (h - o) / 2;
  if (f === 0 && v === 0)
    return;
  t = Math.abs(t), s = Math.abs(s);
  const d = Math.pow(f, 2) / Math.pow(t, 2) + Math.pow(v, 2) / Math.pow(s, 2);
  d > 1 && (t *= Math.sqrt(d), s *= Math.sqrt(d)), J(
    c,
    h,
    e,
    o,
    t,
    s,
    r,
    u,
    a,
    i,
    f,
    v,
    z
  );
  let { ang1: X, ang2: g } = z;
  const { centerX: l, centerY: b } = z;
  let q = Math.abs(g) / (A / 4);
  Math.abs(1 - q) < 1e-7 && (q = 1);
  const S = Math.max(Math.ceil(q), 1);
  g /= S;
  let T = n[n.length - 2], Y = n[n.length - 1];
  const w = { x: 0, y: 0 };
  for (let C = 0; C < S; C++) {
    const p = H(X, g), { x: U, y: m } = B(p[0], t, s, i, a, l, b, w), { x: k, y: D } = B(p[1], t, s, i, a, l, b, w), { x: E, y: I } = B(p[2], t, s, i, a, l, b, w);
    G(
      n,
      T,
      Y,
      U,
      m,
      k,
      D,
      E,
      I
    ), T = E, Y = I, X += g;
  }
}
export {
  L as buildArcToSvg
};
//# sourceMappingURL=index507.js.map

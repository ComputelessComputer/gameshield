import { Point as v } from "./index383.js";
import { closePointEps as ut, curveEps as tt } from "./index510.js";
import { getOrientationOfPoints as ot } from "./index511.js";
function et(n, d, b, x, A, C, p, c) {
  const y = n - b * A, I = d - x * A, q = n + b * C, S = d + x * C;
  let j, t;
  p ? (j = x, t = -b) : (j = -x, t = b);
  const D = y + j, a = I + t, L = q + j, m = S + t;
  return c.push(D, a), c.push(L, m), 2;
}
function B(n, d, b, x, A, C, p, c) {
  const y = b - n, I = x - d;
  let q = Math.atan2(y, I), S = Math.atan2(A - n, C - d);
  c && q < S ? q += Math.PI * 2 : !c && q > S && (S += Math.PI * 2);
  let j = q;
  const t = S - q, D = Math.abs(t), a = Math.sqrt(y * y + I * I), L = (15 * D * Math.sqrt(a) / Math.PI >> 0) + 1, m = t / L;
  if (j += m, c) {
    p.push(n, d), p.push(b, x);
    for (let O = 1, w = j; O < L; O++, w += m)
      p.push(n, d), p.push(
        n + Math.sin(w) * a,
        d + Math.cos(w) * a
      );
    p.push(n, d), p.push(A, C);
  } else {
    p.push(b, x), p.push(n, d);
    for (let O = 1, w = j; O < L; O++, w += m)
      p.push(
        n + Math.sin(w) * a,
        d + Math.cos(w) * a
      ), p.push(n, d);
    p.push(A, C), p.push(n, d);
  }
  return L * 2;
}
function ft(n, d, b, x, A, C) {
  const p = ut;
  if (n.length === 0)
    return;
  const c = d;
  let y = c.alignment;
  if (d.alignment !== 0.5) {
    let l = ot(n);
    b && (l *= -1), y = (y - 0.5) * l + 0.5;
  }
  const I = new v(n[0], n[1]), q = new v(n[n.length - 2], n[n.length - 1]), S = x, j = Math.abs(I.x - q.x) < p && Math.abs(I.y - q.y) < p;
  if (S) {
    n = n.slice(), j && (n.pop(), n.pop(), q.set(n[n.length - 2], n[n.length - 1]));
    const l = (I.x + q.x) * 0.5, E = (q.y + I.y) * 0.5;
    n.unshift(l, E), n.push(l, E);
  }
  const t = A, D = n.length / 2;
  let a = n.length;
  const L = t.length / 2, m = c.width / 2, O = m * m, w = c.miterLimit * c.miterLimit;
  let M = n[0], g = n[1], s = n[2], e = n[3], F = 0, X = 0, u = -(g - e), o = M - s, f = 0, r = 0, P = Math.sqrt(u * u + o * o);
  u /= P, o /= P, u *= m, o *= m;
  const U = y, h = (1 - U) * 2, i = U * 2;
  S || (c.cap === "round" ? a += B(
    M - u * (h - i) * 0.5,
    g - o * (h - i) * 0.5,
    M - u * h,
    g - o * h,
    M + u * i,
    g + o * i,
    t,
    !0
  ) + 2 : c.cap === "square" && (a += et(M, g, u, o, h, i, !0, t))), t.push(
    M - u * h,
    g - o * h
  ), t.push(
    M + u * i,
    g + o * i
  );
  for (let l = 1; l < D - 1; ++l) {
    M = n[(l - 1) * 2], g = n[(l - 1) * 2 + 1], s = n[l * 2], e = n[l * 2 + 1], F = n[(l + 1) * 2], X = n[(l + 1) * 2 + 1], u = -(g - e), o = M - s, P = Math.sqrt(u * u + o * o), u /= P, o /= P, u *= m, o *= m, f = -(e - X), r = s - F, P = Math.sqrt(f * f + r * r), f /= P, r /= P, f *= m, r *= m;
    const E = s - M, G = g - e, H = s - F, J = X - e, V = E * H + G * J, N = G * H - J * E, K = N < 0;
    if (Math.abs(N) < 1e-3 * Math.abs(V)) {
      t.push(
        s - u * h,
        e - o * h
      ), t.push(
        s + u * i,
        e + o * i
      ), V >= 0 && (c.join === "round" ? a += B(
        s,
        e,
        s - u * h,
        e - o * h,
        s - f * h,
        e - r * h,
        t,
        !1
      ) + 4 : a += 2, t.push(
        s - f * i,
        e - r * i
      ), t.push(
        s + f * h,
        e + r * h
      ));
      continue;
    }
    const Z = (-u + M) * (-o + e) - (-u + s) * (-o + g), _ = (-f + F) * (-r + e) - (-f + s) * (-r + X), Q = (E * _ - H * Z) / N, R = (J * Z - G * _) / N, T = (Q - s) * (Q - s) + (R - e) * (R - e), Y = s + (Q - s) * h, k = e + (R - e) * h, W = s - (Q - s) * i, z = e - (R - e) * i, nt = Math.min(E * E + G * G, H * H + J * J), $ = K ? h : i, ht = nt + $ * $ * O;
    T <= ht ? c.join === "bevel" || T / O > w ? (K ? (t.push(Y, k), t.push(s + u * i, e + o * i), t.push(Y, k), t.push(s + f * i, e + r * i)) : (t.push(s - u * h, e - o * h), t.push(W, z), t.push(s - f * h, e - r * h), t.push(W, z)), a += 2) : c.join === "round" ? K ? (t.push(Y, k), t.push(s + u * i, e + o * i), a += B(
      s,
      e,
      s + u * i,
      e + o * i,
      s + f * i,
      e + r * i,
      t,
      !0
    ) + 4, t.push(Y, k), t.push(s + f * i, e + r * i)) : (t.push(s - u * h, e - o * h), t.push(W, z), a += B(
      s,
      e,
      s - u * h,
      e - o * h,
      s - f * h,
      e - r * h,
      t,
      !1
    ) + 4, t.push(s - f * h, e - r * h), t.push(W, z)) : (t.push(Y, k), t.push(W, z)) : (t.push(s - u * h, e - o * h), t.push(s + u * i, e + o * i), c.join === "round" ? K ? a += B(
      s,
      e,
      s + u * i,
      e + o * i,
      s + f * i,
      e + r * i,
      t,
      !0
    ) + 2 : a += B(
      s,
      e,
      s - u * h,
      e - o * h,
      s - f * h,
      e - r * h,
      t,
      !1
    ) + 2 : c.join === "miter" && T / O <= w && (K ? (t.push(W, z), t.push(W, z)) : (t.push(Y, k), t.push(Y, k)), a += 2), t.push(s - f * h, e - r * h), t.push(s + f * i, e + r * i), a += 2);
  }
  M = n[(D - 2) * 2], g = n[(D - 2) * 2 + 1], s = n[(D - 1) * 2], e = n[(D - 1) * 2 + 1], u = -(g - e), o = M - s, P = Math.sqrt(u * u + o * o), u /= P, o /= P, u *= m, o *= m, t.push(s - u * h, e - o * h), t.push(s + u * i, e + o * i), S || (c.cap === "round" ? a += B(
    s - u * (h - i) * 0.5,
    e - o * (h - i) * 0.5,
    s - u * h,
    e - o * h,
    s + u * i,
    e + o * i,
    t,
    !1
  ) + 2 : c.cap === "square" && (a += et(s, e, u, o, h, i, !1, t)));
  const st = tt * tt;
  for (let l = L; l < a + L - 2; ++l)
    M = t[l * 2], g = t[l * 2 + 1], s = t[(l + 1) * 2], e = t[(l + 1) * 2 + 1], F = t[(l + 2) * 2], X = t[(l + 2) * 2 + 1], !(Math.abs(M * (e - X) + s * (X - g) + F * (g - e)) < st) && C.push(l, l + 1, l + 2);
}
export {
  ft as buildLine
};
//# sourceMappingURL=index509.js.map

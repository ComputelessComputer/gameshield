import "./index23.js";
import "./index24.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import "./index28.js";
import "./index29.js";
import "./index30.js";
import "./index31.js";
import "./index32.js";
import { Point as G } from "./index33.js";
import "./index34.js";
import { SHAPES as ot } from "./index165.js";
import "./index35.js";
import "./index36.js";
import "./index37.js";
import "./index38.js";
import "./index39.js";
import "./index40.js";
import "./index41.js";
import "./index42.js";
import "./index43.js";
import "./index44.js";
import "./index45.js";
import "./index46.js";
import "./index47.js";
import "./index48.js";
import "./index49.js";
import "./index50.js";
import "./index51.js";
import "./index52.js";
import "./index53.js";
import "./index54.js";
import "./index55.js";
import "./index56.js";
import "./index57.js";
import "./index58.js";
import "./index59.js";
import "./index60.js";
import "./index61.js";
import "./index62.js";
import "./index63.js";
import "./index64.js";
import "./index65.js";
import "./index66.js";
import "./index67.js";
import "./index68.js";
import "./index69.js";
import "./index70.js";
import "./index71.js";
import "./index72.js";
import "./index73.js";
import "./index74.js";
import "./index75.js";
import "./index76.js";
import "./index77.js";
import "./index78.js";
import "./index79.js";
import "./index80.js";
import "./index81.js";
import { LINE_CAP as W, LINE_JOIN as U, curves as tt } from "./index264.js";
function it(m, h, g, o, b, f, S, I) {
  const L = m - g * b, N = h - o * b, e = m + g * f, E = h + o * f;
  let l, x;
  S ? (l = o, x = -g) : (l = -o, x = g);
  const P = L + l, R = N + x, O = e + l, d = E + x;
  return I.push(
    P,
    R,
    O,
    d
  ), 2;
}
function D(m, h, g, o, b, f, S, I) {
  const L = g - m, N = o - h;
  let e = Math.atan2(L, N), E = Math.atan2(b - m, f - h);
  I && e < E ? e += Math.PI * 2 : !I && e > E && (E += Math.PI * 2);
  let l = e;
  const x = E - e, P = Math.abs(x), R = Math.sqrt(L * L + N * N), O = (15 * P * Math.sqrt(R) / Math.PI >> 0) + 1, d = x / O;
  if (l += d, I) {
    S.push(
      m,
      h,
      g,
      o
    );
    for (let u = 1, t = l; u < O; u++, t += d)
      S.push(
        m,
        h,
        m + Math.sin(t) * R,
        h + Math.cos(t) * R
      );
    S.push(
      m,
      h,
      b,
      f
    );
  } else {
    S.push(
      g,
      o,
      m,
      h
    );
    for (let u = 1, t = l; u < O; u++, t += d)
      S.push(
        m + Math.sin(t) * R,
        h + Math.cos(t) * R,
        m,
        h
      );
    S.push(
      b,
      f,
      m,
      h
    );
  }
  return O * 2;
}
function mt(m, h) {
  const g = m.shape;
  let o = m.points || g.points.slice();
  const b = h.closePointEps;
  if (o.length === 0)
    return;
  const f = m.lineStyle, S = new G(o[0], o[1]), I = new G(o[o.length - 2], o[o.length - 1]), L = g.type !== ot.POLY || g.closeStroke, N = Math.abs(S.x - I.x) < b && Math.abs(S.y - I.y) < b;
  if (L) {
    o = o.slice(), N && (o.pop(), o.pop(), I.set(o[o.length - 2], o[o.length - 1]));
    const a = (S.x + I.x) * 0.5, k = (I.y + S.y) * 0.5;
    o.unshift(a, k), o.push(a, k);
  }
  const e = h.points, E = o.length / 2;
  let l = o.length;
  const x = e.length / 2, P = f.width / 2, R = P * P, O = f.miterLimit * f.miterLimit;
  let d = o[0], u = o[1], t = o[2], i = o[3], T = 0, w = 0, s = -(u - i), n = d - t, c = 0, M = 0, q = Math.sqrt(s * s + n * n);
  s /= q, n /= q, s *= P, n *= P;
  const X = f.alignment, p = (1 - X) * 2, r = X * 2;
  L || (f.cap === W.ROUND ? l += D(
    d - s * (p - r) * 0.5,
    u - n * (p - r) * 0.5,
    d - s * p,
    u - n * p,
    d + s * r,
    u + n * r,
    e,
    !0
  ) + 2 : f.cap === W.SQUARE && (l += it(d, u, s, n, p, r, !0, e))), e.push(
    d - s * p,
    u - n * p,
    d + s * r,
    u + n * r
  );
  for (let a = 1; a < E - 1; ++a) {
    d = o[(a - 1) * 2], u = o[(a - 1) * 2 + 1], t = o[a * 2], i = o[a * 2 + 1], T = o[(a + 1) * 2], w = o[(a + 1) * 2 + 1], s = -(u - i), n = d - t, q = Math.sqrt(s * s + n * n), s /= q, n /= q, s *= P, n *= P, c = -(i - w), M = t - T, q = Math.sqrt(c * c + M * M), c /= q, M /= q, c *= P, M *= P;
    const k = t - d, Y = u - i, B = t - T, Q = w - i, z = k * B + Y * Q, _ = Y * B - Q * k, V = _ < 0;
    if (Math.abs(_) < 1e-3 * Math.abs(z)) {
      e.push(
        t - s * p,
        i - n * p,
        t + s * r,
        i + n * r
      ), z >= 0 && (f.join === U.ROUND ? l += D(
        t,
        i,
        t - s * p,
        i - n * p,
        t - c * p,
        i - M * p,
        e,
        !1
      ) + 4 : l += 2, e.push(
        t - c * r,
        i - M * r,
        t + c * p,
        i + M * p
      ));
      continue;
    }
    const F = (-s + d) * (-n + i) - (-s + t) * (-n + u), K = (-c + T) * (-M + i) - (-c + t) * (-M + w), v = (k * K - B * F) / _, H = (Q * F - Y * K) / _, Z = (v - t) * (v - t) + (H - i) * (H - i), y = t + (v - t) * p, A = i + (H - i) * p, j = t - (v - t) * r, C = i - (H - i) * r, st = Math.min(k * k + Y * Y, B * B + Q * Q), $ = V ? p : r, nt = st + $ * $ * R, rt = Z <= nt;
    let J = f.join;
    if (J === U.MITER && Z / R > O && (J = U.BEVEL), rt)
      switch (J) {
        case U.MITER: {
          e.push(
            y,
            A,
            j,
            C
          );
          break;
        }
        case U.BEVEL: {
          V ? e.push(
            y,
            A,
            // inner miter point
            t + s * r,
            i + n * r,
            // first segment's outer vertex
            y,
            A,
            // inner miter point
            t + c * r,
            i + M * r
          ) : e.push(
            t - s * p,
            i - n * p,
            // first segment's inner vertex
            j,
            C,
            // outer miter point
            t - c * p,
            i - M * p,
            // second segment's outer vertex
            j,
            C
          ), l += 2;
          break;
        }
        case U.ROUND: {
          V ? (e.push(
            y,
            A,
            t + s * r,
            i + n * r
          ), l += D(
            t,
            i,
            t + s * r,
            i + n * r,
            t + c * r,
            i + M * r,
            e,
            !0
          ) + 4, e.push(
            y,
            A,
            t + c * r,
            i + M * r
          )) : (e.push(
            t - s * p,
            i - n * p,
            j,
            C
          ), l += D(
            t,
            i,
            t - s * p,
            i - n * p,
            t - c * p,
            i - M * p,
            e,
            !1
          ) + 4, e.push(
            t - c * p,
            i - M * p,
            j,
            C
          ));
          break;
        }
      }
    else {
      switch (e.push(
        t - s * p,
        i - n * p,
        // first segment's inner vertex
        t + s * r,
        i + n * r
      ), J) {
        case U.MITER: {
          V ? e.push(
            j,
            C,
            // inner miter point
            j,
            C
          ) : e.push(
            y,
            A,
            // outer miter point
            y,
            A
          ), l += 2;
          break;
        }
        case U.ROUND: {
          V ? l += D(
            t,
            i,
            t + s * r,
            i + n * r,
            t + c * r,
            i + M * r,
            e,
            !0
          ) + 2 : l += D(
            t,
            i,
            t - s * p,
            i - n * p,
            t - c * p,
            i - M * p,
            e,
            !1
          ) + 2;
          break;
        }
      }
      e.push(
        t - c * p,
        i - M * p,
        // second segment's inner vertex
        t + c * r,
        i + M * r
      ), l += 2;
    }
  }
  d = o[(E - 2) * 2], u = o[(E - 2) * 2 + 1], t = o[(E - 1) * 2], i = o[(E - 1) * 2 + 1], s = -(u - i), n = d - t, q = Math.sqrt(s * s + n * n), s /= q, n /= q, s *= P, n *= P, e.push(
    t - s * p,
    i - n * p,
    t + s * r,
    i + n * r
  ), L || (f.cap === W.ROUND ? l += D(
    t - s * (p - r) * 0.5,
    i - n * (p - r) * 0.5,
    t - s * p,
    i - n * p,
    t + s * r,
    i + n * r,
    e,
    !1
  ) + 2 : f.cap === W.SQUARE && (l += it(t, i, s, n, p, r, !1, e)));
  const pt = h.indices, et = tt.epsilon * tt.epsilon;
  for (let a = x; a < l + x - 2; ++a)
    d = e[a * 2], u = e[a * 2 + 1], t = e[(a + 1) * 2], i = e[(a + 1) * 2 + 1], T = e[(a + 2) * 2], w = e[(a + 2) * 2 + 1], !(Math.abs(d * (i - w) + t * (w - u) + T * (u - i)) < et) && pt.push(a, a + 1, a + 2);
}
function ht(m, h) {
  let g = 0;
  const o = m.shape, b = m.points || o.points, f = o.type !== ot.POLY || o.closeStroke;
  if (b.length === 0)
    return;
  const S = h.points, I = h.indices, L = b.length / 2, N = S.length / 2;
  let e = N;
  for (S.push(b[0], b[1]), g = 1; g < L; g++)
    S.push(b[g * 2], b[g * 2 + 1]), I.push(e, e + 1), e++;
  f && I.push(e, N);
}
function gi(m, h) {
  m.lineStyle.native ? ht(m, h) : mt(m, h);
}
export {
  gi as buildLine
};
//# sourceMappingURL=index272.js.map

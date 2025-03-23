import "./index20.js";
import "./index21.js";
import "./index22.js";
import "./index23.js";
import "./index24.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import "./index28.js";
import "./index29.js";
import "./index30.js";
import "./index31.js";
import { SHAPES as C } from "./index262.js";
import "./index32.js";
import "./index33.js";
import "./index34.js";
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
const qt = {
  build(n) {
    const t = n.points;
    let r, p, e, m, l, s;
    if (n.type === C.CIRC) {
      const i = n.shape;
      r = i.x, p = i.y, l = s = i.radius, e = m = 0;
    } else if (n.type === C.ELIP) {
      const i = n.shape;
      r = i.x, p = i.y, l = i.width, s = i.height, e = m = 0;
    } else {
      const i = n.shape, h = i.width / 2, x = i.height / 2;
      r = i.x + h, p = i.y + x, l = s = Math.max(0, Math.min(i.radius, Math.min(h, x))), e = h - l, m = x - s;
    }
    if (!(l >= 0 && s >= 0 && e >= 0 && m >= 0)) {
      t.length = 0;
      return;
    }
    const y = Math.ceil(2.3 * Math.sqrt(l + s)), d = y * 8 + (e ? 4 : 0) + (m ? 4 : 0);
    if (t.length = d, d === 0)
      return;
    if (y === 0) {
      t.length = 8, t[0] = t[6] = r + e, t[1] = t[3] = p + m, t[2] = t[4] = r - e, t[5] = t[7] = p - m;
      return;
    }
    let o = 0, R = y * 4 + (e ? 2 : 0) + 2, j = R, c = d;
    {
      const i = e + l, h = m, x = r + i, u = r - i, f = p + h;
      if (t[o++] = x, t[o++] = f, t[--R] = f, t[--R] = u, m) {
        const M = p - h;
        t[j++] = u, t[j++] = M, t[--c] = M, t[--c] = x;
      }
    }
    for (let i = 1; i < y; i++) {
      const h = Math.PI / 2 * (i / y), x = e + Math.cos(h) * l, u = m + Math.sin(h) * s, f = r + x, M = r - x, P = p + u, b = p - u;
      t[o++] = f, t[o++] = P, t[--R] = P, t[--R] = M, t[j++] = M, t[j++] = b, t[--c] = b, t[--c] = f;
    }
    {
      const i = e, h = m + s, x = r + i, u = r - i, f = p + h, M = p - h;
      t[o++] = x, t[o++] = f, t[--c] = M, t[--c] = x, e && (t[o++] = u, t[o++] = f, t[--c] = M, t[--c] = u);
    }
  },
  triangulate(n, t) {
    const r = n.points, p = t.points, e = t.indices;
    if (r.length === 0)
      return;
    let m = p.length / 2;
    const l = m;
    let s, y;
    if (n.type !== C.RREC) {
      const o = n.shape;
      s = o.x, y = o.y;
    } else {
      const o = n.shape;
      s = o.x + o.width / 2, y = o.y + o.height / 2;
    }
    const d = n.matrix;
    p.push(
      n.matrix ? d.a * s + d.c * y + d.tx : s,
      n.matrix ? d.b * s + d.d * y + d.ty : y
    ), m++, p.push(r[0], r[1]);
    for (let o = 2; o < r.length; o += 2)
      p.push(r[o], r[o + 1]), e.push(m++, l, m);
    e.push(l + 1, l, m);
  }
};
export {
  qt as buildCircle
};
//# sourceMappingURL=index278.js.map

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
import "./index33.js";
import "./index34.js";
import "./index35.js";
import "./index36.js";
import "./index37.js";
import "./index38.js";
import "./index39.js";
import "./index40.js";
import "./index41.js";
import f from "./index42.js";
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
function h(t, s = !1) {
  const o = t.length;
  if (o < 6)
    return;
  let l = 0;
  for (let p = 0, r = t[o - 2], n = t[o - 1]; p < o; p += 2) {
    const m = t[p], e = t[p + 1];
    l += (m - r) * (e + n), r = m, n = e;
  }
  if (!s && l > 0 || s && l <= 0) {
    const p = o / 2;
    for (let r = p + p % 2; r < o; r += 2) {
      const n = o - r - 2, m = o - r - 1, e = r, i = r + 1;
      [t[n], t[e]] = [t[e], t[n]], [t[m], t[i]] = [t[i], t[m]];
    }
  }
}
const yt = {
  build(t) {
    t.points = t.shape.points.slice();
  },
  triangulate(t, s) {
    let o = t.points;
    const l = t.holes, p = s.points, r = s.indices;
    if (o.length >= 6) {
      h(o, !1);
      const n = [];
      for (let i = 0; i < l.length; i++) {
        const c = l[i];
        h(c.points, !0), n.push(o.length / 2), o = o.concat(c.points);
      }
      const m = f(o, n, 2);
      if (!m)
        return;
      const e = p.length / 2;
      for (let i = 0; i < m.length; i += 3)
        r.push(m[i] + e), r.push(m[i + 1] + e), r.push(m[i + 2] + e);
      for (let i = 0; i < o.length; i++)
        p.push(o[i]);
    }
  }
};
export {
  yt as buildPoly
};
//# sourceMappingURL=index261.js.map

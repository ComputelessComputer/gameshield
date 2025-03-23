import { TEXT_GRADIENT as w } from "./index302.js";
import "./index118.js";
import "./index119.js";
import "./index120.js";
function R(c, u, r, m, I, T) {
  const i = r.fill;
  if (Array.isArray(i)) {
    if (i.length === 1)
      return i[0];
  } else
    return i;
  let p;
  const G = r.dropShadow ? r.dropShadowDistance : 0, a = r.padding || 0, s = c.width / m - G - a * 2, d = c.height / m - G - a * 2, t = i.slice(), o = r.fillGradientStops.slice();
  if (!o.length) {
    const l = t.length + 1;
    for (let n = 1; n < l; ++n)
      o.push(n / l);
  }
  if (t.unshift(i[0]), o.unshift(0), t.push(i[i.length - 1]), o.push(1), r.fillGradientType === w.LINEAR_VERTICAL) {
    p = u.createLinearGradient(s / 2, a, s / 2, d + a);
    let l = 0;
    const n = (T.fontProperties.fontSize + r.strokeThickness) / d;
    for (let e = 0; e < I.length; e++) {
      const f = T.lineHeight * e;
      for (let h = 0; h < t.length; h++) {
        let S = 0;
        typeof o[h] == "number" ? S = o[h] : S = h / t.length;
        const L = f / d + S * n;
        let g = Math.max(l, L);
        g = Math.min(g, 1), p.addColorStop(g, t[h]), l = g;
      }
    }
  } else {
    p = u.createLinearGradient(a, d / 2, s + a, d / 2);
    const l = t.length + 1;
    let n = 1;
    for (let e = 0; e < t.length; e++) {
      let f;
      typeof o[e] == "number" ? f = o[e] : f = n / l, p.addColorStop(f, t[e]), n++;
    }
  }
  return p;
}
export {
  R as generateFillStyle
};
//# sourceMappingURL=index608.js.map

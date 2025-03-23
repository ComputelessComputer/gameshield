import { Color as d } from "./index377.js";
import { Matrix as x } from "./index393.js";
import { Texture as H } from "./index360.js";
import { warn as T } from "./index338.js";
import { FillGradient as w } from "./index517.js";
import { FillPattern as P } from "./index518.js";
const g = 1e5;
function I(e, h, a, m = 0) {
  if (e.texture === H.WHITE && !e.fill)
    return d.shared.setValue(e.color).setAlpha(e.alpha ?? 1).toHexa();
  if (e.fill) {
    if (e.fill instanceof P) {
      const r = e.fill, n = h.createPattern(r.texture.source.resource, "repeat"), c = r.transform.copyTo(x.shared);
      return c.scale(
        r.texture.frame.width,
        r.texture.frame.height
      ), n.setTransform(c), n;
    } else if (e.fill instanceof w) {
      const r = e.fill, n = r.type === "linear", c = r.textureSpace === "local";
      let s = 1, i = 1;
      c && a && (s = a.width + m, i = a.height + m);
      let f, p = !1;
      if (n) {
        const { start: t, end: o } = r;
        f = h.createLinearGradient(
          t.x * s,
          t.y * i,
          o.x * s,
          o.y * i
        ), p = Math.abs(o.x - t.x) < Math.abs((o.y - t.y) * 0.1);
      } else {
        const { center: t, innerRadius: o, outerCenter: l, outerRadius: u } = r;
        f = h.createRadialGradient(
          t.x * s,
          t.y * i,
          o * s,
          l.x * s,
          l.y * i,
          u * s
        );
      }
      if (p && c && a) {
        const t = a.lineHeight / i;
        for (let o = 0; o < a.lines.length; o++) {
          const l = (o * a.lineHeight + m / 2) / i;
          r.colorStops.forEach((u) => {
            const C = l + u.offset * t;
            f.addColorStop(
              // fix to 5 decimal places to avoid floating point precision issues
              Math.floor(C * g) / g,
              d.shared.setValue(u.color).toHex()
            );
          });
        }
      } else
        r.colorStops.forEach((t) => {
          f.addColorStop(t.offset, d.shared.setValue(t.color).toHex());
        });
      return f;
    }
  } else {
    const r = h.createPattern(e.texture.source.resource, "repeat"), n = e.matrix.copyTo(x.shared);
    return n.scale(e.texture.frame.width, e.texture.frame.height), r.setTransform(n), r;
  }
  return T("FillStyle not recognised", e), "red";
}
export {
  I as getCanvasFillStyle
};
//# sourceMappingURL=index572.js.map

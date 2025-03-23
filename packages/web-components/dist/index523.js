import { extensions as O, ExtensionType as R } from "./index153.js";
import { Matrix as k } from "./index393.js";
import { Rectangle as w } from "./index407.js";
import { buildUvs as z, buildSimpleUvs as A } from "./index466.js";
import { transformVertices as S } from "./index467.js";
import { Texture as C } from "./index360.js";
import { BigPool as T } from "./index446.js";
import { BatchableGraphics as E } from "./index501.js";
import { buildCircle as D, buildEllipse as G, buildRoundedRectangle as H } from "./index508.js";
import { buildLine as L } from "./index509.js";
import { buildPixelLine as U } from "./index512.js";
import { buildPolygon as I } from "./index513.js";
import { buildRectangle as W } from "./index515.js";
import { buildTriangle as V } from "./index516.js";
import { generateTextureMatrix as j } from "./index533.js";
import { triangulateWithHoles as q } from "./index514.js";
const b = {};
O.handleByMap(R.ShapeBuilder, b);
O.add(W, I, V, D, G, H);
const F = new w(), J = new k();
function ut(e, r) {
  const { geometryData: i, batches: n } = r;
  n.length = 0, i.indices.length = 0, i.vertices.length = 0, i.uvs.length = 0;
  for (let c = 0; c < e.instructions.length; c++) {
    const t = e.instructions[c];
    if (t.action === "texture")
      K(t.data, n, i);
    else if (t.action === "fill" || t.action === "stroke") {
      const u = t.action === "stroke", s = t.data.path.shapePath, a = t.data.style, h = t.data.hole;
      u && h && B(h.shapePath, a, !0, n, i), h && (s.shapePrimitives[s.shapePrimitives.length - 1].holes = h.shapePath.shapePrimitives), B(s, a, u, n, i);
    }
  }
}
function K(e, r, i) {
  const { vertices: n, uvs: c, indices: t } = i, u = t.length, s = n.length / 2, a = [], h = b.rectangle, m = F, d = e.image;
  m.x = e.dx, m.y = e.dy, m.width = e.dw, m.height = e.dh;
  const f = e.transform;
  h.build(m, a), f && S(a, f), h.triangulate(a, n, 2, s, t, u);
  const o = d.uvs;
  c.push(
    o.x0,
    o.y0,
    o.x1,
    o.y1,
    o.x3,
    o.y3,
    o.x2,
    o.y2
  );
  const l = T.get(E);
  l.indexOffset = u, l.indexSize = t.length - u, l.attributeOffset = s, l.attributeSize = n.length / 2 - s, l.baseColor = e.style, l.alpha = e.alpha, l.texture = d, l.geometryData = i, r.push(l);
}
function B(e, r, i, n, c) {
  const { vertices: t, uvs: u, indices: s } = c;
  e.shapePrimitives.forEach(({ shape: a, transform: h, holes: m }) => {
    const d = s.length, f = t.length / 2, o = [], l = b[a.type];
    let y = "triangle-list";
    if (l.build(a, o), h && S(o, h), i) {
      const g = a.closePath ?? !0, x = r;
      x.pixelLine ? (U(o, g, t, s), y = "line-list") : L(o, x, !1, g, t, s);
    } else if (m) {
      const g = [], x = o.slice();
      N(m).forEach((M) => {
        g.push(x.length / 2), x.push(...M);
      }), q(x, g, t, 2, f, s, d);
    } else
      l.triangulate(o, t, 2, f, s, d);
    const v = u.length / 2, P = r.texture;
    if (P !== C.WHITE) {
      const g = j(J, r, a, h);
      z(t, 2, f, u, v, 2, t.length / 2 - f, g);
    } else
      A(u, v, 2, t.length / 2 - f);
    const p = T.get(E);
    p.indexOffset = d, p.indexSize = s.length - d, p.attributeOffset = f, p.attributeSize = t.length / 2 - f, p.baseColor = r.color, p.alpha = r.alpha, p.texture = P, p.geometryData = c, p.topology = y, n.push(p);
  });
}
function N(e) {
  const r = [];
  for (let i = 0; i < e.length; i++) {
    const n = e[i].shape, c = [];
    b[n.type].build(n, c), r.push(c);
  }
  return r;
}
export {
  ut as buildContextBatches,
  b as shapeBuilders
};
//# sourceMappingURL=index523.js.map

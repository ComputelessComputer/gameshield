import { ExtensionType as l } from "./index153.js";
import { triangulateWithHoles as p } from "./index514.js";
const a = [], y = {
  extension: {
    type: l.ShapeBuilder,
    name: "polygon"
  },
  build(o, e) {
    for (let t = 0; t < o.points.length; t++)
      e[t] = o.points[t];
    return e;
  },
  triangulate(o, e, t, n, r, i) {
    p(o, a, e, t, n, r, i);
  }
};
export {
  y as buildPolygon
};
//# sourceMappingURL=index513.js.map

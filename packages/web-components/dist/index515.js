import { ExtensionType as b } from "./index153.js";
const B = {
  extension: {
    type: b.ShapeBuilder,
    name: "rectangle"
  },
  build(g, a) {
    const u = g, l = u.x, x = u.y, y = u.width, h = u.height;
    return y >= 0 && h >= 0 && (a[0] = l, a[1] = x, a[2] = l + y, a[3] = x, a[4] = l + y, a[5] = x + h, a[6] = l, a[7] = x + h), a;
  },
  triangulate(g, a, u, l, x, y) {
    let h = 0;
    l *= u, a[l + h] = g[0], a[l + h + 1] = g[1], h += u, a[l + h] = g[2], a[l + h + 1] = g[3], h += u, a[l + h] = g[6], a[l + h + 1] = g[7], h += u, a[l + h] = g[4], a[l + h + 1] = g[5], h += u;
    const m = l / u;
    x[y++] = m, x[y++] = m + 1, x[y++] = m + 2, x[y++] = m + 1, x[y++] = m + 3, x[y++] = m + 2;
  }
};
export {
  B as buildRectangle
};
//# sourceMappingURL=index515.js.map

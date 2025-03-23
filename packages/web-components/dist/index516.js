import { ExtensionType as a } from "./index153.js";
const E = {
  extension: {
    type: a.ShapeBuilder,
    name: "triangle"
  },
  build(x, l) {
    return l[0] = x.x, l[1] = x.y, l[2] = x.x2, l[3] = x.y2, l[4] = x.x3, l[5] = x.y3, l;
  },
  triangulate(x, l, g, u, m, b) {
    let y = 0;
    u *= g, l[u + y] = x[0], l[u + y + 1] = x[1], y += g, l[u + y] = x[2], l[u + y + 1] = x[3], y += g, l[u + y] = x[4], l[u + y + 1] = x[5];
    const T = u / g;
    m[b++] = T, m[b++] = T + 1, m[b++] = T + 2;
  }
};
export {
  E as buildTriangle
};
//# sourceMappingURL=index516.js.map

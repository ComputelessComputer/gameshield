import { ExtensionType as X } from "./index153.js";
const W = {
  extension: {
    type: X.ShapeBuilder,
    name: "circle"
  },
  build(a, e) {
    let x, u, t, h, y, g;
    if (a.type === "circle") {
      const l = a;
      x = l.x, u = l.y, y = g = l.radius, t = h = 0;
    } else if (a.type === "ellipse") {
      const l = a;
      x = l.x, u = l.y, y = l.halfWidth, g = l.halfHeight, t = h = 0;
    } else {
      const l = a, f = l.width / 2, n = l.height / 2;
      x = l.x + f, u = l.y + n, y = g = Math.max(0, Math.min(l.radius, Math.min(f, n))), t = f - y, h = n - g;
    }
    if (!(y >= 0 && g >= 0 && t >= 0 && h >= 0))
      return e;
    const c = Math.ceil(2.3 * Math.sqrt(y + g)), M = c * 8 + (t ? 4 : 0) + (h ? 4 : 0);
    if (M === 0)
      return e;
    if (c === 0)
      return e[0] = e[6] = x + t, e[1] = e[3] = u + h, e[2] = e[4] = x - t, e[5] = e[7] = u - h, e;
    let r = 0, d = c * 4 + (t ? 2 : 0) + 2, I = d, m = M, b = t + y, j = h, R = x + b, E = x - b, H = u + j;
    if (e[r++] = R, e[r++] = H, e[--d] = H, e[--d] = E, h) {
      const l = u - j;
      e[I++] = E, e[I++] = l, e[--m] = l, e[--m] = R;
    }
    for (let l = 1; l < c; l++) {
      const f = Math.PI / 2 * (l / c), n = t + Math.cos(f) * y, w = h + Math.sin(f) * g, B = x + n, C = x - n, P = u + w, T = u - w;
      e[r++] = B, e[r++] = P, e[--d] = P, e[--d] = C, e[I++] = C, e[I++] = T, e[--m] = T, e[--m] = B;
    }
    b = t, j = h + g, R = x + b, E = x - b, H = u + j;
    const q = u - j;
    return e[r++] = R, e[r++] = H, e[--m] = q, e[--m] = R, t && (e[r++] = E, e[r++] = H, e[--m] = q, e[--m] = E), e;
  },
  triangulate(a, e, x, u, t, h) {
    if (a.length === 0)
      return;
    let y = 0, g = 0;
    for (let r = 0; r < a.length; r += 2)
      y += a[r], g += a[r + 1];
    y /= a.length / 2, g /= a.length / 2;
    let c = u;
    e[c * x] = y, e[c * x + 1] = g;
    const M = c++;
    for (let r = 0; r < a.length; r += 2)
      e[c * x] = a[r], e[c * x + 1] = a[r + 1], r > 0 && (t[h++] = c, t[h++] = M, t[h++] = c - 1), c++;
    t[h++] = M + 1, t[h++] = M, t[h++] = c - 1;
  }
}, k = { ...W, extension: { ...W.extension, name: "ellipse" } }, z = { ...W, extension: { ...W.extension, name: "roundedRectangle" } };
export {
  W as buildCircle,
  k as buildEllipse,
  z as buildRoundedRectangle
};
//# sourceMappingURL=index508.js.map

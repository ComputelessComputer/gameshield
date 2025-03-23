import { Rectangle as g } from "./index407.js";
function h(l, n, t) {
  for (let e = 0, a = 4 * t * n; e < n; ++e, a += 4)
    if (l[a + 3] !== 0)
      return !1;
  return !0;
}
function d(l, n, t, e, a) {
  const u = 4 * n;
  for (let i = e, o = e * u + 4 * t; i <= a; ++i, o += u)
    if (l[o + 3] !== 0)
      return !1;
  return !0;
}
function x(l, n = 1) {
  const { width: t, height: e } = l, a = l.getContext("2d", {
    willReadFrequently: !0
  });
  if (a === null)
    throw new TypeError("Failed to get canvas 2D context");
  const i = a.getImageData(0, 0, t, e).data;
  let o = 0, r = 0, f = t - 1, c = e - 1;
  for (; r < e && h(i, t, r); )
    ++r;
  if (r === e)
    return g.EMPTY;
  for (; h(i, t, c); )
    --c;
  for (; d(i, t, o, r, c); )
    ++o;
  for (; d(i, t, f, r, c); )
    --f;
  return ++f, ++c, new g(o / n, r / n, (f - o) / n, (c - r) / n);
}
export {
  x as getCanvasBoundingBox
};
//# sourceMappingURL=index593.js.map

import { BoundingBox as a } from "./index45.js";
function l(f, t, o) {
  for (let r = 0, n = 4 * o * t; r < t; ++r, n += 4)
    if (f[n + 3] !== 0)
      return !1;
  return !0;
}
function d(f, t, o, r, n) {
  const u = 4 * t;
  for (let e = r, i = r * u + 4 * o; e <= n; ++e, i += u)
    if (f[i + 3] !== 0)
      return !1;
  return !0;
}
function x(f) {
  const { width: t, height: o } = f, r = f.getContext("2d", {
    willReadFrequently: !0
  });
  if (r === null)
    throw new TypeError("Failed to get canvas 2D context");
  const n = r.getImageData(0, 0, t, o).data;
  let u = 0, e = 0, i = t - 1, c = o - 1;
  for (; e < o && l(n, t, e); )
    ++e;
  if (e === o)
    return a.EMPTY;
  for (; l(n, t, c); )
    --c;
  for (; d(n, t, u, e, c); )
    ++u;
  for (; d(n, t, i, e, c); )
    --i;
  return ++i, ++c, new a(u, e, i, c);
}
export {
  x as getCanvasBoundingBox
};
//# sourceMappingURL=index307.js.map

function E(Y, l, t) {
  const i = Y.getAttribute(l);
  if (!i)
    return t.minX = 0, t.minY = 0, t.maxX = 0, t.maxY = 0, t;
  const e = i.buffer.data;
  let r = 1 / 0, a = 1 / 0, c = -1 / 0, x = -1 / 0;
  const y = e.BYTES_PER_ELEMENT, X = (i.offset || 0) / y, o = (i.stride || 2 * 4) / y;
  for (let n = X; n < e.length; n += o) {
    const f = e[n], m = e[n + 1];
    f > c && (c = f), m > x && (x = m), f < r && (r = f), m < a && (a = m);
  }
  return t.minX = r, t.minY = a, t.maxX = c, t.maxY = x, t;
}
export {
  E as getGeometryBounds
};
//# sourceMappingURL=index465.js.map

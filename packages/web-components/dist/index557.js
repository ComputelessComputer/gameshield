function c(i, t, X) {
  const { width: e, height: x } = X.orig, m = X.trim;
  if (m) {
    const Y = m.width, h = m.height;
    i.minX = m.x - t._x * e, i.maxX = i.minX + Y, i.minY = m.y - t._y * x, i.maxY = i.minY + h;
  } else
    i.minX = -t._x * e, i.maxX = i.minX + e, i.minY = -t._y * x, i.maxY = i.minY + x;
}
export {
  c as updateQuadBounds
};
//# sourceMappingURL=index557.js.map

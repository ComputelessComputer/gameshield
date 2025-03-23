function a(t) {
  const e = t.length;
  if (e < 6)
    return 1;
  let n = 0;
  for (let r = 0, f = t[e - 2], c = t[e - 1]; r < e; r += 2) {
    const o = t[r], u = t[r + 1];
    n += (o - f) * (u + c), f = o, c = u;
  }
  return n < 0 ? -1 : 1;
}
export {
  a as getOrientationOfPoints
};
//# sourceMappingURL=index511.js.map

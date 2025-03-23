function z(o, t, n, c) {
  let l = 0;
  const b = o.length / (t || 2), h = c.a, d = c.b, g = c.c, u = c.d, w = c.tx, x = c.ty;
  for (n *= t; l < b; ) {
    const p = o[n], s = o[n + 1];
    o[n] = h * p + g * s + w, o[n + 1] = d * p + u * s + x, n += t, l++;
  }
}
export {
  z as applyMatrix
};
//# sourceMappingURL=index555.js.map

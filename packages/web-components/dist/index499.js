function m(t, n) {
  if (t === 16777215 || !n)
    return n;
  if (n === 16777215 || !t)
    return t;
  const s = t >> 16 & 255, e = t >> 8 & 255, u = t & 255, i = n >> 16 & 255, b = n >> 8 & 255, f = n & 255, g = s * i / 255 | 0, p = e * b / 255 | 0, x = u * f / 255 | 0;
  return (g << 16) + (p << 8) + x;
}
export {
  m as multiplyHexColors
};
//# sourceMappingURL=index499.js.map

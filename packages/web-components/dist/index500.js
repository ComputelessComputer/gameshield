function p(n, c, i) {
  const l = (n >> 24 & 255) / 255;
  c[i++] = (n & 255) / 255 * l, c[i++] = (n >> 8 & 255) / 255 * l, c[i++] = (n >> 16 & 255) / 255 * l, c[i++] = l;
}
export {
  p as color32BitToUniform
};
//# sourceMappingURL=index500.js.map

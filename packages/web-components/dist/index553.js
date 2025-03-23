function w(h, c) {
  const a = h.anchor.x, d = h.anchor.y;
  c[0] = -a * h.width, c[1] = -d * h.height, c[2] = (1 - a) * h.width, c[3] = -d * h.height, c[4] = (1 - a) * h.width, c[5] = (1 - d) * h.height, c[6] = -a * h.width, c[7] = (1 - d) * h.height;
}
export {
  w as setPositions
};
//# sourceMappingURL=index553.js.map

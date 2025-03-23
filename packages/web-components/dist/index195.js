function e(t) {
  return t += t === 0 ? 1 : 0, --t, t |= t >>> 1, t |= t >>> 2, t |= t >>> 4, t |= t >>> 8, t |= t >>> 16, t + 1;
}
function o(t) {
  return !(t & t - 1) && !!t;
}
function u(t) {
  let r = (t > 65535 ? 1 : 0) << 4;
  t >>>= r;
  let n = (t > 255 ? 1 : 0) << 3;
  return t >>>= n, r |= n, n = (t > 15 ? 1 : 0) << 2, t >>>= n, r |= n, n = (t > 3 ? 1 : 0) << 1, t >>>= n, r |= n, r | t >> 1;
}
export {
  o as isPow2,
  u as log2,
  e as nextPow2
};
//# sourceMappingURL=index195.js.map

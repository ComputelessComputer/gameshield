function b(l, a, e, n, d, r) {
  const p = l - e, q = a - n, o = d - e, s = r - n, S = p * o + q * s, f = o * o + s * s;
  let t = -1;
  f !== 0 && (t = S / f);
  let c, i;
  t < 0 ? (c = e, i = n) : t > 1 ? (c = d, i = r) : (c = e + t * o, i = n + t * s);
  const u = l - c, m = a - i;
  return u * u + m * m;
}
export {
  b as squaredDistanceToLineSegment
};
//# sourceMappingURL=index404.js.map

function A(b, n, o, d, l, y, U, c = null) {
  let h = 0;
  o *= n, l *= y;
  const x = c.a, g = c.b, j = c.c, k = c.d, q = c.tx, z = c.ty;
  for (; h < U; ) {
    const p = b[o], w = b[o + 1];
    d[l] = x * p + j * w + q, d[l + 1] = g * p + k * w + z, l += y, o += n, h++;
  }
}
function B(b, n, o, d) {
  let l = 0;
  for (n *= o; l < d; )
    b[n] = 0, b[n + 1] = 0, n += o, l++;
}
export {
  B as buildSimpleUvs,
  A as buildUvs
};
//# sourceMappingURL=index466.js.map

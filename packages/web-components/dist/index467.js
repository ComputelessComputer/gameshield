function k(o, n, x, c, a) {
  const g = n.a, h = n.b, p = n.c, u = n.d, V = n.tx, j = n.ty;
  x || (x = 0), c || (c = 2), a || (a = o.length / c - x);
  let t = x * c;
  for (let l = 0; l < a; l++) {
    const y = o[t], b = o[t + 1];
    o[t] = g * y + p * b + V, o[t + 1] = h * y + u * b + j, t += c;
  }
}
export {
  k as transformVertices
};
//# sourceMappingURL=index467.js.map

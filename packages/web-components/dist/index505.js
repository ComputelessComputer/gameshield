function y(x, i, I, o, M, a, n, h) {
  let t = Math.abs(M - a);
  (!n && M > a || n && a > M) && (t = 2 * Math.PI - t), h || (h = Math.max(6, Math.floor(6 * Math.pow(o, 1 / 3) * (t / Math.PI)))), h = Math.max(h, 3);
  let l = t / h, f = M;
  l *= n ? -1 : 1;
  for (let c = 0; c < h + 1; c++) {
    const P = Math.cos(f), b = Math.sin(f), m = i + P * o, u = I + b * o;
    x.push(m, u), f += l;
  }
}
export {
  y as buildArc
};
//# sourceMappingURL=index505.js.map

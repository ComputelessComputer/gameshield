function i(c, f, l) {
  const g = c.length;
  let n;
  if (f >= g || l === 0)
    return;
  l = f + l > g ? g - f : l;
  const h = g - l;
  for (n = f; n < h; ++n)
    c[n] = c[n + l];
  c.length = h;
}
export {
  i as removeItems
};
//# sourceMappingURL=index331.js.map

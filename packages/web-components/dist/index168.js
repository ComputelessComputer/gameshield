function i(t, e, n, c, o) {
  const s = e[n];
  for (let l = 0; l < s.length; l++) {
    const r = s[l];
    n < e.length - 1 ? i(t.replace(c[n], r), e, n + 1, c, o) : o.push(t.replace(c[n], r));
  }
}
function u(t) {
  const e = /\{(.*?)\}/g, n = t.match(e), c = [];
  if (n) {
    const o = [];
    n.forEach((s) => {
      const l = s.substring(1, s.length - 1).split(",");
      o.push(l);
    }), i(t, o, 0, n, c);
  } else
    c.push(t);
  return c;
}
export {
  u as createStringVariations
};
//# sourceMappingURL=index168.js.map

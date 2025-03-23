function r(t, e, n, c, o) {
  const s = e[n];
  for (let l = 0; l < s.length; l++) {
    const i = s[l];
    n < e.length - 1 ? r(t.replace(c[n], i), e, n + 1, c, o) : o.push(t.replace(c[n], i));
  }
}
function u(t) {
  const e = /\{(.*?)\}/g, n = t.match(e), c = [];
  if (n) {
    const o = [];
    n.forEach((s) => {
      const l = s.substring(1, s.length - 1).split(",");
      o.push(l);
    }), r(t, o, 0, n, c);
  } else
    c.push(t);
  return c;
}
export {
  u as createStringVariations
};
//# sourceMappingURL=index375.js.map

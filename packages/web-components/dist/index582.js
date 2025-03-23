function l(f, i) {
  const n = i.fontFamily, s = [], e = {}, r = /font-family:([^;"\s]+)/g, c = f.match(r);
  function o(t) {
    e[t] || (s.push(t), e[t] = !0);
  }
  if (Array.isArray(n))
    for (let t = 0; t < n.length; t++)
      o(n[t]);
  else
    o(n);
  c && c.forEach((t) => {
    const a = t.split(":")[1].trim();
    o(a);
  });
  for (const t in i.tagStyles) {
    const a = i.tagStyles[t].fontFamily;
    o(a);
  }
  return s;
}
export {
  l as extractFontFamilies
};
//# sourceMappingURL=index582.js.map

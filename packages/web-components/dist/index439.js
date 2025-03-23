function r(i, e) {
  let t;
  const n = /@in\s+([^;]+);/g;
  for (; (t = n.exec(i)) !== null; )
    e.push(t[1]);
}
function u(i, e, t = !1) {
  const n = [];
  r(e, n), i.forEach((c) => {
    c.header && r(c.header, n);
  });
  const o = n;
  t && o.sort();
  const l = o.map((c, a) => `       @location(${a}) ${c},`).join(`
`);
  let s = e.replace(/@in\s+[^;]+;\s*/g, "");
  return s = s.replace("{{in}}", `
${l}
`), s;
}
export {
  u as compileInputs
};
//# sourceMappingURL=index439.js.map

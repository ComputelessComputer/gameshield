function s(r, n) {
  let t;
  const o = /@out\s+([^;]+);/g;
  for (; (t = o.exec(r)) !== null; )
    n.push(t[1]);
}
function l(r) {
  const t = /\b(\w+)\s*:/g.exec(r);
  return t ? t[1] : "";
}
function p(r) {
  const n = /@.*?\s+/g;
  return r.replace(n, "");
}
function x(r, n) {
  const t = [];
  s(n, t), r.forEach((e) => {
    e.header && s(e.header, t);
  });
  let o = 0;
  const a = t.sort().map((e) => e.indexOf("builtin") > -1 ? e : `@location(${o++}) ${e}`).join(`,
`), u = t.sort().map((e) => `       var ${p(e)};`).join(`
`), i = `return VSOutput(
            ${t.sort().map((e) => ` ${l(e)}`).join(`,
`)});`;
  let c = n.replace(/@out\s+[^;]+;\s*/g, "");
  return c = c.replace("{{struct}}", `
${a}
`), c = c.replace("{{start}}", `
${u}
`), c = c.replace("{{return}}", `
${i}
`), c;
}
export {
  x as compileOutputs
};
//# sourceMappingURL=index440.js.map

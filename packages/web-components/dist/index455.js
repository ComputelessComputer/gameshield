const o = {}, a = {};
function i(t, { name: e = "pixi-program" }, f = !0) {
  e = e.replace(/\s+/g, "-"), e += f ? "-fragment" : "-vertex";
  const r = f ? o : a;
  return r[e] ? (r[e]++, e += `-${r[e]}`) : r[e] = 1, t.indexOf("#define SHADER_NAME") !== -1 ? t : `${`#define SHADER_NAME ${e}`}
${t}`;
}
export {
  i as setProgramName
};
//# sourceMappingURL=index455.js.map

const r = /\{\{(.*?)\}\}/g;
function e(a) {
  var c;
  const o = {};
  return (((c = a.match(r)) == null ? void 0 : c.map((t) => t.replace(/[{()}]/g, ""))) ?? []).forEach((t) => {
    o[t] = [];
  }), o;
}
export {
  e as compileHooks,
  r as findHooksRx
};
//# sourceMappingURL=index438.js.map

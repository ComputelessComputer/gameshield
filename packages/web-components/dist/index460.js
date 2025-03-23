function r({ groups: e }) {
  const o = [];
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    o[n.group] || (o[n.group] = {}), o[n.group][n.name] = n.binding;
  }
  return o;
}
export {
  r as generateLayoutHash
};
//# sourceMappingURL=index460.js.map

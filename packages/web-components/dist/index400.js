function i(e, t) {
  t.clear();
  const l = t.matrix;
  for (let r = 0; r < e.length; r++) {
    const a = e[r];
    a.globalDisplayStatus < 7 || (t.matrix = a.worldTransform, t.addBounds(a.bounds));
  }
  return t.matrix = l, t;
}
export {
  i as getGlobalRenderableBounds
};
//# sourceMappingURL=index400.js.map

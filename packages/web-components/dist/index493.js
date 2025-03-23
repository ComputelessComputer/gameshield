function C(l, d) {
  const e = l.children;
  for (let i = 0; i < e.length; i++) {
    const n = e[i], h = n.uid, g = (n._didViewChangeTick & 65535) << 16 | n._didContainerChangeTick & 65535, c = d.index;
    (d.data[c] !== h || d.data[c + 1] !== g) && (d.data[d.index] = h, d.data[d.index + 1] = g, d.didChange = !0), d.index = c + 2, n.children.length && C(n, d);
  }
  return d.didChange;
}
export {
  C as checkChildrenDidChange
};
//# sourceMappingURL=index493.js.map

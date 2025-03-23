function y(s) {
  var e, a;
  const m = /(^|[^/])@(group|binding)\(\d+\)[^;]+;/g, p = /@group\((\d+)\)/, i = /@binding\((\d+)\)/, c = /var(<[^>]+>)? (\w+)/, g = /:\s*(\w+)/, d = /struct\s+(\w+)\s*{([^}]+)}/g, h = /(\w+)\s*:\s*([\w\<\>]+)/g, P = /struct\s+(\w+)/, n = (e = s.match(m)) == null ? void 0 : e.map((t) => ({
    group: parseInt(t.match(p)[1], 10),
    binding: parseInt(t.match(i)[1], 10),
    name: t.match(c)[2],
    isUniform: t.match(c)[1] === "<uniform>",
    type: t.match(g)[1]
  }));
  if (!n)
    return {
      groups: [],
      structs: []
    };
  const b = ((a = s.match(d)) == null ? void 0 : a.map((t) => {
    const r = t.match(P)[1], o = t.match(h).reduce((u, f) => {
      const [w, l] = f.split(":");
      return u[w.trim()] = l.trim(), u;
    }, {});
    return o ? { name: r, members: o } : null;
  }).filter(({ name: t }) => n.some((r) => r.type === t))) ?? [];
  return {
    groups: n,
    structs: b
  };
}
export {
  y as extractStructAndGroups
};
//# sourceMappingURL=index458.js.map

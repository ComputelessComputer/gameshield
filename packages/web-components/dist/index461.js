function c(t, r) {
  const n = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), a = [...t.structs, ...r.structs].filter((e) => n.has(e.name) ? !1 : (n.add(e.name), !0)), o = [...t.groups, ...r.groups].filter((e) => {
    const u = `${e.name}-${e.binding}`;
    return s.has(u) ? !1 : (s.add(u), !0);
  });
  return { structs: a, groups: o };
}
export {
  c as removeStructAndGroupDuplicates
};
//# sourceMappingURL=index461.js.map

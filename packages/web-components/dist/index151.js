function n(r, t) {
  if (Array.isArray(t)) {
    for (const a of t)
      if (r.startsWith(`data:${a}`))
        return !0;
    return !1;
  }
  return r.startsWith(`data:${t}`);
}
export {
  n as checkDataUrl
};
//# sourceMappingURL=index151.js.map

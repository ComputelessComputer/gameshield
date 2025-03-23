function e(r, t) {
  if (Array.isArray(t)) {
    for (const a of t)
      if (r.startsWith(`data:${a}`))
        return !0;
    return !1;
  }
  return r.startsWith(`data:${t}`);
}
export {
  e as checkDataUrl
};
//# sourceMappingURL=index366.js.map

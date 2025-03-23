const s = (r, f, o = !1) => (Array.isArray(r) || (r = [r]), f ? r.map((e) => typeof e == "string" || o ? f(e) : e) : r);
export {
  s as convertToList
};
//# sourceMappingURL=index358.js.map

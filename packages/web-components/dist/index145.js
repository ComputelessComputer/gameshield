const a = (r, s, y = !1) => (Array.isArray(r) || (r = [r]), s ? r.map((o) => typeof o == "string" || y ? s(o) : o) : r);
export {
  a as convertToList
};
//# sourceMappingURL=index145.js.map

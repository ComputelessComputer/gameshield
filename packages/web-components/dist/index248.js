const r = [];
function s(t, i) {
  if (!t)
    return null;
  let o = "";
  if (typeof t == "string") {
    const e = /\.(\w{3,4})(?:$|\?|#)/i.exec(t);
    e && (o = e[1].toLowerCase());
  }
  for (let e = r.length - 1; e >= 0; --e) {
    const n = r[e];
    if (n.test && n.test(t, o))
      return new n(t, i);
  }
  throw new Error("Unrecognized source type to auto-detect Resource");
}
export {
  r as INSTALLED,
  s as autoDetectResource
};
//# sourceMappingURL=index248.js.map

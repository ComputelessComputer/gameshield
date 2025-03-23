function g(t) {
  if (t === "")
    return [];
  typeof t == "string" && (t = [t]);
  const e = [];
  for (let n = 0, h = t.length; n < h; n++) {
    const r = t[n];
    if (Array.isArray(r)) {
      if (r.length !== 2)
        throw new Error(`[BitmapFont]: Invalid character range length, expecting 2 got ${r.length}.`);
      if (r[0].length === 0 || r[1].length === 0)
        throw new Error("[BitmapFont]: Invalid character delimiter.");
      const i = r[0].charCodeAt(0), a = r[1].charCodeAt(0);
      if (a < i)
        throw new Error("[BitmapFont]: Invalid character range.");
      for (let o = i, l = a; o <= l; o++)
        e.push(String.fromCharCode(o));
    } else
      e.push(...Array.from(r));
  }
  if (e.length === 0)
    throw new Error("[BitmapFont]: Empty set when resolving characters.");
  return e;
}
export {
  g as resolveCharacters
};
//# sourceMappingURL=index567.js.map

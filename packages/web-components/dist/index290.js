import { splitTextToCharacters as s } from "./index293.js";
function c(r) {
  typeof r == "string" && (r = [r]);
  const e = [];
  for (let o = 0, h = r.length; o < h; o++) {
    const t = r[o];
    if (Array.isArray(t)) {
      if (t.length !== 2)
        throw new Error(`[BitmapFont]: Invalid character range length, expecting 2 got ${t.length}.`);
      const i = t[0].charCodeAt(0), a = t[1].charCodeAt(0);
      if (a < i)
        throw new Error("[BitmapFont]: Invalid character range.");
      for (let n = i, l = a; n <= l; n++)
        e.push(String.fromCharCode(n));
    } else
      e.push(...s(t));
  }
  if (e.length === 0)
    throw new Error("[BitmapFont]: Empty set when resolving characters.");
  return e;
}
export {
  c as resolveCharacters
};
//# sourceMappingURL=index290.js.map

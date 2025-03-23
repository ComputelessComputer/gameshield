import { Cache as s } from "./index340.js";
import { loadFontCSS as f } from "./index588.js";
const e = /* @__PURE__ */ new Map();
async function a(h, o, n) {
  const i = h.filter((t) => s.has(`${t}-and-url`)).map((t, c) => {
    if (!e.has(t)) {
      const { url: r } = s.get(`${t}-and-url`);
      c === 0 ? e.set(t, f({
        fontWeight: o.fontWeight,
        fontStyle: o.fontStyle,
        fontFamily: t
      }, r)) : e.set(t, f({
        fontWeight: n.fontWeight,
        fontStyle: n.fontStyle,
        fontFamily: t
      }, r));
    }
    return e.get(t);
  });
  return (await Promise.all(i)).join(`
`);
}
export {
  e as FontStylePromiseCache,
  a as getFontCss
};
//# sourceMappingURL=index583.js.map

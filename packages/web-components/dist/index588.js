import { loadFontAsBase64 as a } from "./index589.js";
async function r(t, o) {
  const n = await a(o);
  return `@font-face {
        font-family: "${t.fontFamily}";
        src: url('${n}');
        font-weight: ${t.fontWeight};
        font-style: ${t.fontStyle};
    }`;
}
export {
  r as loadFontCSS
};
//# sourceMappingURL=index588.js.map

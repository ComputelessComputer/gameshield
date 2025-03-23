import { DOMAdapter as l } from "./index365.js";
import { ExtensionType as F } from "./index153.js";
import { warn as w } from "./index338.js";
import { path as d } from "./index363.js";
import { Cache as p } from "./index340.js";
import { checkDataUrl as y } from "./index366.js";
import { checkExtension as u } from "./index367.js";
import { LoaderParserPriority as E } from "./index364.js";
const x = [
  "normal",
  "bold",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900"
], A = [".ttf", ".otf", ".woff", ".woff2"], $ = [
  "font/ttf",
  "font/otf",
  "font/woff",
  "font/woff2"
], S = /^(--|-?[A-Z_])[0-9A-Z_-]*$/i;
function W(t) {
  const o = d.extname(t), a = d.basename(t, o).replace(/(-|_)/g, " ").toLowerCase().split(" ").map((n) => n.charAt(0).toUpperCase() + n.slice(1));
  let r = a.length > 0;
  for (const n of a)
    if (!n.match(S)) {
      r = !1;
      break;
    }
  let e = a.join(" ");
  return r || (e = `"${e.replace(/[\\"]/g, "\\$&")}"`), e;
}
const _ = /^[0-9A-Za-z%:/?#\[\]@!\$&'()\*\+,;=\-._~]*$/;
function b(t) {
  return _.test(t) ? t : encodeURI(t);
}
const P = {
  extension: {
    type: F.LoadParser,
    priority: E.Low
  },
  name: "loadWebFont",
  test(t) {
    return y(t, $) || u(t, A);
  },
  async load(t, o) {
    var c, a, r;
    const i = l.get().getFontFaceSet();
    if (i) {
      const e = [], n = ((c = o.data) == null ? void 0 : c.family) ?? W(t), m = ((r = (a = o.data) == null ? void 0 : a.weights) == null ? void 0 : r.filter((s) => x.includes(s))) ?? ["normal"], h = o.data ?? {};
      for (let s = 0; s < m.length; s++) {
        const g = m[s], f = new FontFace(n, `url(${b(t)})`, {
          ...h,
          weight: g
        });
        await f.load(), i.add(f), e.push(f);
      }
      return p.set(`${n}-and-url`, {
        url: t,
        fontFaces: e
      }), e.length === 1 ? e[0] : e;
    }
    return w("[loadWebFont] FontFace API is not supported. Skipping loading font"), null;
  },
  unload(t) {
    (Array.isArray(t) ? t : [t]).forEach((o) => {
      p.remove(`${o.family}-and-url`), l.get().getFontFaceSet().delete(o);
    });
  }
};
export {
  W as getFontFamilyName,
  P as loadWebFont
};
//# sourceMappingURL=index351.js.map

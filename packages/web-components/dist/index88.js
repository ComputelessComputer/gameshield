import "./index20.js";
import "./index21.js";
import { ExtensionType as g, extensions as h } from "./index158.js";
import "./index22.js";
import "./index23.js";
import "./index24.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import "./index28.js";
import "./index29.js";
import "./index30.js";
import "./index31.js";
import "./index32.js";
import { settings as f } from "./index163.js";
import "./index33.js";
import "./index34.js";
import "./index35.js";
import "./index36.js";
import "./index37.js";
import "./index38.js";
import "./index39.js";
import "./index40.js";
import { path as l } from "./index169.js";
import "./index41.js";
import "./index42.js";
import "./index43.js";
import "./index44.js";
import "./index45.js";
import "./index46.js";
import "./index47.js";
import "./index48.js";
import "./index49.js";
import "./index50.js";
import "./index51.js";
import "./index52.js";
import "./index53.js";
import "./index54.js";
import "./index55.js";
import "./index56.js";
import "./index57.js";
import "./index58.js";
import "./index59.js";
import "./index60.js";
import "./index61.js";
import "./index62.js";
import "./index63.js";
import "./index64.js";
import "./index65.js";
import "./index66.js";
import "./index67.js";
import "./index68.js";
import "./index69.js";
import "./index70.js";
import "./index71.js";
import "./index72.js";
import "./index73.js";
import "./index74.js";
import "./index75.js";
import "./index76.js";
import "./index77.js";
import "./index78.js";
import { checkDataUrl as w } from "./index182.js";
import { checkExtension as A } from "./index166.js";
import { LoaderParserPriority as E } from "./index167.js";
const y = [
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
], x = [".ttf", ".otf", ".woff", ".woff2"], u = [
  "font/ttf",
  "font/otf",
  "font/woff",
  "font/woff2"
], R = /^(--|-?[A-Z_])[0-9A-Z_-]*$/i;
function _(t) {
  const o = l.extname(t), i = l.basename(t, o).replace(/(-|_)/g, " ").toLowerCase().split(" ").map((r) => r.charAt(0).toUpperCase() + r.slice(1));
  let m = i.length > 0;
  for (const r of i)
    if (!r.match(R)) {
      m = !1;
      break;
    }
  let e = i.join(" ");
  return m || (e = `"${e.replace(/[\\"]/g, "\\$&")}"`), e;
}
const b = /^[0-9A-Za-z%:/?#\[\]@!\$&'()\*\+,;=\-._~]*$/;
function k(t) {
  return b.test(t) ? t : encodeURI(t);
}
const I = {
  extension: {
    type: g.LoadParser,
    priority: E.Low
  },
  name: "loadWebFont",
  test(t) {
    return w(t, u) || A(t, x);
  },
  async load(t, o) {
    var m, e, r;
    const i = f.ADAPTER.getFontFaceSet();
    if (i) {
      const n = [], c = ((m = o.data) == null ? void 0 : m.family) ?? _(t), s = ((r = (e = o.data) == null ? void 0 : e.weights) == null ? void 0 : r.filter((p) => y.includes(p))) ?? ["normal"], d = o.data ?? {};
      for (let p = 0; p < s.length; p++) {
        const F = s[p], a = new FontFace(c, `url(${k(t)})`, {
          ...d,
          weight: F
        });
        await a.load(), i.add(a), n.push(a);
      }
      return n.length === 1 ? n[0] : n;
    }
    return console.warn("[loadWebFont] FontFace API is not supported. Skipping loading font"), null;
  },
  unload(t) {
    (Array.isArray(t) ? t : [t]).forEach((o) => f.ADAPTER.getFontFaceSet().delete(o));
  }
};
h.add(I);
export {
  _ as getFontFamilyName,
  I as loadWebFont
};
//# sourceMappingURL=index88.js.map

import "./index23.js";
import "./index24.js";
import { ExtensionType as d, extensions as w } from "./index140.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import "./index28.js";
import "./index29.js";
import "./index30.js";
import "./index31.js";
import "./index32.js";
import "./index33.js";
import "./index34.js";
import "./index35.js";
import { settings as u } from "./index153.js";
import "./index36.js";
import "./index37.js";
import "./index38.js";
import "./index39.js";
import "./index40.js";
import "./index41.js";
import "./index42.js";
import "./index43.js";
import "./index44.js";
import "./index45.js";
import { getResolutionOfUrl as I } from "./index157.js";
import "./index46.js";
import "./index47.js";
import "./index48.js";
import "./index49.js";
import "./index50.js";
import "./index51.js";
import "./index52.js";
import "./index53.js";
import { BaseTexture as l } from "./index54.js";
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
import "./index79.js";
import "./index80.js";
import "./index81.js";
import { checkDataUrl as B } from "./index154.js";
import { checkExtension as x } from "./index155.js";
import { LoaderParserPriority as h } from "./index152.js";
import { WorkerManager as c } from "./index159.js";
import { createTexture as y } from "./index158.js";
const O = [".jpeg", ".jpg", ".png", ".webp", ".avif"], T = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif"
];
async function b(o) {
  const i = await u.ADAPTER.fetch(o);
  if (!i.ok)
    throw new Error(`[loadImageBitmap] Failed to fetch ${o}: ${i.status} ${i.statusText}`);
  const e = await i.blob();
  return await createImageBitmap(e);
}
const k = {
  name: "loadTextures",
  extension: {
    type: d.LoadParser,
    priority: h.High
  },
  config: {
    preferWorkers: !0,
    preferCreateImageBitmap: !0,
    crossOrigin: "anonymous"
  },
  test(o) {
    return B(o, T) || x(o, O);
  },
  async load(o, i, e) {
    var s;
    const p = globalThis.createImageBitmap && this.config.preferCreateImageBitmap;
    let m;
    p ? this.config.preferWorkers && await c.isImageBitmapSupported() ? m = await c.loadImageBitmap(o) : m = await b(o) : m = await new Promise((n, g) => {
      const r = new Image();
      r.crossOrigin = this.config.crossOrigin, r.src = o, r.complete ? n(r) : (r.onload = () => n(r), r.onerror = (f) => g(f));
    });
    const t = { ...i.data };
    t.resolution ?? (t.resolution = I(o)), p && ((s = t.resourceOptions) == null ? void 0 : s.ownsImageBitmap) === void 0 && (t.resourceOptions = { ...t.resourceOptions }, t.resourceOptions.ownsImageBitmap = !0);
    const a = new l(m, t);
    return a.resource.src = o, y(a, e, o);
  },
  unload(o) {
    o.destroy(!0);
  }
};
w.add(k);
export {
  b as loadImageBitmap,
  k as loadTextures
};
//# sourceMappingURL=index93.js.map

import { DOMAdapter as s } from "./index365.js";
import { ExtensionType as g } from "./index153.js";
import { ImageSource as l } from "./index325.js";
import { getResolutionOfUrl as c } from "./index369.js";
import { checkDataUrl as f } from "./index366.js";
import { checkExtension as d } from "./index367.js";
import { WorkerManager as n } from "./index371.js";
import { LoaderParserPriority as u } from "./index364.js";
import { createTexture as h } from "./index370.js";
const I = [".jpeg", ".jpg", ".png", ".webp", ".avif"], w = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif"
];
async function x(a, r) {
  var t;
  const o = await s.get().fetch(a);
  if (!o.ok)
    throw new Error(`[loadImageBitmap] Failed to fetch ${a}: ${o.status} ${o.statusText}`);
  const e = await o.blob();
  return ((t = r == null ? void 0 : r.data) == null ? void 0 : t.alphaMode) === "premultiplied-alpha" ? createImageBitmap(e, { premultiplyAlpha: "none" }) : createImageBitmap(e);
}
const j = {
  name: "loadTextures",
  extension: {
    type: g.LoadParser,
    priority: u.High,
    name: "loadTextures"
  },
  config: {
    preferWorkers: !0,
    preferCreateImageBitmap: !0,
    crossOrigin: "anonymous"
  },
  test(a) {
    return f(a, w) || d(a, I);
  },
  async load(a, r, o) {
    var i;
    let e = null;
    globalThis.createImageBitmap && this.config.preferCreateImageBitmap ? this.config.preferWorkers && await n.isImageBitmapSupported() ? e = await n.loadImageBitmap(a, r) : e = await x(a, r) : e = await new Promise((m, p) => {
      e = new Image(), e.crossOrigin = this.config.crossOrigin, e.src = a, e.complete ? m(e) : (e.onload = () => {
        m(e);
      }, e.onerror = p);
    });
    const t = new l({
      resource: e,
      alphaMode: "premultiply-alpha-on-upload",
      resolution: ((i = r.data) == null ? void 0 : i.resolution) || c(a),
      ...r.data
    });
    return h(t, o, a);
  },
  unload(a) {
    a.destroy(!0);
  }
};
export {
  x as loadImageBitmap,
  j as loadTextures
};
//# sourceMappingURL=index353.js.map

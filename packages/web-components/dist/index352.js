import { DOMAdapter as g } from "./index365.js";
import { ExtensionType as w } from "./index153.js";
import { ImageSource as v } from "./index325.js";
import { GraphicsContext as y } from "./index368.js";
import { getResolutionOfUrl as G } from "./index369.js";
import { checkDataUrl as b } from "./index366.js";
import { checkExtension as A } from "./index367.js";
import { LoaderParserPriority as L } from "./index364.js";
import { createTexture as O } from "./index370.js";
const S = ".svg", U = "image/svg+xml", z = {
  extension: {
    type: w.LoadParser,
    priority: L.Low,
    name: "loadSVG"
  },
  name: "loadSVG",
  config: {
    crossOrigin: "anonymous",
    parseAsGraphicsContext: !1
  },
  test(t) {
    return b(t, U) || A(t, S);
  },
  async load(t, o, n) {
    var e;
    return ((e = o.data) == null ? void 0 : e.parseAsGraphicsContext) ?? this.config.parseAsGraphicsContext ? E(t) : C(t, o, n, this.config.crossOrigin);
  },
  unload(t) {
    t.destroy(!0);
  }
};
async function C(t, o, n, e) {
  var m, d, h;
  const l = await (await g.get().fetch(t)).blob(), i = URL.createObjectURL(l), r = new Image();
  r.src = i, r.crossOrigin = e, await r.decode(), URL.revokeObjectURL(i);
  const s = document.createElement("canvas"), f = s.getContext("2d"), a = ((m = o.data) == null ? void 0 : m.resolution) || G(t), c = ((d = o.data) == null ? void 0 : d.width) ?? r.width, p = ((h = o.data) == null ? void 0 : h.height) ?? r.height;
  s.width = c * a, s.height = p * a, f.drawImage(r, 0, 0, c * a, p * a);
  const { parseAsGraphicsContext: I, ...u } = o.data ?? {}, x = new v({
    resource: s,
    alphaMode: "premultiply-alpha-on-upload",
    resolution: a,
    ...u
  });
  return O(x, n, t);
}
async function E(t) {
  const n = await (await g.get().fetch(t)).text(), e = new y();
  return e.svg(n), e;
}
export {
  z as loadSvg
};
//# sourceMappingURL=index352.js.map

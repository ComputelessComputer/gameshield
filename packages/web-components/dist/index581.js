import { TexturePool as a } from "./index397.js";
import { Bounds as d } from "./index399.js";
const p = new d();
function s(r, u, m, o) {
  const t = p;
  t.minX = 0, t.minY = 0, t.maxX = r.width / o | 0, t.maxY = r.height / o | 0;
  const e = a.getOptimalTexture(
    t.width,
    t.height,
    o,
    !1
  );
  return e.source.uploadMethodId = "image", e.source.resource = r, e.source.alphaMode = "premultiply-alpha-on-upload", e.frame.width = u / o, e.frame.height = m / o, e.source.emit("update", e.source), e.updateUvs(), e;
}
export {
  s as getPo2TextureFromSource
};
//# sourceMappingURL=index581.js.map

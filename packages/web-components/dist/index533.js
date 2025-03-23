import { Matrix as c } from "./index393.js";
import { Rectangle as i } from "./index407.js";
const u = new c(), x = new i();
function p(o, e, n, a) {
  const r = e.matrix ? o.copyFrom(e.matrix).invert() : o.identity();
  if (e.textureSpace === "local") {
    const t = n.getBounds(x);
    r.translate(-t.x, -t.y), r.scale(1 / t.width, 1 / t.height);
  } else {
    r.translate(e.texture.frame.x, e.texture.frame.y), r.scale(1 / e.texture.source.width, 1 / e.texture.source.height);
    const t = e.texture.source.style;
    t.addressMode === "clamp-to-edge" && (t.addressMode = "repeat", t.update());
  }
  return a && r.append(u.copyFrom(a).invert()), r;
}
export {
  p as generateTextureMatrix
};
//# sourceMappingURL=index533.js.map

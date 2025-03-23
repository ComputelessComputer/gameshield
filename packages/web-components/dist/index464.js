import { Buffer as n } from "./index422.js";
import { BufferUsage as r } from "./index423.js";
function i(e, t) {
  if (!(e instanceof n)) {
    let a = t ? r.INDEX : r.VERTEX;
    e instanceof Array && (t ? (e = new Uint32Array(e), a = r.INDEX | r.COPY_DST) : (e = new Float32Array(e), a = r.VERTEX | r.COPY_DST)), e = new n({
      data: e,
      label: t ? "index-mesh-buffer" : "vertex-mesh-buffer",
      usage: a
    });
  }
  return e;
}
export {
  i as ensureIsBuffer
};
//# sourceMappingURL=index464.js.map

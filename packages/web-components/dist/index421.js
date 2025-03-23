import { Buffer as f } from "./index422.js";
import { BufferUsage as r } from "./index423.js";
import { Geometry as a } from "./index395.js";
const s = new Float32Array(1), n = new Uint32Array(1);
class m extends a {
  constructor() {
    const e = new f({
      data: s,
      label: "attribute-batch-buffer",
      usage: r.VERTEX | r.COPY_DST,
      shrinkToFit: !1
    }), o = new f({
      data: n,
      label: "index-batch-buffer",
      usage: r.INDEX | r.COPY_DST,
      // | BufferUsage.STATIC,
      shrinkToFit: !1
    }), t = 6 * 4;
    super({
      attributes: {
        aPosition: {
          buffer: e,
          format: "float32x2",
          stride: t,
          offset: 0
        },
        aUV: {
          buffer: e,
          format: "float32x2",
          stride: t,
          offset: 2 * 4
        },
        aColor: {
          buffer: e,
          format: "unorm8x4",
          stride: t,
          offset: 4 * 4
        },
        aTextureIdAndRound: {
          buffer: e,
          format: "uint16x2",
          stride: t,
          offset: 5 * 4
        }
      },
      indexBuffer: o
    });
  }
}
export {
  m as BatchGeometry
};
//# sourceMappingURL=index421.js.map

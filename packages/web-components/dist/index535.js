import { Buffer as r } from "./index422.js";
import { BufferUsage as s } from "./index423.js";
import { Geometry as c } from "./index395.js";
import { deprecation as h, v8_0_0 as b } from "./index477.js";
const n = class f extends c {
  constructor(...e) {
    let t = e[0] ?? {};
    t instanceof Float32Array && (h(b, "use new MeshGeometry({ positions, uvs, indices }) instead"), t = {
      positions: t,
      uvs: e[1],
      indices: e[2]
    }), t = { ...f.defaultOptions, ...t };
    const a = t.positions || new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);
    let i = t.uvs;
    i || (t.positions ? i = new Float32Array(a.length) : i = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]));
    const u = t.indices || new Uint32Array([0, 1, 2, 0, 2, 3]), o = t.shrinkBuffersToFit, d = new r({
      data: a,
      label: "attribute-mesh-positions",
      shrinkToFit: o,
      usage: s.VERTEX | s.COPY_DST
    }), l = new r({
      data: i,
      label: "attribute-mesh-uvs",
      shrinkToFit: o,
      usage: s.VERTEX | s.COPY_DST
    }), p = new r({
      data: u,
      label: "index-mesh-buffer",
      shrinkToFit: o,
      usage: s.INDEX | s.COPY_DST
    });
    super({
      attributes: {
        aPosition: {
          buffer: d,
          format: "float32x2",
          stride: 2 * 4,
          offset: 0
        },
        aUV: {
          buffer: l,
          format: "float32x2",
          stride: 2 * 4,
          offset: 0
        }
      },
      indexBuffer: p,
      topology: t.topology
    }), this.batchMode = "auto";
  }
  /** The positions of the mesh. */
  get positions() {
    return this.attributes.aPosition.buffer.data;
  }
  /**
   * Set the positions of the mesh.
   * When setting the positions, its important that the uvs array is at least as long as the positions array.
   * otherwise the geometry will not be valid.
   * @param {Float32Array} value - The positions of the mesh.
   */
  set positions(e) {
    this.attributes.aPosition.buffer.data = e;
  }
  /** The UVs of the mesh. */
  get uvs() {
    return this.attributes.aUV.buffer.data;
  }
  /**
   * Set the UVs of the mesh.
   * Its important that the uvs array you set is at least as long as the positions array.
   * otherwise the geometry will not be valid.
   * @param {Float32Array} value - The UVs of the mesh.
   */
  set uvs(e) {
    this.attributes.aUV.buffer.data = e;
  }
  /** The indices of the mesh. */
  get indices() {
    return this.indexBuffer.data;
  }
  set indices(e) {
    this.indexBuffer.data = e;
  }
};
n.defaultOptions = {
  topology: "triangle-list",
  shrinkBuffersToFit: !1
};
let B = n;
export {
  B as MeshGeometry
};
//# sourceMappingURL=index535.js.map

import { ExtensionType as n } from "./index153.js";
import { getTextureBatchBindGroup as l } from "./index414.js";
import { DefaultBatcher as x } from "./index424.js";
import { InstructionSet as m } from "./index468.js";
import { deprecation as b, v8_3_4 as _ } from "./index477.js";
import { BigPool as h } from "./index446.js";
import { buildContextBatches as y } from "./index523.js";
class D {
  constructor() {
    this.batches = [], this.geometryData = {
      vertices: [],
      uvs: [],
      indices: []
    };
  }
}
class G {
  constructor() {
    this.batcher = new x(), this.instructions = new m();
  }
  init() {
    this.instructions.reset();
  }
  /**
   * @deprecated since version 8.0.0
   * Use `batcher.geometry` instead.
   * @see {Batcher#geometry}
   */
  get geometry() {
    return b(_, "GraphicsContextRenderData#geometry is deprecated, please use batcher.geometry instead."), this.batcher.geometry;
  }
}
const u = class o {
  constructor(t) {
    this._gpuContextHash = {}, this._graphicsDataContextHash = /* @__PURE__ */ Object.create(null), t.renderableGC.addManagedHash(this, "_gpuContextHash"), t.renderableGC.addManagedHash(this, "_graphicsDataContextHash");
  }
  /**
   * Runner init called, update the default options
   * @ignore
   */
  init(t) {
    o.defaultOptions.bezierSmoothness = (t == null ? void 0 : t.bezierSmoothness) ?? o.defaultOptions.bezierSmoothness;
  }
  getContextRenderData(t) {
    return this._graphicsDataContextHash[t.uid] || this._initContextRenderData(t);
  }
  // Context management functions
  updateGpuContext(t) {
    let e = this._gpuContextHash[t.uid] || this._initContext(t);
    if (t.dirty) {
      e ? this._cleanGraphicsContextData(t) : e = this._initContext(t), y(t, e);
      const a = t.batchMode;
      t.customShader || a === "no-batch" ? e.isBatchable = !1 : a === "auto" && (e.isBatchable = e.geometryData.vertices.length < 400), t.dirty = !1;
    }
    return e;
  }
  getGpuContext(t) {
    return this._gpuContextHash[t.uid] || this._initContext(t);
  }
  _initContextRenderData(t) {
    const e = h.get(G), { batches: a, geometryData: c } = this._gpuContextHash[t.uid], g = c.vertices.length, f = c.indices.length;
    for (let i = 0; i < a.length; i++)
      a[i].applyTransform = !1;
    const s = e.batcher;
    s.ensureAttributeBuffer(g), s.ensureIndexBuffer(f), s.begin();
    for (let i = 0; i < a.length; i++) {
      const r = a[i];
      s.add(r);
    }
    s.finish(e.instructions);
    const p = s.geometry;
    p.indexBuffer.setDataWithSize(s.indexBuffer, s.indexSize, !0), p.buffers[0].setDataWithSize(s.attributeBuffer.float32View, s.attributeSize, !0);
    const d = s.batches;
    for (let i = 0; i < d.length; i++) {
      const r = d[i];
      r.bindGroup = l(r.textures.textures, r.textures.count);
    }
    return this._graphicsDataContextHash[t.uid] = e, e;
  }
  _initContext(t) {
    const e = new D();
    return e.context = t, this._gpuContextHash[t.uid] = e, t.on("destroy", this.onGraphicsContextDestroy, this), this._gpuContextHash[t.uid];
  }
  onGraphicsContextDestroy(t) {
    this._cleanGraphicsContextData(t), t.off("destroy", this.onGraphicsContextDestroy, this), this._gpuContextHash[t.uid] = null;
  }
  _cleanGraphicsContextData(t) {
    const e = this._gpuContextHash[t.uid];
    e.isBatchable || this._graphicsDataContextHash[t.uid] && (h.return(this.getContextRenderData(t)), this._graphicsDataContextHash[t.uid] = null), e.batches && e.batches.forEach((a) => {
      h.return(a);
    });
  }
  destroy() {
    for (const t in this._gpuContextHash)
      this._gpuContextHash[t] && this.onGraphicsContextDestroy(this._gpuContextHash[t].context);
  }
};
u.extension = {
  type: [
    n.WebGLSystem,
    n.WebGPUSystem,
    n.CanvasSystem
  ],
  name: "graphicsContext"
};
u.defaultOptions = {
  /**
   * A value from 0 to 1 that controls the smoothness of bezier curves (the higher the smoother)
   * @default 0.5
   */
  bezierSmoothness: 0.5
};
let M = u;
export {
  D as GpuGraphicsContext,
  G as GraphicsContextRenderData,
  M as GraphicsContextSystem
};
//# sourceMappingURL=index503.js.map

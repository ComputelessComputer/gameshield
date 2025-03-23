import { ExtensionType as h } from "./index153.js";
import { State as d } from "./index472.js";
import { BigPool as i } from "./index446.js";
import { color32BitToUniform as c } from "./index500.js";
import { BatchableGraphics as l } from "./index501.js";
class u {
  constructor(e, t) {
    this.state = d.for2d(), this._graphicsBatchesHash = /* @__PURE__ */ Object.create(null), this._destroyRenderableBound = this.destroyRenderable.bind(this), this.renderer = e, this._adaptor = t, this._adaptor.init(), this.renderer.renderableGC.addManagedHash(this, "_graphicsBatchesHash");
  }
  validateRenderable(e) {
    const t = e.context, r = !!this._graphicsBatchesHash[e.uid], s = this.renderer.graphicsContext.updateGpuContext(t);
    return !!(s.isBatchable || r !== s.isBatchable);
  }
  addRenderable(e, t) {
    const r = this.renderer.graphicsContext.updateGpuContext(e.context);
    e.didViewUpdate && this._rebuild(e), r.isBatchable ? this._addToBatcher(e, t) : (this.renderer.renderPipes.batch.break(t), t.add(e));
  }
  updateRenderable(e) {
    const t = this._graphicsBatchesHash[e.uid];
    if (t)
      for (let r = 0; r < t.length; r++) {
        const s = t[r];
        s._batcher.updateElement(s);
      }
  }
  destroyRenderable(e) {
    this._graphicsBatchesHash[e.uid] && this._removeBatchForRenderable(e.uid), e.off("destroyed", this._destroyRenderableBound);
  }
  execute(e) {
    if (!e.isRenderable)
      return;
    const t = this.renderer, r = e.context;
    if (!t.graphicsContext.getGpuContext(r).batches.length)
      return;
    const a = r.customShader || this._adaptor.shader;
    this.state.blendMode = e.groupBlendMode;
    const o = a.resources.localUniforms.uniforms;
    o.uTransformMatrix = e.groupTransform, o.uRound = t._roundPixels | e._roundPixels, c(
      e.groupColorAlpha,
      o.uColor,
      0
    ), this._adaptor.execute(this, e);
  }
  _rebuild(e) {
    const t = !!this._graphicsBatchesHash[e.uid], r = this.renderer.graphicsContext.updateGpuContext(e.context);
    t && this._removeBatchForRenderable(e.uid), r.isBatchable && this._initBatchesForRenderable(e), e.batched = r.isBatchable;
  }
  _addToBatcher(e, t) {
    const r = this.renderer.renderPipes.batch, s = this._getBatchesForRenderable(e);
    for (let a = 0; a < s.length; a++) {
      const o = s[a];
      r.addToBatch(o, t);
    }
  }
  _getBatchesForRenderable(e) {
    return this._graphicsBatchesHash[e.uid] || this._initBatchesForRenderable(e);
  }
  _initBatchesForRenderable(e) {
    const t = e.context, r = this.renderer.graphicsContext.getGpuContext(t), s = this.renderer._roundPixels | e._roundPixels, a = r.batches.map((o) => {
      const n = i.get(l);
      return o.copyTo(n), n.renderable = e, n.roundPixels = s, n;
    });
    return this._graphicsBatchesHash[e.uid] === void 0 && e.on("destroyed", this._destroyRenderableBound), this._graphicsBatchesHash[e.uid] = a, a;
  }
  _removeBatchForRenderable(e) {
    this._graphicsBatchesHash[e].forEach((t) => {
      i.return(t);
    }), this._graphicsBatchesHash[e] = null;
  }
  destroy() {
    this.renderer = null, this._adaptor.destroy(), this._adaptor = null, this.state = null;
    for (const e in this._graphicsBatchesHash)
      this._removeBatchForRenderable(e);
    this._graphicsBatchesHash = null;
  }
}
u.extension = {
  type: [
    h.WebGLPipes,
    h.WebGPUPipes,
    h.CanvasPipes
  ],
  name: "graphics"
};
export {
  u as GraphicsPipe
};
//# sourceMappingURL=index524.js.map

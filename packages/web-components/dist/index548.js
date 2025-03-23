import { ExtensionType as i } from "./index153.js";
import { BigPool as r } from "./index446.js";
import { BatchableMesh as d } from "./index536.js";
import { NineSliceGeometry as n } from "./index547.js";
class s {
  constructor(e) {
    this._gpuSpriteHash = /* @__PURE__ */ Object.create(null), this._destroyRenderableBound = this.destroyRenderable.bind(this), this._renderer = e, this._renderer.renderableGC.addManagedHash(this, "_gpuSpriteHash");
  }
  addRenderable(e, t) {
    const a = this._getGpuSprite(e);
    e.didViewUpdate && this._updateBatchableSprite(e, a), this._renderer.renderPipes.batch.addToBatch(a, t);
  }
  updateRenderable(e) {
    const t = this._gpuSpriteHash[e.uid];
    e.didViewUpdate && this._updateBatchableSprite(e, t), t._batcher.updateElement(t);
  }
  validateRenderable(e) {
    const t = this._getGpuSprite(e);
    return !t._batcher.checkAndUpdateTexture(
      t,
      e._texture
    );
  }
  destroyRenderable(e) {
    const t = this._gpuSpriteHash[e.uid];
    r.return(t.geometry), r.return(t), this._gpuSpriteHash[e.uid] = null, e.off("destroyed", this._destroyRenderableBound);
  }
  _updateBatchableSprite(e, t) {
    t.geometry.update(e), t.setTexture(e._texture);
  }
  _getGpuSprite(e) {
    return this._gpuSpriteHash[e.uid] || this._initGPUSprite(e);
  }
  _initGPUSprite(e) {
    const t = r.get(d);
    return t.geometry = r.get(n), t.renderable = e, t.transform = e.groupTransform, t.texture = e._texture, t.roundPixels = this._renderer._roundPixels | e._roundPixels, this._gpuSpriteHash[e.uid] = t, e.didViewUpdate || this._updateBatchableSprite(e, t), e.on("destroyed", this._destroyRenderableBound), t;
  }
  destroy() {
    for (const e in this._gpuSpriteHash)
      this._gpuSpriteHash[e].geometry.destroy();
    this._gpuSpriteHash = null, this._renderer = null;
  }
}
s.extension = {
  type: [
    i.WebGLPipes,
    i.WebGPUPipes,
    i.CanvasPipes
  ],
  name: "nineSliceSprite"
};
export {
  s as NineSliceSpritePipe
};
//# sourceMappingURL=index548.js.map

import { ExtensionType as s } from "./index153.js";
import { Texture as u } from "./index360.js";
import { BigPool as o } from "./index446.js";
import { BatchableSprite as p } from "./index556.js";
import { updateTextBounds as d } from "./index574.js";
class c {
  constructor(e) {
    this._gpuText = /* @__PURE__ */ Object.create(null), this._destroyRenderableBound = this.destroyRenderable.bind(this), this._renderer = e, this._renderer.runners.resolutionChange.add(this), this._renderer.renderableGC.addManagedHash(this, "_gpuText");
  }
  resolutionChange() {
    for (const e in this._gpuText) {
      const t = this._gpuText[e];
      if (!t)
        continue;
      const r = t.batchableSprite.renderable;
      r._autoResolution && (r._resolution = this._renderer.resolution, r.onViewUpdate());
    }
  }
  validateRenderable(e) {
    const t = this._getGpuText(e), r = e._getKey();
    return t.textureNeedsUploading ? (t.textureNeedsUploading = !1, !0) : t.currentKey !== r;
  }
  addRenderable(e, t) {
    const n = this._getGpuText(e).batchableSprite;
    e._didTextUpdate && this._updateText(e), this._renderer.renderPipes.batch.addToBatch(n, t);
  }
  updateRenderable(e) {
    const r = this._getGpuText(e).batchableSprite;
    e._didTextUpdate && this._updateText(e), r._batcher.updateElement(r);
  }
  destroyRenderable(e) {
    e.off("destroyed", this._destroyRenderableBound), this._destroyRenderableById(e.uid);
  }
  _destroyRenderableById(e) {
    const t = this._gpuText[e];
    this._renderer.htmlText.decreaseReferenceCount(t.currentKey), o.return(t.batchableSprite), this._gpuText[e] = null;
  }
  _updateText(e) {
    const t = e._getKey(), r = this._getGpuText(e), n = r.batchableSprite;
    r.currentKey !== t && this._updateGpuText(e).catch((i) => {
      console.error(i);
    }), e._didTextUpdate = !1, d(n, e);
  }
  async _updateGpuText(e) {
    e._didTextUpdate = !1;
    const t = this._getGpuText(e);
    if (t.generatingTexture)
      return;
    const r = e._getKey();
    this._renderer.htmlText.decreaseReferenceCount(t.currentKey), t.generatingTexture = !0, t.currentKey = r;
    const n = e.resolution ?? this._renderer.resolution, i = await this._renderer.htmlText.getManagedTexture(
      e.text,
      n,
      e._style,
      e._getKey()
    ), a = t.batchableSprite;
    a.texture = t.texture = i, t.generatingTexture = !1, t.textureNeedsUploading = !0, e.onViewUpdate(), d(a, e);
  }
  _getGpuText(e) {
    return this._gpuText[e.uid] || this.initGpuText(e);
  }
  initGpuText(e) {
    const t = {
      texture: u.EMPTY,
      currentKey: "--",
      batchableSprite: o.get(p),
      textureNeedsUploading: !1,
      generatingTexture: !1
    }, r = t.batchableSprite;
    return r.renderable = e, r.transform = e.groupTransform, r.texture = u.EMPTY, r.bounds = { minX: 0, maxX: 1, minY: 0, maxY: 0 }, r.roundPixels = this._renderer._roundPixels | e._roundPixels, e._resolution = e._autoResolution ? this._renderer.resolution : e.resolution, this._gpuText[e.uid] = t, e.on("destroyed", this._destroyRenderableBound), t;
  }
  destroy() {
    for (const e in this._gpuText)
      this._destroyRenderableById(e);
    this._gpuText = null, this._renderer = null;
  }
}
c.extension = {
  type: [
    s.WebGLPipes,
    s.WebGPUPipes,
    s.CanvasPipes
  ],
  name: "htmlText"
};
export {
  c as HTMLTextPipe
};
//# sourceMappingURL=index573.js.map

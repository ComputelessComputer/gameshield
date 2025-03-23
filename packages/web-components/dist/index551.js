import { ExtensionType as d } from "./index153.js";
import { getAdjustedBlendModeBlend as i } from "./index419.js";
import { State as c } from "./index472.js";
import { RendererType as u } from "./index398.js";
import { color32BitToUniform as l } from "./index500.js";
import { BatchableMesh as _ } from "./index536.js";
import { MeshGeometry as p } from "./index535.js";
import { TilingSpriteShader as m } from "./index550.js";
import { QuadGeometry as b } from "./index552.js";
import { setPositions as f } from "./index553.js";
import { setUvs as B } from "./index554.js";
const n = new b();
class D {
  constructor(e) {
    this._state = c.default2d, this._tilingSpriteDataHash = /* @__PURE__ */ Object.create(null), this._destroyRenderableBound = this.destroyRenderable.bind(this), this._renderer = e, this._renderer.renderableGC.addManagedHash(this, "_tilingSpriteDataHash");
  }
  validateRenderable(e) {
    const t = this._getTilingSpriteData(e), r = t.canBatch;
    this._updateCanBatch(e);
    const a = t.canBatch;
    if (a && a === r) {
      const { batchableMesh: o } = t;
      return !o._batcher.checkAndUpdateTexture(
        o,
        e.texture
      );
    }
    return r !== a;
  }
  addRenderable(e, t) {
    const r = this._renderer.renderPipes.batch;
    this._updateCanBatch(e);
    const a = this._getTilingSpriteData(e), { geometry: o, canBatch: h } = a;
    if (h) {
      a.batchableMesh || (a.batchableMesh = new _());
      const s = a.batchableMesh;
      e.didViewUpdate && (this._updateBatchableMesh(e), s.geometry = o, s.renderable = e, s.transform = e.groupTransform, s.setTexture(e._texture)), s.roundPixels = this._renderer._roundPixels | e._roundPixels, r.addToBatch(s, t);
    } else
      r.break(t), a.shader || (a.shader = new m()), this.updateRenderable(e), t.add(e);
  }
  execute(e) {
    const { shader: t } = this._tilingSpriteDataHash[e.uid];
    t.groups[0] = this._renderer.globalUniforms.bindGroup;
    const r = t.resources.localUniforms.uniforms;
    r.uTransformMatrix = e.groupTransform, r.uRound = this._renderer._roundPixels | e._roundPixels, l(
      e.groupColorAlpha,
      r.uColor,
      0
    ), this._state.blendMode = i(e.groupBlendMode, e.texture._source), this._renderer.encoder.draw({
      geometry: n,
      shader: t,
      state: this._state
    });
  }
  updateRenderable(e) {
    const t = this._getTilingSpriteData(e), { canBatch: r } = t;
    if (r) {
      const { batchableMesh: a } = t;
      e.didViewUpdate && this._updateBatchableMesh(e), a._batcher.updateElement(a);
    } else if (e.didViewUpdate) {
      const { shader: a } = t;
      a.updateUniforms(
        e.width,
        e.height,
        e._tileTransform.matrix,
        e.anchor.x,
        e.anchor.y,
        e.texture
      );
    }
  }
  destroyRenderable(e) {
    var r;
    const t = this._getTilingSpriteData(e);
    t.batchableMesh = null, (r = t.shader) == null || r.destroy(), this._tilingSpriteDataHash[e.uid] = null, e.off("destroyed", this._destroyRenderableBound);
  }
  _getTilingSpriteData(e) {
    return this._tilingSpriteDataHash[e.uid] || this._initTilingSpriteData(e);
  }
  _initTilingSpriteData(e) {
    const t = new p({
      indices: n.indices,
      positions: n.positions.slice(),
      uvs: n.uvs.slice()
    });
    return this._tilingSpriteDataHash[e.uid] = {
      canBatch: !0,
      renderable: e,
      geometry: t
    }, e.on("destroyed", this._destroyRenderableBound), this._tilingSpriteDataHash[e.uid];
  }
  _updateBatchableMesh(e) {
    const t = this._getTilingSpriteData(e), { geometry: r } = t, a = e.texture.source.style;
    a.addressMode !== "repeat" && (a.addressMode = "repeat", a.update()), B(e, r.uvs), f(e, r.positions);
  }
  destroy() {
    for (const e in this._tilingSpriteDataHash)
      this.destroyRenderable(this._tilingSpriteDataHash[e].renderable);
    this._tilingSpriteDataHash = null, this._renderer = null;
  }
  _updateCanBatch(e) {
    const t = this._getTilingSpriteData(e), r = e.texture;
    let a = !0;
    return this._renderer.type === u.WEBGL && (a = this._renderer.context.supports.nonPowOf2wrapping), t.canBatch = r.textureMatrix.isSimple && (a || r.source.isPowerOfTwo), t.canBatch;
  }
}
D.extension = {
  type: [
    d.WebGLPipes,
    d.WebGPUPipes,
    d.CanvasPipes
  ],
  name: "tilingSprite"
};
export {
  D as TilingSpritePipe
};
//# sourceMappingURL=index551.js.map

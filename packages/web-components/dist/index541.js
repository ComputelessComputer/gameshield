import { Matrix as a } from "./index393.js";
import { UniformGroup as f } from "./index396.js";
import { getAdjustedBlendModeBlend as l } from "./index419.js";
import { State as i } from "./index472.js";
import { color32BitToUniform as n } from "./index500.js";
import { ParticleBuffer as h } from "./index543.js";
import { ParticleShader as p } from "./index546.js";
class R {
  /**
   * @param renderer - The renderer this sprite batch works for.
   * @param adaptor
   */
  constructor(e, r) {
    this.state = i.for2d(), this._gpuBufferHash = /* @__PURE__ */ Object.create(null), this._destroyRenderableBound = this.destroyRenderable.bind(this), this.localUniforms = new f({
      uTranslationMatrix: { value: new a(), type: "mat3x3<f32>" },
      uColor: { value: new Float32Array(4), type: "vec4<f32>" },
      uRound: { value: 1, type: "f32" },
      uResolution: { value: [0, 0], type: "vec2<f32>" }
    }), this.renderer = e, this.adaptor = r, this.defaultShader = new p(), this.state = i.for2d();
  }
  validateRenderable(e) {
    return !1;
  }
  addRenderable(e, r) {
    this.renderer.renderPipes.batch.break(r), r.add(e);
  }
  getBuffers(e) {
    return this._gpuBufferHash[e.uid] || this._initBuffer(e);
  }
  _initBuffer(e) {
    return this._gpuBufferHash[e.uid] = new h({
      size: e.particleChildren.length,
      properties: e._properties
    }), e.on("destroyed", this._destroyRenderableBound), this._gpuBufferHash[e.uid];
  }
  updateRenderable(e) {
  }
  destroyRenderable(e) {
    this._gpuBufferHash[e.uid].destroy(), this._gpuBufferHash[e.uid] = null, e.off("destroyed", this._destroyRenderableBound);
  }
  execute(e) {
    const r = e.particleChildren;
    if (r.length === 0)
      return;
    const o = this.renderer, u = this.getBuffers(e);
    e.texture || (e.texture = r[0].texture);
    const d = this.state;
    u.update(r, e._childrenDirty), e._childrenDirty = !1, d.blendMode = l(e.blendMode, e.texture._source);
    const t = this.localUniforms.uniforms, s = t.uTranslationMatrix;
    e.worldTransform.copyTo(s), s.prepend(o.globalUniforms.globalUniformData.projectionMatrix), t.uResolution = o.globalUniforms.globalUniformData.resolution, t.uRound = o._roundPixels | e._roundPixels, n(
      e.groupColorAlpha,
      t.uColor,
      0
    ), this.adaptor.execute(this, e);
  }
  /** Destroys the ParticleRenderer. */
  destroy() {
    this.defaultShader && (this.defaultShader.destroy(), this.defaultShader = null);
  }
}
export {
  R as ParticleContainerPipe
};
//# sourceMappingURL=index541.js.map

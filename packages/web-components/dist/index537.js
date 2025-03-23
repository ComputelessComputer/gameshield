import { ExtensionType as o } from "./index153.js";
import { Matrix as h } from "./index393.js";
import { BindGroup as d } from "./index394.js";
import { UniformGroup as l } from "./index396.js";
import { getAdjustedBlendModeBlend as u } from "./index419.js";
import { BigPool as n } from "./index446.js";
import { color32BitToUniform as c } from "./index500.js";
import { BatchableMesh as p } from "./index536.js";
class _ {
  constructor(e, t) {
    this.localUniforms = new l({
      uTransformMatrix: { value: new h(), type: "mat3x3<f32>" },
      uColor: { value: new Float32Array([1, 1, 1, 1]), type: "vec4<f32>" },
      uRound: { value: 0, type: "f32" }
    }), this.localUniformsBindGroup = new d({
      0: this.localUniforms
    }), this._meshDataHash = /* @__PURE__ */ Object.create(null), this._gpuBatchableMeshHash = /* @__PURE__ */ Object.create(null), this._destroyRenderableBound = this.destroyRenderable.bind(this), this.renderer = e, this._adaptor = t, this._adaptor.init(), e.renderableGC.addManagedHash(this, "_gpuBatchableMeshHash"), e.renderableGC.addManagedHash(this, "_meshDataHash");
  }
  validateRenderable(e) {
    const t = this._getMeshData(e), r = t.batched, s = e.batched;
    if (t.batched = s, r !== s)
      return !0;
    if (s) {
      const a = e._geometry;
      if (a.indices.length !== t.indexSize || a.positions.length !== t.vertexSize)
        return t.indexSize = a.indices.length, t.vertexSize = a.positions.length, !0;
      const i = this._getBatchableMesh(e);
      return i.texture.uid !== e._texture.uid && (i._textureMatrixUpdateId = -1), !i._batcher.checkAndUpdateTexture(
        i,
        e._texture
      );
    }
    return !1;
  }
  addRenderable(e, t) {
    const r = this.renderer.renderPipes.batch, { batched: s } = this._getMeshData(e);
    if (s) {
      const a = this._getBatchableMesh(e);
      a.setTexture(e._texture), a.geometry = e._geometry, r.addToBatch(a, t);
    } else
      r.break(t), t.add(e);
  }
  updateRenderable(e) {
    if (e.batched) {
      const t = this._gpuBatchableMeshHash[e.uid];
      t.setTexture(e._texture), t.geometry = e._geometry, t._batcher.updateElement(t);
    }
  }
  destroyRenderable(e) {
    this._meshDataHash[e.uid] = null;
    const t = this._gpuBatchableMeshHash[e.uid];
    t && (n.return(t), this._gpuBatchableMeshHash[e.uid] = null), e.off("destroyed", this._destroyRenderableBound);
  }
  execute(e) {
    if (!e.isRenderable)
      return;
    e.state.blendMode = u(e.groupBlendMode, e.texture._source);
    const t = this.localUniforms;
    t.uniforms.uTransformMatrix = e.groupTransform, t.uniforms.uRound = this.renderer._roundPixels | e._roundPixels, t.update(), c(
      e.groupColorAlpha,
      t.uniforms.uColor,
      0
    ), this._adaptor.execute(this, e);
  }
  _getMeshData(e) {
    return this._meshDataHash[e.uid] || this._initMeshData(e);
  }
  _initMeshData(e) {
    var t, r;
    return this._meshDataHash[e.uid] = {
      batched: e.batched,
      indexSize: (t = e._geometry.indices) == null ? void 0 : t.length,
      vertexSize: (r = e._geometry.positions) == null ? void 0 : r.length
    }, e.on("destroyed", this._destroyRenderableBound), this._meshDataHash[e.uid];
  }
  _getBatchableMesh(e) {
    return this._gpuBatchableMeshHash[e.uid] || this._initBatchableMesh(e);
  }
  _initBatchableMesh(e) {
    const t = n.get(p);
    return t.renderable = e, t.setTexture(e._texture), t.transform = e.groupTransform, t.roundPixels = this.renderer._roundPixels | e._roundPixels, this._gpuBatchableMeshHash[e.uid] = t, t;
  }
  destroy() {
    for (const e in this._gpuBatchableMeshHash)
      this._gpuBatchableMeshHash[e] && n.return(this._gpuBatchableMeshHash[e]);
    this._gpuBatchableMeshHash = null, this._meshDataHash = null, this.localUniforms = null, this.localUniformsBindGroup = null, this._adaptor.destroy(), this._adaptor = null, this.renderer = null;
  }
}
_.extension = {
  type: [
    o.WebGLPipes,
    o.WebGPUPipes,
    o.CanvasPipes
  ],
  name: "mesh"
};
export {
  _ as MeshPipe
};
//# sourceMappingURL=index537.js.map

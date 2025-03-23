class u {
  constructor() {
    this.batcherName = "default", this.packAsQuad = !1, this.indexOffset = 0, this.attributeOffset = 0, this.roundPixels = 0, this._batcher = null, this._batch = null, this._textureMatrixUpdateId = -1, this._uvUpdateId = -1;
  }
  get blendMode() {
    return this.renderable.groupBlendMode;
  }
  get topology() {
    return this._topology || this.geometry.topology;
  }
  set topology(e) {
    this._topology = e;
  }
  reset() {
    this.renderable = null, this.texture = null, this._batcher = null, this._batch = null, this.geometry = null, this._uvUpdateId = -1, this._textureMatrixUpdateId = -1;
  }
  /**
   * Sets the texture for the batchable mesh.
   * As it does so, it resets the texture matrix update ID.
   * this is to ensure that the texture matrix is recalculated when the uvs are referenced
   * @param value - The texture to set.
   */
  setTexture(e) {
    this.texture !== e && (this.texture = e, this._textureMatrixUpdateId = -1);
  }
  get uvs() {
    const i = this.geometry.getBuffer("aUV"), r = i.data;
    let t = r;
    const s = this.texture.textureMatrix;
    return s.isSimple || (t = this._transformedUvs, (this._textureMatrixUpdateId !== s._updateID || this._uvUpdateId !== i._updateID) && ((!t || t.length < r.length) && (t = this._transformedUvs = new Float32Array(r.length)), this._textureMatrixUpdateId = s._updateID, this._uvUpdateId = i._updateID, s.multiplyUvs(r, t))), t;
  }
  get positions() {
    return this.geometry.positions;
  }
  get indices() {
    return this.geometry.indices;
  }
  get color() {
    return this.renderable.groupColorAlpha;
  }
  get groupTransform() {
    return this.renderable.groupTransform;
  }
  get attributeSize() {
    return this.geometry.positions.length / 2;
  }
  get indexSize() {
    return this.geometry.indices.length;
  }
}
export {
  u as BatchableMesh
};
//# sourceMappingURL=index536.js.map

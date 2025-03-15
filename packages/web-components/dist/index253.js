class u {
  /**
   * @param uvBuffer - Buffer with normalized uv's
   * @param uvMatrix - Material UV matrix
   */
  constructor(a, t) {
    this.uvBuffer = a, this.uvMatrix = t, this.data = null, this._bufferUpdateId = -1, this._textureUpdateId = -1, this._updateID = 0;
  }
  /**
   * Updates
   * @param forceUpdate - force the update
   */
  update(a) {
    if (!a && this._bufferUpdateId === this.uvBuffer._updateID && this._textureUpdateId === this.uvMatrix._updateID)
      return;
    this._bufferUpdateId = this.uvBuffer._updateID, this._textureUpdateId = this.uvMatrix._updateID;
    const t = this.uvBuffer.data;
    (!this.data || this.data.length !== t.length) && (this.data = new Float32Array(t.length)), this.uvMatrix.multiplyUvs(t, this.data), this._updateID++;
  }
}
export {
  u as MeshBatchUvs
};
//# sourceMappingURL=index253.js.map

import u from "./index157.js";
import { uid as r } from "./index416.js";
import { BufferUsage as h } from "./index423.js";
class c extends u {
  /**
   * Creates a new Buffer with the given options
   * @param options - the options for the buffer
   */
  constructor(t) {
    let { data: e, size: i } = t;
    const { usage: s, label: a, shrinkToFit: d } = t;
    super(), this.uid = r("buffer"), this._resourceType = "buffer", this._resourceId = r("resource"), this._touched = 0, this._updateID = 1, this._dataInt32 = null, this.shrinkToFit = !0, this.destroyed = !1, e instanceof Array && (e = new Float32Array(e)), this._data = e, i ?? (i = e == null ? void 0 : e.byteLength);
    const n = !!e;
    this.descriptor = {
      size: i,
      usage: s,
      mappedAtCreation: n,
      label: a
    }, this.shrinkToFit = d ?? !0;
  }
  /** the data in the buffer */
  get data() {
    return this._data;
  }
  set data(t) {
    this.setDataWithSize(t, t.length, !0);
  }
  get dataInt32() {
    return this._dataInt32 || (this._dataInt32 = new Int32Array(this.data.buffer)), this._dataInt32;
  }
  /** whether the buffer is static or not */
  get static() {
    return !!(this.descriptor.usage & h.STATIC);
  }
  set static(t) {
    t ? this.descriptor.usage |= h.STATIC : this.descriptor.usage &= ~h.STATIC;
  }
  /**
   * Sets the data in the buffer to the given value. This will immediately update the buffer on the GPU.
   * If you only want to update a subset of the buffer, you can pass in the size of the data.
   * @param value - the data to set
   * @param size - the size of the data in bytes
   * @param syncGPU - should the buffer be updated on the GPU immediately?
   */
  setDataWithSize(t, e, i) {
    if (this._updateID++, this._updateSize = e * t.BYTES_PER_ELEMENT, this._data === t) {
      i && this.emit("update", this);
      return;
    }
    const s = this._data;
    if (this._data = t, this._dataInt32 = null, !s || s.length !== t.length) {
      !this.shrinkToFit && s && t.byteLength < s.byteLength ? i && this.emit("update", this) : (this.descriptor.size = t.byteLength, this._resourceId = r("resource"), this.emit("change", this));
      return;
    }
    i && this.emit("update", this);
  }
  /**
   * updates the buffer on the GPU to reflect the data in the buffer.
   * By default it will update the entire buffer. If you only want to update a subset of the buffer,
   * you can pass in the size of the buffer to update.
   * @param sizeInBytes - the new size of the buffer in bytes
   */
  update(t) {
    this._updateSize = t ?? this._updateSize, this._updateID++, this.emit("update", this);
  }
  /** Destroys the buffer */
  destroy() {
    this.destroyed = !0, this.emit("destroy", this), this.emit("change", this), this._data = null, this.descriptor = null, this.removeAllListeners();
  }
}
export {
  c as Buffer
};
//# sourceMappingURL=index422.js.map

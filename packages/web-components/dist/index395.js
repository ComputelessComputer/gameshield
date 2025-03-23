import n from "./index157.js";
import { Bounds as o } from "./index399.js";
import { uid as h } from "./index416.js";
import { Buffer as d } from "./index422.js";
import { ensureIsBuffer as u } from "./index464.js";
import { getGeometryBounds as b } from "./index465.js";
function a(s) {
  return (s instanceof d || Array.isArray(s) || s.BYTES_PER_ELEMENT) && (s = {
    buffer: s
  }), s.buffer = u(s.buffer, !1), s;
}
class g extends n {
  /**
   * Create a new instance of a geometry
   * @param options - The options for the geometry.
   */
  constructor(t = {}) {
    super(), this.uid = h("geometry"), this._layoutKey = 0, this.instanceCount = 1, this._bounds = new o(), this._boundsDirty = !0;
    const { attributes: e, indexBuffer: r, topology: i } = t;
    if (this.buffers = [], this.attributes = {}, e)
      for (const f in e)
        this.addAttribute(f, e[f]);
    this.instanceCount = t.instanceCount ?? 1, r && this.addIndex(r), this.topology = i || "triangle-list";
  }
  onBufferUpdate() {
    this._boundsDirty = !0, this.emit("update", this);
  }
  /**
   * Returns the requested attribute.
   * @param id - The name of the attribute required
   * @returns - The attribute requested.
   */
  getAttribute(t) {
    return this.attributes[t];
  }
  /**
   * Returns the index buffer
   * @returns - The index buffer.
   */
  getIndex() {
    return this.indexBuffer;
  }
  /**
   * Returns the requested buffer.
   * @param id - The name of the buffer required.
   * @returns - The buffer requested.
   */
  getBuffer(t) {
    return this.getAttribute(t).buffer;
  }
  /**
   * Used to figure out how many vertices there are in this geometry
   * @returns the number of vertices in the geometry
   */
  getSize() {
    for (const t in this.attributes) {
      const e = this.attributes[t];
      return e.buffer.data.length / (e.stride / 4 || e.size);
    }
    return 0;
  }
  /**
   * Adds an attribute to the geometry.
   * @param name - The name of the attribute to add.
   * @param attributeOption - The attribute option to add.
   */
  addAttribute(t, e) {
    const r = a(e);
    this.buffers.indexOf(r.buffer) === -1 && (this.buffers.push(r.buffer), r.buffer.on("update", this.onBufferUpdate, this), r.buffer.on("change", this.onBufferUpdate, this)), this.attributes[t] = r;
  }
  /**
   * Adds an index buffer to the geometry.
   * @param indexBuffer - The index buffer to add. Can be a Buffer, TypedArray, or an array of numbers.
   */
  addIndex(t) {
    this.indexBuffer = u(t, !0), this.buffers.push(this.indexBuffer);
  }
  /** Returns the bounds of the geometry. */
  get bounds() {
    return this._boundsDirty ? (this._boundsDirty = !1, b(this, "aPosition", this._bounds)) : this._bounds;
  }
  /**
   * destroys the geometry.
   * @param destroyBuffers - destroy the buffers associated with this geometry
   */
  destroy(t = !1) {
    this.emit("destroy", this), this.removeAllListeners(), t && this.buffers.forEach((e) => e.destroy()), this.attributes = null, this.buffers = null, this.indexBuffer = null, this._bounds = null;
  }
}
export {
  g as Geometry
};
//# sourceMappingURL=index395.js.map

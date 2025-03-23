import { BUFFER_TYPE as p } from "./index164.js";
import { Runner as g } from "./index32.js";
import "./index37.js";
import "./index33.js";
import "./index38.js";
import "./index39.js";
import "./index40.js";
import "./index21.js";
import "./index41.js";
import { getBufferType as y } from "./index222.js";
import "./index42.js";
import { Attribute as x } from "./index220.js";
import { Buffer as o } from "./index193.js";
import { interleaveTypedArrays as A } from "./index223.js";
const B = { 5126: 4, 5123: 2, 5121: 1 };
let m = 0;
const w = {
  Float32Array,
  Uint32Array,
  Int32Array,
  Uint8Array,
  Uint16Array
};
class c {
  /**
   * @param buffers - An array of buffers. optional.
   * @param attributes - Of the geometry, optional structure of the attributes layout
   */
  constructor(t = [], e = {}) {
    this.buffers = t, this.indexBuffer = null, this.attributes = e, this.glVertexArrayObjects = {}, this.id = m++, this.instanced = !1, this.instanceCount = 1, this.disposeRunner = new g("disposeGeometry"), this.refCount = 0;
  }
  /**
   *
   * Adds an attribute to the geometry
   * Note: `stride` and `start` should be `undefined` if you dont know them, not 0!
   * @param id - the name of the attribute (matching up to a shader)
   * @param {PIXI.Buffer|number[]} buffer - the buffer that holds the data of the attribute . You can also provide an Array and a buffer will be created from it.
   * @param size - the size of the attribute. If you have 2 floats per vertex (eg position x and y) this would be 2
   * @param normalized - should the data be normalized.
   * @param [type=PIXI.TYPES.FLOAT] - what type of number is the attribute. Check {@link PIXI.TYPES} to see the ones available
   * @param [stride=0] - How far apart, in bytes, the start of each value is. (used for interleaving data)
   * @param [start=0] - How far into the array to start reading values (used for interleaving data)
   * @param instance - Instancing flag
   * @returns - Returns self, useful for chaining.
   */
  addAttribute(t, e, f = 0, n = !1, a, r, i, s = !1) {
    if (!e)
      throw new Error("You must pass a buffer when creating an attribute");
    e instanceof o || (e instanceof Array && (e = new Float32Array(e)), e = new o(e));
    const d = t.split("|");
    if (d.length > 1) {
      for (let u = 0; u < d.length; u++)
        this.addAttribute(d[u], e, f, n, a);
      return this;
    }
    let h = this.buffers.indexOf(e);
    return h === -1 && (this.buffers.push(e), h = this.buffers.length - 1), this.attributes[t] = new x(h, f, n, a, r, i, s), this.instanced = this.instanced || s, this;
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
   * Returns the requested buffer.
   * @param id - The name of the buffer required.
   * @returns - The buffer requested.
   */
  getBuffer(t) {
    return this.buffers[this.getAttribute(t).buffer];
  }
  /**
   *
   * Adds an index buffer to the geometry
   * The index buffer contains integers, three for each triangle in the geometry, which reference the various attribute buffers (position, colour, UV coordinates, other UV coordinates, normal, …). There is only ONE index buffer.
   * @param {PIXI.Buffer|number[]} [buffer] - The buffer that holds the data of the index buffer. You can also provide an Array and a buffer will be created from it.
   * @returns - Returns self, useful for chaining.
   */
  addIndex(t) {
    return t instanceof o || (t instanceof Array && (t = new Uint16Array(t)), t = new o(t)), t.type = p.ELEMENT_ARRAY_BUFFER, this.indexBuffer = t, this.buffers.includes(t) || this.buffers.push(t), this;
  }
  /**
   * Returns the index buffer
   * @returns - The index buffer.
   */
  getIndex() {
    return this.indexBuffer;
  }
  /**
   * This function modifies the structure so that all current attributes become interleaved into a single buffer
   * This can be useful if your model remains static as it offers a little performance boost
   * @returns - Returns self, useful for chaining.
   */
  interleave() {
    if (this.buffers.length === 1 || this.buffers.length === 2 && this.indexBuffer)
      return this;
    const t = [], e = [], f = new o();
    let n;
    for (n in this.attributes) {
      const a = this.attributes[n], r = this.buffers[a.buffer];
      t.push(r.data), e.push(a.size * B[a.type] / 4), a.buffer = 0;
    }
    for (f.data = A(t, e), n = 0; n < this.buffers.length; n++)
      this.buffers[n] !== this.indexBuffer && this.buffers[n].destroy();
    return this.buffers = [f], this.indexBuffer && this.buffers.push(this.indexBuffer), this;
  }
  /** Get the size of the geometries, in vertices. */
  getSize() {
    for (const t in this.attributes) {
      const e = this.attributes[t];
      return this.buffers[e.buffer].data.length / (e.stride / 4 || e.size);
    }
    return 0;
  }
  /** Disposes WebGL resources that are connected to this geometry. */
  dispose() {
    this.disposeRunner.emit(this, !1);
  }
  /** Destroys the geometry. */
  destroy() {
    this.dispose(), this.buffers = null, this.indexBuffer = null, this.attributes = null;
  }
  /**
   * Returns a clone of the geometry.
   * @returns - A new clone of this geometry.
   */
  clone() {
    const t = new c();
    for (let e = 0; e < this.buffers.length; e++)
      t.buffers[e] = new o(this.buffers[e].data.slice(0));
    for (const e in this.attributes) {
      const f = this.attributes[e];
      t.attributes[e] = new x(
        f.buffer,
        f.size,
        f.normalized,
        f.type,
        f.stride,
        f.start,
        f.instance
      );
    }
    return this.indexBuffer && (t.indexBuffer = t.buffers[this.buffers.indexOf(this.indexBuffer)], t.indexBuffer.type = p.ELEMENT_ARRAY_BUFFER), t;
  }
  /**
   * Merges an array of geometries into a new single one.
   *
   * Geometry attribute styles must match for this operation to work.
   * @param geometries - array of geometries to merge
   * @returns - Shiny new geometry!
   */
  static merge(t) {
    const e = new c(), f = [], n = [], a = [];
    let r;
    for (let i = 0; i < t.length; i++) {
      r = t[i];
      for (let s = 0; s < r.buffers.length; s++)
        n[s] = n[s] || 0, n[s] += r.buffers[s].data.length, a[s] = 0;
    }
    for (let i = 0; i < r.buffers.length; i++)
      f[i] = new w[y(r.buffers[i].data)](n[i]), e.buffers[i] = new o(f[i]);
    for (let i = 0; i < t.length; i++) {
      r = t[i];
      for (let s = 0; s < r.buffers.length; s++)
        f[s].set(r.buffers[s].data, a[s]), a[s] += r.buffers[s].data.length;
    }
    if (e.attributes = r.attributes, r.indexBuffer) {
      e.indexBuffer = e.buffers[r.buffers.indexOf(r.indexBuffer)], e.indexBuffer.type = p.ELEMENT_ARRAY_BUFFER;
      let i = 0, s = 0, d = 0, h = 0;
      for (let u = 0; u < r.buffers.length; u++)
        if (r.buffers[u] !== r.indexBuffer) {
          h = u;
          break;
        }
      for (const u in r.attributes) {
        const b = r.attributes[u];
        (b.buffer | 0) === h && (s += b.size * B[b.type] / 4);
      }
      for (let u = 0; u < t.length; u++) {
        const b = t[u].indexBuffer.data;
        for (let l = 0; l < b.length; l++)
          e.indexBuffer.data[l + d] += i;
        i += t[u].buffers[h].data.length / s, d += b.length;
      }
    }
    return e;
  }
}
export {
  c as Geometry
};
//# sourceMappingURL=index194.js.map

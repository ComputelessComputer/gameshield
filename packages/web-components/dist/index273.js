import "./index23.js";
import "./index24.js";
import { TYPES as p } from "./index164.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import "./index28.js";
import "./index29.js";
import "./index30.js";
import "./index31.js";
import "./index32.js";
import "./index33.js";
import "./index34.js";
import "./index35.js";
import "./index36.js";
import "./index37.js";
import "./index38.js";
import "./index39.js";
import "./index40.js";
import "./index41.js";
import "./index42.js";
import "./index43.js";
import "./index44.js";
import { createIndicesForQuads as n } from "./index305.js";
import "./index45.js";
import "./index46.js";
import "./index47.js";
import { Buffer as m } from "./index180.js";
import { Geometry as c } from "./index181.js";
import "./index48.js";
import "./index49.js";
import "./index50.js";
import "./index51.js";
import "./index52.js";
import "./index53.js";
import "./index54.js";
import "./index55.js";
import "./index56.js";
import "./index57.js";
import "./index58.js";
import "./index59.js";
import "./index60.js";
import "./index61.js";
import "./index62.js";
import "./index63.js";
import "./index64.js";
import "./index65.js";
import "./index66.js";
import "./index67.js";
import "./index68.js";
import "./index69.js";
import "./index70.js";
import "./index71.js";
import "./index72.js";
import "./index73.js";
import "./index74.js";
import "./index75.js";
import "./index76.js";
import "./index77.js";
import "./index78.js";
import "./index79.js";
import "./index80.js";
import "./index81.js";
class Ut {
  /**
   * @param {object} properties - The properties to upload.
   * @param {boolean[]} dynamicPropertyFlags - Flags for which properties are dynamic.
   * @param {number} size - The size of the batch.
   */
  constructor(s, o, a) {
    this.geometry = new c(), this.indexBuffer = null, this.size = a, this.dynamicProperties = [], this.staticProperties = [];
    for (let r = 0; r < s.length; ++r) {
      let t = s[r];
      t = {
        attributeName: t.attributeName,
        size: t.size,
        uploadFunction: t.uploadFunction,
        type: t.type || p.FLOAT,
        offset: t.offset
      }, o[r] ? this.dynamicProperties.push(t) : this.staticProperties.push(t);
    }
    this.staticStride = 0, this.staticBuffer = null, this.staticData = null, this.staticDataUint32 = null, this.dynamicStride = 0, this.dynamicBuffer = null, this.dynamicData = null, this.dynamicDataUint32 = null, this._updateID = 0, this.initBuffers();
  }
  /** Sets up the renderer context and necessary buffers. */
  initBuffers() {
    const s = this.geometry;
    let o = 0;
    this.indexBuffer = new m(n(this.size), !0, !0), s.addIndex(this.indexBuffer), this.dynamicStride = 0;
    for (let e = 0; e < this.dynamicProperties.length; ++e) {
      const i = this.dynamicProperties[e];
      i.offset = o, o += i.size, this.dynamicStride += i.size;
    }
    const a = new ArrayBuffer(this.size * this.dynamicStride * 4 * 4);
    this.dynamicData = new Float32Array(a), this.dynamicDataUint32 = new Uint32Array(a), this.dynamicBuffer = new m(this.dynamicData, !1, !1);
    let r = 0;
    this.staticStride = 0;
    for (let e = 0; e < this.staticProperties.length; ++e) {
      const i = this.staticProperties[e];
      i.offset = r, r += i.size, this.staticStride += i.size;
    }
    const t = new ArrayBuffer(this.size * this.staticStride * 4 * 4);
    this.staticData = new Float32Array(t), this.staticDataUint32 = new Uint32Array(t), this.staticBuffer = new m(this.staticData, !0, !1);
    for (let e = 0; e < this.dynamicProperties.length; ++e) {
      const i = this.dynamicProperties[e];
      s.addAttribute(
        i.attributeName,
        this.dynamicBuffer,
        0,
        i.type === p.UNSIGNED_BYTE,
        i.type,
        this.dynamicStride * 4,
        i.offset * 4
      );
    }
    for (let e = 0; e < this.staticProperties.length; ++e) {
      const i = this.staticProperties[e];
      s.addAttribute(
        i.attributeName,
        this.staticBuffer,
        0,
        i.type === p.UNSIGNED_BYTE,
        i.type,
        this.staticStride * 4,
        i.offset * 4
      );
    }
  }
  /**
   * Uploads the dynamic properties.
   * @param children - The children to upload.
   * @param startIndex - The index to start at.
   * @param amount - The number to upload.
   */
  uploadDynamic(s, o, a) {
    for (let r = 0; r < this.dynamicProperties.length; r++) {
      const t = this.dynamicProperties[r];
      t.uploadFunction(
        s,
        o,
        a,
        t.type === p.UNSIGNED_BYTE ? this.dynamicDataUint32 : this.dynamicData,
        this.dynamicStride,
        t.offset
      );
    }
    this.dynamicBuffer._updateID++;
  }
  /**
   * Uploads the static properties.
   * @param children - The children to upload.
   * @param startIndex - The index to start at.
   * @param amount - The number to upload.
   */
  uploadStatic(s, o, a) {
    for (let r = 0; r < this.staticProperties.length; r++) {
      const t = this.staticProperties[r];
      t.uploadFunction(
        s,
        o,
        a,
        t.type === p.UNSIGNED_BYTE ? this.staticDataUint32 : this.staticData,
        this.staticStride,
        t.offset
      );
    }
    this.staticBuffer._updateID++;
  }
  /** Destroys the ParticleBuffer. */
  destroy() {
    this.indexBuffer = null, this.dynamicProperties = null, this.dynamicBuffer = null, this.dynamicData = null, this.dynamicDataUint32 = null, this.staticProperties = null, this.staticBuffer = null, this.staticData = null, this.staticDataUint32 = null, this.geometry.destroy();
  }
}
export {
  Ut as ParticleBuffer
};
//# sourceMappingURL=index273.js.map

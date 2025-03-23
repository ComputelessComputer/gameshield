import { Buffer as l } from "./index422.js";
import { BufferUsage as n } from "./index423.js";
import { Geometry as B } from "./index395.js";
import { getAttributeInfoFromFormat as _ } from "./index462.js";
import { ViewableBuffer as c } from "./index417.js";
import { createIndicesForQuads as p } from "./index544.js";
import { generateParticleUpdateFunction as b } from "./index545.js";
class V {
  constructor(t) {
    this._size = 0, this._generateParticleUpdateCache = {};
    const e = this._size = t.size ?? 1e3, i = t.properties;
    let a = 0, d = 0;
    for (const h in i) {
      const r = i[h], s = _(r.format);
      r.dynamic ? d += s.stride : a += s.stride;
    }
    this._dynamicStride = d / 4, this._staticStride = a / 4, this.staticAttributeBuffer = new c(e * 4 * a), this.dynamicAttributeBuffer = new c(e * 4 * d), this.indexBuffer = p(e);
    const f = new B();
    let u = 0, m = 0;
    this._staticBuffer = new l({
      data: new Float32Array(1),
      label: "static-particle-buffer",
      shrinkToFit: !1,
      usage: n.VERTEX | n.COPY_DST
    }), this._dynamicBuffer = new l({
      data: new Float32Array(1),
      label: "dynamic-particle-buffer",
      shrinkToFit: !1,
      usage: n.VERTEX | n.COPY_DST
    });
    for (const h in i) {
      const r = i[h], s = _(r.format);
      r.dynamic ? (f.addAttribute(r.attributeName, {
        buffer: this._dynamicBuffer,
        stride: this._dynamicStride * 4,
        offset: u * 4,
        format: r.format
      }), u += s.size) : (f.addAttribute(r.attributeName, {
        buffer: this._staticBuffer,
        stride: this._staticStride * 4,
        offset: m * 4,
        format: r.format
      }), m += s.size);
    }
    f.addIndex(this.indexBuffer);
    const y = this.getParticleUpdate(i);
    this._dynamicUpload = y.dynamicUpdate, this._staticUpload = y.staticUpdate, this.geometry = f;
  }
  getParticleUpdate(t) {
    const e = g(t);
    return this._generateParticleUpdateCache[e] ? this._generateParticleUpdateCache[e] : (this._generateParticleUpdateCache[e] = this.generateParticleUpdate(t), this._generateParticleUpdateCache[e]);
  }
  generateParticleUpdate(t) {
    return b(t);
  }
  update(t, e) {
    t.length > this._size && (e = !0, this._size = Math.max(t.length, this._size * 1.5 | 0), this.staticAttributeBuffer = new c(this._size * this._staticStride * 4 * 4), this.dynamicAttributeBuffer = new c(this._size * this._dynamicStride * 4 * 4), this.indexBuffer = p(this._size), this.geometry.indexBuffer.setDataWithSize(
      this.indexBuffer,
      this.indexBuffer.byteLength,
      !0
    ));
    const i = this.dynamicAttributeBuffer;
    if (this._dynamicUpload(t, i.float32View, i.uint32View), this._dynamicBuffer.setDataWithSize(
      this.dynamicAttributeBuffer.float32View,
      t.length * this._dynamicStride * 4,
      !0
    ), e) {
      const a = this.staticAttributeBuffer;
      this._staticUpload(t, a.float32View, a.uint32View), this._staticBuffer.setDataWithSize(
        a.float32View,
        t.length * this._staticStride * 4,
        !0
      );
    }
  }
  destroy() {
    this._staticBuffer.destroy(), this._dynamicBuffer.destroy(), this.geometry.destroy();
  }
}
function g(o) {
  const t = [];
  for (const e in o) {
    const i = o[e];
    t.push(e, i.code, i.dynamic ? "d" : "s");
  }
  return t.join("_");
}
export {
  V as ParticleBuffer
};
//# sourceMappingURL=index543.js.map

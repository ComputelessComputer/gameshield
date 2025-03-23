import { uid as M } from "./index416.js";
import { ViewableBuffer as I } from "./index417.js";
import { fastCopy as k } from "./index418.js";
import { getAdjustedBlendModeBlend as A } from "./index419.js";
import { getMaxTexturesPerBatch as Q } from "./index412.js";
import { BatchTextureArray as P } from "./index420.js";
class V {
  constructor() {
    this.renderPipeId = "batch", this.action = "startBatch", this.start = 0, this.size = 0, this.textures = new P(), this.blendMode = "normal", this.topology = "triangle-strip", this.canBundle = !0;
  }
  destroy() {
    this.textures = null, this.gpuBindGroup = null, this.bindGroup = null, this.batcher = null;
  }
}
const g = [];
let z = 0;
function w() {
  return z > 0 ? g[--z] : new V();
}
function y(p) {
  g[z++] = p;
}
let x = 0;
const T = class S {
  constructor(t = {}) {
    this.uid = M("batcher"), this.dirty = !0, this.batchIndex = 0, this.batches = [], this._elements = [], S.defaultOptions.maxTextures = S.defaultOptions.maxTextures ?? Q(), t = { ...S.defaultOptions, ...t };
    const { maxTextures: i, attributesInitialSize: r, indicesInitialSize: s } = t;
    this.attributeBuffer = new I(r * 4), this.indexBuffer = new Uint16Array(s), this.maxTextures = i;
  }
  begin() {
    this.elementSize = 0, this.elementStart = 0, this.indexSize = 0, this.attributeSize = 0;
    for (let t = 0; t < this.batchIndex; t++)
      y(this.batches[t]);
    this.batchIndex = 0, this._batchIndexStart = 0, this._batchIndexSize = 0, this.dirty = !0;
  }
  add(t) {
    this._elements[this.elementSize++] = t, t._indexStart = this.indexSize, t._attributeStart = this.attributeSize, t._batcher = this, this.indexSize += t.indexSize, this.attributeSize += t.attributeSize * this.vertexSize;
  }
  checkAndUpdateTexture(t, i) {
    const r = t._batch.textures.ids[i._source.uid];
    return !r && r !== 0 ? !1 : (t._textureId = r, t.texture = i, !0);
  }
  updateElement(t) {
    this.dirty = !0;
    const i = this.attributeBuffer;
    t.packAsQuad ? this.packQuadAttributes(
      t,
      i.float32View,
      i.uint32View,
      t._attributeStart,
      t._textureId
    ) : this.packAttributes(
      t,
      i.float32View,
      i.uint32View,
      t._attributeStart,
      t._textureId
    );
  }
  /**
   * breaks the batcher. This happens when a batch gets too big,
   * or we need to switch to a different type of rendering (a filter for example)
   * @param instructionSet
   */
  break(t) {
    const i = this._elements;
    if (!i[this.elementStart])
      return;
    let r = w(), s = r.textures;
    s.clear();
    const u = i[this.elementStart];
    let n = A(u.blendMode, u.texture._source), a = u.topology;
    this.attributeSize * 4 > this.attributeBuffer.size && this._resizeAttributeBuffer(this.attributeSize * 4), this.indexSize > this.indexBuffer.length && this._resizeIndexBuffer(this.indexSize);
    const h = this.attributeBuffer.float32View, o = this.attributeBuffer.uint32View, c = this.indexBuffer;
    let d = this._batchIndexSize, f = this._batchIndexStart, B = "startBatch";
    const E = this.maxTextures;
    for (let _ = this.elementStart; _ < this.elementSize; ++_) {
      const e = i[_];
      i[_] = null;
      const l = e.texture._source, m = A(e.blendMode, l), b = n !== m || a !== e.topology;
      if (l._batchTick === x && !b) {
        e._textureId = l._textureBindLocation, d += e.indexSize, e.packAsQuad ? (this.packQuadAttributes(
          e,
          h,
          o,
          e._attributeStart,
          e._textureId
        ), this.packQuadIndex(
          c,
          e._indexStart,
          e._attributeStart / this.vertexSize
        )) : (this.packAttributes(
          e,
          h,
          o,
          e._attributeStart,
          e._textureId
        ), this.packIndex(
          e,
          c,
          e._indexStart,
          e._attributeStart / this.vertexSize
        )), e._batch = r;
        continue;
      }
      l._batchTick = x, (s.count >= E || b) && (this._finishBatch(
        r,
        f,
        d - f,
        s,
        n,
        a,
        t,
        B
      ), B = "renderBatch", f = d, n = m, a = e.topology, r = w(), s = r.textures, s.clear(), ++x), e._textureId = l._textureBindLocation = s.count, s.ids[l.uid] = s.count, s.textures[s.count++] = l, e._batch = r, d += e.indexSize, e.packAsQuad ? (this.packQuadAttributes(
        e,
        h,
        o,
        e._attributeStart,
        e._textureId
      ), this.packQuadIndex(
        c,
        e._indexStart,
        e._attributeStart / this.vertexSize
      )) : (this.packAttributes(
        e,
        h,
        o,
        e._attributeStart,
        e._textureId
      ), this.packIndex(
        e,
        c,
        e._indexStart,
        e._attributeStart / this.vertexSize
      ));
    }
    s.count > 0 && (this._finishBatch(
      r,
      f,
      d - f,
      s,
      n,
      a,
      t,
      B
    ), f = d, ++x), this.elementStart = this.elementSize, this._batchIndexStart = f, this._batchIndexSize = d;
  }
  _finishBatch(t, i, r, s, u, n, a, h) {
    t.gpuBindGroup = null, t.bindGroup = null, t.action = h, t.batcher = this, t.textures = s, t.blendMode = u, t.topology = n, t.start = i, t.size = r, ++x, this.batches[this.batchIndex++] = t, a.add(t);
  }
  finish(t) {
    this.break(t);
  }
  /**
   * Resizes the attribute buffer to the given size (1 = 1 float32)
   * @param size - the size in vertices to ensure (not bytes!)
   */
  ensureAttributeBuffer(t) {
    t * 4 <= this.attributeBuffer.size || this._resizeAttributeBuffer(t * 4);
  }
  /**
   * Resizes the index buffer to the given size (1 = 1 float32)
   * @param size - the size in vertices to ensure (not bytes!)
   */
  ensureIndexBuffer(t) {
    t <= this.indexBuffer.length || this._resizeIndexBuffer(t);
  }
  _resizeAttributeBuffer(t) {
    const i = Math.max(t, this.attributeBuffer.size * 2), r = new I(i);
    k(this.attributeBuffer.rawBinaryData, r.rawBinaryData), this.attributeBuffer = r;
  }
  _resizeIndexBuffer(t) {
    const i = this.indexBuffer;
    let r = Math.max(t, i.length * 1.5);
    r += r % 2;
    const s = r > 65535 ? new Uint32Array(r) : new Uint16Array(r);
    if (s.BYTES_PER_ELEMENT !== i.BYTES_PER_ELEMENT)
      for (let u = 0; u < i.length; u++)
        s[u] = i[u];
    else
      k(i.buffer, s.buffer);
    this.indexBuffer = s;
  }
  packQuadIndex(t, i, r) {
    t[i] = r + 0, t[i + 1] = r + 1, t[i + 2] = r + 2, t[i + 3] = r + 0, t[i + 4] = r + 2, t[i + 5] = r + 3;
  }
  packIndex(t, i, r, s) {
    const u = t.indices, n = t.indexSize, a = t.indexOffset, h = t.attributeOffset;
    for (let o = 0; o < n; o++)
      i[r++] = s + u[o + a] - h;
  }
  destroy() {
    for (let t = 0; t < this.batches.length; t++)
      y(this.batches[t]);
    this.batches = null;
    for (let t = 0; t < this._elements.length; t++)
      this._elements[t]._batch = null;
    this._elements = null, this.indexBuffer = null, this.attributeBuffer.destroy(), this.attributeBuffer = null;
  }
};
T.defaultOptions = {
  maxTextures: null,
  attributesInitialSize: 4,
  indicesInitialSize: 6
};
let N = T;
export {
  V as Batch,
  N as Batcher
};
//# sourceMappingURL=index415.js.map

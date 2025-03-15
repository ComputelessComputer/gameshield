import { Color as S } from "./index24.js";
import { ENV as g } from "./index164.js";
import { ExtensionType as y, extensions as I } from "./index140.js";
import { settings as C } from "./index150.js";
import "./index36.js";
import "./index40.js";
import "./index41.js";
import "./index42.js";
import "./index43.js";
import { deprecation as w } from "./index133.js";
import { premultiplyBlendMode as G } from "./index44.js";
import { nextPow2 as B, log2 as b } from "./index182.js";
import "./index45.js";
import { ViewableBuffer as z } from "./index183.js";
import { checkMaxIfStatementsInShader as A } from "./index184.js";
import { State as M } from "./index72.js";
import { BaseTexture as T } from "./index54.js";
import { BatchDrawCall as P } from "./index178.js";
import { BatchGeometry as E } from "./index179.js";
import { BatchShaderGenerator as v } from "./index185.js";
import { BatchTextureArray as k } from "./index186.js";
import { canUploadSameBuffer as R } from "./index187.js";
import { maxRecommendedTextures as U } from "./index188.js";
import { ObjectRenderer as D } from "./index189.js";
import V from "./index190.js";
import X from "./index191.js";
const c = class f extends D {
  /**
   * This will hook onto the renderer's `contextChange`
   * and `prerender` signals.
   * @param {PIXI.Renderer} renderer - The renderer this works for.
   */
  constructor(e) {
    super(e), this.setShaderGenerator(), this.geometryClass = E, this.vertexSize = 6, this.state = M.for2d(), this.size = f.defaultBatchSize * 4, this._vertexCount = 0, this._indexCount = 0, this._bufferedElements = [], this._bufferedTextures = [], this._bufferSize = 0, this._shader = null, this._packedGeometries = [], this._packedGeometryPoolSize = 2, this._flushId = 0, this._aBuffers = {}, this._iBuffers = {}, this.maxTextures = 1, this.renderer.on("prerender", this.onPrerender, this), e.runners.contextChange.add(this), this._dcIndex = 0, this._aIndex = 0, this._iIndex = 0, this._attributeBuffer = null, this._indexBuffer = null, this._tempBoundTextures = [];
  }
  /**
   * The maximum textures that this device supports.
   * @static
   * @default 32
   */
  static get defaultMaxTextures() {
    return this._defaultMaxTextures = this._defaultMaxTextures ?? U(32), this._defaultMaxTextures;
  }
  static set defaultMaxTextures(e) {
    this._defaultMaxTextures = e;
  }
  /**
   * Can we upload the same buffer in a single frame?
   * @static
   */
  static get canUploadSameBuffer() {
    return this._canUploadSameBuffer = this._canUploadSameBuffer ?? R(), this._canUploadSameBuffer;
  }
  static set canUploadSameBuffer(e) {
    this._canUploadSameBuffer = e;
  }
  /**
   * @see PIXI.BatchRenderer#maxTextures
   * @deprecated since 7.1.0
   * @readonly
   */
  get MAX_TEXTURES() {
    return w("7.1.0", "BatchRenderer#MAX_TEXTURES renamed to BatchRenderer#maxTextures"), this.maxTextures;
  }
  /**
   * The default vertex shader source
   * @readonly
   */
  static get defaultVertexSrc() {
    return X;
  }
  /**
   * The default fragment shader source
   * @readonly
   */
  static get defaultFragmentTemplate() {
    return V;
  }
  /**
   * Set the shader generator.
   * @param {object} [options]
   * @param {string} [options.vertex=PIXI.BatchRenderer.defaultVertexSrc] - Vertex shader source
   * @param {string} [options.fragment=PIXI.BatchRenderer.defaultFragmentTemplate] - Fragment shader template
   */
  setShaderGenerator({
    vertex: e = f.defaultVertexSrc,
    fragment: t = f.defaultFragmentTemplate
  } = {}) {
    this.shaderGenerator = new v(e, t);
  }
  /**
   * Handles the `contextChange` signal.
   *
   * It calculates `this.maxTextures` and allocating the packed-geometry object pool.
   */
  contextChange() {
    const e = this.renderer.gl;
    C.PREFER_ENV === g.WEBGL_LEGACY ? this.maxTextures = 1 : (this.maxTextures = Math.min(
      e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),
      f.defaultMaxTextures
    ), this.maxTextures = A(
      this.maxTextures,
      e
    )), this._shader = this.shaderGenerator.generateShader(this.maxTextures);
    for (let t = 0; t < this._packedGeometryPoolSize; t++)
      this._packedGeometries[t] = new this.geometryClass();
    this.initFlushBuffers();
  }
  /** Makes sure that static and dynamic flush pooled objects have correct dimensions. */
  initFlushBuffers() {
    const {
      _drawCallPool: e,
      _textureArrayPool: t
    } = f, r = this.size / 4, s = Math.floor(r / this.maxTextures) + 1;
    for (; e.length < r; )
      e.push(new P());
    for (; t.length < s; )
      t.push(new k());
    for (let i = 0; i < this.maxTextures; i++)
      this._tempBoundTextures[i] = null;
  }
  /** Handles the `prerender` signal. It ensures that flushes start from the first geometry object again. */
  onPrerender() {
    this._flushId = 0;
  }
  /**
   * Buffers the "batchable" object. It need not be rendered immediately.
   * @param {PIXI.DisplayObject} element - the element to render when
   *    using this renderer
   */
  render(e) {
    e._texture.valid && (this._vertexCount + e.vertexData.length / 2 > this.size && this.flush(), this._vertexCount += e.vertexData.length / 2, this._indexCount += e.indices.length, this._bufferedTextures[this._bufferSize] = e._texture.baseTexture, this._bufferedElements[this._bufferSize++] = e);
  }
  buildTexturesAndDrawCalls() {
    const {
      _bufferedTextures: e,
      maxTextures: t
    } = this, r = f._textureArrayPool, s = this.renderer.batch, i = this._tempBoundTextures, l = this.renderer.textureGC.count;
    let u = ++T._globalBatch, x = 0, h = r[0], n = 0;
    s.copyBoundTextures(i, t);
    for (let a = 0; a < this._bufferSize; ++a) {
      const d = e[a];
      e[a] = null, d._batchEnabled !== u && (h.count >= t && (s.boundArray(h, i, u, t), this.buildDrawCalls(h, n, a), n = a, h = r[++x], ++u), d._batchEnabled = u, d.touched = l, h.elements[h.count++] = d);
    }
    h.count > 0 && (s.boundArray(h, i, u, t), this.buildDrawCalls(h, n, this._bufferSize), ++x, ++u);
    for (let a = 0; a < i.length; a++)
      i[a] = null;
    T._globalBatch = u;
  }
  /**
   * Populating drawcalls for rendering
   * @param texArray
   * @param start
   * @param finish
   */
  buildDrawCalls(e, t, r) {
    const {
      _bufferedElements: s,
      _attributeBuffer: i,
      _indexBuffer: l,
      vertexSize: u
    } = this, x = f._drawCallPool;
    let h = this._dcIndex, n = this._aIndex, a = this._iIndex, d = x[h];
    d.start = this._iIndex, d.texArray = e;
    for (let _ = t; _ < r; ++_) {
      const m = s[_], o = m._texture.baseTexture, p = G[o.alphaMode ? 1 : 0][m.blendMode];
      s[_] = null, t < _ && d.blend !== p && (d.size = a - d.start, t = _, d = x[++h], d.texArray = e, d.start = a), this.packInterleavedGeometry(m, i, l, n, a), n += m.vertexData.length / 2 * u, a += m.indices.length, d.blend = p;
    }
    t < r && (d.size = a - d.start, ++h), this._dcIndex = h, this._aIndex = n, this._iIndex = a;
  }
  /**
   * Bind textures for current rendering
   * @param texArray
   */
  bindAndClearTexArray(e) {
    const t = this.renderer.texture;
    for (let r = 0; r < e.count; r++)
      t.bind(e.elements[r], e.ids[r]), e.elements[r] = null;
    e.count = 0;
  }
  updateGeometry() {
    const {
      _packedGeometries: e,
      _attributeBuffer: t,
      _indexBuffer: r
    } = this;
    f.canUploadSameBuffer ? (e[this._flushId]._buffer.update(t.rawBinaryData), e[this._flushId]._indexBuffer.update(r), this.renderer.geometry.updateBuffers()) : (this._packedGeometryPoolSize <= this._flushId && (this._packedGeometryPoolSize++, e[this._flushId] = new this.geometryClass()), e[this._flushId]._buffer.update(t.rawBinaryData), e[this._flushId]._indexBuffer.update(r), this.renderer.geometry.bind(e[this._flushId]), this.renderer.geometry.updateBuffers(), this._flushId++);
  }
  drawBatches() {
    const e = this._dcIndex, { gl: t, state: r } = this.renderer, s = f._drawCallPool;
    let i = null;
    for (let l = 0; l < e; l++) {
      const { texArray: u, type: x, size: h, start: n, blend: a } = s[l];
      i !== u && (i = u, this.bindAndClearTexArray(u)), this.state.blendMode = a, r.set(this.state), t.drawElements(x, h, t.UNSIGNED_SHORT, n * 2);
    }
  }
  /** Renders the content _now_ and empties the current batch. */
  flush() {
    this._vertexCount !== 0 && (this._attributeBuffer = this.getAttributeBuffer(this._vertexCount), this._indexBuffer = this.getIndexBuffer(this._indexCount), this._aIndex = 0, this._iIndex = 0, this._dcIndex = 0, this.buildTexturesAndDrawCalls(), this.updateGeometry(), this.drawBatches(), this._bufferSize = 0, this._vertexCount = 0, this._indexCount = 0);
  }
  /** Starts a new sprite batch. */
  start() {
    this.renderer.state.set(this.state), this.renderer.texture.ensureSamplerType(this.maxTextures), this.renderer.shader.bind(this._shader), f.canUploadSameBuffer && this.renderer.geometry.bind(this._packedGeometries[this._flushId]);
  }
  /** Stops and flushes the current batch. */
  stop() {
    this.flush();
  }
  /** Destroys this `BatchRenderer`. It cannot be used again. */
  destroy() {
    for (let e = 0; e < this._packedGeometryPoolSize; e++)
      this._packedGeometries[e] && this._packedGeometries[e].destroy();
    this.renderer.off("prerender", this.onPrerender, this), this._aBuffers = null, this._iBuffers = null, this._packedGeometries = null, this._attributeBuffer = null, this._indexBuffer = null, this._shader && (this._shader.destroy(), this._shader = null), super.destroy();
  }
  /**
   * Fetches an attribute buffer from `this._aBuffers` that can hold atleast `size` floats.
   * @param size - minimum capacity required
   * @returns - buffer than can hold atleast `size` floats
   */
  getAttributeBuffer(e) {
    const t = B(Math.ceil(e / 8)), r = b(t), s = t * 8;
    this._aBuffers.length <= r && (this._iBuffers.length = r + 1);
    let i = this._aBuffers[s];
    return i || (this._aBuffers[s] = i = new z(s * this.vertexSize * 4)), i;
  }
  /**
   * Fetches an index buffer from `this._iBuffers` that can
   * have at least `size` capacity.
   * @param size - minimum required capacity
   * @returns - buffer that can fit `size` indices.
   */
  getIndexBuffer(e) {
    const t = B(Math.ceil(e / 12)), r = b(t), s = t * 12;
    this._iBuffers.length <= r && (this._iBuffers.length = r + 1);
    let i = this._iBuffers[r];
    return i || (this._iBuffers[r] = i = new Uint16Array(s)), i;
  }
  /**
   * Takes the four batching parameters of `element`, interleaves
   * and pushes them into the batching attribute/index buffers given.
   *
   * It uses these properties: `vertexData` `uvs`, `textureId` and
   * `indicies`. It also uses the "tint" of the base-texture, if
   * present.
   * @param {PIXI.DisplayObject} element - element being rendered
   * @param attributeBuffer - attribute buffer.
   * @param indexBuffer - index buffer
   * @param aIndex - number of floats already in the attribute buffer
   * @param iIndex - number of indices already in `indexBuffer`
   */
  packInterleavedGeometry(e, t, r, s, i) {
    const {
      uint32View: l,
      float32View: u
    } = t, x = s / this.vertexSize, h = e.uvs, n = e.indices, a = e.vertexData, d = e._texture.baseTexture._batchLocation, _ = Math.min(e.worldAlpha, 1), m = S.shared.setValue(e._tintRGB).toPremultiplied(_, e._texture.baseTexture.alphaMode > 0);
    for (let o = 0; o < a.length; o += 2)
      u[s++] = a[o], u[s++] = a[o + 1], u[s++] = h[o], u[s++] = h[o + 1], l[s++] = m, u[s++] = d;
    for (let o = 0; o < n.length; o++)
      r[i++] = x + n[o];
  }
};
c.defaultBatchSize = 4096, /** @ignore */
c.extension = {
  name: "batch",
  type: y.RendererPlugin
}, /**
* Pool of `BatchDrawCall` objects that `flush` used
* to create "batches" of the objects being rendered.
*
* These are never re-allocated again.
* Shared between all batch renderers because it can be only one "flush" working at the moment.
* @member {PIXI.BatchDrawCall[]}
*/
c._drawCallPool = [], /**
* Pool of `BatchDrawCall` objects that `flush` used
* to create "batches" of the objects being rendered.
*
* These are never re-allocated again.
* Shared between all batch renderers because it can be only one "flush" working at the moment.
* @member {PIXI.BatchTextureArray[]}
*/
c._textureArrayPool = [];
let F = c;
I.add(F);
export {
  F as BatchRenderer
};
//# sourceMappingURL=index48.js.map

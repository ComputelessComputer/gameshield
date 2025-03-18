import "./index23.js";
import { Color as D } from "./index24.js";
import { WRAP_MODES as S, DRAW_MODES as f } from "./index146.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import "./index28.js";
import "./index29.js";
import "./index30.js";
import "./index31.js";
import "./index32.js";
import { Point as I } from "./index33.js";
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
import "./index45.js";
import "./index46.js";
import "./index47.js";
import { BatchDrawCall as T } from "./index169.js";
import { BatchGeometry as L } from "./index170.js";
import "./index48.js";
import "./index49.js";
import "./index50.js";
import { BatchTextureArray as A } from "./index176.js";
import "./index51.js";
import "./index52.js";
import "./index53.js";
import { BaseTexture as C } from "./index54.js";
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
import "./index102.js";
import { Bounds as M } from "./index239.js";
import "./index103.js";
import "./index104.js";
import { GraphicsData as _ } from "./index270.js";
import { DRAW_CALL_POOL as y, FILL_COMMANDS as x, BATCH_POOL as v } from "./index110.js";
import { BatchPart as U } from "./index271.js";
import { buildPoly as G } from "./index261.js";
import { buildLine as B } from "./index272.js";
const g = new I(), E = class P extends L {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super(), this.closePointEps = 1e-4, this.boundsPadding = 0, this.uvsFloat32 = null, this.indicesUint16 = null, this.batchable = !1, this.points = [], this.colors = [], this.uvs = [], this.indices = [], this.textureIds = [], this.graphicsData = [], this.drawCalls = [], this.batchDirty = -1, this.batches = [], this.dirty = 0, this.cacheDirty = -1, this.clearDirty = 0, this.shapeIndex = 0, this._bounds = new M(), this.boundsDirty = -1;
  }
  /**
   * Get the current bounds of the graphic geometry.
   *
   * Since 6.5.0, bounds of the graphics geometry are calculated based on the vertices of generated geometry.
   * Since shapes or strokes with full transparency (`alpha: 0`) will not generate geometry, they are not considered
   * when calculating bounds for the graphics geometry. See PR [#8343]{@link https://github.com/pixijs/pixijs/pull/8343}
   * and issue [#8623]{@link https://github.com/pixijs/pixijs/pull/8623}.
   * @readonly
   */
  get bounds() {
    return this.updateBatches(), this.boundsDirty !== this.dirty && (this.boundsDirty = this.dirty, this.calculateBounds()), this._bounds;
  }
  /** Call if you changed graphicsData manually. Empties all batch buffers. */
  invalidate() {
    this.boundsDirty = -1, this.dirty++, this.batchDirty++, this.shapeIndex = 0, this.points.length = 0, this.colors.length = 0, this.uvs.length = 0, this.indices.length = 0, this.textureIds.length = 0;
    for (let t = 0; t < this.drawCalls.length; t++)
      this.drawCalls[t].texArray.clear(), y.push(this.drawCalls[t]);
    this.drawCalls.length = 0;
    for (let t = 0; t < this.batches.length; t++) {
      const e = this.batches[t];
      e.reset(), v.push(e);
    }
    this.batches.length = 0;
  }
  /**
   * Clears the graphics that were drawn to this Graphics object, and resets fill and line style settings.
   * @returns - This GraphicsGeometry object. Good for chaining method calls
   */
  clear() {
    return this.graphicsData.length > 0 && (this.invalidate(), this.clearDirty++, this.graphicsData.length = 0), this;
  }
  /**
   * Draws the given shape to this Graphics object. Can be any of Circle, Rectangle, Ellipse, Line or Polygon.
   * @param {PIXI.Circle|PIXI.Ellipse|PIXI.Polygon|PIXI.Rectangle|PIXI.RoundedRectangle} shape - The shape object to draw.
   * @param fillStyle - Defines style of the fill.
   * @param lineStyle - Defines style of the lines.
   * @param matrix - Transform applied to the points of the shape.
   * @returns - Returns geometry for chaining.
   */
  drawShape(t, e = null, s = null, i = null) {
    const r = new _(t, e, s, i);
    return this.graphicsData.push(r), this.dirty++, this;
  }
  /**
   * Draws the given shape to this Graphics object. Can be any of Circle, Rectangle, Ellipse, Line or Polygon.
   * @param {PIXI.Circle|PIXI.Ellipse|PIXI.Polygon|PIXI.Rectangle|PIXI.RoundedRectangle} shape - The shape object to draw.
   * @param matrix - Transform applied to the points of the shape.
   * @returns - Returns geometry for chaining.
   */
  drawHole(t, e = null) {
    if (!this.graphicsData.length)
      return null;
    const s = new _(t, null, null, e), i = this.graphicsData[this.graphicsData.length - 1];
    return s.lineStyle = i.lineStyle, i.holes.push(s), this.dirty++, this;
  }
  /** Destroys the GraphicsGeometry object. */
  destroy() {
    super.destroy();
    for (let t = 0; t < this.graphicsData.length; ++t)
      this.graphicsData[t].destroy();
    this.points.length = 0, this.points = null, this.colors.length = 0, this.colors = null, this.uvs.length = 0, this.uvs = null, this.indices.length = 0, this.indices = null, this.indexBuffer.destroy(), this.indexBuffer = null, this.graphicsData.length = 0, this.graphicsData = null, this.drawCalls.length = 0, this.drawCalls = null, this.batches.length = 0, this.batches = null, this._bounds = null;
  }
  /**
   * Check to see if a point is contained within this geometry.
   * @param point - Point to check if it's contained.
   * @returns {boolean} `true` if the point is contained within geometry.
   */
  containsPoint(t) {
    const e = this.graphicsData;
    for (let s = 0; s < e.length; ++s) {
      const i = e[s];
      if (i.fillStyle.visible && i.shape && (i.matrix ? i.matrix.applyInverse(t, g) : g.copyFrom(t), i.shape.contains(g.x, g.y))) {
        let r = !1;
        if (i.holes) {
          for (let h = 0; h < i.holes.length; h++)
            if (i.holes[h].shape.contains(g.x, g.y)) {
              r = !0;
              break;
            }
        }
        if (!r)
          return !0;
      }
    }
    return !1;
  }
  /**
   * Generates intermediate batch data. Either gets converted to drawCalls
   * or used to convert to batch objects directly by the Graphics object.
   */
  updateBatches() {
    if (!this.graphicsData.length) {
      this.batchable = !0;
      return;
    }
    if (!this.validateBatching())
      return;
    this.cacheDirty = this.dirty;
    const t = this.uvs, e = this.graphicsData;
    let s = null, i = null;
    this.batches.length > 0 && (s = this.batches[this.batches.length - 1], i = s.style);
    for (let l = this.shapeIndex; l < e.length; l++) {
      this.shapeIndex++;
      const a = e[l], m = a.fillStyle, c = a.lineStyle;
      x[a.type].build(a), a.matrix && this.transformPoints(a.points, a.matrix), (m.visible || c.visible) && this.processHoles(a.holes);
      for (let o = 0; o < 2; o++) {
        const d = o === 0 ? m : c;
        if (!d.visible)
          continue;
        const u = d.texture.baseTexture, n = this.indices.length, b = this.points.length / 2;
        u.wrapMode = S.REPEAT, o === 0 ? this.processFill(a) : this.processLine(a);
        const w = this.points.length / 2 - b;
        w !== 0 && (s && !this._compareStyles(i, d) && (s.end(n, b), s = null), s || (s = v.pop() || new U(), s.begin(d, n, b), this.batches.push(s), i = d), this.addUvs(this.points, t, d.texture, b, w, d.matrix));
      }
    }
    const r = this.indices.length, h = this.points.length / 2;
    if (s && s.end(r, h), this.batches.length === 0) {
      this.batchable = !0;
      return;
    }
    const p = h > 65535;
    this.indicesUint16 && this.indices.length === this.indicesUint16.length && p === this.indicesUint16.BYTES_PER_ELEMENT > 2 ? this.indicesUint16.set(this.indices) : this.indicesUint16 = p ? new Uint32Array(this.indices) : new Uint16Array(this.indices), this.batchable = this.isBatchable(), this.batchable ? this.packBatches() : this.buildDrawCalls();
  }
  /**
   * Affinity check
   * @param styleA
   * @param styleB
   */
  _compareStyles(t, e) {
    return !(!t || !e || t.texture.baseTexture !== e.texture.baseTexture || t.color + t.alpha !== e.color + e.alpha || !!t.native != !!e.native);
  }
  /** Test geometry for batching process. */
  validateBatching() {
    if (this.dirty === this.cacheDirty || !this.graphicsData.length)
      return !1;
    for (let t = 0, e = this.graphicsData.length; t < e; t++) {
      const s = this.graphicsData[t], i = s.fillStyle, r = s.lineStyle;
      if (i && !i.texture.baseTexture.valid || r && !r.texture.baseTexture.valid)
        return !1;
    }
    return !0;
  }
  /** Offset the indices so that it works with the batcher. */
  packBatches() {
    this.batchDirty++, this.uvsFloat32 = new Float32Array(this.uvs);
    const t = this.batches;
    for (let e = 0, s = t.length; e < s; e++) {
      const i = t[e];
      for (let r = 0; r < i.size; r++) {
        const h = i.start + r;
        this.indicesUint16[h] = this.indicesUint16[h] - i.attribStart;
      }
    }
  }
  /**
   * Checks to see if this graphics geometry can be batched.
   * Currently it needs to be small enough and not contain any native lines.
   */
  isBatchable() {
    if (this.points.length > 65535 * 2)
      return !1;
    const t = this.batches;
    for (let e = 0; e < t.length; e++)
      if (t[e].style.native)
        return !1;
    return this.points.length < P.BATCHABLE_SIZE * 2;
  }
  /** Converts intermediate batches data to drawCalls. */
  buildDrawCalls() {
    let t = ++C._globalBatch;
    for (let c = 0; c < this.drawCalls.length; c++)
      this.drawCalls[c].texArray.clear(), y.push(this.drawCalls[c]);
    this.drawCalls.length = 0;
    const e = this.colors, s = this.textureIds;
    let i = y.pop();
    i || (i = new T(), i.texArray = new A()), i.texArray.count = 0, i.start = 0, i.size = 0, i.type = f.TRIANGLES;
    let r = 0, h = null, p = 0, l = !1, a = f.TRIANGLES, m = 0;
    this.drawCalls.push(i);
    for (let c = 0; c < this.batches.length; c++) {
      const o = this.batches[c], d = 8, u = o.style, n = u.texture.baseTexture;
      l !== !!u.native && (l = !!u.native, a = l ? f.LINES : f.TRIANGLES, h = null, r = d, t++), h !== n && (h = n, n._batchEnabled !== t && (r === d && (t++, r = 0, i.size > 0 && (i = y.pop(), i || (i = new T(), i.texArray = new A()), this.drawCalls.push(i)), i.start = m, i.size = 0, i.texArray.count = 0, i.type = a), n.touched = 1, n._batchEnabled = t, n._batchLocation = r, n.wrapMode = S.REPEAT, i.texArray.elements[i.texArray.count++] = n, r++)), i.size += o.size, m += o.size, p = n._batchLocation, this.addColors(e, u.color, u.alpha, o.attribSize, o.attribStart), this.addTextureIds(s, p, o.attribSize, o.attribStart);
    }
    C._globalBatch = t, this.packAttributes();
  }
  /** Packs attributes to single buffer. */
  packAttributes() {
    const t = this.points, e = this.uvs, s = this.colors, i = this.textureIds, r = new ArrayBuffer(t.length * 3 * 4), h = new Float32Array(r), p = new Uint32Array(r);
    let l = 0;
    for (let a = 0; a < t.length / 2; a++)
      h[l++] = t[a * 2], h[l++] = t[a * 2 + 1], h[l++] = e[a * 2], h[l++] = e[a * 2 + 1], p[l++] = s[a], h[l++] = i[a];
    this._buffer.update(r), this._indexBuffer.update(this.indicesUint16);
  }
  /**
   * Process fill part of Graphics.
   * @param data
   */
  processFill(t) {
    t.holes.length ? G.triangulate(t, this) : x[t.type].triangulate(t, this);
  }
  /**
   * Process line part of Graphics.
   * @param data
   */
  processLine(t) {
    B(t, this);
    for (let e = 0; e < t.holes.length; e++)
      B(t.holes[e], this);
  }
  /**
   * Process the holes data.
   * @param holes
   */
  processHoles(t) {
    for (let e = 0; e < t.length; e++) {
      const s = t[e];
      x[s.type].build(s), s.matrix && this.transformPoints(s.points, s.matrix);
    }
  }
  /** Update the local bounds of the object. Expensive to use performance-wise. */
  calculateBounds() {
    const t = this._bounds;
    t.clear(), t.addVertexData(this.points, 0, this.points.length), t.pad(this.boundsPadding, this.boundsPadding);
  }
  /**
   * Transform points using matrix.
   * @param points - Points to transform
   * @param matrix - Transform matrix
   */
  transformPoints(t, e) {
    for (let s = 0; s < t.length / 2; s++) {
      const i = t[s * 2], r = t[s * 2 + 1];
      t[s * 2] = e.a * i + e.c * r + e.tx, t[s * 2 + 1] = e.b * i + e.d * r + e.ty;
    }
  }
  /**
   * Add colors.
   * @param colors - List of colors to add to
   * @param color - Color to add
   * @param alpha - Alpha to use
   * @param size - Number of colors to add
   * @param offset
   */
  addColors(t, e, s, i, r = 0) {
    const h = D.shared.setValue(e).toLittleEndianNumber(), p = D.shared.setValue(h).toPremultiplied(s);
    t.length = Math.max(t.length, r + i);
    for (let l = 0; l < i; l++)
      t[r + l] = p;
  }
  /**
   * Add texture id that the shader/fragment wants to use.
   * @param textureIds
   * @param id
   * @param size
   * @param offset
   */
  addTextureIds(t, e, s, i = 0) {
    t.length = Math.max(t.length, i + s);
    for (let r = 0; r < s; r++)
      t[i + r] = e;
  }
  /**
   * Generates the UVs for a shape.
   * @param verts - Vertices
   * @param uvs - UVs
   * @param texture - Reference to Texture
   * @param start - Index buffer start index.
   * @param size - The size/length for index buffer.
   * @param matrix - Optional transform for all points.
   */
  addUvs(t, e, s, i, r, h = null) {
    let p = 0;
    const l = e.length, a = s.frame;
    for (; p < r; ) {
      let c = t[(i + p) * 2], o = t[(i + p) * 2 + 1];
      if (h) {
        const d = h.a * c + h.c * o + h.tx;
        o = h.b * c + h.d * o + h.ty, c = d;
      }
      p++, e.push(c / a.width, o / a.height);
    }
    const m = s.baseTexture;
    (a.width < m.width || a.height < m.height) && this.adjustUvs(e, s, l, r);
  }
  /**
   * Modify uvs array according to position of texture region
   * Does not work with rotated or trimmed textures
   * @param uvs - array
   * @param texture - region
   * @param start - starting index for uvs
   * @param size - how many points to adjust
   */
  adjustUvs(t, e, s, i) {
    const r = e.baseTexture, h = 1e-6, p = s + i * 2, l = e.frame, a = l.width / r.width, m = l.height / r.height;
    let c = l.x / l.width, o = l.y / l.height, d = Math.floor(t[s] + h), u = Math.floor(t[s + 1] + h);
    for (let n = s + 2; n < p; n += 2)
      d = Math.min(d, Math.floor(t[n] + h)), u = Math.min(u, Math.floor(t[n + 1] + h));
    c -= d, o -= u;
    for (let n = s; n < p; n += 2)
      t[n] = (t[n] + c) * a, t[n + 1] = (t[n + 1] + o) * m;
  }
};
E.BATCHABLE_SIZE = 100;
let ti = E;
export {
  ti as GraphicsGeometry
};
//# sourceMappingURL=index112.js.map

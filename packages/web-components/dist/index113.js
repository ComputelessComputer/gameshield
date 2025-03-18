import "./index23.js";
import "./index24.js";
import { DRAW_MODES as g } from "./index146.js";
import "./index25.js";
import "./index26.js";
import { Polygon as v } from "./index27.js";
import "./index28.js";
import "./index29.js";
import "./index30.js";
import "./index31.js";
import "./index32.js";
import { Point as D } from "./index33.js";
import "./index34.js";
import "./index35.js";
import { settings as f } from "./index145.js";
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
import { State as b } from "./index72.js";
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
import { Container as M } from "./index103.js";
import "./index104.js";
import { MeshBatchUvs as w } from "./index253.js";
const p = new D(), x = new v(), y = class _ extends M {
  /**
   * @param geometry - The geometry the mesh will use.
   * @param {PIXI.MeshMaterial} shader - The shader the mesh will use.
   * @param state - The state that the WebGL context is required to be in to render the mesh
   *        if no state is provided, uses {@link PIXI.State.for2d} to create a 2D state for PixiJS.
   * @param drawMode - The drawMode, can be any of the {@link PIXI.DRAW_MODES} constants.
   */
  constructor(t, e, r, i = g.TRIANGLES) {
    super(), this.geometry = t, this.shader = e, this.state = r || b.for2d(), this.drawMode = i, this.start = 0, this.size = 0, this.uvs = null, this.indices = null, this.vertexData = new Float32Array(1), this.vertexDirty = -1, this._transformID = -1, this._roundPixels = f.ROUND_PIXELS, this.batchUvs = null;
  }
  /**
   * Includes vertex positions, face indices, normals, colors, UVs, and
   * custom attributes within buffers, reducing the cost of passing all
   * this data to the GPU. Can be shared between multiple Mesh objects.
   */
  get geometry() {
    return this._geometry;
  }
  set geometry(t) {
    this._geometry !== t && (this._geometry && (this._geometry.refCount--, this._geometry.refCount === 0 && this._geometry.dispose()), this._geometry = t, this._geometry && this._geometry.refCount++, this.vertexDirty = -1);
  }
  /**
   * To change mesh uv's, change its uvBuffer data and increment its _updateID.
   * @readonly
   */
  get uvBuffer() {
    return this.geometry.buffers[1];
  }
  /**
   * To change mesh vertices, change its uvBuffer data and increment its _updateID.
   * Incrementing _updateID is optional because most of Mesh objects do it anyway.
   * @readonly
   */
  get verticesBuffer() {
    return this.geometry.buffers[0];
  }
  /** Alias for {@link PIXI.Mesh#shader}. */
  set material(t) {
    this.shader = t;
  }
  get material() {
    return this.shader;
  }
  /**
   * The blend mode to be applied to the Mesh. Apply a value of
   * `PIXI.BLEND_MODES.NORMAL` to reset the blend mode.
   * @default PIXI.BLEND_MODES.NORMAL;
   */
  set blendMode(t) {
    this.state.blendMode = t;
  }
  get blendMode() {
    return this.state.blendMode;
  }
  /**
   * If true PixiJS will Math.floor() x/y values when rendering, stopping pixel interpolation.
   * Advantages can include sharper image quality (like text) and faster rendering on canvas.
   * The main disadvantage is movement of objects may appear less smooth.
   * To set the global default, change {@link PIXI.settings.ROUND_PIXELS}
   * @default false
   */
  set roundPixels(t) {
    this._roundPixels !== t && (this._transformID = -1), this._roundPixels = t;
  }
  get roundPixels() {
    return this._roundPixels;
  }
  /**
   * The multiply tint applied to the Mesh. This is a hex value. A value of
   * `0xFFFFFF` will remove any tint effect.
   *
   * Null for non-MeshMaterial shaders
   * @default 0xFFFFFF
   */
  get tint() {
    return "tint" in this.shader ? this.shader.tint : null;
  }
  set tint(t) {
    this.shader.tint = t;
  }
  /**
   * The tint color as a RGB integer
   * @ignore
   */
  get tintValue() {
    return this.shader.tintValue;
  }
  /** The texture that the Mesh uses. Null for non-MeshMaterial shaders */
  get texture() {
    return "texture" in this.shader ? this.shader.texture : null;
  }
  set texture(t) {
    this.shader.texture = t;
  }
  /**
   * Standard renderer draw.
   * @param renderer - Instance to renderer.
   */
  _render(t) {
    const e = this.geometry.buffers[0].data;
    this.shader.batchable && this.drawMode === g.TRIANGLES && e.length < _.BATCHABLE_SIZE * 2 ? this._renderToBatch(t) : this._renderDefault(t);
  }
  /**
   * Standard non-batching way of rendering.
   * @param renderer - Instance to renderer.
   */
  _renderDefault(t) {
    const e = this.shader;
    e.alpha = this.worldAlpha, e.update && e.update(), t.batch.flush(), e.uniforms.translationMatrix = this.transform.worldTransform.toArray(!0), t.shader.bind(e), t.state.set(this.state), t.geometry.bind(this.geometry, e), t.geometry.draw(this.drawMode, this.size, this.start, this.geometry.instanceCount);
  }
  /**
   * Rendering by using the Batch system.
   * @param renderer - Instance to renderer.
   */
  _renderToBatch(t) {
    const e = this.geometry, r = this.shader;
    r.uvMatrix && (r.uvMatrix.update(), this.calculateUvs()), this.calculateVertices(), this.indices = e.indexBuffer.data, this._tintRGB = r._tintRGB, this._texture = r.texture;
    const i = this.material.pluginName;
    t.batch.setObjectRenderer(t.plugins[i]), t.plugins[i].render(this);
  }
  /** Updates vertexData field based on transform and vertices. */
  calculateVertices() {
    const t = this.geometry.buffers[0], e = t.data, r = t._updateID;
    if (r === this.vertexDirty && this._transformID === this.transform._worldID)
      return;
    this._transformID = this.transform._worldID, this.vertexData.length !== e.length && (this.vertexData = new Float32Array(e.length));
    const i = this.transform.worldTransform, d = i.a, l = i.b, o = i.c, n = i.d, m = i.tx, u = i.ty, a = this.vertexData;
    for (let s = 0; s < a.length / 2; s++) {
      const h = e[s * 2], c = e[s * 2 + 1];
      a[s * 2] = d * h + o * c + m, a[s * 2 + 1] = l * h + n * c + u;
    }
    if (this._roundPixels) {
      const s = f.RESOLUTION;
      for (let h = 0; h < a.length; ++h)
        a[h] = Math.round(a[h] * s) / s;
    }
    this.vertexDirty = r;
  }
  /** Updates uv field based on from geometry uv's or batchUvs. */
  calculateUvs() {
    const t = this.geometry.buffers[1], e = this.shader;
    e.uvMatrix.isSimple ? this.uvs = t.data : (this.batchUvs || (this.batchUvs = new w(t, e.uvMatrix)), this.batchUvs.update(), this.uvs = this.batchUvs.data);
  }
  /**
   * Updates the bounds of the mesh as a rectangle. The bounds calculation takes the worldTransform into account.
   * there must be a aVertexPosition attribute present in the geometry for bounds to be calculated correctly.
   */
  _calculateBounds() {
    this.calculateVertices(), this._bounds.addVertexData(this.vertexData, 0, this.vertexData.length);
  }
  /**
   * Tests if a point is inside this mesh. Works only for PIXI.DRAW_MODES.TRIANGLES.
   * @param point - The point to test.
   * @returns - The result of the test.
   */
  containsPoint(t) {
    if (!this.getBounds().contains(t.x, t.y))
      return !1;
    this.worldTransform.applyInverse(t, p);
    const e = this.geometry.getBuffer("aVertexPosition").data, r = x.points, i = this.geometry.getIndex().data, d = i.length, l = this.drawMode === 4 ? 3 : 1;
    for (let o = 0; o + 2 < d; o += l) {
      const n = i[o] * 2, m = i[o + 1] * 2, u = i[o + 2] * 2;
      if (r[0] = e[n], r[1] = e[n + 1], r[2] = e[m], r[3] = e[m + 1], r[4] = e[u], r[5] = e[u + 1], x.contains(p.x, p.y))
        return !0;
    }
    return !1;
  }
  destroy(t) {
    super.destroy(t), this._cachedTexture && (this._cachedTexture.destroy(), this._cachedTexture = null), this.geometry = null, this.shader = null, this.state = null, this.uvs = null, this.indices = null, this.vertexData = null;
  }
};
y.BATCHABLE_SIZE = 100;
let Lt = y;
export {
  Lt as Mesh
};
//# sourceMappingURL=index113.js.map

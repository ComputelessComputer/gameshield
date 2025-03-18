import "./index23.js";
import { Color as y } from "./index24.js";
import { BLEND_MODES as b } from "./index164.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import { Rectangle as B } from "./index28.js";
import "./index29.js";
import "./index30.js";
import "./index31.js";
import { ObservablePoint as P } from "./index32.js";
import { Point as R } from "./index33.js";
import "./index34.js";
import "./index35.js";
import { settings as T } from "./index153.js";
import "./index36.js";
import "./index37.js";
import "./index38.js";
import "./index39.js";
import "./index40.js";
import "./index41.js";
import "./index42.js";
import "./index43.js";
import "./index44.js";
import { sign as w } from "./index278.js";
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
import { Texture as D } from "./index131.js";
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
import "./index67.js";
import "./index79.js";
import "./index80.js";
import "./index81.js";
import "./index102.js";
import { Bounds as v } from "./index239.js";
import { Container as U } from "./index103.js";
import "./index104.js";
const g = new R(), N = new Uint16Array([0, 1, 2, 0, 2, 3]);
class I extends U {
  /** @param texture - The texture for this sprite. */
  constructor(t) {
    super(), this._anchor = new P(
      this._onAnchorUpdate,
      this,
      t ? t.defaultAnchor.x : 0,
      t ? t.defaultAnchor.y : 0
    ), this._texture = null, this._width = 0, this._height = 0, this._tintColor = new y(16777215), this._tintRGB = null, this.tint = 16777215, this.blendMode = b.NORMAL, this._cachedTint = 16777215, this.uvs = null, this.texture = t || D.EMPTY, this.vertexData = new Float32Array(8), this.vertexTrimmedData = null, this._transformID = -1, this._textureID = -1, this._transformTrimmedID = -1, this._textureTrimmedID = -1, this.indices = N, this.pluginName = "batch", this.isSprite = !0, this._roundPixels = T.ROUND_PIXELS;
  }
  /** When the texture is updated, this event will fire to update the scale and frame. */
  _onTextureUpdate() {
    this._textureID = -1, this._textureTrimmedID = -1, this._cachedTint = 16777215, this._width && (this.scale.x = w(this.scale.x) * this._width / this._texture.orig.width), this._height && (this.scale.y = w(this.scale.y) * this._height / this._texture.orig.height);
  }
  /** Called when the anchor position updates. */
  _onAnchorUpdate() {
    this._transformID = -1, this._transformTrimmedID = -1;
  }
  /** Calculates worldTransform * vertices, store it in vertexData. */
  calculateVertices() {
    const t = this._texture;
    if (this._transformID === this.transform._worldID && this._textureID === t._updateID)
      return;
    this._textureID !== t._updateID && (this.uvs = this._texture._uvs.uvsFloat32), this._transformID = this.transform._worldID, this._textureID = t._updateID;
    const i = this.transform.worldTransform, h = i.a, _ = i.b, e = i.c, l = i.d, c = i.tx, x = i.ty, r = this.vertexData, u = t.trim, o = t.orig, d = this._anchor;
    let n = 0, s = 0, a = 0, m = 0;
    if (u ? (s = u.x - d._x * o.width, n = s + u.width, m = u.y - d._y * o.height, a = m + u.height) : (s = -d._x * o.width, n = s + o.width, m = -d._y * o.height, a = m + o.height), r[0] = h * s + e * m + c, r[1] = l * m + _ * s + x, r[2] = h * n + e * m + c, r[3] = l * m + _ * n + x, r[4] = h * n + e * a + c, r[5] = l * a + _ * n + x, r[6] = h * s + e * a + c, r[7] = l * a + _ * s + x, this._roundPixels) {
      const p = T.RESOLUTION;
      for (let f = 0; f < r.length; ++f)
        r[f] = Math.round(r[f] * p) / p;
    }
  }
  /**
   * Calculates worldTransform * vertices for a non texture with a trim. store it in vertexTrimmedData.
   *
   * This is used to ensure that the true width and height of a trimmed texture is respected.
   */
  calculateTrimmedVertices() {
    if (!this.vertexTrimmedData)
      this.vertexTrimmedData = new Float32Array(8);
    else if (this._transformTrimmedID === this.transform._worldID && this._textureTrimmedID === this._texture._updateID)
      return;
    this._transformTrimmedID = this.transform._worldID, this._textureTrimmedID = this._texture._updateID;
    const t = this._texture, i = this.vertexTrimmedData, h = t.orig, _ = this._anchor, e = this.transform.worldTransform, l = e.a, c = e.b, x = e.c, r = e.d, u = e.tx, o = e.ty, d = -_._x * h.width, n = d + h.width, s = -_._y * h.height, a = s + h.height;
    if (i[0] = l * d + x * s + u, i[1] = r * s + c * d + o, i[2] = l * n + x * s + u, i[3] = r * s + c * n + o, i[4] = l * n + x * a + u, i[5] = r * a + c * n + o, i[6] = l * d + x * a + u, i[7] = r * a + c * d + o, this._roundPixels) {
      const m = T.RESOLUTION;
      for (let p = 0; p < i.length; ++p)
        i[p] = Math.round(i[p] * m) / m;
    }
  }
  /**
   *
   * Renders the object using the WebGL renderer
   * @param renderer - The webgl renderer to use.
   */
  _render(t) {
    this.calculateVertices(), t.batch.setObjectRenderer(t.plugins[this.pluginName]), t.plugins[this.pluginName].render(this);
  }
  /** Updates the bounds of the sprite. */
  _calculateBounds() {
    const t = this._texture.trim, i = this._texture.orig;
    !t || t.width === i.width && t.height === i.height ? (this.calculateVertices(), this._bounds.addQuad(this.vertexData)) : (this.calculateTrimmedVertices(), this._bounds.addQuad(this.vertexTrimmedData));
  }
  /**
   * Gets the local bounds of the sprite object.
   * @param rect - Optional output rectangle.
   * @returns The bounds.
   */
  getLocalBounds(t) {
    return this.children.length === 0 ? (this._localBounds || (this._localBounds = new v()), this._localBounds.minX = this._texture.orig.width * -this._anchor._x, this._localBounds.minY = this._texture.orig.height * -this._anchor._y, this._localBounds.maxX = this._texture.orig.width * (1 - this._anchor._x), this._localBounds.maxY = this._texture.orig.height * (1 - this._anchor._y), t || (this._localBoundsRect || (this._localBoundsRect = new B()), t = this._localBoundsRect), this._localBounds.getRectangle(t)) : super.getLocalBounds.call(this, t);
  }
  /**
   * Tests if a point is inside this sprite
   * @param point - the point to test
   * @returns The result of the test
   */
  containsPoint(t) {
    this.worldTransform.applyInverse(t, g);
    const i = this._texture.orig.width, h = this._texture.orig.height, _ = -i * this.anchor.x;
    let e = 0;
    return g.x >= _ && g.x < _ + i && (e = -h * this.anchor.y, g.y >= e && g.y < e + h);
  }
  /**
   * Destroys this sprite and optionally its texture and children.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param [options.children=false] - if set to true, all the children will have their destroy
   *      method called as well. 'options' will be passed on to those calls.
   * @param [options.texture=false] - Should it destroy the current texture of the sprite as well
   * @param [options.baseTexture=false] - Should it destroy the base texture of the sprite as well
   */
  destroy(t) {
    if (super.destroy(t), this._texture.off("update", this._onTextureUpdate, this), this._anchor = null, typeof t == "boolean" ? t : t == null ? void 0 : t.texture) {
      const i = typeof t == "boolean" ? t : t == null ? void 0 : t.baseTexture;
      this._texture.destroy(!!i);
    }
    this._texture = null;
  }
  // some helper functions..
  /**
   * Helper function that creates a new sprite based on the source you provide.
   * The source can be - frame id, image url, video url, canvas element, video element, base texture
   * @param {string|PIXI.Texture|HTMLImageElement|HTMLVideoElement|ImageBitmap|PIXI.ICanvas} source
   *     - Source to create texture from
   * @param {object} [options] - See {@link PIXI.BaseTexture}'s constructor for options.
   * @returns The newly created sprite
   */
  static from(t, i) {
    const h = t instanceof D ? t : D.from(t, i);
    return new I(h);
  }
  /**
   * If true PixiJS will Math.floor() x/y values when rendering, stopping pixel interpolation.
   *
   * Advantages can include sharper image quality (like text) and faster rendering on canvas.
   * The main disadvantage is movement of objects may appear less smooth.
   *
   * To set the global default, change {@link PIXI.settings.ROUND_PIXELS}.
   * @default false
   */
  set roundPixels(t) {
    this._roundPixels !== t && (this._transformID = -1, this._transformTrimmedID = -1), this._roundPixels = t;
  }
  get roundPixels() {
    return this._roundPixels;
  }
  /** The width of the sprite, setting this will actually modify the scale to achieve the value set. */
  get width() {
    return Math.abs(this.scale.x) * this._texture.orig.width;
  }
  set width(t) {
    const i = w(this.scale.x) || 1;
    this.scale.x = i * t / this._texture.orig.width, this._width = t;
  }
  /** The height of the sprite, setting this will actually modify the scale to achieve the value set. */
  get height() {
    return Math.abs(this.scale.y) * this._texture.orig.height;
  }
  set height(t) {
    const i = w(this.scale.y) || 1;
    this.scale.y = i * t / this._texture.orig.height, this._height = t;
  }
  /**
   * The anchor sets the origin point of the sprite. The default value is taken from the {@link PIXI.Texture|Texture}
   * and passed to the constructor.
   *
   * The default is `(0,0)`, this means the sprite's origin is the top left.
   *
   * Setting the anchor to `(0.5,0.5)` means the sprite's origin is centered.
   *
   * Setting the anchor to `(1,1)` would mean the sprite's origin point will be the bottom right corner.
   *
   * If you pass only single parameter, it will set both x and y to the same value as shown in the example below.
   * @example
   * import { Sprite } from 'pixi.js';
   *
   * const sprite = new Sprite(Texture.WHITE);
   * sprite.anchor.set(0.5); // This will set the origin to center. (0.5) is same as (0.5, 0.5).
   */
  get anchor() {
    return this._anchor;
  }
  set anchor(t) {
    this._anchor.copyFrom(t);
  }
  /**
   * The tint applied to the sprite. This is a hex value.
   *
   * A value of 0xFFFFFF will remove any tint effect.
   * @default 0xFFFFFF
   */
  get tint() {
    return this._tintColor.value;
  }
  set tint(t) {
    this._tintColor.setValue(t), this._tintRGB = this._tintColor.toLittleEndianNumber();
  }
  /**
   * Get the tint as a RGB integer.
   * @ignore
   */
  get tintValue() {
    return this._tintColor.toNumber();
  }
  /** The texture that the sprite is using. */
  get texture() {
    return this._texture;
  }
  set texture(t) {
    this._texture !== t && (this._texture && this._texture.off("update", this._onTextureUpdate, this), this._texture = t || D.EMPTY, this._cachedTint = 16777215, this._textureID = -1, this._textureTrimmedID = -1, t && (t.baseTexture.valid ? this._onTextureUpdate() : t.once("update", this._onTextureUpdate, this)));
  }
}
export {
  I as Sprite
};
//# sourceMappingURL=index132.js.map

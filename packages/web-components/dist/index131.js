import "./index25.js";
import "./index26.js";
import "./index27.js";
import { Rectangle as g } from "./index28.js";
import "./index29.js";
import "./index30.js";
import "./index31.js";
import "./index32.js";
import { Point as f } from "./index33.js";
import "./index34.js";
import { settings as u } from "./index150.js";
import "./index36.js";
import "./index40.js";
import x from "./index41.js";
import "./index42.js";
import "./index43.js";
import "./index24.js";
import "./index44.js";
import { uid as p } from "./index129.js";
import "./index45.js";
import { TextureCache as n } from "./index217.js";
import { getResolutionOfUrl as T } from "./index154.js";
import { BaseTexture as d } from "./index54.js";
import { ImageResource as b } from "./index242.js";
import { TextureUvs as I } from "./index67.js";
const v = new I();
function l(c) {
  c.destroy = function() {
  }, c.on = function() {
  }, c.once = function() {
  }, c.emit = function() {
  };
}
class i extends x {
  /**
   * @param baseTexture - The base texture source to create the texture from
   * @param frame - The rectangle frame of the texture to show
   * @param orig - The area of original texture
   * @param trim - Trimmed rectangle of original texture
   * @param rotate - indicates how the texture was rotated by texture packer. See {@link PIXI.groupD8}
   * @param anchor - Default anchor point used for sprite placement / rotation
   * @param borders - Default borders used for 9-slice scaling. See {@link PIXI.NineSlicePlane}
   */
  constructor(e, t, s, a, r, h, o) {
    if (super(), this.noFrame = !1, t || (this.noFrame = !0, t = new g(0, 0, 1, 1)), e instanceof i && (e = e.baseTexture), this.baseTexture = e, this._frame = t, this.trim = a, this.valid = !1, this.destroyed = !1, this._uvs = v, this.uvMatrix = null, this.orig = s || t, this._rotate = Number(r || 0), r === !0)
      this._rotate = 2;
    else if (this._rotate % 2 !== 0)
      throw new Error("attempt to use diamond-shaped UVs. If you are sure, set rotation manually");
    this.defaultAnchor = h ? new f(h.x, h.y) : new f(0, 0), this.defaultBorders = o, this._updateID = 0, this.textureCacheIds = [], e.valid ? this.noFrame ? e.valid && this.onBaseTextureUpdated(e) : this.frame = t : e.once("loaded", this.onBaseTextureUpdated, this), this.noFrame && e.on("update", this.onBaseTextureUpdated, this);
  }
  /**
   * Updates this texture on the gpu.
   *
   * Calls the TextureResource update.
   *
   * If you adjusted `frame` manually, please call `updateUvs()` instead.
   */
  update() {
    this.baseTexture.resource && this.baseTexture.resource.update();
  }
  /**
   * Called when the base texture is updated
   * @protected
   * @param baseTexture - The base texture.
   */
  onBaseTextureUpdated(e) {
    if (this.noFrame) {
      if (!this.baseTexture.valid)
        return;
      this._frame.width = e.width, this._frame.height = e.height, this.valid = !0, this.updateUvs();
    } else
      this.frame = this._frame;
    this.emit("update", this);
  }
  /**
   * Destroys this texture
   * @param [destroyBase=false] - Whether to destroy the base texture as well
   * @fires PIXI.Texture#destroyed
   */
  destroy(e) {
    if (this.baseTexture) {
      if (e) {
        const { resource: t } = this.baseTexture;
        t != null && t.url && n[t.url] && i.removeFromCache(t.url), this.baseTexture.destroy();
      }
      this.baseTexture.off("loaded", this.onBaseTextureUpdated, this), this.baseTexture.off("update", this.onBaseTextureUpdated, this), this.baseTexture = null;
    }
    this._frame = null, this._uvs = null, this.trim = null, this.orig = null, this.valid = !1, i.removeFromCache(this), this.textureCacheIds = null, this.destroyed = !0, this.emit("destroyed", this), this.removeAllListeners();
  }
  /**
   * Creates a new texture object that acts the same as this one.
   * @returns - The new texture
   */
  clone() {
    var a;
    const e = this._frame.clone(), t = this._frame === this.orig ? e : this.orig.clone(), s = new i(
      this.baseTexture,
      !this.noFrame && e,
      t,
      (a = this.trim) == null ? void 0 : a.clone(),
      this.rotate,
      this.defaultAnchor,
      this.defaultBorders
    );
    return this.noFrame && (s._frame = e), s;
  }
  /**
   * Updates the internal WebGL UV cache. Use it after you change `frame` or `trim` of the texture.
   * Call it after changing the frame
   */
  updateUvs() {
    this._uvs === v && (this._uvs = new I()), this._uvs.set(this._frame, this.baseTexture, this.rotate), this._updateID++;
  }
  /**
   * Helper function that creates a new Texture based on the source you provide.
   * The source can be - frame id, image url, video url, canvas element, video element, base texture
   * @param {string|PIXI.BaseTexture|HTMLImageElement|HTMLVideoElement|ImageBitmap|PIXI.ICanvas} source -
   *        Source or array of sources to create texture from
   * @param options - See {@link PIXI.BaseTexture}'s constructor for options.
   * @param {string} [options.pixiIdPrefix=pixiid] - If a source has no id, this is the prefix of the generated id
   * @param {boolean} [strict] - Enforce strict-mode, see {@link PIXI.settings.STRICT_TEXTURE_CACHE}.
   * @returns {PIXI.Texture} The newly created texture
   */
  static from(e, t = {}, s = u.STRICT_TEXTURE_CACHE) {
    const a = typeof e == "string";
    let r = null;
    if (a)
      r = e;
    else if (e instanceof d) {
      if (!e.cacheId) {
        const o = (t == null ? void 0 : t.pixiIdPrefix) || "pixiid";
        e.cacheId = `${o}-${p()}`, d.addToCache(e, e.cacheId);
      }
      r = e.cacheId;
    } else {
      if (!e._pixiId) {
        const o = (t == null ? void 0 : t.pixiIdPrefix) || "pixiid";
        e._pixiId = `${o}_${p()}`;
      }
      r = e._pixiId;
    }
    let h = n[r];
    if (a && s && !h)
      throw new Error(`The cacheId "${r}" does not exist in TextureCache.`);
    return !h && !(e instanceof d) ? (t.resolution || (t.resolution = T(e)), h = new i(new d(e, t)), h.baseTexture.cacheId = r, d.addToCache(h.baseTexture, r), i.addToCache(h, r)) : !h && e instanceof d && (h = new i(e), i.addToCache(h, r)), h;
  }
  /**
   * Useful for loading textures via URLs. Use instead of `Texture.from` because
   * it does a better job of handling failed URLs more effectively. This also ignores
   * `PIXI.settings.STRICT_TEXTURE_CACHE`. Works for Videos, SVGs, Images.
   * @param url - The remote URL or array of URLs to load.
   * @param options - Optional options to include
   * @returns - A Promise that resolves to a Texture.
   */
  static fromURL(e, t) {
    const s = Object.assign({ autoLoad: !1 }, t == null ? void 0 : t.resourceOptions), a = i.from(e, Object.assign({ resourceOptions: s }, t), !1), r = a.baseTexture.resource;
    return a.baseTexture.valid ? Promise.resolve(a) : r.load().then(() => Promise.resolve(a));
  }
  /**
   * Create a new Texture with a BufferResource from a typed array.
   * @param buffer - The optional array to use. If no data is provided, a new Float32Array is created.
   * @param width - Width of the resource
   * @param height - Height of the resource
   * @param options - See {@link PIXI.BaseTexture}'s constructor for options.
   *        Default properties are different from the constructor's defaults.
   * @param {PIXI.FORMATS} [options.format] - The format is not given, the type is inferred from the
   *        type of the buffer: `RGBA` if Float32Array, Int8Array, Uint8Array, or Uint8ClampedArray,
   *        otherwise `RGBA_INTEGER`.
   * @param {PIXI.TYPES} [options.type] - The type is not given, the type is inferred from the
   *        type of the buffer. Maps Float32Array to `FLOAT`, Int32Array to `INT`, Uint32Array to
   *        `UNSIGNED_INT`, Int16Array to `SHORT`, Uint16Array to `UNSIGNED_SHORT`, Int8Array to `BYTE`,
   *        Uint8Array/Uint8ClampedArray to `UNSIGNED_BYTE`.
   * @param {PIXI.ALPHA_MODES} [options.alphaMode=PIXI.ALPHA_MODES.NPM]
   * @param {PIXI.SCALE_MODES} [options.scaleMode=PIXI.SCALE_MODES.NEAREST]
   * @returns - The resulting new BaseTexture
   */
  static fromBuffer(e, t, s, a) {
    return new i(d.fromBuffer(e, t, s, a));
  }
  /**
   * Create a texture from a source and add to the cache.
   * @param {HTMLImageElement|HTMLVideoElement|ImageBitmap|PIXI.ICanvas|string} source - The input source.
   * @param imageUrl - File name of texture, for cache and resolving resolution.
   * @param name - Human readable name for the texture cache. If no name is
   *        specified, only `imageUrl` will be used as the cache ID.
   * @param options
   * @returns - Output texture
   */
  static fromLoader(e, t, s, a) {
    const r = new d(e, Object.assign({
      scaleMode: d.defaultOptions.scaleMode,
      resolution: T(t)
    }, a)), { resource: h } = r;
    h instanceof b && (h.url = t);
    const o = new i(r);
    return s || (s = t), d.addToCache(o.baseTexture, s), i.addToCache(o, s), s !== t && (d.addToCache(o.baseTexture, t), i.addToCache(o, t)), o.baseTexture.valid ? Promise.resolve(o) : new Promise((m) => {
      o.baseTexture.once("loaded", () => m(o));
    });
  }
  /**
   * Adds a Texture to the global TextureCache. This cache is shared across the whole PIXI object.
   * @param texture - The Texture to add to the cache.
   * @param id - The id that the Texture will be stored against.
   */
  static addToCache(e, t) {
    t && (e.textureCacheIds.includes(t) || e.textureCacheIds.push(t), n[t] && n[t] !== e && console.warn(`Texture added to the cache with an id [${t}] that already had an entry`), n[t] = e);
  }
  /**
   * Remove a Texture from the global TextureCache.
   * @param texture - id of a Texture to be removed, or a Texture instance itself
   * @returns - The Texture that was removed
   */
  static removeFromCache(e) {
    if (typeof e == "string") {
      const t = n[e];
      if (t) {
        const s = t.textureCacheIds.indexOf(e);
        return s > -1 && t.textureCacheIds.splice(s, 1), delete n[e], t;
      }
    } else if (e != null && e.textureCacheIds) {
      for (let t = 0; t < e.textureCacheIds.length; ++t)
        n[e.textureCacheIds[t]] === e && delete n[e.textureCacheIds[t]];
      return e.textureCacheIds.length = 0, e;
    }
    return null;
  }
  /**
   * Returns resolution of baseTexture
   * @readonly
   */
  get resolution() {
    return this.baseTexture.resolution;
  }
  /**
   * The frame specifies the region of the base texture that this texture uses.
   * Please call `updateUvs()` after you change coordinates of `frame` manually.
   */
  get frame() {
    return this._frame;
  }
  set frame(e) {
    this._frame = e, this.noFrame = !1;
    const { x: t, y: s, width: a, height: r } = e, h = t + a > this.baseTexture.width, o = s + r > this.baseTexture.height;
    if (h || o) {
      const m = h && o ? "and" : "or", w = `X: ${t} + ${a} = ${t + a} > ${this.baseTexture.width}`, C = `Y: ${s} + ${r} = ${s + r} > ${this.baseTexture.height}`;
      throw new Error(`Texture Error: frame does not fit inside the base Texture dimensions: ${w} ${m} ${C}`);
    }
    this.valid = a && r && this.baseTexture.valid, !this.trim && !this.rotate && (this.orig = e), this.valid && this.updateUvs();
  }
  /**
   * Indicates whether the texture is rotated inside the atlas
   * set to 2 to compensate for texture packer rotation
   * set to 6 to compensate for spine packer rotation
   * can be used to rotate or mirror sprites
   * See {@link PIXI.groupD8} for explanation
   */
  get rotate() {
    return this._rotate;
  }
  set rotate(e) {
    this._rotate = e, this.valid && this.updateUvs();
  }
  /** The width of the Texture in pixels. */
  get width() {
    return this.orig.width;
  }
  /** The height of the Texture in pixels. */
  get height() {
    return this.orig.height;
  }
  /** Utility function for BaseTexture|Texture cast. */
  castToBaseTexture() {
    return this.baseTexture;
  }
  /** An empty texture, used often to not have to create multiple empty textures. Can not be destroyed. */
  static get EMPTY() {
    return i._EMPTY || (i._EMPTY = new i(new d()), l(i._EMPTY), l(i._EMPTY.baseTexture)), i._EMPTY;
  }
  /** A white texture of 16x16 size, used for graphics and other things Can not be destroyed. */
  static get WHITE() {
    if (!i._WHITE) {
      const e = u.ADAPTER.createCanvas(16, 16), t = e.getContext("2d");
      e.width = 16, e.height = 16, t.fillStyle = "white", t.fillRect(0, 0, 16, 16), i._WHITE = new i(d.from(e)), l(i._WHITE), l(i._WHITE.baseTexture);
    }
    return i._WHITE;
  }
}
export {
  i as Texture
};
//# sourceMappingURL=index131.js.map

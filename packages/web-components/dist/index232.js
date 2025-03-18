import { ALPHA_MODES as a } from "./index164.js";
import { settings as p } from "./index153.js";
import "./index36.js";
import { BaseImageResource as l } from "./index236.js";
class g extends l {
  /**
   * @param source - image source or URL
   * @param options
   * @param {boolean} [options.autoLoad=true] - start loading process
   * @param {boolean} [options.createBitmap=PIXI.settings.CREATE_IMAGE_BITMAP] - whether its required to create
   *        a bitmap before upload
   * @param {boolean} [options.crossorigin=true] - Load image using cross origin
   * @param {PIXI.ALPHA_MODES} [options.alphaMode=PIXI.ALPHA_MODES.UNPACK] - Premultiply image alpha in bitmap
   */
  constructor(t, s) {
    if (s = s || {}, typeof t == "string") {
      const e = new Image();
      l.crossOrigin(e, t, s.crossorigin), e.src = t, t = e;
    }
    super(t), !t.complete && this._width && this._height && (this._width = 0, this._height = 0), this.url = t.src, this._process = null, this.preserveBitmap = !1, this.createBitmap = (s.createBitmap ?? p.CREATE_IMAGE_BITMAP) && !!globalThis.createImageBitmap, this.alphaMode = typeof s.alphaMode == "number" ? s.alphaMode : null, this.bitmap = null, this._load = null, s.autoLoad !== !1 && this.load();
  }
  /**
   * Returns a promise when image will be loaded and processed.
   * @param createBitmap - whether process image into bitmap
   */
  load(t) {
    return this._load ? this._load : (t !== void 0 && (this.createBitmap = t), this._load = new Promise((s, e) => {
      const i = this.source;
      this.url = i.src;
      const r = () => {
        this.destroyed || (i.onload = null, i.onerror = null, this.update(), this._load = null, this.createBitmap ? s(this.process()) : s(this));
      };
      i.complete && i.src ? r() : (i.onload = r, i.onerror = (o) => {
        e(o), this.onError.emit(o);
      });
    }), this._load);
  }
  /**
   * Called when we need to convert image into BitmapImage.
   * Can be called multiple times, real promise is cached inside.
   * @returns - Cached promise to fill that bitmap
   */
  process() {
    const t = this.source;
    if (this._process !== null)
      return this._process;
    if (this.bitmap !== null || !globalThis.createImageBitmap)
      return Promise.resolve(this);
    const s = globalThis.createImageBitmap, e = !t.crossOrigin || t.crossOrigin === "anonymous";
    return this._process = fetch(
      t.src,
      {
        mode: e ? "cors" : "no-cors"
      }
    ).then((i) => i.blob()).then((i) => s(
      i,
      0,
      0,
      t.width,
      t.height,
      {
        premultiplyAlpha: this.alphaMode === null || this.alphaMode === a.UNPACK ? "premultiply" : "none"
      }
    )).then((i) => this.destroyed ? Promise.reject() : (this.bitmap = i, this.update(), this._process = null, Promise.resolve(this))), this._process;
  }
  /**
   * Upload the image resource to GPU.
   * @param renderer - Renderer to upload to
   * @param baseTexture - BaseTexture for this resource
   * @param glTexture - GLTexture to use
   * @returns {boolean} true is success
   */
  upload(t, s, e) {
    if (typeof this.alphaMode == "number" && (s.alphaMode = this.alphaMode), !this.createBitmap)
      return super.upload(t, s, e);
    if (!this.bitmap && (this.process(), !this.bitmap))
      return !1;
    if (super.upload(t, s, e, this.bitmap), !this.preserveBitmap) {
      let i = !0;
      const r = s._glTextures;
      for (const o in r) {
        const h = r[o];
        if (h !== e && h.dirtyId !== s.dirtyId) {
          i = !1;
          break;
        }
      }
      i && (this.bitmap.close && this.bitmap.close(), this.bitmap = null);
    }
    return !0;
  }
  /** Destroys this resource. */
  dispose() {
    this.source.onload = null, this.source.onerror = null, super.dispose(), this.bitmap && (this.bitmap.close(), this.bitmap = null), this._process = null, this._load = null;
  }
  /**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @returns {boolean} `true` if current environment support HTMLImageElement, and source is string or HTMLImageElement
   */
  static test(t) {
    return typeof HTMLImageElement < "u" && (typeof t == "string" || t instanceof HTMLImageElement);
  }
}
export {
  g as ImageResource
};
//# sourceMappingURL=index232.js.map

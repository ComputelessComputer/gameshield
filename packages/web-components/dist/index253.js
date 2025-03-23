import { ALPHA_MODES as l } from "./index164.js";
import { settings as o } from "./index163.js";
import "./index33.js";
import { BaseImageResource as h } from "./index258.js";
class r extends h {
  /**
   * @param source - ImageBitmap or URL to use.
   * @param options - Options to use.
   */
  constructor(s, t) {
    t = t || {};
    let e, i, a;
    typeof s == "string" ? (e = r.EMPTY, i = s, a = !0) : (e = s, i = null, a = !1), super(e), this.url = i, this.crossOrigin = t.crossOrigin ?? !0, this.alphaMode = typeof t.alphaMode == "number" ? t.alphaMode : null, this.ownsImageBitmap = t.ownsImageBitmap ?? a, this._load = null, t.autoLoad !== !1 && this.load();
  }
  load() {
    return this._load ? this._load : (this._load = new Promise(async (s, t) => {
      if (this.url === null) {
        s(this);
        return;
      }
      try {
        const e = await o.ADAPTER.fetch(this.url, {
          mode: this.crossOrigin ? "cors" : "no-cors"
        });
        if (this.destroyed)
          return;
        const i = await e.blob();
        if (this.destroyed)
          return;
        const a = await createImageBitmap(i, {
          premultiplyAlpha: this.alphaMode === null || this.alphaMode === l.UNPACK ? "premultiply" : "none"
        });
        if (this.destroyed) {
          a.close();
          return;
        }
        this.source = a, this.update(), s(this);
      } catch (e) {
        if (this.destroyed)
          return;
        t(e), this.onError.emit(e);
      }
    }), this._load);
  }
  /**
   * Upload the image bitmap resource to GPU.
   * @param renderer - Renderer to upload to
   * @param baseTexture - BaseTexture for this resource
   * @param glTexture - GLTexture to use
   * @returns {boolean} true is success
   */
  upload(s, t, e) {
    return this.source instanceof ImageBitmap ? (typeof this.alphaMode == "number" && (t.alphaMode = this.alphaMode), super.upload(s, t, e)) : (this.load(), !1);
  }
  /** Destroys this resource. */
  dispose() {
    this.ownsImageBitmap && this.source instanceof ImageBitmap && this.source.close(), super.dispose(), this._load = null;
  }
  /**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @returns {boolean} `true` if current environment support ImageBitmap, and source is string or ImageBitmap
   */
  static test(s) {
    return !!globalThis.createImageBitmap && typeof ImageBitmap < "u" && (typeof s == "string" || s instanceof ImageBitmap);
  }
  /**
   * ImageBitmap cannot be created synchronously, so a empty placeholder canvas is needed when loading from URLs.
   * Only for internal usage.
   * @returns The cached placeholder canvas.
   */
  static get EMPTY() {
    return r._EMPTY = r._EMPTY ?? o.ADAPTER.createCanvas(0, 0), r._EMPTY;
  }
}
export {
  r as ImageBitmapResource
};
//# sourceMappingURL=index253.js.map

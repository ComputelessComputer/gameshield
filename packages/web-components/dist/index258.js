import { ALPHA_MODES as d } from "./index164.js";
import "./index37.js";
import "./index33.js";
import "./index38.js";
import "./index39.js";
import "./index40.js";
import "./index21.js";
import "./index41.js";
import "./index42.js";
import { determineCrossOrigin as n } from "./index259.js";
import { Resource as m } from "./index249.js";
class I extends m {
  /**
   * @param {PIXI.ImageSourcee} source
   */
  constructor(e) {
    const t = e, i = t.naturalWidth || t.videoWidth || t.displayWidth || t.width, h = t.naturalHeight || t.videoHeight || t.displayHeight || t.height;
    super(i, h), this.source = e, this.noSubImage = !1;
  }
  /**
   * Set cross origin based detecting the url and the crossorigin
   * @param element - Element to apply crossOrigin
   * @param url - URL to check
   * @param crossorigin - Cross origin value to use
   */
  static crossOrigin(e, t, i) {
    i === void 0 && !t.startsWith("data:") ? e.crossOrigin = n(t) : i !== !1 && (e.crossOrigin = typeof i == "string" ? i : "anonymous");
  }
  /**
   * Upload the texture to the GPU.
   * @param renderer - Upload to the renderer
   * @param baseTexture - Reference to parent texture
   * @param glTexture
   * @param {PIXI.ImageSourcee} [source] - (optional)
   * @returns - true is success
   */
  upload(e, t, i, h) {
    const o = e.gl, a = t.realWidth, r = t.realHeight;
    if (h = h || this.source, typeof HTMLImageElement < "u" && h instanceof HTMLImageElement) {
      if (!h.complete || h.naturalWidth === 0)
        return !1;
    } else if (typeof HTMLVideoElement < "u" && h instanceof HTMLVideoElement && h.readyState <= 1)
      return !1;
    return o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t.alphaMode === d.UNPACK), !this.noSubImage && t.target === o.TEXTURE_2D && i.width === a && i.height === r ? o.texSubImage2D(o.TEXTURE_2D, 0, 0, 0, t.format, i.type, h) : (i.width = a, i.height = r, o.texImage2D(t.target, 0, i.internalFormat, t.format, i.type, h)), !0;
  }
  /**
   * Checks if source width/height was changed, resize can cause extra baseTexture update.
   * Triggers one update in any case.
   */
  update() {
    if (this.destroyed)
      return;
    const e = this.source, t = e.naturalWidth || e.videoWidth || e.width, i = e.naturalHeight || e.videoHeight || e.height;
    this.resize(t, i), super.update();
  }
  /** Destroy this {@link PIXI.BaseImageResource} */
  dispose() {
    this.source = null;
  }
}
export {
  I as BaseImageResource
};
//# sourceMappingURL=index258.js.map

import { Texture as a } from "./index131.js";
import { BaseRenderTexture as o } from "./index206.js";
class h extends a {
  /**
   * @param baseRenderTexture - The base texture object that this texture uses.
   * @param frame - The rectangle frame of the texture to show.
   */
  constructor(e, t) {
    super(e, t), this.valid = !0, this.filterFrame = null, this.filterPoolKey = null, this.updateUvs();
  }
  /**
   * Shortcut to `this.baseTexture.framebuffer`, saves baseTexture cast.
   * @readonly
   */
  get framebuffer() {
    return this.baseTexture.framebuffer;
  }
  /**
   * Shortcut to `this.framebuffer.multisample`.
   * @default PIXI.MSAA_QUALITY.NONE
   */
  get multisample() {
    return this.framebuffer.multisample;
  }
  set multisample(e) {
    this.framebuffer.multisample = e;
  }
  /**
   * Resizes the RenderTexture.
   * @param desiredWidth - The desired width to resize to.
   * @param desiredHeight - The desired height to resize to.
   * @param resizeBaseTexture - Should the baseTexture.width and height values be resized as well?
   */
  resize(e, t, u = !0) {
    const s = this.baseTexture.resolution, i = Math.round(e * s) / s, r = Math.round(t * s) / s;
    this.valid = i > 0 && r > 0, this._frame.width = this.orig.width = i, this._frame.height = this.orig.height = r, u && this.baseTexture.resize(i, r), this.updateUvs();
  }
  /**
   * Changes the resolution of baseTexture, but does not change framebuffer size.
   * @param resolution - The new resolution to apply to RenderTexture
   */
  setResolution(e) {
    const { baseTexture: t } = this;
    t.resolution !== e && (t.setResolution(e), this.resize(t.width, t.height, !1));
  }
  /**
   * A short hand way of creating a render texture.
   * @param options - Options
   * @param {number} [options.width=100] - The width of the render texture
   * @param {number} [options.height=100] - The height of the render texture
   * @param {PIXI.SCALE_MODES} [options.scaleMode=PIXI.BaseTexture.defaultOptions.scaleMode] - See {@link PIXI.SCALE_MODES}
   *    for possible values
   * @param {number} [options.resolution=PIXI.settings.RESOLUTION] - The resolution / device pixel ratio of the texture
   *    being generated
   * @param {PIXI.MSAA_QUALITY} [options.multisample=PIXI.MSAA_QUALITY.NONE] - The number of samples of the frame buffer
   * @returns The new render texture
   */
  static create(e) {
    return new h(new o(e));
  }
}
export {
  h as RenderTexture
};
//# sourceMappingURL=index130.js.map

import { Color as a } from "./index24.js";
import { MSAA_QUALITY as l, MIPMAP_MODES as m } from "./index164.js";
import { Framebuffer as u } from "./index205.js";
import { BaseTexture as f } from "./index54.js";
class b extends f {
  /**
   * @param options
   * @param {number} [options.width=100] - The width of the base render texture.
   * @param {number} [options.height=100] - The height of the base render texture.
   * @param {PIXI.SCALE_MODES} [options.scaleMode=PIXI.BaseTexture.defaultOptions.scaleMode] - See {@link PIXI.SCALE_MODES}
   *   for possible values.
   * @param {number} [options.resolution=PIXI.settings.RESOLUTION] - The resolution / device pixel ratio
   *   of the texture being generated.
   * @param {PIXI.MSAA_QUALITY} [options.multisample=PIXI.MSAA_QUALITY.NONE] - The number of samples of the frame buffer.
   */
  constructor(e = {}) {
    if (typeof e == "number") {
      const r = arguments[0], t = arguments[1], s = arguments[2], i = arguments[3];
      e = { width: r, height: t, scaleMode: s, resolution: i };
    }
    e.width = e.width ?? 100, e.height = e.height ?? 100, e.multisample ?? (e.multisample = l.NONE), super(null, e), this.mipmap = m.OFF, this.valid = !0, this._clear = new a([0, 0, 0, 0]), this.framebuffer = new u(this.realWidth, this.realHeight).addColorTexture(0, this), this.framebuffer.multisample = e.multisample, this.maskStack = [], this.filterStack = [{}];
  }
  /** Color when clearning the texture. */
  set clearColor(e) {
    this._clear.setValue(e);
  }
  get clearColor() {
    return this._clear.value;
  }
  /**
   * Color object when clearning the texture.
   * @readonly
   * @since 7.2.0
   */
  get clear() {
    return this._clear;
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
   * Resizes the BaseRenderTexture.
   * @param desiredWidth - The desired width to resize to.
   * @param desiredHeight - The desired height to resize to.
   */
  resize(e, r) {
    this.framebuffer.resize(e * this.resolution, r * this.resolution), this.setRealSize(this.framebuffer.width, this.framebuffer.height);
  }
  /**
   * Frees the texture and framebuffer from WebGL memory without destroying this texture object.
   * This means you can still use the texture later which will upload it to GPU
   * memory again.
   * @fires PIXI.BaseTexture#dispose
   */
  dispose() {
    this.framebuffer.dispose(), super.dispose();
  }
  /** Destroys this texture. */
  destroy() {
    super.destroy(), this.framebuffer.destroyDepthTexture(), this.framebuffer = null;
  }
}
export {
  b as BaseRenderTexture
};
//# sourceMappingURL=index215.js.map

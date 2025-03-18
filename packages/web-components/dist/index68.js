import { MSAA_QUALITY as s } from "./index164.js";
import "./index40.js";
import "./index36.js";
import "./index41.js";
import "./index42.js";
import "./index43.js";
import "./index24.js";
import "./index44.js";
import { nextPow2 as h } from "./index173.js";
import "./index45.js";
import { BaseRenderTexture as x } from "./index206.js";
import { RenderTexture as u } from "./index130.js";
class n {
  /**
   * @param textureOptions - options that will be passed to BaseRenderTexture constructor
   * @param {PIXI.SCALE_MODES} [textureOptions.scaleMode] - See {@link PIXI.SCALE_MODES} for possible values.
   */
  constructor(t) {
    this.texturePool = {}, this.textureOptions = t || {}, this.enableFullScreen = !1, this._pixelsWidth = 0, this._pixelsHeight = 0;
  }
  /**
   * Creates texture with params that were specified in pool constructor.
   * @param realWidth - Width of texture in pixels.
   * @param realHeight - Height of texture in pixels.
   * @param multisample - Number of samples of the framebuffer.
   */
  createTexture(t, e, o = s.NONE) {
    const r = new x(Object.assign({
      width: t,
      height: e,
      resolution: 1,
      multisample: o
    }, this.textureOptions));
    return new u(r);
  }
  /**
   * Gets a Power-of-Two render texture or fullScreen texture
   * @param minWidth - The minimum width of the render texture.
   * @param minHeight - The minimum height of the render texture.
   * @param resolution - The resolution of the render texture.
   * @param multisample - Number of samples of the render texture.
   * @returns The new render texture.
   */
  getOptimalTexture(t, e, o = 1, r = s.NONE) {
    let i;
    t = Math.max(Math.ceil(t * o - 1e-6), 1), e = Math.max(Math.ceil(e * o - 1e-6), 1), !this.enableFullScreen || t !== this._pixelsWidth || e !== this._pixelsHeight ? (t = h(t), e = h(e), i = ((t & 65535) << 16 | e & 65535) >>> 0, r > 1 && (i += r * 4294967296)) : i = r > 1 ? -r : -1, this.texturePool[i] || (this.texturePool[i] = []);
    let l = this.texturePool[i].pop();
    return l || (l = this.createTexture(t, e, r)), l.filterPoolKey = i, l.setResolution(o), l;
  }
  /**
   * Gets extra texture of the same size as input renderTexture
   *
   * `getFilterTexture(input, 0.5)` or `getFilterTexture(0.5, input)`
   * @param input - renderTexture from which size and resolution will be copied
   * @param resolution - override resolution of the renderTexture
   *  It overrides, it does not multiply
   * @param multisample - number of samples of the renderTexture
   */
  getFilterTexture(t, e, o) {
    const r = this.getOptimalTexture(
      t.width,
      t.height,
      e || t.resolution,
      o || s.NONE
    );
    return r.filterFrame = t.filterFrame, r;
  }
  /**
   * Place a render texture back into the pool.
   * @param renderTexture - The renderTexture to free
   */
  returnTexture(t) {
    const e = t.filterPoolKey;
    t.filterFrame = null, this.texturePool[e].push(t);
  }
  /**
   * Alias for returnTexture, to be compliant with FilterSystem interface.
   * @param renderTexture - The renderTexture to free
   */
  returnFilterTexture(t) {
    this.returnTexture(t);
  }
  /**
   * Clears the pool.
   * @param destroyTextures - Destroy all stored textures.
   */
  clear(t) {
    if (t = t !== !1, t)
      for (const e in this.texturePool) {
        const o = this.texturePool[e];
        if (o)
          for (let r = 0; r < o.length; r++)
            o[r].destroy(!0);
      }
    this.texturePool = {};
  }
  /**
   * If screen size was changed, drops all screen-sized textures,
   * sets new screen size, sets `enableFullScreen` to true
   *
   * Size is measured in pixels, `renderer.view` can be passed here, not `renderer.screen`
   * @param size - Initial size of screen.
   */
  setScreenSize(t) {
    if (!(t.width === this._pixelsWidth && t.height === this._pixelsHeight)) {
      this.enableFullScreen = t.width > 0 && t.height > 0;
      for (const e in this.texturePool) {
        if (!(Number(e) < 0))
          continue;
        const o = this.texturePool[e];
        if (o)
          for (let r = 0; r < o.length; r++)
            o[r].destroy(!0);
        this.texturePool[e] = [];
      }
      this._pixelsWidth = t.width, this._pixelsHeight = t.height;
    }
  }
}
n.SCREEN_KEY = -1;
export {
  n as RenderTexturePool
};
//# sourceMappingURL=index68.js.map

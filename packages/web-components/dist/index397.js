import { nextPow2 as h } from "./index403.js";
import { TextureSource as c } from "./index474.js";
import { Texture as x } from "./index360.js";
let a = 0;
class n {
  /**
   * @param textureOptions - options that will be passed to BaseRenderTexture constructor
   * @param {SCALE_MODE} [textureOptions.scaleMode] - See {@link SCALE_MODE} for possible values.
   */
  constructor(e) {
    this._poolKeyHash = /* @__PURE__ */ Object.create(null), this._texturePool = {}, this.textureOptions = e || {}, this.enableFullScreen = !1;
  }
  /**
   * Creates texture with params that were specified in pool constructor.
   * @param pixelWidth - Width of texture in pixels.
   * @param pixelHeight - Height of texture in pixels.
   * @param antialias
   */
  createTexture(e, r, o) {
    const i = new c({
      ...this.textureOptions,
      width: e,
      height: r,
      resolution: 1,
      antialias: o,
      autoGarbageCollect: !1
    });
    return new x({
      source: i,
      label: `texturePool_${a++}`
    });
  }
  /**
   * Gets a Power-of-Two render texture or fullScreen texture
   * @param frameWidth - The minimum width of the render texture.
   * @param frameHeight - The minimum height of the render texture.
   * @param resolution - The resolution of the render texture.
   * @param antialias
   * @returns The new render texture.
   */
  getOptimalTexture(e, r, o = 1, i) {
    let s = Math.ceil(e * o - 1e-6), u = Math.ceil(r * o - 1e-6);
    s = h(s), u = h(u);
    const l = (s << 17) + (u << 1) + (i ? 1 : 0);
    this._texturePool[l] || (this._texturePool[l] = []);
    let t = this._texturePool[l].pop();
    return t || (t = this.createTexture(s, u, i)), t.source._resolution = o, t.source.width = s / o, t.source.height = u / o, t.source.pixelWidth = s, t.source.pixelHeight = u, t.frame.x = 0, t.frame.y = 0, t.frame.width = e, t.frame.height = r, t.updateUvs(), this._poolKeyHash[t.uid] = l, t;
  }
  /**
   * Gets extra texture of the same size as input renderTexture
   * @param texture - The texture to check what size it is.
   * @param antialias - Whether to use antialias.
   * @returns A texture that is a power of two
   */
  getSameSizeTexture(e, r = !1) {
    const o = e.source;
    return this.getOptimalTexture(e.width, e.height, o._resolution, r);
  }
  /**
   * Place a render texture back into the pool.
   * @param renderTexture - The renderTexture to free
   */
  returnTexture(e) {
    const r = this._poolKeyHash[e.uid];
    this._texturePool[r].push(e);
  }
  /**
   * Clears the pool.
   * @param destroyTextures - Destroy all stored textures.
   */
  clear(e) {
    if (e = e !== !1, e)
      for (const r in this._texturePool) {
        const o = this._texturePool[r];
        if (o)
          for (let i = 0; i < o.length; i++)
            o[i].destroy(!0);
      }
    this._texturePool = {};
  }
}
const m = new n();
export {
  m as TexturePool,
  n as TexturePoolClass
};
//# sourceMappingURL=index397.js.map

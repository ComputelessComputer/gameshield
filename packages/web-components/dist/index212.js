import "./index22.js";
import "./index23.js";
import "./index24.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import { Matrix as x } from "./index28.js";
import "./index29.js";
import "./index30.js";
import "./index31.js";
const p = new x();
class D {
  /**
   * @param texture - observed texture
   * @param clampMargin - Changes frame clamping, 0.5 by default. Use -0.5 for extra border.
   */
  constructor(r, t) {
    this._texture = r, this.mapCoord = new x(), this.uClampFrame = new Float32Array(4), this.uClampOffset = new Float32Array(2), this._textureID = -1, this._updateID = 0, this.clampOffset = 0, this.clampMargin = typeof t > "u" ? 0.5 : t, this.isSimple = !1;
  }
  /** Texture property. */
  get texture() {
    return this._texture;
  }
  set texture(r) {
    this._texture = r, this._textureID = -1;
  }
  /**
   * Multiplies uvs array to transform
   * @param uvs - mesh uvs
   * @param [out=uvs] - output
   * @returns - output
   */
  multiplyUvs(r, t) {
    t === void 0 && (t = r);
    const e = this.mapCoord;
    for (let s = 0; s < r.length; s += 2) {
      const h = r[s], i = r[s + 1];
      t[s] = h * e.a + i * e.c + e.tx, t[s + 1] = h * e.b + i * e.d + e.ty;
    }
    return t;
  }
  /**
   * Updates matrices if texture was changed.
   * @param [forceUpdate=false] - if true, matrices will be updated any case
   * @returns - Whether or not it was updated
   */
  update(r) {
    const t = this._texture;
    if (!t || !t.valid || !r && this._textureID === t._updateID)
      return !1;
    this._textureID = t._updateID, this._updateID++;
    const e = t._uvs;
    this.mapCoord.set(e.x1 - e.x0, e.y1 - e.y0, e.x3 - e.x0, e.y3 - e.y0, e.x0, e.y0);
    const s = t.orig, h = t.trim;
    h && (p.set(
      s.width / h.width,
      0,
      0,
      s.height / h.height,
      -h.x / h.width,
      -h.y / h.height
    ), this.mapCoord.append(p));
    const i = t.baseTexture, m = this.uClampFrame, o = this.clampMargin / i.resolution, a = this.clampOffset;
    return m[0] = (t._frame.x + o + a) / i.width, m[1] = (t._frame.y + o + a) / i.height, m[2] = (t._frame.x + t._frame.width - o + a) / i.width, m[3] = (t._frame.y + t._frame.height - o + a) / i.height, this.uClampOffset[0] = a / i.realWidth, this.uClampOffset[1] = a / i.realHeight, this.isSimple = t._frame.width === i.width && t._frame.height === i.height && t.rotate === 0, !0;
  }
}
export {
  D as TextureMatrix
};
//# sourceMappingURL=index212.js.map

import { Matrix as f } from "./index393.js";
const o = new f();
class d {
  /**
   * @param texture - observed texture
   * @param clampMargin - Changes frame clamping, 0.5 by default. Use -0.5 for extra border.
   */
  constructor(t, e) {
    this.mapCoord = new f(), this.uClampFrame = new Float32Array(4), this.uClampOffset = new Float32Array(2), this._textureID = -1, this._updateID = 0, this.clampOffset = 0, typeof e > "u" ? this.clampMargin = t.width < 10 ? 0 : 0.5 : this.clampMargin = e, this.isSimple = !1, this.texture = t;
  }
  /** Texture property. */
  get texture() {
    return this._texture;
  }
  set texture(t) {
    var e;
    this.texture !== t && ((e = this._texture) == null || e.removeListener("update", this.update, this), this._texture = t, this._texture.addListener("update", this.update, this), this.update());
  }
  /**
   * Multiplies uvs array to transform
   * @param uvs - mesh uvs
   * @param [out=uvs] - output
   * @returns - output
   */
  multiplyUvs(t, e) {
    e === void 0 && (e = t);
    const h = this.mapCoord;
    for (let i = 0; i < t.length; i += 2) {
      const s = t[i], r = t[i + 1];
      e[i] = s * h.a + r * h.c + h.tx, e[i + 1] = s * h.b + r * h.d + h.ty;
    }
    return e;
  }
  /**
   * Updates matrices if texture was changed
   * @returns - whether or not it was updated
   */
  update() {
    const t = this._texture;
    this._updateID++;
    const e = t.uvs;
    this.mapCoord.set(e.x1 - e.x0, e.y1 - e.y0, e.x3 - e.x0, e.y3 - e.y0, e.x0, e.y0);
    const h = t.orig, i = t.trim;
    i && (o.set(
      h.width / i.width,
      0,
      0,
      h.height / i.height,
      -i.x / i.width,
      -i.y / i.height
    ), this.mapCoord.append(o));
    const s = t.source, r = this.uClampFrame, a = this.clampMargin / s._resolution, m = this.clampOffset / s._resolution;
    return r[0] = (t.frame.x + a + m) / s.width, r[1] = (t.frame.y + a + m) / s.height, r[2] = (t.frame.x + t.frame.width - a + m) / s.width, r[3] = (t.frame.y + t.frame.height - a + m) / s.height, this.uClampOffset[0] = this.clampOffset / s.pixelWidth, this.uClampOffset[1] = this.clampOffset / s.pixelHeight, this.isSimple = t.frame.width === s.width && t.frame.height === s.height && t.rotate === 0, !0;
  }
}
export {
  d as TextureMatrix
};
//# sourceMappingURL=index479.js.map

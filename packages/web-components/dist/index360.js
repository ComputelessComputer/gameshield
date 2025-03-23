import y from "./index157.js";
import { groupD8 as s } from "./index401.js";
import { Rectangle as g } from "./index407.js";
import { uid as w } from "./index416.js";
import { deprecation as _, v8_0_0 as T } from "./index477.js";
import { NOOP as l } from "./index478.js";
import { BufferImageSource as M } from "./index323.js";
import { TextureSource as p } from "./index474.js";
import { TextureMatrix as E } from "./index479.js";
class n extends y {
  /**
   * @param {rendering.TextureOptions} options - Options for the texture
   */
  constructor({
    source: t,
    label: u,
    frame: a,
    orig: m,
    trim: i,
    defaultAnchor: r,
    defaultBorders: d,
    rotate: c,
    dynamic: e
  } = {}) {
    if (super(), this.uid = w("texture"), this.uvs = { x0: 0, y0: 0, x1: 0, y1: 0, x2: 0, y2: 0, x3: 0, y3: 0 }, this.frame = new g(), this.noFrame = !1, this.dynamic = !1, this.isTexture = !0, this.label = u, this.source = (t == null ? void 0 : t.source) ?? new p(), this.noFrame = !a, a)
      this.frame.copyFrom(a);
    else {
      const { width: h, height: o } = this._source;
      this.frame.width = h, this.frame.height = o;
    }
    this.orig = m || this.frame, this.trim = i, this.rotate = c ?? 0, this.defaultAnchor = r, this.defaultBorders = d, this.destroyed = !1, this.dynamic = e || !1, this.updateUvs();
  }
  set source(t) {
    this._source && this._source.off("resize", this.update, this), this._source = t, t.on("resize", this.update, this), this.emit("update", this);
  }
  /** the underlying source of the texture (equivalent of baseTexture in v7) */
  get source() {
    return this._source;
  }
  /** returns a TextureMatrix instance for this texture. By default, that object is not created because its heavy. */
  get textureMatrix() {
    return this._textureMatrix || (this._textureMatrix = new E(this)), this._textureMatrix;
  }
  /** The width of the Texture in pixels. */
  get width() {
    return this.orig.width;
  }
  /** The height of the Texture in pixels. */
  get height() {
    return this.orig.height;
  }
  /** Call this function when you have modified the frame of this texture. */
  updateUvs() {
    const { uvs: t, frame: u } = this, { width: a, height: m } = this._source, i = u.x / a, r = u.y / m, d = u.width / a, c = u.height / m;
    let e = this.rotate;
    if (e) {
      const h = d / 2, o = c / 2, x = i + h, f = r + o;
      e = s.add(e, s.NW), t.x0 = x + h * s.uX(e), t.y0 = f + o * s.uY(e), e = s.add(e, 2), t.x1 = x + h * s.uX(e), t.y1 = f + o * s.uY(e), e = s.add(e, 2), t.x2 = x + h * s.uX(e), t.y2 = f + o * s.uY(e), e = s.add(e, 2), t.x3 = x + h * s.uX(e), t.y3 = f + o * s.uY(e);
    } else
      t.x0 = i, t.y0 = r, t.x1 = i + d, t.y1 = r, t.x2 = i + d, t.y2 = r + c, t.x3 = i, t.y3 = r + c;
  }
  /**
   * Destroys this texture
   * @param destroySource - Destroy the source when the texture is destroyed.
   */
  destroy(t = !1) {
    this._source && t && (this._source.destroy(), this._source = null), this._textureMatrix = null, this.destroyed = !0, this.emit("destroy", this), this.removeAllListeners();
  }
  /**
   * Call this if you have modified the `texture outside` of the constructor.
   *
   * If you have modified this texture's source, you must separately call `texture.source.update()` to see those changes.
   */
  update() {
    this.noFrame && (this.frame.width = this._source.width, this.frame.height = this._source.height), this.updateUvs(), this.emit("update", this);
  }
  /** @deprecated since 8.0.0 */
  get baseTexture() {
    return _(T, "Texture.baseTexture is now Texture.source"), this._source;
  }
}
n.EMPTY = new n({
  label: "EMPTY",
  source: new p({
    label: "EMPTY"
  })
});
n.EMPTY.destroy = l;
n.WHITE = new n({
  source: new M({
    resource: new Uint8Array([255, 255, 255, 255]),
    width: 1,
    height: 1,
    alphaMode: "premultiply-alpha-on-upload",
    label: "WHITE"
  }),
  label: "WHITE"
});
n.WHITE.destroy = l;
export {
  n as Texture
};
//# sourceMappingURL=index360.js.map

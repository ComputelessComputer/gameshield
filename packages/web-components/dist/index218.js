import { MSAA_QUALITY as u, SCALE_MODES as h, MIPMAP_MODES as o, FORMATS as n, TYPES as l } from "./index164.js";
import { Runner as a } from "./index32.js";
import { BaseTexture as d } from "./index51.js";
class f {
  /**
   * @param width - Width of the frame buffer
   * @param height - Height of the frame buffer
   */
  constructor(t, e) {
    if (this.width = Math.round(t), this.height = Math.round(e), !this.width || !this.height)
      throw new Error("Framebuffer width or height is zero");
    this.stencil = !1, this.depth = !1, this.dirtyId = 0, this.dirtyFormat = 0, this.dirtySize = 0, this.depthTexture = null, this.colorTextures = [], this.glFramebuffers = {}, this.disposeRunner = new a("disposeFramebuffer"), this.multisample = u.NONE;
  }
  /**
   * Reference to the colorTexture.
   * @readonly
   */
  get colorTexture() {
    return this.colorTextures[0];
  }
  /**
   * Add texture to the colorTexture array.
   * @param index - Index of the array to add the texture to
   * @param texture - Texture to add to the array
   */
  addColorTexture(t = 0, e) {
    return this.colorTextures[t] = e || new d(null, {
      scaleMode: h.NEAREST,
      resolution: 1,
      mipmap: o.OFF,
      width: this.width,
      height: this.height
    }), this.dirtyId++, this.dirtyFormat++, this;
  }
  /**
   * Add a depth texture to the frame buffer.
   * @param texture - Texture to add.
   */
  addDepthTexture(t) {
    return this.depthTexture = t || new d(null, {
      scaleMode: h.NEAREST,
      resolution: 1,
      width: this.width,
      height: this.height,
      mipmap: o.OFF,
      format: n.DEPTH_COMPONENT,
      type: l.UNSIGNED_SHORT
    }), this.dirtyId++, this.dirtyFormat++, this;
  }
  /** Enable depth on the frame buffer. */
  enableDepth() {
    return this.depth = !0, this.dirtyId++, this.dirtyFormat++, this;
  }
  /** Enable stencil on the frame buffer. */
  enableStencil() {
    return this.stencil = !0, this.dirtyId++, this.dirtyFormat++, this;
  }
  /**
   * Resize the frame buffer
   * @param width - Width of the frame buffer to resize to
   * @param height - Height of the frame buffer to resize to
   */
  resize(t, e) {
    if (t = Math.round(t), e = Math.round(e), !t || !e)
      throw new Error("Framebuffer width and height must not be zero");
    if (!(t === this.width && e === this.height)) {
      this.width = t, this.height = e, this.dirtyId++, this.dirtySize++;
      for (let i = 0; i < this.colorTextures.length; i++) {
        const r = this.colorTextures[i], s = r.resolution;
        r.setSize(t / s, e / s);
      }
      if (this.depthTexture) {
        const i = this.depthTexture.resolution;
        this.depthTexture.setSize(t / i, e / i);
      }
    }
  }
  /** Disposes WebGL resources that are connected to this geometry. */
  dispose() {
    this.disposeRunner.emit(this, !1);
  }
  /** Destroys and removes the depth texture added to this framebuffer. */
  destroyDepthTexture() {
    this.depthTexture && (this.depthTexture.destroy(), this.depthTexture = null, ++this.dirtyId, ++this.dirtyFormat);
  }
}
export {
  f as Framebuffer
};
//# sourceMappingURL=index218.js.map

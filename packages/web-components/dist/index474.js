import d from "./index157.js";
import { isPow2 as l } from "./index403.js";
import { definedProps as u } from "./index475.js";
import { uid as s } from "./index416.js";
import { TextureStyle as n } from "./index476.js";
const a = class o extends d {
  /**
   * @param options - options for creating a new TextureSource
   */
  constructor(e = {}) {
    super(), this.options = e, this.uid = s("textureSource"), this._resourceType = "textureSource", this._resourceId = s("resource"), this.uploadMethodId = "unknown", this._resolution = 1, this.pixelWidth = 1, this.pixelHeight = 1, this.width = 1, this.height = 1, this.sampleCount = 1, this.mipLevelCount = 1, this.autoGenerateMipmaps = !1, this.format = "rgba8unorm", this.dimension = "2d", this.antialias = !1, this._touched = 0, this._batchTick = -1, this._textureBindLocation = -1, e = { ...o.defaultOptions, ...e }, this.label = e.label ?? "", this.resource = e.resource, this.autoGarbageCollect = e.autoGarbageCollect, this._resolution = e.resolution, e.width ? this.pixelWidth = e.width * this._resolution : this.pixelWidth = this.resource ? this.resourceWidth ?? 1 : 1, e.height ? this.pixelHeight = e.height * this._resolution : this.pixelHeight = this.resource ? this.resourceHeight ?? 1 : 1, this.width = this.pixelWidth / this._resolution, this.height = this.pixelHeight / this._resolution, this.format = e.format, this.dimension = e.dimensions, this.mipLevelCount = e.mipLevelCount, this.autoGenerateMipmaps = e.autoGenerateMipmaps, this.sampleCount = e.sampleCount, this.antialias = e.antialias, this.alphaMode = e.alphaMode, this.style = new n(u(e)), this.destroyed = !1, this._refreshPOT();
  }
  /** returns itself */
  get source() {
    return this;
  }
  /** the style of the texture */
  get style() {
    return this._style;
  }
  set style(e) {
    var i, t;
    this.style !== e && ((i = this._style) == null || i.off("change", this._onStyleChange, this), this._style = e, (t = this._style) == null || t.on("change", this._onStyleChange, this), this._onStyleChange());
  }
  /** setting this will set wrapModeU,wrapModeV and wrapModeW all at once! */
  get addressMode() {
    return this._style.addressMode;
  }
  set addressMode(e) {
    this._style.addressMode = e;
  }
  /** setting this will set wrapModeU,wrapModeV and wrapModeW all at once! */
  get repeatMode() {
    return this._style.addressMode;
  }
  set repeatMode(e) {
    this._style.addressMode = e;
  }
  /** Specifies the sampling behavior when the sample footprint is smaller than or equal to one texel. */
  get magFilter() {
    return this._style.magFilter;
  }
  set magFilter(e) {
    this._style.magFilter = e;
  }
  /** Specifies the sampling behavior when the sample footprint is larger than one texel. */
  get minFilter() {
    return this._style.minFilter;
  }
  set minFilter(e) {
    this._style.minFilter = e;
  }
  /** Specifies behavior for sampling between mipmap levels. */
  get mipmapFilter() {
    return this._style.mipmapFilter;
  }
  set mipmapFilter(e) {
    this._style.mipmapFilter = e;
  }
  /** Specifies the minimum and maximum levels of detail, respectively, used internally when sampling a texture. */
  get lodMinClamp() {
    return this._style.lodMinClamp;
  }
  set lodMinClamp(e) {
    this._style.lodMinClamp = e;
  }
  /** Specifies the minimum and maximum levels of detail, respectively, used internally when sampling a texture. */
  get lodMaxClamp() {
    return this._style.lodMaxClamp;
  }
  set lodMaxClamp(e) {
    this._style.lodMaxClamp = e;
  }
  _onStyleChange() {
    this.emit("styleChange", this);
  }
  /** call this if you have modified the texture outside of the constructor */
  update() {
    if (this.resource) {
      const e = this._resolution;
      if (this.resize(this.resourceWidth / e, this.resourceHeight / e))
        return;
    }
    this.emit("update", this);
  }
  /** Destroys this texture source */
  destroy() {
    this.destroyed = !0, this.emit("destroy", this), this.emit("change", this), this._style && (this._style.destroy(), this._style = null), this.uploadMethodId = null, this.resource = null, this.removeAllListeners();
  }
  /**
   * This will unload the Texture source from the GPU. This will free up the GPU memory
   * As soon as it is required fore rendering, it will be re-uploaded.
   */
  unload() {
    this._resourceId = s("resource"), this.emit("change", this), this.emit("unload", this);
  }
  /** the width of the resource. This is the REAL pure number, not accounting resolution   */
  get resourceWidth() {
    const { resource: e } = this;
    return e.naturalWidth || e.videoWidth || e.displayWidth || e.width;
  }
  /** the height of the resource. This is the REAL pure number, not accounting resolution */
  get resourceHeight() {
    const { resource: e } = this;
    return e.naturalHeight || e.videoHeight || e.displayHeight || e.height;
  }
  /**
   * the resolution of the texture. Changing this number, will not change the number of pixels in the actual texture
   * but will the size of the texture when rendered.
   *
   * changing the resolution of this texture to 2 for example will make it appear twice as small when rendered (as pixel
   * density will have increased)
   */
  get resolution() {
    return this._resolution;
  }
  set resolution(e) {
    this._resolution !== e && (this._resolution = e, this.width = this.pixelWidth / e, this.height = this.pixelHeight / e);
  }
  /**
   * Resize the texture, this is handy if you want to use the texture as a render texture
   * @param width - the new width of the texture
   * @param height - the new height of the texture
   * @param resolution - the new resolution of the texture
   * @returns - if the texture was resized
   */
  resize(e, i, t) {
    t || (t = this._resolution), e || (e = this.width), i || (i = this.height);
    const h = Math.round(e * t), r = Math.round(i * t);
    return this.width = h / t, this.height = r / t, this._resolution = t, this.pixelWidth === h && this.pixelHeight === r ? !1 : (this._refreshPOT(), this.pixelWidth = h, this.pixelHeight = r, this.emit("resize", this), this._resourceId = s("resource"), this.emit("change", this), !0);
  }
  /**
   * Lets the renderer know that this texture has been updated and its mipmaps should be re-generated.
   * This is only important for RenderTexture instances, as standard Texture instances will have their
   * mipmaps generated on upload. You should call this method after you make any change to the texture
   *
   * The reason for this is is can be quite expensive to update mipmaps for a texture. So by default,
   * We want you, the developer to specify when this action should happen.
   *
   * Generally you don't want to have mipmaps generated on Render targets that are changed every frame,
   */
  updateMipmaps() {
    this.autoGenerateMipmaps && this.mipLevelCount > 1 && this.emit("updateMipmaps", this);
  }
  set wrapMode(e) {
    this._style.wrapMode = e;
  }
  get wrapMode() {
    return this._style.wrapMode;
  }
  set scaleMode(e) {
    this._style.scaleMode = e;
  }
  /** setting this will set magFilter,minFilter and mipmapFilter all at once!  */
  get scaleMode() {
    return this._style.scaleMode;
  }
  /**
   * Refresh check for isPowerOfTwo texture based on size
   * @private
   */
  _refreshPOT() {
    this.isPowerOfTwo = l(this.pixelWidth) && l(this.pixelHeight);
  }
  static test(e) {
    throw new Error("Unimplemented");
  }
};
a.defaultOptions = {
  resolution: 1,
  format: "bgra8unorm",
  alphaMode: "premultiply-alpha-on-upload",
  dimensions: "2d",
  mipLevelCount: 1,
  autoGenerateMipmaps: !1,
  sampleCount: 1,
  antialias: !1,
  autoGarbageCollect: !1
};
let y = a;
export {
  y as TextureSource
};
//# sourceMappingURL=index474.js.map

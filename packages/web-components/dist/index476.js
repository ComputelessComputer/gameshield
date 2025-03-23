import i from "./index157.js";
import { uid as a } from "./index416.js";
import { deprecation as o, v8_0_0 as h } from "./index477.js";
const t = /* @__PURE__ */ Object.create(null);
function m(s) {
  const e = t[s];
  return e === void 0 && (t[s] = a("resource")), e;
}
const r = class d extends i {
  /**
   * @param options - options for the style
   */
  constructor(e = {}) {
    super(), this._resourceType = "textureSampler", this._touched = 0, this._maxAnisotropy = 1, this.destroyed = !1, e = { ...d.defaultOptions, ...e }, this.addressMode = e.addressMode, this.addressModeU = e.addressModeU ?? this.addressModeU, this.addressModeV = e.addressModeV ?? this.addressModeV, this.addressModeW = e.addressModeW ?? this.addressModeW, this.scaleMode = e.scaleMode, this.magFilter = e.magFilter ?? this.magFilter, this.minFilter = e.minFilter ?? this.minFilter, this.mipmapFilter = e.mipmapFilter ?? this.mipmapFilter, this.lodMinClamp = e.lodMinClamp, this.lodMaxClamp = e.lodMaxClamp, this.compare = e.compare, this.maxAnisotropy = e.maxAnisotropy ?? 1;
  }
  set addressMode(e) {
    this.addressModeU = e, this.addressModeV = e, this.addressModeW = e;
  }
  /** setting this will set wrapModeU,wrapModeV and wrapModeW all at once! */
  get addressMode() {
    return this.addressModeU;
  }
  set wrapMode(e) {
    o(h, "TextureStyle.wrapMode is now TextureStyle.addressMode"), this.addressMode = e;
  }
  get wrapMode() {
    return this.addressMode;
  }
  set scaleMode(e) {
    this.magFilter = e, this.minFilter = e, this.mipmapFilter = e;
  }
  /** setting this will set magFilter,minFilter and mipmapFilter all at once!  */
  get scaleMode() {
    return this.magFilter;
  }
  /** Specifies the maximum anisotropy value clamp used by the sampler. */
  set maxAnisotropy(e) {
    this._maxAnisotropy = Math.min(e, 16), this._maxAnisotropy > 1 && (this.scaleMode = "linear");
  }
  get maxAnisotropy() {
    return this._maxAnisotropy;
  }
  // TODO - move this to WebGL?
  get _resourceId() {
    return this._sharedResourceId || this._generateResourceId();
  }
  update() {
    this.emit("change", this), this._sharedResourceId = null;
  }
  _generateResourceId() {
    const e = `${this.addressModeU}-${this.addressModeV}-${this.addressModeW}-${this.magFilter}-${this.minFilter}-${this.mipmapFilter}-${this.lodMinClamp}-${this.lodMaxClamp}-${this.compare}-${this._maxAnisotropy}`;
    return this._sharedResourceId = m(e), this._resourceId;
  }
  /** Destroys the style */
  destroy() {
    this.destroyed = !0, this.emit("destroy", this), this.emit("change", this), this.removeAllListeners();
  }
};
r.defaultOptions = {
  addressMode: "clamp-to-edge",
  scaleMode: "linear"
};
let n = r;
export {
  n as TextureStyle
};
//# sourceMappingURL=index476.js.map

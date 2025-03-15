import { TARGETS as l } from "./index164.js";
import { AbstractMultiResource as a } from "./index248.js";
const n = class h extends a {
  /**
   * @param {Array<string|PIXI.Resource>} [source] - Collection of URLs or resources
   *        to use as the sides of the cube.
   * @param options - ImageResource options
   * @param {number} [options.width] - Width of resource
   * @param {number} [options.height] - Height of resource
   * @param {number} [options.autoLoad=true] - Whether to auto-load resources
   * @param {number} [options.linkBaseTexture=true] - In case BaseTextures are supplied,
   *   whether to copy them or use
   */
  constructor(t, r) {
    const { width: i, height: o, autoLoad: e, linkBaseTexture: s } = r || {};
    if (t && t.length !== h.SIDES)
      throw new Error(`Invalid length. Got ${t.length}, expected 6`);
    super(6, { width: i, height: o });
    for (let d = 0; d < h.SIDES; d++)
      this.items[d].target = l.TEXTURE_CUBE_MAP_POSITIVE_X + d;
    this.linkBaseTexture = s !== !1, t && this.initFromArray(t, r), e !== !1 && this.load();
  }
  /**
   * Add binding.
   * @param baseTexture - parent base texture
   */
  bind(t) {
    super.bind(t), t.target = l.TEXTURE_CUBE_MAP;
  }
  addBaseTextureAt(t, r, i) {
    if (i === void 0 && (i = this.linkBaseTexture), !this.items[r])
      throw new Error(`Index ${r} is out of bounds`);
    if (!this.linkBaseTexture || t.parentTextureArray || Object.keys(t._glTextures).length > 0)
      if (t.resource)
        this.addResourceAt(t.resource, r);
      else
        throw new Error("CubeResource does not support copying of renderTexture.");
    else
      t.target = l.TEXTURE_CUBE_MAP_POSITIVE_X + r, t.parentTextureArray = this.baseTexture, this.items[r] = t;
    return t.valid && !this.valid && this.resize(t.realWidth, t.realHeight), this.items[r] = t, this;
  }
  /**
   * Upload the resource
   * @param renderer
   * @param _baseTexture
   * @param glTexture
   * @returns {boolean} true is success
   */
  upload(t, r, i) {
    const o = this.itemDirtyIds;
    for (let e = 0; e < h.SIDES; e++) {
      const s = this.items[e];
      (o[e] < s.dirtyId || i.dirtyId < r.dirtyId) && (s.valid && s.resource ? (s.resource.upload(t, s, i), o[e] = s.dirtyId) : o[e] < -1 && (t.gl.texImage2D(
        s.target,
        0,
        i.internalFormat,
        r.realWidth,
        r.realHeight,
        0,
        r.format,
        i.type,
        null
      ), o[e] = -1));
    }
    return !0;
  }
  /**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @returns {boolean} `true` if source is an array of 6 elements
   */
  static test(t) {
    return Array.isArray(t) && t.length === h.SIDES;
  }
};
n.SIDES = 6;
let I = n;
export {
  I as CubeResource
};
//# sourceMappingURL=index79.js.map

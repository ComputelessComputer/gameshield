import { TARGETS as a } from "./index164.js";
import { AbstractMultiResource as A } from "./index248.js";
class m extends A {
  /**
   * @param source - Number of items in array or the collection
   *        of image URLs to use. Can also be resources, image elements, canvas, etc.
   * @param options - Options to apply to {@link PIXI.autoDetectResource}
   * @param {number} [options.width] - Width of the resource
   * @param {number} [options.height] - Height of the resource
   */
  constructor(r, t) {
    const { width: e, height: h } = t || {};
    let i, d;
    Array.isArray(r) ? (i = r, d = r.length) : d = r, super(d, { width: e, height: h }), i && this.initFromArray(i, t);
  }
  /**
   * Set a baseTexture by ID,
   * ArrayResource just takes resource from it, nothing more
   * @param baseTexture
   * @param index - Zero-based index of resource to set
   * @returns - Instance for chaining
   */
  addBaseTextureAt(r, t) {
    if (r.resource)
      this.addResourceAt(r.resource, t);
    else
      throw new Error("ArrayResource does not support RenderTexture");
    return this;
  }
  /**
   * Add binding
   * @param baseTexture
   */
  bind(r) {
    super.bind(r), r.target = a.TEXTURE_2D_ARRAY;
  }
  /**
   * Upload the resources to the GPU.
   * @param renderer
   * @param texture
   * @param glTexture
   * @returns - whether texture was uploaded
   */
  upload(r, t, e) {
    const { length: h, itemDirtyIds: i, items: d } = this, { gl: n } = r;
    e.dirtyId < 0 && n.texImage3D(
      n.TEXTURE_2D_ARRAY,
      0,
      e.internalFormat,
      this._width,
      this._height,
      h,
      0,
      t.format,
      e.type,
      null
    );
    for (let s = 0; s < h; s++) {
      const o = d[s];
      i[s] < o.dirtyId && (i[s] = o.dirtyId, o.valid && n.texSubImage3D(
        n.TEXTURE_2D_ARRAY,
        0,
        0,
        // xoffset
        0,
        // yoffset
        s,
        // zoffset
        o.resource.width,
        o.resource.height,
        1,
        t.format,
        e.type,
        o.resource.source
      ));
    }
    return !0;
  }
}
export {
  m as ArrayResource
};
//# sourceMappingURL=index239.js.map

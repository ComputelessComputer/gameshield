import { BaseTexture as l } from "./index51.js";
import { autoDetectResource as a } from "./index248.js";
import { Resource as r } from "./index249.js";
class p extends r {
  /**
   * @param length
   * @param options - Options to for Resource constructor
   * @param {number} [options.width] - Width of the resource
   * @param {number} [options.height] - Height of the resource
   */
  constructor(t, i) {
    const { width: e, height: h } = i || {};
    super(e, h), this.items = [], this.itemDirtyIds = [];
    for (let s = 0; s < t; s++) {
      const o = new l();
      this.items.push(o), this.itemDirtyIds.push(-2);
    }
    this.length = t, this._load = null, this.baseTexture = null;
  }
  /**
   * Used from ArrayResource and CubeResource constructors.
   * @param resources - Can be resources, image elements, canvas, etc. ,
   *  length should be same as constructor length
   * @param options - Detect options for resources
   */
  initFromArray(t, i) {
    for (let e = 0; e < this.length; e++)
      t[e] && (t[e].castToBaseTexture ? this.addBaseTextureAt(t[e].castToBaseTexture(), e) : t[e] instanceof r ? this.addResourceAt(t[e], e) : this.addResourceAt(a(t[e], i), e));
  }
  /** Destroy this BaseImageResource. */
  dispose() {
    for (let t = 0, i = this.length; t < i; t++)
      this.items[t].destroy();
    this.items = null, this.itemDirtyIds = null, this._load = null;
  }
  /**
   * Set a resource by ID
   * @param resource
   * @param index - Zero-based index of resource to set
   * @returns - Instance for chaining
   */
  addResourceAt(t, i) {
    if (!this.items[i])
      throw new Error(`Index ${i} is out of bounds`);
    return t.valid && !this.valid && this.resize(t.width, t.height), this.items[i].setResource(t), this;
  }
  /**
   * Set the parent base texture.
   * @param baseTexture
   */
  bind(t) {
    if (this.baseTexture !== null)
      throw new Error("Only one base texture per TextureArray is allowed");
    super.bind(t);
    for (let i = 0; i < this.length; i++)
      this.items[i].parentTextureArray = t, this.items[i].on("update", t.update, t);
  }
  /**
   * Unset the parent base texture.
   * @param baseTexture
   */
  unbind(t) {
    super.unbind(t);
    for (let i = 0; i < this.length; i++)
      this.items[i].parentTextureArray = null, this.items[i].off("update", t.update, t);
  }
  /**
   * Load all the resources simultaneously
   * @returns - When load is resolved
   */
  load() {
    if (this._load)
      return this._load;
    const t = this.items.map((i) => i.resource).filter((i) => i).map((i) => i.load());
    return this._load = Promise.all(t).then(
      () => {
        const { realWidth: i, realHeight: e } = this.items[0];
        return this.resize(i, e), this.update(), Promise.resolve(this);
      }
    ), this._load;
  }
}
export {
  p as AbstractMultiResource
};
//# sourceMappingURL=index260.js.map

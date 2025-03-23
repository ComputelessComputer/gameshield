import { deprecation as t } from "./index477.js";
const s = {
  /**
   * Is this container cached as a texture?
   * @readonly
   * @type {boolean}
   * @memberof scene.Container#
   */
  get isCachedAsTexture() {
    var e;
    return !!((e = this.renderGroup) != null && e.isCachedAsTexture);
  },
  cacheAsTexture(e) {
    typeof e == "boolean" && e === !1 ? this.disableRenderGroup() : (this.enableRenderGroup(), this.renderGroup.enableCacheAsTexture(e === !0 ? {} : e));
  },
  /**
   * Updates the cached texture. Will flag that this container's cached texture needs to be redrawn.
   * This will happen on the next render.
   * @memberof scene.Container#
   */
  updateCacheTexture() {
    var e;
    (e = this.renderGroup) == null || e.updateCacheTexture();
  },
  /**
   * Allows backwards compatibility with pixi.js below version v8. Use `cacheAsTexture` instead.
   * @deprecated
   */
  get cacheAsBitmap() {
    return this.isCachedAsTexture;
  },
  /**
   * @deprecated
   */
  set cacheAsBitmap(e) {
    t("v8.6.0", "cacheAsBitmap is deprecated, use cacheAsTexture instead."), this.cacheAsTexture(e);
  }
};
export {
  s as cacheAsTextureMixin
};
//# sourceMappingURL=index484.js.map

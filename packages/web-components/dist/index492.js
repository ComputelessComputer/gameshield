import { Matrix as i } from "./index393.js";
import { Bounds as t } from "./index399.js";
import { getGlobalBounds as n } from "./index447.js";
import { getLocalBounds as o } from "./index448.js";
import { checkChildrenDidChange as d } from "./index493.js";
const h = new i(), B = {
  _localBoundsCacheId: -1,
  _localBoundsCacheData: null,
  _setWidth(a, s) {
    const e = Math.sign(this.scale.x) || 1;
    s !== 0 ? this.scale.x = a / s * e : this.scale.x = e;
  },
  _setHeight(a, s) {
    const e = Math.sign(this.scale.y) || 1;
    s !== 0 ? this.scale.y = a / s * e : this.scale.y = e;
  },
  /**
   * Retrieves the local bounds of the container as a Bounds object.
   * @returns - The bounding area.
   * @memberof scene.Container#
   */
  getLocalBounds() {
    this._localBoundsCacheData || (this._localBoundsCacheData = {
      data: [],
      index: 1,
      didChange: !1,
      localBounds: new t()
    });
    const a = this._localBoundsCacheData;
    return a.index = 1, a.didChange = !1, a.data[0] !== this._didViewChangeTick && (a.didChange = !0, a.data[0] = this._didViewChangeTick), d(this, a), a.didChange && o(this, a.localBounds, h), a.localBounds;
  },
  /**
   * Calculates and returns the (world) bounds of the display object as a [Rectangle]{@link Rectangle}.
   * @param skipUpdate - Setting to `true` will stop the transforms of the scene graph from
   *  being updated. This means the calculation returned MAY be out of date BUT will give you a
   *  nice performance boost.
   * @param bounds - Optional bounds to store the result of the bounds calculation.
   * @returns - The minimum axis-aligned rectangle in world space that fits around this object.
   * @memberof scene.Container#
   */
  getBounds(a, s) {
    return n(this, a, s || new t());
  }
};
export {
  B as measureMixin
};
//# sourceMappingURL=index492.js.map

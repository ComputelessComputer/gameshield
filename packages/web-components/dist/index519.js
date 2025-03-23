import { Bounds as h } from "./index399.js";
import { Container as l } from "./index148.js";
class c extends l {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(e) {
    super(e), this.canBundle = !0, this.allowChildren = !1, this._roundPixels = 0, this._lastUsed = -1, this._bounds = new h(0, 1, 0, 0), this._boundsDirty = !0;
  }
  /**
   * The local bounds of the view.
   * @type {rendering.Bounds}
   */
  get bounds() {
    return this._boundsDirty ? (this.updateBounds(), this._boundsDirty = !1, this._bounds) : this._bounds;
  }
  /**
   * Whether or not to round the x/y position of the sprite.
   * @type {boolean}
   */
  get roundPixels() {
    return !!this._roundPixels;
  }
  set roundPixels(e) {
    this._roundPixels = e ? 1 : 0;
  }
  /**
   * Checks if the object contains the given point.
   * @param point - The point to check
   */
  containsPoint(e) {
    const t = this.bounds, { x: i, y: s } = e;
    return i >= t.minX && i <= t.maxX && s >= t.minY && s <= t.maxY;
  }
  /** @private */
  onViewUpdate() {
    if (this._didViewChangeTick++, this._boundsDirty = !0, this.didViewUpdate)
      return;
    this.didViewUpdate = !0;
    const e = this.renderGroup || this.parentRenderGroup;
    e && e.onChildViewUpdate(this);
  }
  destroy(e) {
    super.destroy(e), this._bounds = null;
  }
  collectRenderablesSimple(e, t, i) {
    const { renderPipes: s, renderableGC: r } = t;
    s.blendMode.setBlendMode(this, this.groupBlendMode, e), s[this.renderPipeId].addRenderable(this, e), r.addRenderable(this), this.didViewUpdate = !1;
    const d = this.children, o = d.length;
    for (let n = 0; n < o; n++)
      d[n].collectRenderables(e, t, i);
  }
}
export {
  c as ViewContainer
};
//# sourceMappingURL=index519.js.map

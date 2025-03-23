import { FilterEffect as i } from "./index390.js";
import { MaskEffectManager as c } from "./index445.js";
const m = {
  _maskEffect: null,
  _maskOptions: {
    inverse: !1
  },
  _filterEffect: null,
  /**
   * @todo Needs docs.
   * @memberof scene.Container#
   * @type {Array<Effect>}
   */
  effects: [],
  _markStructureAsChanged() {
    const t = this.renderGroup || this.parentRenderGroup;
    t && (t.structureDidChange = !0);
  },
  /**
   * @todo Needs docs.
   * @param effect - The effect to add.
   * @memberof scene.Container#
   * @ignore
   */
  addEffect(t) {
    this.effects.indexOf(t) === -1 && (this.effects.push(t), this.effects.sort((s, f) => s.priority - f.priority), this._markStructureAsChanged(), this._updateIsSimple());
  },
  /**
   * @todo Needs docs.
   * @param effect - The effect to remove.
   * @memberof scene.Container#
   * @ignore
   */
  removeEffect(t) {
    const e = this.effects.indexOf(t);
    e !== -1 && (this.effects.splice(e, 1), this._markStructureAsChanged(), this._updateIsSimple());
  },
  set mask(t) {
    const e = this._maskEffect;
    (e == null ? void 0 : e.mask) !== t && (e && (this.removeEffect(e), c.returnMaskEffect(e), this._maskEffect = null), t != null && (this._maskEffect = c.getMaskEffect(t), this.addEffect(this._maskEffect)));
  },
  /**
   * Used to set mask and control mask options.
   * @param options
   * @example
   * import { Graphics, Sprite } from 'pixi.js';
   *
   * const graphics = new Graphics();
   * graphics.beginFill(0xFF3300);
   * graphics.drawRect(50, 250, 100, 100);
   * graphics.endFill();
   *
   * const sprite = new Sprite(texture);
   * sprite.setMask({
   *     mask: graphics,
   *     inverse: true,
   * });
   * @memberof scene.Container#
   */
  setMask(t) {
    this._maskOptions = {
      ...this._maskOptions,
      ...t
    }, t.mask && (this.mask = t.mask), this._markStructureAsChanged();
  },
  /**
   * Sets a mask for the displayObject. A mask is an object that limits the visibility of an
   * object to the shape of the mask applied to it. In PixiJS a regular mask must be a
   * {@link Graphics} or a {@link Sprite} object. This allows for much faster masking in canvas as it
   * utilities shape clipping. Furthermore, a mask of an object must be in the subtree of its parent.
   * Otherwise, `getLocalBounds` may calculate incorrect bounds, which makes the container's width and height wrong.
   * To remove a mask, set this property to `null`.
   *
   * For sprite mask both alpha and red channel are used. Black mask is the same as transparent mask.
   * @example
   * import { Graphics, Sprite } from 'pixi.js';
   *
   * const graphics = new Graphics();
   * graphics.beginFill(0xFF3300);
   * graphics.drawRect(50, 250, 100, 100);
   * graphics.endFill();
   *
   * const sprite = new Sprite(texture);
   * sprite.mask = graphics;
   * @memberof scene.Container#
   */
  get mask() {
    var t;
    return (t = this._maskEffect) == null ? void 0 : t.mask;
  },
  set filters(t) {
    var r;
    !Array.isArray(t) && t && (t = [t]);
    const e = this._filterEffect || (this._filterEffect = new i());
    t = t;
    const s = (t == null ? void 0 : t.length) > 0, f = ((r = e.filters) == null ? void 0 : r.length) > 0, n = s !== f;
    t = Array.isArray(t) ? t.slice(0) : t, e.filters = Object.freeze(t), n && (s ? this.addEffect(e) : (this.removeEffect(e), e.filters = t ?? null));
  },
  /**
   * Sets the filters for the displayObject.
   * IMPORTANT: This is a WebGL only feature and will be ignored by the canvas renderer.
   * To remove filters simply set this property to `'null'`.
   * @memberof scene.Container#
   */
  get filters() {
    var t;
    return (t = this._filterEffect) == null ? void 0 : t.filters;
  },
  set filterArea(t) {
    this._filterEffect || (this._filterEffect = new i()), this._filterEffect.filterArea = t;
  },
  /**
   * The area the filter is applied to. This is used as more of an optimization
   * rather than figuring out the dimensions of the displayObject each frame you can set this rectangle.
   *
   * Also works as an interaction mask.
   * @memberof scene.Container#
   */
  get filterArea() {
    var t;
    return (t = this._filterEffect) == null ? void 0 : t.filterArea;
  }
};
export {
  m as effectsMixin
};
//# sourceMappingURL=index487.js.map

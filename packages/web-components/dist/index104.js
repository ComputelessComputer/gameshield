import "./index23.js";
import "./index24.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import { Rectangle as a } from "./index28.js";
import "./index29.js";
import "./index30.js";
import "./index31.js";
import "./index32.js";
import "./index33.js";
import { Transform as u } from "./index34.js";
import { RAD_TO_DEG as d, DEG_TO_RAD as c } from "./index240.js";
import "./index35.js";
import "./index36.js";
import "./index37.js";
import "./index38.js";
import "./index39.js";
import "./index40.js";
import f from "./index41.js";
import "./index42.js";
import "./index43.js";
import "./index44.js";
import "./index45.js";
import "./index46.js";
import "./index47.js";
import "./index48.js";
import "./index49.js";
import "./index50.js";
import "./index51.js";
import "./index52.js";
import "./index53.js";
import "./index54.js";
import "./index55.js";
import "./index56.js";
import "./index57.js";
import "./index58.js";
import "./index59.js";
import "./index60.js";
import "./index61.js";
import "./index62.js";
import "./index63.js";
import "./index64.js";
import "./index65.js";
import "./index66.js";
import "./index67.js";
import "./index68.js";
import "./index69.js";
import "./index70.js";
import "./index71.js";
import "./index72.js";
import "./index73.js";
import "./index74.js";
import "./index75.js";
import "./index76.js";
import "./index77.js";
import "./index78.js";
import "./index79.js";
import "./index80.js";
import "./index81.js";
import { Bounds as p } from "./index239.js";
class e extends f {
  constructor() {
    super(), this.tempDisplayObjectParent = null, this.transform = new u(), this.alpha = 1, this.visible = !0, this.renderable = !0, this.cullable = !1, this.cullArea = null, this.parent = null, this.worldAlpha = 1, this._lastSortedIndex = 0, this._zIndex = 0, this.filterArea = null, this.filters = null, this._enabledFilters = null, this._bounds = new p(), this._localBounds = null, this._boundsID = 0, this._boundsRect = null, this._localBoundsRect = null, this._mask = null, this._maskRefCount = 0, this._destroyed = !1, this.isSprite = !1, this.isMask = !1;
  }
  /**
   * Mixes all enumerable properties and methods from a source object to DisplayObject.
   * @param source - The source of properties and methods to mix in.
   */
  static mixin(t) {
    const s = Object.keys(t);
    for (let r = 0; r < s.length; ++r) {
      const i = s[r];
      Object.defineProperty(
        e.prototype,
        i,
        Object.getOwnPropertyDescriptor(t, i)
      );
    }
  }
  /**
   * Fired when this DisplayObject is added to a Container.
   * @instance
   * @event added
   * @param {PIXI.Container} container - The container added to.
   */
  /**
   * Fired when this DisplayObject is removed from a Container.
   * @instance
   * @event removed
   * @param {PIXI.Container} container - The container removed from.
   */
  /**
   * Fired when this DisplayObject is destroyed. This event is emitted once
   * destroy is finished.
   * @instance
   * @event destroyed
   */
  /** Readonly flag for destroyed display objects. */
  get destroyed() {
    return this._destroyed;
  }
  /** Recursively updates transform of all objects from the root to this one internal function for toLocal() */
  _recursivePostUpdateTransform() {
    this.parent ? (this.parent._recursivePostUpdateTransform(), this.transform.updateTransform(this.parent.transform)) : this.transform.updateTransform(this._tempDisplayObjectParent.transform);
  }
  /** Updates the object transform for rendering. TODO - Optimization pass! */
  updateTransform() {
    this._boundsID++, this.transform.updateTransform(this.parent.transform), this.worldAlpha = this.alpha * this.parent.worldAlpha;
  }
  /**
   * Calculates and returns the (world) bounds of the display object as a [Rectangle]{@link PIXI.Rectangle}.
   *
   * This method is expensive on containers with a large subtree (like the stage). This is because the bounds
   * of a container depend on its children's bounds, which recursively causes all bounds in the subtree to
   * be recalculated. The upside, however, is that calling `getBounds` once on a container will indeed update
   * the bounds of all children (the whole subtree, in fact). This side effect should be exploited by using
   * `displayObject._bounds.getRectangle()` when traversing through all the bounds in a scene graph. Otherwise,
   * calling `getBounds` on each object in a subtree will cause the total cost to increase quadratically as
   * its height increases.
   *
   * The transforms of all objects in a container's **subtree** and of all **ancestors** are updated.
   * The world bounds of all display objects in a container's **subtree** will also be recalculated.
   *
   * The `_bounds` object stores the last calculation of the bounds. You can use to entirely skip bounds
   * calculation if needed.
   *
   * ```js
   * const lastCalculatedBounds = displayObject._bounds.getRectangle(optionalRect);
   * ```
   *
   * Do know that usage of `getLocalBounds` can corrupt the `_bounds` of children (the whole subtree, actually). This
   * is a known issue that has not been solved. See [getLocalBounds]{@link PIXI.DisplayObject#getLocalBounds} for more
   * details.
   *
   * `getBounds` should be called with `skipUpdate` equal to `true` in a render() call. This is because the transforms
   * are guaranteed to be update-to-date. In fact, recalculating inside a render() call may cause corruption in certain
   * cases.
   * @param skipUpdate - Setting to `true` will stop the transforms of the scene graph from
   *  being updated. This means the calculation returned MAY be out of date BUT will give you a
   *  nice performance boost.
   * @param rect - Optional rectangle to store the result of the bounds calculation.
   * @returns - The minimum axis-aligned rectangle in world space that fits around this object.
   */
  getBounds(t, s) {
    return t || (this.parent ? (this._recursivePostUpdateTransform(), this.updateTransform()) : (this.parent = this._tempDisplayObjectParent, this.updateTransform(), this.parent = null)), this._bounds.updateID !== this._boundsID && (this.calculateBounds(), this._bounds.updateID = this._boundsID), s || (this._boundsRect || (this._boundsRect = new a()), s = this._boundsRect), this._bounds.getRectangle(s);
  }
  /**
   * Retrieves the local bounds of the displayObject as a rectangle object.
   * @param rect - Optional rectangle to store the result of the bounds calculation.
   * @returns - The rectangular bounding area.
   */
  getLocalBounds(t) {
    t || (this._localBoundsRect || (this._localBoundsRect = new a()), t = this._localBoundsRect), this._localBounds || (this._localBounds = new p());
    const s = this.transform, r = this.parent;
    this.parent = null, this._tempDisplayObjectParent.worldAlpha = (r == null ? void 0 : r.worldAlpha) ?? 1, this.transform = this._tempDisplayObjectParent.transform;
    const i = this._bounds, o = this._boundsID;
    this._bounds = this._localBounds;
    const n = this.getBounds(!1, t);
    return this.parent = r, this.transform = s, this._bounds = i, this._bounds.updateID += this._boundsID - o, n;
  }
  /**
   * Calculates the global position of the display object.
   * @param position - The world origin to calculate from.
   * @param point - A Point object in which to store the value, optional
   *  (otherwise will create a new Point).
   * @param skipUpdate - Should we skip the update transform.
   * @returns - A point object representing the position of this object.
   */
  toGlobal(t, s, r = !1) {
    return r || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.apply(t, s);
  }
  /**
   * Calculates the local position of the display object relative to another point.
   * @param position - The world origin to calculate from.
   * @param from - The DisplayObject to calculate the global position from.
   * @param point - A Point object in which to store the value, optional
   *  (otherwise will create a new Point).
   * @param skipUpdate - Should we skip the update transform
   * @returns - A point object representing the position of this object
   */
  toLocal(t, s, r, i) {
    return s && (t = s.toGlobal(t, r, i)), i || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.applyInverse(t, r);
  }
  /**
   * Set the parent Container of this DisplayObject.
   * @param container - The Container to add this DisplayObject to.
   * @returns - The Container that this DisplayObject was added to.
   */
  setParent(t) {
    if (!t || !t.addChild)
      throw new Error("setParent: Argument must be a Container");
    return t.addChild(this), t;
  }
  /** Remove the DisplayObject from its parent Container. If the DisplayObject has no parent, do nothing. */
  removeFromParent() {
    var t;
    (t = this.parent) == null || t.removeChild(this);
  }
  /**
   * Convenience function to set the position, scale, skew and pivot at once.
   * @param x - The X position
   * @param y - The Y position
   * @param scaleX - The X scale value
   * @param scaleY - The Y scale value
   * @param rotation - The rotation
   * @param skewX - The X skew value
   * @param skewY - The Y skew value
   * @param pivotX - The X pivot value
   * @param pivotY - The Y pivot value
   * @returns - The DisplayObject instance
   */
  setTransform(t = 0, s = 0, r = 1, i = 1, o = 0, n = 0, m = 0, h = 0, l = 0) {
    return this.position.x = t, this.position.y = s, this.scale.x = r || 1, this.scale.y = i || 1, this.rotation = o, this.skew.x = n, this.skew.y = m, this.pivot.x = h, this.pivot.y = l, this;
  }
  /**
   * Base destroy method for generic display objects. This will automatically
   * remove the display object from its parent Container as well as remove
   * all current event listeners and internal references. Do not use a DisplayObject
   * after calling `destroy()`.
   * @param _options
   */
  destroy(t) {
    this.removeFromParent(), this._destroyed = !0, this.transform = null, this.parent = null, this._bounds = null, this.mask = null, this.cullArea = null, this.filters = null, this.filterArea = null, this.hitArea = null, this.eventMode = "auto", this.interactiveChildren = !1, this.emit("destroyed"), this.removeAllListeners();
  }
  /**
   * @protected
   * @member {PIXI.Container}
   */
  get _tempDisplayObjectParent() {
    return this.tempDisplayObjectParent === null && (this.tempDisplayObjectParent = new _()), this.tempDisplayObjectParent;
  }
  /**
   * Used in Renderer, cacheAsBitmap and other places where you call an `updateTransform` on root.
   *
   * ```js
   * const cacheParent = elem.enableTempParent();
   * elem.updateTransform();
   * elem.disableTempParent(cacheParent);
   * ```
   * @returns - Current parent
   */
  enableTempParent() {
    const t = this.parent;
    return this.parent = this._tempDisplayObjectParent, t;
  }
  /**
   * Pair method for `enableTempParent`
   * @param cacheParent - Actual parent of element
   */
  disableTempParent(t) {
    this.parent = t;
  }
  /**
   * The position of the displayObject on the x axis relative to the local coordinates of the parent.
   * An alias to position.x
   */
  get x() {
    return this.position.x;
  }
  set x(t) {
    this.transform.position.x = t;
  }
  /**
   * The position of the displayObject on the y axis relative to the local coordinates of the parent.
   * An alias to position.y
   */
  get y() {
    return this.position.y;
  }
  set y(t) {
    this.transform.position.y = t;
  }
  /**
   * Current transform of the object based on world (parent) factors.
   * @readonly
   */
  get worldTransform() {
    return this.transform.worldTransform;
  }
  /**
   * Current transform of the object based on local factors: position, scale, other stuff.
   * @readonly
   */
  get localTransform() {
    return this.transform.localTransform;
  }
  /**
   * The coordinate of the object relative to the local coordinates of the parent.
   * @since 4.0.0
   */
  get position() {
    return this.transform.position;
  }
  set position(t) {
    this.transform.position.copyFrom(t);
  }
  /**
   * The scale factors of this object along the local coordinate axes.
   *
   * The default scale is (1, 1).
   * @since 4.0.0
   */
  get scale() {
    return this.transform.scale;
  }
  set scale(t) {
    this.transform.scale.copyFrom(t);
  }
  /**
   * The center of rotation, scaling, and skewing for this display object in its local space. The `position`
   * is the projection of `pivot` in the parent's local space.
   *
   * By default, the pivot is the origin (0, 0).
   * @since 4.0.0
   */
  get pivot() {
    return this.transform.pivot;
  }
  set pivot(t) {
    this.transform.pivot.copyFrom(t);
  }
  /**
   * The skew factor for the object in radians.
   * @since 4.0.0
   */
  get skew() {
    return this.transform.skew;
  }
  set skew(t) {
    this.transform.skew.copyFrom(t);
  }
  /**
   * The rotation of the object in radians.
   * 'rotation' and 'angle' have the same effect on a display object; rotation is in radians, angle is in degrees.
   */
  get rotation() {
    return this.transform.rotation;
  }
  set rotation(t) {
    this.transform.rotation = t;
  }
  /**
   * The angle of the object in degrees.
   * 'rotation' and 'angle' have the same effect on a display object; rotation is in radians, angle is in degrees.
   */
  get angle() {
    return this.transform.rotation * d;
  }
  set angle(t) {
    this.transform.rotation = t * c;
  }
  /**
   * The zIndex of the displayObject.
   *
   * If a container has the sortableChildren property set to true, children will be automatically
   * sorted by zIndex value; a higher value will mean it will be moved towards the end of the array,
   * and thus rendered on top of other display objects within the same container.
   * @see PIXI.Container#sortableChildren
   */
  get zIndex() {
    return this._zIndex;
  }
  set zIndex(t) {
    this._zIndex !== t && (this._zIndex = t, this.parent && (this.parent.sortDirty = !0));
  }
  /**
   * Indicates if the object is globally visible.
   * @readonly
   */
  get worldVisible() {
    let t = this;
    do {
      if (!t.visible)
        return !1;
      t = t.parent;
    } while (t);
    return !0;
  }
  /**
   * Sets a mask for the displayObject. A mask is an object that limits the visibility of an
   * object to the shape of the mask applied to it. In PixiJS a regular mask must be a
   * {@link PIXI.Graphics} or a {@link PIXI.Sprite} object. This allows for much faster masking in canvas as it
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
   * @todo At the moment, CanvasRenderer doesn't support Sprite as mask.
   */
  get mask() {
    return this._mask;
  }
  set mask(t) {
    if (this._mask !== t) {
      if (this._mask) {
        const s = this._mask.isMaskData ? this._mask.maskObject : this._mask;
        s && (s._maskRefCount--, s._maskRefCount === 0 && (s.renderable = !0, s.isMask = !1));
      }
      if (this._mask = t, this._mask) {
        const s = this._mask.isMaskData ? this._mask.maskObject : this._mask;
        s && (s._maskRefCount === 0 && (s.renderable = !1, s.isMask = !0), s._maskRefCount++);
      }
    }
  }
}
class _ extends e {
  constructor() {
    super(...arguments), this.sortDirty = null;
  }
}
e.prototype.displayObjectUpdateTransform = e.prototype.updateTransform;
export {
  e as DisplayObject,
  _ as TemporaryDisplayObject
};
//# sourceMappingURL=index104.js.map

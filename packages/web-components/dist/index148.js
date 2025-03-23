import w from "./index157.js";
import { Color as x } from "./index377.js";
import { cullingMixin as b } from "./index380.js";
import { extensions as C } from "./index153.js";
import { Matrix as o } from "./index393.js";
import { RAD_TO_DEG as G, DEG_TO_RAD as T } from "./index402.js";
import { ObservablePoint as r } from "./index405.js";
import { uid as k } from "./index416.js";
import { deprecation as _, v8_0_0 as v } from "./index477.js";
import { BigPool as g } from "./index446.js";
import { cacheAsTextureMixin as M } from "./index484.js";
import { childrenHelperMixin as R } from "./index485.js";
import { collectRenderablesMixin as D } from "./index486.js";
import { effectsMixin as S } from "./index487.js";
import { findMixin as B } from "./index488.js";
import { getFastGlobalBoundsMixin as F } from "./index489.js";
import { bgr2rgb as I, getGlobalMixin as L } from "./index490.js";
import { measureMixin as A } from "./index492.js";
import { onRenderMixin as E } from "./index494.js";
import { sortMixin as U } from "./index495.js";
import { toLocalGlobalMixin as O } from "./index496.js";
import { RenderGroup as V } from "./index497.js";
import { assignWithIgnore as P } from "./index498.js";
const n = new r(null), a = new r(null), l = new r(null, 1, 1), y = 1, Y = 2, d = 4;
class p extends w {
  constructor(t = {}) {
    var i, e;
    super(), this.uid = k("renderable"), this._updateFlags = 15, this.renderGroup = null, this.parentRenderGroup = null, this.parentRenderGroupIndex = 0, this.didChange = !1, this.didViewUpdate = !1, this.relativeRenderGroupDepth = 0, this.children = [], this.parent = null, this.includeInBuild = !0, this.measurable = !0, this.isSimple = !0, this.updateTick = -1, this.localTransform = new o(), this.relativeGroupTransform = new o(), this.groupTransform = this.relativeGroupTransform, this.destroyed = !1, this._position = new r(this, 0, 0), this._scale = l, this._pivot = a, this._skew = n, this._cx = 1, this._sx = 0, this._cy = 0, this._sy = 1, this._rotation = 0, this.localColor = 16777215, this.localAlpha = 1, this.groupAlpha = 1, this.groupColor = 16777215, this.groupColorAlpha = 4294967295, this.localBlendMode = "inherit", this.groupBlendMode = "normal", this.localDisplayStatus = 7, this.globalDisplayStatus = 7, this._didContainerChangeTick = 0, this._didViewChangeTick = 0, this._didLocalTransformChangeId = -1, this.effects = [], P(this, t, {
      children: !0,
      parent: !0,
      effects: !0
    }), (i = t.children) == null || i.forEach((s) => this.addChild(s)), (e = t.parent) == null || e.addChild(this);
  }
  /**
   * Mixes all enumerable properties and methods from a source object to Container.
   * @param source - The source of properties and methods to mix in.
   * @deprecated since 8.8.0
   */
  static mixin(t) {
    _("8.8.0", "Container.mixin is deprecated, please use extensions.mixin instead."), C.mixin(p, t);
  }
  // = 'default';
  /**
   * We now use the _didContainerChangeTick and _didViewChangeTick to track changes
   * @deprecated since 8.2.6
   * @ignore
   */
  set _didChangeId(t) {
    this._didViewChangeTick = t >> 12 & 4095, this._didContainerChangeTick = t & 4095;
  }
  get _didChangeId() {
    return this._didContainerChangeTick & 4095 | (this._didViewChangeTick & 4095) << 12;
  }
  /**
   * Adds one or more children to the container.
   *
   * Multiple items can be added like so: `myContainer.addChild(thingOne, thingTwo, thingThree)`
   * @param {...Container} children - The Container(s) to add to the container
   * @returns {Container} - The first child that was added.
   */
  addChild(...t) {
    if (this.allowChildren || _(v, "addChild: Only Containers will be allowed to add children in v8.0.0"), t.length > 1) {
      for (let s = 0; s < t.length; s++)
        this.addChild(t[s]);
      return t[0];
    }
    const i = t[0], e = this.renderGroup || this.parentRenderGroup;
    return i.parent === this ? (this.children.splice(this.children.indexOf(i), 1), this.children.push(i), e && (e.structureDidChange = !0), i) : (i.parent && i.parent.removeChild(i), this.children.push(i), this.sortableChildren && (this.sortDirty = !0), i.parent = this, i.didChange = !0, i._updateFlags = 15, e && e.addChild(i), this.emit("childAdded", i, this, this.children.length - 1), i.emit("added", this), this._didViewChangeTick++, i._zIndex !== 0 && i.depthOfChildModified(), i);
  }
  /**
   * Removes one or more children from the container.
   * @param {...Container} children - The Container(s) to remove
   * @returns {Container} The first child that was removed.
   */
  removeChild(...t) {
    if (t.length > 1) {
      for (let s = 0; s < t.length; s++)
        this.removeChild(t[s]);
      return t[0];
    }
    const i = t[0], e = this.children.indexOf(i);
    return e > -1 && (this._didViewChangeTick++, this.children.splice(e, 1), this.renderGroup ? this.renderGroup.removeChild(i) : this.parentRenderGroup && this.parentRenderGroup.removeChild(i), i.parentRenderLayer && i.parentRenderLayer.detach(i), i.parent = null, this.emit("childRemoved", i, this, e), i.emit("removed", this)), i;
  }
  /** @ignore */
  _onUpdate(t) {
    t && t === this._skew && this._updateSkew(), this._didContainerChangeTick++, !this.didChange && (this.didChange = !0, this.parentRenderGroup && this.parentRenderGroup.onChildUpdate(this));
  }
  set isRenderGroup(t) {
    !!this.renderGroup !== t && (t ? this.enableRenderGroup() : this.disableRenderGroup());
  }
  /**
   * Returns true if this container is a render group.
   * This means that it will be rendered as a separate pass, with its own set of instructions
   */
  get isRenderGroup() {
    return !!this.renderGroup;
  }
  /**
   * Calling this enables a render group for this container.
   * This means it will be rendered as a separate set of instructions.
   * The transform of the container will also be handled on the GPU rather than the CPU.
   */
  enableRenderGroup() {
    if (this.renderGroup)
      return;
    const t = this.parentRenderGroup;
    t == null || t.removeChild(this), this.renderGroup = g.get(V, this), this.groupTransform = o.IDENTITY, t == null || t.addChild(this), this._updateIsSimple();
  }
  /** This will disable the render group for this container. */
  disableRenderGroup() {
    if (!this.renderGroup)
      return;
    const t = this.parentRenderGroup;
    t == null || t.removeChild(this), g.return(this.renderGroup), this.renderGroup = null, this.groupTransform = this.relativeGroupTransform, t == null || t.addChild(this), this._updateIsSimple();
  }
  /** @ignore */
  _updateIsSimple() {
    this.isSimple = !this.renderGroup && this.effects.length === 0;
  }
  /**
   * Current transform of the object based on world (parent) factors.
   * @readonly
   */
  get worldTransform() {
    return this._worldTransform || (this._worldTransform = new o()), this.renderGroup ? this._worldTransform.copyFrom(this.renderGroup.worldTransform) : this.parentRenderGroup && this._worldTransform.appendFrom(this.relativeGroupTransform, this.parentRenderGroup.worldTransform), this._worldTransform;
  }
  /**
   * The position of the container on the x axis relative to the local coordinates of the parent.
   * An alias to position.x
   */
  get x() {
    return this._position.x;
  }
  set x(t) {
    this._position.x = t;
  }
  /**
   * The position of the container on the y axis relative to the local coordinates of the parent.
   * An alias to position.y
   */
  get y() {
    return this._position.y;
  }
  set y(t) {
    this._position.y = t;
  }
  /**
   * The coordinate of the object relative to the local coordinates of the parent.
   * @since 4.0.0
   */
  get position() {
    return this._position;
  }
  set position(t) {
    this._position.copyFrom(t);
  }
  /**
   * The rotation of the object in radians.
   * 'rotation' and 'angle' have the same effect on a display object; rotation is in radians, angle is in degrees.
   */
  get rotation() {
    return this._rotation;
  }
  set rotation(t) {
    this._rotation !== t && (this._rotation = t, this._onUpdate(this._skew));
  }
  /**
   * The angle of the object in degrees.
   * 'rotation' and 'angle' have the same effect on a display object; rotation is in radians, angle is in degrees.
   */
  get angle() {
    return this.rotation * G;
  }
  set angle(t) {
    this.rotation = t * T;
  }
  /**
   * The center of rotation, scaling, and skewing for this display object in its local space. The `position`
   * is the projection of `pivot` in the parent's local space.
   *
   * By default, the pivot is the origin (0, 0).
   * @since 4.0.0
   */
  get pivot() {
    return this._pivot === a && (this._pivot = new r(this, 0, 0)), this._pivot;
  }
  set pivot(t) {
    this._pivot === a && (this._pivot = new r(this, 0, 0)), typeof t == "number" ? this._pivot.set(t) : this._pivot.copyFrom(t);
  }
  /**
   * The skew factor for the object in radians.
   * @since 4.0.0
   */
  get skew() {
    return this._skew === n && (this._skew = new r(this, 0, 0)), this._skew;
  }
  set skew(t) {
    this._skew === n && (this._skew = new r(this, 0, 0)), this._skew.copyFrom(t);
  }
  /**
   * The scale factors of this object along the local coordinate axes.
   *
   * The default scale is (1, 1).
   * @since 4.0.0
   */
  get scale() {
    return this._scale === l && (this._scale = new r(this, 1, 1)), this._scale;
  }
  set scale(t) {
    this._scale === l && (this._scale = new r(this, 0, 0)), typeof t == "number" ? this._scale.set(t) : this._scale.copyFrom(t);
  }
  /**
   * The width of the Container, setting this will actually modify the scale to achieve the value set.
   * @memberof scene.Container#
   */
  get width() {
    return Math.abs(this.scale.x * this.getLocalBounds().width);
  }
  set width(t) {
    const i = this.getLocalBounds().width;
    this._setWidth(t, i);
  }
  /**
   * The height of the Container, setting this will actually modify the scale to achieve the value set.
   * @memberof scene.Container#
   */
  get height() {
    return Math.abs(this.scale.y * this.getLocalBounds().height);
  }
  set height(t) {
    const i = this.getLocalBounds().height;
    this._setHeight(t, i);
  }
  /**
   * Retrieves the size of the container as a [Size]{@link Size} object.
   * This is faster than get the width and height separately.
   * @param out - Optional object to store the size in.
   * @returns - The size of the container.
   * @memberof scene.Container#
   */
  getSize(t) {
    t || (t = {});
    const i = this.getLocalBounds();
    return t.width = Math.abs(this.scale.x * i.width), t.height = Math.abs(this.scale.y * i.height), t;
  }
  /**
   * Sets the size of the container to the specified width and height.
   * This is faster than setting the width and height separately.
   * @param value - This can be either a number or a [Size]{@link Size} object.
   * @param height - The height to set. Defaults to the value of `width` if not provided.
   * @memberof scene.Container#
   */
  setSize(t, i) {
    const e = this.getLocalBounds();
    typeof t == "object" ? (i = t.height ?? t.width, t = t.width) : i ?? (i = t), t !== void 0 && this._setWidth(t, e.width), i !== void 0 && this._setHeight(i, e.height);
  }
  /** Called when the skew or the rotation changes. */
  _updateSkew() {
    const t = this._rotation, i = this._skew;
    this._cx = Math.cos(t + i._y), this._sx = Math.sin(t + i._y), this._cy = -Math.sin(t - i._x), this._sy = Math.cos(t - i._x);
  }
  /**
   * Updates the transform properties of the container (accepts partial values).
   * @param {object} opts - The options for updating the transform.
   * @param {number} opts.x - The x position of the container.
   * @param {number} opts.y - The y position of the container.
   * @param {number} opts.scaleX - The scale factor on the x-axis.
   * @param {number} opts.scaleY - The scale factor on the y-axis.
   * @param {number} opts.rotation - The rotation of the container, in radians.
   * @param {number} opts.skewX - The skew factor on the x-axis.
   * @param {number} opts.skewY - The skew factor on the y-axis.
   * @param {number} opts.pivotX - The x coordinate of the pivot point.
   * @param {number} opts.pivotY - The y coordinate of the pivot point.
   */
  updateTransform(t) {
    return this.position.set(
      typeof t.x == "number" ? t.x : this.position.x,
      typeof t.y == "number" ? t.y : this.position.y
    ), this.scale.set(
      typeof t.scaleX == "number" ? t.scaleX || 1 : this.scale.x,
      typeof t.scaleY == "number" ? t.scaleY || 1 : this.scale.y
    ), this.rotation = typeof t.rotation == "number" ? t.rotation : this.rotation, this.skew.set(
      typeof t.skewX == "number" ? t.skewX : this.skew.x,
      typeof t.skewY == "number" ? t.skewY : this.skew.y
    ), this.pivot.set(
      typeof t.pivotX == "number" ? t.pivotX : this.pivot.x,
      typeof t.pivotY == "number" ? t.pivotY : this.pivot.y
    ), this;
  }
  /**
   * Updates the local transform using the given matrix.
   * @param matrix - The matrix to use for updating the transform.
   */
  setFromMatrix(t) {
    t.decompose(this);
  }
  /** Updates the local transform. */
  updateLocalTransform() {
    const t = this._didContainerChangeTick;
    if (this._didLocalTransformChangeId === t)
      return;
    this._didLocalTransformChangeId = t;
    const i = this.localTransform, e = this._scale, s = this._pivot, h = this._position, u = e._x, c = e._y, f = s._x, m = s._y;
    i.a = this._cx * u, i.b = this._sx * u, i.c = this._cy * c, i.d = this._sy * c, i.tx = h._x - (f * i.a + m * i.c), i.ty = h._y - (f * i.b + m * i.d);
  }
  // / ///// color related stuff
  set alpha(t) {
    t !== this.localAlpha && (this.localAlpha = t, this._updateFlags |= y, this._onUpdate());
  }
  /** The opacity of the object. */
  get alpha() {
    return this.localAlpha;
  }
  set tint(t) {
    const e = x.shared.setValue(t ?? 16777215).toBgrNumber();
    e !== this.localColor && (this.localColor = e, this._updateFlags |= y, this._onUpdate());
  }
  /**
   * The tint applied to the sprite. This is a hex value.
   *
   * A value of 0xFFFFFF will remove any tint effect.
   * @default 0xFFFFFF
   */
  get tint() {
    return I(this.localColor);
  }
  // / //////////////// blend related stuff
  set blendMode(t) {
    this.localBlendMode !== t && (this.parentRenderGroup && (this.parentRenderGroup.structureDidChange = !0), this._updateFlags |= Y, this.localBlendMode = t, this._onUpdate());
  }
  /**
   * The blend mode to be applied to the sprite. Apply a value of `'normal'` to reset the blend mode.
   * @default 'normal'
   */
  get blendMode() {
    return this.localBlendMode;
  }
  // / ///////// VISIBILITY / RENDERABLE /////////////////
  /** The visibility of the object. If false the object will not be drawn, and the transform will not be updated. */
  get visible() {
    return !!(this.localDisplayStatus & 2);
  }
  set visible(t) {
    const i = t ? 2 : 0;
    (this.localDisplayStatus & 2) !== i && (this.parentRenderGroup && (this.parentRenderGroup.structureDidChange = !0), this._updateFlags |= d, this.localDisplayStatus ^= 2, this._onUpdate());
  }
  /** @ignore */
  get culled() {
    return !(this.localDisplayStatus & 4);
  }
  /** @ignore */
  set culled(t) {
    const i = t ? 0 : 4;
    (this.localDisplayStatus & 4) !== i && (this.parentRenderGroup && (this.parentRenderGroup.structureDidChange = !0), this._updateFlags |= d, this.localDisplayStatus ^= 4, this._onUpdate());
  }
  /** Can this object be rendered, if false the object will not be drawn but the transform will still be updated. */
  get renderable() {
    return !!(this.localDisplayStatus & 1);
  }
  set renderable(t) {
    const i = t ? 1 : 0;
    (this.localDisplayStatus & 1) !== i && (this._updateFlags |= d, this.localDisplayStatus ^= 1, this.parentRenderGroup && (this.parentRenderGroup.structureDidChange = !0), this._onUpdate());
  }
  /** Whether or not the object should be rendered. */
  get isRenderable() {
    return this.localDisplayStatus === 7 && this.groupAlpha > 0;
  }
  /**
   * Removes all internal references and listeners as well as removes children from the display list.
   * Do not use a Container after calling `destroy`.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.children=false] - if set to true, all the children will have their destroy
   *  method called as well. 'options' will be passed on to those calls.
   * @param {boolean} [options.texture=false] - Only used for children with textures e.g. Sprites. If options.children
   * is set to true it should destroy the texture of the child sprite
   * @param {boolean} [options.textureSource=false] - Only used for children with textures e.g. Sprites.
   * If options.children is set to true it should destroy the texture source of the child sprite
   * @param {boolean} [options.context=false] - Only used for children with graphicsContexts e.g. Graphics.
   * If options.children is set to true it should destroy the context of the child graphics
   */
  destroy(t = !1) {
    var s;
    if (this.destroyed)
      return;
    this.destroyed = !0;
    let i;
    if (this.children.length && (i = this.removeChildren(0, this.children.length)), this.removeFromParent(), this.parent = null, this._maskEffect = null, this._filterEffect = null, this.effects = null, this._position = null, this._scale = null, this._pivot = null, this._skew = null, this.emit("destroyed", this), this.removeAllListeners(), (typeof t == "boolean" ? t : t == null ? void 0 : t.children) && i)
      for (let h = 0; h < i.length; ++h)
        i[h].destroy(t);
    (s = this.renderGroup) == null || s.destroy(), this.renderGroup = null;
  }
}
C.mixin(
  p,
  R,
  F,
  O,
  E,
  A,
  S,
  B,
  U,
  b,
  M,
  L,
  D
);
export {
  p as Container,
  Y as UPDATE_BLEND,
  y as UPDATE_COLOR,
  d as UPDATE_VISIBLE
};
//# sourceMappingURL=index148.js.map

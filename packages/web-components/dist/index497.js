import { Matrix as i } from "./index393.js";
import { InstructionSet as s } from "./index468.js";
import { TexturePool as d } from "./index397.js";
class u {
  constructor() {
    this.renderPipeId = "renderGroup", this.root = null, this.canBundle = !1, this.renderGroupParent = null, this.renderGroupChildren = [], this.worldTransform = new i(), this.worldColorAlpha = 4294967295, this.worldColor = 16777215, this.worldAlpha = 1, this.childrenToUpdate = /* @__PURE__ */ Object.create(null), this.updateTick = 0, this.gcTick = 0, this.childrenRenderablesToUpdate = { list: [], index: 0 }, this.structureDidChange = !0, this.instructionSet = new s(), this._onRenderContainers = [], this.textureNeedsUpdate = !0, this.isCachedAsTexture = !1, this._matrixDirty = 7;
  }
  init(e) {
    this.root = e, e._onRender && this.addOnRender(e), e.didChange = !0;
    const r = e.children;
    for (let t = 0; t < r.length; t++) {
      const n = r[t];
      n._updateFlags = 15, this.addChild(n);
    }
  }
  enableCacheAsTexture(e = {}) {
    this.textureOptions = e, this.isCachedAsTexture = !0, this.textureNeedsUpdate = !0;
  }
  disableCacheAsTexture() {
    this.isCachedAsTexture = !1, this.texture && (d.returnTexture(this.texture), this.texture = null);
  }
  updateCacheTexture() {
    this.textureNeedsUpdate = !0;
  }
  reset() {
    this.renderGroupChildren.length = 0;
    for (const e in this.childrenToUpdate) {
      const r = this.childrenToUpdate[e];
      r.list.fill(null), r.index = 0;
    }
    this.childrenRenderablesToUpdate.index = 0, this.childrenRenderablesToUpdate.list.fill(null), this.root = null, this.updateTick = 0, this.structureDidChange = !0, this._onRenderContainers.length = 0, this.renderGroupParent = null, this.disableCacheAsTexture();
  }
  get localTransform() {
    return this.root.localTransform;
  }
  addRenderGroupChild(e) {
    e.renderGroupParent && e.renderGroupParent._removeRenderGroupChild(e), e.renderGroupParent = this, this.renderGroupChildren.push(e);
  }
  _removeRenderGroupChild(e) {
    const r = this.renderGroupChildren.indexOf(e);
    r > -1 && this.renderGroupChildren.splice(r, 1), e.renderGroupParent = null;
  }
  addChild(e) {
    if (this.structureDidChange = !0, e.parentRenderGroup = this, e.updateTick = -1, e.parent === this.root ? e.relativeRenderGroupDepth = 1 : e.relativeRenderGroupDepth = e.parent.relativeRenderGroupDepth + 1, e.didChange = !0, this.onChildUpdate(e), e.renderGroup) {
      this.addRenderGroupChild(e.renderGroup);
      return;
    }
    e._onRender && this.addOnRender(e);
    const r = e.children;
    for (let t = 0; t < r.length; t++)
      this.addChild(r[t]);
  }
  removeChild(e) {
    if (this.structureDidChange = !0, e._onRender && (e.renderGroup || this.removeOnRender(e)), e.parentRenderGroup = null, e.renderGroup) {
      this._removeRenderGroupChild(e.renderGroup);
      return;
    }
    const r = e.children;
    for (let t = 0; t < r.length; t++)
      this.removeChild(r[t]);
  }
  removeChildren(e) {
    for (let r = 0; r < e.length; r++)
      this.removeChild(e[r]);
  }
  onChildUpdate(e) {
    let r = this.childrenToUpdate[e.relativeRenderGroupDepth];
    r || (r = this.childrenToUpdate[e.relativeRenderGroupDepth] = {
      index: 0,
      list: []
    }), r.list[r.index++] = e;
  }
  updateRenderable(e) {
    e.globalDisplayStatus < 7 || (this.instructionSet.renderPipes[e.renderPipeId].updateRenderable(e), e.didViewUpdate = !1);
  }
  onChildViewUpdate(e) {
    this.childrenRenderablesToUpdate.list[this.childrenRenderablesToUpdate.index++] = e;
  }
  get isRenderable() {
    return this.root.localDisplayStatus === 7 && this.worldAlpha > 0;
  }
  /**
   * adding a container to the onRender list will make sure the user function
   * passed in to the user defined 'onRender` callBack
   * @param container - the container to add to the onRender list
   */
  addOnRender(e) {
    this._onRenderContainers.push(e);
  }
  removeOnRender(e) {
    this._onRenderContainers.splice(this._onRenderContainers.indexOf(e), 1);
  }
  runOnRender(e) {
    for (let r = 0; r < this._onRenderContainers.length; r++)
      this._onRenderContainers[r]._onRender(e);
  }
  destroy() {
    this.disableCacheAsTexture(), this.renderGroupParent = null, this.root = null, this.childrenRenderablesToUpdate = null, this.childrenToUpdate = null, this.renderGroupChildren = null, this._onRenderContainers = null, this.instructionSet = null;
  }
  getChildren(e = []) {
    const r = this.root.children;
    for (let t = 0; t < r.length; t++)
      this._getChildren(r[t], e);
    return e;
  }
  _getChildren(e, r = []) {
    if (r.push(e), e.renderGroup)
      return r;
    const t = e.children;
    for (let n = 0; n < t.length; n++)
      this._getChildren(t[n], r);
    return r;
  }
  invalidateMatrices() {
    this._matrixDirty = 7;
  }
  /**
   * Returns the inverse of the world transform matrix.
   * @returns {Matrix} The inverse of the world transform matrix.
   */
  get inverseWorldTransform() {
    return this._matrixDirty & 1 ? (this._matrixDirty &= -2, this._inverseWorldTransform || (this._inverseWorldTransform = new i()), this._inverseWorldTransform.copyFrom(this.worldTransform).invert()) : this._inverseWorldTransform;
  }
  /**
   * Returns the inverse of the texture offset transform matrix.
   * @returns {Matrix} The inverse of the texture offset transform matrix.
   */
  get textureOffsetInverseTransform() {
    return this._matrixDirty & 2 ? (this._matrixDirty &= -3, this._textureOffsetInverseTransform || (this._textureOffsetInverseTransform = new i()), this._textureOffsetInverseTransform.copyFrom(this.inverseWorldTransform).translate(
      -this._textureBounds.x,
      -this._textureBounds.y
    )) : this._textureOffsetInverseTransform;
  }
  /**
   * Returns the inverse of the parent texture transform matrix.
   * This is used to properly transform coordinates when rendering into cached textures.
   * @returns {Matrix} The inverse of the parent texture transform matrix.
   */
  get inverseParentTextureTransform() {
    if (!(this._matrixDirty & 4))
      return this._inverseParentTextureTransform;
    this._matrixDirty &= -5;
    const e = this._parentCacheAsTextureRenderGroup;
    return e ? (this._inverseParentTextureTransform || (this._inverseParentTextureTransform = new i()), this._inverseParentTextureTransform.copyFrom(this.worldTransform).prepend(e.inverseWorldTransform).translate(
      -e._textureBounds.x,
      -e._textureBounds.y
    )) : this.worldTransform;
  }
  /**
   * Returns a matrix that transforms coordinates to the correct coordinate space of the texture being rendered to.
   * This is the texture offset inverse transform of the closest parent RenderGroup that is cached as a texture.
   * @returns {Matrix | null} The transform matrix for the cached texture coordinate space,
   * or null if no parent is cached as texture.
   */
  get cacheToLocalTransform() {
    return this._parentCacheAsTextureRenderGroup ? this._parentCacheAsTextureRenderGroup.textureOffsetInverseTransform : null;
  }
}
export {
  u as RenderGroup
};
//# sourceMappingURL=index497.js.map

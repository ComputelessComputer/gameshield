import { removeItems as d } from "./index331.js";
import { deprecation as l, v8_0_0 as a } from "./index477.js";
const C = {
  allowChildren: !0,
  /**
   * Removes all children from this container that are within the begin and end indexes.
   * @param beginIndex - The beginning position.
   * @param endIndex - The ending position. Default value is size of the container.
   * @returns - List of removed children
   * @memberof scene.Container#
   */
  removeChildren(e = 0, t) {
    const r = t ?? this.children.length, i = r - e, n = [];
    if (i > 0 && i <= r) {
      for (let h = r - 1; h >= e; h--) {
        const s = this.children[h];
        s && (n.push(s), s.parent = null);
      }
      d(this.children, e, r);
      const o = this.renderGroup || this.parentRenderGroup;
      o && o.removeChildren(n);
      for (let h = 0; h < n.length; ++h)
        this.emit("childRemoved", n[h], this, h), n[h].emit("removed", this);
      return n.length > 0 && this._didViewChangeTick++, n;
    } else if (i === 0 && this.children.length === 0)
      return n;
    throw new RangeError("removeChildren: numeric values are outside the acceptable range.");
  },
  /**
   * Removes a child from the specified index position.
   * @param index - The index to get the child from
   * @returns The child that was removed.
   * @memberof scene.Container#
   */
  removeChildAt(e) {
    const t = this.getChildAt(e);
    return this.removeChild(t);
  },
  /**
   * Returns the child at the specified index
   * @param index - The index to get the child at
   * @returns - The child at the given index, if any.
   * @memberof scene.Container#
   */
  getChildAt(e) {
    if (e < 0 || e >= this.children.length)
      throw new Error(`getChildAt: Index (${e}) does not exist.`);
    return this.children[e];
  },
  /**
   * Changes the position of an existing child in the container
   * @param child - The child Container instance for which you want to change the index number
   * @param index - The resulting index number for the child container
   * @memberof scene.Container#
   */
  setChildIndex(e, t) {
    if (t < 0 || t >= this.children.length)
      throw new Error(`The index ${t} supplied is out of bounds ${this.children.length}`);
    this.getChildIndex(e), this.addChildAt(e, t);
  },
  /**
   * Returns the index position of a child Container instance
   * @param child - The Container instance to identify
   * @returns - The index position of the child container to identify
   * @memberof scene.Container#
   */
  getChildIndex(e) {
    const t = this.children.indexOf(e);
    if (t === -1)
      throw new Error("The supplied Container must be a child of the caller");
    return t;
  },
  /**
   * Adds a child to the container at a specified index. If the index is out of bounds an error will be thrown.
   * If the child is already in this container, it will be moved to the specified index.
   * @param {Container} child - The child to add.
   * @param {number} index - The absolute index where the child will be positioned at the end of the operation.
   * @returns {Container} The child that was added.
   * @memberof scene.Container#
   */
  addChildAt(e, t) {
    this.allowChildren || l(a, "addChildAt: Only Containers will be allowed to add children in v8.0.0");
    const { children: r } = this;
    if (t < 0 || t > r.length)
      throw new Error(`${e}addChildAt: The index ${t} supplied is out of bounds ${r.length}`);
    if (e.parent) {
      const n = e.parent.children.indexOf(e);
      if (e.parent === this && n === t)
        return e;
      n !== -1 && e.parent.children.splice(n, 1);
    }
    t === r.length ? r.push(e) : r.splice(t, 0, e), e.parent = this, e.didChange = !0, e._updateFlags = 15;
    const i = this.renderGroup || this.parentRenderGroup;
    return i && i.addChild(e), this.sortableChildren && (this.sortDirty = !0), this.emit("childAdded", e, this, t), e.emit("added", this), e;
  },
  /**
   * Swaps the position of 2 Containers within this container.
   * @param child - First container to swap
   * @param child2 - Second container to swap
   * @memberof scene.Container#
   */
  swapChildren(e, t) {
    if (e === t)
      return;
    const r = this.getChildIndex(e), i = this.getChildIndex(t);
    this.children[r] = t, this.children[i] = e;
    const n = this.renderGroup || this.parentRenderGroup;
    n && (n.structureDidChange = !0), this._didContainerChangeTick++;
  },
  /**
   * Remove the Container from its parent Container. If the Container has no parent, do nothing.
   * @memberof scene.Container#
   */
  removeFromParent() {
    var e;
    (e = this.parent) == null || e.removeChild(this);
  },
  /**
   * Reparent the child to this container, keeping the same worldTransform.
   * @param child - The child to reparent
   * @returns The first child that was reparented.
   * @memberof scene.Container#
   */
  reparentChild(...e) {
    return e.length === 1 ? this.reparentChildAt(e[0], this.children.length) : (e.forEach((t) => this.reparentChildAt(t, this.children.length)), e[0]);
  },
  /**
   * Reparent the child to this container at the specified index, keeping the same worldTransform.
   * @param child - The child to reparent
   * @param index - The index to reparent the child to
   * @memberof scene.Container#
   */
  reparentChildAt(e, t) {
    if (e.parent === this)
      return this.setChildIndex(e, t), e;
    const r = e.worldTransform.clone();
    e.removeFromParent(), this.addChildAt(e, t);
    const i = this.worldTransform.clone();
    return i.invert(), r.prepend(i), e.setFromMatrix(r), e;
  }
};
export {
  C as childrenHelperMixin
};
//# sourceMappingURL=index485.js.map

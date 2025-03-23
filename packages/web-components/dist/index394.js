class r {
  /**
   * Create a new instance eof the Bind Group.
   * @param resources - The resources that are bound together for use by a shader.
   */
  constructor(s) {
    this.resources = /* @__PURE__ */ Object.create(null), this._dirty = !0;
    let t = 0;
    for (const e in s) {
      const i = s[e];
      this.setResource(i, t++);
    }
    this._updateKey();
  }
  /**
   * Updates the key if its flagged as dirty. This is used internally to
   * match this bind group to a WebGPU BindGroup.
   * @internal
   * @ignore
   */
  _updateKey() {
    if (!this._dirty)
      return;
    this._dirty = !1;
    const s = [];
    let t = 0;
    for (const e in this.resources)
      s[t++] = this.resources[e]._resourceId;
    this._key = s.join("|");
  }
  /**
   * Set a resource at a given index. this function will
   * ensure that listeners will be removed from the current resource
   * and added to the new resource.
   * @param resource - The resource to set.
   * @param index - The index to set the resource at.
   */
  setResource(s, t) {
    var i, o;
    const e = this.resources[t];
    s !== e && (e && ((i = s.off) == null || i.call(s, "change", this.onResourceChange, this)), (o = s.on) == null || o.call(s, "change", this.onResourceChange, this), this.resources[t] = s, this._dirty = !0);
  }
  /**
   * Returns the resource at the current specified index.
   * @param index - The index of the resource to get.
   * @returns - The resource at the specified index.
   */
  getResource(s) {
    return this.resources[s];
  }
  /**
   * Used internally to 'touch' each resource, to ensure that the GC
   * knows that all resources in this bind group are still being used.
   * @param tick - The current tick.
   * @internal
   * @ignore
   */
  _touch(s) {
    const t = this.resources;
    for (const e in t)
      t[e]._touched = s;
  }
  /** Destroys this bind group and removes all listeners. */
  destroy() {
    var t;
    const s = this.resources;
    for (const e in s) {
      const i = s[e];
      (t = i.off) == null || t.call(i, "change", this.onResourceChange, this);
    }
    this.resources = null;
  }
  onResourceChange(s) {
    if (this._dirty = !0, s.destroyed) {
      const t = this.resources;
      for (const e in t)
        t[e] === s && (t[e] = null);
    } else
      this._updateKey();
  }
}
export {
  r as BindGroup
};
//# sourceMappingURL=index394.js.map

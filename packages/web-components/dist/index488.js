import { deprecation as a, v8_0_0 as s } from "./index477.js";
const o = {
  /**
   * The instance label of the object.
   * @memberof scene.Container#
   * @member {string} label
   */
  label: null,
  /**
   * The instance name of the object.
   * @deprecated since 8.0.0
   * @see scene.Container#label
   * @member {string} name
   * @memberof scene.Container#
   */
  get name() {
    return a(s, "Container.name property has been removed, use Container.label instead"), this.label;
  },
  set name(e) {
    a(s, "Container.name property has been removed, use Container.label instead"), this.label = e;
  },
  /**
   * @method getChildByName
   * @deprecated since 8.0.0
   * @param {string} name - Instance name.
   * @param {boolean}[deep=false] - Whether to search recursively
   * @returns {Container} The child with the specified name.
   * @see scene.Container#getChildByLabel
   * @memberof scene.Container#
   */
  getChildByName(e, r = !1) {
    return this.getChildByLabel(e, r);
  },
  /**
   * Returns the first child in the container with the specified label.
   *
   * Recursive searches are done in a pre-order traversal.
   * @memberof scene.Container#
   * @param {string|RegExp} label - Instance label.
   * @param {boolean}[deep=false] - Whether to search recursively
   * @returns {Container} The child with the specified label.
   */
  getChildByLabel(e, r = !1) {
    const i = this.children;
    for (let t = 0; t < i.length; t++) {
      const n = i[t];
      if (n.label === e || e instanceof RegExp && e.test(n.label))
        return n;
    }
    if (r)
      for (let t = 0; t < i.length; t++) {
        const l = i[t].getChildByLabel(e, !0);
        if (l)
          return l;
      }
    return null;
  },
  /**
   * Returns all children in the container with the specified label.
   * @memberof scene.Container#
   * @param {string|RegExp} label - Instance label.
   * @param {boolean}[deep=false] - Whether to search recursively
   * @param {Container[]} [out=[]] - The array to store matching children in.
   * @returns {Container[]} An array of children with the specified label.
   */
  getChildrenByLabel(e, r = !1, i = []) {
    const t = this.children;
    for (let n = 0; n < t.length; n++) {
      const l = t[n];
      (l.label === e || e instanceof RegExp && e.test(l.label)) && i.push(l);
    }
    if (r)
      for (let n = 0; n < t.length; n++)
        t[n].getChildrenByLabel(e, !0, i);
    return i;
  }
};
export {
  o as findMixin
};
//# sourceMappingURL=index488.js.map

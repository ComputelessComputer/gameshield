import { Point as s } from "./index383.js";
import { matrixPool as a } from "./index449.js";
const b = {
  /**
   * Returns the global position of the container.
   * @param point - The optional point to write the global value to.
   * @param skipUpdate - Should we skip the update transform.
   * @returns - The updated point.
   * @memberof scene.Container#
   */
  getGlobalPosition(t = new s(), l = !1) {
    return this.parent ? this.parent.toGlobal(this._position, t, l) : (t.x = this._position.x, t.y = this._position.y), t;
  },
  /**
   * Calculates the global position of the container.
   * @param position - The world origin to calculate from.
   * @param point - A Point object in which to store the value, optional
   *  (otherwise will create a new Point).
   * @param skipUpdate - Should we skip the update transform.
   * @returns - A point object representing the position of this object.
   * @memberof scene.Container#
   */
  toGlobal(t, l, o = !1) {
    const r = this.getGlobalTransform(a.get(), o);
    return l = r.apply(t, l), a.return(r), l;
  },
  /**
   * Calculates the local position of the container relative to another point.
   * @param position - The world origin to calculate from.
   * @param from - The Container to calculate the global position from.
   * @param point - A Point object in which to store the value, optional
   *  (otherwise will create a new Point).
   * @param skipUpdate - Should we skip the update transform
   * @returns - A point object representing the position of this object
   * @memberof scene.Container#
   */
  toLocal(t, l, o, r) {
    l && (t = l.toGlobal(t, o, r));
    const e = this.getGlobalTransform(a.get(), r);
    return o = e.applyInverse(t, o), a.return(e), o;
  }
};
export {
  b as toLocalGlobalMixin
};
//# sourceMappingURL=index496.js.map

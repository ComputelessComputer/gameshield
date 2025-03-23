import { updateTransformBackwards as a } from "./index447.js";
import { matrixPool as n } from "./index449.js";
import { multiplyColors as l } from "./index491.js";
function o(t) {
  return ((t & 255) << 16) + (t & 65280) + (t >> 16 & 255);
}
const s = {
  /**
   * Returns the global (compound) alpha of the container within the scene.
   * @param skipUpdate - Performance optimization flag:
   *   - If false (default): Recalculates the entire alpha chain through parents for accuracy
   *   - If true: Uses cached worldAlpha from the last render pass for better performance
   * @returns The resulting alpha value (between 0 and 1)
   * @example
   * // Accurate but slower - recalculates entire alpha chain
   * const preciseAlpha = container.getGlobalAlpha();
   *
   * // Faster but may be outdated - uses cached alpha
   * const cachedAlpha = container.getGlobalAlpha(true);
   */
  getGlobalAlpha(t) {
    if (t)
      return this.renderGroup ? this.renderGroup.worldAlpha : this.parentRenderGroup ? this.parentRenderGroup.worldAlpha * this.alpha : this.alpha;
    let e = this.alpha, r = this.parent;
    for (; r; )
      e *= r.alpha, r = r.parent;
    return e;
  },
  /**
   * Returns the global transform matrix of the container within the scene.
   * @param matrix - Optional matrix to store the result. If not provided, a new Matrix will be created.
   * @param skipUpdate - Performance optimization flag:
   *   - If false (default): Recalculates the entire transform chain for accuracy
   *   - If true: Uses cached worldTransform from the last render pass for better performance
   * @returns The resulting transformation matrix (either the input matrix or a new one)
   * @example
   * // Accurate but slower - recalculates entire transform chain
   * const preciseTransform = container.getGlobalTransform();
   *
   * // Faster but may be outdated - uses cached transform
   * const cachedTransform = container.getGlobalTransform(undefined, true);
   *
   * // Reuse existing matrix
   * const existingMatrix = new Matrix();
   * container.getGlobalTransform(existingMatrix);
   */
  getGlobalTransform(t, e) {
    if (e)
      return t.copyFrom(this.worldTransform);
    this.updateLocalTransform();
    const r = a(this, n.get().identity());
    return t.appendFrom(this.localTransform, r), n.return(r), t;
  },
  /**
   * Returns the global (compound) tint color of the container within the scene.
   * @param skipUpdate - Performance optimization flag:
   *   - If false (default): Recalculates the entire tint chain through parents for accuracy
   *   - If true: Uses cached worldColor from the last render pass for better performance
   * @returns The resulting tint color as a 24-bit RGB number (0xRRGGBB)
   * @example
   * // Accurate but slower - recalculates entire tint chain
   * const preciseTint = container.getGlobalTint();
   *
   * // Faster but may be outdated - uses cached tint
   * const cachedTint = container.getGlobalTint(true);
   */
  getGlobalTint(t) {
    if (t)
      return this.renderGroup ? o(this.renderGroup.worldColor) : this.parentRenderGroup ? o(
        l(this.localColor, this.parentRenderGroup.worldColor)
      ) : this.tint;
    let e = this.localColor, r = this.parent;
    for (; r; )
      e = l(e, r.localColor), r = r.parent;
    return o(e);
  }
};
export {
  o as bgr2rgb,
  s as getGlobalMixin
};
//# sourceMappingURL=index490.js.map

import { Matrix as l } from "./index393.js";
import { Bounds as f } from "./index399.js";
import { boundsPool as n } from "./index449.js";
const h = new l(), m = {
  /**
   * Computes the global bounds for the container, considering its children and optionally
   * factoring in render layers. It starts by clearing the provided bounds object, then
   * recursively calculates the bounds, and finally applies the world transformation.
   * @param {boolean} [factorRenderLayers] - Whether to consider render layers in the calculation.
   * @param {Bounds} [bounds] - The bounds object to store the result. If not provided, a new one is created.
   * @returns {Bounds} The computed bounds.
   * @memberof scene.Container#
   */
  getFastGlobalBounds(s, e) {
    e || (e = new f()), e.clear(), this._getGlobalBoundsRecursive(!!s, e, this.parentRenderLayer), e.isValid || e.set(0, 0, 0, 0);
    const a = this.renderGroup || this.parentRenderGroup;
    return e.applyMatrix(a.worldTransform), e;
  },
  /**
   * Recursively calculates the global bounds for the container and its children.
   * It considers visibility, measurability, and effects, and applies transformations
   * as necessary to compute the bounds accurately.
   * @param {boolean} factorRenderLayers - Whether to consider render layers in the calculation.
   * @param {Bounds} bounds - The bounds object to update with the calculated values.
   * @param {IRenderLayer} currentLayer - The current render layer being processed.
   * @memberof scene.Container#
   */
  _getGlobalBoundsRecursive(s, e, a) {
    let r = e;
    if (s && this.parentRenderLayer && this.parentRenderLayer !== a || this.localDisplayStatus !== 7 || !this.measurable)
      return;
    const d = !!this.effects.length;
    if ((this.renderGroup || d) && (r = n.get().clear()), this.boundsArea)
      e.addRect(this.boundsArea, this.worldTransform);
    else {
      if (this.renderPipeId) {
        const t = this.bounds;
        r.addFrame(
          t.minX,
          t.minY,
          t.maxX,
          t.maxY,
          this.groupTransform
        );
      }
      const i = this.children;
      for (let t = 0; t < i.length; t++)
        i[t]._getGlobalBoundsRecursive(s, r, a);
    }
    if (d) {
      let i = !1;
      const t = this.renderGroup || this.parentRenderGroup;
      for (let o = 0; o < this.effects.length; o++)
        this.effects[o].addBounds && (i || (i = !0, r.applyMatrix(t.worldTransform)), this.effects[o].addBounds(r, !0));
      i && (r.applyMatrix(t.worldTransform.copyTo(h).invert()), e.addBounds(r, this.relativeGroupTransform)), e.addBounds(r), n.return(r);
    } else
      this.renderGroup && (e.addBounds(r, this.relativeGroupTransform), n.return(r));
  }
};
export {
  m as getFastGlobalBoundsMixin
};
//# sourceMappingURL=index489.js.map

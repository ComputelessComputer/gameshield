import { SHAPES as r } from "./index262.js";
import { Rectangle as n } from "./index25.js";
class e {
  /**
   * @param x - The X coordinate of the center of this ellipse
   * @param y - The Y coordinate of the center of this ellipse
   * @param halfWidth - The half width of this ellipse
   * @param halfHeight - The half height of this ellipse
   */
  constructor(i = 0, s = 0, t = 0, h = 0) {
    this.x = i, this.y = s, this.width = t, this.height = h, this.type = r.ELIP;
  }
  /**
   * Creates a clone of this Ellipse instance
   * @returns {PIXI.Ellipse} A copy of the ellipse
   */
  clone() {
    return new e(this.x, this.y, this.width, this.height);
  }
  /**
   * Checks whether the x and y coordinates given are contained within this ellipse
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @returns Whether the x/y coords are within this ellipse
   */
  contains(i, s) {
    if (this.width <= 0 || this.height <= 0)
      return !1;
    let t = (i - this.x) / this.width, h = (s - this.y) / this.height;
    return t *= t, h *= h, t + h <= 1;
  }
  /**
   * Returns the framing rectangle of the ellipse as a Rectangle object
   * @returns The framing rectangle
   */
  getBounds() {
    return new n(this.x - this.width, this.y - this.height, this.width, this.height);
  }
}
e.prototype.toString = function() {
  return `[@pixi/math:Ellipse x=${this.x} y=${this.y} width=${this.width} height=${this.height}]`;
};
export {
  e as Ellipse
};
//# sourceMappingURL=index23.js.map

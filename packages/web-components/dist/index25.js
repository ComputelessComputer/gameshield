import { SHAPES as n } from "./index165.js";
import { Rectangle as e } from "./index28.js";
class u {
  /**
   * @param x - The X coordinate of the center of this circle
   * @param y - The Y coordinate of the center of this circle
   * @param radius - The radius of the circle
   */
  constructor(t = 0, i = 0, s = 0) {
    this.x = t, this.y = i, this.radius = s, this.type = n.CIRC;
  }
  /**
   * Creates a clone of this Circle instance
   * @returns A copy of the Circle
   */
  clone() {
    return new u(this.x, this.y, this.radius);
  }
  /**
   * Checks whether the x and y coordinates given are contained within this circle
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @returns Whether the x/y coordinates are within this Circle
   */
  contains(t, i) {
    if (this.radius <= 0)
      return !1;
    const s = this.radius * this.radius;
    let r = this.x - t, h = this.y - i;
    return r *= r, h *= h, r + h <= s;
  }
  /**
   * Returns the framing rectangle of the circle as a Rectangle object
   * @returns The framing rectangle
   */
  getBounds() {
    return new e(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
  }
}
u.prototype.toString = function() {
  return `[@pixi/math:Circle x=${this.x} y=${this.y} radius=${this.radius}]`;
};
export {
  u as Circle
};
//# sourceMappingURL=index25.js.map

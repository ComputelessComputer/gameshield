import { Rectangle as o } from "./index407.js";
class u {
  /**
   * @param x - The X coordinate of the center of this circle
   * @param y - The Y coordinate of the center of this circle
   * @param radius - The radius of the circle
   */
  constructor(s = 0, r = 0, t = 0) {
    this.type = "circle", this.x = s, this.y = r, this.radius = t;
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
  contains(s, r) {
    if (this.radius <= 0)
      return !1;
    const t = this.radius * this.radius;
    let h = this.x - s, i = this.y - r;
    return h *= h, i *= i, h + i <= t;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this circle including the stroke.
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @param width - The width of the line to check
   * @param alignment - The alignment of the stroke, 0.5 by default
   * @returns Whether the x/y coordinates are within this Circle
   */
  strokeContains(s, r, t, h = 0.5) {
    if (this.radius === 0)
      return !1;
    const i = this.x - s, n = this.y - r, a = this.radius, e = (1 - h) * t, d = Math.sqrt(i * i + n * n);
    return d <= a + e && d > a - (t - e);
  }
  /**
   * Returns the framing rectangle of the circle as a Rectangle object
   * @param out
   * @returns The framing rectangle
   */
  getBounds(s) {
    return s || (s = new o()), s.x = this.x - this.radius, s.y = this.y - this.radius, s.width = this.radius * 2, s.height = this.radius * 2, s;
  }
  /**
   * Copies another circle to this one.
   * @param circle - The circle to copy from.
   * @returns Returns itself.
   */
  copyFrom(s) {
    return this.x = s.x, this.y = s.y, this.radius = s.radius, this;
  }
  /**
   * Copies this circle to another one.
   * @param circle - The circle to copy to.
   * @returns Returns given parameter.
   */
  copyTo(s) {
    return s.copyFrom(this), s;
  }
  toString() {
    return `[pixi.js/math:Circle x=${this.x} y=${this.y} radius=${this.radius}]`;
  }
}
export {
  u as Circle
};
//# sourceMappingURL=index406.js.map

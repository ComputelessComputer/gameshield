import { Rectangle as W } from "./index407.js";
class y {
  /**
   * @param x - The X coordinate of the center of this ellipse
   * @param y - The Y coordinate of the center of this ellipse
   * @param halfWidth - The half width of this ellipse
   * @param halfHeight - The half height of this ellipse
   */
  constructor(t = 0, s = 0, h = 0, i = 0) {
    this.type = "ellipse", this.x = t, this.y = s, this.halfWidth = h, this.halfHeight = i;
  }
  /**
   * Creates a clone of this Ellipse instance
   * @returns {Ellipse} A copy of the ellipse
   */
  clone() {
    return new y(this.x, this.y, this.halfWidth, this.halfHeight);
  }
  /**
   * Checks whether the x and y coordinates given are contained within this ellipse
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @returns Whether the x/y coords are within this ellipse
   */
  contains(t, s) {
    if (this.halfWidth <= 0 || this.halfHeight <= 0)
      return !1;
    let h = (t - this.x) / this.halfWidth, i = (s - this.y) / this.halfHeight;
    return h *= h, i *= i, h + i <= 1;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this ellipse including stroke
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @param strokeWidth - The width of the line to check
   * @param alignment - The alignment of the stroke
   * @returns Whether the x/y coords are within this ellipse
   */
  strokeContains(t, s, h, i = 0.5) {
    const { halfWidth: r, halfHeight: a } = this;
    if (r <= 0 || a <= 0)
      return !1;
    const l = h * (1 - i), o = h - l, f = r - o, c = a - o, d = r + l, g = a + l, n = t - this.x, e = s - this.y, x = n * n / (f * f) + e * e / (c * c), H = n * n / (d * d) + e * e / (g * g);
    return x > 1 && H <= 1;
  }
  /**
   * Returns the framing rectangle of the ellipse as a Rectangle object
   * @param out
   * @returns The framing rectangle
   */
  getBounds(t) {
    return t || (t = new W()), t.x = this.x - this.halfWidth, t.y = this.y - this.halfHeight, t.width = this.halfWidth * 2, t.height = this.halfHeight * 2, t;
  }
  /**
   * Copies another ellipse to this one.
   * @param ellipse - The ellipse to copy from.
   * @returns Returns itself.
   */
  copyFrom(t) {
    return this.x = t.x, this.y = t.y, this.halfWidth = t.halfWidth, this.halfHeight = t.halfHeight, this;
  }
  /**
   * Copies this ellipse to another one.
   * @param ellipse - The ellipse to copy to.
   * @returns Returns given parameter.
   */
  copyTo(t) {
    return t.copyFrom(this), t;
  }
  toString() {
    return `[pixi.js/math:Ellipse x=${this.x} y=${this.y} halfWidth=${this.halfWidth} halfHeight=${this.halfHeight}]`;
  }
}
export {
  y as Ellipse
};
//# sourceMappingURL=index408.js.map

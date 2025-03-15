import { SHAPES as n } from "./index165.js";
class d {
  /**
   * @param x - The X coordinate of the upper-left corner of the rounded rectangle
   * @param y - The Y coordinate of the upper-left corner of the rounded rectangle
   * @param width - The overall width of this rounded rectangle
   * @param height - The overall height of this rounded rectangle
   * @param radius - Controls the radius of the rounded corners
   */
  constructor(s = 0, r = 0, t = 0, i = 0, h = 20) {
    this.x = s, this.y = r, this.width = t, this.height = i, this.radius = h, this.type = n.RREC;
  }
  /**
   * Creates a clone of this Rounded Rectangle.
   * @returns - A copy of the rounded rectangle.
   */
  clone() {
    return new d(this.x, this.y, this.width, this.height, this.radius);
  }
  /**
   * Checks whether the x and y coordinates given are contained within this Rounded Rectangle
   * @param x - The X coordinate of the point to test.
   * @param y - The Y coordinate of the point to test.
   * @returns - Whether the x/y coordinates are within this Rounded Rectangle.
   */
  contains(s, r) {
    if (this.width <= 0 || this.height <= 0)
      return !1;
    if (s >= this.x && s <= this.x + this.width && r >= this.y && r <= this.y + this.height) {
      const t = Math.max(0, Math.min(this.radius, Math.min(this.width, this.height) / 2));
      if (r >= this.y + t && r <= this.y + this.height - t || s >= this.x + t && s <= this.x + this.width - t)
        return !0;
      let i = s - (this.x + t), h = r - (this.y + t);
      const e = t * t;
      if (i * i + h * h <= e || (i = s - (this.x + this.width - t), i * i + h * h <= e) || (h = r - (this.y + this.height - t), i * i + h * h <= e) || (i = s - (this.x + t), i * i + h * h <= e))
        return !0;
    }
    return !1;
  }
}
d.prototype.toString = function() {
  return `[@pixi/math:RoundedRectangle x=${this.x} y=${this.y}width=${this.width} height=${this.height} radius=${this.radius}]`;
};
export {
  d as RoundedRectangle
};
//# sourceMappingURL=index29.js.map

import { Rectangle as M } from "./index407.js";
const x = (m, t, i, s, e, r, n) => {
  const w = m - i, y = t - s, h = Math.sqrt(w * w + y * y);
  return h >= e - r && h <= e + n;
};
class f {
  /**
   * @param x - The X coordinate of the upper-left corner of the rounded rectangle
   * @param y - The Y coordinate of the upper-left corner of the rounded rectangle
   * @param width - The overall width of this rounded rectangle
   * @param height - The overall height of this rounded rectangle
   * @param radius - Controls the radius of the rounded corners
   */
  constructor(t = 0, i = 0, s = 0, e = 0, r = 20) {
    this.type = "roundedRectangle", this.x = t, this.y = i, this.width = s, this.height = e, this.radius = r;
  }
  /**
   * Returns the framing rectangle of the rounded rectangle as a Rectangle object
   * @param out - optional rectangle to store the result
   * @returns The framing rectangle
   */
  getBounds(t) {
    return t || (t = new M()), t.x = this.x, t.y = this.y, t.width = this.width, t.height = this.height, t;
  }
  /**
   * Creates a clone of this Rounded Rectangle.
   * @returns - A copy of the rounded rectangle.
   */
  clone() {
    return new f(this.x, this.y, this.width, this.height, this.radius);
  }
  /**
   * Copies another rectangle to this one.
   * @param rectangle - The rectangle to copy from.
   * @returns Returns itself.
   */
  copyFrom(t) {
    return this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height, this;
  }
  /**
   * Copies this rectangle to another one.
   * @param rectangle - The rectangle to copy to.
   * @returns Returns given parameter.
   */
  copyTo(t) {
    return t.copyFrom(this), t;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this Rounded Rectangle
   * @param x - The X coordinate of the point to test.
   * @param y - The Y coordinate of the point to test.
   * @returns - Whether the x/y coordinates are within this Rounded Rectangle.
   */
  contains(t, i) {
    if (this.width <= 0 || this.height <= 0)
      return !1;
    if (t >= this.x && t <= this.x + this.width && i >= this.y && i <= this.y + this.height) {
      const s = Math.max(0, Math.min(this.radius, Math.min(this.width, this.height) / 2));
      if (i >= this.y + s && i <= this.y + this.height - s || t >= this.x + s && t <= this.x + this.width - s)
        return !0;
      let e = t - (this.x + s), r = i - (this.y + s);
      const n = s * s;
      if (e * e + r * r <= n || (e = t - (this.x + this.width - s), e * e + r * r <= n) || (r = i - (this.y + this.height - s), e * e + r * r <= n) || (e = t - (this.x + s), e * e + r * r <= n))
        return !0;
    }
    return !1;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this rectangle including the stroke.
   * @param pX - The X coordinate of the point to test
   * @param pY - The Y coordinate of the point to test
   * @param strokeWidth - The width of the line to check
   * @param alignment - The alignment of the stroke, 0.5 by default
   * @returns Whether the x/y coordinates are within this rectangle
   */
  strokeContains(t, i, s, e = 0.5) {
    const { x: r, y: n, width: w, height: y, radius: h } = this, d = s * (1 - e), o = s - d, u = r + h, c = n + h, l = w - h * 2, $ = y - h * 2, a = r + w, g = n + y;
    return (t >= r - d && t <= r + o || t >= a - o && t <= a + d) && i >= c && i <= c + $ || (i >= n - d && i <= n + o || i >= g - o && i <= g + d) && t >= u && t <= u + l ? !0 : (
      // Top-left
      t < u && i < c && x(
        t,
        i,
        u,
        c,
        h,
        o,
        d
      ) || t > a - h && i < c && x(
        t,
        i,
        a - h,
        c,
        h,
        o,
        d
      ) || t > a - h && i > g - h && x(
        t,
        i,
        a - h,
        g - h,
        h,
        o,
        d
      ) || t < u && i > g - h && x(
        t,
        i,
        u,
        g - h,
        h,
        o,
        d
      )
    );
  }
  toString() {
    return `[pixi.js/math:RoundedRectangle x=${this.x} y=${this.y}width=${this.width} height=${this.height} radius=${this.radius}]`;
  }
}
export {
  f as RoundedRectangle
};
//# sourceMappingURL=index410.js.map

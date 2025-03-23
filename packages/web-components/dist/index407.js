import { Point as d } from "./index383.js";
const b = [new d(), new d(), new d(), new d()];
class l {
  /**
   * @param x - The X coordinate of the upper-left corner of the rectangle
   * @param y - The Y coordinate of the upper-left corner of the rectangle
   * @param width - The overall width of the rectangle
   * @param height - The overall height of the rectangle
   */
  constructor(t = 0, i = 0, n = 0, h = 0) {
    this.type = "rectangle", this.x = Number(t), this.y = Number(i), this.width = Number(n), this.height = Number(h);
  }
  /** Returns the left edge of the rectangle. */
  get left() {
    return this.x;
  }
  /** Returns the right edge of the rectangle. */
  get right() {
    return this.x + this.width;
  }
  /** Returns the top edge of the rectangle. */
  get top() {
    return this.y;
  }
  /** Returns the bottom edge of the rectangle. */
  get bottom() {
    return this.y + this.height;
  }
  /** Determines whether the Rectangle is empty. */
  isEmpty() {
    return this.left === this.right || this.top === this.bottom;
  }
  /** A constant empty rectangle. This is a new object every time the property is accessed */
  static get EMPTY() {
    return new l(0, 0, 0, 0);
  }
  /**
   * Creates a clone of this Rectangle
   * @returns a copy of the rectangle
   */
  clone() {
    return new l(this.x, this.y, this.width, this.height);
  }
  /**
   * Converts a Bounds object to a Rectangle object.
   * @param bounds - The bounds to copy and convert to a rectangle.
   * @returns Returns itself.
   */
  copyFromBounds(t) {
    return this.x = t.minX, this.y = t.minY, this.width = t.maxX - t.minX, this.height = t.maxY - t.minY, this;
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
   * Checks whether the x and y coordinates given are contained within this Rectangle
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @returns Whether the x/y coordinates are within this Rectangle
   */
  contains(t, i) {
    return this.width <= 0 || this.height <= 0 ? !1 : t >= this.x && t < this.x + this.width && i >= this.y && i < this.y + this.height;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this rectangle including the stroke.
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @param strokeWidth - The width of the line to check
   * @param alignment - The alignment of the stroke, 0.5 by default
   * @returns Whether the x/y coordinates are within this rectangle
   */
  strokeContains(t, i, n, h = 0.5) {
    const { width: x, height: c } = this;
    if (x <= 0 || c <= 0)
      return !1;
    const s = this.x, e = this.y, y = n * (1 - h), o = n - y, u = s - y, r = s + x + y, m = e - y, f = e + c + y, g = s + o, M = s + x - o, p = e + o, a = e + c - o;
    return t >= u && t <= r && i >= m && i <= f && !(t > g && t < M && i > p && i < a);
  }
  /**
   * Determines whether the `other` Rectangle transformed by `transform` intersects with `this` Rectangle object.
   * Returns true only if the area of the intersection is >0, this means that Rectangles
   * sharing a side are not overlapping. Another side effect is that an arealess rectangle
   * (width or height equal to zero) can't intersect any other rectangle.
   * @param {Rectangle} other - The Rectangle to intersect with `this`.
   * @param {Matrix} transform - The transformation matrix of `other`.
   * @returns {boolean} A value of `true` if the transformed `other` Rectangle intersects with `this`; otherwise `false`.
   */
  intersects(t, i) {
    if (!i) {
      const $ = this.x < t.x ? t.x : this.x;
      if ((this.right > t.right ? t.right : this.right) <= $)
        return !1;
      const P = this.y < t.y ? t.y : this.y;
      return (this.bottom > t.bottom ? t.bottom : this.bottom) > P;
    }
    const n = this.left, h = this.right, x = this.top, c = this.bottom;
    if (h <= n || c <= x)
      return !1;
    const s = b[0].set(t.left, t.top), e = b[1].set(t.left, t.bottom), y = b[2].set(t.right, t.top), o = b[3].set(t.right, t.bottom);
    if (y.x <= s.x || e.y <= s.y)
      return !1;
    const u = Math.sign(i.a * i.d - i.b * i.c);
    if (u === 0 || (i.apply(s, s), i.apply(e, e), i.apply(y, y), i.apply(o, o), Math.max(s.x, e.x, y.x, o.x) <= n || Math.min(s.x, e.x, y.x, o.x) >= h || Math.max(s.y, e.y, y.y, o.y) <= x || Math.min(s.y, e.y, y.y, o.y) >= c))
      return !1;
    const r = u * (e.y - s.y), m = u * (s.x - e.x), f = r * n + m * x, g = r * h + m * x, M = r * n + m * c, p = r * h + m * c;
    if (Math.max(f, g, M, p) <= r * s.x + m * s.y || Math.min(f, g, M, p) >= r * o.x + m * o.y)
      return !1;
    const a = u * (s.y - y.y), w = u * (y.x - s.x), B = a * n + w * x, F = a * h + w * x, N = a * n + w * c, T = a * h + w * c;
    return !(Math.max(B, F, N, T) <= a * s.x + w * s.y || Math.min(B, F, N, T) >= a * o.x + w * o.y);
  }
  /**
   * Pads the rectangle making it grow in all directions.
   * If paddingY is omitted, both paddingX and paddingY will be set to paddingX.
   * @param paddingX - The horizontal padding amount.
   * @param paddingY - The vertical padding amount.
   * @returns Returns itself.
   */
  pad(t = 0, i = t) {
    return this.x -= t, this.y -= i, this.width += t * 2, this.height += i * 2, this;
  }
  /**
   * Fits this rectangle around the passed one.
   * @param rectangle - The rectangle to fit.
   * @returns Returns itself.
   */
  fit(t) {
    const i = Math.max(this.x, t.x), n = Math.min(this.x + this.width, t.x + t.width), h = Math.max(this.y, t.y), x = Math.min(this.y + this.height, t.y + t.height);
    return this.x = i, this.width = Math.max(n - i, 0), this.y = h, this.height = Math.max(x - h, 0), this;
  }
  /**
   * Enlarges rectangle that way its corners lie on grid
   * @param resolution - resolution
   * @param eps - precision
   * @returns Returns itself.
   */
  ceil(t = 1, i = 1e-3) {
    const n = Math.ceil((this.x + this.width - i) * t) / t, h = Math.ceil((this.y + this.height - i) * t) / t;
    return this.x = Math.floor((this.x + i) * t) / t, this.y = Math.floor((this.y + i) * t) / t, this.width = n - this.x, this.height = h - this.y, this;
  }
  /**
   * Enlarges this rectangle to include the passed rectangle.
   * @param rectangle - The rectangle to include.
   * @returns Returns itself.
   */
  enlarge(t) {
    const i = Math.min(this.x, t.x), n = Math.max(this.x + this.width, t.x + t.width), h = Math.min(this.y, t.y), x = Math.max(this.y + this.height, t.y + t.height);
    return this.x = i, this.width = n - i, this.y = h, this.height = x - h, this;
  }
  /**
   * Returns the framing rectangle of the rectangle as a Rectangle object
   * @param out - optional rectangle to store the result
   * @returns The framing rectangle
   */
  getBounds(t) {
    return t || (t = new l()), t.copyFrom(this), t;
  }
  /**
   * Checks if this rectangle fully contains another rectangle.
   *
   * A rectangle contains another rectangle if all four corners of the other rectangle
   * lie within the bounds of this rectangle.
   *
   * ```ts
   * const container = new Rectangle(0, 0, 100, 100);
   * const inside = new Rectangle(25, 25, 50, 50);
   * const partial = new Rectangle(75, 75, 50, 50);
   *
   * container.containsRect(inside); // Returns true
   * container.containsRect(partial); // Returns false - partial overlap
   * ```
   *
   * Note: If either rectangle has a width or height of 0, this method returns false
   * since a zero-area rectangle cannot meaningfully contain another rectangle.
   * @param other - The rectangle to check if it is contained within this one
   * @returns True if the other rectangle is fully contained within this one
   */
  containsRect(t) {
    if (this.width <= 0 || this.height <= 0)
      return !1;
    const i = t.x, n = t.y, h = t.x + t.width, x = t.y + t.height;
    return i >= this.x && i < this.x + this.width && n >= this.y && n < this.y + this.height && h >= this.x && h < this.x + this.width && x >= this.y && x < this.y + this.height;
  }
  toString() {
    return `[pixi.js/math:Rectangle x=${this.x} y=${this.y} width=${this.width} height=${this.height}]`;
  }
}
export {
  l as Rectangle
};
//# sourceMappingURL=index407.js.map

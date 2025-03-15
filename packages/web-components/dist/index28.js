import { SHAPES as C } from "./index165.js";
import { Point as d } from "./index33.js";
const g = [new d(), new d(), new d(), new d()];
class b {
  /**
   * @param x - The X coordinate of the upper-left corner of the rectangle
   * @param y - The Y coordinate of the upper-left corner of the rectangle
   * @param width - The overall width of the rectangle
   * @param height - The overall height of the rectangle
   */
  constructor(t = 0, h = 0, x = 0, i = 0) {
    this.x = Number(t), this.y = Number(h), this.width = Number(x), this.height = Number(i), this.type = C.RECT;
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
  /** A constant empty rectangle. */
  static get EMPTY() {
    return new b(0, 0, 0, 0);
  }
  /**
   * Creates a clone of this Rectangle
   * @returns a copy of the rectangle
   */
  clone() {
    return new b(this.x, this.y, this.width, this.height);
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
    return t.x = this.x, t.y = this.y, t.width = this.width, t.height = this.height, t;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this Rectangle
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @returns Whether the x/y coordinates are within this Rectangle
   */
  contains(t, h) {
    return this.width <= 0 || this.height <= 0 ? !1 : t >= this.x && t < this.x + this.width && h >= this.y && h < this.y + this.height;
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
  intersects(t, h) {
    if (!h) {
      const T = this.x < t.x ? t.x : this.x;
      if ((this.right > t.right ? t.right : this.right) <= T)
        return !1;
      const A = this.y < t.y ? t.y : this.y;
      return (this.bottom > t.bottom ? t.bottom : this.bottom) > A;
    }
    const x = this.left, i = this.right, y = this.top, M = this.bottom;
    if (i <= x || M <= y)
      return !1;
    const s = g[0].set(t.left, t.top), n = g[1].set(t.left, t.bottom), w = g[2].set(t.right, t.top), m = g[3].set(t.right, t.bottom);
    if (w.x <= s.x || n.y <= s.y)
      return !1;
    const a = Math.sign(h.a * h.d - h.b * h.c);
    if (a === 0 || (h.apply(s, s), h.apply(n, n), h.apply(w, w), h.apply(m, m), Math.max(s.x, n.x, w.x, m.x) <= x || Math.min(s.x, n.x, w.x, m.x) >= i || Math.max(s.y, n.y, w.y, m.y) <= y || Math.min(s.y, n.y, w.y, m.y) >= M))
      return !1;
    const u = a * (n.y - s.y), e = a * (s.x - n.x), r = u * x + e * y, c = u * i + e * y, f = u * x + e * M, N = u * i + e * M;
    if (Math.max(r, c, f, N) <= u * s.x + e * s.y || Math.min(r, c, f, N) >= u * m.x + e * m.y)
      return !1;
    const o = a * (s.y - w.y), p = a * (w.x - s.x), P = o * x + p * y, $ = o * i + p * y, E = o * x + p * M, S = o * i + p * M;
    return !(Math.max(P, $, E, S) <= o * s.x + p * s.y || Math.min(P, $, E, S) >= o * m.x + p * m.y);
  }
  /**
   * Pads the rectangle making it grow in all directions.
   * If paddingY is omitted, both paddingX and paddingY will be set to paddingX.
   * @param paddingX - The horizontal padding amount.
   * @param paddingY - The vertical padding amount.
   * @returns Returns itself.
   */
  pad(t = 0, h = t) {
    return this.x -= t, this.y -= h, this.width += t * 2, this.height += h * 2, this;
  }
  /**
   * Fits this rectangle around the passed one.
   * @param rectangle - The rectangle to fit.
   * @returns Returns itself.
   */
  fit(t) {
    const h = Math.max(this.x, t.x), x = Math.min(this.x + this.width, t.x + t.width), i = Math.max(this.y, t.y), y = Math.min(this.y + this.height, t.y + t.height);
    return this.x = h, this.width = Math.max(x - h, 0), this.y = i, this.height = Math.max(y - i, 0), this;
  }
  /**
   * Enlarges rectangle that way its corners lie on grid
   * @param resolution - resolution
   * @param eps - precision
   * @returns Returns itself.
   */
  ceil(t = 1, h = 1e-3) {
    const x = Math.ceil((this.x + this.width - h) * t) / t, i = Math.ceil((this.y + this.height - h) * t) / t;
    return this.x = Math.floor((this.x + h) * t) / t, this.y = Math.floor((this.y + h) * t) / t, this.width = x - this.x, this.height = i - this.y, this;
  }
  /**
   * Enlarges this rectangle to include the passed rectangle.
   * @param rectangle - The rectangle to include.
   * @returns Returns itself.
   */
  enlarge(t) {
    const h = Math.min(this.x, t.x), x = Math.max(this.x + this.width, t.x + t.width), i = Math.min(this.y, t.y), y = Math.max(this.y + this.height, t.y + t.height);
    return this.x = h, this.width = x - h, this.y = i, this.height = y - i, this;
  }
}
b.prototype.toString = function() {
  return `[@pixi/math:Rectangle x=${this.x} y=${this.y} width=${this.width} height=${this.height}]`;
};
export {
  b as Rectangle
};
//# sourceMappingURL=index28.js.map

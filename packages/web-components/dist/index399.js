import { Matrix as w } from "./index393.js";
import { Rectangle as p } from "./index407.js";
const y = new w();
class I {
  constructor(i = 1 / 0, t = 1 / 0, Y = -1 / 0, m = -1 / 0) {
    this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0, this.matrix = y, this.minX = i, this.minY = t, this.maxX = Y, this.maxY = m;
  }
  /**
   * Checks if bounds are empty.
   * @returns - True if empty.
   */
  isEmpty() {
    return this.minX > this.maxX || this.minY > this.maxY;
  }
  /** The bounding rectangle of the bounds. */
  get rectangle() {
    this._rectangle || (this._rectangle = new p());
    const i = this._rectangle;
    return this.minX > this.maxX || this.minY > this.maxY ? (i.x = 0, i.y = 0, i.width = 0, i.height = 0) : i.copyFromBounds(this), i;
  }
  /** Clears the bounds and resets. */
  clear() {
    return this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0, this.matrix = y, this;
  }
  /**
   * Sets the bounds.
   * @param x0 - left X of frame
   * @param y0 - top Y of frame
   * @param x1 - right X of frame
   * @param y1 - bottom Y of frame
   */
  set(i, t, Y, m) {
    this.minX = i, this.minY = t, this.maxX = Y, this.maxY = m;
  }
  /**
   * Adds sprite frame
   * @param x0 - left X of frame
   * @param y0 - top Y of frame
   * @param x1 - right X of frame
   * @param y1 - bottom Y of frame
   * @param matrix
   */
  addFrame(i, t, Y, m, X) {
    X || (X = this.matrix);
    const x = X.a, e = X.b, o = X.c, f = X.d, c = X.tx, l = X.ty;
    let s = this.minX, h = this.minY, g = this.maxX, r = this.maxY, n = x * i + o * t + c, a = e * i + f * t + l;
    n < s && (s = n), a < h && (h = a), n > g && (g = n), a > r && (r = a), n = x * Y + o * t + c, a = e * Y + f * t + l, n < s && (s = n), a < h && (h = a), n > g && (g = n), a > r && (r = a), n = x * i + o * m + c, a = e * i + f * m + l, n < s && (s = n), a < h && (h = a), n > g && (g = n), a > r && (r = a), n = x * Y + o * m + c, a = e * Y + f * m + l, n < s && (s = n), a < h && (h = a), n > g && (g = n), a > r && (r = a), this.minX = s, this.minY = h, this.maxX = g, this.maxY = r;
  }
  /**
   * Adds a rectangle to the bounds.
   * @param rect - The rectangle to be added.
   * @param matrix - The matrix to apply to the bounds.
   */
  addRect(i, t) {
    this.addFrame(i.x, i.y, i.x + i.width, i.y + i.height, t);
  }
  /**
   * Adds other {@link Bounds}.
   * @param bounds - The Bounds to be added
   * @param matrix
   */
  addBounds(i, t) {
    this.addFrame(i.minX, i.minY, i.maxX, i.maxY, t);
  }
  /**
   * Adds other Bounds, masked with Bounds.
   * @param mask - The Bounds to be added.
   */
  addBoundsMask(i) {
    this.minX = this.minX > i.minX ? this.minX : i.minX, this.minY = this.minY > i.minY ? this.minY : i.minY, this.maxX = this.maxX < i.maxX ? this.maxX : i.maxX, this.maxY = this.maxY < i.maxY ? this.maxY : i.maxY;
  }
  /**
   * Adds other Bounds, multiplied with matrix.
   * @param matrix - The matrix to apply to the bounds.
   */
  applyMatrix(i) {
    const t = this.minX, Y = this.minY, m = this.maxX, X = this.maxY, { a: x, b: e, c: o, d: f, tx: c, ty: l } = i;
    let s = x * t + o * Y + c, h = e * t + f * Y + l;
    this.minX = s, this.minY = h, this.maxX = s, this.maxY = h, s = x * m + o * Y + c, h = e * m + f * Y + l, this.minX = s < this.minX ? s : this.minX, this.minY = h < this.minY ? h : this.minY, this.maxX = s > this.maxX ? s : this.maxX, this.maxY = h > this.maxY ? h : this.maxY, s = x * t + o * X + c, h = e * t + f * X + l, this.minX = s < this.minX ? s : this.minX, this.minY = h < this.minY ? h : this.minY, this.maxX = s > this.maxX ? s : this.maxX, this.maxY = h > this.maxY ? h : this.maxY, s = x * m + o * X + c, h = e * m + f * X + l, this.minX = s < this.minX ? s : this.minX, this.minY = h < this.minY ? h : this.minY, this.maxX = s > this.maxX ? s : this.maxX, this.maxY = h > this.maxY ? h : this.maxY;
  }
  /**
   * Resizes the bounds object to include the given rectangle.
   * @param rect - The rectangle to be included.
   */
  fit(i) {
    return this.minX < i.left && (this.minX = i.left), this.maxX > i.right && (this.maxX = i.right), this.minY < i.top && (this.minY = i.top), this.maxY > i.bottom && (this.maxY = i.bottom), this;
  }
  /**
   * Resizes the bounds object to include the given bounds.
   * @param left - The left value of the bounds.
   * @param right - The right value of the bounds.
   * @param top - The top value of the bounds.
   * @param bottom - The bottom value of the bounds.
   */
  fitBounds(i, t, Y, m) {
    return this.minX < i && (this.minX = i), this.maxX > t && (this.maxX = t), this.minY < Y && (this.minY = Y), this.maxY > m && (this.maxY = m), this;
  }
  /**
   * Pads bounds object, making it grow in all directions.
   * If paddingY is omitted, both paddingX and paddingY will be set to paddingX.
   * @param paddingX - The horizontal padding amount.
   * @param paddingY - The vertical padding amount.
   */
  pad(i, t = i) {
    return this.minX -= i, this.maxX += i, this.minY -= t, this.maxY += t, this;
  }
  /** Ceils the bounds. */
  ceil() {
    return this.minX = Math.floor(this.minX), this.minY = Math.floor(this.minY), this.maxX = Math.ceil(this.maxX), this.maxY = Math.ceil(this.maxY), this;
  }
  /** Clones the bounds. */
  clone() {
    return new I(this.minX, this.minY, this.maxX, this.maxY);
  }
  /**
   * Scales the bounds by the given values
   * @param x - The X value to scale by.
   * @param y - The Y value to scale by.
   */
  scale(i, t = i) {
    return this.minX *= i, this.minY *= t, this.maxX *= i, this.maxY *= t, this;
  }
  /** the x value of the bounds. */
  get x() {
    return this.minX;
  }
  set x(i) {
    const t = this.maxX - this.minX;
    this.minX = i, this.maxX = i + t;
  }
  /** the y value of the bounds. */
  get y() {
    return this.minY;
  }
  set y(i) {
    const t = this.maxY - this.minY;
    this.minY = i, this.maxY = i + t;
  }
  /** the width value of the bounds. */
  get width() {
    return this.maxX - this.minX;
  }
  set width(i) {
    this.maxX = this.minX + i;
  }
  /** the height value of the bounds. */
  get height() {
    return this.maxY - this.minY;
  }
  set height(i) {
    this.maxY = this.minY + i;
  }
  /** the left value of the bounds. */
  get left() {
    return this.minX;
  }
  /** the right value of the bounds. */
  get right() {
    return this.maxX;
  }
  /** the top value of the bounds. */
  get top() {
    return this.minY;
  }
  /** the bottom value of the bounds. */
  get bottom() {
    return this.maxY;
  }
  /** Is the bounds positive. */
  get isPositive() {
    return this.maxX - this.minX > 0 && this.maxY - this.minY > 0;
  }
  get isValid() {
    return this.minX + this.minY !== 1 / 0;
  }
  /**
   * Adds screen vertices from array
   * @param vertexData - calculated vertices
   * @param beginOffset - begin offset
   * @param endOffset - end offset, excluded
   * @param matrix
   */
  addVertexData(i, t, Y, m) {
    let X = this.minX, x = this.minY, e = this.maxX, o = this.maxY;
    m || (m = this.matrix);
    const f = m.a, c = m.b, l = m.c, s = m.d, h = m.tx, g = m.ty;
    for (let r = t; r < Y; r += 2) {
      const n = i[r], a = i[r + 1], u = f * n + l * a + h, d = c * n + s * a + g;
      X = u < X ? u : X, x = d < x ? d : x, e = u > e ? u : e, o = d > o ? d : o;
    }
    this.minX = X, this.minY = x, this.maxX = e, this.maxY = o;
  }
  /**
   * Checks if the point is contained within the bounds.
   * @param x - x coordinate
   * @param y - y coordinate
   */
  containsPoint(i, t) {
    return this.minX <= i && this.minY <= t && this.maxX >= i && this.maxY >= t;
  }
  toString() {
    return `[pixi.js:Bounds minX=${this.minX} minY=${this.minY} maxX=${this.maxX} maxY=${this.maxY} width=${this.width} height=${this.height}]`;
  }
  /**
   * Copies the bounds from another bounds object.
   * @param bounds - The bounds to copy from.
   * @returns - This bounds object.
   */
  copyFrom(i) {
    return this.minX = i.minX, this.minY = i.minY, this.maxX = i.maxX, this.maxY = i.maxY, this;
  }
}
export {
  I as Bounds
};
//# sourceMappingURL=index399.js.map

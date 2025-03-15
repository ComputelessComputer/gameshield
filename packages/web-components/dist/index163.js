import "./index23.js";
import "./index24.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import { Rectangle as B } from "./index28.js";
import "./index29.js";
import "./index30.js";
import "./index31.js";
import "./index32.js";
import "./index33.js";
import "./index34.js";
import "./index35.js";
import "./index36.js";
import "./index37.js";
import "./index38.js";
import "./index39.js";
import "./index40.js";
import "./index41.js";
import "./index42.js";
import "./index43.js";
import "./index44.js";
import "./index45.js";
import "./index46.js";
import "./index47.js";
import "./index48.js";
import "./index49.js";
import "./index50.js";
import "./index51.js";
import "./index52.js";
import "./index53.js";
import "./index54.js";
import "./index55.js";
import "./index56.js";
import "./index57.js";
import "./index58.js";
import "./index59.js";
import "./index60.js";
import "./index61.js";
import "./index62.js";
import "./index63.js";
import "./index64.js";
import "./index65.js";
import "./index66.js";
import "./index67.js";
import "./index68.js";
import "./index69.js";
import "./index70.js";
import "./index71.js";
import "./index72.js";
import "./index73.js";
import "./index74.js";
import "./index75.js";
import "./index76.js";
import "./index77.js";
import "./index78.js";
import "./index79.js";
import "./index80.js";
import "./index81.js";
class Ri {
  constructor() {
    this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0, this.rect = null, this.updateID = -1;
  }
  /**
   * Checks if bounds are empty.
   * @returns - True if empty.
   */
  isEmpty() {
    return this.minX > this.maxX || this.minY > this.maxY;
  }
  /** Clears the bounds and resets. */
  clear() {
    this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0;
  }
  /**
   * Can return Rectangle.EMPTY constant, either construct new rectangle, either use your rectangle
   * It is not guaranteed that it will return tempRect
   * @param rect - Temporary object will be used if AABB is not empty
   * @returns - A rectangle of the bounds
   */
  getRectangle(i) {
    return this.minX > this.maxX || this.minY > this.maxY ? B.EMPTY : (i = i || new B(0, 0, 1, 1), i.x = this.minX, i.y = this.minY, i.width = this.maxX - this.minX, i.height = this.maxY - this.minY, i);
  }
  /**
   * This function should be inlined when its possible.
   * @param point - The point to add.
   */
  addPoint(i) {
    this.minX = Math.min(this.minX, i.x), this.maxX = Math.max(this.maxX, i.x), this.minY = Math.min(this.minY, i.y), this.maxY = Math.max(this.maxY, i.y);
  }
  /**
   * Adds a point, after transformed. This should be inlined when its possible.
   * @param matrix
   * @param point
   */
  addPointMatrix(i, m) {
    const { a: s, b: t, c: h, d: a, tx: x, ty: o } = i, X = s * m.x + h * m.y + x, r = t * m.x + a * m.y + o;
    this.minX = Math.min(this.minX, X), this.maxX = Math.max(this.maxX, X), this.minY = Math.min(this.minY, r), this.maxY = Math.max(this.maxY, r);
  }
  /**
   * Adds a quad, not transformed
   * @param vertices - The verts to add.
   */
  addQuad(i) {
    let m = this.minX, s = this.minY, t = this.maxX, h = this.maxY, a = i[0], x = i[1];
    m = a < m ? a : m, s = x < s ? x : s, t = a > t ? a : t, h = x > h ? x : h, a = i[2], x = i[3], m = a < m ? a : m, s = x < s ? x : s, t = a > t ? a : t, h = x > h ? x : h, a = i[4], x = i[5], m = a < m ? a : m, s = x < s ? x : s, t = a > t ? a : t, h = x > h ? x : h, a = i[6], x = i[7], m = a < m ? a : m, s = x < s ? x : s, t = a > t ? a : t, h = x > h ? x : h, this.minX = m, this.minY = s, this.maxX = t, this.maxY = h;
  }
  /**
   * Adds sprite frame, transformed.
   * @param transform - transform to apply
   * @param x0 - left X of frame
   * @param y0 - top Y of frame
   * @param x1 - right X of frame
   * @param y1 - bottom Y of frame
   */
  addFrame(i, m, s, t, h) {
    this.addFrameMatrix(i.worldTransform, m, s, t, h);
  }
  /**
   * Adds sprite frame, multiplied by matrix
   * @param matrix - matrix to apply
   * @param x0 - left X of frame
   * @param y0 - top Y of frame
   * @param x1 - right X of frame
   * @param y1 - bottom Y of frame
   */
  addFrameMatrix(i, m, s, t, h) {
    const a = i.a, x = i.b, o = i.c, X = i.d, r = i.tx, c = i.ty;
    let l = this.minX, p = this.minY, M = this.maxX, d = this.maxY, Y = a * m + o * s + r, n = x * m + X * s + c;
    l = Y < l ? Y : l, p = n < p ? n : p, M = Y > M ? Y : M, d = n > d ? n : d, Y = a * t + o * s + r, n = x * t + X * s + c, l = Y < l ? Y : l, p = n < p ? n : p, M = Y > M ? Y : M, d = n > d ? n : d, Y = a * m + o * h + r, n = x * m + X * h + c, l = Y < l ? Y : l, p = n < p ? n : p, M = Y > M ? Y : M, d = n > d ? n : d, Y = a * t + o * h + r, n = x * t + X * h + c, l = Y < l ? Y : l, p = n < p ? n : p, M = Y > M ? Y : M, d = n > d ? n : d, this.minX = l, this.minY = p, this.maxX = M, this.maxY = d;
  }
  /**
   * Adds screen vertices from array
   * @param vertexData - calculated vertices
   * @param beginOffset - begin offset
   * @param endOffset - end offset, excluded
   */
  addVertexData(i, m, s) {
    let t = this.minX, h = this.minY, a = this.maxX, x = this.maxY;
    for (let o = m; o < s; o += 2) {
      const X = i[o], r = i[o + 1];
      t = X < t ? X : t, h = r < h ? r : h, a = X > a ? X : a, x = r > x ? r : x;
    }
    this.minX = t, this.minY = h, this.maxX = a, this.maxY = x;
  }
  /**
   * Add an array of mesh vertices
   * @param transform - mesh transform
   * @param vertices - mesh coordinates in array
   * @param beginOffset - begin offset
   * @param endOffset - end offset, excluded
   */
  addVertices(i, m, s, t) {
    this.addVerticesMatrix(i.worldTransform, m, s, t);
  }
  /**
   * Add an array of mesh vertices.
   * @param matrix - mesh matrix
   * @param vertices - mesh coordinates in array
   * @param beginOffset - begin offset
   * @param endOffset - end offset, excluded
   * @param padX - x padding
   * @param padY - y padding
   */
  addVerticesMatrix(i, m, s, t, h = 0, a = h) {
    const x = i.a, o = i.b, X = i.c, r = i.d, c = i.tx, l = i.ty;
    let p = this.minX, M = this.minY, d = this.maxX, Y = this.maxY;
    for (let n = s; n < t; n += 2) {
      const y = m[n], w = m[n + 1], _ = x * y + X * w + c, f = r * w + o * y + l;
      p = Math.min(p, _ - h), d = Math.max(d, _ + h), M = Math.min(M, f - a), Y = Math.max(Y, f + a);
    }
    this.minX = p, this.minY = M, this.maxX = d, this.maxY = Y;
  }
  /**
   * Adds other {@link PIXI.Bounds}.
   * @param bounds - The Bounds to be added
   */
  addBounds(i) {
    const m = this.minX, s = this.minY, t = this.maxX, h = this.maxY;
    this.minX = i.minX < m ? i.minX : m, this.minY = i.minY < s ? i.minY : s, this.maxX = i.maxX > t ? i.maxX : t, this.maxY = i.maxY > h ? i.maxY : h;
  }
  /**
   * Adds other Bounds, masked with Bounds.
   * @param bounds - The Bounds to be added.
   * @param mask - TODO
   */
  addBoundsMask(i, m) {
    const s = i.minX > m.minX ? i.minX : m.minX, t = i.minY > m.minY ? i.minY : m.minY, h = i.maxX < m.maxX ? i.maxX : m.maxX, a = i.maxY < m.maxY ? i.maxY : m.maxY;
    if (s <= h && t <= a) {
      const x = this.minX, o = this.minY, X = this.maxX, r = this.maxY;
      this.minX = s < x ? s : x, this.minY = t < o ? t : o, this.maxX = h > X ? h : X, this.maxY = a > r ? a : r;
    }
  }
  /**
   * Adds other Bounds, multiplied by matrix. Bounds shouldn't be empty.
   * @param bounds - other bounds
   * @param matrix - multiplicator
   */
  addBoundsMatrix(i, m) {
    this.addFrameMatrix(m, i.minX, i.minY, i.maxX, i.maxY);
  }
  /**
   * Adds other Bounds, masked with Rectangle.
   * @param bounds - TODO
   * @param area - TODO
   */
  addBoundsArea(i, m) {
    const s = i.minX > m.x ? i.minX : m.x, t = i.minY > m.y ? i.minY : m.y, h = i.maxX < m.x + m.width ? i.maxX : m.x + m.width, a = i.maxY < m.y + m.height ? i.maxY : m.y + m.height;
    if (s <= h && t <= a) {
      const x = this.minX, o = this.minY, X = this.maxX, r = this.maxY;
      this.minX = s < x ? s : x, this.minY = t < o ? t : o, this.maxX = h > X ? h : X, this.maxY = a > r ? a : r;
    }
  }
  /**
   * Pads bounds object, making it grow in all directions.
   * If paddingY is omitted, both paddingX and paddingY will be set to paddingX.
   * @param paddingX - The horizontal padding amount.
   * @param paddingY - The vertical padding amount.
   */
  pad(i = 0, m = i) {
    this.isEmpty() || (this.minX -= i, this.maxX += i, this.minY -= m, this.maxY += m);
  }
  /**
   * Adds padded frame. (x0, y0) should be strictly less than (x1, y1)
   * @param x0 - left X of frame
   * @param y0 - top Y of frame
   * @param x1 - right X of frame
   * @param y1 - bottom Y of frame
   * @param padX - padding X
   * @param padY - padding Y
   */
  addFramePad(i, m, s, t, h, a) {
    i -= h, m -= a, s += h, t += a, this.minX = this.minX < i ? this.minX : i, this.maxX = this.maxX > s ? this.maxX : s, this.minY = this.minY < m ? this.minY : m, this.maxY = this.maxY > t ? this.maxY : t;
  }
}
export {
  Ri as Bounds
};
//# sourceMappingURL=index163.js.map

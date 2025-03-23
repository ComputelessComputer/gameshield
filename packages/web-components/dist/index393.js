import { PI_2 as M } from "./index402.js";
import { Point as p } from "./index383.js";
class a {
  /**
   * @param a - x scale
   * @param b - y skew
   * @param c - x skew
   * @param d - y scale
   * @param tx - x translation
   * @param ty - y translation
   */
  constructor(t = 1, h = 0, s = 0, i = 1, c = 0, n = 0) {
    this.array = null, this.a = t, this.b = h, this.c = s, this.d = i, this.tx = c, this.ty = n;
  }
  /**
   * Creates a Matrix object based on the given array. The Element to Matrix mapping order is as follows:
   *
   * a = array[0]
   * b = array[1]
   * c = array[3]
   * d = array[4]
   * tx = array[2]
   * ty = array[5]
   * @param array - The array that the matrix will be populated from.
   */
  fromArray(t) {
    this.a = t[0], this.b = t[1], this.c = t[3], this.d = t[4], this.tx = t[2], this.ty = t[5];
  }
  /**
   * Sets the matrix properties.
   * @param a - Matrix component
   * @param b - Matrix component
   * @param c - Matrix component
   * @param d - Matrix component
   * @param tx - Matrix component
   * @param ty - Matrix component
   * @returns This matrix. Good for chaining method calls.
   */
  set(t, h, s, i, c, n) {
    return this.a = t, this.b = h, this.c = s, this.d = i, this.tx = c, this.ty = n, this;
  }
  /**
   * Creates an array from the current Matrix object.
   * @param transpose - Whether we need to transpose the matrix or not
   * @param [out=new Float32Array(9)] - If provided the array will be assigned to out
   * @returns The newly created array which contains the matrix
   */
  toArray(t, h) {
    this.array || (this.array = new Float32Array(9));
    const s = h || this.array;
    return t ? (s[0] = this.a, s[1] = this.b, s[2] = 0, s[3] = this.c, s[4] = this.d, s[5] = 0, s[6] = this.tx, s[7] = this.ty, s[8] = 1) : (s[0] = this.a, s[1] = this.c, s[2] = this.tx, s[3] = this.b, s[4] = this.d, s[5] = this.ty, s[6] = 0, s[7] = 0, s[8] = 1), s;
  }
  /**
   * Get a new position with the current transformation applied.
   * Can be used to go from a child's coordinate space to the world coordinate space. (e.g. rendering)
   * @param pos - The origin
   * @param {Point} [newPos] - The point that the new position is assigned to (allowed to be same as input)
   * @returns {Point} The new point, transformed through this matrix
   */
  apply(t, h) {
    h = h || new p();
    const s = t.x, i = t.y;
    return h.x = this.a * s + this.c * i + this.tx, h.y = this.b * s + this.d * i + this.ty, h;
  }
  /**
   * Get a new position with the inverse of the current transformation applied.
   * Can be used to go from the world coordinate space to a child's coordinate space. (e.g. input)
   * @param pos - The origin
   * @param {Point} [newPos] - The point that the new position is assigned to (allowed to be same as input)
   * @returns {Point} The new point, inverse-transformed through this matrix
   */
  applyInverse(t, h) {
    h = h || new p();
    const s = this.a, i = this.b, c = this.c, n = this.d, d = this.tx, o = this.ty, y = 1 / (s * n + c * -i), e = t.x, b = t.y;
    return h.x = n * y * e + -c * y * b + (o * c - d * n) * y, h.y = s * y * b + -i * y * e + (-o * s + d * i) * y, h;
  }
  /**
   * Translates the matrix on the x and y.
   * @param x - How much to translate x by
   * @param y - How much to translate y by
   * @returns This matrix. Good for chaining method calls.
   */
  translate(t, h) {
    return this.tx += t, this.ty += h, this;
  }
  /**
   * Applies a scale transformation to the matrix.
   * @param x - The amount to scale horizontally
   * @param y - The amount to scale vertically
   * @returns This matrix. Good for chaining method calls.
   */
  scale(t, h) {
    return this.a *= t, this.d *= h, this.c *= t, this.b *= h, this.tx *= t, this.ty *= h, this;
  }
  /**
   * Applies a rotation transformation to the matrix.
   * @param angle - The angle in radians.
   * @returns This matrix. Good for chaining method calls.
   */
  rotate(t) {
    const h = Math.cos(t), s = Math.sin(t), i = this.a, c = this.c, n = this.tx;
    return this.a = i * h - this.b * s, this.b = i * s + this.b * h, this.c = c * h - this.d * s, this.d = c * s + this.d * h, this.tx = n * h - this.ty * s, this.ty = n * s + this.ty * h, this;
  }
  /**
   * Appends the given Matrix to this Matrix.
   * @param matrix - The matrix to append.
   * @returns This matrix. Good for chaining method calls.
   */
  append(t) {
    const h = this.a, s = this.b, i = this.c, c = this.d;
    return this.a = t.a * h + t.b * i, this.b = t.a * s + t.b * c, this.c = t.c * h + t.d * i, this.d = t.c * s + t.d * c, this.tx = t.tx * h + t.ty * i + this.tx, this.ty = t.tx * s + t.ty * c + this.ty, this;
  }
  /**
   * Appends two matrix's and sets the result to this matrix. AB = A * B
   * @param a - The matrix to append.
   * @param b - The matrix to append.
   * @returns This matrix. Good for chaining method calls.
   */
  appendFrom(t, h) {
    const s = t.a, i = t.b, c = t.c, n = t.d, d = t.tx, o = t.ty, y = h.a, e = h.b, b = h.c, u = h.d;
    return this.a = s * y + i * b, this.b = s * e + i * u, this.c = c * y + n * b, this.d = c * e + n * u, this.tx = d * y + o * b + h.tx, this.ty = d * e + o * u + h.ty, this;
  }
  /**
   * Sets the matrix based on all the available properties
   * @param x - Position on the x axis
   * @param y - Position on the y axis
   * @param pivotX - Pivot on the x axis
   * @param pivotY - Pivot on the y axis
   * @param scaleX - Scale on the x axis
   * @param scaleY - Scale on the y axis
   * @param rotation - Rotation in radians
   * @param skewX - Skew on the x axis
   * @param skewY - Skew on the y axis
   * @returns This matrix. Good for chaining method calls.
   */
  setTransform(t, h, s, i, c, n, d, o, y) {
    return this.a = Math.cos(d + y) * c, this.b = Math.sin(d + y) * c, this.c = -Math.sin(d - o) * n, this.d = Math.cos(d - o) * n, this.tx = t - (s * this.a + i * this.c), this.ty = h - (s * this.b + i * this.d), this;
  }
  /**
   * Prepends the given Matrix to this Matrix.
   * @param matrix - The matrix to prepend
   * @returns This matrix. Good for chaining method calls.
   */
  prepend(t) {
    const h = this.tx;
    if (t.a !== 1 || t.b !== 0 || t.c !== 0 || t.d !== 1) {
      const s = this.a, i = this.c;
      this.a = s * t.a + this.b * t.c, this.b = s * t.b + this.b * t.d, this.c = i * t.a + this.d * t.c, this.d = i * t.b + this.d * t.d;
    }
    return this.tx = h * t.a + this.ty * t.c + t.tx, this.ty = h * t.b + this.ty * t.d + t.ty, this;
  }
  /**
   * Decomposes the matrix (x, y, scaleX, scaleY, and rotation) and sets the properties on to a transform.
   * @param transform - The transform to apply the properties to.
   * @returns The transform with the newly applied properties
   */
  decompose(t) {
    const h = this.a, s = this.b, i = this.c, c = this.d, n = t.pivot, d = -Math.atan2(-i, c), o = Math.atan2(s, h), y = Math.abs(d + o);
    return y < 1e-5 || Math.abs(M - y) < 1e-5 ? (t.rotation = o, t.skew.x = t.skew.y = 0) : (t.rotation = 0, t.skew.x = d, t.skew.y = o), t.scale.x = Math.sqrt(h * h + s * s), t.scale.y = Math.sqrt(i * i + c * c), t.position.x = this.tx + (n.x * h + n.y * i), t.position.y = this.ty + (n.x * s + n.y * c), t;
  }
  /**
   * Inverts this matrix
   * @returns This matrix. Good for chaining method calls.
   */
  invert() {
    const t = this.a, h = this.b, s = this.c, i = this.d, c = this.tx, n = t * i - h * s;
    return this.a = i / n, this.b = -h / n, this.c = -s / n, this.d = t / n, this.tx = (s * this.ty - i * c) / n, this.ty = -(t * this.ty - h * c) / n, this;
  }
  /** Checks if this matrix is an identity matrix */
  isIdentity() {
    return this.a === 1 && this.b === 0 && this.c === 0 && this.d === 1 && this.tx === 0 && this.ty === 0;
  }
  /**
   * Resets this Matrix to an identity (default) matrix.
   * @returns This matrix. Good for chaining method calls.
   */
  identity() {
    return this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, this;
  }
  /**
   * Creates a new Matrix object with the same values as this one.
   * @returns A copy of this matrix. Good for chaining method calls.
   */
  clone() {
    const t = new a();
    return t.a = this.a, t.b = this.b, t.c = this.c, t.d = this.d, t.tx = this.tx, t.ty = this.ty, t;
  }
  /**
   * Changes the values of the given matrix to be the same as the ones in this matrix
   * @param matrix - The matrix to copy to.
   * @returns The matrix given in parameter with its values updated.
   */
  copyTo(t) {
    return t.a = this.a, t.b = this.b, t.c = this.c, t.d = this.d, t.tx = this.tx, t.ty = this.ty, t;
  }
  /**
   * Changes the values of the matrix to be the same as the ones in given matrix
   * @param matrix - The matrix to copy from.
   * @returns this
   */
  copyFrom(t) {
    return this.a = t.a, this.b = t.b, this.c = t.c, this.d = t.d, this.tx = t.tx, this.ty = t.ty, this;
  }
  /**
   * check to see if two matrices are the same
   * @param matrix - The matrix to compare to.
   */
  equals(t) {
    return t.a === this.a && t.b === this.b && t.c === this.c && t.d === this.d && t.tx === this.tx && t.ty === this.ty;
  }
  toString() {
    return `[pixi.js:Matrix a=${this.a} b=${this.b} c=${this.c} d=${this.d} tx=${this.tx} ty=${this.ty}]`;
  }
  /**
   * A default (identity) matrix.
   *
   * This is a shared object, if you want to modify it consider creating a new `Matrix`
   * @readonly
   */
  static get IDENTITY() {
    return l.identity();
  }
  /**
   * A static Matrix that can be used to avoid creating new objects.
   * Will always ensure the matrix is reset to identity when requested.
   * Use this object for fast but temporary calculations, as it may be mutated later on.
   * This is a different object to the `IDENTITY` object and so can be modified without changing `IDENTITY`.
   * @readonly
   */
  static get shared() {
    return x.identity();
  }
}
const x = new a(), l = new a();
export {
  a as Matrix
};
//# sourceMappingURL=index393.js.map

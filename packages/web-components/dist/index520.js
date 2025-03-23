import { Point as g } from "./index383.js";
import { uid as k } from "./index416.js";
import { warn as C } from "./index338.js";
import { parseSVGPath as S } from "./index525.js";
import { ShapePath as w } from "./index526.js";
class v {
  /**
   * Creates a `GraphicsPath` instance optionally from an SVG path string or an array of `PathInstruction`.
   * @param instructions - An SVG path string or an array of `PathInstruction` objects.
   * @param signed
   */
  constructor(t, r = !1) {
    this.instructions = [], this.uid = k("graphicsPath"), this._dirty = !0, this.checkForHoles = r, typeof t == "string" ? S(t, this) : this.instructions = (t == null ? void 0 : t.slice()) ?? [];
  }
  /**
   * Provides access to the internal shape path, ensuring it is up-to-date with the current instructions.
   * @returns The `ShapePath` instance associated with this `GraphicsPath`.
   */
  get shapePath() {
    return this._shapePath || (this._shapePath = new w(this)), this._dirty && (this._dirty = !1, this._shapePath.buildPath()), this._shapePath;
  }
  /**
   * Adds another `GraphicsPath` to this path, optionally applying a transformation.
   * @param path - The `GraphicsPath` to add.
   * @param transform - An optional transformation to apply to the added path.
   * @returns The instance of the current object for chaining.
   */
  addPath(t, r) {
    return t = t.clone(), this.instructions.push({ action: "addPath", data: [t, r] }), this._dirty = !0, this;
  }
  arc(...t) {
    return this.instructions.push({ action: "arc", data: t }), this._dirty = !0, this;
  }
  arcTo(...t) {
    return this.instructions.push({ action: "arcTo", data: t }), this._dirty = !0, this;
  }
  arcToSvg(...t) {
    return this.instructions.push({ action: "arcToSvg", data: t }), this._dirty = !0, this;
  }
  bezierCurveTo(...t) {
    return this.instructions.push({ action: "bezierCurveTo", data: t }), this._dirty = !0, this;
  }
  /**
   * Adds a cubic Bezier curve to the path.
   * It requires two points: the second control point and the end point. The first control point is assumed to be
   * The starting point is the last point in the current path.
   * @param cp2x - The x-coordinate of the second control point.
   * @param cp2y - The y-coordinate of the second control point.
   * @param x - The x-coordinate of the end point.
   * @param y - The y-coordinate of the end point.
   * @param smoothness - Optional parameter to adjust the smoothness of the curve.
   * @returns The instance of the current object for chaining.
   */
  bezierCurveToShort(t, r, i, e, c) {
    const h = this.instructions[this.instructions.length - 1], o = this.getLastPoint(g.shared);
    let n = 0, a = 0;
    if (!h || h.action !== "bezierCurveTo")
      n = o.x, a = o.y;
    else {
      n = h.data[2], a = h.data[3];
      const d = o.x, u = o.y;
      n = d + (d - n), a = u + (u - a);
    }
    return this.instructions.push({ action: "bezierCurveTo", data: [n, a, t, r, i, e, c] }), this._dirty = !0, this;
  }
  /**
   * Closes the current path by drawing a straight line back to the start.
   * If the shape is already closed or there are no points in the path, this method does nothing.
   * @returns The instance of the current object for chaining.
   */
  closePath() {
    return this.instructions.push({ action: "closePath", data: [] }), this._dirty = !0, this;
  }
  ellipse(...t) {
    return this.instructions.push({ action: "ellipse", data: t }), this._dirty = !0, this;
  }
  lineTo(...t) {
    return this.instructions.push({ action: "lineTo", data: t }), this._dirty = !0, this;
  }
  moveTo(...t) {
    return this.instructions.push({ action: "moveTo", data: t }), this;
  }
  quadraticCurveTo(...t) {
    return this.instructions.push({ action: "quadraticCurveTo", data: t }), this._dirty = !0, this;
  }
  /**
   * Adds a quadratic curve to the path. It uses the previous point as the control point.
   * @param x - The x-coordinate of the end point.
   * @param y - The y-coordinate of the end point.
   * @param smoothness - Optional parameter to adjust the smoothness of the curve.
   * @returns The instance of the current object for chaining.
   */
  quadraticCurveToShort(t, r, i) {
    const e = this.instructions[this.instructions.length - 1], c = this.getLastPoint(g.shared);
    let h = 0, o = 0;
    if (!e || e.action !== "quadraticCurveTo")
      h = c.x, o = c.y;
    else {
      h = e.data[0], o = e.data[1];
      const n = c.x, a = c.y;
      h = n + (n - h), o = a + (a - o);
    }
    return this.instructions.push({ action: "quadraticCurveTo", data: [h, o, t, r, i] }), this._dirty = !0, this;
  }
  /**
   * Draws a rectangle shape. This method adds a new rectangle path to the current drawing.
   * @param x - The x-coordinate of the top-left corner of the rectangle.
   * @param y - The y-coordinate of the top-left corner of the rectangle.
   * @param w - The width of the rectangle.
   * @param h - The height of the rectangle.
   * @param transform - An optional `Matrix` object to apply a transformation to the rectangle.
   * @returns The instance of the current object for chaining.
   */
  rect(t, r, i, e, c) {
    return this.instructions.push({ action: "rect", data: [t, r, i, e, c] }), this._dirty = !0, this;
  }
  /**
   * Draws a circle shape. This method adds a new circle path to the current drawing.
   * @param x - The x-coordinate of the center of the circle.
   * @param y - The y-coordinate of the center of the circle.
   * @param radius - The radius of the circle.
   * @param transform - An optional `Matrix` object to apply a transformation to the circle.
   * @returns The instance of the current object for chaining.
   */
  circle(t, r, i, e) {
    return this.instructions.push({ action: "circle", data: [t, r, i, e] }), this._dirty = !0, this;
  }
  roundRect(...t) {
    return this.instructions.push({ action: "roundRect", data: t }), this._dirty = !0, this;
  }
  poly(...t) {
    return this.instructions.push({ action: "poly", data: t }), this._dirty = !0, this;
  }
  regularPoly(...t) {
    return this.instructions.push({ action: "regularPoly", data: t }), this._dirty = !0, this;
  }
  roundPoly(...t) {
    return this.instructions.push({ action: "roundPoly", data: t }), this._dirty = !0, this;
  }
  roundShape(...t) {
    return this.instructions.push({ action: "roundShape", data: t }), this._dirty = !0, this;
  }
  filletRect(...t) {
    return this.instructions.push({ action: "filletRect", data: t }), this._dirty = !0, this;
  }
  chamferRect(...t) {
    return this.instructions.push({ action: "chamferRect", data: t }), this._dirty = !0, this;
  }
  /**
   * Draws a star shape centered at a specified location. This method allows for the creation
   *  of stars with a variable number of points, outer radius, optional inner radius, and rotation.
   * The star is drawn as a closed polygon with alternating outer and inner vertices to create the star's points.
   * An optional transformation can be applied to scale, rotate, or translate the star as needed.
   * @param x - The x-coordinate of the center of the star.
   * @param y - The y-coordinate of the center of the star.
   * @param points - The number of points of the star.
   * @param radius - The outer radius of the star (distance from the center to the outer points).
   * @param innerRadius - Optional. The inner radius of the star
   * (distance from the center to the inner points between the outer points).
   * If not provided, defaults to half of the `radius`.
   * @param rotation - Optional. The rotation of the star in radians, where 0 is aligned with the y-axis.
   * Defaults to 0, meaning one point is directly upward.
   * @param transform - An optional `Matrix` object to apply a transformation to the star.
   * This can include rotations, scaling, and translations.
   * @returns The instance of the current object for chaining further drawing commands.
   */
  // eslint-disable-next-line max-len
  star(t, r, i, e, c, h, o) {
    c || (c = e / 2);
    const n = -1 * Math.PI / 2 + h, a = i * 2, d = Math.PI * 2 / a, u = [];
    for (let l = 0; l < a; l++) {
      const p = l % 2 ? c : e, y = l * d + n;
      u.push(
        t + p * Math.cos(y),
        r + p * Math.sin(y)
      );
    }
    return this.poly(u, !0, o), this;
  }
  /**
   * Creates a copy of the current `GraphicsPath` instance. This method supports both shallow and deep cloning.
   * A shallow clone copies the reference of the instructions array, while a deep clone creates a new array and
   * copies each instruction individually, ensuring that modifications to the instructions of the cloned `GraphicsPath`
   * do not affect the original `GraphicsPath` and vice versa.
   * @param deep - A boolean flag indicating whether the clone should be deep.
   * @returns A new `GraphicsPath` instance that is a clone of the current instance.
   */
  clone(t = !1) {
    const r = new v();
    if (r.checkForHoles = this.checkForHoles, !t)
      r.instructions = this.instructions.slice();
    else
      for (let i = 0; i < this.instructions.length; i++) {
        const e = this.instructions[i];
        r.instructions.push({ action: e.action, data: e.data.slice() });
      }
    return r;
  }
  clear() {
    return this.instructions.length = 0, this._dirty = !0, this;
  }
  /**
   * Applies a transformation matrix to all drawing instructions within the `GraphicsPath`.
   * This method enables the modification of the path's geometry according to the provided
   * transformation matrix, which can include translations, rotations, scaling, and skewing.
   *
   * Each drawing instruction in the path is updated to reflect the transformation,
   * ensuring the visual representation of the path is consistent with the applied matrix.
   *
   * Note: The transformation is applied directly to the coordinates and control points of the drawing instructions,
   * not to the path as a whole. This means the transformation's effects are baked into the individual instructions,
   * allowing for fine-grained control over the path's appearance.
   * @param matrix - A `Matrix` object representing the transformation to apply.
   * @returns The instance of the current object for chaining further operations.
   */
  transform(t) {
    if (t.isIdentity())
      return this;
    const r = t.a, i = t.b, e = t.c, c = t.d, h = t.tx, o = t.ty;
    let n = 0, a = 0, d = 0, u = 0, l = 0, p = 0, y = 0, P = 0;
    for (let T = 0; T < this.instructions.length; T++) {
      const b = this.instructions[T], s = b.data;
      switch (b.action) {
        case "moveTo":
        case "lineTo":
          n = s[0], a = s[1], s[0] = r * n + e * a + h, s[1] = i * n + c * a + o;
          break;
        case "bezierCurveTo":
          d = s[0], u = s[1], l = s[2], p = s[3], n = s[4], a = s[5], s[0] = r * d + e * u + h, s[1] = i * d + c * u + o, s[2] = r * l + e * p + h, s[3] = i * l + c * p + o, s[4] = r * n + e * a + h, s[5] = i * n + c * a + o;
          break;
        case "quadraticCurveTo":
          d = s[0], u = s[1], n = s[2], a = s[3], s[0] = r * d + e * u + h, s[1] = i * d + c * u + o, s[2] = r * n + e * a + h, s[3] = i * n + c * a + o;
          break;
        case "arcToSvg":
          n = s[5], a = s[6], y = s[0], P = s[1], s[0] = r * y + e * P, s[1] = i * y + c * P, s[5] = r * n + e * a + h, s[6] = i * n + c * a + o;
          break;
        case "circle":
          s[4] = f(s[3], t);
          break;
        case "rect":
          s[4] = f(s[4], t);
          break;
        case "ellipse":
          s[8] = f(s[8], t);
          break;
        case "roundRect":
          s[5] = f(s[5], t);
          break;
        case "addPath":
          s[0].transform(t);
          break;
        case "poly":
          s[2] = f(s[2], t);
          break;
        default:
          C("unknown transform action", b.action);
          break;
      }
    }
    return this._dirty = !0, this;
  }
  get bounds() {
    return this.shapePath.bounds;
  }
  /**
   * Retrieves the last point from the current drawing instructions in the `GraphicsPath`.
   * This method is useful for operations that depend on the path's current endpoint,
   * such as connecting subsequent shapes or paths. It supports various drawing instructions,
   * ensuring the last point's position is accurately determined regardless of the path's complexity.
   *
   * If the last instruction is a `closePath`, the method iterates backward through the instructions
   *  until it finds an actionable instruction that defines a point (e.g., `moveTo`, `lineTo`,
   * `quadraticCurveTo`, etc.). For compound paths added via `addPath`, it recursively retrieves
   * the last point from the nested path.
   * @param out - A `Point` object where the last point's coordinates will be stored.
   * This object is modified directly to contain the result.
   * @returns The `Point` object containing the last point's coordinates.
   */
  getLastPoint(t) {
    let r = this.instructions.length - 1, i = this.instructions[r];
    if (!i)
      return t.x = 0, t.y = 0, t;
    for (; i.action === "closePath"; ) {
      if (r--, r < 0)
        return t.x = 0, t.y = 0, t;
      i = this.instructions[r];
    }
    switch (i.action) {
      case "moveTo":
      case "lineTo":
        t.x = i.data[0], t.y = i.data[1];
        break;
      case "quadraticCurveTo":
        t.x = i.data[2], t.y = i.data[3];
        break;
      case "bezierCurveTo":
        t.x = i.data[4], t.y = i.data[5];
        break;
      case "arc":
      case "arcToSvg":
        t.x = i.data[5], t.y = i.data[6];
        break;
      case "addPath":
        i.data[0].getLastPoint(t);
        break;
    }
    return t;
  }
}
function f(_, t) {
  return _ ? _.prepend(t) : t.clone();
}
export {
  v as GraphicsPath
};
//# sourceMappingURL=index520.js.map

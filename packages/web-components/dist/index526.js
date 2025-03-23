import { Circle as b } from "./index406.js";
import { Ellipse as S } from "./index408.js";
import { Polygon as f } from "./index409.js";
import { Rectangle as M } from "./index407.js";
import { RoundedRectangle as w } from "./index410.js";
import { Bounds as I } from "./index399.js";
import { buildAdaptiveBezier as R } from "./index502.js";
import { buildAdaptiveQuadratic as A } from "./index504.js";
import { buildArc as C } from "./index505.js";
import { buildArcTo as X } from "./index506.js";
import { buildArcToSvg as Y } from "./index507.js";
import { roundedShapeQuadraticCurve as z, roundedShapeArc as B } from "./index527.js";
const F = new M();
class O {
  constructor(t) {
    this.shapePrimitives = [], this._currentPoly = null, this._bounds = new I(), this._graphicsPath2D = t, this.signed = t.checkForHoles;
  }
  /**
   * Sets the starting point for a new sub-path. Any subsequent drawing commands are considered part of this path.
   * @param x - The x-coordinate for the starting point.
   * @param y - The y-coordinate for the starting point.
   * @returns The instance of the current object for chaining.
   */
  moveTo(t, s) {
    return this.startPoly(t, s), this;
  }
  /**
   * Connects the current point to a new point with a straight line. This method updates the current path.
   * @param x - The x-coordinate of the new point to connect to.
   * @param y - The y-coordinate of the new point to connect to.
   * @returns The instance of the current object for chaining.
   */
  lineTo(t, s) {
    this._ensurePoly();
    const e = this._currentPoly.points, n = e[e.length - 2], o = e[e.length - 1];
    return (n !== t || o !== s) && e.push(t, s), this;
  }
  /**
   * Adds an arc to the path. The arc is centered at (x, y)
   *  position with radius `radius` starting at `startAngle` and ending at `endAngle`.
   * @param x - The x-coordinate of the arc's center.
   * @param y - The y-coordinate of the arc's center.
   * @param radius - The radius of the arc.
   * @param startAngle - The starting angle of the arc, in radians.
   * @param endAngle - The ending angle of the arc, in radians.
   * @param counterclockwise - Specifies whether the arc should be drawn in the anticlockwise direction. False by default.
   * @returns The instance of the current object for chaining.
   */
  arc(t, s, e, n, o, i) {
    this._ensurePoly(!1);
    const r = this._currentPoly.points;
    return C(r, t, s, e, n, o, i), this;
  }
  /**
   * Adds an arc to the path with the arc tangent to the line joining two specified points.
   * The arc radius is specified by `radius`.
   * @param x1 - The x-coordinate of the first point.
   * @param y1 - The y-coordinate of the first point.
   * @param x2 - The x-coordinate of the second point.
   * @param y2 - The y-coordinate of the second point.
   * @param radius - The radius of the arc.
   * @returns The instance of the current object for chaining.
   */
  arcTo(t, s, e, n, o) {
    this._ensurePoly();
    const i = this._currentPoly.points;
    return X(i, t, s, e, n, o), this;
  }
  /**
   * Adds an SVG-style arc to the path, allowing for elliptical arcs based on the SVG spec.
   * @param rx - The x-radius of the ellipse.
   * @param ry - The y-radius of the ellipse.
   * @param xAxisRotation - The rotation of the ellipse's x-axis relative
   * to the x-axis of the coordinate system, in degrees.
   * @param largeArcFlag - Determines if the arc should be greater than or less than 180 degrees.
   * @param sweepFlag - Determines if the arc should be swept in a positive angle direction.
   * @param x - The x-coordinate of the arc's end point.
   * @param y - The y-coordinate of the arc's end point.
   * @returns The instance of the current object for chaining.
   */
  arcToSvg(t, s, e, n, o, i, r) {
    const c = this._currentPoly.points;
    return Y(
      c,
      this._currentPoly.lastX,
      this._currentPoly.lastY,
      i,
      r,
      t,
      s,
      e,
      n,
      o
    ), this;
  }
  /**
   * Adds a cubic Bezier curve to the path.
   * It requires three points: the first two are control points and the third one is the end point.
   * The starting point is the last point in the current path.
   * @param cp1x - The x-coordinate of the first control point.
   * @param cp1y - The y-coordinate of the first control point.
   * @param cp2x - The x-coordinate of the second control point.
   * @param cp2y - The y-coordinate of the second control point.
   * @param x - The x-coordinate of the end point.
   * @param y - The y-coordinate of the end point.
   * @param smoothness - Optional parameter to adjust the smoothness of the curve.
   * @returns The instance of the current object for chaining.
   */
  bezierCurveTo(t, s, e, n, o, i, r) {
    this._ensurePoly();
    const c = this._currentPoly;
    return R(
      this._currentPoly.points,
      c.lastX,
      c.lastY,
      t,
      s,
      e,
      n,
      o,
      i,
      r
    ), this;
  }
  /**
   * Adds a quadratic curve to the path. It requires two points: the control point and the end point.
   * The starting point is the last point in the current path.
   * @param cp1x - The x-coordinate of the control point.
   * @param cp1y - The y-coordinate of the control point.
   * @param x - The x-coordinate of the end point.
   * @param y - The y-coordinate of the end point.
   * @param smoothing - Optional parameter to adjust the smoothness of the curve.
   * @returns The instance of the current object for chaining.
   */
  quadraticCurveTo(t, s, e, n, o) {
    this._ensurePoly();
    const i = this._currentPoly;
    return A(
      this._currentPoly.points,
      i.lastX,
      i.lastY,
      t,
      s,
      e,
      n,
      o
    ), this;
  }
  /**
   * Closes the current path by drawing a straight line back to the start.
   * If the shape is already closed or there are no points in the path, this method does nothing.
   * @returns The instance of the current object for chaining.
   */
  closePath() {
    return this.endPoly(!0), this;
  }
  /**
   * Adds another path to the current path. This method allows for the combination of multiple paths into one.
   * @param path - The `GraphicsPath` object representing the path to add.
   * @param transform - An optional `Matrix` object to apply a transformation to the path before adding it.
   * @returns The instance of the current object for chaining.
   */
  addPath(t, s) {
    this.endPoly(), s && !s.isIdentity() && (t = t.clone(!0), t.transform(s));
    const e = this.shapePrimitives, n = e.length;
    for (let o = 0; o < t.instructions.length; o++) {
      const i = t.instructions[o];
      this[i.action](...i.data);
    }
    if (t.checkForHoles && e.length - n > 1) {
      let o = null;
      for (let i = n; i < e.length; i++) {
        const r = e[i];
        if (r.shape.type === "polygon") {
          const c = r.shape, a = o == null ? void 0 : o.shape;
          a && a.containsPolygon(c) ? (o.holes || (o.holes = []), o.holes.push(r), e.copyWithin(i, i + 1), e.length--, i--) : o = r;
        }
      }
    }
    return this;
  }
  /**
   * Finalizes the drawing of the current path. Optionally, it can close the path.
   * @param closePath - A boolean indicating whether to close the path after finishing. False by default.
   */
  finish(t = !1) {
    this.endPoly(t);
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
  rect(t, s, e, n, o) {
    return this.drawShape(new M(t, s, e, n), o), this;
  }
  /**
   * Draws a circle shape. This method adds a new circle path to the current drawing.
   * @param x - The x-coordinate of the center of the circle.
   * @param y - The y-coordinate of the center of the circle.
   * @param radius - The radius of the circle.
   * @param transform - An optional `Matrix` object to apply a transformation to the circle.
   * @returns The instance of the current object for chaining.
   */
  circle(t, s, e, n) {
    return this.drawShape(new b(t, s, e), n), this;
  }
  /**
   * Draws a polygon shape. This method allows for the creation of complex polygons by specifying a sequence of points.
   * @param points - An array of numbers, or or an array of PointData objects eg [{x,y}, {x,y}, {x,y}]
   * representing the x and y coordinates of the polygon's vertices, in sequence.
   * @param close - A boolean indicating whether to close the polygon path. True by default.
   * @param transform - An optional `Matrix` object to apply a transformation to the polygon.
   * @returns The instance of the current object for chaining.
   */
  poly(t, s, e) {
    const n = new f(t);
    return n.closePath = s, this.drawShape(n, e), this;
  }
  /**
   * Draws a regular polygon with a specified number of sides. All sides and angles are equal.
   * @param x - The x-coordinate of the center of the polygon.
   * @param y - The y-coordinate of the center of the polygon.
   * @param radius - The radius of the circumscribed circle of the polygon.
   * @param sides - The number of sides of the polygon. Must be 3 or more.
   * @param rotation - The rotation angle of the polygon, in radians. Zero by default.
   * @param transform - An optional `Matrix` object to apply a transformation to the polygon.
   * @returns The instance of the current object for chaining.
   */
  regularPoly(t, s, e, n, o = 0, i) {
    n = Math.max(n | 0, 3);
    const r = -1 * Math.PI / 2 + o, c = Math.PI * 2 / n, a = [];
    for (let l = 0; l < n; l++) {
      const h = r - l * c;
      a.push(
        t + e * Math.cos(h),
        s + e * Math.sin(h)
      );
    }
    return this.poly(a, !0, i), this;
  }
  /**
   * Draws a polygon with rounded corners.
   * Similar to `regularPoly` but with the ability to round the corners of the polygon.
   * @param x - The x-coordinate of the center of the polygon.
   * @param y - The y-coordinate of the center of the polygon.
   * @param radius - The radius of the circumscribed circle of the polygon.
   * @param sides - The number of sides of the polygon. Must be 3 or more.
   * @param corner - The radius of the rounding of the corners.
   * @param rotation - The rotation angle of the polygon, in radians. Zero by default.
   * @param smoothness - Optional parameter to adjust the smoothness of the rounding.
   * @returns The instance of the current object for chaining.
   */
  roundPoly(t, s, e, n, o, i = 0, r) {
    if (n = Math.max(n | 0, 3), o <= 0)
      return this.regularPoly(t, s, e, n, i);
    const c = e * Math.sin(Math.PI / n) - 1e-3;
    o = Math.min(o, c);
    const a = -1 * Math.PI / 2 + i, l = Math.PI * 2 / n, h = (n - 2) * Math.PI / n / 2;
    for (let u = 0; u < n; u++) {
      const p = u * l + a, P = t + e * Math.cos(p), m = s + e * Math.sin(p), y = p + Math.PI + h, d = p - Math.PI - h, g = P + o * Math.cos(y), _ = m + o * Math.sin(y), v = P + o * Math.cos(d), T = m + o * Math.sin(d);
      u === 0 ? this.moveTo(g, _) : this.lineTo(g, _), this.quadraticCurveTo(P, m, v, T, r);
    }
    return this.closePath();
  }
  /**
   * Draws a shape with rounded corners. This function supports custom radius for each corner of the shape.
   * Optionally, corners can be rounded using a quadratic curve instead of an arc, providing a different aesthetic.
   * @param points - An array of `RoundedPoint` representing the corners of the shape to draw.
   * A minimum of 3 points is required.
   * @param radius - The default radius for the corners.
   * This radius is applied to all corners unless overridden in `points`.
   * @param useQuadratic - If set to true, rounded corners are drawn using a quadraticCurve
   *  method instead of an arc method. Defaults to false.
   * @param smoothness - Specifies the smoothness of the curve when `useQuadratic` is true.
   * Higher values make the curve smoother.
   * @returns The instance of the current object for chaining.
   */
  roundShape(t, s, e = !1, n) {
    return t.length < 3 ? this : (e ? z(this, t, s, n) : B(this, t, s), this.closePath());
  }
  /**
   * Draw Rectangle with fillet corners. This is much like rounded rectangle
   * however it support negative numbers as well for the corner radius.
   * @param x - Upper left corner of rect
   * @param y - Upper right corner of rect
   * @param width - Width of rect
   * @param height - Height of rect
   * @param fillet - accept negative or positive values
   */
  filletRect(t, s, e, n, o) {
    if (o === 0)
      return this.rect(t, s, e, n);
    const i = Math.min(e, n) / 2, r = Math.min(i, Math.max(-i, o)), c = t + e, a = s + n, l = r < 0 ? -r : 0, h = Math.abs(r);
    return this.moveTo(t, s + h).arcTo(t + l, s + l, t + h, s, h).lineTo(c - h, s).arcTo(c - l, s + l, c, s + h, h).lineTo(c, a - h).arcTo(c - l, a - l, t + e - h, a, h).lineTo(t + h, a).arcTo(t + l, a - l, t, a - h, h).closePath();
  }
  /**
   * Draw Rectangle with chamfer corners. These are angled corners.
   * @param x - Upper left corner of rect
   * @param y - Upper right corner of rect
   * @param width - Width of rect
   * @param height - Height of rect
   * @param chamfer - non-zero real number, size of corner cutout
   * @param transform
   */
  chamferRect(t, s, e, n, o, i) {
    if (o <= 0)
      return this.rect(t, s, e, n);
    const r = Math.min(o, Math.min(e, n) / 2), c = t + e, a = s + n, l = [
      t + r,
      s,
      c - r,
      s,
      c,
      s + r,
      c,
      a - r,
      c - r,
      a,
      t + r,
      a,
      t,
      a - r,
      t,
      s + r
    ];
    for (let h = l.length - 1; h >= 2; h -= 2)
      l[h] === l[h - 2] && l[h - 1] === l[h - 3] && l.splice(h - 1, 2);
    return this.poly(l, !0, i);
  }
  /**
   * Draws an ellipse at the specified location and with the given x and y radii.
   * An optional transformation can be applied, allowing for rotation, scaling, and translation.
   * @param x - The x-coordinate of the center of the ellipse.
   * @param y - The y-coordinate of the center of the ellipse.
   * @param radiusX - The horizontal radius of the ellipse.
   * @param radiusY - The vertical radius of the ellipse.
   * @param transform - An optional `Matrix` object to apply a transformation to the ellipse. This can include rotations.
   * @returns The instance of the current object for chaining.
   */
  ellipse(t, s, e, n, o) {
    return this.drawShape(new S(t, s, e, n), o), this;
  }
  /**
   * Draws a rectangle with rounded corners.
   * The corner radius can be specified to determine how rounded the corners should be.
   * An optional transformation can be applied, which allows for rotation, scaling, and translation of the rectangle.
   * @param x - The x-coordinate of the top-left corner of the rectangle.
   * @param y - The y-coordinate of the top-left corner of the rectangle.
   * @param w - The width of the rectangle.
   * @param h - The height of the rectangle.
   * @param radius - The radius of the rectangle's corners. If not specified, corners will be sharp.
   * @param transform - An optional `Matrix` object to apply a transformation to the rectangle.
   * @returns The instance of the current object for chaining.
   */
  roundRect(t, s, e, n, o, i) {
    return this.drawShape(new w(t, s, e, n, o), i), this;
  }
  /**
   * Draws a given shape on the canvas.
   * This is a generic method that can draw any type of shape specified by the `ShapePrimitive` parameter.
   * An optional transformation matrix can be applied to the shape, allowing for complex transformations.
   * @param shape - The shape to draw, defined as a `ShapePrimitive` object.
   * @param matrix - An optional `Matrix` for transforming the shape. This can include rotations,
   * scaling, and translations.
   * @returns The instance of the current object for chaining.
   */
  drawShape(t, s) {
    return this.endPoly(), this.shapePrimitives.push({ shape: t, transform: s }), this;
  }
  /**
   * Starts a new polygon path from the specified starting point.
   * This method initializes a new polygon or ends the current one if it exists.
   * @param x - The x-coordinate of the starting point of the new polygon.
   * @param y - The y-coordinate of the starting point of the new polygon.
   * @returns The instance of the current object for chaining.
   */
  startPoly(t, s) {
    let e = this._currentPoly;
    return e && this.endPoly(), e = new f(), e.points.push(t, s), this._currentPoly = e, this;
  }
  /**
   * Ends the current polygon path. If `closePath` is set to true,
   * the path is closed by connecting the last point to the first one.
   * This method finalizes the current polygon and prepares it for drawing or adding to the shape primitives.
   * @param closePath - A boolean indicating whether to close the polygon by connecting the last point
   *  back to the starting point. False by default.
   * @returns The instance of the current object for chaining.
   */
  endPoly(t = !1) {
    const s = this._currentPoly;
    return s && s.points.length > 2 && (s.closePath = t, this.shapePrimitives.push({ shape: s })), this._currentPoly = null, this;
  }
  _ensurePoly(t = !0) {
    if (!this._currentPoly && (this._currentPoly = new f(), t)) {
      const s = this.shapePrimitives[this.shapePrimitives.length - 1];
      if (s) {
        let e = s.shape.x, n = s.shape.y;
        if (s.transform && !s.transform.isIdentity()) {
          const o = s.transform, i = e;
          e = o.a * e + o.c * n + o.tx, n = o.b * i + o.d * n + o.ty;
        }
        this._currentPoly.points.push(e, n);
      } else
        this._currentPoly.points.push(0, 0);
    }
  }
  /** Builds the path. */
  buildPath() {
    const t = this._graphicsPath2D;
    this.shapePrimitives.length = 0, this._currentPoly = null;
    for (let s = 0; s < t.instructions.length; s++) {
      const e = t.instructions[s];
      this[e.action](...e.data);
    }
    this.finish();
  }
  /** Gets the bounds of the path. */
  get bounds() {
    const t = this._bounds;
    t.clear();
    const s = this.shapePrimitives;
    for (let e = 0; e < s.length; e++) {
      const n = s[e], o = n.shape.getBounds(F);
      n.transform ? t.addRect(o, n.transform) : t.addRect(o);
    }
    return t;
  }
}
export {
  O as ShapePath
};
//# sourceMappingURL=index526.js.map

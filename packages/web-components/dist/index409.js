import { squaredDistanceToLineSegment as m } from "./index404.js";
import { Rectangle as x } from "./index407.js";
let P, S;
class f {
  /**
   * @param points - This can be an array of Points
   *  that form the polygon, a flat array of numbers that will be interpreted as [x,y, x,y, ...], or
   *  the arguments passed can be all the points of the polygon e.g.
   *  `new Polygon(new Point(), new Point(), ...)`, or the arguments passed can be flat
   *  x,y values e.g. `new Polygon(x,y, x,y, x,y, ...)` where `x` and `y` are Numbers.
   */
  constructor(...t) {
    this.type = "polygon";
    let n = Array.isArray(t[0]) ? t[0] : t;
    if (typeof n[0] != "number") {
      const e = [];
      for (let s = 0, i = n.length; s < i; s++)
        e.push(n[s].x, n[s].y);
      n = e;
    }
    this.points = n, this.closePath = !0;
  }
  /**
   * Determines whether the polygon's points are arranged in a clockwise direction.
   * This is calculated using the "shoelace formula" (also known as surveyor's formula) to find the signed area.
   * A positive area indicates clockwise winding, while negative indicates counter-clockwise.
   *
   * The formula sums up the cross products of adjacent vertices:
   * For each pair of adjacent points (x1,y1) and (x2,y2), we calculate (x1*y2 - x2*y1)
   * The final sum divided by 2 gives the signed area - positive for clockwise.
   * @returns `true` if the polygon's points are arranged clockwise, `false` if counter-clockwise
   */
  isClockwise() {
    let t = 0;
    const n = this.points, e = n.length;
    for (let s = 0; s < e; s += 2) {
      const i = n[s], o = n[s + 1], h = n[(s + 2) % e], r = n[(s + 3) % e];
      t += (h - i) * (r + o);
    }
    return t < 0;
  }
  /**
   * Checks if this polygon completely contains another polygon.
   *
   * This is useful for detecting holes in shapes, like when parsing SVG paths.
   * For example, if you have two polygons:
   * ```ts
   * const outerSquare = new Polygon([0,0, 100,0, 100,100, 0,100]); // A square
   * const innerSquare = new Polygon([25,25, 75,25, 75,75, 25,75]); // A smaller square inside
   *
   * outerSquare.containsPolygon(innerSquare); // Returns true
   * innerSquare.containsPolygon(outerSquare); // Returns false
   * ```
   * @param polygon - The polygon to test for containment
   * @returns True if this polygon completely contains the other polygon
   */
  containsPolygon(t) {
    const n = this.getBounds(P), e = t.getBounds(S);
    if (!n.containsRect(e))
      return !1;
    const s = t.points;
    for (let i = 0; i < s.length; i += 2) {
      const o = s[i], h = s[i + 1];
      if (!this.contains(o, h))
        return !1;
    }
    return !0;
  }
  /**
   * Creates a clone of this polygon.
   * @returns - A copy of the polygon.
   */
  clone() {
    const t = this.points.slice(), n = new f(t);
    return n.closePath = this.closePath, n;
  }
  /**
   * Checks whether the x and y coordinates passed to this function are contained within this polygon.
   * @param x - The X coordinate of the point to test.
   * @param y - The Y coordinate of the point to test.
   * @returns - Whether the x/y coordinates are within this polygon.
   */
  contains(t, n) {
    let e = !1;
    const s = this.points.length / 2;
    for (let i = 0, o = s - 1; i < s; o = i++) {
      const h = this.points[i * 2], r = this.points[i * 2 + 1], l = this.points[o * 2], c = this.points[o * 2 + 1];
      r > n != c > n && t < (l - h) * ((n - r) / (c - r)) + h && (e = !e);
    }
    return e;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this polygon including the stroke.
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @param strokeWidth - The width of the line to check
   * @param alignment - The alignment of the stroke, 0.5 by default
   * @returns Whether the x/y coordinates are within this polygon
   */
  strokeContains(t, n, e, s = 0.5) {
    const i = e * e, o = i * (1 - s), h = i - o, { points: r } = this, l = r.length - (this.closePath ? 0 : 2);
    for (let c = 0; c < l; c += 2) {
      const a = r[c], p = r[c + 1], g = r[(c + 2) % r.length], u = r[(c + 3) % r.length], y = m(t, n, a, p, g, u), d = Math.sign((g - a) * (n - p) - (u - p) * (t - a));
      if (y <= (d < 0 ? h : o))
        return !0;
    }
    return !1;
  }
  /**
   * Returns the framing rectangle of the polygon as a Rectangle object
   * @param out - optional rectangle to store the result
   * @returns The framing rectangle
   */
  getBounds(t) {
    t || (t = new x());
    const n = this.points;
    let e = 1 / 0, s = -1 / 0, i = 1 / 0, o = -1 / 0;
    for (let h = 0, r = n.length; h < r; h += 2) {
      const l = n[h], c = n[h + 1];
      e = l < e ? l : e, s = l > s ? l : s, i = c < i ? c : i, o = c > o ? c : o;
    }
    return t.x = e, t.width = s - e, t.y = i, t.height = o - i, t;
  }
  /**
   * Copies another polygon to this one.
   * @param polygon - The polygon to copy from.
   * @returns Returns itself.
   */
  copyFrom(t) {
    return this.points = t.points.slice(), this.closePath = t.closePath, this;
  }
  /**
   * Copies this polygon to another one.
   * @param polygon - The polygon to copy to.
   * @returns Returns given parameter.
   */
  copyTo(t) {
    return t.copyFrom(this), t;
  }
  toString() {
    return `[pixi.js/math:PolygoncloseStroke=${this.closePath}points=${this.points.reduce((t, n) => `${t}, ${n}`, "")}]`;
  }
  /**
   * Get the last X coordinate of the polygon
   * @readonly
   */
  get lastX() {
    return this.points[this.points.length - 2];
  }
  /**
   * Get the last Y coordinate of the polygon
   * @readonly
   */
  get lastY() {
    return this.points[this.points.length - 1];
  }
  /**
   * Get the first X coordinate of the polygon
   * @readonly
   */
  get x() {
    return this.points[this.points.length - 2];
  }
  /**
   * Get the first Y coordinate of the polygon
   * @readonly
   */
  get y() {
    return this.points[this.points.length - 1];
  }
}
export {
  f as Polygon
};
//# sourceMappingURL=index409.js.map

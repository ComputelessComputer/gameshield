import { curves as f } from "./index264.js";
class y {
  /**
   * Calculate length of quadratic curve
   * @see {@link http://www.malczak.linuxpl.com/blog/quadratic-bezier-curve-length/}
   * for the detailed explanation of math behind this.
   * @private
   * @param fromX - x-coordinate of curve start point
   * @param fromY - y-coordinate of curve start point
   * @param cpX - x-coordinate of curve control point
   * @param cpY - y-coordinate of curve control point
   * @param toX - x-coordinate of curve end point
   * @param toY - y-coordinate of curve end point
   * @returns - Length of quadratic curve
   */
  static curveLength(e, r, l, b, s, c) {
    const h = e - 2 * l + s, g = r - 2 * b + c, n = 2 * l - 2 * e, u = 2 * b - 2 * r, a = 4 * (h * h + g * g), t = 4 * (h * n + g * u), v = n * n + u * u, x = 2 * Math.sqrt(a + t + v), o = Math.sqrt(a), M = 2 * a * o, m = 2 * Math.sqrt(v), q = t / o;
    return (M * x + o * t * (x - m) + (4 * v * a - t * t) * Math.log((2 * o + q + x) / (q + m))) / (4 * M);
  }
  /**
   * Calculate the points for a quadratic bezier curve and then draws it.
   * Based on: https://stackoverflow.com/questions/785097/how-do-i-implement-a-bezier-curve-in-c
   * @private
   * @param cpX - Control point x
   * @param cpY - Control point y
   * @param toX - Destination point x
   * @param toY - Destination point y
   * @param points - Points to add segments to.
   */
  static curveTo(e, r, l, b, s) {
    const c = s[s.length - 2], h = s[s.length - 1], g = f._segmentsCount(
      y.curveLength(c, h, e, r, l, b)
    );
    let n = 0, u = 0;
    for (let a = 1; a <= g; ++a) {
      const t = a / g;
      n = c + (e - c) * t, u = h + (r - h) * t, s.push(
        n + (e + (l - e) * t - n) * t,
        u + (r + (b - r) * t - u) * t
      );
    }
  }
}
export {
  y as QuadraticUtils
};
//# sourceMappingURL=index267.js.map

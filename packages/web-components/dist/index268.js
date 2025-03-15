import { curves as T } from "./index264.js";
class M {
  /**
   * Calculate length of bezier curve.
   * Analytical solution is impossible, since it involves an integral that does not integrate in general.
   * Therefore numerical solution is used.
   * @private
   * @param fromX - Starting point x
   * @param fromY - Starting point y
   * @param cpX - Control point x
   * @param cpY - Control point y
   * @param cpX2 - Second Control point x
   * @param cpY2 - Second Control point y
   * @param toX - Destination point x
   * @param toY - Destination point y
   * @returns - Length of bezier curve
   */
  static curveLength(c, d, f, m, x, y, u, a) {
    let v = 0, r = 0, t = 0, n = 0, l = 0, h = 0, s = 0, g = 0, e = 0, L = 0, j = 0, q = c, C = d;
    for (let o = 1; o <= 10; ++o)
      r = o / 10, t = r * r, n = t * r, l = 1 - r, h = l * l, s = h * l, g = s * c + 3 * h * r * f + 3 * l * t * x + n * u, e = s * d + 3 * h * r * m + 3 * l * t * y + n * a, L = q - g, j = C - e, q = g, C = e, v += Math.sqrt(L * L + j * j);
    return v;
  }
  /**
   * Calculate the points for a bezier curve and then draws it.
   *
   * Ignored from docs since it is not directly exposed.
   * @ignore
   * @param cpX - Control point x
   * @param cpY - Control point y
   * @param cpX2 - Second Control point x
   * @param cpY2 - Second Control point y
   * @param toX - Destination point x
   * @param toY - Destination point y
   * @param points - Path array to push points into
   */
  static curveTo(c, d, f, m, x, y, u) {
    const a = u[u.length - 2], v = u[u.length - 1];
    u.length -= 2;
    const r = T._segmentsCount(
      M.curveLength(a, v, c, d, f, m, x, y)
    );
    let t = 0, n = 0, l = 0, h = 0, s = 0;
    u.push(a, v);
    for (let g = 1, e = 0; g <= r; ++g)
      e = g / r, t = 1 - e, n = t * t, l = n * t, h = e * e, s = h * e, u.push(
        l * a + 3 * n * e * c + 3 * t * h * f + s * x,
        l * v + 3 * n * e * d + 3 * t * h * m + s * y
      );
  }
}
export {
  M as BezierUtils
};
//# sourceMappingURL=index268.js.map

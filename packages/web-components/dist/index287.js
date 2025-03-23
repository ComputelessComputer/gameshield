import "./index20.js";
import "./index21.js";
import "./index22.js";
import "./index23.js";
import "./index24.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import "./index28.js";
import "./index29.js";
import "./index30.js";
import "./index31.js";
import { PI_2 as x } from "./index262.js";
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
import { curves as C } from "./index282.js";
class Et {
  /**
   * Calculate information of the arc for {@link PIXI.Graphics.arcTo}.
   * @private
   * @param x1 - The x-coordinate of the first control point of the arc
   * @param y1 - The y-coordinate of the first control point of the arc
   * @param x2 - The x-coordinate of the second control point of the arc
   * @param y2 - The y-coordinate of the second control point of the arc
   * @param radius - The radius of the arc
   * @param points - Collection of points to add to
   * @returns - If the arc length is valid, return center of circle, radius and other info otherwise `null`.
   */
  static curveTo(s, n, q, u, p, t) {
    const w = t[t.length - 2], a = t[t.length - 1] - n, o = w - s, r = u - n, m = q - s, e = Math.abs(a * m - o * r);
    if (e < 1e-8 || p === 0)
      return (t[t.length - 2] !== s || t[t.length - 1] !== n) && t.push(s, n), null;
    const f = a * a + o * o, g = r * r + m * m, b = a * r + o * m, i = p * Math.sqrt(f) / e, c = p * Math.sqrt(g) / e, h = i * b / f, _ = c * b / g, l = i * m + c * o, M = i * r + c * a, k = o * (c + h), T = a * (c + h), j = m * (i + _), v = r * (i + _), A = Math.atan2(T - M, k - l), X = Math.atan2(v - M, j - l);
    return {
      cx: l + s,
      cy: M + n,
      radius: p,
      startAngle: A,
      endAngle: X,
      anticlockwise: o * r > m * a
    };
  }
  /**
   * The arc method creates an arc/curve (used to create circles, or parts of circles).
   * @private
   * @param _startX - Start x location of arc
   * @param _startY - Start y location of arc
   * @param cx - The x-coordinate of the center of the circle
   * @param cy - The y-coordinate of the center of the circle
   * @param radius - The radius of the circle
   * @param startAngle - The starting angle, in radians (0 is at the 3 o'clock position
   *  of the arc's circle)
   * @param endAngle - The ending angle, in radians
   * @param _anticlockwise - Specifies whether the drawing should be
   *  counter-clockwise or clockwise. False is default, and indicates clockwise, while true
   *  indicates counter-clockwise.
   * @param points - Collection of points to add to
   */
  static arc(s, n, q, u, p, t, w, a, o) {
    const r = w - t, m = C._segmentsCount(
      Math.abs(r) * p,
      Math.ceil(Math.abs(r) / x) * 40
    ), e = r / (m * 2), f = e * 2, g = Math.cos(e), b = Math.sin(e), i = m - 1, c = i % 1 / i;
    for (let h = 0; h <= i; ++h) {
      const _ = h + c * h, l = e + t + f * _, M = Math.cos(l), k = -Math.sin(l);
      o.push(
        (g * M + b * k) * p + q,
        (g * -k + b * M) * p + u
      );
    }
  }
}
export {
  Et as ArcUtils
};
//# sourceMappingURL=index287.js.map

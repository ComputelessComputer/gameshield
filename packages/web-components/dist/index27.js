import { SHAPES as y } from "./index240.js";
class l {
  /**
   * @param {PIXI.IPointData[]|number[]} points - This can be an array of Points
   *  that form the polygon, a flat array of numbers that will be interpreted as [x,y, x,y, ...], or
   *  the arguments passed can be all the points of the polygon e.g.
   *  `new Polygon(new Point(), new Point(), ...)`, or the arguments passed can be flat
   *  x,y values e.g. `new Polygon(x,y, x,y, x,y, ...)` where `x` and `y` are Numbers.
   */
  constructor(...o) {
    let t = Array.isArray(o[0]) ? o[0] : o;
    if (typeof t[0] != "number") {
      const i = [];
      for (let s = 0, e = t.length; s < e; s++)
        i.push(t[s].x, t[s].y);
      t = i;
    }
    this.points = t, this.type = y.POLY, this.closeStroke = !0;
  }
  /**
   * Creates a clone of this polygon.
   * @returns - A copy of the polygon.
   */
  clone() {
    const o = this.points.slice(), t = new l(o);
    return t.closeStroke = this.closeStroke, t;
  }
  /**
   * Checks whether the x and y coordinates passed to this function are contained within this polygon.
   * @param x - The X coordinate of the point to test.
   * @param y - The Y coordinate of the point to test.
   * @returns - Whether the x/y coordinates are within this polygon.
   */
  contains(o, t) {
    let i = !1;
    const s = this.points.length / 2;
    for (let e = 0, n = s - 1; e < s; n = e++) {
      const p = this.points[e * 2], r = this.points[e * 2 + 1], u = this.points[n * 2], c = this.points[n * 2 + 1];
      r > t != c > t && o < (u - p) * ((t - r) / (c - r)) + p && (i = !i);
    }
    return i;
  }
}
l.prototype.toString = function() {
  return `[@pixi/math:PolygoncloseStroke=${this.closeStroke}points=${this.points.reduce((h, o) => `${h}, ${o}`, "")}]`;
};
export {
  l as Polygon
};
//# sourceMappingURL=index27.js.map

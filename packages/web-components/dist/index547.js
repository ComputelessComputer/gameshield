import { PlaneGeometry as m } from "./index534.js";
const _ = class l extends m {
  constructor(t = {}) {
    t = { ...l.defaultOptions, ...t }, super({
      width: t.width,
      height: t.height,
      verticesX: 4,
      verticesY: 4
    }), this.update(t);
  }
  /**
   * Updates the NineSliceGeometry with the options.
   * @param options - The options of the NineSliceGeometry.
   */
  update(t) {
    var i, h;
    this.width = t.width ?? this.width, this.height = t.height ?? this.height, this._originalWidth = t.originalWidth ?? this._originalWidth, this._originalHeight = t.originalHeight ?? this._originalHeight, this._leftWidth = t.leftWidth ?? this._leftWidth, this._rightWidth = t.rightWidth ?? this._rightWidth, this._topHeight = t.topHeight ?? this._topHeight, this._bottomHeight = t.bottomHeight ?? this._bottomHeight, this._anchorX = (i = t.anchor) == null ? void 0 : i.x, this._anchorY = (h = t.anchor) == null ? void 0 : h.y, this.updateUvs(), this.updatePositions();
  }
  /** Updates the positions of the vertices. */
  updatePositions() {
    const t = this.positions, {
      width: i,
      height: h,
      _leftWidth: o,
      _rightWidth: r,
      _topHeight: a,
      _bottomHeight: d,
      _anchorX: u,
      _anchorY: H
    } = this, c = o + r, W = i > c ? 1 : i / c, n = a + d, f = h > n ? 1 : h / n, e = Math.min(W, f), s = u * i, g = H * h;
    t[0] = t[8] = t[16] = t[24] = -s, t[2] = t[10] = t[18] = t[26] = o * e - s, t[4] = t[12] = t[20] = t[28] = i - r * e - s, t[6] = t[14] = t[22] = t[30] = i - s, t[1] = t[3] = t[5] = t[7] = -g, t[9] = t[11] = t[13] = t[15] = a * e - g, t[17] = t[19] = t[21] = t[23] = h - d * e - g, t[25] = t[27] = t[29] = t[31] = h - g, this.getBuffer("aPosition").update();
  }
  /** Updates the UVs of the vertices. */
  updateUvs() {
    const t = this.uvs;
    t[0] = t[8] = t[16] = t[24] = 0, t[1] = t[3] = t[5] = t[7] = 0, t[6] = t[14] = t[22] = t[30] = 1, t[25] = t[27] = t[29] = t[31] = 1;
    const i = 1 / this._originalWidth, h = 1 / this._originalHeight;
    t[2] = t[10] = t[18] = t[26] = i * this._leftWidth, t[9] = t[11] = t[13] = t[15] = h * this._topHeight, t[4] = t[12] = t[20] = t[28] = 1 - i * this._rightWidth, t[17] = t[19] = t[21] = t[23] = 1 - h * this._bottomHeight, this.getBuffer("aUV").update();
  }
};
_.defaultOptions = {
  /** The width of the NineSlicePlane, setting this will actually modify the vertices and UV's of this plane. */
  width: 100,
  /** The height of the NineSlicePlane, setting this will actually modify the vertices and UV's of this plane. */
  height: 100,
  /** The width of the left column. */
  leftWidth: 10,
  /** The height of the top row. */
  topHeight: 10,
  /** The width of the right column. */
  rightWidth: 10,
  /** The height of the bottom row. */
  bottomHeight: 10,
  /** The original width of the texture */
  originalWidth: 100,
  /** The original height of the texture */
  originalHeight: 100
};
let p = _;
export {
  p as NineSliceGeometry
};
//# sourceMappingURL=index547.js.map

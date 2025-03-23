const t = class {
  /**
   * @param left - The left coordinate value of the bounding box.
   * @param top - The top coordinate value of the bounding box.
   * @param right - The right coordinate value of the bounding box.
   * @param bottom - The bottom coordinate value of the bounding box.
   */
  constructor(i, h, o, s) {
    this.left = i, this.top = h, this.right = o, this.bottom = s;
  }
  /** The width of the bounding box. */
  get width() {
    return this.right - this.left;
  }
  /** The height of the bounding box. */
  get height() {
    return this.bottom - this.top;
  }
  /** Determines whether the BoundingBox is empty. */
  isEmpty() {
    return this.left === this.right || this.top === this.bottom;
  }
};
t.EMPTY = new t(0, 0, 0, 0);
let e = t;
export {
  e as BoundingBox
};
//# sourceMappingURL=index42.js.map

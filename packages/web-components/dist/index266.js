import { LINE_CAP as i, LINE_JOIN as s } from "./index264.js";
import { FillStyle as h } from "./index265.js";
class e extends h {
  constructor() {
    super(...arguments), this.width = 0, this.alignment = 0.5, this.native = !1, this.cap = i.BUTT, this.join = s.MITER, this.miterLimit = 10;
  }
  /** Clones the object. */
  clone() {
    const t = new e();
    return t.color = this.color, t.alpha = this.alpha, t.texture = this.texture, t.matrix = this.matrix, t.visible = this.visible, t.width = this.width, t.alignment = this.alignment, t.native = this.native, t.cap = this.cap, t.join = this.join, t.miterLimit = this.miterLimit, t;
  }
  /** Reset the line style to default. */
  reset() {
    super.reset(), this.color = 0, this.alignment = 0.5, this.width = 0, this.native = !1, this.cap = i.BUTT, this.join = s.MITER, this.miterLimit = 10;
  }
}
export {
  e as LineStyle
};
//# sourceMappingURL=index266.js.map

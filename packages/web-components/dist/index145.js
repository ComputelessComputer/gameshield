import { AbstractText as r, ensureTextOptions as i } from "./index590.js";
import { CanvasTextMetrics as m } from "./index570.js";
import { TextStyle as x } from "./index564.js";
class u extends r {
  constructor(...t) {
    const e = i(t, "Text");
    super(e, x), this.renderPipeId = "text";
  }
  /** @private */
  updateBounds() {
    const t = this._bounds, e = this._anchor, o = m.measureText(
      this._text,
      this._style
    ), { width: s, height: n } = o;
    t.minX = -e._x * s, t.maxX = t.minX + s, t.minY = -e._y * n, t.maxY = t.minY + n;
  }
}
export {
  u as Text
};
//# sourceMappingURL=index145.js.map

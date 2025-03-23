import { ExtensionType as i } from "./index153.js";
import { Sprite as t } from "./index147.js";
import { addMaskBounds as r } from "./index443.js";
import { addMaskLocalBounds as n } from "./index444.js";
class m {
  constructor(s) {
    this.priority = 0, this.inverse = !1, this.pipe = "alphaMask", s != null && s.mask && this.init(s.mask);
  }
  init(s) {
    this.mask = s, this.renderMaskToTexture = !(s instanceof t), this.mask.renderable = this.renderMaskToTexture, this.mask.includeInBuild = !this.renderMaskToTexture, this.mask.measurable = !1;
  }
  reset() {
    this.mask.measurable = !0, this.mask = null;
  }
  addBounds(s, e) {
    this.inverse || r(this.mask, s, e);
  }
  addLocalBounds(s, e) {
    n(this.mask, s, e);
  }
  containsPoint(s, e) {
    const a = this.mask;
    return e(a, s);
  }
  destroy() {
    this.reset();
  }
  static test(s) {
    return s instanceof t;
  }
}
m.extension = i.MaskEffect;
export {
  m as AlphaMask
};
//# sourceMappingURL=index320.js.map

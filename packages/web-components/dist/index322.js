import { ExtensionType as i } from "./index153.js";
import { Container as e } from "./index148.js";
import { addMaskBounds as r } from "./index443.js";
import { addMaskLocalBounds as n } from "./index444.js";
class m {
  constructor(s) {
    this.priority = 0, this.pipe = "stencilMask", s != null && s.mask && this.init(s.mask);
  }
  init(s) {
    this.mask = s, this.mask.includeInBuild = !1, this.mask.measurable = !1;
  }
  reset() {
    this.mask.measurable = !0, this.mask.includeInBuild = !0, this.mask = null;
  }
  addBounds(s, t) {
    r(this.mask, s, t);
  }
  addLocalBounds(s, t) {
    n(this.mask, s, t);
  }
  containsPoint(s, t) {
    const a = this.mask;
    return t(a, s);
  }
  destroy() {
    this.reset();
  }
  static test(s) {
    return s instanceof e;
  }
}
m.extension = i.MaskEffect;
export {
  m as StencilMask
};
//# sourceMappingURL=index322.js.map

import { ExtensionType as r } from "./index153.js";
class s {
  constructor(t) {
    this.priority = 0, this.pipe = "colorMask", t != null && t.mask && this.init(t.mask);
  }
  init(t) {
    this.mask = t;
  }
  destroy() {
  }
  static test(t) {
    return typeof t == "number";
  }
}
s.extension = r.MaskEffect;
export {
  s as ColorMask
};
//# sourceMappingURL=index321.js.map

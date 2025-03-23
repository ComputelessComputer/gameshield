import { extensions as a, ExtensionType as f } from "./index153.js";
import { BigPool as i } from "./index446.js";
class n {
  constructor() {
    this._effectClasses = [], this._tests = [], this._initialized = !1;
  }
  init() {
    this._initialized || (this._initialized = !0, this._effectClasses.forEach((t) => {
      this.add({
        test: t.test,
        maskClass: t
      });
    }));
  }
  add(t) {
    this._tests.push(t);
  }
  getMaskEffect(t) {
    this._initialized || this.init();
    for (let s = 0; s < this._tests.length; s++) {
      const e = this._tests[s];
      if (e.test(t))
        return i.get(e.maskClass, t);
    }
    return t;
  }
  returnMaskEffect(t) {
    i.return(t);
  }
}
const r = new n();
a.handleByList(f.MaskEffect, r._effectClasses);
export {
  r as MaskEffectManager,
  n as MaskEffectManagerClass
};
//# sourceMappingURL=index445.js.map

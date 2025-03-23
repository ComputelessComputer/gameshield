import { PRECISION as t } from "./index164.js";
import { getTestContext as i } from "./index246.js";
let r;
function m() {
  if (!r) {
    r = t.MEDIUM;
    const e = i();
    if (e && e.getShaderPrecisionFormat) {
      const o = e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT);
      o && (r = o.precision ? t.HIGH : t.MEDIUM);
    }
  }
  return r;
}
export {
  m as getMaxFragmentPrecision
};
//# sourceMappingURL=index233.js.map

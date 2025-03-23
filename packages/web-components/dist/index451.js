import { getTestContext as t } from "./index413.js";
let r;
function o() {
  if (!r) {
    r = "mediump";
    const e = t();
    e && e.getShaderPrecisionFormat && (r = e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).precision ? "highp" : "mediump");
  }
  return r;
}
export {
  o as getMaxFragmentPrecision
};
//# sourceMappingURL=index451.js.map

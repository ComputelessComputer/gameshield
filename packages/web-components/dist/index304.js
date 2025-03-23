import { Color as r } from "./index21.js";
import { deprecation as t } from "./index137.js";
function i(e) {
  return t("7.2.0", "utils.hex2string is deprecated, use Color#toHex instead"), r.shared.setValue(e).toHex();
}
function u(e) {
  return t("7.2.0", "utils.rgb2hex is deprecated, use Color#toNumber instead"), r.shared.setValue(e).toNumber();
}
export {
  i as hex2string,
  u as rgb2hex
};
//# sourceMappingURL=index304.js.map

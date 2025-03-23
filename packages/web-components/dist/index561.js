import { DOMAdapter as t } from "./index365.js";
import { bitmapFontXMLParser as e } from "./index560.js";
const n = {
  test(r) {
    return typeof r == "string" && r.includes("<font>") ? e.test(t.get().parseXML(r)) : !1;
  },
  parse(r) {
    return e.parse(t.get().parseXML(r));
  }
};
export {
  n as bitmapFontXMLStringParser
};
//# sourceMappingURL=index561.js.map

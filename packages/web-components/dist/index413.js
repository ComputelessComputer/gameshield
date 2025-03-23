import { DOMAdapter as e } from "./index365.js";
let t;
function o() {
  return (!t || t != null && t.isContextLost()) && (t = e.get().createCanvas().getContext("webgl", {})), t;
}
export {
  o as getTestContext
};
//# sourceMappingURL=index413.js.map

import { ENV as s } from "./index164.js";
import { settings as o } from "./index163.js";
import "./index33.js";
const r = {};
let e = r;
function x() {
  if (e === r || e != null && e.isContextLost()) {
    const n = o.ADAPTER.createCanvas();
    let t;
    o.PREFER_ENV >= s.WEBGL2 && (t = n.getContext("webgl2", {})), t || (t = n.getContext("webgl", {}) || n.getContext("experimental-webgl", {}), t ? t.getExtension("WEBGL_draw_buffers") : t = null), e = t;
  }
  return e;
}
export {
  x as getTestContext
};
//# sourceMappingURL=index246.js.map

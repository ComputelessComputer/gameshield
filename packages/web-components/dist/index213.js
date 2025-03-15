import "./index40.js";
import { settings as e } from "./index150.js";
import "./index36.js";
let n;
function p() {
  return typeof n > "u" && (n = function() {
    var r;
    const o = {
      stencil: !0,
      failIfMajorPerformanceCaveat: e.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT
    };
    try {
      if (!e.ADAPTER.getWebGLRenderingContext())
        return !1;
      const s = e.ADAPTER.createCanvas();
      let t = s.getContext("webgl", o) || s.getContext("experimental-webgl", o);
      const i = !!((r = t == null ? void 0 : t.getContextAttributes()) != null && r.stencil);
      if (t) {
        const c = t.getExtension("WEBGL_lose_context");
        c && c.loseContext();
      }
      return t = null, i;
    } catch {
      return !1;
    }
  }()), n;
}
export {
  p as isWebGLSupported
};
//# sourceMappingURL=index213.js.map

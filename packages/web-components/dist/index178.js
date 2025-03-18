import { settings as r } from "./index145.js";
import { isMobile as e } from "./index36.js";
function c(n) {
  let o = !0;
  const a = r.ADAPTER.getNavigator();
  if (e.tablet || e.phone) {
    if (e.apple.device) {
      const t = a.userAgent.match(/OS (\d+)_(\d+)?/);
      t && parseInt(t[1], 10) < 11 && (o = !1);
    }
    if (e.android.device) {
      const t = a.userAgent.match(/Android\s([0-9.]*)/);
      t && parseInt(t[1], 10) < 7 && (o = !1);
    }
  }
  return o ? n : 4;
}
export {
  c as maxRecommendedTextures
};
//# sourceMappingURL=index178.js.map

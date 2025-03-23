import { ExtensionType as n } from "./index153.js";
import { Texture as s } from "./index360.js";
const x = {
  extension: {
    type: n.CacheParser,
    name: "cacheTextureArray"
  },
  test: (e) => Array.isArray(e) && e.every((r) => r instanceof s),
  getCacheableAssets: (e, r) => {
    const t = {};
    return e.forEach((o) => {
      r.forEach((c, a) => {
        t[o + (a === 0 ? "" : a + 1)] = c;
      });
    }), t;
  }
};
export {
  x as cacheTextureArray
};
//# sourceMappingURL=index341.js.map

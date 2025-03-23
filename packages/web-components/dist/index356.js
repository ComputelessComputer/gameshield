import { ExtensionType as o } from "./index153.js";
import { loadTextures as t } from "./index353.js";
import { Resolver as s } from "./index357.js";
const l = {
  extension: {
    type: o.ResolveParser,
    name: "resolveTexture"
  },
  test: t.test,
  parse: (e) => {
    var r;
    return {
      resolution: parseFloat(((r = s.RETINA_PREFIX.exec(e)) == null ? void 0 : r[1]) ?? "1"),
      format: e.split(".").pop(),
      src: e
    };
  }
};
export {
  l as resolveTextureUrl
};
//# sourceMappingURL=index356.js.map

import { ExtensionType as r } from "./index153.js";
import { Resolver as o } from "./index357.js";
import { resolveTextureUrl as s } from "./index356.js";
const i = {
  extension: {
    type: r.ResolveParser,
    priority: -2,
    name: "resolveJson"
  },
  test: (e) => o.RETINA_PREFIX.test(e) && e.endsWith(".json"),
  parse: s.parse
};
export {
  i as resolveJsonUrl
};
//# sourceMappingURL=index355.js.map

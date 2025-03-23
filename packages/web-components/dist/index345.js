import { ExtensionType as o } from "./index153.js";
import { testVideoFormat as r } from "./index362.js";
const s = {
  extension: {
    type: o.DetectionParser,
    priority: 0
  },
  test: async () => r("video/ogg"),
  add: async (e) => [...e, "ogv"],
  remove: async (e) => e.filter((t) => t !== "ogv")
};
export {
  s as detectOgv
};
//# sourceMappingURL=index345.js.map

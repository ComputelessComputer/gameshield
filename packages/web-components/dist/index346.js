import { ExtensionType as o } from "./index153.js";
import { testVideoFormat as r } from "./index362.js";
const n = {
  extension: {
    type: o.DetectionParser,
    priority: 0
  },
  test: async () => r("video/webm"),
  add: async (e) => [...e, "webm"],
  remove: async (e) => e.filter((t) => t !== "webm")
};
export {
  n as detectWebm
};
//# sourceMappingURL=index346.js.map

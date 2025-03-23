import { ExtensionType as o } from "./index153.js";
import { testVideoFormat as r } from "./index362.js";
const p = {
  extension: {
    type: o.DetectionParser,
    priority: 0
  },
  test: async () => r("video/mp4"),
  add: async (e) => [...e, "mp4", "m4v"],
  remove: async (e) => e.filter((t) => t !== "mp4" && t !== "m4v")
};
export {
  p as detectMp4
};
//# sourceMappingURL=index344.js.map

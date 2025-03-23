import { ExtensionType as A } from "./index153.js";
import { testImageFormat as o } from "./index361.js";
const i = {
  extension: {
    type: A.DetectionParser,
    priority: 0
  },
  test: async () => o(
    "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="
  ),
  add: async (e) => [...e, "webp"],
  remove: async (e) => e.filter((t) => t !== "webp")
};
export {
  i as detectWebp
};
//# sourceMappingURL=index347.js.map

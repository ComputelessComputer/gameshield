import { ExtensionType as r } from "./index153.js";
const t = ["png", "jpg", "jpeg"], n = {
  extension: {
    type: r.DetectionParser,
    priority: -1
  },
  test: () => Promise.resolve(!0),
  add: async (e) => [...e, ...t],
  remove: async (e) => e.filter((o) => !t.includes(o))
};
export {
  n as detectDefaults
};
//# sourceMappingURL=index343.js.map

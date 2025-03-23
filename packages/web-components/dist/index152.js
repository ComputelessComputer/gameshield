import { ExtensionType as e } from "./index153.js";
const t = {
  extension: {
    type: e.Environment,
    name: "webworker",
    priority: 0
  },
  test: () => typeof self < "u" && self.WorkerGlobalScope !== void 0,
  load: async () => {
    await import("./index319.js");
  }
};
export {
  t as webworkerExt
};
//# sourceMappingURL=index152.js.map

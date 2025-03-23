import { ExtensionType as t } from "./index153.js";
const o = {
  extension: {
    type: t.Environment,
    name: "browser",
    priority: -1
  },
  test: () => !0,
  load: async () => {
    await import("./index318.js");
  }
};
export {
  o as browserExt
};
//# sourceMappingURL=index151.js.map

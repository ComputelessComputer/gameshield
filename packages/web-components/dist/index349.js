import { DOMAdapter as t } from "./index365.js";
import { ExtensionType as n } from "./index153.js";
import { checkDataUrl as r } from "./index366.js";
import { checkExtension as e } from "./index367.js";
import { LoaderParserPriority as s } from "./index364.js";
const a = ".json", i = "application/json", x = {
  extension: {
    type: n.LoadParser,
    priority: s.Low
  },
  name: "loadJson",
  test(o) {
    return r(o, i) || e(o, a);
  },
  async load(o) {
    return await (await t.get().fetch(o)).json();
  }
};
export {
  x as loadJson
};
//# sourceMappingURL=index349.js.map

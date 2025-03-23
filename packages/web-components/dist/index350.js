import { DOMAdapter as o } from "./index365.js";
import { ExtensionType as e } from "./index153.js";
import { checkDataUrl as r } from "./index366.js";
import { checkExtension as a } from "./index367.js";
import { LoaderParserPriority as n } from "./index364.js";
const i = ".txt", s = "text/plain", f = {
  name: "loadTxt",
  extension: {
    type: e.LoadParser,
    priority: n.Low,
    name: "loadTxt"
  },
  test(t) {
    return r(t, s) || a(t, i);
  },
  async load(t) {
    return await (await o.get().fetch(t)).text();
  }
};
export {
  f as loadTxt
};
//# sourceMappingURL=index350.js.map

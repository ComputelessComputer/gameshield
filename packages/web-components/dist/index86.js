import "./index20.js";
import "./index21.js";
import { ExtensionType as t, extensions as r } from "./index158.js";
import "./index22.js";
import "./index23.js";
import "./index24.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import "./index28.js";
import "./index29.js";
import "./index30.js";
import "./index31.js";
import "./index32.js";
import { settings as i } from "./index163.js";
import "./index33.js";
import "./index34.js";
import "./index35.js";
import "./index36.js";
import "./index37.js";
import "./index38.js";
import "./index39.js";
import "./index40.js";
import "./index41.js";
import "./index42.js";
import "./index43.js";
import "./index44.js";
import "./index45.js";
import "./index46.js";
import "./index47.js";
import "./index48.js";
import "./index49.js";
import "./index50.js";
import "./index51.js";
import "./index52.js";
import "./index53.js";
import "./index54.js";
import "./index55.js";
import "./index56.js";
import "./index57.js";
import "./index58.js";
import "./index59.js";
import "./index60.js";
import "./index61.js";
import "./index62.js";
import "./index63.js";
import "./index64.js";
import "./index65.js";
import "./index66.js";
import "./index67.js";
import "./index68.js";
import "./index69.js";
import "./index70.js";
import "./index71.js";
import "./index72.js";
import "./index73.js";
import "./index74.js";
import "./index75.js";
import "./index76.js";
import "./index77.js";
import "./index78.js";
import { checkDataUrl as m } from "./index182.js";
import { checkExtension as p } from "./index166.js";
import { LoaderParserPriority as n } from "./index167.js";
const e = ".json", a = "application/json", s = {
  extension: {
    type: t.LoadParser,
    priority: n.Low
  },
  name: "loadJson",
  test(o) {
    return m(o, a) || p(o, e);
  },
  async load(o) {
    return await (await i.ADAPTER.fetch(o)).json();
  }
};
r.add(s);
export {
  s as loadJson
};
//# sourceMappingURL=index86.js.map

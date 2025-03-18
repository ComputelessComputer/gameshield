import "./index23.js";
import "./index24.js";
import { ExtensionType as s, extensions as n } from "./index140.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import "./index28.js";
import "./index29.js";
import "./index30.js";
import "./index31.js";
import "./index32.js";
import "./index33.js";
import "./index34.js";
import "./index35.js";
import { settings as c } from "./index145.js";
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
import { getResolutionOfUrl as l } from "./index147.js";
import "./index46.js";
import "./index47.js";
import "./index48.js";
import "./index49.js";
import "./index50.js";
import "./index51.js";
import "./index52.js";
import "./index53.js";
import { BaseTexture as u } from "./index54.js";
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
import "./index79.js";
import { SVGResource as p } from "./index80.js";
import "./index81.js";
import { checkDataUrl as f } from "./index164.js";
import { checkExtension as a } from "./index148.js";
import { LoaderParserPriority as x } from "./index149.js";
import { loadTextures as y } from "./index93.js";
import { createTexture as g } from "./index150.js";
const E = ".svg", G = "image/svg+xml", P = {
  extension: {
    type: s.LoadParser,
    priority: x.High
  },
  name: "loadSVG",
  test(r) {
    return f(r, G) || a(r, E);
  },
  async testParse(r) {
    return p.test(r);
  },
  async parse(r, o, e) {
    var m;
    const t = new p(r, (m = o == null ? void 0 : o.data) == null ? void 0 : m.resourceOptions);
    await t.load();
    const i = new u(t, {
      resolution: l(r),
      ...o == null ? void 0 : o.data
    });
    return i.resource.src = o.src, g(i, e, o.src);
  },
  async load(r, o) {
    return (await c.ADAPTER.fetch(r)).text();
  },
  unload: y.unload
};
n.add(P);
export {
  P as loadSVG
};
//# sourceMappingURL=index92.js.map

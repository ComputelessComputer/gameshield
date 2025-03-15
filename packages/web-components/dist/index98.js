import "./index21.js";
import "./index22.js";
import "./index23.js";
import "./index24.js";
import { MIPMAP_MODES as c, ALPHA_MODES as P } from "./index164.js";
import { ExtensionType as A, extensions as x } from "./index140.js";
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
import { settings as E } from "./index150.js";
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
import { getResolutionOfUrl as T } from "./index154.js";
import "./index46.js";
import "./index47.js";
import "./index48.js";
import "./index49.js";
import "./index50.js";
import "./index51.js";
import "./index52.js";
import "./index53.js";
import { BaseTexture as l } from "./index54.js";
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
import "./index80.js";
import "./index81.js";
import { checkExtension as u } from "./index152.js";
import "./index82.js";
import "./index83.js";
import "./index84.js";
import "./index85.js";
import "./index86.js";
import "./index87.js";
import "./index88.js";
import { LoaderParserPriority as h } from "./index149.js";
import "./index89.js";
import "./index90.js";
import "./index91.js";
import "./index92.js";
import "./index93.js";
import "./index94.js";
import { createTexture as D } from "./index155.js";
import "./index95.js";
import "./index100.js";
import { parseKTX as L } from "./index101.js";
const M = {
  extension: {
    type: A.LoadParser,
    priority: h.High
  },
  name: "loadKTX",
  test(r) {
    return u(r, ".ktx");
  },
  async load(r, o, s) {
    const n = await (await E.ADAPTER.fetch(r)).arrayBuffer(), { compressed: f, uncompressed: m, kvData: d } = L(r, n), p = f ?? m, e = {
      mipmap: c.OFF,
      alphaMode: P.NO_PREMULTIPLIED_ALPHA,
      resolution: T(r),
      ...o.data
    }, i = p.map((t) => {
      p === m && Object.assign(e, {
        type: t.type,
        format: t.format
      });
      const y = t.resource ?? t, a = new l(y, e);
      return a.ktxKeyValueData = d, D(a, s, r);
    });
    return i.length === 1 ? i[0] : i;
  },
  unload(r) {
    Array.isArray(r) ? r.forEach((o) => o.destroy(!0)) : r.destroy(!0);
  }
};
x.add(M);
export {
  M as loadKTX
};
//# sourceMappingURL=index98.js.map

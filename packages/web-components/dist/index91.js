import "./index20.js";
import "./index21.js";
import { ExtensionType as c, extensions as f } from "./index158.js";
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
import { settings as u } from "./index163.js";
import "./index33.js";
import "./index34.js";
import "./index35.js";
import "./index36.js";
import "./index37.js";
import "./index38.js";
import "./index39.js";
import "./index40.js";
import { detectVideoAlphaMode as l } from "./index184.js";
import "./index41.js";
import "./index42.js";
import { getResolutionOfUrl as s } from "./index165.js";
import "./index43.js";
import "./index44.js";
import "./index45.js";
import "./index46.js";
import "./index47.js";
import "./index48.js";
import "./index49.js";
import "./index50.js";
import { BaseTexture as y } from "./index51.js";
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
import { VideoResource as b } from "./index78.js";
import { checkDataUrl as h } from "./index182.js";
import { checkExtension as g } from "./index166.js";
import { LoaderParserPriority as L } from "./index167.js";
import { createTexture as P } from "./index168.js";
const U = [".mp4", ".m4v", ".webm", ".ogv"], x = [
  "video/mp4",
  "video/webm",
  "video/ogg"
], R = {
  name: "loadVideo",
  extension: {
    type: c.LoadParser,
    priority: L.High
  },
  config: {
    defaultAutoPlay: !0,
    defaultUpdateFPS: 0,
    defaultLoop: !1,
    defaultMuted: !1,
    defaultPlaysinline: !0
  },
  test(o) {
    return h(o, x) || g(o, U);
  },
  async load(o, t, n) {
    var m;
    let i;
    const d = await (await u.ADAPTER.fetch(o)).blob(), r = URL.createObjectURL(d);
    try {
      const e = {
        autoPlay: this.config.defaultAutoPlay,
        updateFPS: this.config.defaultUpdateFPS,
        loop: this.config.defaultLoop,
        muted: this.config.defaultMuted,
        playsinline: this.config.defaultPlaysinline,
        ...(m = t == null ? void 0 : t.data) == null ? void 0 : m.resourceOptions,
        autoLoad: !0
      }, p = new b(r, e);
      await p.load();
      const a = new y(p, {
        alphaMode: await l(),
        resolution: s(o),
        ...t == null ? void 0 : t.data
      });
      a.resource.src = o, i = P(a, n, o), i.baseTexture.once("destroyed", () => {
        URL.revokeObjectURL(r);
      });
    } catch (e) {
      throw URL.revokeObjectURL(r), e;
    }
    return i;
  },
  unload(o) {
    o.destroy(!0);
  }
};
f.add(R);
export {
  R as loadVideo
};
//# sourceMappingURL=index91.js.map

import "./index18.js";
import "./index19.js";
import "./index20.js";
import "./index21.js";
import { ExtensionType as u, extensions as y } from "./index158.js";
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
import { settings as g } from "./index163.js";
import "./index33.js";
import "./index34.js";
import "./index35.js";
import "./index36.js";
import "./index37.js";
import "./index38.js";
import "./index39.js";
import "./index40.js";
import { path as m } from "./index169.js";
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
import { copySearchParams as P } from "./index185.js";
import "./index79.js";
import "./index80.js";
import "./index81.js";
import "./index82.js";
import "./index83.js";
import "./index84.js";
import "./index85.js";
import { LoaderParserPriority as h } from "./index167.js";
import "./index86.js";
import "./index87.js";
import "./index88.js";
import "./index89.js";
import "./index90.js";
import "./index91.js";
import "./index92.js";
import { BitmapFont as F } from "./index121.js";
import { TextFormat as p } from "./index313.js";
import { XMLStringFormat as l } from "./index315.js";
const L = [".xml", ".fnt"], T = {
  extension: {
    type: u.LoadParser,
    priority: h.Normal
  },
  name: "loadBitmapFont",
  test(t) {
    return L.includes(m.extname(t).toLowerCase());
  },
  async testParse(t) {
    return p.test(t) || l.test(t);
  },
  async parse(t, e, d) {
    const a = p.test(t) ? p.parse(t) : l.parse(t), { src: n } = e, { page: s } = a, o = [];
    for (let r = 0; r < s.length; ++r) {
      const x = s[r].file;
      let i = m.join(m.dirname(n), x);
      i = P(i, n), o.push(i);
    }
    const f = await d.load(o), c = o.map((r) => f[r]);
    return F.install(a, c, !0);
  },
  async load(t, e) {
    return (await g.ADAPTER.fetch(t)).text();
  },
  unload(t) {
    t.destroy();
  }
};
y.add(T);
export {
  T as loadBitmapFont
};
//# sourceMappingURL=index123.js.map

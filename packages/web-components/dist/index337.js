import { LoaderParserPriority as F } from "./index364.js";
import { copySearchParams as P } from "./index376.js";
import { DOMAdapter as g } from "./index365.js";
import { ExtensionType as d } from "./index153.js";
import { path as p } from "./index363.js";
import { BitmapFont as u } from "./index562.js";
import { bitmapFontTextParser as m } from "./index559.js";
import { bitmapFontXMLStringParser as l } from "./index561.js";
const b = [".xml", ".fnt"], _ = {
  extension: {
    type: d.CacheParser,
    name: "cacheBitmapFont"
  },
  test: (t) => t instanceof u,
  getCacheableAssets(t, o) {
    const e = {};
    return t.forEach((a) => {
      e[a] = o, e[`${a}-bitmap`] = o;
    }), e[`${o.fontFamily}-bitmap`] = o, e;
  }
}, v = {
  extension: {
    type: d.LoadParser,
    priority: F.Normal
  },
  name: "loadBitmapFont",
  test(t) {
    return b.includes(p.extname(t).toLowerCase());
  },
  async testParse(t) {
    return m.test(t) || l.test(t);
  },
  async parse(t, o, e) {
    const a = m.test(t) ? m.parse(t) : l.parse(t), { src: n } = o, { pages: c } = a, s = [], f = a.distanceField ? {
      scaleMode: "linear",
      alphaMode: "premultiply-alpha-on-upload",
      autoGenerateMipmaps: !1,
      resolution: 1
    } : {};
    for (let r = 0; r < c.length; ++r) {
      const y = c[r].file;
      let i = p.join(p.dirname(n), y);
      i = P(i, n), s.push({
        src: i,
        data: f
      });
    }
    const x = await e.load(s), h = s.map((r) => x[r.src]);
    return new u({
      data: a,
      textures: h
    }, n);
  },
  async load(t, o) {
    return await (await g.get().fetch(t)).text();
  },
  async unload(t, o, e) {
    await Promise.all(t.pages.map((a) => e.unload(a.texture.source._sourceOrigin))), t.destroy();
  }
};
export {
  _ as bitmapFontCachePlugin,
  v as loadBitmapFont
};
//# sourceMappingURL=index337.js.map

import "./index21.js";
import "./index22.js";
import "./index23.js";
import "./index24.js";
import { ExtensionType as g, extensions as k } from "./index140.js";
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
import { settings as A } from "./index145.js";
import "./index36.js";
import "./index37.js";
import "./index38.js";
import "./index39.js";
import "./index40.js";
import "./index41.js";
import "./index42.js";
import "./index43.js";
import { path as f } from "./index151.js";
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
import "./index79.js";
import "./index80.js";
import "./index81.js";
import { copySearchParams as P } from "./index167.js";
import "./index82.js";
import "./index83.js";
import "./index84.js";
import "./index85.js";
import "./index86.js";
import "./index87.js";
import "./index88.js";
import { LoaderParserPriority as E } from "./index149.js";
import "./index89.js";
import "./index90.js";
import "./index91.js";
import "./index92.js";
import "./index93.js";
import "./index94.js";
import "./index95.js";
import { Spritesheet as b } from "./index119.js";
const j = [
  "jpg",
  "png",
  "jpeg",
  "avif",
  "webp",
  "s3tc",
  "s3tc_sRGB",
  "etc",
  "etc1",
  "pvrtc",
  "atc",
  "astc",
  "bptc"
];
function y(r, t, e) {
  const i = {};
  if (r.forEach((o) => {
    i[o] = t;
  }), Object.keys(t.textures).forEach((o) => {
    i[`${t.cachePrefix}${o}`] = t.textures[o];
  }), !e) {
    const o = f.dirname(r[0]);
    t.linkedSheets.forEach((n, m) => {
      Object.assign(i, y(
        [`${o}/${t.data.meta.related_multi_packs[m]}`],
        n,
        !0
      ));
    });
  }
  return i;
}
const w = {
  extension: g.Asset,
  /** Handle the caching of the related Spritesheet Textures */
  cache: {
    test: (r) => r instanceof b,
    getCacheableAssets: (r, t) => y(r, t, !1)
  },
  /** Resolve the the resolution of the asset. */
  resolver: {
    test: (r) => {
      const t = r.split("?")[0].split("."), e = t.pop(), i = t.pop();
      return e === "json" && j.includes(i);
    },
    parse: (r) => {
      var e;
      const t = r.split(".");
      return {
        resolution: parseFloat(((e = A.RETINA_PREFIX.exec(r)) == null ? void 0 : e[1]) ?? "1"),
        format: t[t.length - 2],
        src: r
      };
    }
  },
  /**
   * Loader plugin that parses sprite sheets!
   * once the JSON has been loaded this checks to see if the JSON is spritesheet data.
   * If it is, we load the spritesheets image and parse the data into PIXI.Spritesheet
   * All textures in the sprite sheet are then added to the cache
   * @ignore
   */
  loader: {
    name: "spritesheetLoader",
    extension: {
      type: g.LoadParser,
      priority: E.Normal
    },
    async testParse(r, t) {
      return f.extname(t.src).toLowerCase() === ".json" && !!r.frames;
    },
    async parse(r, t, e) {
      var h, u;
      const {
        texture: i,
        // if user need to use preloaded texture
        imageFilename: o,
        // if user need to use custom filename (not from jsonFile.meta.image)
        cachePrefix: n
        // if user need to use custom cache prefix
      } = (t == null ? void 0 : t.data) ?? {};
      let m = f.dirname(t.src);
      m && m.lastIndexOf("/") !== m.length - 1 && (m += "/");
      let l;
      if (i && i.baseTexture)
        l = i;
      else {
        const a = P(m + (o ?? r.meta.image), t.src);
        l = (await e.load([a]))[a];
      }
      const p = new b({
        texture: l.baseTexture,
        data: r,
        resolutionFilename: t.src,
        cachePrefix: n
      });
      await p.parse();
      const d = (h = r == null ? void 0 : r.meta) == null ? void 0 : h.related_multi_packs;
      if (Array.isArray(d)) {
        const a = [];
        for (const s of d) {
          if (typeof s != "string")
            continue;
          let c = m + s;
          (u = t.data) != null && u.ignoreMultiPack || (c = P(c, t.src), a.push(e.load({
            src: c,
            data: {
              ignoreMultiPack: !0
            }
          })));
        }
        const x = await Promise.all(a);
        p.linkedSheets = x, x.forEach((s) => {
          s.linkedSheets = [p].concat(p.linkedSheets.filter((c) => c !== s));
        });
      }
      return p;
    },
    unload(r) {
      r.destroy(!0);
    }
  }
};
k.add(w);
export {
  w as spritesheetAsset
};
//# sourceMappingURL=index120.js.map

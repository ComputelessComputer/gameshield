import { LoaderParserPriority as k } from "./index364.js";
import { Resolver as A } from "./index357.js";
import { copySearchParams as b } from "./index376.js";
import { ExtensionType as u } from "./index153.js";
import { Texture as S } from "./index360.js";
import { path as d } from "./index363.js";
import { Spritesheet as P } from "./index596.js";
const w = [
  "jpg",
  "png",
  "jpeg",
  "avif",
  "webp",
  "basis",
  "etc2",
  "bc7",
  "bc6h",
  "bc5",
  "bc4",
  "bc3",
  "bc2",
  "bc1",
  "eac",
  "astc"
];
function y(e, t, r) {
  const a = {};
  if (e.forEach((s) => {
    a[s] = t;
  }), Object.keys(t.textures).forEach((s) => {
    a[s] = t.textures[s];
  }), !r) {
    const s = d.dirname(e[0]);
    t.linkedSheets.forEach((p, o) => {
      const c = y([`${s}/${t.data.meta.related_multi_packs[o]}`], p, !0);
      Object.assign(a, c);
    });
  }
  return a;
}
const I = {
  extension: u.Asset,
  /** Handle the caching of the related Spritesheet Textures */
  cache: {
    test: (e) => e instanceof P,
    getCacheableAssets: (e, t) => y(e, t, !1)
  },
  /** Resolve the resolution of the asset. */
  resolver: {
    extension: {
      type: u.ResolveParser,
      name: "resolveSpritesheet"
    },
    test: (e) => {
      const r = e.split("?")[0].split("."), a = r.pop(), s = r.pop();
      return a === "json" && w.includes(s);
    },
    parse: (e) => {
      var r;
      const t = e.split(".");
      return {
        resolution: parseFloat(((r = A.RETINA_PREFIX.exec(e)) == null ? void 0 : r[1]) ?? "1"),
        format: t[t.length - 2],
        src: e
      };
    }
  },
  /**
   * Loader plugin that parses sprite sheets!
   * once the JSON has been loaded this checks to see if the JSON is spritesheet data.
   * If it is, we load the spritesheets image and parse the data into Spritesheet
   * All textures in the sprite sheet are then added to the cache
   */
  loader: {
    name: "spritesheetLoader",
    extension: {
      type: u.LoadParser,
      priority: k.Normal,
      name: "spritesheetLoader"
    },
    async testParse(e, t) {
      return d.extname(t.src).toLowerCase() === ".json" && !!e.frames;
    },
    async parse(e, t, r) {
      var g, x;
      const {
        texture: a,
        // if user need to use preloaded texture
        imageFilename: s,
        // if user need to use custom filename (not from jsonFile.meta.image)
        textureOptions: p
        // if user need to set texture options on texture
      } = (t == null ? void 0 : t.data) ?? {};
      let o = d.dirname(t.src);
      o && o.lastIndexOf("/") !== o.length - 1 && (o += "/");
      let c;
      if (a instanceof S)
        c = a;
      else {
        const i = b(o + (s ?? e.meta.image), t.src);
        c = (await r.load([{ src: i, data: p }]))[i];
      }
      const n = new P(
        c.source,
        e
      );
      await n.parse();
      const h = (g = e == null ? void 0 : e.meta) == null ? void 0 : g.related_multi_packs;
      if (Array.isArray(h)) {
        const i = [];
        for (const l of h) {
          if (typeof l != "string")
            continue;
          let m = o + l;
          (x = t.data) != null && x.ignoreMultiPack || (m = b(m, t.src), i.push(r.load({
            src: m,
            data: {
              textureOptions: p,
              ignoreMultiPack: !0
            }
          })));
        }
        const f = await Promise.all(i);
        n.linkedSheets = f, f.forEach((l) => {
          l.linkedSheets = [n].concat(n.linkedSheets.filter((m) => m !== l));
        });
      }
      return n;
    },
    async unload(e, t, r) {
      await r.unload(e.textureSource._sourceOrigin), e.destroy(!1);
    }
  }
};
export {
  I as spritesheetAsset
};
//# sourceMappingURL=index327.js.map

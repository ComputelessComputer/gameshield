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
import { deprecation as E } from "./index133.js";
import { path as g } from "./index153.js";
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
import { convertToList as f } from "./index145.js";
import { createStringVariations as O } from "./index159.js";
import { isSingleItem as b } from "./index146.js";
class Dr {
  constructor() {
    this._defaultBundleIdentifierOptions = {
      connector: "-",
      createBundleAssetId: (r, t) => `${r}${this._bundleIdConnector}${t}`,
      extractAssetIdFromBundle: (r, t) => t.replace(`${r}${this._bundleIdConnector}`, "")
    }, this._bundleIdConnector = this._defaultBundleIdentifierOptions.connector, this._createBundleAssetId = this._defaultBundleIdentifierOptions.createBundleAssetId, this._extractAssetIdFromBundle = this._defaultBundleIdentifierOptions.extractAssetIdFromBundle, this._assetMap = {}, this._preferredOrder = [], this._parsers = [], this._resolverHash = {}, this._bundles = {};
  }
  /**
   * Override how the resolver deals with generating bundle ids.
   * must be called before any bundles are added
   * @param bundleIdentifier - the bundle identifier options
   */
  setBundleIdentifier(r) {
    if (this._bundleIdConnector = r.connector ?? this._bundleIdConnector, this._createBundleAssetId = r.createBundleAssetId ?? this._createBundleAssetId, this._extractAssetIdFromBundle = r.extractAssetIdFromBundle ?? this._extractAssetIdFromBundle, this._extractAssetIdFromBundle("foo", this._createBundleAssetId("foo", "bar")) !== "bar")
      throw new Error("[Resolver] GenerateBundleAssetId are not working correctly");
  }
  /**
   * Let the resolver know which assets you prefer to use when resolving assets.
   * Multiple prefer user defined rules can be added.
   * @example
   * resolver.prefer({
   *     // first look for something with the correct format, and then then correct resolution
   *     priority: ['format', 'resolution'],
   *     params:{
   *         format:'webp', // prefer webp images
   *         resolution: 2, // prefer a resolution of 2
   *     }
   * })
   * resolver.add('foo', ['bar@2x.webp', 'bar@2x.png', 'bar.webp', 'bar.png']);
   * resolver.resolveUrl('foo') // => 'bar@2x.webp'
   * @param preferOrders - the prefer options
   */
  prefer(...r) {
    r.forEach((t) => {
      this._preferredOrder.push(t), t.priority || (t.priority = Object.keys(t.params));
    }), this._resolverHash = {};
  }
  /**
   * Set the base path to prepend to all urls when resolving
   * @example
   * resolver.basePath = 'https://home.com/';
   * resolver.add('foo', 'bar.ong');
   * resolver.resolveUrl('foo', 'bar.png'); // => 'https://home.com/bar.png'
   * @param basePath - the base path to use
   */
  set basePath(r) {
    this._basePath = r;
  }
  get basePath() {
    return this._basePath;
  }
  /**
   * Set the root path for root-relative URLs. By default the `basePath`'s root is used. If no `basePath` is set, then the
   * default value for browsers is `window.location.origin`
   * @example
   * // Application hosted on https://home.com/some-path/index.html
   * resolver.basePath = 'https://home.com/some-path/';
   * resolver.rootPath = 'https://home.com/';
   * resolver.add('foo', '/bar.png');
   * resolver.resolveUrl('foo', '/bar.png'); // => 'https://home.com/bar.png'
   * @param rootPath - the root path to use
   */
  set rootPath(r) {
    this._rootPath = r;
  }
  get rootPath() {
    return this._rootPath;
  }
  /**
   * All the active URL parsers that help the parser to extract information and create
   * an asset object-based on parsing the URL itself.
   *
   * Can be added using the extensions API
   * @example
   * resolver.add('foo', [
   *     {
   *         resolution: 2,
   *         format: 'png',
   *         src: 'image@2x.png',
   *     },
   *     {
   *         resolution:1,
   *         format:'png',
   *         src: 'image.png',
   *     },
   * ]);
   *
   * // With a url parser the information such as resolution and file format could extracted from the url itself:
   * extensions.add({
   *     extension: ExtensionType.ResolveParser,
   *     test: loadTextures.test, // test if url ends in an image
   *     parse: (value: string) =>
   *     ({
   *         resolution: parseFloat(settings.RETINA_PREFIX.exec(value)?.[1] ?? '1'),
   *         format: value.split('.').pop(),
   *         src: value,
   *     }),
   * });
   *
   * // Now resolution and format can be extracted from the url
   * resolver.add('foo', [
   *     'image@2x.png',
   *     'image.png',
   * ]);
   */
  get parsers() {
    return this._parsers;
  }
  /** Used for testing, this resets the resolver to its initial state */
  reset() {
    this.setBundleIdentifier(this._defaultBundleIdentifierOptions), this._assetMap = {}, this._preferredOrder = [], this._resolverHash = {}, this._rootPath = null, this._basePath = null, this._manifest = null, this._bundles = {}, this._defaultSearchParams = null;
  }
  /**
   * Sets the default URL search parameters for the URL resolver. The urls can be specified as a string or an object.
   * @param searchParams - the default url parameters to append when resolving urls
   */
  setDefaultSearchParams(r) {
    if (typeof r == "string")
      this._defaultSearchParams = r;
    else {
      const t = r;
      this._defaultSearchParams = Object.keys(t).map((o) => `${encodeURIComponent(o)}=${encodeURIComponent(t[o])}`).join("&");
    }
  }
  /**
   * Returns the aliases for a given asset
   * @param asset - the asset to get the aliases for
   */
  getAlias(r) {
    const { alias: t, name: o, src: s, srcs: a } = r;
    return f(
      t || o || s || a,
      (e) => typeof e == "string" ? e : Array.isArray(e) ? e.map((i) => (i == null ? void 0 : i.src) ?? (i == null ? void 0 : i.srcs) ?? i) : e != null && e.src || e != null && e.srcs ? e.src ?? e.srcs : e,
      !0
    );
  }
  /**
   * Add a manifest to the asset resolver. This is a nice way to add all the asset information in one go.
   * generally a manifest would be built using a tool.
   * @param manifest - the manifest to add to the resolver
   */
  addManifest(r) {
    this._manifest && console.warn("[Resolver] Manifest already exists, this will be overwritten"), this._manifest = r, r.bundles.forEach((t) => {
      this.addBundle(t.name, t.assets);
    });
  }
  /**
   * This adds a bundle of assets in one go so that you can resolve them as a group.
   * For example you could add a bundle for each screen in you pixi app
   * @example
   * resolver.addBundle('animals', {
   *     bunny: 'bunny.png',
   *     chicken: 'chicken.png',
   *     thumper: 'thumper.png',
   * });
   *
   * const resolvedAssets = await resolver.resolveBundle('animals');
   * @param bundleId - The id of the bundle to add
   * @param assets - A record of the asset or assets that will be chosen from when loading via the specified key
   */
  addBundle(r, t) {
    const o = [];
    Array.isArray(t) ? t.forEach((s) => {
      const a = s.src ?? s.srcs, e = s.alias ?? s.name;
      let i;
      if (typeof e == "string") {
        const n = this._createBundleAssetId(r, e);
        o.push(n), i = [e, n];
      } else {
        const n = e.map((l) => this._createBundleAssetId(r, l));
        o.push(...n), i = [...e, ...n];
      }
      this.add({
        ...s,
        alias: i,
        src: a
      });
    }) : Object.keys(t).forEach((s) => {
      const a = [s, this._createBundleAssetId(r, s)];
      if (typeof t[s] == "string")
        this.add({
          alias: a,
          src: t[s]
        });
      else if (Array.isArray(t[s]))
        this.add({
          alias: a,
          src: t[s]
        });
      else {
        const e = t[s], i = e.src ?? e.srcs;
        this.add({
          ...e,
          alias: a,
          src: Array.isArray(i) ? i : [i]
        });
      }
      o.push(...a);
    }), this._bundles[r] = o;
  }
  add(r, t, o, s, a) {
    const e = [];
    typeof r == "string" || Array.isArray(r) && typeof r[0] == "string" ? (E("7.2.0", `Assets.add now uses an object instead of individual parameters.
Please use Assets.add({ alias, src, data, format, loadParser }) instead.`), e.push({ alias: r, src: t, data: o, format: s, loadParser: a })) : Array.isArray(r) ? e.push(...r) : e.push(r);
    let i;
    i = (n) => {
      this.hasKey(n) && console.warn(`[Resolver] already has key: ${n} overwriting`);
    }, f(e).forEach((n) => {
      const { src: l, srcs: _ } = n;
      let { data: d, format: u, loadParser: A } = n;
      const y = f(l || _).map((h) => typeof h == "string" ? O(h) : Array.isArray(h) ? h : [h]), m = this.getAlias(n);
      Array.isArray(m) ? m.forEach(i) : i(m);
      const B = [];
      y.forEach((h) => {
        h.forEach((c) => {
          let p = {};
          if (typeof c != "object") {
            p.src = c;
            for (let P = 0; P < this._parsers.length; P++) {
              const I = this._parsers[P];
              if (I.test(c)) {
                p = I.parse(c);
                break;
              }
            }
          } else
            d = c.data ?? d, u = c.format ?? u, A = c.loadParser ?? A, p = {
              ...p,
              ...c
            };
          if (!m)
            throw new Error(`[Resolver] alias is undefined for this asset: ${p.src}`);
          p = this.buildResolvedAsset(p, {
            aliases: m,
            data: d,
            format: u,
            loadParser: A
          }), B.push(p);
        });
      }), m.forEach((h) => {
        this._assetMap[h] = B;
      });
    });
  }
  // TODO: this needs an overload like load did in Assets
  /**
   * If the resolver has had a manifest set via setManifest, this will return the assets urls for
   * a given bundleId or bundleIds.
   * @example
   * // Manifest Example
   * const manifest = {
   *     bundles: [
   *         {
   *             name: 'load-screen',
   *             assets: [
   *                 {
   *                     alias: 'background',
   *                     src: 'sunset.png',
   *                 },
   *                 {
   *                     alias: 'bar',
   *                     src: 'load-bar.{png,webp}',
   *                 },
   *             ],
   *         },
   *         {
   *             name: 'game-screen',
   *             assets: [
   *                 {
   *                     alias: 'character',
   *                     src: 'robot.png',
   *                 },
   *                 {
   *                     alias: 'enemy',
   *                     src: 'bad-guy.png',
   *                 },
   *             ],
   *         },
   *     ]
   * };
   *
   * resolver.setManifest(manifest);
   * const resolved = resolver.resolveBundle('load-screen');
   * @param bundleIds - The bundle ids to resolve
   * @returns All the bundles assets or a hash of assets for each bundle specified
   */
  resolveBundle(r) {
    const t = b(r);
    r = f(r);
    const o = {};
    return r.forEach((s) => {
      const a = this._bundles[s];
      if (a) {
        const e = this.resolve(a), i = {};
        for (const n in e) {
          const l = e[n];
          i[this._extractAssetIdFromBundle(s, n)] = l;
        }
        o[s] = i;
      }
    }), t ? o[r[0]] : o;
  }
  /**
   * Does exactly what resolve does, but returns just the URL rather than the whole asset object
   * @param key - The key or keys to resolve
   * @returns - The URLs associated with the key(s)
   */
  resolveUrl(r) {
    const t = this.resolve(r);
    if (typeof r != "string") {
      const o = {};
      for (const s in t)
        o[s] = t[s].src;
      return o;
    }
    return t.src;
  }
  resolve(r) {
    const t = b(r);
    r = f(r);
    const o = {};
    return r.forEach((s) => {
      if (!this._resolverHash[s])
        if (this._assetMap[s]) {
          let a = this._assetMap[s];
          const e = a[0], i = this._getPreferredOrder(a);
          i == null || i.priority.forEach((n) => {
            i.params[n].forEach((l) => {
              const _ = a.filter((d) => d[n] ? d[n] === l : !1);
              _.length && (a = _);
            });
          }), this._resolverHash[s] = a[0] ?? e;
        } else
          this._resolverHash[s] = this.buildResolvedAsset({
            alias: [s],
            src: s
          }, {});
      o[s] = this._resolverHash[s];
    }), t ? o[r[0]] : o;
  }
  /**
   * Checks if an asset with a given key exists in the resolver
   * @param key - The key of the asset
   */
  hasKey(r) {
    return !!this._assetMap[r];
  }
  /**
   * Checks if a bundle with the given key exists in the resolver
   * @param key - The key of the bundle
   */
  hasBundle(r) {
    return !!this._bundles[r];
  }
  /**
   * Internal function for figuring out what prefer criteria an asset should use.
   * @param assets
   */
  _getPreferredOrder(r) {
    for (let t = 0; t < r.length; t++) {
      const o = r[0], s = this._preferredOrder.find((a) => a.params.format.includes(o.format));
      if (s)
        return s;
    }
    return this._preferredOrder[0];
  }
  /**
   * Appends the default url parameters to the url
   * @param url - The url to append the default parameters to
   * @returns - The url with the default parameters appended
   */
  _appendDefaultSearchParams(r) {
    if (!this._defaultSearchParams)
      return r;
    const t = /\?/.test(r) ? "&" : "?";
    return `${r}${t}${this._defaultSearchParams}`;
  }
  buildResolvedAsset(r, t) {
    const { aliases: o, data: s, loadParser: a, format: e } = t;
    return (this._basePath || this._rootPath) && (r.src = g.toAbsolute(r.src, this._basePath, this._rootPath)), r.alias = o ?? r.alias ?? [r.src], r.src = this._appendDefaultSearchParams(r.src), r.data = { ...s || {}, ...r.data }, r.loadParser = a ?? r.loadParser, r.format = e ?? r.format ?? g.extname(r.src).slice(1), r.srcs = r.src, r.name = r.alias, r;
  }
}
export {
  Dr as Resolver
};
//# sourceMappingURL=index144.js.map

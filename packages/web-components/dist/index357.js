import { warn as P } from "./index338.js";
import { path as g } from "./index363.js";
import { convertToList as _ } from "./index358.js";
import { createStringVariations as b } from "./index375.js";
import { isSingleItem as I } from "./index359.js";
class E {
  constructor() {
    this._defaultBundleIdentifierOptions = {
      connector: "-",
      createBundleAssetId: (s, t) => `${s}${this._bundleIdConnector}${t}`,
      extractAssetIdFromBundle: (s, t) => t.replace(`${s}${this._bundleIdConnector}`, "")
    }, this._bundleIdConnector = this._defaultBundleIdentifierOptions.connector, this._createBundleAssetId = this._defaultBundleIdentifierOptions.createBundleAssetId, this._extractAssetIdFromBundle = this._defaultBundleIdentifierOptions.extractAssetIdFromBundle, this._assetMap = {}, this._preferredOrder = [], this._parsers = [], this._resolverHash = {}, this._bundles = {};
  }
  /**
   * Override how the resolver deals with generating bundle ids.
   * must be called before any bundles are added
   * @param bundleIdentifier - the bundle identifier options
   */
  setBundleIdentifier(s) {
    if (this._bundleIdConnector = s.connector ?? this._bundleIdConnector, this._createBundleAssetId = s.createBundleAssetId ?? this._createBundleAssetId, this._extractAssetIdFromBundle = s.extractAssetIdFromBundle ?? this._extractAssetIdFromBundle, this._extractAssetIdFromBundle("foo", this._createBundleAssetId("foo", "bar")) !== "bar")
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
  prefer(...s) {
    s.forEach((t) => {
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
  set basePath(s) {
    this._basePath = s;
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
  set rootPath(s) {
    this._rootPath = s;
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
   *         resolution: parseFloat(Resolver.RETINA_PREFIX.exec(value)?.[1] ?? '1'),
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
  setDefaultSearchParams(s) {
    if (typeof s == "string")
      this._defaultSearchParams = s;
    else {
      const t = s;
      this._defaultSearchParams = Object.keys(t).map((r) => `${encodeURIComponent(r)}=${encodeURIComponent(t[r])}`).join("&");
    }
  }
  /**
   * Returns the aliases for a given asset
   * @param asset - the asset to get the aliases for
   */
  getAlias(s) {
    const { alias: t, src: r } = s;
    return _(
      t || r,
      (e) => typeof e == "string" ? e : Array.isArray(e) ? e.map((i) => (i == null ? void 0 : i.src) ?? i) : e != null && e.src ? e.src : e,
      !0
    );
  }
  /**
   * Add a manifest to the asset resolver. This is a nice way to add all the asset information in one go.
   * generally a manifest would be built using a tool.
   * @param manifest - the manifest to add to the resolver
   */
  addManifest(s) {
    this._manifest && P("[Resolver] Manifest already exists, this will be overwritten"), this._manifest = s, s.bundles.forEach((t) => {
      this.addBundle(t.name, t.assets);
    });
  }
  /**
   * This adds a bundle of assets in one go so that you can resolve them as a group.
   * For example you could add a bundle for each screen in you pixi app
   * @example
   * resolver.addBundle('animals', [
   *  { alias: 'bunny', src: 'bunny.png' },
   *  { alias: 'chicken', src: 'chicken.png' },
   *  { alias: 'thumper', src: 'thumper.png' },
   * ]);
   * // or
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
  addBundle(s, t) {
    const r = [];
    let a = t;
    Array.isArray(t) || (a = Object.entries(t).map(([e, i]) => typeof i == "string" || Array.isArray(i) ? { alias: e, src: i } : { alias: e, ...i })), a.forEach((e) => {
      const i = e.src, n = e.alias;
      let h;
      if (typeof n == "string") {
        const o = this._createBundleAssetId(s, n);
        r.push(o), h = [n, o];
      } else {
        const o = n.map((f) => this._createBundleAssetId(s, f));
        r.push(...o), h = [...n, ...o];
      }
      this.add({
        ...e,
        alias: h,
        src: i
      });
    }), this._bundles[s] = r;
  }
  /**
   * Tells the resolver what keys are associated with witch asset.
   * The most important thing the resolver does
   * @example
   * // Single key, single asset:
   * resolver.add({alias: 'foo', src: 'bar.png');
   * resolver.resolveUrl('foo') // => 'bar.png'
   *
   * // Multiple keys, single asset:
   * resolver.add({alias: ['foo', 'boo'], src: 'bar.png'});
   * resolver.resolveUrl('foo') // => 'bar.png'
   * resolver.resolveUrl('boo') // => 'bar.png'
   *
   * // Multiple keys, multiple assets:
   * resolver.add({alias: ['foo', 'boo'], src: ['bar.png', 'bar.webp']});
   * resolver.resolveUrl('foo') // => 'bar.png'
   *
   * // Add custom data attached to the resolver
   * Resolver.add({
   *     alias: 'bunnyBooBooSmooth',
   *     src: 'bunny{png,webp}',
   *     data: { scaleMode:SCALE_MODES.NEAREST }, // Base texture options
   * });
   *
   * resolver.resolve('bunnyBooBooSmooth') // => { src: 'bunny.png', data: { scaleMode: SCALE_MODES.NEAREST } }
   * @param aliases - the UnresolvedAsset or array of UnresolvedAssets to add to the resolver
   */
  add(s) {
    const t = [];
    Array.isArray(s) ? t.push(...s) : t.push(s);
    let r;
    r = (e) => {
      this.hasKey(e) && P(`[Resolver] already has key: ${e} overwriting`);
    }, _(t).forEach((e) => {
      const { src: i } = e;
      let { data: n, format: h, loadParser: o } = e;
      const f = _(i).map((l) => typeof l == "string" ? b(l) : Array.isArray(l) ? l : [l]), u = this.getAlias(e);
      Array.isArray(u) ? u.forEach(r) : r(u);
      const A = [];
      f.forEach((l) => {
        l.forEach((c) => {
          let d = {};
          if (typeof c != "object") {
            d.src = c;
            for (let p = 0; p < this._parsers.length; p++) {
              const B = this._parsers[p];
              if (B.test(c)) {
                d = B.parse(c);
                break;
              }
            }
          } else
            n = c.data ?? n, h = c.format ?? h, o = c.loadParser ?? o, d = {
              ...d,
              ...c
            };
          if (!u)
            throw new Error(`[Resolver] alias is undefined for this asset: ${d.src}`);
          d = this._buildResolvedAsset(d, {
            aliases: u,
            data: n,
            format: h,
            loadParser: o
          }), A.push(d);
        });
      }), u.forEach((l) => {
        this._assetMap[l] = A;
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
  resolveBundle(s) {
    const t = I(s);
    s = _(s);
    const r = {};
    return s.forEach((a) => {
      const e = this._bundles[a];
      if (e) {
        const i = this.resolve(e), n = {};
        for (const h in i) {
          const o = i[h];
          n[this._extractAssetIdFromBundle(a, h)] = o;
        }
        r[a] = n;
      }
    }), t ? r[s[0]] : r;
  }
  /**
   * Does exactly what resolve does, but returns just the URL rather than the whole asset object
   * @param key - The key or keys to resolve
   * @returns - The URLs associated with the key(s)
   */
  resolveUrl(s) {
    const t = this.resolve(s);
    if (typeof s != "string") {
      const r = {};
      for (const a in t)
        r[a] = t[a].src;
      return r;
    }
    return t.src;
  }
  resolve(s) {
    const t = I(s);
    s = _(s);
    const r = {};
    return s.forEach((a) => {
      if (!this._resolverHash[a])
        if (this._assetMap[a]) {
          let e = this._assetMap[a];
          const i = this._getPreferredOrder(e);
          i == null || i.priority.forEach((n) => {
            i.params[n].forEach((h) => {
              const o = e.filter((f) => f[n] ? f[n] === h : !1);
              o.length && (e = o);
            });
          }), this._resolverHash[a] = e[0];
        } else
          this._resolverHash[a] = this._buildResolvedAsset({
            alias: [a],
            src: a
          }, {});
      r[a] = this._resolverHash[a];
    }), t ? r[s[0]] : r;
  }
  /**
   * Checks if an asset with a given key exists in the resolver
   * @param key - The key of the asset
   */
  hasKey(s) {
    return !!this._assetMap[s];
  }
  /**
   * Checks if a bundle with the given key exists in the resolver
   * @param key - The key of the bundle
   */
  hasBundle(s) {
    return !!this._bundles[s];
  }
  /**
   * Internal function for figuring out what prefer criteria an asset should use.
   * @param assets
   */
  _getPreferredOrder(s) {
    for (let t = 0; t < s.length; t++) {
      const r = s[t], a = this._preferredOrder.find((e) => e.params.format.includes(r.format));
      if (a)
        return a;
    }
    return this._preferredOrder[0];
  }
  /**
   * Appends the default url parameters to the url
   * @param url - The url to append the default parameters to
   * @returns - The url with the default parameters appended
   */
  _appendDefaultSearchParams(s) {
    if (!this._defaultSearchParams)
      return s;
    const t = /\?/.test(s) ? "&" : "?";
    return `${s}${t}${this._defaultSearchParams}`;
  }
  _buildResolvedAsset(s, t) {
    const { aliases: r, data: a, loadParser: e, format: i } = t;
    return (this._basePath || this._rootPath) && (s.src = g.toAbsolute(s.src, this._basePath, this._rootPath)), s.alias = r ?? s.alias ?? [s.src], s.src = this._appendDefaultSearchParams(s.src), s.data = { ...a || {}, ...s.data }, s.loadParser = e ?? s.loadParser, s.format = i ?? s.format ?? y(s.src), s;
  }
}
E.RETINA_PREFIX = /@([0-9\.]+)x/;
function y(m) {
  return m.split(".").pop().split("?").shift().split("#").shift();
}
export {
  E as Resolver,
  y as getUrlExtension
};
//# sourceMappingURL=index357.js.map

import { extensions as f, ExtensionType as c } from "./index153.js";
import { loadBitmapFont as w, bitmapFontCachePlugin as b } from "./index337.js";
import { warn as A } from "./index338.js";
import { BackgroundLoader as L } from "./index339.js";
import { Cache as d } from "./index340.js";
import { cacheTextureArray as P } from "./index341.js";
import { detectAvif as k } from "./index342.js";
import { detectDefaults as B } from "./index343.js";
import { detectMp4 as O } from "./index344.js";
import { detectOgv as x } from "./index345.js";
import { detectWebm as F } from "./index346.js";
import { detectWebp as R } from "./index347.js";
import { Loader as j } from "./index348.js";
import { loadJson as z } from "./index349.js";
import { loadTxt as T } from "./index350.js";
import { loadWebFont as E } from "./index351.js";
import { loadSvg as D } from "./index352.js";
import { loadTextures as S } from "./index353.js";
import { loadVideoTextures as C } from "./index354.js";
import { resolveJsonUrl as M } from "./index355.js";
import { resolveTextureUrl as K } from "./index356.js";
import { Resolver as W } from "./index357.js";
import { convertToList as v } from "./index358.js";
import { isSingleItem as J } from "./index359.js";
class U {
  constructor() {
    this._detections = [], this._initialized = !1, this.resolver = new W(), this.loader = new j(), this.cache = d, this._backgroundLoader = new L(this.loader), this._backgroundLoader.active = !0, this.reset();
  }
  /**
   * Best practice is to call this function before any loading commences
   * Initiating is the best time to add any customization to the way things are loaded.
   *
   * you do not need to call this for the Assets class to work, only if you want to set any initial properties
   * @param options - options to initialize the Assets manager with
   */
  async init(e = {}) {
    var o, a;
    if (this._initialized) {
      A("[Assets]AssetManager already initialized, did you load before calling this Assets.init()?");
      return;
    }
    if (this._initialized = !0, e.defaultSearchParams && this.resolver.setDefaultSearchParams(e.defaultSearchParams), e.basePath && (this.resolver.basePath = e.basePath), e.bundleIdentifier && this.resolver.setBundleIdentifier(e.bundleIdentifier), e.manifest) {
      let i = e.manifest;
      typeof i == "string" && (i = await this.load(i)), this.resolver.addManifest(i);
    }
    const t = ((o = e.texturePreference) == null ? void 0 : o.resolution) ?? 1, r = typeof t == "number" ? [t] : t, s = await this._detectFormats({
      preferredFormats: (a = e.texturePreference) == null ? void 0 : a.format,
      skipDetections: e.skipDetections,
      detections: this._detections
    });
    this.resolver.prefer({
      params: {
        format: s,
        resolution: r
      }
    }), e.preferences && this.setPreferences(e.preferences);
  }
  /**
   * Allows you to specify how to resolve any assets load requests.
   * There are a few ways to add things here as shown below:
   * @example
   * import { Assets } from 'pixi.js';
   *
   * // Simple
   * Assets.add({alias: 'bunnyBooBoo', src: 'bunny.png'});
   * const bunny = await Assets.load('bunnyBooBoo');
   *
   * // Multiple keys:
   * Assets.add({alias: ['burger', 'chicken'], src: 'bunny.png'});
   *
   * const bunny = await Assets.load('burger');
   * const bunny2 = await Assets.load('chicken');
   *
   * // passing options to to the object
   * Assets.add({
   *     alias: 'bunnyBooBooSmooth',
   *     src: 'bunny.{png,webp}',
   *     data: { scaleMode: SCALE_MODES.NEAREST }, // Base texture options
   * });
   *
   * // Multiple assets
   *
   * // The following all do the same thing:
   *
   * Assets.add({alias: 'bunnyBooBoo', src: 'bunny.{png,webp}'});
   *
   * Assets.add({
   *     alias: 'bunnyBooBoo',
   *     src: [
   *         'bunny.png',
   *         'bunny.webp',
   *    ],
   * });
   *
   * const bunny = await Assets.load('bunnyBooBoo'); // Will try to load WebP if available
   * @param assets - the unresolved assets to add to the resolver
   */
  add(e) {
    this.resolver.add(e);
  }
  async load(e, t) {
    this._initialized || await this.init();
    const r = J(e), s = v(e).map((i) => {
      if (typeof i != "string") {
        const n = this.resolver.getAlias(i);
        return n.some((l) => !this.resolver.hasKey(l)) && this.add(i), Array.isArray(n) ? n[0] : n;
      }
      return this.resolver.hasKey(i) || this.add({ alias: i, src: i }), i;
    }), o = this.resolver.resolve(s), a = await this._mapLoadToResolve(o, t);
    return r ? a[s[0]] : a;
  }
  /**
   * This adds a bundle of assets in one go so that you can load them as a group.
   * For example you could add a bundle for each screen in you pixi app
   * @example
   * import { Assets } from 'pixi.js';
   *
   * Assets.addBundle('animals', [
   *  { alias: 'bunny', src: 'bunny.png' },
   *  { alias: 'chicken', src: 'chicken.png' },
   *  { alias: 'thumper', src: 'thumper.png' },
   * ]);
   * // or
   * Assets.addBundle('animals', {
   *     bunny: 'bunny.png',
   *     chicken: 'chicken.png',
   *     thumper: 'thumper.png',
   * });
   *
   * const assets = await Assets.loadBundle('animals');
   * @param bundleId - the id of the bundle to add
   * @param assets - a record of the asset or assets that will be chosen from when loading via the specified key
   */
  addBundle(e, t) {
    this.resolver.addBundle(e, t);
  }
  /**
   * Bundles are a way to load multiple assets at once.
   * If a manifest has been provided to the init function then you can load a bundle, or bundles.
   * you can also add bundles via `addBundle`
   * @example
   * import { Assets } from 'pixi.js';
   *
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
   * await Assets.init({ manifest });
   *
   * // Load a bundle...
   * loadScreenAssets = await Assets.loadBundle('load-screen');
   * // Load another bundle...
   * gameScreenAssets = await Assets.loadBundle('game-screen');
   * @param bundleIds - the bundle id or ids to load
   * @param onProgress - Optional function that is called when progress on asset loading is made.
   * The function is passed a single parameter, `progress`, which represents the percentage (0.0 - 1.0)
   * of the assets loaded. Do not use this function to detect when assets are complete and available,
   * instead use the Promise returned by this function.
   * @returns all the bundles assets or a hash of assets for each bundle specified
   */
  async loadBundle(e, t) {
    this._initialized || await this.init();
    let r = !1;
    typeof e == "string" && (r = !0, e = [e]);
    const s = this.resolver.resolveBundle(e), o = {}, a = Object.keys(s);
    let i = 0, n = 0;
    const l = () => {
      t == null || t(++i / n);
    }, g = a.map((u) => {
      const p = s[u];
      return n += Object.keys(p).length, this._mapLoadToResolve(p, l).then((_) => {
        o[u] = _;
      });
    });
    return await Promise.all(g), r ? o[e[0]] : o;
  }
  /**
   * Initiate a background load of some assets. It will passively begin to load these assets in the background.
   * So when you actually come to loading them you will get a promise that resolves to the loaded assets immediately
   *
   * An example of this might be that you would background load game assets after your initial load.
   * then when you got to actually load your game screen assets when a player goes to the game - the loading
   * would already have stared or may even be complete, saving you having to show an interim load bar.
   * @example
   * import { Assets } from 'pixi.js';
   *
   * Assets.backgroundLoad('bunny.png');
   *
   * // later on in your app...
   * await Assets.loadBundle('bunny.png'); // Will resolve quicker as loading may have completed!
   * @param urls - the url / urls you want to background load
   */
  async backgroundLoad(e) {
    this._initialized || await this.init(), typeof e == "string" && (e = [e]);
    const t = this.resolver.resolve(e);
    this._backgroundLoader.add(Object.values(t));
  }
  /**
   * Initiate a background of a bundle, works exactly like backgroundLoad but for bundles.
   * this can only be used if the loader has been initiated with a manifest
   * @example
   * import { Assets } from 'pixi.js';
   *
   * await Assets.init({
   *     manifest: {
   *         bundles: [
   *             {
   *                 name: 'load-screen',
   *                 assets: [...],
   *             },
   *             ...
   *         ],
   *     },
   * });
   *
   * Assets.backgroundLoadBundle('load-screen');
   *
   * // Later on in your app...
   * await Assets.loadBundle('load-screen'); // Will resolve quicker as loading may have completed!
   * @param bundleIds - the bundleId / bundleIds you want to background load
   */
  async backgroundLoadBundle(e) {
    this._initialized || await this.init(), typeof e == "string" && (e = [e]);
    const t = this.resolver.resolveBundle(e);
    Object.values(t).forEach((r) => {
      this._backgroundLoader.add(Object.values(r));
    });
  }
  /**
   * Only intended for development purposes.
   * This will wipe the resolver and caches.
   * You will need to reinitialize the Asset
   */
  reset() {
    this.resolver.reset(), this.loader.reset(), this.cache.reset(), this._initialized = !1;
  }
  get(e) {
    if (typeof e == "string")
      return d.get(e);
    const t = {};
    for (let r = 0; r < e.length; r++)
      t[r] = d.get(e[r]);
    return t;
  }
  /**
   * helper function to map resolved assets back to loaded assets
   * @param resolveResults - the resolve results from the resolver
   * @param onProgress - the progress callback
   */
  async _mapLoadToResolve(e, t) {
    const r = [...new Set(Object.values(e))];
    this._backgroundLoader.active = !1;
    const s = await this.loader.load(r, t);
    this._backgroundLoader.active = !0;
    const o = {};
    return r.forEach((a) => {
      const i = s[a.src], n = [a.src];
      a.alias && n.push(...a.alias), n.forEach((l) => {
        o[l] = i;
      }), d.set(n, i);
    }), o;
  }
  /**
   * Unload an asset or assets. As the Assets class is responsible for creating the assets via the `load` function
   * this will make sure to destroy any assets and release them from memory.
   * Once unloaded, you will need to load the asset again.
   *
   * Use this to help manage assets if you find that you have a large app and you want to free up memory.
   *
   * - it's up to you as the developer to make sure that textures are not actively being used when you unload them,
   * Pixi won't break but you will end up with missing assets. Not a good look for the user!
   * @example
   * import { Assets } from 'pixi.js';
   *
   * // Load a URL:
   * const myImageTexture = await Assets.load('http://some.url.com/image.png'); // => returns a texture
   *
   * await Assets.unload('http://some.url.com/image.png')
   *
   * // myImageTexture will be destroyed now.
   *
   * // Unload multiple assets:
   * const textures = await Assets.unload(['thumper', 'chicko']);
   * @param urls - the urls to unload
   */
  async unload(e) {
    this._initialized || await this.init();
    const t = v(e).map((s) => typeof s != "string" ? s.src : s), r = this.resolver.resolve(t);
    await this._unloadFromResolved(r);
  }
  /**
   * Bundles are a way to manage multiple assets at once.
   * this will unload all files in a bundle.
   *
   * once a bundle has been unloaded, you need to load it again to have access to the assets.
   * @example
   * import { Assets } from 'pixi.js';
   *
   * Assets.addBundle({
   *     'thumper': 'http://some.url.com/thumper.png',
   * })
   *
   * const assets = await Assets.loadBundle('thumper');
   *
   * // Now to unload...
   *
   * await Assets.unloadBundle('thumper');
   *
   * // All assets in the assets object will now have been destroyed and purged from the cache
   * @param bundleIds - the bundle id or ids to unload
   */
  async unloadBundle(e) {
    this._initialized || await this.init(), e = v(e);
    const t = this.resolver.resolveBundle(e), r = Object.keys(t).map((s) => this._unloadFromResolved(t[s]));
    await Promise.all(r);
  }
  async _unloadFromResolved(e) {
    const t = Object.values(e);
    t.forEach((r) => {
      d.remove(r.src);
    }), await this.loader.unload(t);
  }
  /**
   * Detects the supported formats for the browser, and returns an array of supported formats, respecting
   * the users preferred formats order.
   * @param options - the options to use when detecting formats
   * @param options.preferredFormats - the preferred formats to use
   * @param options.skipDetections - if we should skip the detections altogether
   * @param options.detections - the detections to use
   * @returns - the detected formats
   */
  async _detectFormats(e) {
    let t = [];
    e.preferredFormats && (t = Array.isArray(e.preferredFormats) ? e.preferredFormats : [e.preferredFormats]);
    for (const r of e.detections)
      e.skipDetections || await r.test() ? t = await r.add(t) : e.skipDetections || (t = await r.remove(t));
    return t = t.filter((r, s) => t.indexOf(r) === s), t;
  }
  /** All the detection parsers currently added to the Assets class. */
  get detections() {
    return this._detections;
  }
  /**
   * General setter for preferences. This is a helper function to set preferences on all parsers.
   * @param preferences - the preferences to set
   */
  setPreferences(e) {
    this.loader.parsers.forEach((t) => {
      t.config && Object.keys(t.config).filter((r) => r in e).forEach((r) => {
        t.config[r] = e[r];
      });
    });
  }
}
const m = new U();
f.handleByList(c.LoadParser, m.loader.parsers).handleByList(c.ResolveParser, m.resolver.parsers).handleByList(c.CacheParser, m.cache.parsers).handleByList(c.DetectionParser, m.detections);
f.add(
  P,
  B,
  k,
  R,
  O,
  x,
  F,
  z,
  T,
  E,
  D,
  S,
  C,
  w,
  b,
  K,
  M
);
const y = {
  loader: c.LoadParser,
  resolver: c.ResolveParser,
  cache: c.CacheParser,
  detection: c.DetectionParser
};
f.handle(c.Asset, (h) => {
  const e = h.ref;
  Object.entries(y).filter(([t]) => !!e[t]).forEach(([t, r]) => f.add(Object.assign(
    e[t],
    // Allow the function to optionally define it's own
    // ExtensionMetadata, the use cases here is priority for LoaderParsers
    { extension: e[t].extension ?? r }
  )));
}, (h) => {
  const e = h.ref;
  Object.keys(y).filter((t) => !!e[t]).forEach((t) => f.remove(e[t]));
});
export {
  m as Assets,
  U as AssetsClass
};
//# sourceMappingURL=index146.js.map

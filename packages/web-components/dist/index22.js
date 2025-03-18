import "./index23.js";
import "./index24.js";
import { extensions as y, ExtensionType as d } from "./index140.js";
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
import { deprecation as g } from "./index133.js";
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
import { BackgroundLoader as _ } from "./index144.js";
import { Cache as l } from "./index145.js";
import { Loader as k } from "./index146.js";
import "./index89.js";
import "./index90.js";
import "./index91.js";
import "./index92.js";
import { loadTextures as w } from "./index93.js";
import "./index94.js";
import { Resolver as A } from "./index147.js";
import { convertToList as h } from "./index148.js";
import { isSingleItem as L } from "./index149.js";
class P {
  constructor() {
    this._detections = [], this._initialized = !1, this.resolver = new A(), this.loader = new k(), this.cache = l, this._backgroundLoader = new _(this.loader), this._backgroundLoader.active = !0, this.reset();
  }
  /**
   * Best practice is to call this function before any loading commences
   * Initiating is the best time to add any customization to the way things are loaded.
   *
   * you do not need to call this for the Asset class to work, only if you want to set any initial properties
   * @param options - options to initialize the Asset manager with
   */
  async init(e = {}) {
    var o, a;
    if (this._initialized) {
      console.warn("[Assets]AssetManager already initialized, did you load before calling this Assets.init()?");
      return;
    }
    if (this._initialized = !0, e.defaultSearchParams && this.resolver.setDefaultSearchParams(e.defaultSearchParams), e.basePath && (this.resolver.basePath = e.basePath), e.bundleIdentifier && this.resolver.setBundleIdentifier(e.bundleIdentifier), e.manifest) {
      let s = e.manifest;
      typeof s == "string" && (s = await this.load(s)), this.resolver.addManifest(s);
    }
    const t = ((o = e.texturePreference) == null ? void 0 : o.resolution) ?? 1, r = typeof t == "number" ? [t] : t, i = await this._detectFormats({
      preferredFormats: (a = e.texturePreference) == null ? void 0 : a.format,
      skipDetections: e.skipDetections,
      detections: this._detections
    });
    this.resolver.prefer({
      params: {
        format: i,
        resolution: r
      }
    }), e.preferences && this.setPreferences(e.preferences);
  }
  add(e, t, r, i, o) {
    this.resolver.add(e, t, r, i, o);
  }
  async load(e, t) {
    this._initialized || await this.init();
    const r = L(e), i = h(e).map((s) => {
      if (typeof s != "string") {
        const n = this.resolver.getAlias(s);
        return n.some((m) => !this.resolver.hasKey(m)) && this.add(s), Array.isArray(n) ? n[0] : n;
      }
      return this.resolver.hasKey(s) || this.add({ alias: s, src: s }), s;
    }), o = this.resolver.resolve(i), a = await this._mapLoadToResolve(o, t);
    return r ? a[i[0]] : a;
  }
  /**
   * This adds a bundle of assets in one go so that you can load them as a group.
   * For example you could add a bundle for each screen in you pixi app
   * @example
   * import { Assets } from 'pixi.js';
   *
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
    const i = this.resolver.resolveBundle(e), o = {}, a = Object.keys(i);
    let s = 0, n = 0;
    const m = () => {
      t == null || t(++s / n);
    }, c = a.map((f) => {
      const v = i[f];
      return n += Object.keys(v).length, this._mapLoadToResolve(v, m).then((u) => {
        o[f] = u;
      });
    });
    return await Promise.all(c), r ? o[e[0]] : o;
  }
  /**
   * Initiate a background load of some assets. It will passively begin to load these assets in the background.
   * So when you actually come to loading them you will get a promise that resolves to the loaded assets immediately
   *
   * An example of this might be that you would background load game assets after your inital load.
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
      return l.get(e);
    const t = {};
    for (let r = 0; r < e.length; r++)
      t[r] = l.get(e[r]);
    return t;
  }
  /**
   * helper function to map resolved assets back to loaded assets
   * @param resolveResults - the resolve results from the resolver
   * @param onProgress - the progress callback
   */
  async _mapLoadToResolve(e, t) {
    const r = Object.values(e), i = Object.keys(e);
    this._backgroundLoader.active = !1;
    const o = await this.loader.load(r, t);
    this._backgroundLoader.active = !0;
    const a = {};
    return r.forEach((s, n) => {
      const m = o[s.src], c = [s.src];
      s.alias && c.push(...s.alias), a[i[n]] = m, l.set(c, m);
    }), a;
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
    const t = h(e).map((i) => typeof i != "string" ? i.src : i), r = this.resolver.resolve(t);
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
    this._initialized || await this.init(), e = h(e);
    const t = this.resolver.resolveBundle(e), r = Object.keys(t).map((i) => this._unloadFromResolved(t[i]));
    await Promise.all(r);
  }
  async _unloadFromResolved(e) {
    const t = Object.values(e);
    t.forEach((r) => {
      l.remove(r.src);
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
    return t = t.filter((r, i) => t.indexOf(r) === i), t;
  }
  /** All the detection parsers currently added to the Assets class. */
  get detections() {
    return this._detections;
  }
  /**
   * @deprecated since 7.2.0
   * @see {@link Assets.setPreferences}
   */
  get preferWorkers() {
    return w.config.preferWorkers;
  }
  set preferWorkers(e) {
    g("7.2.0", "Assets.prefersWorkers is deprecated, use Assets.setPreferences({ preferWorkers: true }) instead."), this.setPreferences({ preferWorkers: e });
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
const p = new P();
y.handleByList(d.LoadParser, p.loader.parsers).handleByList(d.ResolveParser, p.resolver.parsers).handleByList(d.CacheParser, p.cache.parsers).handleByList(d.DetectionParser, p.detections);
export {
  p as Assets,
  P as AssetsClass
};
//# sourceMappingURL=index22.js.map

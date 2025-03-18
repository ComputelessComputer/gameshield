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
import { path as n } from "./index151.js";
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
import { convertToList as h } from "./index160.js";
import { isSingleItem as d } from "./index161.js";
class $r {
  constructor() {
    this._parsers = [], this._parsersValidated = !1, this.parsers = new Proxy(this._parsers, {
      set: (s, t, o) => (this._parsersValidated = !1, s[t] = o, !0)
    }), this.promiseCache = {};
  }
  /** function used for testing */
  reset() {
    this._parsersValidated = !1, this.promiseCache = {};
  }
  /**
   * Used internally to generate a promise for the asset to be loaded.
   * @param url - The URL to be loaded
   * @param data - any custom additional information relevant to the asset being loaded
   * @returns - a promise that will resolve to an Asset for example a Texture of a JSON object
   */
  _getLoadPromiseAndParser(s, t) {
    const o = {
      promise: null,
      parser: null
    };
    return o.promise = (async () => {
      var a, m;
      let i = null, e = null;
      if (t.loadParser && (e = this._parserHash[t.loadParser], e || console.warn(`[Assets] specified load parser "${t.loadParser}" not found while loading ${s}`)), !e) {
        for (let p = 0; p < this.parsers.length; p++) {
          const r = this.parsers[p];
          if (r.load && ((a = r.test) != null && a.call(r, s, t, this))) {
            e = r;
            break;
          }
        }
        if (!e)
          return console.warn(`[Assets] ${s} could not be loaded as we don't know how to parse it, ensure the correct parser has been added`), null;
      }
      i = await e.load(s, t, this), o.parser = e;
      for (let p = 0; p < this.parsers.length; p++) {
        const r = this.parsers[p];
        r.parse && r.parse && await ((m = r.testParse) == null ? void 0 : m.call(r, i, t, this)) && (i = await r.parse(i, t, this) || i, o.parser = r);
      }
      return i;
    })(), o;
  }
  async load(s, t) {
    this._parsersValidated || this._validateParsers();
    let o = 0;
    const i = {}, e = d(s), a = h(s, (r) => ({
      alias: [r],
      src: r
    })), m = a.length, p = a.map(async (r) => {
      const l = n.toAbsolute(r.src);
      if (!i[r.src])
        try {
          this.promiseCache[l] || (this.promiseCache[l] = this._getLoadPromiseAndParser(l, r)), i[r.src] = await this.promiseCache[l].promise, t && t(++o / m);
        } catch (c) {
          throw delete this.promiseCache[l], delete i[r.src], new Error(`[Loader.load] Failed to load ${l}.
${c}`);
        }
    });
    return await Promise.all(p), e ? i[a[0].src] : i;
  }
  /**
   * Unloads one or more assets. Any unloaded assets will be destroyed, freeing up memory for your app.
   * The parser that created the asset, will be the one that unloads it.
   * @example
   * // Single asset:
   * const asset = await Loader.load('cool.png');
   *
   * await Loader.unload('cool.png');
   *
   * console.log(asset.destroyed); // true
   * @param assetsToUnloadIn - urls that you want to unload, or a single one!
   */
  async unload(s) {
    const t = h(s, (o) => ({
      alias: [o],
      src: o
    })).map(async (o) => {
      var a, m;
      const i = n.toAbsolute(o.src), e = this.promiseCache[i];
      if (e) {
        const p = await e.promise;
        delete this.promiseCache[i], (m = (a = e.parser) == null ? void 0 : a.unload) == null || m.call(a, p, o, this);
      }
    });
    await Promise.all(t);
  }
  /** validates our parsers, right now it only checks for name conflicts but we can add more here as required! */
  _validateParsers() {
    this._parsersValidated = !0, this._parserHash = this._parsers.filter((s) => s.name).reduce((s, t) => (s[t.name] && console.warn(`[Assets] loadParser name conflict "${t.name}"`), { ...s, [t.name]: t }), {});
  }
}
export {
  $r as Loader
};
//# sourceMappingURL=index158.js.map

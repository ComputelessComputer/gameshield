import { warn as c } from "./index338.js";
import { path as d } from "./index363.js";
import { convertToList as p } from "./index358.js";
import { isSingleItem as f } from "./index359.js";
class C {
  constructor() {
    this._parsers = [], this._parsersValidated = !1, this.parsers = new Proxy(this._parsers, {
      set: (a, e, o) => (this._parsersValidated = !1, a[e] = o, !0)
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
  _getLoadPromiseAndParser(a, e) {
    const o = {
      promise: null,
      parser: null
    };
    return o.promise = (async () => {
      var l, n;
      let r = null, t = null;
      if (e.loadParser && (t = this._parserHash[e.loadParser], t || c(`[Assets] specified load parser "${e.loadParser}" not found while loading ${a}`)), !t) {
        for (let i = 0; i < this.parsers.length; i++) {
          const s = this.parsers[i];
          if (s.load && ((l = s.test) != null && l.call(s, a, e, this))) {
            t = s;
            break;
          }
        }
        if (!t)
          return c(`[Assets] ${a} could not be loaded as we don't know how to parse it, ensure the correct parser has been added`), null;
      }
      r = await t.load(a, e, this), o.parser = t;
      for (let i = 0; i < this.parsers.length; i++) {
        const s = this.parsers[i];
        s.parse && s.parse && await ((n = s.testParse) == null ? void 0 : n.call(s, r, e, this)) && (r = await s.parse(r, e, this) || r, o.parser = s);
      }
      return r;
    })(), o;
  }
  async load(a, e) {
    this._parsersValidated || this._validateParsers();
    let o = 0;
    const r = {}, t = f(a), l = p(a, (s) => ({
      alias: [s],
      src: s,
      data: {}
    })), n = l.length, i = l.map(async (s) => {
      const h = d.toAbsolute(s.src);
      if (!r[s.src])
        try {
          this.promiseCache[h] || (this.promiseCache[h] = this._getLoadPromiseAndParser(h, s)), r[s.src] = await this.promiseCache[h].promise, e && e(++o / n);
        } catch (m) {
          throw delete this.promiseCache[h], delete r[s.src], new Error(`[Loader.load] Failed to load ${h}.
${m}`);
        }
    });
    return await Promise.all(i), t ? r[l[0].src] : r;
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
  async unload(a) {
    const o = p(a, (r) => ({
      alias: [r],
      src: r
    })).map(async (r) => {
      var n, i;
      const t = d.toAbsolute(r.src), l = this.promiseCache[t];
      if (l) {
        const s = await l.promise;
        delete this.promiseCache[t], await ((i = (n = l.parser) == null ? void 0 : n.unload) == null ? void 0 : i.call(n, s, r, this));
      }
    });
    await Promise.all(o);
  }
  /** validates our parsers, right now it only checks for name conflicts but we can add more here as required! */
  _validateParsers() {
    this._parsersValidated = !0, this._parserHash = this._parsers.filter((a) => a.name).reduce((a, e) => (e.name ? a[e.name] && c(`[Assets] loadParser name conflict "${e.name}"`) : c("[Assets] loadParser should have a name"), { ...a, [e.name]: e }), {});
  }
}
export {
  C as Loader
};
//# sourceMappingURL=index348.js.map

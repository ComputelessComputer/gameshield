import { warn as i } from "./index338.js";
import { convertToList as p } from "./index358.js";
class _ {
  constructor() {
    this._parsers = [], this._cache = /* @__PURE__ */ new Map(), this._cacheMap = /* @__PURE__ */ new Map();
  }
  /** Clear all entries. */
  reset() {
    this._cacheMap.clear(), this._cache.clear();
  }
  /**
   * Check if the key exists
   * @param key - The key to check
   */
  has(s) {
    return this._cache.has(s);
  }
  /**
   * Fetch entry by key
   * @param key - The key of the entry to get
   */
  get(s) {
    const c = this._cache.get(s);
    return c || i(`[Assets] Asset id ${s} was not found in the Cache`), c;
  }
  /**
   * Set a value by key or keys name
   * @param key - The key or keys to set
   * @param value - The value to store in the cache or from which cacheable assets will be derived.
   */
  set(s, c) {
    const a = p(s);
    let t;
    for (let e = 0; e < this.parsers.length; e++) {
      const h = this.parsers[e];
      if (h.test(c)) {
        t = h.getCacheableAssets(a, c);
        break;
      }
    }
    const r = new Map(Object.entries(t || {}));
    t || a.forEach((e) => {
      r.set(e, c);
    });
    const o = [...r.keys()], n = {
      cacheKeys: o,
      keys: a
    };
    a.forEach((e) => {
      this._cacheMap.set(e, n);
    }), o.forEach((e) => {
      const h = t ? t[e] : c;
      this._cache.has(e) && this._cache.get(e) !== h && i("[Cache] already has key:", e), this._cache.set(e, r.get(e));
    });
  }
  /**
   * Remove entry by key
   *
   * This function will also remove any associated alias from the cache also.
   * @param key - The key of the entry to remove
   */
  remove(s) {
    if (!this._cacheMap.has(s)) {
      i(`[Assets] Asset id ${s} was not found in the Cache`);
      return;
    }
    const c = this._cacheMap.get(s);
    c.cacheKeys.forEach((t) => {
      this._cache.delete(t);
    }), c.keys.forEach((t) => {
      this._cacheMap.delete(t);
    });
  }
  /** All loader parsers registered */
  get parsers() {
    return this._parsers;
  }
}
const d = new _();
export {
  d as Cache
};
//# sourceMappingURL=index340.js.map

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
import { BaseTexture as m } from "./index54.js";
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
import { Texture as p } from "./index131.js";
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
import "./index67.js";
import "./index79.js";
import "./index80.js";
import "./index81.js";
import { convertToList as h } from "./index145.js";
class n {
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
  has(o) {
    return this._cache.has(o);
  }
  /**
   * Fetch entry by key
   * @param key - The key of the entry to get
   */
  get(o) {
    const r = this._cache.get(o);
    return r || console.warn(`[Assets] Asset id ${o} was not found in the Cache`), r;
  }
  /**
   * Set a value by key or keys name
   * @param key - The key or keys to set
   * @param value - The value to store in the cache or from which cacheable assets will be derived.
   */
  set(o, r) {
    const e = h(o);
    let i;
    for (let t = 0; t < this.parsers.length; t++) {
      const s = this.parsers[t];
      if (s.test(r)) {
        i = s.getCacheableAssets(e, r);
        break;
      }
    }
    i || (i = {}, e.forEach((t) => {
      i[t] = r;
    }));
    const c = Object.keys(i), a = {
      cacheKeys: c,
      keys: e
    };
    if (e.forEach((t) => {
      this._cacheMap.set(t, a);
    }), c.forEach((t) => {
      const s = i ? i[t] : r;
      this._cache.has(t) && this._cache.get(t) !== s && console.warn("[Cache] already has key:", t), this._cache.set(t, i[t]);
    }), r instanceof p) {
      const t = r;
      e.forEach((s) => {
        t.baseTexture !== p.EMPTY.baseTexture && m.addToCache(t.baseTexture, s), p.addToCache(t, s);
      });
    }
  }
  /**
   * Remove entry by key
   *
   * This function will also remove any associated alias from the cache also.
   * @param key - The key of the entry to remove
   */
  remove(o) {
    if (!this._cacheMap.has(o)) {
      console.warn(`[Assets] Asset id ${o} was not found in the Cache`);
      return;
    }
    const r = this._cacheMap.get(o);
    r.cacheKeys.forEach((e) => {
      this._cache.delete(e);
    }), r.keys.forEach((e) => {
      this._cacheMap.delete(e);
    });
  }
  /** All loader parsers registered */
  get parsers() {
    return this._parsers;
  }
}
const wt = new n();
export {
  wt as Cache
};
//# sourceMappingURL=index142.js.map

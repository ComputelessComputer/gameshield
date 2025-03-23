import { Pool as e } from "./index483.js";
class l {
  constructor() {
    this._poolsByClass = /* @__PURE__ */ new Map();
  }
  /**
   * Prepopulates a specific pool with a given number of items.
   * @template T The type of items in the pool. Must extend PoolItem.
   * @param {PoolItemConstructor<T>} Class - The constructor of the items in the pool.
   * @param {number} total - The number of items to add to the pool.
   */
  prepopulate(s, o) {
    this.getPool(s).prepopulate(o);
  }
  /**
   * Gets an item from a specific pool.
   * @template T The type of items in the pool. Must extend PoolItem.
   * @param {PoolItemConstructor<T>} Class - The constructor of the items in the pool.
   * @param {unknown} [data] - Optional data to pass to the item's constructor.
   * @returns {T} The item from the pool.
   */
  get(s, o) {
    return this.getPool(s).get(o);
  }
  /**
   * Returns an item to its respective pool.
   * @param {PoolItem} item - The item to return to the pool.
   */
  return(s) {
    this.getPool(s.constructor).return(s);
  }
  /**
   * Gets a specific pool based on the class type.
   * @template T The type of items in the pool. Must extend PoolItem.
   * @param {PoolItemConstructor<T>} ClassType - The constructor of the items in the pool.
   * @returns {Pool<T>} The pool of the given class type.
   */
  getPool(s) {
    return this._poolsByClass.has(s) || this._poolsByClass.set(s, new e(s)), this._poolsByClass.get(s);
  }
  /** gets the usage stats of each pool in the system */
  stats() {
    const s = {};
    return this._poolsByClass.forEach((o) => {
      const t = s[o._classType.name] ? o._classType.name + o._classType.ID : o._classType.name;
      s[t] = {
        free: o.totalFree,
        used: o.totalUsed,
        size: o.totalSize
      };
    }), s;
  }
}
const n = new l();
export {
  n as BigPool,
  l as PoolGroupClass
};
//# sourceMappingURL=index446.js.map

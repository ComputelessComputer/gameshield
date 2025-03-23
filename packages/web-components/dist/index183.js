import i from "./index600.js";
import h from "./index601.js";
let o = 0, s;
class u {
  constructor() {
    this._initialized = !1, this._createdWorkers = 0, this.workerPool = [], this.queue = [], this.resolveHash = {};
  }
  isImageBitmapSupported() {
    return this._isImageBitmapSupported !== void 0 ? this._isImageBitmapSupported : (this._isImageBitmapSupported = new Promise((e) => {
      const { worker: r } = new i();
      r.addEventListener("message", (t) => {
        r.terminate(), i.revokeObjectURL(), e(t.data);
      });
    }), this._isImageBitmapSupported);
  }
  loadImageBitmap(e) {
    return this._run("loadImageBitmap", [e]);
  }
  async _initWorkers() {
    this._initialized || (this._initialized = !0);
  }
  getWorker() {
    s === void 0 && (s = navigator.hardwareConcurrency || 4);
    let e = this.workerPool.pop();
    return !e && this._createdWorkers < s && (this._createdWorkers++, e = new h().worker, e.addEventListener("message", (r) => {
      this.complete(r.data), this.returnWorker(r.target), this.next();
    })), e;
  }
  returnWorker(e) {
    this.workerPool.push(e);
  }
  complete(e) {
    e.error !== void 0 ? this.resolveHash[e.uuid].reject(e.error) : this.resolveHash[e.uuid].resolve(e.data), this.resolveHash[e.uuid] = null;
  }
  async _run(e, r) {
    await this._initWorkers();
    const t = new Promise((a, n) => {
      this.queue.push({ id: e, arguments: r, resolve: a, reject: n });
    });
    return this.next(), t;
  }
  next() {
    if (!this.queue.length)
      return;
    const e = this.getWorker();
    if (!e)
      return;
    const r = this.queue.pop(), t = r.id;
    this.resolveHash[o] = { resolve: r.resolve, reject: r.reject }, e.postMessage({
      data: r.arguments,
      uuid: o++,
      id: t
    });
  }
}
const l = new u();
export {
  l as WorkerManager
};
//# sourceMappingURL=index183.js.map

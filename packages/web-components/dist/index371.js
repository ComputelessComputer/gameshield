import s from "./index373.js";
import u from "./index374.js";
let o = 0, i;
class h {
  constructor() {
    this._initialized = !1, this._createdWorkers = 0, this._workerPool = [], this._queue = [], this._resolveHash = {};
  }
  isImageBitmapSupported() {
    return this._isImageBitmapSupported !== void 0 ? this._isImageBitmapSupported : (this._isImageBitmapSupported = new Promise((e) => {
      const { worker: r } = new s();
      r.addEventListener("message", (t) => {
        r.terminate(), s.revokeObjectURL(), e(t.data);
      });
    }), this._isImageBitmapSupported);
  }
  loadImageBitmap(e, r) {
    var t;
    return this._run("loadImageBitmap", [e, (t = r == null ? void 0 : r.data) == null ? void 0 : t.alphaMode]);
  }
  async _initWorkers() {
    this._initialized || (this._initialized = !0);
  }
  _getWorker() {
    i === void 0 && (i = navigator.hardwareConcurrency || 4);
    let e = this._workerPool.pop();
    return !e && this._createdWorkers < i && (this._createdWorkers++, e = new u().worker, e.addEventListener("message", (r) => {
      this._complete(r.data), this._returnWorker(r.target), this._next();
    })), e;
  }
  _returnWorker(e) {
    this._workerPool.push(e);
  }
  _complete(e) {
    e.error !== void 0 ? this._resolveHash[e.uuid].reject(e.error) : this._resolveHash[e.uuid].resolve(e.data), this._resolveHash[e.uuid] = null;
  }
  async _run(e, r) {
    await this._initWorkers();
    const t = new Promise((a, n) => {
      this._queue.push({ id: e, arguments: r, resolve: a, reject: n });
    });
    return this._next(), t;
  }
  _next() {
    if (!this._queue.length)
      return;
    const e = this._getWorker();
    if (!e)
      return;
    const r = this._queue.pop(), t = r.id;
    this._resolveHash[o] = { resolve: r.resolve, reject: r.reject }, e.postMessage({
      data: r.arguments,
      uuid: o++,
      id: t
    });
  }
}
const d = new h();
export {
  d as WorkerManager
};
//# sourceMappingURL=index371.js.map

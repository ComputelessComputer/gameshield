import { DOMAdapter as n } from "./index365.js";
import { nextPow2 as c } from "./index403.js";
class l {
  constructor(a) {
    this._canvasPool = /* @__PURE__ */ Object.create(null), this.canvasOptions = a || {}, this.enableFullScreen = !1;
  }
  /**
   * Creates texture with params that were specified in pool constructor.
   * @param pixelWidth - Width of texture in pixels.
   * @param pixelHeight - Height of texture in pixels.
   */
  _createCanvasAndContext(a, t) {
    const s = n.get().createCanvas();
    s.width = a, s.height = t;
    const o = s.getContext("2d");
    return { canvas: s, context: o };
  }
  /**
   * Gets a Power-of-Two render texture or fullScreen texture
   * @param minWidth - The minimum width of the render texture.
   * @param minHeight - The minimum height of the render texture.
   * @param resolution - The resolution of the render texture.
   * @returns The new render texture.
   */
  getOptimalCanvasAndContext(a, t, s = 1) {
    a = Math.ceil(a * s - 1e-6), t = Math.ceil(t * s - 1e-6), a = c(a), t = c(t);
    const o = (a << 17) + (t << 1);
    this._canvasPool[o] || (this._canvasPool[o] = []);
    let e = this._canvasPool[o].pop();
    return e || (e = this._createCanvasAndContext(a, t)), e;
  }
  /**
   * Place a render texture back into the pool.
   * @param canvasAndContext
   */
  returnCanvasAndContext(a) {
    const t = a.canvas, { width: s, height: o } = t, e = (s << 17) + (o << 1);
    a.context.clearRect(0, 0, s, o), this._canvasPool[e].push(a);
  }
  clear() {
    this._canvasPool = {};
  }
}
const p = new l();
export {
  p as CanvasPool,
  l as CanvasPoolClass
};
//# sourceMappingURL=index473.js.map

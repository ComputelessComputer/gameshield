import { BaseImageResource as a } from "./index236.js";
class o extends a {
  /**
   * @param source - Canvas element to use
   */
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(e) {
    super(e);
  }
  /**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @returns {boolean} `true` if source is HTMLCanvasElement or OffscreenCanvas
   */
  static test(e) {
    const { OffscreenCanvas: s } = globalThis;
    return s && e instanceof s ? !0 : globalThis.HTMLCanvasElement && e instanceof HTMLCanvasElement;
  }
}
export {
  o as CanvasResource
};
//# sourceMappingURL=index230.js.map

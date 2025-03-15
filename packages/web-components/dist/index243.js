import { BaseImageResource as o } from "./index246.js";
class t extends o {
  /**
   * @param source - Image element to use
   */
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(e) {
    super(e);
  }
  /**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @returns {boolean} `true` if source is an VideoFrame
   */
  static test(e) {
    return !!globalThis.VideoFrame && e instanceof globalThis.VideoFrame;
  }
}
export {
  t as VideoFrameResource
};
//# sourceMappingURL=index243.js.map

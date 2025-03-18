import { ALPHA_MODES as o } from "./index164.js";
import { Resource as A } from "./index227.js";
class p extends A {
  /**
   * @param source - Source buffer
   * @param options - Options
   * @param {number} options.width - Width of the texture
   * @param {number} options.height - Height of the texture
   * @param {1|2|4|8} [options.unpackAlignment=4] - The alignment of the pixel rows.
   */
  constructor(t, i) {
    const { width: n, height: a } = i || {};
    if (!n || !a)
      throw new Error("BufferResource width or height invalid");
    super(n, a), this.data = t, this.unpackAlignment = i.unpackAlignment ?? 4;
  }
  /**
   * Upload the texture to the GPU.
   * @param renderer - Upload to the renderer
   * @param baseTexture - Reference to parent texture
   * @param glTexture - glTexture
   * @returns - true is success
   */
  upload(t, i, n) {
    const a = t.gl;
    a.pixelStorei(a.UNPACK_ALIGNMENT, this.unpackAlignment), a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL, i.alphaMode === o.UNPACK);
    const r = i.realWidth, h = i.realHeight;
    return n.width === r && n.height === h ? a.texSubImage2D(
      i.target,
      0,
      0,
      0,
      r,
      h,
      i.format,
      n.type,
      this.data
    ) : (n.width = r, n.height = h, a.texImage2D(
      i.target,
      0,
      n.internalFormat,
      r,
      h,
      0,
      i.format,
      n.type,
      this.data
    )), !0;
  }
  /** Destroy and don't use after this. */
  dispose() {
    this.data = null;
  }
  /**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @returns {boolean} `true` if buffer source
   */
  static test(t) {
    return t === null || t instanceof Int8Array || t instanceof Uint8Array || t instanceof Uint8ClampedArray || t instanceof Int16Array || t instanceof Uint16Array || t instanceof Int32Array || t instanceof Uint32Array || t instanceof Float32Array;
  }
}
export {
  p as BufferResource
};
//# sourceMappingURL=index166.js.map

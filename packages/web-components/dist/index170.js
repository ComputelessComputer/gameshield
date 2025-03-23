import { INTERNAL_FORMAT_TO_BYTES_PER_PIXEL as d } from "./index162.js";
import { BlobResource as g } from "./index172.js";
class c extends g {
  /**
   * @param source - the buffer/URL holding the compressed texture data
   * @param options
   * @param {PIXI.INTERNAL_FORMATS} options.format - the compression format
   * @param {number} options.width - the image width in pixels.
   * @param {number} options.height - the image height in pixels.
   * @param {number} [options.level=1] - the mipmap levels stored in the compressed texture, including level 0.
   * @param {number} [options.levelBuffers] - the buffers for each mipmap level. `CompressedTextureResource` can allows you
   *      to pass `null` for `source`, for cases where each level is stored in non-contiguous memory.
   */
  constructor(e, t) {
    super(e, t), this.format = t.format, this.levels = t.levels || 1, this._width = t.width, this._height = t.height, this._extension = c._formatToExtension(this.format), (t.levelBuffers || this.buffer) && (this._levelBuffers = t.levelBuffers || c._createLevelBuffers(
      e instanceof Uint8Array ? e : this.buffer.uint8View,
      this.format,
      this.levels,
      4,
      4,
      // PVRTC has 8x4 blocks in 2bpp mode
      this.width,
      this.height
    ));
  }
  /**
   * @override
   * @param renderer - A reference to the current renderer
   * @param _texture - the texture
   * @param _glTexture - texture instance for this webgl context
   */
  upload(e, t, l) {
    const i = e.gl;
    if (!e.context.extensions[this._extension])
      throw new Error(`${this._extension} textures are not supported on the current machine`);
    if (!this._levelBuffers)
      return !1;
    i.pixelStorei(i.UNPACK_ALIGNMENT, 4);
    for (let r = 0, B = this.levels; r < B; r++) {
      const { levelID: a, levelWidth: f, levelHeight: n, levelBuffer: s } = this._levelBuffers[r];
      i.compressedTexImage2D(i.TEXTURE_2D, a, this.format, f, n, 0, s);
    }
    return !0;
  }
  /** @protected */
  onBlobLoaded() {
    this._levelBuffers = c._createLevelBuffers(
      this.buffer.uint8View,
      this.format,
      this.levels,
      4,
      4,
      // PVRTC has 8x4 blocks in 2bpp mode
      this.width,
      this.height
    );
  }
  /**
   * Returns the key (to ContextSystem#extensions) for the WebGL extension supporting the compression format
   * @private
   * @param format - the compression format to get the extension for.
   */
  static _formatToExtension(e) {
    if (e >= 33776 && e <= 33779)
      return "s3tc";
    if (e >= 35916 && e <= 35919)
      return "s3tc_sRGB";
    if (e >= 37488 && e <= 37497)
      return "etc";
    if (e >= 35840 && e <= 35843)
      return "pvrtc";
    if (e === 36196)
      return "etc1";
    if (e === 35986 || e === 35987 || e === 34798)
      return "atc";
    if (e >= 36492 && e <= 36495)
      return "bptc";
    if (e === 37808)
      return "astc";
    throw new Error(`Invalid (compressed) texture format given: ${e}`);
  }
  /**
   * Pre-creates buffer views for each mipmap level
   * @private
   * @param buffer -
   * @param format - compression formats
   * @param levels - mipmap levels
   * @param blockWidth -
   * @param blockHeight -
   * @param imageWidth - width of the image in pixels
   * @param imageHeight - height of the image in pixels
   */
  static _createLevelBuffers(e, t, l, i, r, B, a) {
    const f = new Array(l);
    let n = e.byteOffset, s = B, h = a, u = s + i - 1 & ~(i - 1), v = h + r - 1 & ~(r - 1), x = u * v * d[t];
    for (let _ = 0; _ < l; _++)
      f[_] = {
        levelID: _,
        levelWidth: l > 1 ? s : u,
        levelHeight: l > 1 ? h : v,
        levelBuffer: new Uint8Array(e.buffer, n, x)
      }, n += x, s = s >> 1 || 1, h = h >> 1 || 1, u = s + i - 1 & ~(i - 1), v = h + r - 1 & ~(r - 1), x = u * v * d[t];
    return f;
  }
}
export {
  c as CompressedTextureResource
};
//# sourceMappingURL=index170.js.map

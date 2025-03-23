import { TextureSource as o } from "./index474.js";
import { Texture as i } from "./index360.js";
class r extends i {
  static create(e) {
    return new r({
      source: new o(e)
    });
  }
  /**
   * Resizes the render texture.
   * @param width - The new width of the render texture.
   * @param height - The new height of the render texture.
   * @param resolution - The new resolution of the render texture.
   * @returns This texture.
   */
  resize(e, t, s) {
    return this.source.resize(e, t, s), this;
  }
}
export {
  r as RenderTexture
};
//# sourceMappingURL=index150.js.map

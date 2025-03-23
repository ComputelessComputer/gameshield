import { DOMAdapter as h } from "./index365.js";
import { ExtensionType as r } from "./index153.js";
import { TextureSource as a } from "./index474.js";
class u extends a {
  constructor(e) {
    e.resource || (e.resource = h.get().createCanvas()), e.width || (e.width = e.resource.width, e.autoDensity || (e.width /= e.resolution)), e.height || (e.height = e.resource.height, e.autoDensity || (e.height /= e.resolution)), super(e), this.uploadMethodId = "image", this.autoDensity = e.autoDensity, this.resizeCanvas(), this.transparent = !!e.transparent;
  }
  resizeCanvas() {
    this.autoDensity && (this.resource.style.width = `${this.width}px`, this.resource.style.height = `${this.height}px`), (this.resource.width !== this.pixelWidth || this.resource.height !== this.pixelHeight) && (this.resource.width = this.pixelWidth, this.resource.height = this.pixelHeight);
  }
  resize(e = this.width, i = this.height, s = this._resolution) {
    const t = super.resize(e, i, s);
    return t && this.resizeCanvas(), t;
  }
  static test(e) {
    return globalThis.HTMLCanvasElement && e instanceof HTMLCanvasElement || globalThis.OffscreenCanvas && e instanceof OffscreenCanvas;
  }
  /**
   * Returns the 2D rendering context for the canvas.
   * Caches the context after creating it.
   * @returns The 2D rendering context of the canvas.
   */
  get context2D() {
    return this._context2D || (this._context2D = this.resource.getContext("2d"));
  }
}
u.extension = r.TextureSource;
export {
  u as CanvasSource
};
//# sourceMappingURL=index324.js.map

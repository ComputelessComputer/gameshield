import { ExtensionType as m, extensions as x } from "./index158.js";
import "./index22.js";
import "./index23.js";
import "./index24.js";
import { Rectangle as u } from "./index25.js";
import "./index26.js";
import "./index27.js";
import { Matrix as d } from "./index28.js";
import "./index29.js";
import "./index30.js";
import { Transform as f } from "./index31.js";
import { RenderTexture as T } from "./index134.js";
const g = new f(), s = new u();
class a {
  constructor(t) {
    this.renderer = t, this._tempMatrix = new d();
  }
  /**
   * A Useful function that returns a texture of the display object that can then be used to create sprites
   * This can be quite useful if your displayObject is complicated and needs to be reused multiple times.
   * @param displayObject - The displayObject the object will be generated from.
   * @param {IGenerateTextureOptions} options - Generate texture options.
   * @param {PIXI.Rectangle} options.region - The region of the displayObject, that shall be rendered,
   *        if no region is specified, defaults to the local bounds of the displayObject.
   * @param {number} [options.resolution] - If not given, the renderer's resolution is used.
   * @param {PIXI.MSAA_QUALITY} [options.multisample] - If not given, the renderer's multisample is used.
   * @returns a shiny new texture of the display object passed in
   */
  generateTexture(t, p) {
    const { region: o, ...e } = p || {}, r = (o == null ? void 0 : o.copyTo(s)) || t.getLocalBounds(s, !0), n = e.resolution || this.renderer.resolution;
    r.width = Math.max(r.width, 1 / n), r.height = Math.max(r.height, 1 / n), e.width = r.width, e.height = r.height, e.resolution = n, e.multisample ?? (e.multisample = this.renderer.multisample);
    const i = T.create(e);
    this._tempMatrix.tx = -r.x, this._tempMatrix.ty = -r.y;
    const h = t.transform;
    return t.transform = g, this.renderer.render(t, {
      renderTexture: i,
      transform: this._tempMatrix,
      skipUpdateTransform: !!t.parent,
      blit: !0
    }), t.transform = h, i;
  }
  destroy() {
  }
}
a.extension = {
  type: [
    m.RendererSystem,
    m.CanvasRendererSystem
  ],
  name: "textureGenerator"
};
x.add(a);
export {
  a as GenerateTextureSystem
};
//# sourceMappingURL=index63.js.map

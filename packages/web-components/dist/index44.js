import { Color as s } from "./index21.js";
import { ExtensionType as a, extensions as c } from "./index158.js";
class r {
  constructor() {
    this.clearBeforeRender = !0, this._backgroundColor = new s(0), this.alpha = 1;
  }
  /**
   * initiates the background system
   * @param {PIXI.IRendererOptions} options - the options for the background colors
   */
  init(o) {
    this.clearBeforeRender = o.clearBeforeRender;
    const { backgroundColor: t, background: n, backgroundAlpha: l } = o, e = n ?? t;
    e !== void 0 && (this.color = e), this.alpha = l;
  }
  /**
   * The background color to fill if not transparent.
   * @member {PIXI.ColorSource}
   */
  get color() {
    return this._backgroundColor.value;
  }
  set color(o) {
    this._backgroundColor.setValue(o);
  }
  /**
   * The background color alpha. Setting this to 0 will make the canvas transparent.
   * @member {number}
   */
  get alpha() {
    return this._backgroundColor.alpha;
  }
  set alpha(o) {
    this._backgroundColor.setAlpha(o);
  }
  /** The background color object. */
  get backgroundColor() {
    return this._backgroundColor;
  }
  destroy() {
  }
}
r.defaultOptions = {
  /**
   * {@link PIXI.IRendererOptions.backgroundAlpha}
   * @default 1
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  backgroundAlpha: 1,
  /**
   * {@link PIXI.IRendererOptions.backgroundColor}
   * @default 0x000000
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  backgroundColor: 0,
  /**
   * {@link PIXI.IRendererOptions.clearBeforeRender}
   * @default true
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  clearBeforeRender: !0
}, /** @ignore */
r.extension = {
  type: [
    a.RendererSystem,
    a.CanvasRendererSystem
  ],
  name: "background"
};
c.add(r);
export {
  r as BackgroundSystem
};
//# sourceMappingURL=index44.js.map

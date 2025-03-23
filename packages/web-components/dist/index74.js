import { ExtensionType as n, extensions as o } from "./index158.js";
import "./index22.js";
import "./index23.js";
import "./index24.js";
import { Rectangle as m } from "./index25.js";
import "./index26.js";
import "./index27.js";
import "./index28.js";
import "./index29.js";
import "./index30.js";
import "./index31.js";
import { settings as h } from "./index163.js";
import "./index33.js";
class r {
  constructor(e) {
    this.renderer = e;
  }
  /**
   * initiates the view system
   * @param {PIXI.ViewOptions} options - the options for the view
   */
  init(e) {
    this.screen = new m(0, 0, e.width, e.height), this.element = e.view || h.ADAPTER.createCanvas(), this.resolution = e.resolution || h.RESOLUTION, this.autoDensity = !!e.autoDensity;
  }
  /**
   * Resizes the screen and canvas to the specified dimensions.
   * @param desiredScreenWidth - The new width of the screen.
   * @param desiredScreenHeight - The new height of the screen.
   */
  resizeView(e, t) {
    this.element.width = Math.round(e * this.resolution), this.element.height = Math.round(t * this.resolution);
    const i = this.element.width / this.resolution, s = this.element.height / this.resolution;
    this.screen.width = i, this.screen.height = s, this.autoDensity && (this.element.style.width = `${i}px`, this.element.style.height = `${s}px`), this.renderer.emit("resize", i, s), this.renderer.runners.resize.emit(this.screen.width, this.screen.height);
  }
  /**
   * Destroys this System and optionally removes the canvas from the dom.
   * @param {boolean} [removeView=false] - Whether to remove the canvas from the DOM.
   */
  destroy(e) {
    var t;
    e && ((t = this.element.parentNode) == null || t.removeChild(this.element)), this.renderer = null, this.element = null, this.screen = null;
  }
}
r.defaultOptions = {
  /**
   * {@link PIXI.IRendererOptions.width}
   * @default 800
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  width: 800,
  /**
   * {@link PIXI.IRendererOptions.height}
   * @default 600
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  height: 600,
  /**
   * {@link PIXI.IRendererOptions.resolution}
   * @type {number}
   * @default PIXI.settings.RESOLUTION
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  resolution: void 0,
  /**
   * {@link PIXI.IRendererOptions.autoDensity}
   * @default false
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  autoDensity: !1
}, /** @ignore */
r.extension = {
  type: [
    n.RendererSystem,
    n.CanvasRendererSystem
  ],
  name: "_view"
};
o.add(r);
export {
  r as ViewSystem
};
//# sourceMappingURL=index74.js.map

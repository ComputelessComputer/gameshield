import { ExtensionType as s, extensions as n } from "./index158.js";
class r {
  constructor(t) {
    this.renderer = t;
  }
  /**
   * It all starts here! This initiates every system, passing in the options for any system by name.
   * @param options - the config for the renderer and all its systems
   */
  run(t) {
    const { renderer: e } = this;
    e.runners.init.emit(e.options), t.hello && console.log(`PixiJS 7.4.3 - ${e.rendererLogId} - https://pixijs.com`), e.resize(e.screen.width, e.screen.height);
  }
  destroy() {
  }
}
r.defaultOptions = {
  /**
   * {@link PIXI.IRendererOptions.hello}
   * @default false
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  hello: !1
}, /** @ignore */
r.extension = {
  type: [
    s.RendererSystem,
    s.CanvasRendererSystem
  ],
  name: "startup"
};
n.add(r);
export {
  r as StartupSystem
};
//# sourceMappingURL=index68.js.map

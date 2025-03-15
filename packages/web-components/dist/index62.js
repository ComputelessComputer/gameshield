import { ExtensionType as n, extensions as s } from "./index140.js";
import "./index40.js";
import "./index36.js";
import "./index41.js";
import "./index42.js";
import "./index43.js";
import { deprecation as r } from "./index133.js";
import "./index24.js";
import "./index44.js";
import "./index45.js";
class i {
  constructor(e) {
    this.renderer = e, this.plugins = {}, Object.defineProperties(this.plugins, {
      extract: {
        enumerable: !1,
        get() {
          return r("7.0.0", "renderer.plugins.extract has moved to renderer.extract"), e.extract;
        }
      },
      prepare: {
        enumerable: !1,
        get() {
          return r("7.0.0", "renderer.plugins.prepare has moved to renderer.prepare"), e.prepare;
        }
      },
      interaction: {
        enumerable: !1,
        get() {
          return r("7.0.0", "renderer.plugins.interaction has been deprecated, use renderer.events"), e.events;
        }
      }
    });
  }
  /**
   * Initialize the plugins.
   * @protected
   */
  init() {
    const e = this.rendererPlugins;
    for (const t in e)
      this.plugins[t] = new e[t](this.renderer);
  }
  destroy() {
    for (const e in this.plugins)
      this.plugins[e].destroy(), this.plugins[e] = null;
  }
}
i.extension = {
  type: [
    n.RendererSystem,
    n.CanvasRendererSystem
  ],
  name: "_plugin"
};
s.add(i);
export {
  i as PluginSystem
};
//# sourceMappingURL=index62.js.map

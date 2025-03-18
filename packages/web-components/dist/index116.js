import "./index23.js";
import "./index24.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import "./index28.js";
import "./index29.js";
import "./index30.js";
import "./index31.js";
import "./index32.js";
import "./index33.js";
import "./index34.js";
import "./index35.js";
import "./index36.js";
import "./index37.js";
import { UPDATE_PRIORITY as p } from "./index277.js";
import { Ticker as s } from "./index38.js";
import "./index39.js";
import "./index40.js";
import "./index41.js";
import "./index42.js";
import "./index43.js";
import "./index44.js";
import "./index45.js";
import "./index46.js";
import "./index47.js";
import "./index48.js";
import "./index49.js";
import "./index50.js";
import "./index51.js";
import "./index52.js";
import "./index53.js";
import { BaseTexture as a } from "./index54.js";
import "./index55.js";
import "./index56.js";
import "./index57.js";
import "./index58.js";
import "./index59.js";
import "./index60.js";
import "./index61.js";
import "./index62.js";
import "./index63.js";
import "./index64.js";
import "./index65.js";
import "./index66.js";
import { Texture as l } from "./index131.js";
import "./index68.js";
import "./index69.js";
import "./index70.js";
import "./index71.js";
import "./index72.js";
import "./index73.js";
import "./index74.js";
import "./index75.js";
import "./index76.js";
import "./index77.js";
import "./index78.js";
import "./index67.js";
import "./index79.js";
import "./index80.js";
import "./index81.js";
import "./index102.js";
import { Container as c } from "./index103.js";
import "./index104.js";
import { Text as u } from "./index121.js";
import { TextMetrics as f } from "./index122.js";
import { TextStyle as h } from "./index123.js";
import { CountLimiter as k } from "./index278.js";
function x(e, t) {
  var r;
  let i = !1;
  if ((r = e == null ? void 0 : e._textures) != null && r.length) {
    for (let o = 0; o < e._textures.length; o++)
      if (e._textures[o] instanceof l) {
        const n = e._textures[o].baseTexture;
        t.includes(n) || (t.push(n), i = !0);
      }
  }
  return i;
}
function T(e, t) {
  if (e.baseTexture instanceof a) {
    const i = e.baseTexture;
    return t.includes(i) || t.push(i), !0;
  }
  return !1;
}
function g(e, t) {
  if (e._texture && e._texture instanceof l) {
    const i = e._texture.baseTexture;
    return t.includes(i) || t.push(i), !0;
  }
  return !1;
}
function H(e, t) {
  return t instanceof u ? (t.updateText(!0), !0) : !1;
}
function _(e, t) {
  if (t instanceof h) {
    const i = t.toFontString();
    return f.measureFont(i), !0;
  }
  return !1;
}
function y(e, t) {
  if (e instanceof u) {
    t.includes(e.style) || t.push(e.style), t.includes(e) || t.push(e);
    const i = e._texture.baseTexture;
    return t.includes(i) || t.push(i), !0;
  }
  return !1;
}
function F(e, t) {
  return e instanceof h ? (t.includes(e) || t.push(e), !0) : !1;
}
const m = class d {
  /**
   * @param {PIXI.IRenderer} renderer - A reference to the current renderer
   */
  constructor(t) {
    this.limiter = new k(d.uploadsPerFrame), this.renderer = t, this.uploadHookHelper = null, this.queue = [], this.addHooks = [], this.uploadHooks = [], this.completes = [], this.ticking = !1, this.delayedTick = () => {
      this.queue && this.prepareItems();
    }, this.registerFindHook(y), this.registerFindHook(F), this.registerFindHook(x), this.registerFindHook(T), this.registerFindHook(g), this.registerUploadHook(H), this.registerUploadHook(_);
  }
  /**
   * Upload all the textures and graphics to the GPU.
   * @method PIXI.BasePrepare#upload
   * @param {PIXI.DisplayObject|PIXI.Container|PIXI.BaseTexture|PIXI.Texture|PIXI.Graphics|PIXI.Text} [item] -
   *        Container or display object to search for items to upload or the items to upload themselves,
   *        or optionally ommitted, if items have been added using {@link PIXI.BasePrepare#add `prepare.add`}.
   */
  upload(t) {
    return new Promise((i) => {
      t && this.add(t), this.queue.length ? (this.completes.push(i), this.ticking || (this.ticking = !0, s.system.addOnce(this.tick, this, p.UTILITY))) : i();
    });
  }
  /**
   * Handle tick update
   * @private
   */
  tick() {
    setTimeout(this.delayedTick, 0);
  }
  /**
   * Actually prepare items. This is handled outside of the tick because it will take a while
   * and we do NOT want to block the current animation frame from rendering.
   * @private
   */
  prepareItems() {
    for (this.limiter.beginFrame(); this.queue.length && this.limiter.allowedToUpload(); ) {
      const t = this.queue[0];
      let i = !1;
      if (t && !t._destroyed) {
        for (let r = 0, o = this.uploadHooks.length; r < o; r++)
          if (this.uploadHooks[r](this.uploadHookHelper, t)) {
            this.queue.shift(), i = !0;
            break;
          }
      }
      i || this.queue.shift();
    }
    if (this.queue.length)
      s.system.addOnce(this.tick, this, p.UTILITY);
    else {
      this.ticking = !1;
      const t = this.completes.slice(0);
      this.completes.length = 0;
      for (let i = 0, r = t.length; i < r; i++)
        t[i]();
    }
  }
  /**
   * Adds hooks for finding items.
   * @param {Function} addHook - Function call that takes two parameters: `item:*, queue:Array`
   *          function must return `true` if it was able to add item to the queue.
   * @returns Instance of plugin for chaining.
   */
  registerFindHook(t) {
    return t && this.addHooks.push(t), this;
  }
  /**
   * Adds hooks for uploading items.
   * @param {Function} uploadHook - Function call that takes two parameters: `prepare:CanvasPrepare, item:*` and
   *          function must return `true` if it was able to handle upload of item.
   * @returns Instance of plugin for chaining.
   */
  registerUploadHook(t) {
    return t && this.uploadHooks.push(t), this;
  }
  /**
   * Manually add an item to the uploading queue.
   * @param {PIXI.DisplayObject|PIXI.Container|PIXI.BaseTexture|PIXI.Texture|PIXI.Graphics|PIXI.Text|*} item - Object to
   *        add to the queue
   * @returns Instance of plugin for chaining.
   */
  add(t) {
    for (let i = 0, r = this.addHooks.length; i < r && !this.addHooks[i](t, this.queue); i++)
      ;
    if (t instanceof c)
      for (let i = t.children.length - 1; i >= 0; i--)
        this.add(t.children[i]);
    return this;
  }
  /** Destroys the plugin, don't use after this. */
  destroy() {
    this.ticking && s.system.remove(this.tick, this), this.ticking = !1, this.addHooks = null, this.uploadHooks = null, this.renderer = null, this.completes = null, this.queue = null, this.limiter = null, this.uploadHookHelper = null;
  }
};
m.uploadsPerFrame = 4;
let At = m;
export {
  At as BasePrepare
};
//# sourceMappingURL=index116.js.map

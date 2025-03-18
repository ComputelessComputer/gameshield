import { GC_MODES as h } from "./index146.js";
import { ExtensionType as d, extensions as i } from "./index140.js";
const s = class u {
  /** @param renderer - The renderer this System works for. */
  constructor(r) {
    this.renderer = r, this.count = 0, this.checkCount = 0, this.maxIdle = u.defaultMaxIdle, this.checkCountMax = u.defaultCheckCountMax, this.mode = u.defaultMode;
  }
  /**
   * Checks to see when the last time a texture was used.
   * If the texture has not been used for a specified amount of time, it will be removed from the GPU.
   */
  postrender() {
    this.renderer.objectRenderer.renderingToScreen && (this.count++, this.mode !== h.MANUAL && (this.checkCount++, this.checkCount > this.checkCountMax && (this.checkCount = 0, this.run())));
  }
  /**
   * Checks to see when the last time a texture was used.
   * If the texture has not been used for a specified amount of time, it will be removed from the GPU.
   */
  run() {
    const r = this.renderer.texture, t = r.managedTextures;
    let o = !1;
    for (let e = 0; e < t.length; e++) {
      const n = t[e];
      n.resource && this.count - n.touched > this.maxIdle && (r.destroyTexture(n, !0), t[e] = null, o = !0);
    }
    if (o) {
      let e = 0;
      for (let n = 0; n < t.length; n++)
        t[n] !== null && (t[e++] = t[n]);
      t.length = e;
    }
  }
  /**
   * Removes all the textures within the specified displayObject and its children from the GPU.
   * @param {PIXI.DisplayObject} displayObject - the displayObject to remove the textures from.
   */
  unload(r) {
    const t = this.renderer.texture, o = r._texture;
    o && !o.framebuffer && t.destroyTexture(o);
    for (let e = r.children.length - 1; e >= 0; e--)
      this.unload(r.children[e]);
  }
  destroy() {
    this.renderer = null;
  }
};
s.defaultMode = h.AUTO, /**
* Default maximum idle frames before a texture is destroyed by garbage collection.
* @static
* @default 3600
* @see PIXI.TextureGCSystem#maxIdle
*/
s.defaultMaxIdle = 60 * 60, /**
* Default frames between two garbage collections.
* @static
* @default 600
* @see PIXI.TextureGCSystem#checkCountMax
*/
s.defaultCheckCountMax = 60 * 10, /** @ignore */
s.extension = {
  type: d.RendererSystem,
  name: "textureGC"
};
let l = s;
i.add(l);
export {
  l as TextureGCSystem
};
//# sourceMappingURL=index74.js.map

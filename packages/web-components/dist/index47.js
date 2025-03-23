import { ExtensionType as b, extensions as l } from "./index158.js";
import { ObjectRenderer as m } from "./index201.js";
class a {
  /**
   * @param renderer - The renderer this System works for.
   */
  constructor(e) {
    this.renderer = e, this.emptyRenderer = new m(e), this.currentRenderer = this.emptyRenderer;
  }
  /**
   * Changes the current renderer to the one given in parameter
   * @param objectRenderer - The object renderer to use.
   */
  setObjectRenderer(e) {
    this.currentRenderer !== e && (this.currentRenderer.stop(), this.currentRenderer = e, this.currentRenderer.start());
  }
  /**
   * This should be called if you wish to do some custom rendering
   * It will basically render anything that may be batched up such as sprites
   */
  flush() {
    this.setObjectRenderer(this.emptyRenderer);
  }
  /** Reset the system to an empty renderer */
  reset() {
    this.setObjectRenderer(this.emptyRenderer);
  }
  /**
   * Handy function for batch renderers: copies bound textures in first maxTextures locations to array
   * sets actual _batchLocation for them
   * @param arr - arr copy destination
   * @param maxTextures - number of copied elements
   */
  copyBoundTextures(e, n) {
    const { boundTextures: i } = this.renderer.texture;
    for (let t = n - 1; t >= 0; --t)
      e[t] = i[t] || null, e[t] && (e[t]._batchLocation = t);
  }
  /**
   * Assigns batch locations to textures in array based on boundTextures state.
   * All textures in texArray should have `_batchEnabled = _batchId`,
   * and their count should be less than `maxTextures`.
   * @param texArray - textures to bound
   * @param boundTextures - current state of bound textures
   * @param batchId - marker for _batchEnabled param of textures in texArray
   * @param maxTextures - number of texture locations to manipulate
   */
  boundArray(e, n, i, t) {
    const { elements: u, ids: h, count: R } = e;
    let r = 0;
    for (let s = 0; s < R; s++) {
      const o = u[s], c = o._batchLocation;
      if (c >= 0 && c < t && n[c] === o) {
        h[s] = c;
        continue;
      }
      for (; r < t; ) {
        const d = n[r];
        if (d && d._batchEnabled === i && d._batchLocation === r) {
          r++;
          continue;
        }
        h[s] = r, o._batchLocation = r, n[r] = o;
        break;
      }
    }
  }
  /**
   * @ignore
   */
  destroy() {
    this.renderer = null;
  }
}
a.extension = {
  type: b.RendererSystem,
  name: "batch"
};
l.add(a);
export {
  a as BatchSystem
};
//# sourceMappingURL=index47.js.map

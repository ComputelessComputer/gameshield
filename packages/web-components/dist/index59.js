import { MASK_TYPES as r } from "./index146.js";
import { ExtensionType as l, extensions as h } from "./index140.js";
import { SpriteMaskFilter as k } from "./index189.js";
import { MaskData as p } from "./index202.js";
class i {
  /**
   * @param renderer - The renderer this System works for.
   */
  constructor(e) {
    this.renderer = e, this.enableScissor = !0, this.alphaMaskPool = [], this.maskDataPool = [], this.maskStack = [], this.alphaMaskIndex = 0;
  }
  /**
   * Changes the mask stack that is used by this System.
   * @param maskStack - The mask stack
   */
  setMaskStack(e) {
    this.maskStack = e, this.renderer.scissor.setMaskStack(e), this.renderer.stencil.setMaskStack(e);
  }
  /**
   * Enables the mask and appends it to the current mask stack.
   *
   * NOTE: The batch renderer should be flushed beforehand to prevent pending renders from being masked.
   * @param {PIXI.DisplayObject} target - Display Object to push the mask to
   * @param {PIXI.MaskData|PIXI.Sprite|PIXI.Graphics|PIXI.DisplayObject} maskDataOrTarget - The masking data.
   */
  push(e, t) {
    let s = t;
    if (!s.isMaskData) {
      const o = this.maskDataPool.pop() || new p();
      o.pooled = !0, o.maskObject = t, s = o;
    }
    const a = this.maskStack.length !== 0 ? this.maskStack[this.maskStack.length - 1] : null;
    if (s.copyCountersOrReset(a), s._colorMask = a ? a._colorMask : 15, s.autoDetect && this.detect(s), s._target = e, s.type !== r.SPRITE && this.maskStack.push(s), s.enabled)
      switch (s.type) {
        case r.SCISSOR:
          this.renderer.scissor.push(s);
          break;
        case r.STENCIL:
          this.renderer.stencil.push(s);
          break;
        case r.SPRITE:
          s.copyCountersOrReset(null), this.pushSpriteMask(s);
          break;
        case r.COLOR:
          this.pushColorMask(s);
          break;
      }
    s.type === r.SPRITE && this.maskStack.push(s);
  }
  /**
   * Removes the last mask from the mask stack and doesn't return it.
   *
   * NOTE: The batch renderer should be flushed beforehand to render the masked contents before the mask is removed.
   * @param {PIXI.IMaskTarget} target - Display Object to pop the mask from
   */
  pop(e) {
    const t = this.maskStack.pop();
    if (!(!t || t._target !== e)) {
      if (t.enabled)
        switch (t.type) {
          case r.SCISSOR:
            this.renderer.scissor.pop(t);
            break;
          case r.STENCIL:
            this.renderer.stencil.pop(t.maskObject);
            break;
          case r.SPRITE:
            this.popSpriteMask(t);
            break;
          case r.COLOR:
            this.popColorMask(t);
            break;
        }
      if (t.reset(), t.pooled && this.maskDataPool.push(t), this.maskStack.length !== 0) {
        const s = this.maskStack[this.maskStack.length - 1];
        s.type === r.SPRITE && s._filters && (s._filters[0].maskSprite = s.maskObject);
      }
    }
  }
  /**
   * Sets type of MaskData based on its maskObject.
   * @param maskData
   */
  detect(e) {
    const t = e.maskObject;
    t ? t.isSprite ? e.type = r.SPRITE : this.enableScissor && this.renderer.scissor.testScissor(e) ? e.type = r.SCISSOR : e.type = r.STENCIL : e.type = r.COLOR;
  }
  /**
   * Applies the Mask and adds it to the current filter stack.
   * @param maskData - Sprite to be used as the mask.
   */
  pushSpriteMask(e) {
    const { maskObject: t } = e, s = e._target;
    let a = e._filters;
    a || (a = this.alphaMaskPool[this.alphaMaskIndex], a || (a = this.alphaMaskPool[this.alphaMaskIndex] = [new k()])), a[0].resolution = e.resolution, a[0].multisample = e.multisample, a[0].maskSprite = t;
    const o = s.filterArea;
    s.filterArea = t.getBounds(!0), this.renderer.filter.push(s, a), s.filterArea = o, e._filters || this.alphaMaskIndex++;
  }
  /**
   * Removes the last filter from the filter stack and doesn't return it.
   * @param maskData - Sprite to be used as the mask.
   */
  popSpriteMask(e) {
    this.renderer.filter.pop(), e._filters ? e._filters[0].maskSprite = null : (this.alphaMaskIndex--, this.alphaMaskPool[this.alphaMaskIndex][0].maskSprite = null);
  }
  /**
   * Pushes the color mask.
   * @param maskData - The mask data
   */
  pushColorMask(e) {
    const t = e._colorMask, s = e._colorMask = t & e.colorMask;
    s !== t && this.renderer.gl.colorMask(
      (s & 1) !== 0,
      (s & 2) !== 0,
      (s & 4) !== 0,
      (s & 8) !== 0
    );
  }
  /**
   * Pops the color mask.
   * @param maskData - The mask data
   */
  popColorMask(e) {
    const t = e._colorMask, s = this.maskStack.length > 0 ? this.maskStack[this.maskStack.length - 1]._colorMask : 15;
    s !== t && this.renderer.gl.colorMask(
      (s & 1) !== 0,
      (s & 2) !== 0,
      (s & 4) !== 0,
      (s & 8) !== 0
    );
  }
  destroy() {
    this.renderer = null;
  }
}
i.extension = {
  type: l.RendererSystem,
  name: "mask"
};
h.add(i);
export {
  i as MaskSystem
};
//# sourceMappingURL=index59.js.map

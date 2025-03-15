import "./index23.js";
import "./index24.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import { Rectangle as C } from "./index28.js";
import "./index29.js";
import "./index30.js";
import { Matrix as A } from "./index31.js";
import "./index32.js";
import "./index33.js";
import "./index34.js";
import "./index35.js";
import "./index36.js";
import "./index37.js";
import "./index38.js";
import "./index39.js";
import "./index40.js";
import "./index41.js";
import "./index42.js";
import "./index43.js";
import "./index44.js";
import { uid as g } from "./index129.js";
import "./index45.js";
import "./index46.js";
import "./index47.js";
import "./index48.js";
import "./index49.js";
import "./index50.js";
import "./index51.js";
import "./index52.js";
import "./index53.js";
import { BaseTexture as d } from "./index54.js";
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
import { RenderTexture as B } from "./index130.js";
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
import { Texture as u } from "./index131.js";
import "./index67.js";
import "./index79.js";
import "./index80.js";
import "./index81.js";
import "./index102.js";
import "./index103.js";
import { DisplayObject as e } from "./index104.js";
import { Sprite as D } from "./index132.js";
const T = new A();
e.prototype._cacheAsBitmap = !1;
e.prototype._cacheData = null;
e.prototype._cacheAsBitmapResolution = null;
e.prototype._cacheAsBitmapMultisample = null;
class x {
  constructor() {
    this.textureCacheId = null, this.originalRender = null, this.originalRenderCanvas = null, this.originalCalculateBounds = null, this.originalGetLocalBounds = null, this.originalUpdateTransform = null, this.originalDestroy = null, this.originalMask = null, this.originalFilterArea = null, this.originalContainsPoint = null, this.sprite = null;
  }
}
Object.defineProperties(e.prototype, {
  /**
   * The resolution to use for cacheAsBitmap. By default this will use the renderer's resolution
   * but can be overriden for performance. Lower values will reduce memory usage at the expense
   * of render quality. A falsey value of `null` or `0` will default to the renderer's resolution.
   * If `cacheAsBitmap` is set to `true`, this will re-render with the new resolution.
   * @member {number|null} cacheAsBitmapResolution
   * @memberof PIXI.DisplayObject#
   * @default null
   */
  cacheAsBitmapResolution: {
    get() {
      return this._cacheAsBitmapResolution;
    },
    set(t) {
      t !== this._cacheAsBitmapResolution && (this._cacheAsBitmapResolution = t, this.cacheAsBitmap && (this.cacheAsBitmap = !1, this.cacheAsBitmap = !0));
    }
  },
  /**
   * The number of samples to use for cacheAsBitmap. If set to `null`, the renderer's
   * sample count is used.
   * If `cacheAsBitmap` is set to `true`, this will re-render with the new number of samples.
   * @member {number|null} cacheAsBitmapMultisample
   * @memberof PIXI.DisplayObject#
   * @default null
   */
  cacheAsBitmapMultisample: {
    get() {
      return this._cacheAsBitmapMultisample;
    },
    set(t) {
      t !== this._cacheAsBitmapMultisample && (this._cacheAsBitmapMultisample = t, this.cacheAsBitmap && (this.cacheAsBitmap = !1, this.cacheAsBitmap = !0));
    }
  },
  /**
   * Set this to true if you want this display object to be cached as a bitmap.
   * This basically takes a snapshot of the display object as it is at that moment. It can
   * provide a performance benefit for complex static displayObjects.
   * To remove simply set this property to `false`
   *
   * IMPORTANT GOTCHA - Make sure that all your textures are preloaded BEFORE setting this property to true
   * as it will take a snapshot of what is currently there. If the textures have not loaded then they will not appear.
   * @member {boolean}
   * @memberof PIXI.DisplayObject#
   */
  cacheAsBitmap: {
    get() {
      return this._cacheAsBitmap;
    },
    set(t) {
      if (this._cacheAsBitmap === t)
        return;
      this._cacheAsBitmap = t;
      let a;
      t ? (this._cacheData || (this._cacheData = new x()), a = this._cacheData, a.originalRender = this.render, a.originalRenderCanvas = this.renderCanvas, a.originalUpdateTransform = this.updateTransform, a.originalCalculateBounds = this.calculateBounds, a.originalGetLocalBounds = this.getLocalBounds, a.originalDestroy = this.destroy, a.originalContainsPoint = this.containsPoint, a.originalMask = this._mask, a.originalFilterArea = this.filterArea, this.render = this._renderCached, this.renderCanvas = this._renderCachedCanvas, this.destroy = this._cacheAsBitmapDestroy) : (a = this._cacheData, a.sprite && this._destroyCachedDisplayObject(), this.render = a.originalRender, this.renderCanvas = a.originalRenderCanvas, this.calculateBounds = a.originalCalculateBounds, this.getLocalBounds = a.originalGetLocalBounds, this.destroy = a.originalDestroy, this.updateTransform = a.originalUpdateTransform, this.containsPoint = a.originalContainsPoint, this._mask = a.originalMask, this.filterArea = a.originalFilterArea);
    }
  }
});
e.prototype._renderCached = function(t) {
  !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObject(t), this._cacheData.sprite.transform._worldID = this.transform._worldID, this._cacheData.sprite.worldAlpha = this.worldAlpha, this._cacheData.sprite._render(t));
};
e.prototype._initCachedDisplayObject = function(t) {
  var _, f;
  if ((_ = this._cacheData) != null && _.sprite)
    return;
  const a = this.alpha;
  this.alpha = 1, t.batch.flush();
  const i = this.getLocalBounds(new C(), !0);
  if ((f = this.filters) != null && f.length) {
    const y = this.filters[0].padding;
    i.pad(y);
  }
  const h = this.cacheAsBitmapResolution || t.resolution;
  i.ceil(h), i.width = Math.max(i.width, 1 / h), i.height = Math.max(i.height, 1 / h);
  const m = t.renderTexture.current, n = t.renderTexture.sourceFrame.clone(), c = t.renderTexture.destinationFrame.clone(), p = t.projection.transform, r = B.create({
    width: i.width,
    height: i.height,
    resolution: h,
    multisample: this.cacheAsBitmapMultisample ?? t.multisample
  }), s = `cacheAsBitmap_${g()}`;
  this._cacheData.textureCacheId = s, d.addToCache(r.baseTexture, s), u.addToCache(r, s);
  const l = this.transform.localTransform.copyTo(T).invert().translate(-i.x, -i.y);
  this.render = this._cacheData.originalRender, t.render(this, { renderTexture: r, clear: !0, transform: l, skipUpdateTransform: !1 }), t.framebuffer.blit(), t.projection.transform = p, t.renderTexture.bind(m, n, c), this.render = this._renderCached, this.updateTransform = this.displayObjectUpdateTransform, this.calculateBounds = this._calculateCachedBounds, this.getLocalBounds = this._getCachedLocalBounds, this._mask = null, this.filterArea = null, this.alpha = a;
  const o = new D(r);
  o.transform.worldTransform = this.transform.worldTransform, o.anchor.x = -(i.x / i.width), o.anchor.y = -(i.y / i.height), o.alpha = a, o._bounds = this._bounds, this._cacheData.sprite = o, this.transform._parentID = -1, this.parent ? this.updateTransform() : (this.enableTempParent(), this.updateTransform(), this.disableTempParent(null)), this.containsPoint = o.containsPoint.bind(o);
};
e.prototype._renderCachedCanvas = function(t) {
  !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObjectCanvas(t), this._cacheData.sprite.worldAlpha = this.worldAlpha, this._cacheData.sprite._renderCanvas(t));
};
e.prototype._initCachedDisplayObjectCanvas = function(t) {
  var l;
  if ((l = this._cacheData) != null && l.sprite)
    return;
  const a = this.getLocalBounds(new C(), !0), i = this.alpha;
  this.alpha = 1;
  const h = t.canvasContext.activeContext, m = t._projTransform, n = this.cacheAsBitmapResolution || t.resolution;
  a.ceil(n), a.width = Math.max(a.width, 1 / n), a.height = Math.max(a.height, 1 / n);
  const c = B.create({
    width: a.width,
    height: a.height,
    resolution: n
  }), p = `cacheAsBitmap_${g()}`;
  this._cacheData.textureCacheId = p, d.addToCache(c.baseTexture, p), u.addToCache(c, p);
  const r = T;
  this.transform.localTransform.copyTo(r), r.invert(), r.tx -= a.x, r.ty -= a.y, this.renderCanvas = this._cacheData.originalRenderCanvas, t.render(this, { renderTexture: c, clear: !0, transform: r, skipUpdateTransform: !1 }), t.canvasContext.activeContext = h, t._projTransform = m, this.renderCanvas = this._renderCachedCanvas, this.updateTransform = this.displayObjectUpdateTransform, this.calculateBounds = this._calculateCachedBounds, this.getLocalBounds = this._getCachedLocalBounds, this._mask = null, this.filterArea = null, this.alpha = i;
  const s = new D(c);
  s.transform.worldTransform = this.transform.worldTransform, s.anchor.x = -(a.x / a.width), s.anchor.y = -(a.y / a.height), s.alpha = i, s._bounds = this._bounds, this._cacheData.sprite = s, this.transform._parentID = -1, this.parent ? this.updateTransform() : (this.parent = t._tempDisplayObjectParent, this.updateTransform(), this.parent = null), this.containsPoint = s.containsPoint.bind(s);
};
e.prototype._calculateCachedBounds = function() {
  this._bounds.clear(), this._cacheData.sprite.transform._worldID = this.transform._worldID, this._cacheData.sprite._calculateBounds(), this._bounds.updateID = this._boundsID;
};
e.prototype._getCachedLocalBounds = function() {
  return this._cacheData.sprite.getLocalBounds(null);
};
e.prototype._destroyCachedDisplayObject = function() {
  this._cacheData.sprite._texture.destroy(!0), this._cacheData.sprite = null, d.removeFromCache(this._cacheData.textureCacheId), u.removeFromCache(this._cacheData.textureCacheId), this._cacheData.textureCacheId = null;
};
e.prototype._cacheAsBitmapDestroy = function(t) {
  this.cacheAsBitmap = !1, this.destroy(t);
};
export {
  x as CacheData
};
//# sourceMappingURL=index14.js.map

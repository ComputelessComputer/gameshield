import { Cache as P } from "./index340.js";
import { ExtensionType as y } from "./index153.js";
import { BigPool as _ } from "./index446.js";
import { Graphics as F } from "./index149.js";
import { SdfShader as C } from "./index569.js";
import { BitmapFontManager as G } from "./index563.js";
import { getBitmapTextLayout as M } from "./index566.js";
class b {
  constructor(e) {
    this._gpuBitmapText = {}, this._destroyRenderableBound = this.destroyRenderable.bind(this), this._renderer = e, this._renderer.renderableGC.addManagedHash(this, "_gpuBitmapText");
  }
  validateRenderable(e) {
    const t = this._getGpuBitmapText(e);
    return e._didTextUpdate && (e._didTextUpdate = !1, this._updateContext(e, t)), this._renderer.renderPipes.graphics.validateRenderable(t);
  }
  addRenderable(e, t) {
    const s = this._getGpuBitmapText(e);
    R(e, s), e._didTextUpdate && (e._didTextUpdate = !1, this._updateContext(e, s)), this._renderer.renderPipes.graphics.addRenderable(s, t), s.context.customShader && this._updateDistanceField(e);
  }
  destroyRenderable(e) {
    e.off("destroyed", this._destroyRenderableBound), this._destroyRenderableByUid(e.uid);
  }
  _destroyRenderableByUid(e) {
    const t = this._gpuBitmapText[e].context;
    t.customShader && (_.return(t.customShader), t.customShader = null), _.return(this._gpuBitmapText[e]), this._gpuBitmapText[e] = null;
  }
  updateRenderable(e) {
    const t = this._getGpuBitmapText(e);
    R(e, t), this._renderer.renderPipes.graphics.updateRenderable(t), t.context.customShader && this._updateDistanceField(e);
  }
  _updateContext(e, t) {
    const { context: s } = t, o = G.getFont(e.text, e._style);
    s.clear(), o.distanceField.type !== "none" && (s.customShader || (s.customShader = _.get(C)));
    const l = Array.from(e.text), n = e._style;
    let u = o.baseLineOffset;
    const i = M(l, n, o, !0);
    let g = 0;
    const h = n.padding, d = i.scale;
    let c = i.width, p = i.height + i.offsetY;
    n._stroke && (c += n._stroke.width / d, p += n._stroke.width / d), s.translate(-e._anchor._x * c - h, -e._anchor._y * p - h).scale(d, d);
    const B = o.applyFillAsTint ? n._fill.color : 16777215;
    for (let f = 0; f < i.lines.length; f++) {
      const x = i.lines[f];
      for (let m = 0; m < x.charPositions.length; m++) {
        const S = l[g++], a = o.chars[S];
        a != null && a.texture && s.texture(
          a.texture,
          B || "black",
          Math.round(x.charPositions[m] + a.xOffset),
          Math.round(u + a.yOffset)
        );
      }
      u += o.lineHeight;
    }
  }
  _getGpuBitmapText(e) {
    return this._gpuBitmapText[e.uid] || this.initGpuText(e);
  }
  initGpuText(e) {
    const t = _.get(F);
    return this._gpuBitmapText[e.uid] = t, this._updateContext(e, t), e.on("destroyed", this._destroyRenderableBound), this._gpuBitmapText[e.uid];
  }
  _updateDistanceField(e) {
    const t = this._getGpuBitmapText(e).context, s = e._style.fontFamily, o = P.get(`${s}-bitmap`), { a: l, b: n, c: u, d: i } = e.groupTransform, g = Math.sqrt(l * l + n * n), h = Math.sqrt(u * u + i * i), d = (Math.abs(g) + Math.abs(h)) / 2, c = o.baseRenderedFontSize / e._style.fontSize, p = d * o.distanceField.range * (1 / c);
    t.customShader.resources.localUniforms.uniforms.uDistance = p;
  }
  destroy() {
    for (const e in this._gpuBitmapText)
      this._destroyRenderableByUid(e);
    this._gpuBitmapText = null, this._renderer = null;
  }
}
b.extension = {
  type: [
    y.WebGLPipes,
    y.WebGPUPipes,
    y.CanvasPipes
  ],
  name: "bitmapText"
};
function R(r, e) {
  e.groupTransform = r.groupTransform, e.groupColorAlpha = r.groupColorAlpha, e.groupColor = r.groupColor, e.groupBlendMode = r.groupBlendMode, e.globalDisplayStatus = r.globalDisplayStatus, e.groupTransform = r.groupTransform, e.localDisplayStatus = r.localDisplayStatus, e.groupAlpha = r.groupAlpha, e._roundPixels = r._roundPixels;
}
export {
  b as BitmapTextPipe
};
//# sourceMappingURL=index568.js.map

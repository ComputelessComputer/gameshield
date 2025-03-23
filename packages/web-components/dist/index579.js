import { ExtensionType as m } from "./index153.js";
import { CanvasPool as d } from "./index473.js";
import { TexturePool as _ } from "./index397.js";
import { RendererType as v } from "./index398.js";
import { isSafari as C } from "./index580.js";
import { warn as S } from "./index338.js";
import { BigPool as f } from "./index446.js";
import { getPo2TextureFromSource as M } from "./index581.js";
import { HTMLTextRenderData as F } from "./index575.js";
import { HTMLTextStyle as P } from "./index576.js";
import { extractFontFamilies as w } from "./index582.js";
import { getFontCss as y } from "./index583.js";
import { getSVGUrl as R } from "./index584.js";
import { getTemporaryCanvasFromImage as U } from "./index585.js";
import { loadSVGImage as L } from "./index586.js";
import { measureHtmlText as b } from "./index587.js";
class l {
  constructor(e) {
    this._activeTextures = {}, this._renderer = e, this._createCanvas = e.type === v.WEBGPU;
  }
  getTexture(e) {
    return this._buildTexturePromise(
      e.text,
      e.resolution,
      e.style
    );
  }
  getManagedTexture(e, t, r, i) {
    if (this._activeTextures[i])
      return this._increaseReferenceCount(i), this._activeTextures[i].promise;
    const a = this._buildTexturePromise(e, t, r).then((n) => (this._activeTextures[i].texture = n, n));
    return this._activeTextures[i] = {
      texture: null,
      promise: a,
      usageCount: 1
    }, a;
  }
  async _buildTexturePromise(e, t, r) {
    const i = f.get(F), a = w(e, r), n = await y(
      a,
      r,
      P.defaultTextStyle
    ), c = b(e, r, n, i), x = Math.ceil(Math.ceil(Math.max(1, c.width) + r.padding * 2) * t), T = Math.ceil(Math.ceil(Math.max(1, c.height) + r.padding * 2) * t), o = i.image, s = 2;
    o.width = (x | 0) + s, o.height = (T | 0) + s;
    const p = R(e, r, t, n, i);
    await L(o, p, C() && a.length > 0);
    const g = o;
    let u;
    this._createCanvas && (u = U(o, t));
    const h = M(
      u ? u.canvas : g,
      o.width - s,
      o.height - s,
      t
    );
    return this._createCanvas && (this._renderer.texture.initSource(h.source), d.returnCanvasAndContext(u)), f.return(i), h;
  }
  _increaseReferenceCount(e) {
    this._activeTextures[e].usageCount++;
  }
  decreaseReferenceCount(e) {
    const t = this._activeTextures[e];
    t && (t.usageCount--, t.usageCount === 0 && (t.texture ? this._cleanUp(t) : t.promise.then((r) => {
      t.texture = r, this._cleanUp(t);
    }).catch(() => {
      S("HTMLTextSystem: Failed to clean texture");
    }), this._activeTextures[e] = null));
  }
  _cleanUp(e) {
    _.returnTexture(e.texture), e.texture.source.resource = null, e.texture.source.uploadMethodId = "unknown";
  }
  getReferenceCount(e) {
    return this._activeTextures[e].usageCount;
  }
  destroy() {
    this._activeTextures = null;
  }
}
l.extension = {
  type: [
    m.WebGLSystem,
    m.WebGPUSystem,
    m.CanvasSystem
  ],
  name: "htmlText"
};
l.defaultFontOptions = {
  fontFamily: "Arial",
  fontStyle: "normal",
  fontWeight: "normal"
};
export {
  l as HTMLTextSystem
};
//# sourceMappingURL=index579.js.map

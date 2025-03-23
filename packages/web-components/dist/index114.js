import "./index20.js";
import "./index21.js";
import { ExtensionType as a, extensions as u } from "./index158.js";
import "./index22.js";
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
import "./index38.js";
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
import { BaseTexture as c } from "./index51.js";
import "./index52.js";
import "./index53.js";
import "./index54.js";
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
import "./index67.js";
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
import "./index107.js";
import { Graphics as e } from "./index108.js";
import "./index109.js";
import { BasePrepare as h } from "./index113.js";
function s(r, t) {
  return t instanceof c ? (t._glTextures[r.CONTEXT_UID] || r.texture.bind(t), !0) : !1;
}
function f(r, t) {
  if (!(t instanceof e))
    return !1;
  const { geometry: o } = t;
  t.finishPoly(), o.updateBatches();
  const { batches: p } = o;
  for (let i = 0; i < p.length; i++) {
    const { texture: m } = p[i].style;
    m && s(r, m.baseTexture);
  }
  return o.batchable || r.geometry.bind(o, t._resolveDirectShader(r)), !0;
}
function l(r, t) {
  return r instanceof e ? (t.push(r), !0) : !1;
}
class n extends h {
  /**
   * @param {PIXI.Renderer} renderer - A reference to the current renderer
   */
  constructor(t) {
    super(t), this.uploadHookHelper = this.renderer, this.registerFindHook(l), this.registerUploadHook(s), this.registerUploadHook(f);
  }
}
n.extension = {
  name: "prepare",
  type: a.RendererSystem
};
u.add(n);
export {
  n as Prepare
};
//# sourceMappingURL=index114.js.map

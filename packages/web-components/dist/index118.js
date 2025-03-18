import "./index23.js";
import { Color as T } from "./index24.js";
import { WRAP_MODES as f } from "./index146.js";
import { ExtensionType as y, extensions as A } from "./index140.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import "./index28.js";
import "./index29.js";
import "./index30.js";
import { Matrix as b } from "./index31.js";
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
import { correctBlendMode as v } from "./index44.js";
import "./index45.js";
import "./index46.js";
import "./index47.js";
import "./index48.js";
import "./index49.js";
import { Shader as u } from "./index182.js";
import "./index50.js";
import { ObjectRenderer as _ } from "./index179.js";
import "./index51.js";
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
import { State as R } from "./index72.js";
import "./index73.js";
import "./index74.js";
import "./index75.js";
import "./index76.js";
import "./index77.js";
import "./index78.js";
import { QuadUv as E } from "./index188.js";
import "./index79.js";
import "./index80.js";
import "./index81.js";
import O from "./index279.js";
import P from "./index280.js";
import F from "./index281.js";
import C from "./index282.js";
import L from "./index283.js";
const h = new b();
class M extends _ {
  /**
   * constructor for renderer
   * @param {PIXI.Renderer} renderer - The renderer this tiling awesomeness works for.
   */
  constructor(r) {
    super(r), r.runners.contextChange.add(this), this.quad = new E(), this.state = R.for2d();
  }
  /** Creates shaders when context is initialized. */
  contextChange() {
    const r = this.renderer, t = { globals: r.globalUniforms };
    this.simpleShader = u.from(C, L, t), this.shader = r.context.webGLVersion > 1 ? u.from(P, O, t) : u.from(C, F, t);
  }
  /**
   * @param {PIXI.TilingSprite} ts - tilingSprite to be rendered
   */
  render(r) {
    const t = this.renderer, a = this.quad;
    let o = a.vertices;
    o[0] = o[6] = r._width * -r.anchor.x, o[1] = o[3] = r._height * -r.anchor.y, o[2] = o[4] = r._width * (1 - r.anchor.x), o[5] = o[7] = r._height * (1 - r.anchor.y);
    const c = r.uvRespectAnchor ? r.anchor.x : 0, g = r.uvRespectAnchor ? r.anchor.y : 0;
    o = a.uvs, o[0] = o[6] = -c, o[1] = o[3] = -g, o[2] = o[4] = 1 - c, o[5] = o[7] = 1 - g, a.invalidate();
    const m = r._texture, e = m.baseTexture, x = e.alphaMode > 0, p = r.tileTransform.localTransform, n = r.uvMatrix;
    let d = e.isPowerOfTwo && m.frame.width === e.width && m.frame.height === e.height;
    d && (e._glTextures[t.CONTEXT_UID] ? d = e.wrapMode !== f.CLAMP : e.wrapMode === f.CLAMP && (e.wrapMode = f.REPEAT));
    const i = d ? this.simpleShader : this.shader, w = m.width, S = m.height, s = r._width, l = r._height;
    h.set(
      p.a * w / s,
      p.b * w / l,
      p.c * S / s,
      p.d * S / l,
      p.tx / s,
      p.ty / l
    ), h.invert(), d ? h.prepend(n.mapCoord) : (i.uniforms.uMapCoord = n.mapCoord.toArray(!0), i.uniforms.uClampFrame = n.uClampFrame, i.uniforms.uClampOffset = n.uClampOffset), i.uniforms.uTransform = h.toArray(!0), i.uniforms.uColor = T.shared.setValue(r.tint).premultiply(r.worldAlpha, x).toArray(i.uniforms.uColor), i.uniforms.translationMatrix = r.transform.worldTransform.toArray(!0), i.uniforms.uSampler = m, t.shader.bind(i), t.geometry.bind(a), this.state.blendMode = v(r.blendMode, x), t.state.set(this.state), t.geometry.draw(this.renderer.gl.TRIANGLES, 6, 0);
  }
}
M.extension = {
  name: "tilingSprite",
  type: y.RendererPlugin
};
A.add(M);
export {
  M as TilingSpriteRenderer
};
//# sourceMappingURL=index118.js.map

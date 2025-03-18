import { MSAA_QUALITY as t } from "./index146.js";
import { ExtensionType as a, extensions as i } from "./index140.js";
class s {
  constructor(e) {
    this.renderer = e;
  }
  contextChange(e) {
    let r;
    if (this.renderer.context.webGLVersion === 1) {
      const m = e.getParameter(e.FRAMEBUFFER_BINDING);
      e.bindFramebuffer(e.FRAMEBUFFER, null), r = e.getParameter(e.SAMPLES), e.bindFramebuffer(e.FRAMEBUFFER, m);
    } else {
      const m = e.getParameter(e.DRAW_FRAMEBUFFER_BINDING);
      e.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), r = e.getParameter(e.SAMPLES), e.bindFramebuffer(e.DRAW_FRAMEBUFFER, m);
    }
    r >= t.HIGH ? this.multisample = t.HIGH : r >= t.MEDIUM ? this.multisample = t.MEDIUM : r >= t.LOW ? this.multisample = t.LOW : this.multisample = t.NONE;
  }
  destroy() {
  }
}
s.extension = {
  type: a.RendererSystem,
  name: "_multisample"
};
i.add(s);
export {
  s as MultisampleSystem
};
//# sourceMappingURL=index56.js.map

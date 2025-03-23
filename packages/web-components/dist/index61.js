import { ExtensionType as m, extensions as u } from "./index158.js";
class c {
  // renderers scene graph!
  constructor(r) {
    this.renderer = r;
  }
  /**
   * Renders the object to its WebGL view.
   * @param displayObject - The object to be rendered.
   * @param options - the options to be passed to the renderer
   */
  render(r, n) {
    const e = this.renderer;
    let t, d, s, a;
    if (n && (t = n.renderTexture, d = n.clear, s = n.transform, a = n.skipUpdateTransform), this.renderingToScreen = !t, e.runners.prerender.emit(), e.emit("prerender"), e.projection.transform = s, !e.context.isLost) {
      if (t || (this.lastObjectRendered = r), !a) {
        const o = r.enableTempParent();
        r.updateTransform(), r.disableTempParent(o);
      }
      e.renderTexture.bind(t), e.batch.currentRenderer.start(), (d ?? e.background.clearBeforeRender) && e.renderTexture.clear(), r.render(e), e.batch.currentRenderer.flush(), t && (n.blit && e.framebuffer.blit(), t.baseTexture.update()), e.runners.postrender.emit(), e.projection.transform = null, e.emit("postrender");
    }
  }
  destroy() {
    this.renderer = null, this.lastObjectRendered = null;
  }
}
c.extension = {
  type: m.RendererSystem,
  name: "objectRenderer"
};
u.add(c);
export {
  c as ObjectRendererSystem
};
//# sourceMappingURL=index61.js.map

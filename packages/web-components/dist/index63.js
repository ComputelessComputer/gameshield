import { ExtensionType as a, extensions as m } from "./index140.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import "./index28.js";
import "./index29.js";
import "./index30.js";
import { Matrix as h } from "./index31.js";
import "./index32.js";
import "./index33.js";
import "./index34.js";
class n {
  /** @param renderer - The renderer this System works for. */
  constructor(r) {
    this.renderer = r, this.destinationFrame = null, this.sourceFrame = null, this.defaultFrame = null, this.projectionMatrix = new h(), this.transform = null;
  }
  /**
   * Updates the projection-matrix based on the sourceFrame → destinationFrame mapping provided.
   *
   * NOTE: It is expected you call `renderer.framebuffer.setViewport(destinationFrame)` after this. This is because
   * the framebuffer viewport converts shader vertex output in normalized device coordinates to window coordinates.
   *
   * NOTE-2: {@link PIXI.RenderTextureSystem#bind} updates the projection-matrix when you bind a render-texture.
   * It is expected
   * that you dirty the current bindings when calling this manually.
   * @param destinationFrame - The rectangle in the render-target to render the contents into. If rendering to the canvas,
   *  the origin is on the top-left; if rendering to a render-texture, the origin is on the bottom-left.
   * @param sourceFrame - The rectangle in world space that contains the contents being rendered.
   * @param resolution - The resolution of the render-target, which is the ratio of
   *  world-space (or CSS) pixels to physical pixels.
   * @param root - Whether the render-target is the screen. This is required because rendering to textures
   *  is y-flipped (i.e. upside down relative to the screen).
   */
  update(r, i, o, e) {
    this.destinationFrame = r || this.destinationFrame || this.defaultFrame, this.sourceFrame = i || this.sourceFrame || r, this.calculateProjection(this.destinationFrame, this.sourceFrame, o, e), this.transform && this.projectionMatrix.append(this.transform);
    const t = this.renderer;
    t.globalUniforms.uniforms.projectionMatrix = this.projectionMatrix, t.globalUniforms.update(), t.shader.shader && t.shader.syncUniformGroup(t.shader.shader.uniforms.globals);
  }
  /**
   * Calculates the `projectionMatrix` to map points inside `sourceFrame` to inside `destinationFrame`.
   * @param _destinationFrame - The destination frame in the render-target.
   * @param sourceFrame - The source frame in world space.
   * @param _resolution - The render-target's resolution, i.e. ratio of CSS to physical pixels.
   * @param root - Whether rendering into the screen. Otherwise, if rendering to a framebuffer, the projection
   *  is y-flipped.
   */
  calculateProjection(r, i, o, e) {
    const t = this.projectionMatrix, s = e ? -1 : 1;
    t.identity(), t.a = 1 / i.width * 2, t.d = s * (1 / i.height * 2), t.tx = -1 - i.x * t.a, t.ty = -s - i.y * t.d;
  }
  /**
   * Sets the transform of the active render target to the given matrix.
   * @param _matrix - The transformation matrix
   */
  setTransform(r) {
  }
  destroy() {
    this.renderer = null;
  }
}
n.extension = {
  type: a.RendererSystem,
  name: "projection"
};
m.add(n);
export {
  n as ProjectionSystem
};
//# sourceMappingURL=index63.js.map

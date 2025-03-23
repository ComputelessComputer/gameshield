import { ExtensionType as i, extensions as b } from "./index158.js";
class t {
  /**
   * @param renderer - The renderer this System works for.
   */
  constructor(e) {
    this.renderer = e;
  }
  /** Sets up the renderer context and necessary buffers. */
  contextChange() {
    this.gl = this.renderer.gl, this.CONTEXT_UID = this.renderer.CONTEXT_UID;
  }
  /**
   * Bind TransformFeedback and buffers
   * @param transformFeedback - TransformFeedback to bind
   */
  bind(e) {
    const { gl: r, CONTEXT_UID: n } = this, s = e._glTransformFeedbacks[n] || this.createGLTransformFeedback(e);
    r.bindTransformFeedback(r.TRANSFORM_FEEDBACK, s);
  }
  /** Unbind TransformFeedback */
  unbind() {
    const { gl: e } = this;
    e.bindTransformFeedback(e.TRANSFORM_FEEDBACK, null);
  }
  /**
   * Begin TransformFeedback
   * @param drawMode - DrawMode for TransformFeedback
   * @param shader - A Shader used by TransformFeedback. Current bound shader will be used if not provided.
   */
  beginTransformFeedback(e, r) {
    const { gl: n, renderer: s } = this;
    r && s.shader.bind(r), n.beginTransformFeedback(e);
  }
  /** End TransformFeedback */
  endTransformFeedback() {
    const { gl: e } = this;
    e.endTransformFeedback();
  }
  /**
   * Create TransformFeedback and bind buffers
   * @param tf - TransformFeedback
   * @returns WebGLTransformFeedback
   */
  createGLTransformFeedback(e) {
    const { gl: r, renderer: n, CONTEXT_UID: s } = this, f = r.createTransformFeedback();
    e._glTransformFeedbacks[s] = f, r.bindTransformFeedback(r.TRANSFORM_FEEDBACK, f);
    for (let a = 0; a < e.buffers.length; a++) {
      const d = e.buffers[a];
      d && (n.buffer.update(d), d._glBuffers[s].refCount++, r.bindBufferBase(r.TRANSFORM_FEEDBACK_BUFFER, a, d._glBuffers[s].buffer || null));
    }
    return r.bindTransformFeedback(r.TRANSFORM_FEEDBACK, null), e.disposeRunner.add(this), f;
  }
  /**
   * Disposes TransfromFeedback
   * @param {PIXI.TransformFeedback} tf - TransformFeedback
   * @param {boolean} [contextLost=false] - If context was lost, we suppress delete TransformFeedback
   */
  disposeTransformFeedback(e, r) {
    const n = e._glTransformFeedbacks[this.CONTEXT_UID], s = this.gl;
    e.disposeRunner.remove(this);
    const f = this.renderer.buffer;
    if (f)
      for (let a = 0; a < e.buffers.length; a++) {
        const d = e.buffers[a];
        if (!d)
          continue;
        const o = d._glBuffers[this.CONTEXT_UID];
        o && (o.refCount--, o.refCount === 0 && !r && f.dispose(d, r));
      }
    n && (r || s.deleteTransformFeedback(n), delete e._glTransformFeedbacks[this.CONTEXT_UID]);
  }
  destroy() {
    this.renderer = null;
  }
}
t.extension = {
  type: i.RendererSystem,
  name: "transformFeedback"
};
b.add(t);
export {
  t as TransformFeedbackSystem
};
//# sourceMappingURL=index73.js.map

import { ExtensionType as d, extensions as f } from "./index140.js";
import { GLBuffer as B } from "./index199.js";
class r {
  /**
   * @param {PIXI.Renderer} renderer - The renderer this System works for.
   */
  constructor(e) {
    this.renderer = e, this.managedBuffers = {}, this.boundBufferBases = {};
  }
  /**
   * @ignore
   */
  destroy() {
    this.renderer = null;
  }
  /** Sets up the renderer context and necessary buffers. */
  contextChange() {
    this.disposeAll(!0), this.gl = this.renderer.gl, this.CONTEXT_UID = this.renderer.CONTEXT_UID;
  }
  /**
   * This binds specified buffer. On first run, it will create the webGL buffers for the context too
   * @param buffer - the buffer to bind to the renderer
   */
  bind(e) {
    const { gl: t, CONTEXT_UID: s } = this, i = e._glBuffers[s] || this.createGLBuffer(e);
    t.bindBuffer(e.type, i.buffer);
  }
  unbind(e) {
    const { gl: t } = this;
    t.bindBuffer(e, null);
  }
  /**
   * Binds an uniform buffer to at the given index.
   *
   * A cache is used so a buffer will not be bound again if already bound.
   * @param buffer - the buffer to bind
   * @param index - the base index to bind it to.
   */
  bindBufferBase(e, t) {
    const { gl: s, CONTEXT_UID: i } = this;
    if (this.boundBufferBases[t] !== e) {
      const n = e._glBuffers[i] || this.createGLBuffer(e);
      this.boundBufferBases[t] = e, s.bindBufferBase(s.UNIFORM_BUFFER, t, n.buffer);
    }
  }
  /**
   * Binds a buffer whilst also binding its range.
   * This will make the buffer start from the offset supplied rather than 0 when it is read.
   * @param buffer - the buffer to bind
   * @param index - the base index to bind at, defaults to 0
   * @param offset - the offset to bind at (this is blocks of 256). 0 = 0, 1 = 256, 2 = 512 etc
   */
  bindBufferRange(e, t, s) {
    const { gl: i, CONTEXT_UID: n } = this;
    s = s || 0;
    const a = e._glBuffers[n] || this.createGLBuffer(e);
    i.bindBufferRange(i.UNIFORM_BUFFER, t || 0, a.buffer, s * 256, 256);
  }
  /**
   * Will ensure the data in the buffer is uploaded to the GPU.
   * @param {PIXI.Buffer} buffer - the buffer to update
   */
  update(e) {
    const { gl: t, CONTEXT_UID: s } = this, i = e._glBuffers[s] || this.createGLBuffer(e);
    if (e._updateID !== i.updateID)
      if (i.updateID = e._updateID, t.bindBuffer(e.type, i.buffer), i.byteLength >= e.data.byteLength)
        t.bufferSubData(e.type, 0, e.data);
      else {
        const n = e.static ? t.STATIC_DRAW : t.DYNAMIC_DRAW;
        i.byteLength = e.data.byteLength, t.bufferData(e.type, e.data, n);
      }
  }
  /**
   * Disposes buffer
   * @param {PIXI.Buffer} buffer - buffer with data
   * @param {boolean} [contextLost=false] - If context was lost, we suppress deleteVertexArray
   */
  dispose(e, t) {
    if (!this.managedBuffers[e.id])
      return;
    delete this.managedBuffers[e.id];
    const s = e._glBuffers[this.CONTEXT_UID], i = this.gl;
    e.disposeRunner.remove(this), s && (t || i.deleteBuffer(s.buffer), delete e._glBuffers[this.CONTEXT_UID]);
  }
  /**
   * dispose all WebGL resources of all managed buffers
   * @param {boolean} [contextLost=false] - If context was lost, we suppress `gl.delete` calls
   */
  disposeAll(e) {
    const t = Object.keys(this.managedBuffers);
    for (let s = 0; s < t.length; s++)
      this.dispose(this.managedBuffers[t[s]], e);
  }
  /**
   * creates and attaches a GLBuffer object tied to the current context.
   * @param buffer
   * @protected
   */
  createGLBuffer(e) {
    const { CONTEXT_UID: t, gl: s } = this;
    return e._glBuffers[t] = new B(s.createBuffer()), this.managedBuffers[e.id] = e, e.disposeRunner.add(this), e._glBuffers[t];
  }
}
r.extension = {
  type: d.RendererSystem,
  name: "buffer"
};
f.add(r);
export {
  r as BufferSystem
};
//# sourceMappingURL=index57.js.map

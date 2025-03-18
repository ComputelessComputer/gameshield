import { ENV as g, BUFFER_TYPE as y } from "./index146.js";
import { ExtensionType as V, extensions as v } from "./index140.js";
import { settings as I } from "./index145.js";
import "./index36.js";
const x = { 5126: 4, 5123: 2, 5121: 1 };
class A {
  /** @param renderer - The renderer this System works for. */
  constructor(e) {
    this.renderer = e, this._activeGeometry = null, this._activeVao = null, this.hasVao = !0, this.hasInstance = !0, this.canUseUInt32ElementIndex = !1, this.managedGeometries = {};
  }
  /** Sets up the renderer context and necessary buffers. */
  contextChange() {
    this.disposeAll(!0);
    const e = this.gl = this.renderer.gl, r = this.renderer.context;
    if (this.CONTEXT_UID = this.renderer.CONTEXT_UID, r.webGLVersion !== 2) {
      let t = this.renderer.context.extensions.vertexArrayObject;
      I.PREFER_ENV === g.WEBGL_LEGACY && (t = null), t ? (e.createVertexArray = () => t.createVertexArrayOES(), e.bindVertexArray = (i) => t.bindVertexArrayOES(i), e.deleteVertexArray = (i) => t.deleteVertexArrayOES(i)) : (this.hasVao = !1, e.createVertexArray = () => null, e.bindVertexArray = () => null, e.deleteVertexArray = () => null);
    }
    if (r.webGLVersion !== 2) {
      const t = e.getExtension("ANGLE_instanced_arrays");
      t ? (e.vertexAttribDivisor = (i, s) => t.vertexAttribDivisorANGLE(i, s), e.drawElementsInstanced = (i, s, n, a, o) => t.drawElementsInstancedANGLE(i, s, n, a, o), e.drawArraysInstanced = (i, s, n, a) => t.drawArraysInstancedANGLE(i, s, n, a)) : this.hasInstance = !1;
    }
    this.canUseUInt32ElementIndex = r.webGLVersion === 2 || !!r.extensions.uint32ElementIndex;
  }
  /**
   * Binds geometry so that is can be drawn. Creating a Vao if required
   * @param geometry - Instance of geometry to bind.
   * @param shader - Instance of shader to use vao for.
   */
  bind(e, r) {
    r = r || this.renderer.shader.shader;
    const { gl: t } = this;
    let i = e.glVertexArrayObjects[this.CONTEXT_UID], s = !1;
    i || (this.managedGeometries[e.id] = e, e.disposeRunner.add(this), e.glVertexArrayObjects[this.CONTEXT_UID] = i = {}, s = !0);
    const n = i[r.program.id] || this.initGeometryVao(e, r, s);
    this._activeGeometry = e, this._activeVao !== n && (this._activeVao = n, this.hasVao ? t.bindVertexArray(n) : this.activateVao(e, r.program)), this.updateBuffers();
  }
  /** Reset and unbind any active VAO and geometry. */
  reset() {
    this.unbind();
  }
  /** Update buffers of the currently bound geometry. */
  updateBuffers() {
    const e = this._activeGeometry, r = this.renderer.buffer;
    for (let t = 0; t < e.buffers.length; t++) {
      const i = e.buffers[t];
      r.update(i);
    }
  }
  /**
   * Check compatibility between a geometry and a program
   * @param geometry - Geometry instance.
   * @param program - Program instance.
   */
  checkCompatibility(e, r) {
    const t = e.attributes, i = r.attributeData;
    for (const s in i)
      if (!t[s])
        throw new Error(`shader and geometry incompatible, geometry missing the "${s}" attribute`);
  }
  /**
   * Takes a geometry and program and generates a unique signature for them.
   * @param geometry - To get signature from.
   * @param program - To test geometry against.
   * @returns - Unique signature of the geometry and program
   */
  getSignature(e, r) {
    const t = e.attributes, i = r.attributeData, s = ["g", e.id];
    for (const n in t)
      i[n] && s.push(n, i[n].location);
    return s.join("-");
  }
  /**
   * Creates or gets Vao with the same structure as the geometry and stores it on the geometry.
   * If vao is created, it is bound automatically. We use a shader to infer what and how to set up the
   * attribute locations.
   * @param geometry - Instance of geometry to to generate Vao for.
   * @param shader - Instance of the shader.
   * @param incRefCount - Increment refCount of all geometry buffers.
   */
  initGeometryVao(e, r, t = !0) {
    const i = this.gl, s = this.CONTEXT_UID, n = this.renderer.buffer, a = r.program;
    a.glPrograms[s] || this.renderer.shader.generateProgram(r), this.checkCompatibility(e, a);
    const o = this.getSignature(e, a), u = e.glVertexArrayObjects[this.CONTEXT_UID];
    let f = u[o];
    if (f)
      return u[a.id] = f, f;
    const b = e.buffers, h = e.attributes, c = {}, E = {};
    for (const d in b)
      c[d] = 0, E[d] = 0;
    for (const d in h)
      !h[d].size && a.attributeData[d] ? h[d].size = a.attributeData[d].size : h[d].size || console.warn(`PIXI Geometry attribute '${d}' size cannot be determined (likely the bound shader does not have the attribute)`), c[h[d].buffer] += h[d].size * x[h[d].type];
    for (const d in h) {
      const l = h[d], m = l.size;
      l.stride === void 0 && (c[l.buffer] === m * x[l.type] ? l.stride = 0 : l.stride = c[l.buffer]), l.start === void 0 && (l.start = E[l.buffer], E[l.buffer] += m * x[l.type]);
    }
    f = i.createVertexArray(), i.bindVertexArray(f);
    for (let d = 0; d < b.length; d++) {
      const l = b[d];
      n.bind(l), t && l._glBuffers[s].refCount++;
    }
    return this.activateVao(e, a), u[a.id] = f, u[o] = f, i.bindVertexArray(null), n.unbind(y.ARRAY_BUFFER), f;
  }
  /**
   * Disposes geometry.
   * @param geometry - Geometry with buffers. Only VAO will be disposed
   * @param [contextLost=false] - If context was lost, we suppress deleteVertexArray
   */
  disposeGeometry(e, r) {
    var a;
    if (!this.managedGeometries[e.id])
      return;
    delete this.managedGeometries[e.id];
    const t = e.glVertexArrayObjects[this.CONTEXT_UID], i = this.gl, s = e.buffers, n = (a = this.renderer) == null ? void 0 : a.buffer;
    if (e.disposeRunner.remove(this), !!t) {
      if (n)
        for (let o = 0; o < s.length; o++) {
          const u = s[o]._glBuffers[this.CONTEXT_UID];
          u && (u.refCount--, u.refCount === 0 && !r && n.dispose(s[o], r));
        }
      if (!r) {
        for (const o in t)
          if (o[0] === "g") {
            const u = t[o];
            this._activeVao === u && this.unbind(), i.deleteVertexArray(u);
          }
      }
      delete e.glVertexArrayObjects[this.CONTEXT_UID];
    }
  }
  /**
   * Dispose all WebGL resources of all managed geometries.
   * @param [contextLost=false] - If context was lost, we suppress `gl.delete` calls
   */
  disposeAll(e) {
    const r = Object.keys(this.managedGeometries);
    for (let t = 0; t < r.length; t++)
      this.disposeGeometry(this.managedGeometries[r[t]], e);
  }
  /**
   * Activate vertex array object.
   * @param geometry - Geometry instance.
   * @param program - Shader program instance.
   */
  activateVao(e, r) {
    const t = this.gl, i = this.CONTEXT_UID, s = this.renderer.buffer, n = e.buffers, a = e.attributes;
    e.indexBuffer && s.bind(e.indexBuffer);
    let o = null;
    for (const u in a) {
      const f = a[u], b = n[f.buffer], h = b._glBuffers[i];
      if (r.attributeData[u]) {
        o !== h && (s.bind(b), o = h);
        const c = r.attributeData[u].location;
        if (t.enableVertexAttribArray(c), t.vertexAttribPointer(
          c,
          f.size,
          f.type || t.FLOAT,
          f.normalized,
          f.stride,
          f.start
        ), f.instance)
          if (this.hasInstance)
            t.vertexAttribDivisor(c, f.divisor);
          else
            throw new Error("geometry error, GPU Instancing is not supported on this device");
      }
    }
  }
  /**
   * Draws the currently bound geometry.
   * @param type - The type primitive to render.
   * @param size - The number of elements to be rendered. If not specified, all vertices after the
   *  starting vertex will be drawn.
   * @param start - The starting vertex in the geometry to start drawing from. If not specified,
   *  drawing will start from the first vertex.
   * @param instanceCount - The number of instances of the set of elements to execute. If not specified,
   *  all instances will be drawn.
   */
  draw(e, r, t, i) {
    const { gl: s } = this, n = this._activeGeometry;
    if (n.indexBuffer) {
      const a = n.indexBuffer.data.BYTES_PER_ELEMENT, o = a === 2 ? s.UNSIGNED_SHORT : s.UNSIGNED_INT;
      a === 2 || a === 4 && this.canUseUInt32ElementIndex ? n.instanced ? s.drawElementsInstanced(e, r || n.indexBuffer.data.length, o, (t || 0) * a, i || 1) : s.drawElements(e, r || n.indexBuffer.data.length, o, (t || 0) * a) : console.warn("unsupported index buffer type: uint32");
    } else
      n.instanced ? s.drawArraysInstanced(e, t, r || n.getSize(), i || 1) : s.drawArrays(e, t, r || n.getSize());
    return this;
  }
  /** Unbind/reset everything. */
  unbind() {
    this.gl.bindVertexArray(null), this._activeVao = null, this._activeGeometry = null;
  }
  destroy() {
    this.renderer = null;
  }
}
A.extension = {
  type: V.RendererSystem,
  name: "geometry"
};
v.add(A);
export {
  A as GeometrySystem
};
//# sourceMappingURL=index58.js.map

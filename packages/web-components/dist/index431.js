import a from "./index157.js";
import { GlProgram as b } from "./index432.js";
import { BindGroup as h } from "./index394.js";
import { GpuProgram as w } from "./index433.js";
import { RendererType as l } from "./index398.js";
import { UniformGroup as G } from "./index396.js";
import { uid as P } from "./index416.js";
class d extends a {
  constructor(u) {
    super(), this.uid = P("shader"), this._uniformBindMap = /* @__PURE__ */ Object.create(null), this._ownedBindGroups = [];
    let {
      gpuProgram: r,
      glProgram: n,
      groups: o,
      resources: s,
      compatibleRenderers: p,
      groupMap: e
    } = u;
    this.gpuProgram = r, this.glProgram = n, p === void 0 && (p = 0, r && (p |= l.WEBGPU), n && (p |= l.WEBGL)), this.compatibleRenderers = p;
    const m = {};
    if (!s && !o && (s = {}), s && o)
      throw new Error("[Shader] Cannot have both resources and groups");
    if (!r && o && !e)
      throw new Error("[Shader] No group map or WebGPU shader provided - consider using resources instead.");
    if (!r && o && e)
      for (const g in e)
        for (const i in e[g]) {
          const t = e[g][i];
          m[t] = {
            group: g,
            binding: i,
            name: t
          };
        }
    else if (r && o && !e) {
      const g = r.structsAndGroups.groups;
      e = {}, g.forEach((i) => {
        e[i.group] = e[i.group] || {}, e[i.group][i.binding] = i.name, m[i.name] = i;
      });
    } else if (s) {
      o = {}, e = {}, r && r.structsAndGroups.groups.forEach((t) => {
        e[t.group] = e[t.group] || {}, e[t.group][t.binding] = t.name, m[t.name] = t;
      });
      let g = 0;
      for (const i in s)
        m[i] || (o[99] || (o[99] = new h(), this._ownedBindGroups.push(o[99])), m[i] = { group: 99, binding: g, name: i }, e[99] = e[99] || {}, e[99][g] = i, g++);
      for (const i in s) {
        const t = i;
        let f = s[i];
        !f.source && !f._resourceType && (f = new G(f));
        const c = m[t];
        c && (o[c.group] || (o[c.group] = new h(), this._ownedBindGroups.push(o[c.group])), o[c.group].setResource(f, c.binding));
      }
    }
    this.groups = o, this._uniformBindMap = e, this.resources = this._buildResourceAccessor(o, m);
  }
  /**
   * Sometimes a resource group will be provided later (for example global uniforms)
   * In such cases, this method can be used to let the shader know about the group.
   * @param name - the name of the resource group
   * @param groupIndex - the index of the group (should match the webGPU shader group location)
   * @param bindIndex - the index of the bind point (should match the webGPU shader bind point)
   */
  addResource(u, r, n) {
    var o, s;
    (o = this._uniformBindMap)[r] || (o[r] = {}), (s = this._uniformBindMap[r])[n] || (s[n] = u), this.groups[r] || (this.groups[r] = new h(), this._ownedBindGroups.push(this.groups[r]));
  }
  _buildResourceAccessor(u, r) {
    const n = {};
    for (const o in r) {
      const s = r[o];
      Object.defineProperty(n, s.name, {
        get() {
          return u[s.group].getResource(s.binding);
        },
        set(p) {
          u[s.group].setResource(p, s.binding);
        }
      });
    }
    return n;
  }
  /**
   * Use to destroy the shader when its not longer needed.
   * It will destroy the resources and remove listeners.
   * @param destroyPrograms - if the programs should be destroyed as well.
   * Make sure its not being used by other shaders!
   */
  destroy(u = !1) {
    var r, n;
    this.emit("destroy", this), u && ((r = this.gpuProgram) == null || r.destroy(), (n = this.glProgram) == null || n.destroy()), this.gpuProgram = null, this.glProgram = null, this.removeAllListeners(), this._uniformBindMap = null, this._ownedBindGroups.forEach((o) => {
      o.destroy();
    }), this._ownedBindGroups = null, this.resources = null, this.groups = null;
  }
  static from(u) {
    const { gpu: r, gl: n, ...o } = u;
    let s, p;
    return r && (s = w.from(r)), n && (p = b.from(n)), new d({
      gpuProgram: s,
      glProgram: p,
      ...o
    });
  }
}
export {
  d as Shader
};
//# sourceMappingURL=index431.js.map

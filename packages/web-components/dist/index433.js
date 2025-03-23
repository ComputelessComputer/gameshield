import { createIdFromString as g } from "./index450.js";
import { extractAttributesFromGpuProgram as y } from "./index457.js";
import { extractStructAndGroups as o } from "./index458.js";
import { generateGpuLayoutGroups as p } from "./index459.js";
import { generateLayoutHash as f } from "./index460.js";
import { removeStructAndGroupDuplicates as d } from "./index461.js";
const u = /* @__PURE__ */ Object.create(null);
class n {
  /**
   * Create a new GpuProgram
   * @param options - The options for the gpu program
   */
  constructor(r) {
    var a, i;
    this._layoutKey = 0, this._attributeLocationsKey = 0;
    const { fragment: t, vertex: e, layout: c, gpuLayout: m, name: h } = r;
    if (this.name = h, this.fragment = t, this.vertex = e, t.source === e.source) {
      const s = o(t.source);
      this.structsAndGroups = s;
    } else {
      const s = o(e.source), l = o(t.source);
      this.structsAndGroups = d(s, l);
    }
    this.layout = c ?? f(this.structsAndGroups), this.gpuLayout = m ?? p(this.structsAndGroups), this.autoAssignGlobalUniforms = ((a = this.layout[0]) == null ? void 0 : a.globalUniforms) !== void 0, this.autoAssignLocalUniforms = ((i = this.layout[1]) == null ? void 0 : i.localUniforms) !== void 0, this._generateProgramKey();
  }
  // TODO maker this pure
  _generateProgramKey() {
    const { vertex: r, fragment: t } = this, e = r.source + t.source + r.entryPoint + t.entryPoint;
    this._layoutKey = g(e, "program");
  }
  get attributeData() {
    return this._attributeData ?? (this._attributeData = y(this.vertex)), this._attributeData;
  }
  /** destroys the program */
  destroy() {
    this.gpuLayout = null, this.layout = null, this.structsAndGroups = null, this.fragment = null, this.vertex = null;
  }
  /**
   * Helper function that creates a program for a given source.
   * It will check the program cache if the program has already been created.
   * If it has that one will be returned, if not a new one will be created and cached.
   * @param options - The options for the program.
   * @returns A program using the same source
   */
  static from(r) {
    const t = `${r.vertex.source}:${r.fragment.source}:${r.fragment.entryPoint}:${r.vertex.entryPoint}`;
    return u[t] || (u[t] = new n(r)), u[t];
  }
}
export {
  n as GpuProgram
};
//# sourceMappingURL=index433.js.map

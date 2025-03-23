import { uid as s } from "./index416.js";
import { createIdFromString as n } from "./index450.js";
import { UNIFORM_TYPES_MAP as p, UNIFORM_TYPES_VALUES as a } from "./index469.js";
import { getDefaultUniformValue as m } from "./index470.js";
const u = class f {
  /**
   * Create a new Uniform group
   * @param uniformStructures - The structures of the uniform group
   * @param options - The optional parameters of this uniform group
   */
  constructor(r, o) {
    this._touched = 0, this.uid = s("uniform"), this._resourceType = "uniformGroup", this._resourceId = s("resource"), this.isUniformGroup = !0, this._dirtyId = 0, this.destroyed = !1, o = { ...f.defaultOptions, ...o }, this.uniformStructures = r;
    const e = {};
    for (const i in r) {
      const t = r[i];
      if (t.name = i, t.size = t.size ?? 1, !p[t.type])
        throw new Error(`Uniform type ${t.type} is not supported. Supported uniform types are: ${a.join(", ")}`);
      t.value ?? (t.value = m(t.type, t.size)), e[i] = t.value;
    }
    this.uniforms = e, this._dirtyId = 1, this.ubo = o.ubo, this.isStatic = o.isStatic, this._signature = n(Object.keys(e).map(
      (i) => `${i}-${r[i].type}`
    ).join("-"), "uniform-group");
  }
  /** Call this if you want the uniform groups data to be uploaded to the GPU only useful if `isStatic` is true. */
  update() {
    this._dirtyId++;
  }
};
u.defaultOptions = {
  /** if true the UniformGroup is handled as an Uniform buffer object. */
  ubo: !1,
  /** if true, then you are responsible for when the data is uploaded to the GPU by calling `update()` */
  isStatic: !1
};
let y = u;
export {
  y as UniformGroup
};
//# sourceMappingURL=index396.js.map

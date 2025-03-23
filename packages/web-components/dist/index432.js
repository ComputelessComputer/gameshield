import { createIdFromString as g } from "./index450.js";
import { getMaxFragmentPrecision as l } from "./index451.js";
import { addProgramDefines as u } from "./index452.js";
import { ensurePrecision as d } from "./index453.js";
import { insertVersion as p } from "./index454.js";
import { setProgramName as h } from "./index455.js";
import { stripVersion as P } from "./index456.js";
const n = {
  // strips any version headers..
  stripVersion: P,
  // adds precision string if not already present
  ensurePrecision: d,
  // add some defines if WebGL1 to make it more compatible with WebGL2 shaders
  addProgramDefines: u,
  // add the program name to the shader
  setProgramName: h,
  // add the version string to the shader header
  insertVersion: p
}, a = /* @__PURE__ */ Object.create(null), c = class m {
  /**
   * Creates a shiny new GlProgram. Used by WebGL renderer.
   * @param options - The options for the program.
   */
  constructor(r) {
    r = { ...m.defaultOptions, ...r };
    const e = r.fragment.indexOf("#version 300 es") !== -1, f = {
      stripVersion: e,
      ensurePrecision: {
        requestedFragmentPrecision: r.preferredFragmentPrecision,
        requestedVertexPrecision: r.preferredVertexPrecision,
        maxSupportedVertexPrecision: "highp",
        maxSupportedFragmentPrecision: l()
      },
      setProgramName: {
        name: r.name
      },
      addProgramDefines: e,
      insertVersion: e
    };
    let t = r.fragment, i = r.vertex;
    Object.keys(n).forEach((s) => {
      const o = f[s];
      t = n[s](t, o, !0), i = n[s](i, o, !1);
    }), this.fragment = t, this.vertex = i, this.transformFeedbackVaryings = r.transformFeedbackVaryings, this._key = g(`${this.vertex}:${this.fragment}`, "gl-program");
  }
  /** destroys the program */
  destroy() {
    this.fragment = null, this.vertex = null, this._attributeData = null, this._uniformData = null, this._uniformBlockData = null, this.transformFeedbackVaryings = null;
  }
  /**
   * Helper function that creates a program for a given source.
   * It will check the program cache if the program has already been created.
   * If it has that one will be returned, if not a new one will be created and cached.
   * @param options - The options for the program.
   * @returns A program using the same source
   */
  static from(r) {
    const e = `${r.vertex}:${r.fragment}`;
    return a[e] || (a[e] = new m(r)), a[e];
  }
};
c.defaultOptions = {
  preferredVertexPrecision: "highp",
  preferredFragmentPrecision: "mediump"
};
let y = c;
export {
  y as GlProgram
};
//# sourceMappingURL=index432.js.map

import "./index22.js";
import "./index23.js";
import "./index24.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import { Matrix as a } from "./index28.js";
import "./index29.js";
import "./index30.js";
import "./index31.js";
import { Program as n } from "./index46.js";
import { Shader as p } from "./index204.js";
import { UniformGroup as c } from "./index205.js";
class $ {
  /**
   * @param vertexSrc - Vertex shader
   * @param fragTemplate - Fragment shader template
   */
  constructor(t, r) {
    if (this.vertexSrc = t, this.fragTemplate = r, this.programCache = {}, this.defaultGroupCache = {}, !r.includes("%count%"))
      throw new Error('Fragment template must contain "%count%".');
    if (!r.includes("%forloop%"))
      throw new Error('Fragment template must contain "%forloop%".');
  }
  generateShader(t) {
    if (!this.programCache[t]) {
      const o = new Int32Array(t);
      for (let i = 0; i < t; i++)
        o[i] = i;
      this.defaultGroupCache[t] = c.from({ uSamplers: o }, !0);
      let e = this.fragTemplate;
      e = e.replace(/%count%/gi, `${t}`), e = e.replace(/%forloop%/gi, this.generateSampleSrc(t)), this.programCache[t] = new n(this.vertexSrc, e);
    }
    const r = {
      tint: new Float32Array([1, 1, 1, 1]),
      translationMatrix: new a(),
      default: this.defaultGroupCache[t]
    };
    return new p(this.programCache[t], r);
  }
  generateSampleSrc(t) {
    let r = "";
    r += `
`, r += `
`;
    for (let o = 0; o < t; o++)
      o > 0 && (r += `
else `), o < t - 1 && (r += `if(vTextureId < ${o}.5)`), r += `
{`, r += `
	color = texture2D(uSamplers[${o}], vTextureCoord);`, r += `
}`;
    return r += `
`, r += `
`, r;
  }
}
export {
  $ as BatchShaderGenerator
};
//# sourceMappingURL=index197.js.map

import { PRECISION as c } from "./index146.js";
import "./index40.js";
import { isMobile as g } from "./index36.js";
import "./index41.js";
import "./index42.js";
import "./index43.js";
import "./index24.js";
import "./index44.js";
import "./index45.js";
import { ProgramCache as f } from "./index208.js";
import h from "./index209.js";
import l from "./index210.js";
import { getMaxFragmentPrecision as p } from "./index211.js";
import { setPrecision as n } from "./index212.js";
let S = 0;
const o = {}, a = class t {
  /**
   * @param vertexSrc - The source of the vertex shader.
   * @param fragmentSrc - The source of the fragment shader.
   * @param name - Name for shader
   * @param extra - Extra data for shader
   */
  constructor(e, i, r = "pixi-shader", s = {}) {
    this.extra = {}, this.id = S++, this.vertexSrc = e || t.defaultVertexSrc, this.fragmentSrc = i || t.defaultFragmentSrc, this.vertexSrc = this.vertexSrc.trim(), this.fragmentSrc = this.fragmentSrc.trim(), this.extra = s, this.vertexSrc.substring(0, 8) !== "#version" && (r = r.replace(/\s+/g, "-"), o[r] ? (o[r]++, r += `-${o[r]}`) : o[r] = 1, this.vertexSrc = `#define SHADER_NAME ${r}
${this.vertexSrc}`, this.fragmentSrc = `#define SHADER_NAME ${r}
${this.fragmentSrc}`, this.vertexSrc = n(
      this.vertexSrc,
      t.defaultVertexPrecision,
      c.HIGH
    ), this.fragmentSrc = n(
      this.fragmentSrc,
      t.defaultFragmentPrecision,
      p()
    )), this.glPrograms = {}, this.syncUniforms = null;
  }
  /**
   * The default vertex shader source.
   * @readonly
   */
  static get defaultVertexSrc() {
    return l;
  }
  /**
   * The default fragment shader source.
   * @readonly
   */
  static get defaultFragmentSrc() {
    return h;
  }
  /**
   * A short hand function to create a program based of a vertex and fragment shader.
   *
   * This method will also check to see if there is a cached program.
   * @param vertexSrc - The source of the vertex shader.
   * @param fragmentSrc - The source of the fragment shader.
   * @param name - Name for shader
   * @returns A shiny new PixiJS shader program!
   */
  static from(e, i, r) {
    const s = e + i;
    let m = f[s];
    return m || (f[s] = m = new t(e, i, r)), m;
  }
};
a.defaultVertexPrecision = c.HIGH, /**
* Default specify float precision in fragment shader.
* iOS is best set at highp due to https://github.com/pixijs/pixijs/issues/3742
* @static
* @type {PIXI.PRECISION}
* @default PIXI.PRECISION.MEDIUM
*/
a.defaultFragmentPrecision = g.apple.device ? c.HIGH : c.MEDIUM;
let C = a;
export {
  C as Program
};
//# sourceMappingURL=index49.js.map

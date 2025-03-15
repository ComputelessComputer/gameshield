import { Runner as u } from "./index35.js";
import { Program as e } from "./index49.js";
import { UniformGroup as s } from "./index193.js";
class t {
  /**
   * @param program - The program the shader will use.
   * @param uniforms - Custom uniforms to use to augment the built-in ones.
   */
  constructor(o, r) {
    this.uniformBindCount = 0, this.program = o, r ? r instanceof s ? this.uniformGroup = r : this.uniformGroup = new s(r) : this.uniformGroup = new s({}), this.disposeRunner = new u("disposeShader");
  }
  // TODO move to shader system..
  checkUniformExists(o, r) {
    if (r.uniforms[o])
      return !0;
    for (const n in r.uniforms) {
      const i = r.uniforms[n];
      if (i.group === !0 && this.checkUniformExists(o, i))
        return !0;
    }
    return !1;
  }
  destroy() {
    this.uniformGroup = null, this.disposeRunner.emit(this), this.disposeRunner.destroy();
  }
  /**
   * Shader uniform values, shortcut for `uniformGroup.uniforms`.
   * @readonly
   */
  get uniforms() {
    return this.uniformGroup.uniforms;
  }
  /**
   * A short hand function to create a shader based of a vertex and fragment shader.
   * @param vertexSrc - The source of the vertex shader.
   * @param fragmentSrc - The source of the fragment shader.
   * @param uniforms - Custom uniforms to use to augment the built-in ones.
   * @returns A shiny new PixiJS shader!
   */
  static from(o, r, n) {
    const i = e.from(o, r);
    return new t(i, n);
  }
}
export {
  t as Shader
};
//# sourceMappingURL=index192.js.map

import { BUFFER_TYPE as r } from "./index146.js";
import { Buffer as o } from "./index171.js";
let u = 0;
class s {
  /**
   * @param {object | Buffer} [uniforms] - Custom uniforms to use to augment the built-in ones. Or a pixi buffer.
   * @param isStatic - Uniforms wont be changed after creation.
   * @param isUbo - If true, will treat this uniform group as a uniform buffer object.
   */
  constructor(t, i, e) {
    this.group = !0, this.syncUniforms = {}, this.dirtyId = 0, this.id = u++, this.static = !!i, this.ubo = !!e, t instanceof o ? (this.buffer = t, this.buffer.type = r.UNIFORM_BUFFER, this.autoManage = !1, this.ubo = !0) : (this.uniforms = t, this.ubo && (this.buffer = new o(new Float32Array(1)), this.buffer.type = r.UNIFORM_BUFFER, this.autoManage = !0));
  }
  update() {
    this.dirtyId++, !this.autoManage && this.buffer && this.buffer.update();
  }
  add(t, i, e) {
    if (!this.ubo)
      this.uniforms[t] = new s(i, e);
    else
      throw new Error("[UniformGroup] uniform groups in ubo mode cannot be modified, or have uniform groups nested in them");
  }
  static from(t, i, e) {
    return new s(t, i, e);
  }
  /**
   * A short hand function for creating a static UBO UniformGroup.
   * @param uniforms - the ubo item
   * @param _static - should this be updated each time it is used? defaults to true here!
   */
  static uboFrom(t, i) {
    return new s(t, i ?? !0, !0);
  }
}
export {
  s as UniformGroup
};
//# sourceMappingURL=index183.js.map

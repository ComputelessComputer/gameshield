class u {
  /**
   * Makes a new Pixi program.
   * @param program - webgl program
   * @param uniformData - uniforms
   */
  constructor(r, i) {
    this.program = r, this.uniformData = i, this.uniformGroups = {}, this.uniformDirtyGroups = {}, this.uniformBufferBindings = {};
  }
  /** Destroys this program. */
  destroy() {
    this.uniformData = null, this.uniformGroups = null, this.uniformDirtyGroups = null, this.uniformBufferBindings = null, this.program = null;
  }
}
export {
  u as GLProgram
};
//# sourceMappingURL=index207.js.map

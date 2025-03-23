const p = {
  /**
   * Main method to collect renderables from the container and its children.
   * It checks the container's properties to decide whether to use a simple or advanced collection method.
   * @param {InstructionSet} instructionSet - The set of instructions to which the renderables will be added.
   * @param {Renderer} renderer - The renderer responsible for rendering the scene.
   * @param {IRenderLayer} currentLayer - The current render layer being processed.
   * @memberof scene.Container#
   */
  collectRenderables(e, t, i) {
    this.parentRenderLayer && this.parentRenderLayer !== i || this.globalDisplayStatus < 7 || !this.includeInBuild || (this.sortableChildren && this.sortChildren(), this.isSimple ? this.collectRenderablesSimple(e, t, i) : this.renderGroup ? t.renderPipes.renderGroup.addRenderGroup(this.renderGroup, e) : this.collectRenderablesWithEffects(e, t, i));
  },
  /**
   * Simple method for collecting renderables from the container's children.
   * This method is efficient and used when the container is marked as simple.
   * @param {InstructionSet} instructionSet - The set of instructions to which the renderables will be added.
   * @param {Renderer} renderer - The renderer responsible for rendering the scene.
   * @param {IRenderLayer} currentLayer - The current render layer being processed.
   * @memberof scene.Container#
   */
  collectRenderablesSimple(e, t, i) {
    const h = this.children, l = h.length;
    for (let s = 0; s < l; s++)
      h[s].collectRenderables(e, t, i);
  },
  /**
   * Advanced method for collecting renderables, which handles additional effects.
   * This method is used when the container has complex processing needs.
   * @param {InstructionSet} instructionSet - The set of instructions to which the renderables will be added.
   * @param {Renderer} renderer - The renderer responsible for rendering the scene.
   * @param {IRenderLayer} currentLayer - The current render layer being processed.
   * @memberof scene.Container#
   */
  collectRenderablesWithEffects(e, t, i) {
    const { renderPipes: h } = t;
    for (let l = 0; l < this.effects.length; l++) {
      const s = this.effects[l];
      h[s.pipe].push(s, this, e);
    }
    this.collectRenderablesSimple(e, t, i);
    for (let l = this.effects.length - 1; l >= 0; l--) {
      const s = this.effects[l];
      h[s.pipe].pop(s, this, e);
    }
  }
};
export {
  p as collectRenderablesMixin
};
//# sourceMappingURL=index486.js.map

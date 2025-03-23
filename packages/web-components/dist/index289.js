class e {
  constructor() {
    this.reset();
  }
  /**
   * Begin batch part.
   * @param style
   * @param startIndex
   * @param attribStart
   */
  begin(t, s, i) {
    this.reset(), this.style = t, this.start = s, this.attribStart = i;
  }
  /**
   * End batch part.
   * @param endIndex
   * @param endAttrib
   */
  end(t, s) {
    this.attribSize = s - this.attribStart, this.size = t - this.start;
  }
  reset() {
    this.style = null, this.size = 0, this.start = 0, this.attribStart = 0, this.attribSize = 0;
  }
}
export {
  e as BatchPart
};
//# sourceMappingURL=index289.js.map

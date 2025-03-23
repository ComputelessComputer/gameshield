class i {
  constructor() {
    this.ids = /* @__PURE__ */ Object.create(null), this.textures = [], this.count = 0;
  }
  /** Clear the textures and their locations. */
  clear() {
    for (let t = 0; t < this.count; t++) {
      const s = this.textures[t];
      this.textures[t] = null, this.ids[s.uid] = null;
    }
    this.count = 0;
  }
}
export {
  i as BatchTextureArray
};
//# sourceMappingURL=index420.js.map

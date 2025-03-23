var f = /* @__PURE__ */ ((e) => (e.Application = "application", e.WebGLPipes = "webgl-pipes", e.WebGLPipesAdaptor = "webgl-pipes-adaptor", e.WebGLSystem = "webgl-system", e.WebGPUPipes = "webgpu-pipes", e.WebGPUPipesAdaptor = "webgpu-pipes-adaptor", e.WebGPUSystem = "webgpu-system", e.CanvasSystem = "canvas-system", e.CanvasPipesAdaptor = "canvas-pipes-adaptor", e.CanvasPipes = "canvas-pipes", e.Asset = "asset", e.LoadParser = "load-parser", e.ResolveParser = "resolve-parser", e.CacheParser = "cache-parser", e.DetectionParser = "detection-parser", e.MaskEffect = "mask-effect", e.BlendMode = "blend-mode", e.TextureSource = "texture-source", e.Environment = "environment", e.ShapeBuilder = "shape-builder", e.Batcher = "batcher", e))(f || {});
const i = (e) => {
  if (typeof e == "function" || typeof e == "object" && e.extension) {
    if (!e.extension)
      throw new Error("Extension class must have an extension object");
    e = { ...typeof e.extension != "object" ? { type: e.extension } : e.extension, ref: e };
  }
  if (typeof e == "object")
    e = { ...e };
  else
    throw new Error("Invalid extension type");
  return typeof e.type == "string" && (e.type = [e.type]), e;
}, d = (e, r) => i(e).priority ?? r, h = {
  /** @ignore */
  _addHandlers: {},
  /** @ignore */
  _removeHandlers: {},
  /** @ignore */
  _queue: {},
  /**
   * Remove extensions from PixiJS.
   * @param extensions - Extensions to be removed.
   * @returns {extensions} For chaining.
   */
  remove(...e) {
    return e.map(i).forEach((r) => {
      r.type.forEach((a) => {
        var s, n;
        return (n = (s = this._removeHandlers)[a]) == null ? void 0 : n.call(s, r);
      });
    }), this;
  },
  /**
   * Register new extensions with PixiJS.
   * @param extensions - The spread of extensions to add to PixiJS.
   * @returns {extensions} For chaining.
   */
  add(...e) {
    return e.map(i).forEach((r) => {
      r.type.forEach((a) => {
        var o, t;
        const s = this._addHandlers, n = this._queue;
        s[a] ? (t = s[a]) == null || t.call(s, r) : (n[a] = n[a] || [], (o = n[a]) == null || o.push(r));
      });
    }), this;
  },
  /**
   * Internal method to handle extensions by name.
   * @param type - The extension type.
   * @param onAdd  - Function handler when extensions are added/registered {@link StrictExtensionFormat}.
   * @param onRemove  - Function handler when extensions are removed/unregistered {@link StrictExtensionFormat}.
   * @returns {extensions} For chaining.
   */
  handle(e, r, a) {
    var t;
    const s = this._addHandlers, n = this._removeHandlers;
    if (s[e] || n[e])
      throw new Error(`Extension type ${e} already has a handler`);
    s[e] = r, n[e] = a;
    const o = this._queue;
    return o[e] && ((t = o[e]) == null || t.forEach((c) => r(c)), delete o[e]), this;
  },
  /**
   * Handle a type, but using a map by `name` property.
   * @param type - Type of extension to handle.
   * @param map - The object map of named extensions.
   * @returns {extensions} For chaining.
   */
  handleByMap(e, r) {
    return this.handle(
      e,
      (a) => {
        a.name && (r[a.name] = a.ref);
      },
      (a) => {
        a.name && delete r[a.name];
      }
    );
  },
  /**
   * Handle a type, but using a list of extensions with a `name` property.
   * @param type - Type of extension to handle.
   * @param map - The array of named extensions.
   * @param defaultPriority - Fallback priority if none is defined.
   * @returns {extensions} For chaining.
   */
  handleByNamedList(e, r, a = -1) {
    return this.handle(
      e,
      (s) => {
        r.findIndex((o) => o.name === s.name) >= 0 || (r.push({ name: s.name, value: s.ref }), r.sort((o, t) => d(t.value, a) - d(o.value, a)));
      },
      (s) => {
        const n = r.findIndex((o) => o.name === s.name);
        n !== -1 && r.splice(n, 1);
      }
    );
  },
  /**
   * Handle a type, but using a list of extensions.
   * @param type - Type of extension to handle.
   * @param list - The list of extensions.
   * @param defaultPriority - The default priority to use if none is specified.
   * @returns {extensions} For chaining.
   */
  handleByList(e, r, a = -1) {
    return this.handle(
      e,
      (s) => {
        r.includes(s.ref) || (r.push(s.ref), r.sort((n, o) => d(o, a) - d(n, a)));
      },
      (s) => {
        const n = r.indexOf(s.ref);
        n !== -1 && r.splice(n, 1);
      }
    );
  },
  /**
   * Mixin the source object into the target object.
   * @param Target - The target object to mix into.
   * @param sources - The source(s) object to mix from
   */
  mixin(e, ...r) {
    for (const a of r)
      Object.defineProperties(e.prototype, Object.getOwnPropertyDescriptors(a));
  }
};
export {
  f as ExtensionType,
  h as extensions,
  d as normalizeExtensionPriority
};
//# sourceMappingURL=index153.js.map

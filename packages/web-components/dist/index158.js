var c = /* @__PURE__ */ ((e) => (e.Renderer = "renderer", e.Application = "application", e.RendererSystem = "renderer-webgl-system", e.RendererPlugin = "renderer-webgl-plugin", e.CanvasRendererSystem = "renderer-canvas-system", e.CanvasRendererPlugin = "renderer-canvas-plugin", e.Asset = "asset", e.LoadParser = "load-parser", e.ResolveParser = "resolve-parser", e.CacheParser = "cache-parser", e.DetectionParser = "detection-parser", e))(c || {});
const h = (e) => {
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
}, i = (e, r) => h(e).priority ?? r, t = {
  /** @ignore */
  _addHandlers: {},
  /** @ignore */
  _removeHandlers: {},
  /** @ignore */
  _queue: {},
  /**
   * Remove extensions from PixiJS.
   * @param extensions - Extensions to be removed.
   * @returns {PIXI.extensions} For chaining.
   */
  remove(...e) {
    return e.map(h).forEach((r) => {
      r.type.forEach((a) => {
        var n, s;
        return (s = (n = this._removeHandlers)[a]) == null ? void 0 : s.call(n, r);
      });
    }), this;
  },
  /**
   * Register new extensions with PixiJS.
   * @param extensions - The spread of extensions to add to PixiJS.
   * @returns {PIXI.extensions} For chaining.
   */
  add(...e) {
    return e.map(h).forEach((r) => {
      r.type.forEach((a) => {
        var d, o;
        const n = this._addHandlers, s = this._queue;
        n[a] ? (d = n[a]) == null || d.call(n, r) : (s[a] = s[a] || [], (o = s[a]) == null || o.push(r));
      });
    }), this;
  },
  /**
   * Internal method to handle extensions by name.
   * @param type - The extension type.
   * @param onAdd  - Function for handling when extensions are added/registered passes {@link PIXI.ExtensionFormat}.
   * @param onRemove  - Function for handling when extensions are removed/unregistered passes {@link PIXI.ExtensionFormat}.
   * @returns {PIXI.extensions} For chaining.
   */
  handle(e, r, a) {
    var o;
    const n = this._addHandlers, s = this._removeHandlers;
    if (n[e] || s[e])
      throw new Error(`Extension type ${e} already has a handler`);
    n[e] = r, s[e] = a;
    const d = this._queue;
    return d[e] && ((o = d[e]) == null || o.forEach((l) => r(l)), delete d[e]), this;
  },
  /**
   * Handle a type, but using a map by `name` property.
   * @param type - Type of extension to handle.
   * @param map - The object map of named extensions.
   * @returns {PIXI.extensions} For chaining.
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
   * Handle a type, but using a list of extensions.
   * @param type - Type of extension to handle.
   * @param list - The list of extensions.
   * @param defaultPriority - The default priority to use if none is specified.
   * @returns {PIXI.extensions} For chaining.
   */
  handleByList(e, r, a = -1) {
    return this.handle(
      e,
      (n) => {
        r.includes(n.ref) || (r.push(n.ref), r.sort((s, d) => i(d, a) - i(s, a)));
      },
      (n) => {
        const s = r.indexOf(n.ref);
        s !== -1 && r.splice(s, 1);
      }
    );
  }
};
export {
  c as ExtensionType,
  t as extensions
};
//# sourceMappingURL=index158.js.map

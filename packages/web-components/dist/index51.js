import { ENV as i } from "./index146.js";
import { ExtensionType as x, extensions as l } from "./index140.js";
import { settings as a } from "./index145.js";
import "./index36.js";
let o = 0;
class r {
  /** @param renderer - The renderer this System works for. */
  constructor(e) {
    this.renderer = e, this.webGLVersion = 1, this.extensions = {}, this.supports = {
      uint32Indices: !1
    }, this.handleContextLost = this.handleContextLost.bind(this), this.handleContextRestored = this.handleContextRestored.bind(this);
  }
  /**
   * `true` if the context is lost
   * @readonly
   */
  get isLost() {
    return !this.gl || this.gl.isContextLost();
  }
  /**
   * Handles the context change event.
   * @param {WebGLRenderingContext} gl - New WebGL context.
   */
  contextChange(e) {
    this.gl = e, this.renderer.gl = e, this.renderer.CONTEXT_UID = o++;
  }
  init(e) {
    if (e.context)
      this.initFromContext(e.context);
    else {
      const t = this.renderer.background.alpha < 1, n = e.premultipliedAlpha;
      this.preserveDrawingBuffer = e.preserveDrawingBuffer, this.useContextAlpha = e.useContextAlpha, this.powerPreference = e.powerPreference, this.initFromOptions({
        alpha: t,
        premultipliedAlpha: n,
        antialias: e.antialias,
        stencil: !0,
        preserveDrawingBuffer: e.preserveDrawingBuffer,
        powerPreference: e.powerPreference
      });
    }
  }
  /**
   * Initializes the context.
   * @protected
   * @param {WebGLRenderingContext} gl - WebGL context
   */
  initFromContext(e) {
    this.gl = e, this.validateContext(e), this.renderer.gl = e, this.renderer.CONTEXT_UID = o++, this.renderer.runners.contextChange.emit(e);
    const t = this.renderer.view;
    t.addEventListener !== void 0 && (t.addEventListener("webglcontextlost", this.handleContextLost, !1), t.addEventListener("webglcontextrestored", this.handleContextRestored, !1));
  }
  /**
   * Initialize from context options
   * @protected
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
   * @param {object} options - context attributes
   */
  initFromOptions(e) {
    const t = this.createContext(this.renderer.view, e);
    this.initFromContext(t);
  }
  /**
   * Helper class to create a WebGL Context
   * @param canvas - the canvas element that we will get the context from
   * @param options - An options object that gets passed in to the canvas element containing the
   *    context attributes
   * @see https://developer.mozilla.org/en/docs/Web/API/HTMLCanvasElement/getContext
   * @returns {WebGLRenderingContext} the WebGL context
   */
  createContext(e, t) {
    let n;
    if (a.PREFER_ENV >= i.WEBGL2 && (n = e.getContext("webgl2", t)), n)
      this.webGLVersion = 2;
    else if (this.webGLVersion = 1, n = e.getContext("webgl", t) || e.getContext("experimental-webgl", t), !n)
      throw new Error("This browser does not support WebGL. Try using the canvas renderer");
    return this.gl = n, this.getExtensions(), this.gl;
  }
  /** Auto-populate the {@link PIXI.ContextSystem.extensions extensions}. */
  getExtensions() {
    const { gl: e } = this, t = {
      loseContext: e.getExtension("WEBGL_lose_context"),
      anisotropicFiltering: e.getExtension("EXT_texture_filter_anisotropic"),
      floatTextureLinear: e.getExtension("OES_texture_float_linear"),
      s3tc: e.getExtension("WEBGL_compressed_texture_s3tc"),
      s3tc_sRGB: e.getExtension("WEBGL_compressed_texture_s3tc_srgb"),
      // eslint-disable-line camelcase
      etc: e.getExtension("WEBGL_compressed_texture_etc"),
      etc1: e.getExtension("WEBGL_compressed_texture_etc1"),
      pvrtc: e.getExtension("WEBGL_compressed_texture_pvrtc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),
      atc: e.getExtension("WEBGL_compressed_texture_atc"),
      astc: e.getExtension("WEBGL_compressed_texture_astc"),
      bptc: e.getExtension("EXT_texture_compression_bptc")
    };
    this.webGLVersion === 1 ? Object.assign(this.extensions, t, {
      drawBuffers: e.getExtension("WEBGL_draw_buffers"),
      depthTexture: e.getExtension("WEBGL_depth_texture"),
      vertexArrayObject: e.getExtension("OES_vertex_array_object") || e.getExtension("MOZ_OES_vertex_array_object") || e.getExtension("WEBKIT_OES_vertex_array_object"),
      uint32ElementIndex: e.getExtension("OES_element_index_uint"),
      // Floats and half-floats
      floatTexture: e.getExtension("OES_texture_float"),
      floatTextureLinear: e.getExtension("OES_texture_float_linear"),
      textureHalfFloat: e.getExtension("OES_texture_half_float"),
      textureHalfFloatLinear: e.getExtension("OES_texture_half_float_linear")
    }) : this.webGLVersion === 2 && Object.assign(this.extensions, t, {
      // Floats and half-floats
      colorBufferFloat: e.getExtension("EXT_color_buffer_float")
    });
  }
  /**
   * Handles a lost webgl context
   * @param {WebGLContextEvent} event - The context lost event.
   */
  handleContextLost(e) {
    e.preventDefault(), setTimeout(() => {
      this.gl.isContextLost() && this.extensions.loseContext && this.extensions.loseContext.restoreContext();
    }, 0);
  }
  /** Handles a restored webgl context. */
  handleContextRestored() {
    this.renderer.runners.contextChange.emit(this.gl);
  }
  destroy() {
    const e = this.renderer.view;
    this.renderer = null, e.removeEventListener !== void 0 && (e.removeEventListener("webglcontextlost", this.handleContextLost), e.removeEventListener("webglcontextrestored", this.handleContextRestored)), this.gl.useProgram(null), this.extensions.loseContext && this.extensions.loseContext.loseContext();
  }
  /** Handle the post-render runner event. */
  postrender() {
    this.renderer.objectRenderer.renderingToScreen && this.gl.flush();
  }
  /**
   * Validate context.
   * @param {WebGLRenderingContext} gl - Render context.
   */
  validateContext(e) {
    const t = e.getContextAttributes(), n = "WebGL2RenderingContext" in globalThis && e instanceof globalThis.WebGL2RenderingContext;
    n && (this.webGLVersion = 2), t && !t.stencil && console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly");
    const s = n || !!e.getExtension("OES_element_index_uint");
    this.supports.uint32Indices = s, s || console.warn("Provided WebGL context does not support 32 index buffer, complex graphics may not render correctly");
  }
}
r.defaultOptions = {
  /**
   * {@link PIXI.IRendererOptions.context}
   * @default null
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  context: null,
  /**
   * {@link PIXI.IRendererOptions.antialias}
   * @default false
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  antialias: !1,
  /**
   * {@link PIXI.IRendererOptions.premultipliedAlpha}
   * @default true
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  premultipliedAlpha: !0,
  /**
   * {@link PIXI.IRendererOptions.preserveDrawingBuffer}
   * @default false
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  preserveDrawingBuffer: !1,
  /**
   * {@link PIXI.IRendererOptions.powerPreference}
   * @default default
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  powerPreference: "default"
}, /** @ignore */
r.extension = {
  type: x.RendererSystem,
  name: "context"
};
l.add(r);
export {
  r as ContextSystem
};
//# sourceMappingURL=index51.js.map

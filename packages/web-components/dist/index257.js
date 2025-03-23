import { TYPES as E, FORMATS as G } from "./index164.js";
function I(R) {
  let _;
  return "WebGL2RenderingContext" in globalThis && R instanceof globalThis.WebGL2RenderingContext ? _ = {
    [E.UNSIGNED_BYTE]: {
      [G.RGBA]: R.RGBA8,
      [G.RGB]: R.RGB8,
      [G.RG]: R.RG8,
      [G.RED]: R.R8,
      [G.RGBA_INTEGER]: R.RGBA8UI,
      [G.RGB_INTEGER]: R.RGB8UI,
      [G.RG_INTEGER]: R.RG8UI,
      [G.RED_INTEGER]: R.R8UI,
      [G.ALPHA]: R.ALPHA,
      [G.LUMINANCE]: R.LUMINANCE,
      [G.LUMINANCE_ALPHA]: R.LUMINANCE_ALPHA
    },
    [E.BYTE]: {
      [G.RGBA]: R.RGBA8_SNORM,
      [G.RGB]: R.RGB8_SNORM,
      [G.RG]: R.RG8_SNORM,
      [G.RED]: R.R8_SNORM,
      [G.RGBA_INTEGER]: R.RGBA8I,
      [G.RGB_INTEGER]: R.RGB8I,
      [G.RG_INTEGER]: R.RG8I,
      [G.RED_INTEGER]: R.R8I
    },
    [E.UNSIGNED_SHORT]: {
      [G.RGBA_INTEGER]: R.RGBA16UI,
      [G.RGB_INTEGER]: R.RGB16UI,
      [G.RG_INTEGER]: R.RG16UI,
      [G.RED_INTEGER]: R.R16UI,
      [G.DEPTH_COMPONENT]: R.DEPTH_COMPONENT16
    },
    [E.SHORT]: {
      [G.RGBA_INTEGER]: R.RGBA16I,
      [G.RGB_INTEGER]: R.RGB16I,
      [G.RG_INTEGER]: R.RG16I,
      [G.RED_INTEGER]: R.R16I
    },
    [E.UNSIGNED_INT]: {
      [G.RGBA_INTEGER]: R.RGBA32UI,
      [G.RGB_INTEGER]: R.RGB32UI,
      [G.RG_INTEGER]: R.RG32UI,
      [G.RED_INTEGER]: R.R32UI,
      [G.DEPTH_COMPONENT]: R.DEPTH_COMPONENT24
    },
    [E.INT]: {
      [G.RGBA_INTEGER]: R.RGBA32I,
      [G.RGB_INTEGER]: R.RGB32I,
      [G.RG_INTEGER]: R.RG32I,
      [G.RED_INTEGER]: R.R32I
    },
    [E.FLOAT]: {
      [G.RGBA]: R.RGBA32F,
      [G.RGB]: R.RGB32F,
      [G.RG]: R.RG32F,
      [G.RED]: R.R32F,
      [G.DEPTH_COMPONENT]: R.DEPTH_COMPONENT32F
    },
    [E.HALF_FLOAT]: {
      [G.RGBA]: R.RGBA16F,
      [G.RGB]: R.RGB16F,
      [G.RG]: R.RG16F,
      [G.RED]: R.R16F
    },
    [E.UNSIGNED_SHORT_5_6_5]: {
      [G.RGB]: R.RGB565
    },
    [E.UNSIGNED_SHORT_4_4_4_4]: {
      [G.RGBA]: R.RGBA4
    },
    [E.UNSIGNED_SHORT_5_5_5_1]: {
      [G.RGBA]: R.RGB5_A1
    },
    [E.UNSIGNED_INT_2_10_10_10_REV]: {
      [G.RGBA]: R.RGB10_A2,
      [G.RGBA_INTEGER]: R.RGB10_A2UI
    },
    [E.UNSIGNED_INT_10F_11F_11F_REV]: {
      [G.RGB]: R.R11F_G11F_B10F
    },
    [E.UNSIGNED_INT_5_9_9_9_REV]: {
      [G.RGB]: R.RGB9_E5
    },
    [E.UNSIGNED_INT_24_8]: {
      [G.DEPTH_STENCIL]: R.DEPTH24_STENCIL8
    },
    [E.FLOAT_32_UNSIGNED_INT_24_8_REV]: {
      [G.DEPTH_STENCIL]: R.DEPTH32F_STENCIL8
    }
  } : _ = {
    [E.UNSIGNED_BYTE]: {
      [G.RGBA]: R.RGBA,
      [G.RGB]: R.RGB,
      [G.ALPHA]: R.ALPHA,
      [G.LUMINANCE]: R.LUMINANCE,
      [G.LUMINANCE_ALPHA]: R.LUMINANCE_ALPHA
    },
    [E.UNSIGNED_SHORT_5_6_5]: {
      [G.RGB]: R.RGB
    },
    [E.UNSIGNED_SHORT_4_4_4_4]: {
      [G.RGBA]: R.RGBA
    },
    [E.UNSIGNED_SHORT_5_5_5_1]: {
      [G.RGBA]: R.RGBA
    }
  }, _;
}
export {
  I as mapTypeAndFormatToInternalFormat
};
//# sourceMappingURL=index257.js.map

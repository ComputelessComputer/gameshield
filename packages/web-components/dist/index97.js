import { INTERNAL_FORMATS as r, INTERNAL_FORMAT_TO_BYTES_PER_PIXEL as c } from "./index162.js";
import "./index20.js";
import "./index21.js";
import "./index22.js";
import "./index23.js";
import "./index24.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import "./index28.js";
import "./index29.js";
import "./index30.js";
import "./index31.js";
import "./index32.js";
import "./index33.js";
import "./index34.js";
import "./index35.js";
import "./index36.js";
import "./index37.js";
import "./index38.js";
import "./index39.js";
import "./index40.js";
import "./index41.js";
import "./index42.js";
import "./index43.js";
import "./index44.js";
import "./index45.js";
import "./index46.js";
import "./index47.js";
import "./index48.js";
import "./index49.js";
import "./index50.js";
import "./index51.js";
import "./index52.js";
import "./index53.js";
import "./index54.js";
import "./index55.js";
import "./index56.js";
import "./index57.js";
import "./index58.js";
import "./index59.js";
import "./index60.js";
import "./index61.js";
import "./index62.js";
import "./index63.js";
import "./index64.js";
import "./index65.js";
import "./index66.js";
import "./index67.js";
import "./index68.js";
import "./index69.js";
import "./index70.js";
import "./index71.js";
import "./index72.js";
import "./index73.js";
import "./index74.js";
import "./index75.js";
import "./index76.js";
import "./index77.js";
import "./index78.js";
import { CompressedTextureResource as G } from "./index170.js";
const P = 4, D = 124, h = 32, U = 20, x = 542327876, p = {
  SIZE: 1,
  FLAGS: 2,
  HEIGHT: 3,
  WIDTH: 4,
  MIPMAP_COUNT: 7,
  PIXEL_FORMAT: 19
}, H = {
  SIZE: 0,
  FLAGS: 1,
  FOURCC: 2,
  RGB_BITCOUNT: 3,
  R_BIT_MASK: 4,
  G_BIT_MASK: 5,
  B_BIT_MASK: 6,
  A_BIT_MASK: 7
}, m = {
  DXGI_FORMAT: 0,
  RESOURCE_DIMENSION: 1,
  MISC_FLAG: 2,
  ARRAY_SIZE: 3,
  MISC_FLAGS2: 4
}, g = 1, v = 2, Y = 4, y = 64, Z = 512, z = 131072, K = 827611204, W = 861165636, b = 894720068, V = 808540228, k = 4, $ = {
  [K]: r.COMPRESSED_RGBA_S3TC_DXT1_EXT,
  [W]: r.COMPRESSED_RGBA_S3TC_DXT3_EXT,
  [b]: r.COMPRESSED_RGBA_S3TC_DXT5_EXT
}, j = {
  // WEBGL_compressed_texture_s3tc
  70: r.COMPRESSED_RGBA_S3TC_DXT1_EXT,
  71: r.COMPRESSED_RGBA_S3TC_DXT1_EXT,
  73: r.COMPRESSED_RGBA_S3TC_DXT3_EXT,
  74: r.COMPRESSED_RGBA_S3TC_DXT3_EXT,
  76: r.COMPRESSED_RGBA_S3TC_DXT5_EXT,
  77: r.COMPRESSED_RGBA_S3TC_DXT5_EXT,
  // WEBGL_compressed_texture_s3tc_srgb
  72: r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT,
  75: r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT,
  78: r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT,
  // EXT_texture_compression_bptc
  // BC6H
  96: r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT,
  95: r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT,
  // BC7
  98: r.COMPRESSED_RGBA_BPTC_UNORM_EXT,
  99: r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT
};
function et(t) {
  const O = new Uint32Array(t);
  if (O[0] !== x)
    throw new Error("Invalid DDS file magic word");
  const T = new Uint32Array(t, 0, D / Uint32Array.BYTES_PER_ELEMENT), n = T[p.HEIGHT], R = T[p.WIDTH], a = T[p.MIPMAP_COUNT], M = new Uint32Array(
    t,
    p.PIXEL_FORMAT * Uint32Array.BYTES_PER_ELEMENT,
    h / Uint32Array.BYTES_PER_ELEMENT
  ), _ = M[g];
  if (_ & Y) {
    const I = M[H.FOURCC];
    if (I !== V) {
      const o = $[I], e = P + D, E = new Uint8Array(t, e);
      return [new G(E, {
        format: o,
        width: R,
        height: n,
        levels: a
        // CompressedTextureResource will separate the levelBuffers for us!
      })];
    }
    const B = P + D, S = new Uint32Array(
      O.buffer,
      B,
      U / Uint32Array.BYTES_PER_ELEMENT
    ), X = S[m.DXGI_FORMAT], w = S[m.RESOURCE_DIMENSION], L = S[m.MISC_FLAG], F = S[m.ARRAY_SIZE], A = j[X];
    if (A === void 0)
      throw new Error(`DDSParser cannot parse texture data with DXGI format ${X}`);
    if (L === k)
      throw new Error("DDSParser does not support cubemap textures");
    if (w === 6)
      throw new Error("DDSParser does not supported 3D texture data");
    const C = new Array(), d = P + D + U;
    if (F === 1)
      C.push(new Uint8Array(t, d));
    else {
      const o = c[A];
      let e = 0, E = R, s = n;
      for (let i = 0; i < a; i++) {
        const u = Math.max(1, E + 3 & -4), f = Math.max(1, s + 3 & -4), N = u * f * o;
        e += N, E = E >>> 1, s = s >>> 1;
      }
      let l = d;
      for (let i = 0; i < F; i++)
        C.push(new Uint8Array(t, l, e)), l += e;
    }
    return C.map((o) => new G(o, {
      format: A,
      width: R,
      height: n,
      levels: a
    }));
  }
  throw _ & y ? new Error("DDSParser does not support uncompressed texture data.") : _ & Z ? new Error("DDSParser does not supported YUV uncompressed texture data.") : _ & z ? new Error("DDSParser does not support single-channel (lumninance) texture data!") : _ & v ? new Error("DDSParser does not support single-channel (alpha) texture data!") : new Error("DDSParser failed to load a texture file due to an unknown reason!");
}
export {
  et as parseDDS
};
//# sourceMappingURL=index97.js.map

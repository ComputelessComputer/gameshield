import "./index23.js";
import "./index24.js";
import { TYPES as E, FORMATS as o } from "./index164.js";
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
import { BufferResource as k } from "./index236.js";
import "./index79.js";
import "./index80.js";
import "./index81.js";
import { INTERNAL_FORMAT_TO_BYTES_PER_PIXEL as x } from "./index250.js";
import { CompressedTextureResource as X } from "./index251.js";
const H = [171, 75, 84, 88, 32, 49, 49, 187, 13, 10, 26, 10], W = 67305985, p = {
  FILE_IDENTIFIER: 0,
  ENDIANNESS: 12,
  GL_TYPE: 16,
  GL_TYPE_SIZE: 20,
  GL_FORMAT: 24,
  GL_INTERNAL_FORMAT: 28,
  GL_BASE_INTERNAL_FORMAT: 32,
  PIXEL_WIDTH: 36,
  PIXEL_HEIGHT: 40,
  PIXEL_DEPTH: 44,
  NUMBER_OF_ARRAY_ELEMENTS: 48,
  NUMBER_OF_FACES: 52,
  NUMBER_OF_MIPMAP_LEVELS: 56,
  BYTES_OF_KEY_VALUE_DATA: 60
}, c = 64, v = {
  [E.UNSIGNED_BYTE]: 1,
  [E.UNSIGNED_SHORT]: 2,
  [E.INT]: 4,
  [E.UNSIGNED_INT]: 4,
  [E.FLOAT]: 4,
  [E.HALF_FLOAT]: 8
}, K = {
  [o.RGBA]: 4,
  [o.RGB]: 3,
  [o.RG]: 2,
  [o.RED]: 1,
  [o.LUMINANCE]: 1,
  [o.LUMINANCE_ALPHA]: 2,
  [o.ALPHA]: 1
}, C = {
  [E.UNSIGNED_SHORT_4_4_4_4]: 2,
  [E.UNSIGNED_SHORT_5_5_5_1]: 2,
  [E.UNSIGNED_SHORT_5_6_5]: 2
};
function oe(m, a, _ = !1) {
  const i = new DataView(a);
  if (!V(m, i))
    return null;
  const r = i.getUint32(p.ENDIANNESS, !0) === W, t = i.getUint32(p.GL_TYPE, r), T = i.getUint32(p.GL_FORMAT, r), R = i.getUint32(p.GL_INTERNAL_FORMAT, r), n = i.getUint32(p.PIXEL_WIDTH, r), N = i.getUint32(p.PIXEL_HEIGHT, r) || 1, O = i.getUint32(p.PIXEL_DEPTH, r) || 1, d = i.getUint32(p.NUMBER_OF_ARRAY_ELEMENTS, r) || 1, Y = i.getUint32(p.NUMBER_OF_FACES, r), u = i.getUint32(p.NUMBER_OF_MIPMAP_LEVELS, r), h = i.getUint32(p.BYTES_OF_KEY_VALUE_DATA, r);
  if (N === 0 || O !== 1)
    throw new Error("Only 2D textures are supported");
  if (Y !== 1)
    throw new Error("CubeTextures are not supported by KTXLoader yet!");
  if (d !== 1)
    throw new Error("WebGL does not support array textures");
  const G = 4, P = 4, M = n + 3 & -4, b = N + 3 & -4, L = new Array(d);
  let B = n * N;
  t === 0 && (B = M * b);
  let f;
  if (t !== 0 ? v[t] ? f = v[t] * K[T] : f = C[t] : f = x[R], f === void 0)
    throw new Error("Unable to resolve the pixel format stored in the *.ktx file!");
  const w = _ ? Z(i, h, r) : null;
  let U = B * f, g = n, s = N, y = M, D = b, l = c + h;
  for (let e = 0; e < u; e++) {
    const I = i.getUint32(l, r);
    let A = l + 4;
    for (let S = 0; S < d; S++) {
      let F = L[S];
      F || (F = L[S] = new Array(u)), F[e] = {
        levelID: e,
        // don't align mipWidth when texture not compressed! (glType not zero)
        levelWidth: u > 1 || t !== 0 ? g : y,
        levelHeight: u > 1 || t !== 0 ? s : D,
        levelBuffer: new Uint8Array(a, A, U)
      }, A += U;
    }
    l += I + 4, l = l % 4 !== 0 ? l + 4 - l % 4 : l, g = g >> 1 || 1, s = s >> 1 || 1, y = g + G - 1 & ~(G - 1), D = s + P - 1 & ~(P - 1), U = y * D * f;
  }
  return t !== 0 ? {
    uncompressed: L.map((e) => {
      let I = e[0].levelBuffer, A = !1;
      return t === E.FLOAT ? I = new Float32Array(
        e[0].levelBuffer.buffer,
        e[0].levelBuffer.byteOffset,
        e[0].levelBuffer.byteLength / 4
      ) : t === E.UNSIGNED_INT ? (A = !0, I = new Uint32Array(
        e[0].levelBuffer.buffer,
        e[0].levelBuffer.byteOffset,
        e[0].levelBuffer.byteLength / 4
      )) : t === E.INT && (A = !0, I = new Int32Array(
        e[0].levelBuffer.buffer,
        e[0].levelBuffer.byteOffset,
        e[0].levelBuffer.byteLength / 4
      )), {
        resource: new k(
          I,
          {
            width: e[0].levelWidth,
            height: e[0].levelHeight
          }
        ),
        type: t,
        format: A ? z(T) : T
      };
    }),
    kvData: w
  } : {
    compressed: L.map((e) => new X(null, {
      format: R,
      width: n,
      height: N,
      levels: u,
      levelBuffers: e
    })),
    kvData: w
  };
}
function V(m, a) {
  for (let _ = 0; _ < H.length; _++)
    if (a.getUint8(_) !== H[_])
      return console.error(`${m} is not a valid *.ktx file!`), !1;
  return !0;
}
function z(m) {
  switch (m) {
    case o.RGBA:
      return o.RGBA_INTEGER;
    case o.RGB:
      return o.RGB_INTEGER;
    case o.RG:
      return o.RG_INTEGER;
    case o.RED:
      return o.RED_INTEGER;
    default:
      return m;
  }
}
function Z(m, a, _) {
  const i = /* @__PURE__ */ new Map();
  let r = 0;
  for (; r < a; ) {
    const t = m.getUint32(c + r, _), T = c + r + 4, R = 3 - (t + 3) % 4;
    if (t === 0 || t > a - r) {
      console.error("KTXLoader: keyAndValueByteSize out of bounds");
      break;
    }
    let n = 0;
    for (; n < t && m.getUint8(T + n) !== 0; n++)
      ;
    if (n === -1) {
      console.error("KTXLoader: Failed to find null byte terminating kvData key");
      break;
    }
    const N = new TextDecoder().decode(
      new Uint8Array(m.buffer, T, n)
    ), O = new DataView(
      m.buffer,
      T + n + 1,
      t - n - 1
    );
    i.set(N, O), r += 4 + t + R;
  }
  return i;
}
export {
  K as FORMATS_TO_COMPONENTS,
  v as TYPES_TO_BYTES_PER_COMPONENT,
  C as TYPES_TO_BYTES_PER_PIXEL,
  oe as parseKTX
};
//# sourceMappingURL=index101.js.map

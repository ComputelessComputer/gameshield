import { getAttributeInfoFromFormat as r } from "./index462.js";
const u = {
  f32: "float32",
  "vec2<f32>": "float32x2",
  "vec3<f32>": "float32x3",
  "vec4<f32>": "float32x4",
  vec2f: "float32x2",
  vec3f: "float32x3",
  vec4f: "float32x4",
  i32: "sint32",
  "vec2<i32>": "sint32x2",
  "vec3<i32>": "sint32x3",
  "vec4<i32>": "sint32x4",
  u32: "uint32",
  "vec2<u32>": "uint32x2",
  "vec3<u32>": "uint32x3",
  "vec4<u32>": "uint32x4",
  bool: "uint32",
  "vec2<bool>": "uint32x2",
  "vec3<bool>": "uint32x3",
  "vec4<bool>": "uint32x4"
};
function l({ source: n, entryPoint: f }) {
  const i = {}, o = n.indexOf(`fn ${f}`);
  if (o !== -1) {
    const e = n.indexOf("->", o);
    if (e !== -1) {
      const s = n.substring(o, e), a = /@location\((\d+)\)\s+([a-zA-Z0-9_]+)\s*:\s*([a-zA-Z0-9_<>]+)(?:,|\s|$)/g;
      let t;
      for (; (t = a.exec(s)) !== null; ) {
        const c = u[t[3]] ?? "float32";
        i[t[2]] = {
          location: parseInt(t[1], 10),
          format: c,
          stride: r(c).stride,
          offset: 0,
          instance: !1,
          start: 0
        };
      }
    }
  }
  return i;
}
export {
  l as extractAttributesFromGpuProgram
};
//# sourceMappingURL=index457.js.map

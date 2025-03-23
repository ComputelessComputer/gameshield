function n(e) {
  const r = new Array(e);
  for (let a = 0; a < r.length; a++)
    r[a] = !1;
  return r;
}
function t(e, r) {
  switch (e) {
    case "float":
      return 0;
    case "vec2":
      return new Float32Array(2 * r);
    case "vec3":
      return new Float32Array(3 * r);
    case "vec4":
      return new Float32Array(4 * r);
    case "int":
    case "uint":
    case "sampler2D":
    case "sampler2DArray":
      return 0;
    case "ivec2":
      return new Int32Array(2 * r);
    case "ivec3":
      return new Int32Array(3 * r);
    case "ivec4":
      return new Int32Array(4 * r);
    case "uvec2":
      return new Uint32Array(2 * r);
    case "uvec3":
      return new Uint32Array(3 * r);
    case "uvec4":
      return new Uint32Array(4 * r);
    case "bool":
      return !1;
    case "bvec2":
      return n(2 * r);
    case "bvec3":
      return n(3 * r);
    case "bvec4":
      return n(4 * r);
    case "mat2":
      return new Float32Array([
        1,
        0,
        0,
        1
      ]);
    case "mat3":
      return new Float32Array([
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1
      ]);
    case "mat4":
      return new Float32Array([
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      ]);
  }
  return null;
}
export {
  t as defaultValue
};
//# sourceMappingURL=index240.js.map

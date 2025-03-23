function a(e, r) {
  switch (e) {
    case "f32":
      return 0;
    case "vec2<f32>":
      return new Float32Array(2 * r);
    case "vec3<f32>":
      return new Float32Array(3 * r);
    case "vec4<f32>":
      return new Float32Array(4 * r);
    case "mat2x2<f32>":
      return new Float32Array([
        1,
        0,
        0,
        1
      ]);
    case "mat3x3<f32>":
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
    case "mat4x4<f32>":
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
  a as getDefaultUniformValue
};
//# sourceMappingURL=index470.js.map

import { UniformGroup as e } from "./index396.js";
const i = {};
function a(r) {
  let o = i[r];
  if (o)
    return o;
  const n = new Int32Array(r);
  for (let t = 0; t < r; t++)
    n[t] = t;
  return o = i[r] = new e({
    uTextures: { value: n, type: "i32", size: r }
  }, { isStatic: !0 }), o;
}
export {
  a as getBatchSamplersUniformGroup
};
//# sourceMappingURL=index430.js.map

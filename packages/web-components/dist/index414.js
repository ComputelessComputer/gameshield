import { BindGroup as s } from "./index394.js";
import { Texture as x } from "./index360.js";
import { getMaxTexturesPerBatch as a } from "./index412.js";
const p = {};
function G(r, o) {
  let e = 2166136261;
  for (let t = 0; t < o; t++)
    e ^= r[t].uid, e = Math.imul(e, 16777619), e >>>= 0;
  return p[e] || f(r, o, e);
}
let n = 0;
function f(r, o, e) {
  const t = {};
  let i = 0;
  n || (n = a());
  for (let u = 0; u < n; u++) {
    const d = u < o ? r[u] : x.EMPTY.source;
    t[i++] = d.source, t[i++] = d.style;
  }
  const c = new s(t);
  return p[e] = c, c;
}
export {
  G as getTextureBatchBindGroup
};
//# sourceMappingURL=index414.js.map

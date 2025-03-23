import "./index37.js";
import "./index33.js";
import "./index38.js";
import "./index39.js";
import "./index40.js";
import "./index21.js";
import "./index41.js";
import { getBufferType as g } from "./index222.js";
import "./index42.js";
const s = {
  Float32Array,
  Uint32Array,
  Int32Array,
  Uint8Array
};
function U(e, p) {
  let f = 0, m = 0;
  const n = {};
  for (let t = 0; t < e.length; t++)
    m += p[t], f += e[t].length;
  const a = new ArrayBuffer(f * 4);
  let u = null, y = 0;
  for (let t = 0; t < e.length; t++) {
    const i = p[t], l = e[t], o = g(l);
    n[o] || (n[o] = new s[o](a)), u = n[o];
    for (let r = 0; r < l.length; r++) {
      const A = (r / i | 0) * m + y, c = r % i;
      u[A + c] = l[r];
    }
    y += i;
  }
  return new Float32Array(a);
}
export {
  U as interleaveTypedArrays
};
//# sourceMappingURL=index223.js.map

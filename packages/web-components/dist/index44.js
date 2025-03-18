import "./index24.js";
import { BLEND_MODES as r } from "./index164.js";
function M() {
  const N = [], e = [];
  for (let o = 0; o < 32; o++)
    N[o] = o, e[o] = o;
  N[r.NORMAL_NPM] = r.NORMAL, N[r.ADD_NPM] = r.ADD, N[r.SCREEN_NPM] = r.SCREEN, e[r.NORMAL] = r.NORMAL_NPM, e[r.ADD] = r.ADD_NPM, e[r.SCREEN] = r.SCREEN_NPM;
  const t = [];
  return t.push(e), t.push(N), t;
}
const n = M();
function E(N, e) {
  return n[e ? 1 : 0][N];
}
export {
  E as correctBlendMode,
  n as premultiplyBlendMode
};
//# sourceMappingURL=index44.js.map

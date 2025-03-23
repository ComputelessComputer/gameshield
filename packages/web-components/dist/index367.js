import { path as c } from "./index363.js";
function a(e, r) {
  const o = e.split("?")[0], t = c.extname(o).toLowerCase();
  return Array.isArray(r) ? r.includes(t) : t === r;
}
export {
  a as checkExtension
};
//# sourceMappingURL=index367.js.map

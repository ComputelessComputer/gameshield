import { extensions as n, ExtensionType as o } from "./index158.js";
const t = [];
n.handleByList(o.Renderer, t);
function d(e) {
  for (const r of t)
    if (r.test(e))
      return new r(e);
  throw new Error("Unable to auto-detect a suitable renderer.");
}
export {
  d as autoDetectRenderer
};
//# sourceMappingURL=index43.js.map

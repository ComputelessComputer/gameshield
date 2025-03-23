import { getTestContext as n } from "./index413.js";
import { checkMaxIfStatementsInShader as o } from "./index411.js";
let e = null;
function c() {
  var r;
  if (e)
    return e;
  const t = n();
  return e = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS), e = o(
    e,
    t
  ), (r = t.getExtension("WEBGL_lose_context")) == null || r.loseContext(), e;
}
export {
  c as getMaxTexturesPerBatch
};
//# sourceMappingURL=index412.js.map

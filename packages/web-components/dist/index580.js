import { DOMAdapter as t } from "./index365.js";
function a() {
  const { userAgent: r } = t.get().getNavigator();
  return /^((?!chrome|android).)*safari/i.test(r);
}
export {
  a as isSafari
};
//# sourceMappingURL=index580.js.map

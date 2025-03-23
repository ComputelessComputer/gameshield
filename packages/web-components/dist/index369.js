import { Resolver as n } from "./index357.js";
function l(r, t = 1) {
  var o;
  const e = (o = n.RETINA_PREFIX) == null ? void 0 : o.exec(r);
  return e ? parseFloat(e[1]) : t;
}
export {
  l as getResolutionOfUrl
};
//# sourceMappingURL=index369.js.map

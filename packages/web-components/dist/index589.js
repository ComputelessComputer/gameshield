import { DOMAdapter as n } from "./index365.js";
async function i(a) {
  const o = await (await n.get().fetch(a)).blob(), e = new FileReader();
  return await new Promise((r, t) => {
    e.onloadend = () => r(e.result), e.onerror = t, e.readAsDataURL(o);
  });
}
export {
  i as loadFontAsBase64
};
//# sourceMappingURL=index589.js.map

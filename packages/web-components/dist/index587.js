import { HTMLTextRenderData as g } from "./index575.js";
let l;
function p(r, n, i, t) {
  t || (t = l || (l = new g()));
  const { domElement: e, styleElement: c, svgRoot: o } = t;
  e.innerHTML = `<style>${n.cssStyle};</style><div style='padding:0'>${r}</div>`, e.setAttribute("style", "transform-origin: top left; display: inline-block"), i && (c.textContent = i), document.body.appendChild(o);
  const d = e.getBoundingClientRect();
  o.remove();
  const s = n.padding * 2;
  return {
    width: d.width - s,
    height: d.height - s
  };
}
export {
  p as measureHtmlText
};
//# sourceMappingURL=index587.js.map

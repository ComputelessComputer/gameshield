function y(n, r, s, o, e) {
  const { domElement: i, styleElement: l, svgRoot: t } = e;
  i.innerHTML = `<style>${r.cssStyle}</style><div style='padding:0;'>${n}</div>`, i.setAttribute("style", `transform: scale(${s});transform-origin: top left; display: inline-block`), l.textContent = o;
  const { width: g, height: d } = e.image;
  return t.setAttribute("width", g.toString()), t.setAttribute("height", d.toString()), new XMLSerializer().serializeToString(t);
}
export {
  y as getSVGUrl
};
//# sourceMappingURL=index584.js.map

const t = "http://www.w3.org/2000/svg", n = "http://www.w3.org/1999/xhtml";
class m {
  constructor() {
    this.svgRoot = document.createElementNS(t, "svg"), this.foreignObject = document.createElementNS(t, "foreignObject"), this.domElement = document.createElementNS(n, "div"), this.styleElement = document.createElementNS(n, "style"), this.image = new Image();
    const { foreignObject: e, svgRoot: s, styleElement: o, domElement: i } = this;
    e.setAttribute("width", "10000"), e.setAttribute("height", "10000"), e.style.overflow = "hidden", s.appendChild(e), e.appendChild(o), e.appendChild(i);
  }
}
export {
  m as HTMLTextRenderData,
  t as nssvg,
  n as nsxhtml
};
//# sourceMappingURL=index575.js.map

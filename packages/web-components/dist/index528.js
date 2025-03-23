import { Color as p } from "./index377.js";
import { warn as u } from "./index338.js";
import { FillGradient as c } from "./index517.js";
import { parseSVGFloatAttribute as n } from "./index529.js";
function w(t, i) {
  const a = t.querySelectorAll("defs");
  for (let o = 0; o < a.length; o++) {
    const s = a[o];
    for (let r = 0; r < s.children.length; r++) {
      const e = s.children[r];
      switch (e.nodeName.toLowerCase()) {
        case "lineargradient":
          i.defs[e.id] = m(e);
          break;
        case "radialgradient":
          i.defs[e.id] = b();
          break;
      }
    }
  }
}
function m(t) {
  const i = n(t, "x1", 0), a = n(t, "y1", 0), o = n(t, "x2", 1), s = n(t, "y2", 0), r = t.getAttribute("gradientUnits") || "objectBoundingBox", e = new c(
    i,
    a,
    o,
    s,
    r === "objectBoundingBox" ? "local" : "global"
  );
  for (let d = 0; d < t.children.length; d++) {
    const l = t.children[d], f = n(l, "offset", 0), g = p.shared.setValue(l.getAttribute("stop-color")).toNumber();
    e.addColorStop(f, g);
  }
  return e;
}
function b(t) {
  return u("[SVG Parser] Radial gradients are not yet supported"), new c(0, 0, 1, 0);
}
export {
  w as parseSVGDefinitions
};
//# sourceMappingURL=index528.js.map

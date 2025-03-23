import { warn as I } from "./index338.js";
import { GraphicsPath as q } from "./index520.js";
import { parseSVGDefinitions as H } from "./index528.js";
import { parseSVGFloatAttribute as n } from "./index529.js";
import { parseSVGStyle as D } from "./index531.js";
function B(t, e) {
  if (typeof t == "string") {
    const o = document.createElement("div");
    o.innerHTML = t.trim(), t = o.querySelector("svg");
  }
  const r = {
    context: e,
    defs: {},
    path: new q()
  };
  H(t, r);
  const c = t.children, { fillStyle: f, strokeStyle: i } = D(t, r);
  for (let o = 0; o < c.length; o++) {
    const x = c[o];
    x.nodeName.toLowerCase() !== "defs" && F(x, r, f, i);
  }
  return e;
}
function F(t, e, r, c) {
  const f = t.children, { fillStyle: i, strokeStyle: o } = D(t, e);
  i && r ? r = { ...r, ...i } : i && (r = i), o && c ? c = { ...c, ...o } : o && (c = o);
  const x = !r && !c;
  x && (r = { color: 0 });
  let l, w, P, L, N, T, h, m, G, p, d, u, b, C, E, V, A;
  switch (t.nodeName.toLowerCase()) {
    case "path":
      C = t.getAttribute("d"), t.getAttribute("fill-rule") === "evenodd" && I("SVG Evenodd fill rule not supported, your svg may render incorrectly"), E = new q(C, !0), e.context.path(E), r && e.context.fill(r), c && e.context.stroke(c);
      break;
    case "circle":
      h = n(t, "cx", 0), m = n(t, "cy", 0), G = n(t, "r", 0), e.context.ellipse(h, m, G, G), r && e.context.fill(r), c && e.context.stroke(c);
      break;
    case "rect":
      l = n(t, "x", 0), w = n(t, "y", 0), V = n(t, "width", 0), A = n(t, "height", 0), p = n(t, "rx", 0), d = n(t, "ry", 0), p || d ? e.context.roundRect(l, w, V, A, p || d) : e.context.rect(l, w, V, A), r && e.context.fill(r), c && e.context.stroke(c);
      break;
    case "ellipse":
      h = n(t, "cx", 0), m = n(t, "cy", 0), p = n(t, "rx", 0), d = n(t, "ry", 0), e.context.beginPath(), e.context.ellipse(h, m, p, d), r && e.context.fill(r), c && e.context.stroke(c);
      break;
    case "line":
      P = n(t, "x1", 0), L = n(t, "y1", 0), N = n(t, "x2", 0), T = n(t, "y2", 0), e.context.beginPath(), e.context.moveTo(P, L), e.context.lineTo(N, T), c && e.context.stroke(c);
      break;
    case "polygon":
      b = t.getAttribute("points"), u = b.match(/\d+/g).map((a) => parseInt(a, 10)), e.context.poly(u, !0), r && e.context.fill(r), c && e.context.stroke(c);
      break;
    case "polyline":
      b = t.getAttribute("points"), u = b.match(/\d+/g).map((a) => parseInt(a, 10)), e.context.poly(u, !1), c && e.context.stroke(c);
      break;
    case "g":
    case "svg":
      break;
    default: {
      I(`[SVG parser] <${t.nodeName}> elements unsupported`);
      break;
    }
  }
  x && (r = null);
  for (let a = 0; a < f.length; a++)
    F(f[a], e, r, c);
}
export {
  B as SVGParser
};
//# sourceMappingURL=index521.js.map

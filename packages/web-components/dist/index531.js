import { Color as n } from "./index377.js";
import { extractSvgUrlId as y } from "./index532.js";
const c = {
  // Fill properties
  fill: { type: "paint", default: 0 },
  // Fill color/gradient
  "fill-opacity": { type: "number", default: 1 },
  // Fill transparency
  // Stroke properties
  stroke: { type: "paint", default: 0 },
  // Stroke color/gradient
  "stroke-width": { type: "number", default: 1 },
  // Width of stroke
  "stroke-opacity": { type: "number", default: 1 },
  // Stroke transparency
  "stroke-linecap": { type: "string", default: "butt" },
  // End cap style: butt, round, square
  "stroke-linejoin": { type: "string", default: "miter" },
  // Join style: miter, round, bevel
  "stroke-miterlimit": { type: "number", default: 10 },
  // Limit on miter join sharpness
  "stroke-dasharray": { type: "string", default: "none" },
  // Dash pattern
  "stroke-dashoffset": { type: "number", default: 0 },
  // Offset for dash pattern
  // Global properties
  opacity: { type: "number", default: 1 }
  // Overall opacity
};
function m(s, e) {
  const a = s.getAttribute("style"), t = {}, r = {}, l = {
    strokeStyle: t,
    fillStyle: r,
    useFill: !1,
    useStroke: !1
  };
  for (const o in c) {
    const i = s.getAttribute(o);
    i && k(e, l, o, i.trim());
  }
  if (a) {
    const o = a.split(";");
    for (let i = 0; i < o.length; i++) {
      const p = o[i].trim(), [f, u] = p.split(":");
      c[f] && k(e, l, f, u.trim());
    }
  }
  return {
    strokeStyle: l.useStroke ? t : null,
    fillStyle: l.useFill ? r : null,
    useFill: l.useFill,
    useStroke: l.useStroke
  };
}
function k(s, e, a, t) {
  switch (a) {
    case "stroke":
      if (t !== "none") {
        if (t.startsWith("url(")) {
          const r = y(t);
          e.strokeStyle.fill = s.defs[r];
        } else
          e.strokeStyle.color = n.shared.setValue(t).toNumber();
        e.useStroke = !0;
      }
      break;
    case "stroke-width":
      e.strokeStyle.width = Number(t);
      break;
    case "fill":
      if (t !== "none") {
        if (t.startsWith("url(")) {
          const r = y(t);
          e.fillStyle.fill = s.defs[r];
        } else
          e.fillStyle.color = n.shared.setValue(t).toNumber();
        e.useFill = !0;
      }
      break;
    case "fill-opacity":
      e.fillStyle.alpha = Number(t);
      break;
    case "stroke-opacity":
      e.strokeStyle.alpha = Number(t);
      break;
    case "opacity":
      e.fillStyle.alpha = Number(t), e.strokeStyle.alpha = Number(t);
      break;
  }
}
export {
  k as parseAttribute,
  m as parseSVGStyle,
  c as styleAttributes
};
//# sourceMappingURL=index531.js.map

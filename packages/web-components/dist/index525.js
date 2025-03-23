import u from "./index530.js";
import { warn as k } from "./index338.js";
function v(i, o) {
  const b = u(i), n = [];
  let s = null, r = 0, a = 0;
  for (let t = 0; t < b.length; t++) {
    const l = b[t], c = l[0], e = l;
    switch (c) {
      case "M":
        r = e[1], a = e[2], o.moveTo(r, a);
        break;
      case "m":
        r += e[1], a += e[2], o.moveTo(r, a);
        break;
      case "H":
        r = e[1], o.lineTo(r, a);
        break;
      case "h":
        r += e[1], o.lineTo(r, a);
        break;
      case "V":
        a = e[1], o.lineTo(r, a);
        break;
      case "v":
        a += e[1], o.lineTo(r, a);
        break;
      case "L":
        r = e[1], a = e[2], o.lineTo(r, a);
        break;
      case "l":
        r += e[1], a += e[2], o.lineTo(r, a);
        break;
      case "C":
        r = e[5], a = e[6], o.bezierCurveTo(
          e[1],
          e[2],
          // First control point
          e[3],
          e[4],
          // Second control point
          r,
          a
          // End point
        );
        break;
      case "c":
        o.bezierCurveTo(
          r + e[1],
          a + e[2],
          // First control point
          r + e[3],
          a + e[4],
          // Second control point
          r + e[5],
          a + e[6]
          // End point
        ), r += e[5], a += e[6];
        break;
      case "S":
        r = e[3], a = e[4], o.bezierCurveToShort(
          e[1],
          e[2],
          // Control point
          r,
          a
          // End point
        );
        break;
      case "s":
        o.bezierCurveToShort(
          r + e[1],
          a + e[2],
          // Control point
          r + e[3],
          a + e[4]
          // End point
        ), r += e[3], a += e[4];
        break;
      case "Q":
        r = e[3], a = e[4], o.quadraticCurveTo(
          e[1],
          e[2],
          // Control point
          r,
          a
          // End point
        );
        break;
      case "q":
        o.quadraticCurveTo(
          r + e[1],
          a + e[2],
          // Control point
          r + e[3],
          a + e[4]
          // End point
        ), r += e[3], a += e[4];
        break;
      case "T":
        r = e[1], a = e[2], o.quadraticCurveToShort(
          r,
          a
          // End point
        );
        break;
      case "t":
        r += e[1], a += e[2], o.quadraticCurveToShort(
          r,
          a
          // End point
        );
        break;
      case "A":
        r = e[6], a = e[7], o.arcToSvg(
          e[1],
          // rx
          e[2],
          // ry
          e[3],
          // x-axis-rotation
          e[4],
          // large-arc-flag
          e[5],
          // sweep-flag
          r,
          a
          // End point
        );
        break;
      case "a":
        r += e[6], a += e[7], o.arcToSvg(
          e[1],
          // rx
          e[2],
          // ry
          e[3],
          // x-axis-rotation
          e[4],
          // large-arc-flag
          e[5],
          // sweep-flag
          r,
          a
          // End point
        );
        break;
      case "Z":
      case "z":
        o.closePath(), n.length > 0 && (s = n.pop(), s ? (r = s.startX, a = s.startY) : (r = 0, a = 0)), s = null;
        break;
      default:
        k(`Unknown SVG path command: ${c}`);
    }
    c !== "Z" && c !== "z" && s === null && (s = { startX: r, startY: a }, n.push(s));
  }
  return o;
}
export {
  v as parseSVGPath
};
//# sourceMappingURL=index525.js.map

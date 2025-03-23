import "./index20.js";
import { Color as S } from "./index21.js";
import "./index22.js";
import "./index23.js";
import "./index24.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import "./index28.js";
import "./index29.js";
import "./index30.js";
import "./index31.js";
import "./index32.js";
import "./index33.js";
import "./index34.js";
import "./index35.js";
import "./index36.js";
import "./index37.js";
import "./index38.js";
import "./index39.js";
import "./index40.js";
import "./index41.js";
import "./index42.js";
import "./index43.js";
import "./index44.js";
import "./index45.js";
import "./index46.js";
import "./index47.js";
import "./index48.js";
import "./index49.js";
import "./index50.js";
import "./index51.js";
import "./index52.js";
import "./index53.js";
import "./index54.js";
import "./index55.js";
import "./index56.js";
import "./index57.js";
import "./index58.js";
import "./index59.js";
import "./index60.js";
import "./index61.js";
import "./index62.js";
import "./index63.js";
import "./index64.js";
import "./index65.js";
import "./index66.js";
import "./index67.js";
import "./index68.js";
import "./index69.js";
import "./index70.js";
import "./index71.js";
import "./index72.js";
import "./index73.js";
import "./index74.js";
import "./index75.js";
import "./index76.js";
import "./index77.js";
import "./index78.js";
import { generateFillStyle as k } from "./index608.js";
function Or(s, r, i, f, w, p, o) {
  const m = i.text, t = i.fontProperties;
  r.translate(f, w), r.scale(p, p);
  const a = o.strokeThickness / 2, d = -(o.strokeThickness / 2);
  if (r.font = o.toFontString(), r.lineWidth = o.strokeThickness, r.textBaseline = o.textBaseline, r.lineJoin = o.lineJoin, r.miterLimit = o.miterLimit, r.fillStyle = k(s, r, o, p, [m], i), r.strokeStyle = o.stroke, o.dropShadow) {
    const l = o.dropShadowColor, e = o.dropShadowBlur * p, h = o.dropShadowDistance * p;
    r.shadowColor = S.shared.setValue(l).setAlpha(o.dropShadowAlpha).toRgbaString(), r.shadowBlur = e, r.shadowOffsetX = Math.cos(o.dropShadowAngle) * h, r.shadowOffsetY = Math.sin(o.dropShadowAngle) * h;
  } else
    r.shadowColor = "black", r.shadowBlur = 0, r.shadowOffsetX = 0, r.shadowOffsetY = 0;
  o.stroke && o.strokeThickness && r.strokeText(m, a, d + i.lineHeight - t.descent), o.fill && r.fillText(m, a, d + i.lineHeight - t.descent), r.setTransform(1, 0, 0, 1, 0, 0), r.fillStyle = "rgba(0, 0, 0, 0)";
}
export {
  Or as drawGlyph
};
//# sourceMappingURL=index307.js.map

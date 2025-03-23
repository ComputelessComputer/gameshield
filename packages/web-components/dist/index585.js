import { CanvasPool as e } from "./index473.js";
function c(t, a) {
  const n = e.getOptimalCanvasAndContext(
    t.width,
    t.height,
    a
  ), { context: o } = n;
  return o.clearRect(0, 0, t.width, t.height), o.drawImage(t, 0, 0), n;
}
export {
  c as getTemporaryCanvasFromImage
};
//# sourceMappingURL=index585.js.map

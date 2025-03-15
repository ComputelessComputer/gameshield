import { getCanvasBoundingBox as r } from "./index306.js";
function l(n) {
  const t = r(n), { width: o, height: e } = t;
  let i = null;
  if (!t.isEmpty()) {
    const a = n.getContext("2d");
    if (a === null)
      throw new TypeError("Failed to get canvas 2D context");
    i = a.getImageData(
      t.left,
      t.top,
      o,
      e
    );
  }
  return { width: o, height: e, data: i };
}
export {
  l as trimCanvas
};
//# sourceMappingURL=index285.js.map

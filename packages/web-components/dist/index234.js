import { PRECISION as e } from "./index164.js";
function t(i, n, r) {
  if (i.substring(0, 9) !== "precision") {
    let p = n;
    return n === e.HIGH && r !== e.HIGH && (p = e.MEDIUM), `precision ${p} float;
${i}`;
  } else if (r !== e.HIGH && i.substring(0, 15) === "precision highp")
    return i.replace("precision highp", "precision mediump");
  return i;
}
export {
  t as setPrecision
};
//# sourceMappingURL=index234.js.map

import { warn as p } from "./index338.js";
function d(o, n, s) {
  if (o)
    for (const e in o) {
      const a = e.toLocaleLowerCase(), i = n[a];
      if (i) {
        let t = o[e];
        e === "header" && (t = t.replace(/@in\s+[^;]+;\s*/g, "").replace(/@out\s+[^;]+;\s*/g, "")), s && i.push(`//----${s}----//`), i.push(t);
      } else
        p(`${e} placement hook does not exist in shader`);
    }
}
export {
  d as addBits
};
//# sourceMappingURL=index437.js.map

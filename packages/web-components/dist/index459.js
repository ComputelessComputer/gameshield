import { ShaderStage as t } from "./index463.js";
function o({ groups: r }) {
  const e = [];
  for (let n = 0; n < r.length; n++) {
    const i = r[n];
    e[i.group] || (e[i.group] = []), i.isUniform ? e[i.group].push({
      binding: i.binding,
      visibility: t.VERTEX | t.FRAGMENT,
      buffer: {
        type: "uniform"
      }
    }) : i.type === "sampler" ? e[i.group].push({
      binding: i.binding,
      visibility: t.FRAGMENT,
      sampler: {
        type: "filtering"
      }
    }) : i.type === "texture_2d" && e[i.group].push({
      binding: i.binding,
      visibility: t.FRAGMENT,
      texture: {
        sampleType: "float",
        viewDimension: "2d",
        multisampled: !1
      }
    });
  }
  return e;
}
export {
  o as generateGpuLayoutGroups
};
//# sourceMappingURL=index459.js.map

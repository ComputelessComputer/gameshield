function t(e, i, n) {
  const p = n ? i.maxSupportedFragmentPrecision : i.maxSupportedVertexPrecision;
  if (e.substring(0, 9) !== "precision") {
    let r = n ? i.requestedFragmentPrecision : i.requestedVertexPrecision;
    return r === "highp" && p !== "highp" && (r = "mediump"), `precision ${r} float;
${e}`;
  } else if (p !== "highp" && e.substring(0, 15) === "precision highp")
    return e.replace("precision highp", "precision mediump");
  return e;
}
export {
  t as ensurePrecision
};
//# sourceMappingURL=index453.js.map

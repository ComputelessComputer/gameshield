var n = /* @__PURE__ */ ((e) => (e.MITER = "miter", e.BEVEL = "bevel", e.ROUND = "round", e))(n || {}), i = /* @__PURE__ */ ((e) => (e.BUTT = "butt", e.ROUND = "round", e.SQUARE = "square", e))(i || {});
const m = {
  adaptive: !0,
  maxLength: 10,
  minSegments: 8,
  maxSegments: 2048,
  epsilon: 1e-4,
  _segmentsCount(e, s = 20) {
    if (!this.adaptive || !e || isNaN(e))
      return s;
    let t = Math.ceil(e / this.maxLength);
    return t < this.minSegments ? t = this.minSegments : t > this.maxSegments && (t = this.maxSegments), t;
  }
};
export {
  i as LINE_CAP,
  n as LINE_JOIN,
  m as curves
};
//# sourceMappingURL=index264.js.map

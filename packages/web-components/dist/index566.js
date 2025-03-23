function v(h, e, s, c) {
  const t = {
    width: 0,
    height: 0,
    offsetY: 0,
    scale: e.fontSize / s.baseMeasurementFontSize,
    lines: [{
      width: 0,
      charPositions: [],
      spaceWidth: 0,
      spacesIndex: [],
      chars: []
    }]
  };
  t.offsetY = s.baseLineOffset;
  let i = t.lines[0], l = null, p = !0;
  const o = {
    spaceWord: !1,
    width: 0,
    start: 0,
    index: 0,
    // use index to not modify the array as we use it a lot!
    positions: [],
    chars: []
  }, g = (a) => {
    const n = i.width;
    for (let r = 0; r < o.index; r++) {
      const f = a.positions[r];
      i.chars.push(a.chars[r]), i.charPositions.push(f + n);
    }
    i.width += a.width, p = !1, o.width = 0, o.index = 0, o.chars.length = 0;
  }, d = () => {
    let a = i.chars.length - 1;
    if (c) {
      let n = i.chars[a];
      for (; n === " "; )
        i.width -= s.chars[n].xAdvance, n = i.chars[--a];
    }
    t.width = Math.max(t.width, i.width), i = {
      width: 0,
      charPositions: [],
      chars: [],
      spaceWidth: 0,
      spacesIndex: []
    }, p = !0, t.lines.push(i), t.height += s.lineHeight;
  }, u = s.baseMeasurementFontSize / e.fontSize, x = e.letterSpacing * u, P = e.wordWrapWidth * u;
  for (let a = 0; a < h.length + 1; a++) {
    let n;
    const r = a === h.length;
    r || (n = h[a]);
    const f = s.chars[n] || s.chars[" "];
    if (/(?:\s)/.test(n) || n === "\r" || n === `
` || r) {
      if (!p && e.wordWrap && i.width + o.width - x > P ? (d(), g(o), r || i.charPositions.push(0)) : (o.start = i.width, g(o), r || i.charPositions.push(0)), n === "\r" || n === `
`)
        i.width !== 0 && d();
      else if (!r) {
        const w = f.xAdvance + (f.kerning[l] || 0) + x;
        i.width += w, i.spaceWidth = w, i.spacesIndex.push(i.charPositions.length), i.chars.push(n);
      }
    } else {
      const W = f.kerning[l] || 0, w = f.xAdvance + W + x;
      o.positions[o.index++] = o.width + W, o.chars.push(n), o.width += w;
    }
    l = n;
  }
  return d(), e.align === "center" ? S(t) : e.align === "right" ? j(t) : e.align === "justify" && I(t), t;
}
function S(h) {
  for (let e = 0; e < h.lines.length; e++) {
    const s = h.lines[e], c = h.width / 2 - s.width / 2;
    for (let t = 0; t < s.charPositions.length; t++)
      s.charPositions[t] += c;
  }
}
function j(h) {
  for (let e = 0; e < h.lines.length; e++) {
    const s = h.lines[e], c = h.width - s.width;
    for (let t = 0; t < s.charPositions.length; t++)
      s.charPositions[t] += c;
  }
}
function I(h) {
  const e = h.width;
  for (let s = 0; s < h.lines.length; s++) {
    const c = h.lines[s];
    let t = 0, i = c.spacesIndex[t++], l = 0;
    const p = c.spacesIndex.length, g = (e - c.width) / p;
    for (let d = 0; d < c.charPositions.length; d++)
      d === i && (i = c.spacesIndex[t++], l += g), c.charPositions[d] += l;
  }
}
export {
  v as getBitmapTextLayout
};
//# sourceMappingURL=index566.js.map

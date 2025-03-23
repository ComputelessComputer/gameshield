const u = {
  test(a) {
    const t = a;
    return typeof t != "string" && "getElementsByTagName" in t && t.getElementsByTagName("page").length && t.getElementsByTagName("info")[0].getAttribute("face") !== null;
  },
  parse(a) {
    const t = {
      chars: {},
      pages: [],
      lineHeight: 0,
      fontSize: 0,
      fontFamily: "",
      distanceField: null,
      baseLineOffset: 0
    }, f = a.getElementsByTagName("info")[0], p = a.getElementsByTagName("common")[0], g = a.getElementsByTagName("distanceField")[0];
    g && (t.distanceField = {
      type: g.getAttribute("fieldType"),
      range: parseInt(g.getAttribute("distanceRange"), 10)
    });
    const o = a.getElementsByTagName("page"), l = a.getElementsByTagName("char"), s = a.getElementsByTagName("kerning");
    t.fontSize = parseInt(f.getAttribute("size"), 10), t.fontFamily = f.getAttribute("face"), t.lineHeight = parseInt(p.getAttribute("lineHeight"), 10);
    for (let e = 0; e < o.length; e++)
      t.pages.push({
        id: parseInt(o[e].getAttribute("id"), 10) || 0,
        file: o[e].getAttribute("file")
      });
    const c = {};
    t.baseLineOffset = t.lineHeight - parseInt(p.getAttribute("base"), 10);
    for (let e = 0; e < l.length; e++) {
      const n = l[e], r = parseInt(n.getAttribute("id"), 10);
      let i = n.getAttribute("letter") ?? n.getAttribute("char") ?? String.fromCharCode(r);
      i === "space" && (i = " "), c[r] = i, t.chars[i] = {
        id: r,
        // texture deets..
        page: parseInt(n.getAttribute("page"), 10) || 0,
        x: parseInt(n.getAttribute("x"), 10),
        y: parseInt(n.getAttribute("y"), 10),
        width: parseInt(n.getAttribute("width"), 10),
        height: parseInt(n.getAttribute("height"), 10),
        // render deets..
        xOffset: parseInt(n.getAttribute("xoffset"), 10),
        yOffset: parseInt(n.getAttribute("yoffset"), 10),
        // + baseLineOffset,
        xAdvance: parseInt(n.getAttribute("xadvance"), 10),
        kerning: {}
      };
    }
    for (let e = 0; e < s.length; e++) {
      const n = parseInt(s[e].getAttribute("first"), 10), r = parseInt(s[e].getAttribute("second"), 10), i = parseInt(s[e].getAttribute("amount"), 10);
      t.chars[c[r]].kerning[c[n]] = i;
    }
    return t;
  }
};
export {
  u as bitmapFontXMLParser
};
//# sourceMappingURL=index560.js.map

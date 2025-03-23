const k = {
  test(o) {
    return typeof o == "string" && o.startsWith("info face=");
  },
  parse(o) {
    const c = o.match(/^[a-z]+\s+.+$/gm), i = {
      info: [],
      common: [],
      page: [],
      char: [],
      chars: [],
      kerning: [],
      kernings: [],
      distanceField: []
    };
    for (const t in c) {
      const e = c[t].match(/^[a-z]+/gm)[0], a = c[t].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm), s = {};
      for (const y in a) {
        const m = a[y].split("="), F = m[0], I = m[1].replace(/"/gm, ""), u = parseFloat(I), x = isNaN(u) ? I : u;
        s[F] = x;
      }
      i[e].push(s);
    }
    const n = {
      chars: {},
      pages: [],
      lineHeight: 0,
      fontSize: 0,
      fontFamily: "",
      distanceField: null,
      baseLineOffset: 0
    }, [g] = i.info, [h] = i.common, [f] = i.distanceField ?? [];
    f && (n.distanceField = {
      range: parseInt(f.distanceRange, 10),
      type: f.fieldType
    }), n.fontSize = parseInt(g.size, 10), n.fontFamily = g.face, n.lineHeight = parseInt(h.lineHeight, 10);
    const p = i.page;
    for (let t = 0; t < p.length; t++)
      n.pages.push({
        id: parseInt(p[t].id, 10) || 0,
        file: p[t].file
      });
    const l = {};
    n.baseLineOffset = n.lineHeight - parseInt(h.base, 10);
    const d = i.char;
    for (let t = 0; t < d.length; t++) {
      const e = d[t], a = parseInt(e.id, 10);
      let s = e.letter ?? e.char ?? String.fromCharCode(a);
      s === "space" && (s = " "), l[a] = s, n.chars[s] = {
        id: a,
        // texture deets..
        page: parseInt(e.page, 10) || 0,
        x: parseInt(e.x, 10),
        y: parseInt(e.y, 10),
        width: parseInt(e.width, 10),
        height: parseInt(e.height, 10),
        xOffset: parseInt(e.xoffset, 10),
        yOffset: parseInt(e.yoffset, 10),
        xAdvance: parseInt(e.xadvance, 10),
        kerning: {}
      };
    }
    const r = i.kerning || [];
    for (let t = 0; t < r.length; t++) {
      const e = parseInt(r[t].first, 10), a = parseInt(r[t].second, 10), s = parseInt(r[t].amount, 10);
      n.chars[l[a]].kerning[l[e]] = s;
    }
    return n;
  }
};
export {
  k as bitmapFontTextParser
};
//# sourceMappingURL=index559.js.map

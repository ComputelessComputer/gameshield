import { BitmapFontData as l } from "./index286.js";
class m {
  /**
   * Check if resource refers to xml font data.
   * @param data
   * @returns - True if resource could be treated as font data, false otherwise.
   */
  static test(e) {
    const n = e;
    return typeof e != "string" && "getElementsByTagName" in e && n.getElementsByTagName("page").length && n.getElementsByTagName("info")[0].getAttribute("face") !== null;
  }
  /**
   * Convert the XML into BitmapFontData that we can use.
   * @param xml
   * @returns - Data to use for BitmapFont
   */
  static parse(e) {
    const n = new l(), g = e.getElementsByTagName("info"), p = e.getElementsByTagName("common"), r = e.getElementsByTagName("page"), o = e.getElementsByTagName("char"), a = e.getElementsByTagName("kerning"), s = e.getElementsByTagName("distanceField");
    for (let t = 0; t < g.length; t++)
      n.info.push({
        face: g[t].getAttribute("face"),
        size: parseInt(g[t].getAttribute("size"), 10)
      });
    for (let t = 0; t < p.length; t++)
      n.common.push({
        lineHeight: parseInt(p[t].getAttribute("lineHeight"), 10)
      });
    for (let t = 0; t < r.length; t++)
      n.page.push({
        id: parseInt(r[t].getAttribute("id"), 10) || 0,
        file: r[t].getAttribute("file")
      });
    for (let t = 0; t < o.length; t++) {
      const i = o[t];
      n.char.push({
        id: parseInt(i.getAttribute("id"), 10),
        page: parseInt(i.getAttribute("page"), 10) || 0,
        x: parseInt(i.getAttribute("x"), 10),
        y: parseInt(i.getAttribute("y"), 10),
        width: parseInt(i.getAttribute("width"), 10),
        height: parseInt(i.getAttribute("height"), 10),
        xoffset: parseInt(i.getAttribute("xoffset"), 10),
        yoffset: parseInt(i.getAttribute("yoffset"), 10),
        xadvance: parseInt(i.getAttribute("xadvance"), 10)
      });
    }
    for (let t = 0; t < a.length; t++)
      n.kerning.push({
        first: parseInt(a[t].getAttribute("first"), 10),
        second: parseInt(a[t].getAttribute("second"), 10),
        amount: parseInt(a[t].getAttribute("amount"), 10)
      });
    for (let t = 0; t < s.length; t++)
      n.distanceField.push({
        fieldType: s[t].getAttribute("fieldType"),
        distanceRange: parseInt(s[t].getAttribute("distanceRange"), 10)
      });
    return n;
  }
}
export {
  m as XMLFormat
};
//# sourceMappingURL=index295.js.map

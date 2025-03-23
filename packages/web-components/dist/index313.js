import { BitmapFontData as l } from "./index305.js";
class u {
  /**
   * Check if resource refers to txt font data.
   * @param data
   * @returns - True if resource could be treated as font data, false otherwise.
   */
  static test(s) {
    return typeof s == "string" && s.startsWith("info face=");
  }
  /**
   * Convert text font data to a javascript object.
   * @param txt - Raw string data to be converted
   * @returns - Parsed font data
   */
  static parse(s) {
    const n = s.match(/^[a-z]+\s+.+$/gm), e = {
      info: [],
      common: [],
      page: [],
      char: [],
      chars: [],
      kerning: [],
      kernings: [],
      distanceField: []
    };
    for (const t in n) {
      const c = n[t].match(/^[a-z]+/gm)[0], i = n[t].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm), o = {};
      for (const m in i) {
        const r = i[m].split("="), h = r[0], p = r[1].replace(/"/gm, ""), f = parseFloat(p), d = isNaN(f) ? p : f;
        o[h] = d;
      }
      e[c].push(o);
    }
    const a = new l();
    return e.info.forEach((t) => a.info.push({
      face: t.face,
      size: parseInt(t.size, 10)
    })), e.common.forEach((t) => a.common.push({
      lineHeight: parseInt(t.lineHeight, 10)
    })), e.page.forEach((t) => a.page.push({
      id: parseInt(t.id, 10),
      file: t.file
    })), e.char.forEach((t) => a.char.push({
      id: parseInt(t.id, 10),
      page: parseInt(t.page, 10),
      x: parseInt(t.x, 10),
      y: parseInt(t.y, 10),
      width: parseInt(t.width, 10),
      height: parseInt(t.height, 10),
      xoffset: parseInt(t.xoffset, 10),
      yoffset: parseInt(t.yoffset, 10),
      xadvance: parseInt(t.xadvance, 10)
    })), e.kerning.forEach((t) => a.kerning.push({
      first: parseInt(t.first, 10),
      second: parseInt(t.second, 10),
      amount: parseInt(t.amount, 10)
    })), e.distanceField.forEach((t) => a.distanceField.push({
      distanceRange: parseInt(t.distanceRange, 10),
      fieldType: t.fieldType
    })), a;
  }
}
export {
  u as TextFormat
};
//# sourceMappingURL=index313.js.map

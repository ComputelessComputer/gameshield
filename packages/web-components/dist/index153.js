import { settings as m } from "./index150.js";
import "./index36.js";
function c(e) {
  if (typeof e != "string")
    throw new TypeError(`Path must be a string. Received ${JSON.stringify(e)}`);
}
function u(e) {
  return e.split("?")[0].split("#")[0];
}
function P(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function a(e, t, s) {
  return e.replace(new RegExp(P(t), "g"), s);
}
function h(e, t) {
  let s = "", i = 0, n = -1, o = 0, l = -1;
  for (let r = 0; r <= e.length; ++r) {
    if (r < e.length)
      l = e.charCodeAt(r);
    else {
      if (l === 47)
        break;
      l = 47;
    }
    if (l === 47) {
      if (!(n === r - 1 || o === 1))
        if (n !== r - 1 && o === 2) {
          if (s.length < 2 || i !== 2 || s.charCodeAt(s.length - 1) !== 46 || s.charCodeAt(s.length - 2) !== 46) {
            if (s.length > 2) {
              const f = s.lastIndexOf("/");
              if (f !== s.length - 1) {
                f === -1 ? (s = "", i = 0) : (s = s.slice(0, f), i = s.length - 1 - s.lastIndexOf("/")), n = r, o = 0;
                continue;
              }
            } else if (s.length === 2 || s.length === 1) {
              s = "", i = 0, n = r, o = 0;
              continue;
            }
          }
          t && (s.length > 0 ? s += "/.." : s = "..", i = 2);
        } else
          s.length > 0 ? s += `/${e.slice(n + 1, r)}` : s = e.slice(n + 1, r), i = r - n - 1;
      n = r, o = 0;
    } else
      l === 46 && o !== -1 ? ++o : o = -1;
  }
  return s;
}
const b = {
  /**
   * Converts a path to posix format.
   * @param path - The path to convert to posix
   */
  toPosix(e) {
    return a(e, "\\", "/");
  },
  /**
   * Checks if the path is a URL e.g. http://, https://
   * @param path - The path to check
   */
  isUrl(e) {
    return /^https?:/.test(this.toPosix(e));
  },
  /**
   * Checks if the path is a data URL
   * @param path - The path to check
   */
  isDataUrl(e) {
    return /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i.test(e);
  },
  /**
   * Checks if the path is a blob URL
   * @param path - The path to check
   */
  isBlobUrl(e) {
    return e.startsWith("blob:");
  },
  /**
   * Checks if the path has a protocol e.g. http://, https://, file:///, data:, blob:, C:/
   * This will return true for windows file paths
   * @param path - The path to check
   */
  hasProtocol(e) {
    return /^[^/:]+:/.test(this.toPosix(e));
  },
  /**
   * Returns the protocol of the path e.g. http://, https://, file:///, data:, blob:, C:/
   * @param path - The path to get the protocol from
   */
  getProtocol(e) {
    c(e), e = this.toPosix(e);
    const t = /^file:\/\/\//.exec(e);
    if (t)
      return t[0];
    const s = /^[^/:]+:\/{0,2}/.exec(e);
    return s ? s[0] : "";
  },
  /**
   * Converts URL to an absolute path.
   * When loading from a Web Worker, we must use absolute paths.
   * If the URL is already absolute we return it as is
   * If it's not, we convert it
   * @param url - The URL to test
   * @param customBaseUrl - The base URL to use
   * @param customRootUrl - The root URL to use
   */
  toAbsolute(e, t, s) {
    if (c(e), this.isDataUrl(e) || this.isBlobUrl(e))
      return e;
    const i = u(this.toPosix(t ?? m.ADAPTER.getBaseUrl())), n = u(this.toPosix(s ?? this.rootname(i)));
    return e = this.toPosix(e), e.startsWith("/") ? b.join(n, e.slice(1)) : this.isAbsolute(e) ? e : this.join(i, e);
  },
  /**
   * Normalizes the given path, resolving '..' and '.' segments
   * @param path - The path to normalize
   */
  normalize(e) {
    if (c(e), e.length === 0)
      return ".";
    if (this.isDataUrl(e) || this.isBlobUrl(e))
      return e;
    e = this.toPosix(e);
    let t = "";
    const s = e.startsWith("/");
    this.hasProtocol(e) && (t = this.rootname(e), e = e.slice(t.length));
    const i = e.endsWith("/");
    return e = h(e, !1), e.length > 0 && i && (e += "/"), s ? `/${e}` : t + e;
  },
  /**
   * Determines if path is an absolute path.
   * Absolute paths can be urls, data urls, or paths on disk
   * @param path - The path to test
   */
  isAbsolute(e) {
    return c(e), e = this.toPosix(e), this.hasProtocol(e) ? !0 : e.startsWith("/");
  },
  /**
   * Joins all given path segments together using the platform-specific separator as a delimiter,
   * then normalizes the resulting path
   * @param segments - The segments of the path to join
   */
  join(...e) {
    if (e.length === 0)
      return ".";
    let t;
    for (let s = 0; s < e.length; ++s) {
      const i = e[s];
      if (c(i), i.length > 0)
        if (t === void 0)
          t = i;
        else {
          const n = e[s - 1] ?? "";
          this.joinExtensions.includes(this.extname(n).toLowerCase()) ? t += `/../${i}` : t += `/${i}`;
        }
    }
    return t === void 0 ? "." : this.normalize(t);
  },
  /**
   * Returns the directory name of a path
   * @param path - The path to parse
   */
  dirname(e) {
    if (c(e), e.length === 0)
      return ".";
    e = this.toPosix(e);
    let t = e.charCodeAt(0);
    const s = t === 47;
    let i = -1, n = !0;
    const o = this.getProtocol(e), l = e;
    e = e.slice(o.length);
    for (let r = e.length - 1; r >= 1; --r)
      if (t = e.charCodeAt(r), t === 47) {
        if (!n) {
          i = r;
          break;
        }
      } else
        n = !1;
    return i === -1 ? s ? "/" : this.isUrl(l) ? o + e : o : s && i === 1 ? "//" : o + e.slice(0, i);
  },
  /**
   * Returns the root of the path e.g. /, C:/, file:///, http://domain.com/
   * @param path - The path to parse
   */
  rootname(e) {
    c(e), e = this.toPosix(e);
    let t = "";
    if (e.startsWith("/") ? t = "/" : t = this.getProtocol(e), this.isUrl(e)) {
      const s = e.indexOf("/", t.length);
      s !== -1 ? t = e.slice(0, s) : t = e, t.endsWith("/") || (t += "/");
    }
    return t;
  },
  /**
   * Returns the last portion of a path
   * @param path - The path to test
   * @param ext - Optional extension to remove
   */
  basename(e, t) {
    c(e), t && c(t), e = u(this.toPosix(e));
    let s = 0, i = -1, n = !0, o;
    if (t !== void 0 && t.length > 0 && t.length <= e.length) {
      if (t.length === e.length && t === e)
        return "";
      let l = t.length - 1, r = -1;
      for (o = e.length - 1; o >= 0; --o) {
        const f = e.charCodeAt(o);
        if (f === 47) {
          if (!n) {
            s = o + 1;
            break;
          }
        } else
          r === -1 && (n = !1, r = o + 1), l >= 0 && (f === t.charCodeAt(l) ? --l === -1 && (i = o) : (l = -1, i = r));
      }
      return s === i ? i = r : i === -1 && (i = e.length), e.slice(s, i);
    }
    for (o = e.length - 1; o >= 0; --o)
      if (e.charCodeAt(o) === 47) {
        if (!n) {
          s = o + 1;
          break;
        }
      } else
        i === -1 && (n = !1, i = o + 1);
    return i === -1 ? "" : e.slice(s, i);
  },
  /**
   * Returns the extension of the path, from the last occurrence of the . (period) character to end of string in the last
   * portion of the path. If there is no . in the last portion of the path, or if there are no . characters other than
   * the first character of the basename of path, an empty string is returned.
   * @param path - The path to parse
   */
  extname(e) {
    c(e), e = u(this.toPosix(e));
    let t = -1, s = 0, i = -1, n = !0, o = 0;
    for (let l = e.length - 1; l >= 0; --l) {
      const r = e.charCodeAt(l);
      if (r === 47) {
        if (!n) {
          s = l + 1;
          break;
        }
        continue;
      }
      i === -1 && (n = !1, i = l + 1), r === 46 ? t === -1 ? t = l : o !== 1 && (o = 1) : t !== -1 && (o = -1);
    }
    return t === -1 || i === -1 || o === 0 || o === 1 && t === i - 1 && t === s + 1 ? "" : e.slice(t, i);
  },
  /**
   * Parses a path into an object containing the 'root', `dir`, `base`, `ext`, and `name` properties.
   * @param path - The path to parse
   */
  parse(e) {
    c(e);
    const t = { root: "", dir: "", base: "", ext: "", name: "" };
    if (e.length === 0)
      return t;
    e = u(this.toPosix(e));
    let s = e.charCodeAt(0);
    const i = this.isAbsolute(e);
    let n;
    t.root = this.rootname(e), i || this.hasProtocol(e) ? n = 1 : n = 0;
    let o = -1, l = 0, r = -1, f = !0, g = e.length - 1, d = 0;
    for (; g >= n; --g) {
      if (s = e.charCodeAt(g), s === 47) {
        if (!f) {
          l = g + 1;
          break;
        }
        continue;
      }
      r === -1 && (f = !1, r = g + 1), s === 46 ? o === -1 ? o = g : d !== 1 && (d = 1) : o !== -1 && (d = -1);
    }
    return o === -1 || r === -1 || d === 0 || d === 1 && o === r - 1 && o === l + 1 ? r !== -1 && (l === 0 && i ? t.base = t.name = e.slice(1, r) : t.base = t.name = e.slice(l, r)) : (l === 0 && i ? (t.name = e.slice(1, o), t.base = e.slice(1, r)) : (t.name = e.slice(l, o), t.base = e.slice(l, r)), t.ext = e.slice(o, r)), t.dir = this.dirname(e), t;
  },
  sep: "/",
  delimiter: ":",
  joinExtensions: [".html"]
};
export {
  b as path
};
//# sourceMappingURL=index153.js.map

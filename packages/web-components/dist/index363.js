import { DOMAdapter as a } from "./index365.js";
function f(e) {
  if (typeof e != "string")
    throw new TypeError(`Path must be a string. Received ${JSON.stringify(e)}`);
}
function d(e) {
  return e.split("?")[0].split("#")[0];
}
function P(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function h(e, t, i) {
  return e.replace(new RegExp(P(t), "g"), i);
}
function b(e, t) {
  let i = "", s = 0, l = -1, r = 0, n = -1;
  for (let o = 0; o <= e.length; ++o) {
    if (o < e.length)
      n = e.charCodeAt(o);
    else {
      if (n === 47)
        break;
      n = 47;
    }
    if (n === 47) {
      if (!(l === o - 1 || r === 1))
        if (l !== o - 1 && r === 2) {
          if (i.length < 2 || s !== 2 || i.charCodeAt(i.length - 1) !== 46 || i.charCodeAt(i.length - 2) !== 46) {
            if (i.length > 2) {
              const c = i.lastIndexOf("/");
              if (c !== i.length - 1) {
                c === -1 ? (i = "", s = 0) : (i = i.slice(0, c), s = i.length - 1 - i.lastIndexOf("/")), l = o, r = 0;
                continue;
              }
            } else if (i.length === 2 || i.length === 1) {
              i = "", s = 0, l = o, r = 0;
              continue;
            }
          }
          t && (i.length > 0 ? i += "/.." : i = "..", s = 2);
        } else
          i.length > 0 ? i += `/${e.slice(l + 1, o)}` : i = e.slice(l + 1, o), s = o - l - 1;
      l = o, r = 0;
    } else
      n === 46 && r !== -1 ? ++r : r = -1;
  }
  return i;
}
const m = {
  /**
   * Converts a path to posix format.
   * @param path - The path to convert to posix
   */
  toPosix(e) {
    return h(e, "\\", "/");
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
    f(e), e = this.toPosix(e);
    const t = /^file:\/\/\//.exec(e);
    if (t)
      return t[0];
    const i = /^[^/:]+:\/{0,2}/.exec(e);
    return i ? i[0] : "";
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
  toAbsolute(e, t, i) {
    if (f(e), this.isDataUrl(e) || this.isBlobUrl(e))
      return e;
    const s = d(this.toPosix(t ?? a.get().getBaseUrl())), l = d(this.toPosix(i ?? this.rootname(s)));
    return e = this.toPosix(e), e.startsWith("/") ? m.join(l, e.slice(1)) : this.isAbsolute(e) ? e : this.join(s, e);
  },
  /**
   * Normalizes the given path, resolving '..' and '.' segments
   * @param path - The path to normalize
   */
  normalize(e) {
    if (f(e), e.length === 0)
      return ".";
    if (this.isDataUrl(e) || this.isBlobUrl(e))
      return e;
    e = this.toPosix(e);
    let t = "";
    const i = e.startsWith("/");
    this.hasProtocol(e) && (t = this.rootname(e), e = e.slice(t.length));
    const s = e.endsWith("/");
    return e = b(e, !1), e.length > 0 && s && (e += "/"), i ? `/${e}` : t + e;
  },
  /**
   * Determines if path is an absolute path.
   * Absolute paths can be urls, data urls, or paths on disk
   * @param path - The path to test
   */
  isAbsolute(e) {
    return f(e), e = this.toPosix(e), this.hasProtocol(e) ? !0 : e.startsWith("/");
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
    for (let i = 0; i < e.length; ++i) {
      const s = e[i];
      if (f(s), s.length > 0)
        if (t === void 0)
          t = s;
        else {
          const l = e[i - 1] ?? "";
          this.joinExtensions.includes(this.extname(l).toLowerCase()) ? t += `/../${s}` : t += `/${s}`;
        }
    }
    return t === void 0 ? "." : this.normalize(t);
  },
  /**
   * Returns the directory name of a path
   * @param path - The path to parse
   */
  dirname(e) {
    if (f(e), e.length === 0)
      return ".";
    e = this.toPosix(e);
    let t = e.charCodeAt(0);
    const i = t === 47;
    let s = -1, l = !0;
    const r = this.getProtocol(e), n = e;
    e = e.slice(r.length);
    for (let o = e.length - 1; o >= 1; --o)
      if (t = e.charCodeAt(o), t === 47) {
        if (!l) {
          s = o;
          break;
        }
      } else
        l = !1;
    return s === -1 ? i ? "/" : this.isUrl(n) ? r + e : r : i && s === 1 ? "//" : r + e.slice(0, s);
  },
  /**
   * Returns the root of the path e.g. /, C:/, file:///, http://domain.com/
   * @param path - The path to parse
   */
  rootname(e) {
    f(e), e = this.toPosix(e);
    let t = "";
    if (e.startsWith("/") ? t = "/" : t = this.getProtocol(e), this.isUrl(e)) {
      const i = e.indexOf("/", t.length);
      i !== -1 ? t = e.slice(0, i) : t = e, t.endsWith("/") || (t += "/");
    }
    return t;
  },
  /**
   * Returns the last portion of a path
   * @param path - The path to test
   * @param ext - Optional extension to remove
   */
  basename(e, t) {
    f(e), t && f(t), e = d(this.toPosix(e));
    let i = 0, s = -1, l = !0, r;
    if (t !== void 0 && t.length > 0 && t.length <= e.length) {
      if (t.length === e.length && t === e)
        return "";
      let n = t.length - 1, o = -1;
      for (r = e.length - 1; r >= 0; --r) {
        const c = e.charCodeAt(r);
        if (c === 47) {
          if (!l) {
            i = r + 1;
            break;
          }
        } else
          o === -1 && (l = !1, o = r + 1), n >= 0 && (c === t.charCodeAt(n) ? --n === -1 && (s = r) : (n = -1, s = o));
      }
      return i === s ? s = o : s === -1 && (s = e.length), e.slice(i, s);
    }
    for (r = e.length - 1; r >= 0; --r)
      if (e.charCodeAt(r) === 47) {
        if (!l) {
          i = r + 1;
          break;
        }
      } else
        s === -1 && (l = !1, s = r + 1);
    return s === -1 ? "" : e.slice(i, s);
  },
  /**
   * Returns the extension of the path, from the last occurrence of the . (period) character to end of string in the last
   * portion of the path. If there is no . in the last portion of the path, or if there are no . characters other than
   * the first character of the basename of path, an empty string is returned.
   * @param path - The path to parse
   */
  extname(e) {
    f(e), e = d(this.toPosix(e));
    let t = -1, i = 0, s = -1, l = !0, r = 0;
    for (let n = e.length - 1; n >= 0; --n) {
      const o = e.charCodeAt(n);
      if (o === 47) {
        if (!l) {
          i = n + 1;
          break;
        }
        continue;
      }
      s === -1 && (l = !1, s = n + 1), o === 46 ? t === -1 ? t = n : r !== 1 && (r = 1) : t !== -1 && (r = -1);
    }
    return t === -1 || s === -1 || r === 0 || r === 1 && t === s - 1 && t === i + 1 ? "" : e.slice(t, s);
  },
  /**
   * Parses a path into an object containing the 'root', `dir`, `base`, `ext`, and `name` properties.
   * @param path - The path to parse
   */
  parse(e) {
    f(e);
    const t = { root: "", dir: "", base: "", ext: "", name: "" };
    if (e.length === 0)
      return t;
    e = d(this.toPosix(e));
    let i = e.charCodeAt(0);
    const s = this.isAbsolute(e);
    let l;
    t.root = this.rootname(e), s || this.hasProtocol(e) ? l = 1 : l = 0;
    let r = -1, n = 0, o = -1, c = !0, u = e.length - 1, g = 0;
    for (; u >= l; --u) {
      if (i = e.charCodeAt(u), i === 47) {
        if (!c) {
          n = u + 1;
          break;
        }
        continue;
      }
      o === -1 && (c = !1, o = u + 1), i === 46 ? r === -1 ? r = u : g !== 1 && (g = 1) : r !== -1 && (g = -1);
    }
    return r === -1 || o === -1 || g === 0 || g === 1 && r === o - 1 && r === n + 1 ? o !== -1 && (n === 0 && s ? t.base = t.name = e.slice(1, o) : t.base = t.name = e.slice(n, o)) : (n === 0 && s ? (t.name = e.slice(1, r), t.base = e.slice(1, o)) : (t.name = e.slice(n, r), t.base = e.slice(n, o)), t.ext = e.slice(r, o)), t.dir = this.dirname(e), t;
  },
  sep: "/",
  delimiter: ":",
  joinExtensions: [".html"]
};
export {
  m as path
};
//# sourceMappingURL=index363.js.map

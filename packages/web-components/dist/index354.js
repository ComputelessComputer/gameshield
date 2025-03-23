import { ExtensionType as v } from "./index153.js";
import { VideoSource as c } from "./index326.js";
import { detectVideoAlphaMode as h } from "./index372.js";
import { getResolutionOfUrl as y } from "./index369.js";
import { checkDataUrl as E } from "./index366.js";
import { checkExtension as b } from "./index367.js";
import { createTexture as g } from "./index370.js";
const u = [".mp4", ".m4v", ".webm", ".ogg", ".ogv", ".h264", ".avi", ".mov"], x = u.map((e) => `video/${e.substring(1)}`);
function L(e, o, t) {
  t === void 0 && !o.startsWith("data:") ? e.crossOrigin = w(o) : t !== !1 && (e.crossOrigin = typeof t == "string" ? t : "anonymous");
}
function V(e) {
  return new Promise((o, t) => {
    e.addEventListener("canplaythrough", a), e.addEventListener("error", i), e.load();
    function a() {
      r(), o();
    }
    function i(s) {
      r(), t(s);
    }
    function r() {
      e.removeEventListener("canplaythrough", a), e.removeEventListener("error", i);
    }
  });
}
function w(e, o = globalThis.location) {
  if (e.startsWith("data:"))
    return "";
  o || (o = globalThis.location);
  const t = new URL(e, document.baseURI);
  return t.hostname !== o.hostname || t.port !== o.port || t.protocol !== o.protocol ? "anonymous" : "";
}
const W = {
  name: "loadVideo",
  extension: {
    type: v.LoadParser,
    name: "loadVideo"
  },
  test(e) {
    const o = E(e, x), t = b(e, u);
    return o || t;
  },
  async load(e, o, t) {
    var p, m;
    const a = {
      ...c.defaultOptions,
      resolution: ((p = o.data) == null ? void 0 : p.resolution) || y(e),
      alphaMode: ((m = o.data) == null ? void 0 : m.alphaMode) || await h(),
      ...o.data
    }, i = document.createElement("video"), r = {
      preload: a.autoLoad !== !1 ? "auto" : void 0,
      "webkit-playsinline": a.playsinline !== !1 ? "" : void 0,
      playsinline: a.playsinline !== !1 ? "" : void 0,
      muted: a.muted === !0 ? "" : void 0,
      loop: a.loop === !0 ? "" : void 0,
      autoplay: a.autoPlay !== !1 ? "" : void 0
    };
    Object.keys(r).forEach((n) => {
      const d = r[n];
      d !== void 0 && i.setAttribute(n, d);
    }), a.muted === !0 && (i.muted = !0), L(i, e, a.crossorigin);
    const s = document.createElement("source");
    let l;
    if (e.startsWith("data:"))
      l = e.slice(5, e.indexOf(";"));
    else if (!e.startsWith("blob:")) {
      const n = e.split("?")[0].slice(e.lastIndexOf(".") + 1).toLowerCase();
      l = c.MIME_TYPES[n] || `video/${n}`;
    }
    return s.src = e, l && (s.type = l), new Promise((n) => {
      const d = async () => {
        const f = new c({ ...a, resource: i });
        i.removeEventListener("canplay", d), o.data.preload && await V(i), n(g(f, t, e));
      };
      i.addEventListener("canplay", d), i.appendChild(s);
    });
  },
  unload(e) {
    e.destroy(!0);
  }
};
export {
  L as crossOrigin,
  w as determineCrossOrigin,
  W as loadVideoTextures,
  V as preloadVideo
};
//# sourceMappingURL=index354.js.map

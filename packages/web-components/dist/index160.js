import { ALPHA_MODES as t } from "./index164.js";
let o;
async function l() {
  return o ?? (o = (async () => {
    var g;
    const A = document.createElement("canvas").getContext("webgl");
    if (!A)
      return t.UNPACK;
    const n = await new Promise((u) => {
      const e = document.createElement("video");
      e.onloadeddata = () => u(e), e.onerror = () => u(null), e.autoplay = !1, e.crossOrigin = "anonymous", e.preload = "auto", e.src = "data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAHTEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHGTbuMU6uEElTDZ1OsggEXTbuMU6uEHFO7a1OsggG97AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmoCrXsYMPQkBNgIRMYXZmV0GETGF2ZkSJiEBEAAAAAAAAFlSua8yuAQAAAAAAAEPXgQFzxYgAAAAAAAAAAZyBACK1nIN1bmSIgQCGhVZfVlA5g4EBI+ODhAJiWgDglLCBArqBApqBAlPAgQFVsIRVuYEBElTDZ9Vzc9JjwItjxYgAAAAAAAAAAWfInEWjh0VOQ09ERVJEh49MYXZjIGxpYnZweC12cDlnyKJFo4hEVVJBVElPTkSHlDAwOjAwOjAwLjA0MDAwMDAwMAAAH0O2dcfngQCgwqGggQAAAIJJg0IAABAAFgA4JBwYSgAAICAAEb///4r+AAB1oZ2mm+6BAaWWgkmDQgAAEAAWADgkHBhKAAAgIABIQBxTu2uRu4+zgQC3iveBAfGCAXHwgQM=", e.load();
    });
    if (!n)
      return t.UNPACK;
    const E = A.createTexture();
    A.bindTexture(A.TEXTURE_2D, E);
    const a = A.createFramebuffer();
    A.bindFramebuffer(A.FRAMEBUFFER, a), A.framebufferTexture2D(
      A.FRAMEBUFFER,
      A.COLOR_ATTACHMENT0,
      A.TEXTURE_2D,
      E,
      0
    ), A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), A.pixelStorei(A.UNPACK_COLORSPACE_CONVERSION_WEBGL, A.NONE), A.texImage2D(A.TEXTURE_2D, 0, A.RGBA, A.RGBA, A.UNSIGNED_BYTE, n);
    const r = new Uint8Array(4);
    return A.readPixels(0, 0, 1, 1, A.RGBA, A.UNSIGNED_BYTE, r), A.deleteFramebuffer(a), A.deleteTexture(E), (g = A.getExtension("WEBGL_lose_context")) == null || g.loseContext(), r[0] <= r[3] ? t.PMA : t.UNPACK;
  })()), o;
}
export {
  l as detectVideoAlphaMode
};
//# sourceMappingURL=index160.js.map

let r;
async function g() {
  return r ?? (r = (async () => {
    var l;
    const A = document.createElement("canvas").getContext("webgl");
    if (!A)
      return "premultiply-alpha-on-upload";
    const o = await new Promise((n) => {
      const e = document.createElement("video");
      e.onloadeddata = () => n(e), e.onerror = () => n(null), e.autoplay = !1, e.crossOrigin = "anonymous", e.preload = "auto", e.src = "data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAHTEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHGTbuMU6uEElTDZ1OsggEXTbuMU6uEHFO7a1OsggG97AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmoCrXsYMPQkBNgIRMYXZmV0GETGF2ZkSJiEBEAAAAAAAAFlSua8yuAQAAAAAAAEPXgQFzxYgAAAAAAAAAAZyBACK1nIN1bmSIgQCGhVZfVlA5g4EBI+ODhAJiWgDglLCBArqBApqBAlPAgQFVsIRVuYEBElTDZ9Vzc9JjwItjxYgAAAAAAAAAAWfInEWjh0VOQ09ERVJEh49MYXZjIGxpYnZweC12cDlnyKJFo4hEVVJBVElPTkSHlDAwOjAwOjAwLjA0MDAwMDAwMAAAH0O2dcfngQCgwqGggQAAAIJJg0IAABAAFgA4JBwYSgAAICAAEb///4r+AAB1oZ2mm+6BAaWWgkmDQgAAEAAWADgkHBhKAAAgIABIQBxTu2uRu4+zgQC3iveBAfGCAXHwgQM=", e.load();
    });
    if (!o)
      return "premultiply-alpha-on-upload";
    const t = A.createTexture();
    A.bindTexture(A.TEXTURE_2D, t);
    const E = A.createFramebuffer();
    A.bindFramebuffer(A.FRAMEBUFFER, E), A.framebufferTexture2D(
      A.FRAMEBUFFER,
      A.COLOR_ATTACHMENT0,
      A.TEXTURE_2D,
      t,
      0
    ), A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), A.pixelStorei(A.UNPACK_COLORSPACE_CONVERSION_WEBGL, A.NONE), A.texImage2D(A.TEXTURE_2D, 0, A.RGBA, A.RGBA, A.UNSIGNED_BYTE, o);
    const a = new Uint8Array(4);
    return A.readPixels(0, 0, 1, 1, A.RGBA, A.UNSIGNED_BYTE, a), A.deleteFramebuffer(E), A.deleteTexture(t), (l = A.getExtension("WEBGL_lose_context")) == null || l.loseContext(), a[0] <= a[3] ? "premultiplied-alpha" : "premultiply-alpha-on-upload";
  })()), r;
}
export {
  g as detectVideoAlphaMode
};
//# sourceMappingURL=index372.js.map

const r = {
  createCanvas: (e, t) => {
    const n = document.createElement("canvas");
    return n.width = e, n.height = t, n;
  },
  getCanvasRenderingContext2D: () => CanvasRenderingContext2D,
  getWebGLRenderingContext: () => WebGLRenderingContext,
  getNavigator: () => navigator,
  getBaseUrl: () => document.baseURI ?? window.location.href,
  getFontFaceSet: () => document.fonts,
  fetch: (e, t) => fetch(e, t),
  parseXML: (e) => new DOMParser().parseFromString(e, "text/xml")
};
export {
  r as BrowserAdapter
};
//# sourceMappingURL=index381.js.map

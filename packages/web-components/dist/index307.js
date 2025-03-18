const a = {
  /**
   * Creates a canvas element of the given size.
   * This canvas is created using the browser's native canvas element.
   * @param width - width of the canvas
   * @param height - height of the canvas
   */
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
  a as BrowserAdapter
};
//# sourceMappingURL=index307.js.map

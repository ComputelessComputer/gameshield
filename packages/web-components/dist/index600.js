const t = `(function() {
  "use strict";
  const WHITE_PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";
  async function checkImageBitmap() {
    try {
      if (typeof createImageBitmap != "function")
        return !1;
      const imageBlob = await (await fetch(WHITE_PNG)).blob(), imageBitmap = await createImageBitmap(imageBlob);
      return imageBitmap.width === 1 && imageBitmap.height === 1;
    } catch {
      return !1;
    }
  }
  checkImageBitmap().then((result) => {
    self.postMessage(result);
  });
})();
`;
let e = null;
class a {
  constructor() {
    e || (e = URL.createObjectURL(new Blob([t], { type: "application/javascript" }))), this.worker = new Worker(e);
  }
}
a.revokeObjectURL = function() {
  e && (URL.revokeObjectURL(e), e = null);
};
export {
  a as default
};
//# sourceMappingURL=index600.js.map

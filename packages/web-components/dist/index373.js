const n = `(function () {
    'use strict';

    const WHITE_PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";
    async function checkImageBitmap() {
      try {
        if (typeof createImageBitmap !== "function")
          return false;
        const response = await fetch(WHITE_PNG);
        const imageBlob = await response.blob();
        const imageBitmap = await createImageBitmap(imageBlob);
        return imageBitmap.width === 1 && imageBitmap.height === 1;
      } catch (_e) {
        return false;
      }
    }
    void checkImageBitmap().then((result) => {
      self.postMessage(result);
    });

})();
`;
let e = null;
class a {
  constructor() {
    e || (e = URL.createObjectURL(new Blob([n], { type: "application/javascript" }))), this.worker = new Worker(e);
  }
}
a.revokeObjectURL = function() {
  e && (URL.revokeObjectURL(e), e = null);
};
export {
  a as default
};
//# sourceMappingURL=index373.js.map

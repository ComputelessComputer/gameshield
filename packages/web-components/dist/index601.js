const a = `(function() {
  "use strict";
  async function loadImageBitmap(url) {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(\`[WorkerManager.loadImageBitmap] Failed to fetch \${url}: \${response.status} \${response.statusText}\`);
    const imageBlob = await response.blob();
    return await createImageBitmap(imageBlob);
  }
  self.onmessage = async (event) => {
    try {
      const imageBitmap = await loadImageBitmap(event.data.data[0]);
      self.postMessage({
        data: imageBitmap,
        uuid: event.data.uuid,
        id: event.data.id
      }, [imageBitmap]);
    } catch (e) {
      self.postMessage({
        error: e,
        uuid: event.data.uuid,
        id: event.data.id
      });
    }
  };
})();
`;
let e = null;
class t {
  constructor() {
    e || (e = URL.createObjectURL(new Blob([a], { type: "application/javascript" }))), this.worker = new Worker(e);
  }
}
t.revokeObjectURL = function() {
  e && (URL.revokeObjectURL(e), e = null);
};
export {
  t as default
};
//# sourceMappingURL=index601.js.map

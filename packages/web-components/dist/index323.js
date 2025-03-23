import { ExtensionType as a } from "./index153.js";
import { TextureSource as e } from "./index474.js";
class i extends e {
  constructor(t) {
    const r = t.resource || new Float32Array(t.width * t.height * 4);
    let n = t.format;
    n || (r instanceof Float32Array ? n = "rgba32float" : r instanceof Int32Array || r instanceof Uint32Array ? n = "rgba32uint" : r instanceof Int16Array || r instanceof Uint16Array ? n = "rgba16uint" : (r instanceof Int8Array, n = "bgra8unorm")), super({
      ...t,
      resource: r,
      format: n
    }), this.uploadMethodId = "buffer";
  }
  static test(t) {
    return t instanceof Int8Array || t instanceof Uint8Array || t instanceof Uint8ClampedArray || t instanceof Int16Array || t instanceof Uint16Array || t instanceof Int32Array || t instanceof Uint32Array || t instanceof Float32Array;
  }
}
i.extension = a.TextureSource;
export {
  i as BufferImageSource
};
//# sourceMappingURL=index323.js.map

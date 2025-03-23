import { ExtensionType as r } from "./index153.js";
import { GpuParticleContainerAdaptor as t } from "./index539.js";
import { ParticleContainerPipe as i } from "./index541.js";
class o extends i {
  constructor(e) {
    super(e, new t());
  }
}
o.extension = {
  type: [
    r.WebGPUPipes
  ],
  name: "particle"
};
export {
  o as GpuParticleContainerPipe
};
//# sourceMappingURL=index542.js.map

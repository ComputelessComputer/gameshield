import { TextFormat as m } from "./index294.js";
import { XMLFormat as e } from "./index295.js";
import { XMLStringFormat as n } from "./index296.js";
const r = [
  m,
  e,
  n
];
function u(o) {
  for (let t = 0; t < r.length; t++)
    if (r[t].test(o))
      return r[t];
  return null;
}
export {
  m as TextFormat,
  e as XMLFormat,
  n as XMLStringFormat,
  u as autoDetectFormat
};
//# sourceMappingURL=index287.js.map

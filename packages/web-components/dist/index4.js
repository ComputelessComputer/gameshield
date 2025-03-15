/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const c = (s) => (t) => typeof t == "function" ? ((n, e) => (customElements.define(n, e), e))(s, t) : ((n, e) => {
  const { kind: m, elements: o } = e;
  return { kind: m, elements: o, finisher(i) {
    customElements.define(n, i);
  } };
})(s, t);
export {
  c as customElement
};
//# sourceMappingURL=index4.js.map

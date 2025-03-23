const o = "WorkerGlobalScope" in globalThis && globalThis instanceof globalThis.WorkerGlobalScope;
function n(e) {
  return o ? !1 : document.createElement("video").canPlayType(e) !== "";
}
export {
  n as testVideoFormat
};
//# sourceMappingURL=index362.js.map

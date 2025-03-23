const e = "WorkerGlobalScope" in globalThis && globalThis instanceof globalThis.WorkerGlobalScope;
function l(o) {
  return e ? !1 : document.createElement("video").canPlayType(o) !== "";
}
export {
  l as testVideoFormat
};
//# sourceMappingURL=index181.js.map

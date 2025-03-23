function r(n, o = globalThis.location) {
  if (n.startsWith("data:"))
    return "";
  o = o || globalThis.location;
  const t = new URL(n, document.baseURI);
  return t.hostname !== o.hostname || t.port !== o.port || t.protocol !== o.protocol ? "anonymous" : "";
}
export {
  r as determineCrossOrigin
};
//# sourceMappingURL=index259.js.map

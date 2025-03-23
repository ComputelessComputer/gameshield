let n = 0;
const o = 500;
function r(...i) {
  n !== o && (n++, n === o ? console.warn("PixiJS Warning: too many warnings, no more warnings will be reported to the console by PixiJS.") : console.warn("PixiJS Warning: ", ...i));
}
export {
  r as warn
};
//# sourceMappingURL=index338.js.map

var e = String.prototype.replace, a = /%20/g, t = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, F = {
  default: t.RFC3986,
  formatters: {
    RFC1738: function(r) {
      return e.call(r, a, "+");
    },
    RFC3986: function(r) {
      return String(r);
    }
  },
  RFC1738: t.RFC1738,
  RFC3986: t.RFC3986
};
export {
  F as f
};
//# sourceMappingURL=index627.js.map

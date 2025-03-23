function j(c, e) {
  let n = c;
  for (const t in e) {
    const o = e[t];
    o.join(`
`).length ? n = n.replace(`{{${t}}}`, `//-----${t} START-----//
${o.join(`
`)}
//----${t} FINISH----//`) : n = n.replace(`{{${t}}}`, "");
  }
  return n;
}
export {
  j as injectBits
};
//# sourceMappingURL=index441.js.map

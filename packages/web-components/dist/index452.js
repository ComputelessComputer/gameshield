function n(e, i, f) {
  return i ? e : f ? (e = e.replace("out vec4 finalColor;", ""), `
        
        #ifdef GL_ES // This checks if it is WebGL1
        #define in varying
        #define finalColor gl_FragColor
        #define texture texture2D
        #endif
        ${e}
        `) : `
        
        #ifdef GL_ES // This checks if it is WebGL1
        #define in attribute
        #define out varying
        #endif
        ${e}
        `;
}
export {
  n as addProgramDefines
};
//# sourceMappingURL=index452.js.map

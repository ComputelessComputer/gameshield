var r = `varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void){
   gl_FragColor = texture2D(uSampler, vTextureCoord);
}
`;
export {
  r as default
};
//# sourceMappingURL=index206.js.map

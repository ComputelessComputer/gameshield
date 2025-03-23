const l = `
    attribute vec2 aVertexPosition;

    uniform mat3 projectionMatrix;

    uniform float strength;

    varying vec2 vBlurTexCoords[%size%];

    uniform vec4 inputSize;
    uniform vec4 outputFrame;

    vec4 filterVertexPosition( void )
    {
        vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

        return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
    }

    vec2 filterTextureCoord( void )
    {
        return aVertexPosition * (outputFrame.zw * inputSize.zw);
    }

    void main(void)
    {
        gl_Position = filterVertexPosition();

        vec2 textureCoord = filterTextureCoord();
        %blur%
    }`;
function c(r, u) {
  const a = Math.ceil(r / 2);
  let e = l, o = "", i;
  u ? i = "vBlurTexCoords[%index%] =  textureCoord + vec2(%sampleIndex% * strength, 0.0);" : i = "vBlurTexCoords[%index%] =  textureCoord + vec2(0.0, %sampleIndex% * strength);";
  for (let t = 0; t < r; t++) {
    let n = i.replace("%index%", t.toString());
    n = n.replace("%sampleIndex%", `${t - (a - 1)}.0`), o += n, o += `
`;
  }
  return e = e.replace("%blur%", o), e = e.replace("%size%", r.toString()), e;
}
export {
  c as generateBlurVertSource
};
//# sourceMappingURL=index266.js.map

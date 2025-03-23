const t = [
  // a float cache layer
  {
    test: (v) => v.type === "float" && v.size === 1 && !v.isArray,
    code: (v) => `
            if(uv["${v}"] !== ud["${v}"].value)
            {
                ud["${v}"].value = uv["${v}"]
                gl.uniform1f(ud["${v}"].location, uv["${v}"])
            }
            `
  },
  // handling samplers
  {
    test: (v, e) => (
      // eslint-disable-next-line max-len,no-eq-null,eqeqeq
      (v.type === "sampler2D" || v.type === "samplerCube" || v.type === "sampler2DArray") && v.size === 1 && !v.isArray && (e == null || e.castToBaseTexture !== void 0)
    ),
    code: (v) => `t = syncData.textureCount++;

            renderer.texture.bind(uv["${v}"], t);

            if(ud["${v}"].value !== t)
            {
                ud["${v}"].value = t;
                gl.uniform1i(ud["${v}"].location, t);
; // eslint-disable-line max-len
            }`
  },
  // uploading pixi matrix object to mat3
  {
    test: (v, e) => v.type === "mat3" && v.size === 1 && !v.isArray && e.a !== void 0,
    code: (v) => (
      // TODO and some smart caching dirty ids here!
      `
            gl.uniformMatrix3fv(ud["${v}"].location, false, uv["${v}"].toArray(true));
            `
    ),
    codeUbo: (v) => `
                var ${v}_matrix = uv.${v}.toArray(true);

                data[offset] = ${v}_matrix[0];
                data[offset+1] = ${v}_matrix[1];
                data[offset+2] = ${v}_matrix[2];
        
                data[offset + 4] = ${v}_matrix[3];
                data[offset + 5] = ${v}_matrix[4];
                data[offset + 6] = ${v}_matrix[5];
        
                data[offset + 8] = ${v}_matrix[6];
                data[offset + 9] = ${v}_matrix[7];
                data[offset + 10] = ${v}_matrix[8];
            `
  },
  // uploading a pixi point as a vec2 with caching layer
  {
    test: (v, e) => v.type === "vec2" && v.size === 1 && !v.isArray && e.x !== void 0,
    code: (v) => `
                cv = ud["${v}"].value;
                v = uv["${v}"];

                if(cv[0] !== v.x || cv[1] !== v.y)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    gl.uniform2f(ud["${v}"].location, v.x, v.y);
                }`,
    codeUbo: (v) => `
                v = uv.${v};

                data[offset] = v.x;
                data[offset+1] = v.y;
            `
  },
  // caching layer for a vec2
  {
    test: (v) => v.type === "vec2" && v.size === 1 && !v.isArray,
    code: (v) => `
                cv = ud["${v}"].value;
                v = uv["${v}"];

                if(cv[0] !== v[0] || cv[1] !== v[1])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    gl.uniform2f(ud["${v}"].location, v[0], v[1]);
                }
            `
  },
  // upload a pixi rectangle as a vec4 with caching layer
  {
    test: (v, e) => v.type === "vec4" && v.size === 1 && !v.isArray && e.width !== void 0,
    code: (v) => `
                cv = ud["${v}"].value;
                v = uv["${v}"];

                if(cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    cv[2] = v.width;
                    cv[3] = v.height;
                    gl.uniform4f(ud["${v}"].location, v.x, v.y, v.width, v.height)
                }`,
    codeUbo: (v) => `
                    v = uv.${v};

                    data[offset] = v.x;
                    data[offset+1] = v.y;
                    data[offset+2] = v.width;
                    data[offset+3] = v.height;
                `
  },
  // upload a pixi color as vec4 with caching layer
  {
    test: (v, e) => v.type === "vec4" && v.size === 1 && !v.isArray && e.red !== void 0,
    code: (v) => `
                cv = ud["${v}"].value;
                v = uv["${v}"];

                if(cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.alpha)
                {
                    cv[0] = v.red;
                    cv[1] = v.green;
                    cv[2] = v.blue;
                    cv[3] = v.alpha;
                    gl.uniform4f(ud["${v}"].location, v.red, v.green, v.blue, v.alpha)
                }`,
    codeUbo: (v) => `
                    v = uv.${v};

                    data[offset] = v.red;
                    data[offset+1] = v.green;
                    data[offset+2] = v.blue;
                    data[offset+3] = v.alpha;
                `
  },
  // upload a pixi color as a vec3 with caching layer
  {
    test: (v, e) => v.type === "vec3" && v.size === 1 && !v.isArray && e.red !== void 0,
    code: (v) => `
                cv = ud["${v}"].value;
                v = uv["${v}"];

                if(cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.a)
                {
                    cv[0] = v.red;
                    cv[1] = v.green;
                    cv[2] = v.blue;
    
                    gl.uniform3f(ud["${v}"].location, v.red, v.green, v.blue)
                }`,
    codeUbo: (v) => `
                    v = uv.${v};

                    data[offset] = v.red;
                    data[offset+1] = v.green;
                    data[offset+2] = v.blue;
                `
  },
  // a caching layer for vec4 uploading
  {
    test: (v) => v.type === "vec4" && v.size === 1 && !v.isArray,
    code: (v) => `
                cv = ud["${v}"].value;
                v = uv["${v}"];

                if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    cv[2] = v[2];
                    cv[3] = v[3];

                    gl.uniform4f(ud["${v}"].location, v[0], v[1], v[2], v[3])
                }`
  }
];
export {
  t as uniformParsers
};
//# sourceMappingURL=index244.js.map

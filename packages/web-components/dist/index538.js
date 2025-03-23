class E {
  execute(e, s) {
    const u = e.state, r = e.renderer, t = s.shader || e.defaultShader;
    t.resources.uTexture = s.texture._source, t.resources.uniforms = e.localUniforms;
    const d = r.gl, o = e.getBuffers(s);
    r.shader.bind(t), r.state.set(u), r.geometry.bind(o.geometry, t.glProgram);
    const g = o.geometry.indexBuffer.data.BYTES_PER_ELEMENT === 2 ? d.UNSIGNED_SHORT : d.UNSIGNED_INT;
    d.drawElements(d.TRIANGLES, s.particleChildren.length * 6, g, 0);
  }
}
export {
  E as GlParticleContainerAdaptor
};
//# sourceMappingURL=index538.js.map

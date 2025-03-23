class h {
  execute(e, r) {
    const s = e.renderer, d = r.shader || e.defaultShader;
    d.groups[0] = s.renderPipes.uniformBatch.getUniformBindGroup(e.localUniforms, !0), d.groups[1] = s.texture.getTextureBindGroup(r.texture);
    const t = e.state, u = e.getBuffers(r);
    s.encoder.draw({
      geometry: u.geometry,
      shader: r.shader || e.defaultShader,
      state: t,
      size: r.particleChildren.length * 6
    });
  }
}
export {
  h as GpuParticleContainerAdaptor
};
//# sourceMappingURL=index539.js.map

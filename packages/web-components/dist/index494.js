const t = {
  _onRender: null,
  set onRender(n) {
    const e = this.renderGroup || this.parentRenderGroup;
    if (!n) {
      this._onRender && (e == null || e.removeOnRender(this)), this._onRender = null;
      return;
    }
    this._onRender || e == null || e.addOnRender(this), this._onRender = n;
  },
  /**
   * This callback is used when the container is rendered. This is where you should add your custom
   * logic that is needed to be run every frame.
   *
   * In v7 many users used `updateTransform` for this, however the way v8 renders objects is different
   * and "updateTransform" is no longer called every frame
   * @example
   * const container = new Container();
   * container.onRender = () => {
   *    container.rotation += 0.01;
   * };
   * @memberof scene.Container#
   */
  get onRender() {
    return this._onRender;
  }
};
export {
  t as onRenderMixin
};
//# sourceMappingURL=index494.js.map

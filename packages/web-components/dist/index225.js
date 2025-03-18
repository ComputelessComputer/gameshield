import { BLEND_MODES as O } from "./index146.js";
function A(_, N = []) {
  return N[O.NORMAL] = [_.ONE, _.ONE_MINUS_SRC_ALPHA], N[O.ADD] = [_.ONE, _.ONE], N[O.MULTIPLY] = [_.DST_COLOR, _.ONE_MINUS_SRC_ALPHA, _.ONE, _.ONE_MINUS_SRC_ALPHA], N[O.SCREEN] = [_.ONE, _.ONE_MINUS_SRC_COLOR, _.ONE, _.ONE_MINUS_SRC_ALPHA], N[O.OVERLAY] = [_.ONE, _.ONE_MINUS_SRC_ALPHA], N[O.DARKEN] = [_.ONE, _.ONE_MINUS_SRC_ALPHA], N[O.LIGHTEN] = [_.ONE, _.ONE_MINUS_SRC_ALPHA], N[O.COLOR_DODGE] = [_.ONE, _.ONE_MINUS_SRC_ALPHA], N[O.COLOR_BURN] = [_.ONE, _.ONE_MINUS_SRC_ALPHA], N[O.HARD_LIGHT] = [_.ONE, _.ONE_MINUS_SRC_ALPHA], N[O.SOFT_LIGHT] = [_.ONE, _.ONE_MINUS_SRC_ALPHA], N[O.DIFFERENCE] = [_.ONE, _.ONE_MINUS_SRC_ALPHA], N[O.EXCLUSION] = [_.ONE, _.ONE_MINUS_SRC_ALPHA], N[O.HUE] = [_.ONE, _.ONE_MINUS_SRC_ALPHA], N[O.SATURATION] = [_.ONE, _.ONE_MINUS_SRC_ALPHA], N[O.COLOR] = [_.ONE, _.ONE_MINUS_SRC_ALPHA], N[O.LUMINOSITY] = [_.ONE, _.ONE_MINUS_SRC_ALPHA], N[O.NONE] = [0, 0], N[O.NORMAL_NPM] = [_.SRC_ALPHA, _.ONE_MINUS_SRC_ALPHA, _.ONE, _.ONE_MINUS_SRC_ALPHA], N[O.ADD_NPM] = [_.SRC_ALPHA, _.ONE, _.ONE, _.ONE], N[O.SCREEN_NPM] = [_.SRC_ALPHA, _.ONE_MINUS_SRC_COLOR, _.ONE, _.ONE_MINUS_SRC_ALPHA], N[O.SRC_IN] = [_.DST_ALPHA, _.ZERO], N[O.SRC_OUT] = [_.ONE_MINUS_DST_ALPHA, _.ZERO], N[O.SRC_ATOP] = [_.DST_ALPHA, _.ONE_MINUS_SRC_ALPHA], N[O.DST_OVER] = [_.ONE_MINUS_DST_ALPHA, _.ONE], N[O.DST_IN] = [_.ZERO, _.SRC_ALPHA], N[O.DST_OUT] = [_.ZERO, _.ONE_MINUS_SRC_ALPHA], N[O.DST_ATOP] = [_.ONE_MINUS_DST_ALPHA, _.SRC_ALPHA], N[O.XOR] = [_.ONE_MINUS_DST_ALPHA, _.ONE_MINUS_SRC_ALPHA], N[O.SUBTRACT] = [_.ONE, _.ONE, _.ONE, _.ONE, _.FUNC_REVERSE_SUBTRACT, _.FUNC_ADD], N;
}
export {
  A as mapWebGLBlendModesToPixi
};
//# sourceMappingURL=index225.js.map

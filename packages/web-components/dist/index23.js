import { ENV as d } from "./index146.js";
import { settings as u } from "./index145.js";
import "./index36.js";
import "./index40.js";
import "./index41.js";
import "./index42.js";
import "./index43.js";
import { deprecation as t } from "./index133.js";
import "./index24.js";
import "./index44.js";
import "./index45.js";
import { BatchRenderer as s } from "./index48.js";
import { Filter as a } from "./index52.js";
import { Program as o } from "./index49.js";
import { BackgroundSystem as p } from "./index47.js";
import "./index50.js";
import { ContextSystem as m } from "./index51.js";
import "./index53.js";
import "./index55.js";
import "./index58.js";
import "./index59.js";
import "./index60.js";
import "./index61.js";
import "./index62.js";
import "./index63.js";
import "./index66.js";
import "./index69.js";
import "./index70.js";
import { StartupSystem as n } from "./index71.js";
import "./index73.js";
import "./index35.js";
import { TextureGCSystem as i } from "./index74.js";
import "./index75.js";
import "./index76.js";
import { ViewSystem as l } from "./index77.js";
import { BaseTexture as r } from "./index54.js";
u.PREFER_ENV = d.WEBGL2;
u.STRICT_TEXTURE_CACHE = !1;
u.RENDER_OPTIONS = {
  ...m.defaultOptions,
  ...p.defaultOptions,
  ...l.defaultOptions,
  ...n.defaultOptions
};
Object.defineProperties(u, {
  /**
   * @static
   * @name WRAP_MODE
   * @memberof PIXI.settings
   * @type {PIXI.WRAP_MODES}
   * @deprecated since 7.1.0
   * @see PIXI.BaseTexture.defaultOptions.wrapMode
   */
  WRAP_MODE: {
    get() {
      return r.defaultOptions.wrapMode;
    },
    set(e) {
      t("7.1.0", "settings.WRAP_MODE is deprecated, use BaseTexture.defaultOptions.wrapMode"), r.defaultOptions.wrapMode = e;
    }
  },
  /**
   * @static
   * @name SCALE_MODE
   * @memberof PIXI.settings
   * @type {PIXI.SCALE_MODES}
   * @deprecated since 7.1.0
   * @see PIXI.BaseTexture.defaultOptions.scaleMode
   */
  SCALE_MODE: {
    get() {
      return r.defaultOptions.scaleMode;
    },
    set(e) {
      t("7.1.0", "settings.SCALE_MODE is deprecated, use BaseTexture.defaultOptions.scaleMode"), r.defaultOptions.scaleMode = e;
    }
  },
  /**
   * @static
   * @name MIPMAP_TEXTURES
   * @memberof PIXI.settings
   * @type {PIXI.MIPMAP_MODES}
   * @deprecated since 7.1.0
   * @see PIXI.BaseTexture.defaultOptions.mipmap
   */
  MIPMAP_TEXTURES: {
    get() {
      return r.defaultOptions.mipmap;
    },
    set(e) {
      t("7.1.0", "settings.MIPMAP_TEXTURES is deprecated, use BaseTexture.defaultOptions.mipmap"), r.defaultOptions.mipmap = e;
    }
    // MIPMAP_MODES.POW2,
  },
  /**
   * @static
   * @name ANISOTROPIC_LEVEL
   * @memberof PIXI.settings
   * @type {number}
   * @deprecated since 7.1.0
   * @see PIXI.BaseTexture.defaultOptions.anisotropicLevel
   */
  ANISOTROPIC_LEVEL: {
    get() {
      return r.defaultOptions.anisotropicLevel;
    },
    set(e) {
      t(
        "7.1.0",
        "settings.ANISOTROPIC_LEVEL is deprecated, use BaseTexture.defaultOptions.anisotropicLevel"
      ), r.defaultOptions.anisotropicLevel = e;
    }
  },
  /**
   * Default filter resolution.
   * @static
   * @name FILTER_RESOLUTION
   * @memberof PIXI.settings
   * @deprecated since 7.1.0
   * @type {number|null}
   * @see PIXI.Filter.defaultResolution
   */
  FILTER_RESOLUTION: {
    get() {
      return t("7.1.0", "settings.FILTER_RESOLUTION is deprecated, use Filter.defaultResolution"), a.defaultResolution;
    },
    set(e) {
      a.defaultResolution = e;
    }
  },
  /**
   * Default filter samples.
   * @static
   * @name FILTER_MULTISAMPLE
   * @memberof PIXI.settings
   * @deprecated since 7.1.0
   * @type {PIXI.MSAA_QUALITY}
   * @see PIXI.Filter.defaultMultisample
   */
  FILTER_MULTISAMPLE: {
    get() {
      return t("7.1.0", "settings.FILTER_MULTISAMPLE is deprecated, use Filter.defaultMultisample"), a.defaultMultisample;
    },
    set(e) {
      a.defaultMultisample = e;
    }
  },
  /**
   * The maximum textures that this device supports.
   * @static
   * @name SPRITE_MAX_TEXTURES
   * @memberof PIXI.settings
   * @deprecated since 7.1.0
   * @see PIXI.BatchRenderer.defaultMaxTextures
   * @type {number}
   */
  SPRITE_MAX_TEXTURES: {
    get() {
      return s.defaultMaxTextures;
    },
    set(e) {
      t("7.1.0", "settings.SPRITE_MAX_TEXTURES is deprecated, use BatchRenderer.defaultMaxTextures"), s.defaultMaxTextures = e;
    }
  },
  /**
   * The default sprite batch size.
   *
   * The default aims to balance desktop and mobile devices.
   * @static
   * @name SPRITE_BATCH_SIZE
   * @memberof PIXI.settings
   * @see PIXI.BatchRenderer.defaultBatchSize
   * @deprecated since 7.1.0
   * @type {number}
   */
  SPRITE_BATCH_SIZE: {
    get() {
      return s.defaultBatchSize;
    },
    set(e) {
      t("7.1.0", "settings.SPRITE_BATCH_SIZE is deprecated, use BatchRenderer.defaultBatchSize"), s.defaultBatchSize = e;
    }
  },
  /**
   * Can we upload the same buffer in a single frame?
   * @static
   * @name CAN_UPLOAD_SAME_BUFFER
   * @memberof PIXI.settings
   * @see PIXI.BatchRenderer.canUploadSameBuffer
   * @deprecated since 7.1.0
   * @type {boolean}
   */
  CAN_UPLOAD_SAME_BUFFER: {
    get() {
      return s.canUploadSameBuffer;
    },
    set(e) {
      t("7.1.0", "settings.CAN_UPLOAD_SAME_BUFFER is deprecated, use BatchRenderer.canUploadSameBuffer"), s.canUploadSameBuffer = e;
    }
  },
  /**
   * Default Garbage Collection mode.
   * @static
   * @name GC_MODE
   * @memberof PIXI.settings
   * @type {PIXI.GC_MODES}
   * @deprecated since 7.1.0
   * @see PIXI.TextureGCSystem.defaultMode
   */
  GC_MODE: {
    get() {
      return i.defaultMode;
    },
    set(e) {
      t("7.1.0", "settings.GC_MODE is deprecated, use TextureGCSystem.defaultMode"), i.defaultMode = e;
    }
  },
  /**
   * Default Garbage Collection max idle.
   * @static
   * @name GC_MAX_IDLE
   * @memberof PIXI.settings
   * @type {number}
   * @deprecated since 7.1.0
   * @see PIXI.TextureGCSystem.defaultMaxIdle
   */
  GC_MAX_IDLE: {
    get() {
      return i.defaultMaxIdle;
    },
    set(e) {
      t("7.1.0", "settings.GC_MAX_IDLE is deprecated, use TextureGCSystem.defaultMaxIdle"), i.defaultMaxIdle = e;
    }
  },
  /**
   * Default Garbage Collection maximum check count.
   * @static
   * @name GC_MAX_CHECK_COUNT
   * @memberof PIXI.settings
   * @type {number}
   * @deprecated since 7.1.0
   * @see PIXI.TextureGCSystem.defaultCheckCountMax
   */
  GC_MAX_CHECK_COUNT: {
    get() {
      return i.defaultCheckCountMax;
    },
    set(e) {
      t("7.1.0", "settings.GC_MAX_CHECK_COUNT is deprecated, use TextureGCSystem.defaultCheckCountMax"), i.defaultCheckCountMax = e;
    }
  },
  /**
   * Default specify float precision in vertex shader.
   * @static
   * @name PRECISION_VERTEX
   * @memberof PIXI.settings
   * @type {PIXI.PRECISION}
   * @deprecated since 7.1.0
   * @see PIXI.Program.defaultVertexPrecision
   */
  PRECISION_VERTEX: {
    get() {
      return o.defaultVertexPrecision;
    },
    set(e) {
      t("7.1.0", "settings.PRECISION_VERTEX is deprecated, use Program.defaultVertexPrecision"), o.defaultVertexPrecision = e;
    }
  },
  /**
   * Default specify float precision in fragment shader.
   * @static
   * @name PRECISION_FRAGMENT
   * @memberof PIXI.settings
   * @type {PIXI.PRECISION}
   * @deprecated since 7.1.0
   * @see PIXI.Program.defaultFragmentPrecision
   */
  PRECISION_FRAGMENT: {
    get() {
      return o.defaultFragmentPrecision;
    },
    set(e) {
      t("7.1.0", "settings.PRECISION_FRAGMENT is deprecated, use Program.defaultFragmentPrecision"), o.defaultFragmentPrecision = e;
    }
  }
});
//# sourceMappingURL=index23.js.map

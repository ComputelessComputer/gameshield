import "./index34.js";
import { Ticker as r } from "./index35.js";
import "./index36.js";
import { BaseImageResource as _ } from "./index258.js";
const n = class d extends _ {
  /**
   * @param {HTMLVideoElement|object|string|Array<string|object>} source - Video element to use.
   * @param {object} [options] - Options to use
   * @param {boolean} [options.autoLoad=true] - Start loading the video immediately
   * @param {boolean} [options.autoPlay=true] - Start playing video immediately
   * @param {number} [options.updateFPS=0] - How many times a second to update the texture from the video.
   * If 0, `requestVideoFrameCallback` is used to update the texture.
   * If `requestVideoFrameCallback` is not available, the texture is updated every render.
   * @param {boolean} [options.crossorigin=true] - Load image using cross origin
   * @param {boolean} [options.loop=false] - Loops the video
   * @param {boolean} [options.muted=false] - Mutes the video audio, useful for autoplay
   * @param {boolean} [options.playsinline=true] - Prevents opening the video on mobile devices
   */
  constructor(e, t) {
    if (t = t || {}, !(e instanceof HTMLVideoElement)) {
      const s = document.createElement("video");
      t.autoLoad !== !1 && s.setAttribute("preload", "auto"), t.playsinline !== !1 && (s.setAttribute("webkit-playsinline", ""), s.setAttribute("playsinline", "")), t.muted === !0 && (s.setAttribute("muted", ""), s.muted = !0), t.loop === !0 && s.setAttribute("loop", ""), t.autoPlay !== !1 && s.setAttribute("autoplay", ""), typeof e == "string" && (e = [e]);
      const c = e[0].src || e[0];
      _.crossOrigin(s, c, t.crossorigin);
      for (let o = 0; o < e.length; ++o) {
        const l = document.createElement("source");
        let { src: i, mime: a } = e[o];
        if (i = i || e[o], i.startsWith("data:"))
          a = i.slice(5, i.indexOf(";"));
        else if (!i.startsWith("blob:")) {
          const h = i.split("?").shift().toLowerCase(), u = h.slice(h.lastIndexOf(".") + 1);
          a = a || d.MIME_TYPES[u] || `video/${u}`;
        }
        l.src = i, a && (l.type = a), s.appendChild(l);
      }
      e = s;
    }
    super(e), this.noSubImage = !0, this._autoUpdate = !0, this._isConnectedToTicker = !1, this._updateFPS = t.updateFPS || 0, this._msToNextUpdate = 0, this.autoPlay = t.autoPlay !== !1, this._videoFrameRequestCallback = this._videoFrameRequestCallback.bind(this), this._videoFrameRequestCallbackHandle = null, this._load = null, this._resolve = null, this._reject = null, this._onCanPlay = this._onCanPlay.bind(this), this._onError = this._onError.bind(this), this._onPlayStart = this._onPlayStart.bind(this), this._onPlayStop = this._onPlayStop.bind(this), this._onSeeked = this._onSeeked.bind(this), t.autoLoad !== !1 && this.load();
  }
  /**
   * Trigger updating of the texture.
   * @param _deltaTime - time delta since last tick
   */
  update(e = 0) {
    if (!this.destroyed) {
      if (this._updateFPS) {
        const t = r.shared.elapsedMS * this.source.playbackRate;
        this._msToNextUpdate = Math.floor(this._msToNextUpdate - t);
      }
      (!this._updateFPS || this._msToNextUpdate <= 0) && (super.update(
        /* deltaTime*/
      ), this._msToNextUpdate = this._updateFPS ? Math.floor(1e3 / this._updateFPS) : 0);
    }
  }
  _videoFrameRequestCallback() {
    this.update(), this.destroyed ? this._videoFrameRequestCallbackHandle = null : this._videoFrameRequestCallbackHandle = this.source.requestVideoFrameCallback(
      this._videoFrameRequestCallback
    );
  }
  /**
   * Start preloading the video resource.
   * @returns {Promise<void>} Handle the validate event
   */
  load() {
    if (this._load)
      return this._load;
    const e = this.source;
    return (e.readyState === e.HAVE_ENOUGH_DATA || e.readyState === e.HAVE_FUTURE_DATA) && e.width && e.height && (e.complete = !0), e.addEventListener("play", this._onPlayStart), e.addEventListener("pause", this._onPlayStop), e.addEventListener("seeked", this._onSeeked), this._isSourceReady() ? this._onCanPlay() : (e.addEventListener("canplay", this._onCanPlay), e.addEventListener("canplaythrough", this._onCanPlay), e.addEventListener("error", this._onError, !0)), this._load = new Promise((t, s) => {
      this.valid ? t(this) : (this._resolve = t, this._reject = s, e.load());
    }), this._load;
  }
  /**
   * Handle video error events.
   * @param event
   */
  _onError(e) {
    this.source.removeEventListener("error", this._onError, !0), this.onError.emit(e), this._reject && (this._reject(e), this._reject = null, this._resolve = null);
  }
  /**
   * Returns true if the underlying source is playing.
   * @returns - True if playing.
   */
  _isSourcePlaying() {
    const e = this.source;
    return !e.paused && !e.ended;
  }
  /**
   * Returns true if the underlying source is ready for playing.
   * @returns - True if ready.
   */
  _isSourceReady() {
    return this.source.readyState > 2;
  }
  /** Runs the update loop when the video is ready to play. */
  _onPlayStart() {
    this.valid || this._onCanPlay(), this._configureAutoUpdate();
  }
  /** Fired when a pause event is triggered, stops the update loop. */
  _onPlayStop() {
    this._configureAutoUpdate();
  }
  /** Fired when the video is completed seeking to the current playback position. */
  _onSeeked() {
    this._autoUpdate && !this._isSourcePlaying() && (this._msToNextUpdate = 0, this.update(), this._msToNextUpdate = 0);
  }
  /** Fired when the video is loaded and ready to play. */
  _onCanPlay() {
    const e = this.source;
    e.removeEventListener("canplay", this._onCanPlay), e.removeEventListener("canplaythrough", this._onCanPlay);
    const t = this.valid;
    this._msToNextUpdate = 0, this.update(), this._msToNextUpdate = 0, !t && this._resolve && (this._resolve(this), this._resolve = null, this._reject = null), this._isSourcePlaying() ? this._onPlayStart() : this.autoPlay && e.play();
  }
  /** Destroys this texture. */
  dispose() {
    this._configureAutoUpdate();
    const e = this.source;
    e && (e.removeEventListener("play", this._onPlayStart), e.removeEventListener("pause", this._onPlayStop), e.removeEventListener("seeked", this._onSeeked), e.removeEventListener("canplay", this._onCanPlay), e.removeEventListener("canplaythrough", this._onCanPlay), e.removeEventListener("error", this._onError, !0), e.pause(), e.src = "", e.load()), super.dispose();
  }
  /** Should the base texture automatically update itself, set to true by default. */
  get autoUpdate() {
    return this._autoUpdate;
  }
  set autoUpdate(e) {
    e !== this._autoUpdate && (this._autoUpdate = e, this._configureAutoUpdate());
  }
  /**
   * How many times a second to update the texture from the video. If 0, `requestVideoFrameCallback` is used to
   * update the texture. If `requestVideoFrameCallback` is not available, the texture is updated every render.
   * A lower fps can help performance, as updating the texture at 60fps on a 30ps video may not be efficient.
   */
  get updateFPS() {
    return this._updateFPS;
  }
  set updateFPS(e) {
    e !== this._updateFPS && (this._updateFPS = e, this._configureAutoUpdate());
  }
  _configureAutoUpdate() {
    this._autoUpdate && this._isSourcePlaying() ? !this._updateFPS && this.source.requestVideoFrameCallback ? (this._isConnectedToTicker && (r.shared.remove(this.update, this), this._isConnectedToTicker = !1, this._msToNextUpdate = 0), this._videoFrameRequestCallbackHandle === null && (this._videoFrameRequestCallbackHandle = this.source.requestVideoFrameCallback(
      this._videoFrameRequestCallback
    ))) : (this._videoFrameRequestCallbackHandle !== null && (this.source.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle), this._videoFrameRequestCallbackHandle = null), this._isConnectedToTicker || (r.shared.add(this.update, this), this._isConnectedToTicker = !0, this._msToNextUpdate = 0)) : (this._videoFrameRequestCallbackHandle !== null && (this.source.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle), this._videoFrameRequestCallbackHandle = null), this._isConnectedToTicker && (r.shared.remove(this.update, this), this._isConnectedToTicker = !1, this._msToNextUpdate = 0));
  }
  /**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @param {string} extension - The extension of source, if set
   * @returns {boolean} `true` if video source
   */
  static test(e, t) {
    return globalThis.HTMLVideoElement && e instanceof HTMLVideoElement || d.TYPES.includes(t);
  }
};
n.TYPES = ["mp4", "m4v", "webm", "ogg", "ogv", "h264", "avi", "mov"], /**
* Map of video MIME types that can't be directly derived from file extensions.
* @readonly
*/
n.MIME_TYPES = {
  ogv: "video/ogg",
  mov: "video/quicktime",
  m4v: "video/mp4"
};
let P = n;
export {
  P as VideoResource
};
//# sourceMappingURL=index78.js.map

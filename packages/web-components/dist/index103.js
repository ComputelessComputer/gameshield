import "./index20.js";
import "./index21.js";
import { ExtensionType as p, extensions as u } from "./index158.js";
import "./index22.js";
import "./index23.js";
import "./index24.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import "./index28.js";
import "./index29.js";
import "./index30.js";
import "./index31.js";
import "./index32.js";
import "./index33.js";
import "./index34.js";
import "./index35.js";
import "./index36.js";
import "./index37.js";
import "./index38.js";
import "./index39.js";
import "./index40.js";
import "./index41.js";
import "./index42.js";
import "./index43.js";
import "./index44.js";
import "./index45.js";
import "./index46.js";
import "./index47.js";
import "./index48.js";
import "./index49.js";
import "./index50.js";
import "./index51.js";
import "./index52.js";
import "./index53.js";
import "./index54.js";
import "./index55.js";
import "./index56.js";
import "./index57.js";
import "./index58.js";
import "./index59.js";
import "./index60.js";
import "./index61.js";
import "./index62.js";
import "./index63.js";
import "./index64.js";
import "./index65.js";
import "./index66.js";
import "./index67.js";
import "./index68.js";
import "./index69.js";
import "./index70.js";
import "./index71.js";
import "./index72.js";
import "./index73.js";
import "./index74.js";
import "./index75.js";
import "./index76.js";
import "./index77.js";
import "./index78.js";
import { EventBoundary as d } from "./index187.js";
import { EventsTicker as s } from "./index188.js";
import { FederatedPointerEvent as a } from "./index190.js";
import { FederatedWheelEvent as c } from "./index102.js";
const y = 1, E = {
  touchstart: "pointerdown",
  touchend: "pointerup",
  touchendoutside: "pointerupoutside",
  touchmove: "pointermove",
  touchcancel: "pointercancel"
}, h = class l {
  /**
   * @param {PIXI.Renderer} renderer
   */
  constructor(t) {
    this.supportsTouchEvents = "ontouchstart" in globalThis, this.supportsPointerEvents = !!globalThis.PointerEvent, this.domElement = null, this.resolution = 1, this.renderer = t, this.rootBoundary = new d(null), s.init(this), this.autoPreventDefault = !0, this.eventsAdded = !1, this.rootPointerEvent = new a(null), this.rootWheelEvent = new c(null), this.cursorStyles = {
      default: "inherit",
      pointer: "pointer"
    }, this.features = new Proxy({ ...l.defaultEventFeatures }, {
      set: (e, o, i) => (o === "globalMove" && (this.rootBoundary.enableGlobalMoveEvents = i), e[o] = i, !0)
    }), this.onPointerDown = this.onPointerDown.bind(this), this.onPointerMove = this.onPointerMove.bind(this), this.onPointerUp = this.onPointerUp.bind(this), this.onPointerOverOut = this.onPointerOverOut.bind(this), this.onWheel = this.onWheel.bind(this);
  }
  /**
   * The default interaction mode for all display objects.
   * @see PIXI.DisplayObject.eventMode
   * @type {PIXI.EventMode}
   * @readonly
   * @since 7.2.0
   */
  static get defaultEventMode() {
    return this._defaultEventMode;
  }
  /**
   * Runner init called, view is available at this point.
   * @ignore
   */
  init(t) {
    const { view: e, resolution: o } = this.renderer;
    this.setTargetElement(e), this.resolution = o, l._defaultEventMode = t.eventMode ?? "auto", Object.assign(this.features, t.eventFeatures ?? {}), this.rootBoundary.enableGlobalMoveEvents = this.features.globalMove;
  }
  /**
   * Handle changing resolution.
   * @ignore
   */
  resolutionChange(t) {
    this.resolution = t;
  }
  /** Destroys all event listeners and detaches the renderer. */
  destroy() {
    this.setTargetElement(null), this.renderer = null;
  }
  /**
   * Sets the current cursor mode, handling any callbacks or CSS style changes.
   * @param mode - cursor mode, a key from the cursorStyles dictionary
   */
  setCursor(t) {
    t = t || "default";
    let e = !0;
    if (globalThis.OffscreenCanvas && this.domElement instanceof OffscreenCanvas && (e = !1), this.currentCursor === t)
      return;
    this.currentCursor = t;
    const o = this.cursorStyles[t];
    if (o)
      switch (typeof o) {
        case "string":
          e && (this.domElement.style.cursor = o);
          break;
        case "function":
          o(t);
          break;
        case "object":
          e && Object.assign(this.domElement.style, o);
          break;
      }
    else
      e && typeof t == "string" && !Object.prototype.hasOwnProperty.call(this.cursorStyles, t) && (this.domElement.style.cursor = t);
  }
  /**
   * The global pointer event.
   * Useful for getting the pointer position without listening to events.
   * @since 7.2.0
   */
  get pointer() {
    return this.rootPointerEvent;
  }
  /**
   * Event handler for pointer down events on {@link PIXI.EventSystem#domElement this.domElement}.
   * @param nativeEvent - The native mouse/pointer/touch event.
   */
  onPointerDown(t) {
    if (!this.features.click)
      return;
    this.rootBoundary.rootTarget = this.renderer.lastObjectRendered;
    const e = this.normalizeToPointerData(t);
    this.autoPreventDefault && e[0].isNormalized && (t.cancelable || !("cancelable" in t)) && t.preventDefault();
    for (let o = 0, i = e.length; o < i; o++) {
      const r = e[o], n = this.bootstrapEvent(this.rootPointerEvent, r);
      this.rootBoundary.mapEvent(n);
    }
    this.setCursor(this.rootBoundary.cursor);
  }
  /**
   * Event handler for pointer move events on on {@link PIXI.EventSystem#domElement this.domElement}.
   * @param nativeEvent - The native mouse/pointer/touch events.
   */
  onPointerMove(t) {
    if (!this.features.move)
      return;
    this.rootBoundary.rootTarget = this.renderer.lastObjectRendered, s.pointerMoved();
    const e = this.normalizeToPointerData(t);
    for (let o = 0, i = e.length; o < i; o++) {
      const r = this.bootstrapEvent(this.rootPointerEvent, e[o]);
      this.rootBoundary.mapEvent(r);
    }
    this.setCursor(this.rootBoundary.cursor);
  }
  /**
   * Event handler for pointer up events on {@link PIXI.EventSystem#domElement this.domElement}.
   * @param nativeEvent - The native mouse/pointer/touch event.
   */
  onPointerUp(t) {
    if (!this.features.click)
      return;
    this.rootBoundary.rootTarget = this.renderer.lastObjectRendered;
    let e = t.target;
    t.composedPath && t.composedPath().length > 0 && (e = t.composedPath()[0]);
    const o = e !== this.domElement ? "outside" : "", i = this.normalizeToPointerData(t);
    for (let r = 0, n = i.length; r < n; r++) {
      const m = this.bootstrapEvent(this.rootPointerEvent, i[r]);
      m.type += o, this.rootBoundary.mapEvent(m);
    }
    this.setCursor(this.rootBoundary.cursor);
  }
  /**
   * Event handler for pointer over & out events on {@link PIXI.EventSystem#domElement this.domElement}.
   * @param nativeEvent - The native mouse/pointer/touch event.
   */
  onPointerOverOut(t) {
    if (!this.features.click)
      return;
    this.rootBoundary.rootTarget = this.renderer.lastObjectRendered;
    const e = this.normalizeToPointerData(t);
    for (let o = 0, i = e.length; o < i; o++) {
      const r = this.bootstrapEvent(this.rootPointerEvent, e[o]);
      this.rootBoundary.mapEvent(r);
    }
    this.setCursor(this.rootBoundary.cursor);
  }
  /**
   * Passive handler for `wheel` events on {@link PIXI.EventSystem.domElement this.domElement}.
   * @param nativeEvent - The native wheel event.
   */
  onWheel(t) {
    if (!this.features.wheel)
      return;
    const e = this.normalizeWheelEvent(t);
    this.rootBoundary.rootTarget = this.renderer.lastObjectRendered, this.rootBoundary.mapEvent(e);
  }
  /**
   * Sets the {@link PIXI.EventSystem#domElement domElement} and binds event listeners.
   *
   * To deregister the current DOM element without setting a new one, pass {@code null}.
   * @param element - The new DOM element.
   */
  setTargetElement(t) {
    this.removeEvents(), this.domElement = t, s.domElement = t, this.addEvents();
  }
  /** Register event listeners on {@link PIXI.Renderer#domElement this.domElement}. */
  addEvents() {
    if (this.eventsAdded || !this.domElement)
      return;
    s.addTickerListener();
    const t = this.domElement.style;
    t && (globalThis.navigator.msPointerEnabled ? (t.msContentZooming = "none", t.msTouchAction = "none") : this.supportsPointerEvents && (t.touchAction = "none")), this.supportsPointerEvents ? (globalThis.document.addEventListener("pointermove", this.onPointerMove, !0), this.domElement.addEventListener("pointerdown", this.onPointerDown, !0), this.domElement.addEventListener("pointerleave", this.onPointerOverOut, !0), this.domElement.addEventListener("pointerover", this.onPointerOverOut, !0), globalThis.addEventListener("pointerup", this.onPointerUp, !0)) : (globalThis.document.addEventListener("mousemove", this.onPointerMove, !0), this.domElement.addEventListener("mousedown", this.onPointerDown, !0), this.domElement.addEventListener("mouseout", this.onPointerOverOut, !0), this.domElement.addEventListener("mouseover", this.onPointerOverOut, !0), globalThis.addEventListener("mouseup", this.onPointerUp, !0), this.supportsTouchEvents && (this.domElement.addEventListener("touchstart", this.onPointerDown, !0), this.domElement.addEventListener("touchend", this.onPointerUp, !0), this.domElement.addEventListener("touchmove", this.onPointerMove, !0))), this.domElement.addEventListener("wheel", this.onWheel, {
      passive: !0,
      capture: !0
    }), this.eventsAdded = !0;
  }
  /** Unregister event listeners on {@link PIXI.EventSystem#domElement this.domElement}. */
  removeEvents() {
    if (!this.eventsAdded || !this.domElement)
      return;
    s.removeTickerListener();
    const t = this.domElement.style;
    globalThis.navigator.msPointerEnabled ? (t.msContentZooming = "", t.msTouchAction = "") : this.supportsPointerEvents && (t.touchAction = ""), this.supportsPointerEvents ? (globalThis.document.removeEventListener("pointermove", this.onPointerMove, !0), this.domElement.removeEventListener("pointerdown", this.onPointerDown, !0), this.domElement.removeEventListener("pointerleave", this.onPointerOverOut, !0), this.domElement.removeEventListener("pointerover", this.onPointerOverOut, !0), globalThis.removeEventListener("pointerup", this.onPointerUp, !0)) : (globalThis.document.removeEventListener("mousemove", this.onPointerMove, !0), this.domElement.removeEventListener("mousedown", this.onPointerDown, !0), this.domElement.removeEventListener("mouseout", this.onPointerOverOut, !0), this.domElement.removeEventListener("mouseover", this.onPointerOverOut, !0), globalThis.removeEventListener("mouseup", this.onPointerUp, !0), this.supportsTouchEvents && (this.domElement.removeEventListener("touchstart", this.onPointerDown, !0), this.domElement.removeEventListener("touchend", this.onPointerUp, !0), this.domElement.removeEventListener("touchmove", this.onPointerMove, !0))), this.domElement.removeEventListener("wheel", this.onWheel, !0), this.domElement = null, this.eventsAdded = !1;
  }
  /**
   * Maps x and y coords from a DOM object and maps them correctly to the PixiJS view. The
   * resulting value is stored in the point. This takes into account the fact that the DOM
   * element could be scaled and positioned anywhere on the screen.
   * @param  {PIXI.IPointData} point - the point that the result will be stored in
   * @param  {number} x - the x coord of the position to map
   * @param  {number} y - the y coord of the position to map
   */
  mapPositionToPoint(t, e, o) {
    const i = this.domElement.isConnected ? this.domElement.getBoundingClientRect() : {
      x: 0,
      y: 0,
      width: this.domElement.width,
      height: this.domElement.height,
      left: 0,
      top: 0
    }, r = 1 / this.resolution;
    t.x = (e - i.left) * (this.domElement.width / i.width) * r, t.y = (o - i.top) * (this.domElement.height / i.height) * r;
  }
  /**
   * Ensures that the original event object contains all data that a regular pointer event would have
   * @param event - The original event data from a touch or mouse event
   * @returns An array containing a single normalized pointer event, in the case of a pointer
   *  or mouse event, or a multiple normalized pointer events if there are multiple changed touches
   */
  normalizeToPointerData(t) {
    const e = [];
    if (this.supportsTouchEvents && t instanceof TouchEvent)
      for (let o = 0, i = t.changedTouches.length; o < i; o++) {
        const r = t.changedTouches[o];
        typeof r.button > "u" && (r.button = 0), typeof r.buttons > "u" && (r.buttons = 1), typeof r.isPrimary > "u" && (r.isPrimary = t.touches.length === 1 && t.type === "touchstart"), typeof r.width > "u" && (r.width = r.radiusX || 1), typeof r.height > "u" && (r.height = r.radiusY || 1), typeof r.tiltX > "u" && (r.tiltX = 0), typeof r.tiltY > "u" && (r.tiltY = 0), typeof r.pointerType > "u" && (r.pointerType = "touch"), typeof r.pointerId > "u" && (r.pointerId = r.identifier || 0), typeof r.pressure > "u" && (r.pressure = r.force || 0.5), typeof r.twist > "u" && (r.twist = 0), typeof r.tangentialPressure > "u" && (r.tangentialPressure = 0), typeof r.layerX > "u" && (r.layerX = r.offsetX = r.clientX), typeof r.layerY > "u" && (r.layerY = r.offsetY = r.clientY), r.isNormalized = !0, r.type = t.type, e.push(r);
      }
    else if (!globalThis.MouseEvent || t instanceof MouseEvent && (!this.supportsPointerEvents || !(t instanceof globalThis.PointerEvent))) {
      const o = t;
      typeof o.isPrimary > "u" && (o.isPrimary = !0), typeof o.width > "u" && (o.width = 1), typeof o.height > "u" && (o.height = 1), typeof o.tiltX > "u" && (o.tiltX = 0), typeof o.tiltY > "u" && (o.tiltY = 0), typeof o.pointerType > "u" && (o.pointerType = "mouse"), typeof o.pointerId > "u" && (o.pointerId = y), typeof o.pressure > "u" && (o.pressure = 0.5), typeof o.twist > "u" && (o.twist = 0), typeof o.tangentialPressure > "u" && (o.tangentialPressure = 0), o.isNormalized = !0, e.push(o);
    } else
      e.push(t);
    return e;
  }
  /**
   * Normalizes the native {@link https://w3c.github.io/uievents/#interface-wheelevent WheelEvent}.
   *
   * The returned {@link PIXI.FederatedWheelEvent} is a shared instance. It will not persist across
   * multiple native wheel events.
   * @param nativeEvent - The native wheel event that occurred on the canvas.
   * @returns A federated wheel event.
   */
  normalizeWheelEvent(t) {
    const e = this.rootWheelEvent;
    return this.transferMouseData(e, t), e.deltaX = t.deltaX, e.deltaY = t.deltaY, e.deltaZ = t.deltaZ, e.deltaMode = t.deltaMode, this.mapPositionToPoint(e.screen, t.clientX, t.clientY), e.global.copyFrom(e.screen), e.offset.copyFrom(e.screen), e.nativeEvent = t, e.type = t.type, e;
  }
  /**
   * Normalizes the `nativeEvent` into a federateed {@link PIXI.FederatedPointerEvent}.
   * @param event
   * @param nativeEvent
   */
  bootstrapEvent(t, e) {
    return t.originalEvent = null, t.nativeEvent = e, t.pointerId = e.pointerId, t.width = e.width, t.height = e.height, t.isPrimary = e.isPrimary, t.pointerType = e.pointerType, t.pressure = e.pressure, t.tangentialPressure = e.tangentialPressure, t.tiltX = e.tiltX, t.tiltY = e.tiltY, t.twist = e.twist, this.transferMouseData(t, e), this.mapPositionToPoint(t.screen, e.clientX, e.clientY), t.global.copyFrom(t.screen), t.offset.copyFrom(t.screen), t.isTrusted = e.isTrusted, t.type === "pointerleave" && (t.type = "pointerout"), t.type.startsWith("mouse") && (t.type = t.type.replace("mouse", "pointer")), t.type.startsWith("touch") && (t.type = E[t.type] || t.type), t;
  }
  /**
   * Transfers base & mouse event data from the {@code nativeEvent} to the federated event.
   * @param event
   * @param nativeEvent
   */
  transferMouseData(t, e) {
    t.isTrusted = e.isTrusted, t.srcElement = e.srcElement, t.timeStamp = performance.now(), t.type = e.type, t.altKey = e.altKey, t.button = e.button, t.buttons = e.buttons, t.client.x = e.clientX, t.client.y = e.clientY, t.ctrlKey = e.ctrlKey, t.metaKey = e.metaKey, t.movement.x = e.movementX, t.movement.y = e.movementY, t.page.x = e.pageX, t.page.y = e.pageY, t.relatedTarget = null, t.shiftKey = e.shiftKey;
  }
};
h.extension = {
  name: "events",
  type: [
    p.RendererSystem,
    p.CanvasRendererSystem
  ]
}, /**
* The event features that are enabled by the EventSystem
* This option only is available when using **@pixi/events** package
* (included in the **pixi.js** and **pixi.js-legacy** bundle), otherwise it will be ignored.
* @since 7.2.0
*/
h.defaultEventFeatures = {
  move: !0,
  globalMove: !0,
  click: !0,
  wheel: !0
};
let f = h;
u.add(f);
export {
  f as EventSystem
};
//# sourceMappingURL=index103.js.map

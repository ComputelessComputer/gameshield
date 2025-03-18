import "./index23.js";
import "./index24.js";
import { ExtensionType as _, extensions as w } from "./index140.js";
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
import { isMobile as u } from "./index36.js";
import "./index37.js";
import "./index38.js";
import "./index39.js";
import "./index40.js";
import "./index41.js";
import "./index42.js";
import "./index43.js";
import "./index44.js";
import { removeItems as D } from "./index141.js";
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
import "./index79.js";
import "./index80.js";
import "./index81.js";
import "./index102.js";
import "./index103.js";
import { DisplayObject as T } from "./index104.js";
import { FederatedEvent as I } from "./index142.js";
import "./index105.js";
import "./index106.js";
import "./index107.js";
import { accessibleTarget as E } from "./index143.js";
T.mixin(E);
const H = 9, p = 100, f = 0, $ = 0, g = 2, y = 1, C = -1e3, k = -1e3, A = 2;
class x {
  // 2fps
  /**
   * @param {PIXI.CanvasRenderer|PIXI.Renderer} renderer - A reference to the current renderer
   */
  constructor(e) {
    this.debug = !1, this._isActive = !1, this._isMobileAccessibility = !1, this.pool = [], this.renderId = 0, this.children = [], this.androidUpdateCount = 0, this.androidUpdateFrequency = 500, this._hookDiv = null, (u.tablet || u.phone) && this.createTouchHook();
    const t = document.createElement("div");
    t.style.width = `${p}px`, t.style.height = `${p}px`, t.style.position = "absolute", t.style.top = `${f}px`, t.style.left = `${$}px`, t.style.zIndex = g.toString(), this.div = t, this.renderer = e, this._onKeyDown = this._onKeyDown.bind(this), this._onMouseMove = this._onMouseMove.bind(this), globalThis.addEventListener("keydown", this._onKeyDown, !1);
  }
  /**
   * Value of `true` if accessibility is currently active and accessibility layers are showing.
   * @member {boolean}
   * @readonly
   */
  get isActive() {
    return this._isActive;
  }
  /**
   * Value of `true` if accessibility is enabled for touch devices.
   * @member {boolean}
   * @readonly
   */
  get isMobileAccessibility() {
    return this._isMobileAccessibility;
  }
  /**
   * Creates the touch hooks.
   * @private
   */
  createTouchHook() {
    const e = document.createElement("button");
    e.style.width = `${y}px`, e.style.height = `${y}px`, e.style.position = "absolute", e.style.top = `${C}px`, e.style.left = `${k}px`, e.style.zIndex = A.toString(), e.style.backgroundColor = "#FF0000", e.title = "select to enable accessibility for this content", e.addEventListener("focus", () => {
      this._isMobileAccessibility = !0, this.activate(), this.destroyTouchHook();
    }), document.body.appendChild(e), this._hookDiv = e;
  }
  /**
   * Destroys the touch hooks.
   * @private
   */
  destroyTouchHook() {
    this._hookDiv && (document.body.removeChild(this._hookDiv), this._hookDiv = null);
  }
  /**
   * Activating will cause the Accessibility layer to be shown.
   * This is called when a user presses the tab key.
   * @private
   */
  activate() {
    var e;
    this._isActive || (this._isActive = !0, globalThis.document.addEventListener("mousemove", this._onMouseMove, !0), globalThis.removeEventListener("keydown", this._onKeyDown, !1), this.renderer.on("postrender", this.update, this), (e = this.renderer.view.parentNode) == null || e.appendChild(this.div));
  }
  /**
   * Deactivating will cause the Accessibility layer to be hidden.
   * This is called when a user moves the mouse.
   * @private
   */
  deactivate() {
    var e;
    !this._isActive || this._isMobileAccessibility || (this._isActive = !1, globalThis.document.removeEventListener("mousemove", this._onMouseMove, !0), globalThis.addEventListener("keydown", this._onKeyDown, !1), this.renderer.off("postrender", this.update), (e = this.div.parentNode) == null || e.removeChild(this.div));
  }
  /**
   * This recursive function will run through the scene graph and add any new accessible objects to the DOM layer.
   * @private
   * @param {PIXI.Container} displayObject - The DisplayObject to check.
   */
  updateAccessibleObjects(e) {
    if (!e.visible || !e.accessibleChildren)
      return;
    e.accessible && e.isInteractive() && (e._accessibleActive || this.addChild(e), e.renderId = this.renderId);
    const t = e.children;
    if (t)
      for (let o = 0; o < t.length; o++)
        this.updateAccessibleObjects(t[o]);
  }
  /**
   * Before each render this function will ensure that all divs are mapped correctly to their DisplayObjects.
   * @private
   */
  update() {
    const e = performance.now();
    if (u.android.device && e < this.androidUpdateCount || (this.androidUpdateCount = e + this.androidUpdateFrequency, !this.renderer.renderingToScreen))
      return;
    this.renderer.lastObjectRendered && this.updateAccessibleObjects(this.renderer.lastObjectRendered);
    const { x: t, y: o, width: l, height: m } = this.renderer.view.getBoundingClientRect(), { width: d, height: v, resolution: b } = this.renderer, c = l / d * b, a = m / v * b;
    let i = this.div;
    i.style.left = `${t}px`, i.style.top = `${o}px`, i.style.width = `${d}px`, i.style.height = `${v}px`;
    for (let h = 0; h < this.children.length; h++) {
      const s = this.children[h];
      if (s.renderId !== this.renderId)
        s._accessibleActive = !1, D(this.children, h, 1), this.div.removeChild(s._accessibleDiv), this.pool.push(s._accessibleDiv), s._accessibleDiv = null, h--;
      else {
        i = s._accessibleDiv;
        let r = s.hitArea;
        const n = s.worldTransform;
        s.hitArea ? (i.style.left = `${(n.tx + r.x * n.a) * c}px`, i.style.top = `${(n.ty + r.y * n.d) * a}px`, i.style.width = `${r.width * n.a * c}px`, i.style.height = `${r.height * n.d * a}px`) : (r = s.getBounds(), this.capHitArea(r), i.style.left = `${r.x * c}px`, i.style.top = `${r.y * a}px`, i.style.width = `${r.width * c}px`, i.style.height = `${r.height * a}px`, i.title !== s.accessibleTitle && s.accessibleTitle !== null && (i.title = s.accessibleTitle), i.getAttribute("aria-label") !== s.accessibleHint && s.accessibleHint !== null && i.setAttribute("aria-label", s.accessibleHint)), (s.accessibleTitle !== i.title || s.tabIndex !== i.tabIndex) && (i.title = s.accessibleTitle, i.tabIndex = s.tabIndex, this.debug && this.updateDebugHTML(i));
      }
    }
    this.renderId++;
  }
  /**
   * private function that will visually add the information to the
   * accessability div
   * @param {HTMLElement} div -
   */
  updateDebugHTML(e) {
    e.innerHTML = `type: ${e.type}</br> title : ${e.title}</br> tabIndex: ${e.tabIndex}`;
  }
  /**
   * Adjust the hit area based on the bounds of a display object
   * @param {PIXI.Rectangle} hitArea - Bounds of the child
   */
  capHitArea(e) {
    e.x < 0 && (e.width += e.x, e.x = 0), e.y < 0 && (e.height += e.y, e.y = 0);
    const { width: t, height: o } = this.renderer;
    e.x + e.width > t && (e.width = t - e.x), e.y + e.height > o && (e.height = o - e.y);
  }
  /**
   * Adds a DisplayObject to the accessibility manager
   * @private
   * @param {PIXI.DisplayObject} displayObject - The child to make accessible.
   */
  addChild(e) {
    let t = this.pool.pop();
    t || (t = document.createElement("button"), t.style.width = `${p}px`, t.style.height = `${p}px`, t.style.backgroundColor = this.debug ? "rgba(255,255,255,0.5)" : "transparent", t.style.position = "absolute", t.style.zIndex = g.toString(), t.style.borderStyle = "none", navigator.userAgent.toLowerCase().includes("chrome") ? t.setAttribute("aria-live", "off") : t.setAttribute("aria-live", "polite"), navigator.userAgent.match(/rv:.*Gecko\//) ? t.setAttribute("aria-relevant", "additions") : t.setAttribute("aria-relevant", "text"), t.addEventListener("click", this._onClick.bind(this)), t.addEventListener("focus", this._onFocus.bind(this)), t.addEventListener("focusout", this._onFocusOut.bind(this))), t.style.pointerEvents = e.accessiblePointerEvents, t.type = e.accessibleType, e.accessibleTitle && e.accessibleTitle !== null ? t.title = e.accessibleTitle : (!e.accessibleHint || e.accessibleHint === null) && (t.title = `displayObject ${e.tabIndex}`), e.accessibleHint && e.accessibleHint !== null && t.setAttribute("aria-label", e.accessibleHint), this.debug && this.updateDebugHTML(t), e._accessibleActive = !0, e._accessibleDiv = t, t.displayObject = e, this.children.push(e), this.div.appendChild(e._accessibleDiv), e._accessibleDiv.tabIndex = e.tabIndex;
  }
  /**
   * Dispatch events with the EventSystem.
   * @param e
   * @param type
   * @private
   */
  _dispatchEvent(e, t) {
    const { displayObject: o } = e.target, l = this.renderer.events.rootBoundary, m = Object.assign(new I(l), { target: o });
    l.rootTarget = this.renderer.lastObjectRendered, t.forEach((d) => l.dispatchEvent(m, d));
  }
  /**
   * Maps the div button press to pixi's EventSystem (click)
   * @private
   * @param {MouseEvent} e - The click event.
   */
  _onClick(e) {
    this._dispatchEvent(e, ["click", "pointertap", "tap"]);
  }
  /**
   * Maps the div focus events to pixi's EventSystem (mouseover)
   * @private
   * @param {FocusEvent} e - The focus event.
   */
  _onFocus(e) {
    e.target.getAttribute("aria-live") || e.target.setAttribute("aria-live", "assertive"), this._dispatchEvent(e, ["mouseover"]);
  }
  /**
   * Maps the div focus events to pixi's EventSystem (mouseout)
   * @private
   * @param {FocusEvent} e - The focusout event.
   */
  _onFocusOut(e) {
    e.target.getAttribute("aria-live") || e.target.setAttribute("aria-live", "polite"), this._dispatchEvent(e, ["mouseout"]);
  }
  /**
   * Is called when a key is pressed
   * @private
   * @param {KeyboardEvent} e - The keydown event.
   */
  _onKeyDown(e) {
    e.keyCode === H && this.activate();
  }
  /**
   * Is called when the mouse moves across the renderer element
   * @private
   * @param {MouseEvent} e - The mouse event.
   */
  _onMouseMove(e) {
    e.movementX === 0 && e.movementY === 0 || this.deactivate();
  }
  /** Destroys the accessibility manager */
  destroy() {
    this.destroyTouchHook(), this.div = null, globalThis.document.removeEventListener("mousemove", this._onMouseMove, !0), globalThis.removeEventListener("keydown", this._onKeyDown), this.pool = null, this.children = null, this.renderer = null;
  }
}
x.extension = {
  name: "accessibility",
  type: [
    _.RendererPlugin,
    _.CanvasRendererPlugin
  ]
};
w.add(x);
export {
  x as AccessibilityManager
};
//# sourceMappingURL=index18.js.map

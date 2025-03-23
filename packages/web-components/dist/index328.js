import { FederatedEvent as u } from "./index329.js";
import { ExtensionType as a } from "./index153.js";
import { isMobile as p } from "./index330.js";
import { removeItems as y } from "./index331.js";
const f = 9, l = 100, g = 0, m = 0, _ = 2, b = 1, O = -1e3, x = -1e3, D = 2, d = class v {
  // 2fps
  // eslint-disable-next-line jsdoc/require-param
  /**
   * @param {WebGLRenderer|WebGPURenderer} renderer - A reference to the current renderer
   */
  constructor(e, t = p) {
    this._mobileInfo = t, this.debug = !1, this._activateOnTab = !0, this._deactivateOnMouseMove = !0, this._isActive = !1, this._isMobileAccessibility = !1, this._div = null, this._pool = [], this._renderId = 0, this._children = [], this._androidUpdateCount = 0, this._androidUpdateFrequency = 500, this._hookDiv = null, (t.tablet || t.phone) && this._createTouchHook(), this._renderer = e;
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
  get hookDiv() {
    return this._hookDiv;
  }
  /**
   * Creates the touch hooks.
   * @private
   */
  _createTouchHook() {
    const e = document.createElement("button");
    e.style.width = `${b}px`, e.style.height = `${b}px`, e.style.position = "absolute", e.style.top = `${O}px`, e.style.left = `${x}px`, e.style.zIndex = D.toString(), e.style.backgroundColor = "#FF0000", e.title = "select to enable accessibility for this content", e.addEventListener("focus", () => {
      this._isMobileAccessibility = !0, this._activate(), this._destroyTouchHook();
    }), document.body.appendChild(e), this._hookDiv = e;
  }
  /**
   * Destroys the touch hooks.
   * @private
   */
  _destroyTouchHook() {
    this._hookDiv && (document.body.removeChild(this._hookDiv), this._hookDiv = null);
  }
  /**
   * Activating will cause the Accessibility layer to be shown.
   * This is called when a user presses the tab key.
   * @private
   */
  _activate() {
    if (this._isActive)
      return;
    this._isActive = !0, this._div || (this._div = document.createElement("div"), this._div.style.width = `${l}px`, this._div.style.height = `${l}px`, this._div.style.position = "absolute", this._div.style.top = `${g}px`, this._div.style.left = `${m}px`, this._div.style.zIndex = _.toString(), this._div.style.pointerEvents = "none"), this._activateOnTab && (this._onKeyDown = this._onKeyDown.bind(this), globalThis.addEventListener("keydown", this._onKeyDown, !1)), this._deactivateOnMouseMove && (this._onMouseMove = this._onMouseMove.bind(this), globalThis.document.addEventListener("mousemove", this._onMouseMove, !0));
    const e = this._renderer.view.canvas;
    if (e.parentNode)
      e.parentNode.appendChild(this._div), this._initAccessibilitySetup();
    else {
      const t = new MutationObserver(() => {
        e.parentNode && (e.parentNode.appendChild(this._div), t.disconnect(), this._initAccessibilitySetup());
      });
      t.observe(document.body, { childList: !0, subtree: !0 });
    }
  }
  // New method to handle initialization after div is ready
  _initAccessibilitySetup() {
    this._renderer.runners.postrender.add(this), this._renderer.lastObjectRendered && this._updateAccessibleObjects(this._renderer.lastObjectRendered);
  }
  /**
   * Deactivates the accessibility system. Removes listeners and accessibility elements.
   * @private
   */
  _deactivate() {
    if (!(!this._isActive || this._isMobileAccessibility)) {
      this._isActive = !1, globalThis.document.removeEventListener("mousemove", this._onMouseMove, !0), this._activateOnTab && globalThis.addEventListener("keydown", this._onKeyDown, !1), this._renderer.runners.postrender.remove(this);
      for (const e of this._children)
        e._accessibleDiv && e._accessibleDiv.parentNode && (e._accessibleDiv.parentNode.removeChild(e._accessibleDiv), e._accessibleDiv = null), e._accessibleActive = !1;
      this._pool.forEach((e) => {
        e.parentNode && e.parentNode.removeChild(e);
      }), this._div && this._div.parentNode && this._div.parentNode.removeChild(this._div), this._pool = [], this._children = [];
    }
  }
  /**
   * This recursive function will run through the scene graph and add any new accessible objects to the DOM layer.
   * @private
   * @param {Container} container - The Container to check.
   */
  _updateAccessibleObjects(e) {
    if (!e.visible || !e.accessibleChildren)
      return;
    e.accessible && (e._accessibleActive || this._addChild(e), e._renderId = this._renderId);
    const t = e.children;
    if (t)
      for (let i = 0; i < t.length; i++)
        this._updateAccessibleObjects(t[i]);
  }
  /**
   * Runner init called, view is available at this point.
   * @ignore
   */
  init(e) {
    const i = {
      accessibilityOptions: {
        ...v.defaultOptions,
        ...(e == null ? void 0 : e.accessibilityOptions) || {}
      }
    };
    this.debug = i.accessibilityOptions.debug, this._activateOnTab = i.accessibilityOptions.activateOnTab, this._deactivateOnMouseMove = i.accessibilityOptions.deactivateOnMouseMove, i.accessibilityOptions.enabledByDefault ? this._activate() : this._activateOnTab && (this._onKeyDown = this._onKeyDown.bind(this), globalThis.addEventListener("keydown", this._onKeyDown, !1)), this._renderer.runners.postrender.remove(this);
  }
  /**
   * Updates the accessibility layer during rendering.
   * - Removes divs for containers no longer in the scene
   * - Updates the position and dimensions of the root div
   * - Updates positions of active accessibility divs
   * Only fires while the accessibility system is active.
   * @ignore
   */
  postrender() {
    const e = performance.now();
    if (this._mobileInfo.android.device && e < this._androidUpdateCount || (this._androidUpdateCount = e + this._androidUpdateFrequency, !this._renderer.renderingToScreen || !this._renderer.view.canvas))
      return;
    const t = /* @__PURE__ */ new Set();
    if (this._renderer.lastObjectRendered) {
      this._updateAccessibleObjects(this._renderer.lastObjectRendered);
      for (const i of this._children)
        i._renderId === this._renderId && t.add(this._children.indexOf(i));
    }
    for (let i = this._children.length - 1; i >= 0; i--) {
      const s = this._children[i];
      t.has(i) || (s._accessibleDiv && s._accessibleDiv.parentNode && (s._accessibleDiv.parentNode.removeChild(s._accessibleDiv), this._pool.push(s._accessibleDiv), s._accessibleDiv = null), s._accessibleActive = !1, y(this._children, i, 1));
    }
    if (this._renderer.renderingToScreen) {
      const { x: i, y: s, width: r, height: o } = this._renderer.screen, n = this._div;
      n.style.left = `${i}px`, n.style.top = `${s}px`, n.style.width = `${r}px`, n.style.height = `${o}px`;
    }
    for (let i = 0; i < this._children.length; i++) {
      const s = this._children[i];
      if (!s._accessibleActive || !s._accessibleDiv)
        continue;
      const r = s._accessibleDiv, o = s.hitArea || s.getBounds().rectangle;
      if (s.hitArea) {
        const n = s.worldTransform, c = this._renderer.resolution, h = this._renderer.resolution;
        r.style.left = `${(n.tx + o.x * n.a) * c}px`, r.style.top = `${(n.ty + o.y * n.d) * h}px`, r.style.width = `${o.width * n.a * c}px`, r.style.height = `${o.height * n.d * h}px`;
      } else {
        this._capHitArea(o);
        const n = this._renderer.resolution, c = this._renderer.resolution;
        r.style.left = `${o.x * n}px`, r.style.top = `${o.y * c}px`, r.style.width = `${o.width * n}px`, r.style.height = `${o.height * c}px`;
      }
    }
    this._renderId++;
  }
  /**
   * private function that will visually add the information to the
   * accessibility div
   * @param {HTMLElement} div -
   */
  _updateDebugHTML(e) {
    e.innerHTML = `type: ${e.type}</br> title : ${e.title}</br> tabIndex: ${e.tabIndex}`;
  }
  /**
   * Adjust the hit area based on the bounds of a display object
   * @param {Rectangle} hitArea - Bounds of the child
   */
  _capHitArea(e) {
    e.x < 0 && (e.width += e.x, e.x = 0), e.y < 0 && (e.height += e.y, e.y = 0);
    const { width: t, height: i } = this._renderer;
    e.x + e.width > t && (e.width = t - e.x), e.y + e.height > i && (e.height = i - e.y);
  }
  /**
   * Creates or reuses a div element for a Container and adds it to the accessibility layer.
   * Sets up ARIA attributes, event listeners, and positioning based on the container's properties.
   * @private
   * @param {Container} container - The child to make accessible.
   */
  _addChild(e) {
    let t = this._pool.pop();
    t || (e.accessibleType === "button" ? t = document.createElement("button") : (t = document.createElement(e.accessibleType), t.style.cssText = `
                        color: transparent;
                        pointer-events: none;
                        padding: 0;
                        margin: 0;
                        border: 0;
                        outline: 0;
                        background: transparent;
                        box-sizing: border-box;
                        user-select: none;
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                    `, e.accessibleText && (t.innerText = e.accessibleText)), t.style.width = `${l}px`, t.style.height = `${l}px`, t.style.backgroundColor = this.debug ? "rgba(255,255,255,0.5)" : "transparent", t.style.position = "absolute", t.style.zIndex = _.toString(), t.style.borderStyle = "none", navigator.userAgent.toLowerCase().includes("chrome") ? t.setAttribute("aria-live", "off") : t.setAttribute("aria-live", "polite"), navigator.userAgent.match(/rv:.*Gecko\//) ? t.setAttribute("aria-relevant", "additions") : t.setAttribute("aria-relevant", "text"), t.addEventListener("click", this._onClick.bind(this)), t.addEventListener("focus", this._onFocus.bind(this)), t.addEventListener("focusout", this._onFocusOut.bind(this))), t.style.pointerEvents = e.accessiblePointerEvents, t.type = e.accessibleType, e.accessibleTitle && e.accessibleTitle !== null ? t.title = e.accessibleTitle : (!e.accessibleHint || e.accessibleHint === null) && (t.title = `container ${e.tabIndex}`), e.accessibleHint && e.accessibleHint !== null && t.setAttribute("aria-label", e.accessibleHint), this.debug && this._updateDebugHTML(t), e._accessibleActive = !0, e._accessibleDiv = t, t.container = e, this._children.push(e), this._div.appendChild(e._accessibleDiv), e.interactive && (e._accessibleDiv.tabIndex = e.tabIndex);
  }
  /**
   * Dispatch events with the EventSystem.
   * @param e
   * @param type
   * @private
   */
  _dispatchEvent(e, t) {
    const { container: i } = e.target, s = this._renderer.events.rootBoundary, r = Object.assign(new u(s), { target: i });
    s.rootTarget = this._renderer.lastObjectRendered, t.forEach((o) => s.dispatchEvent(r, o));
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
    e.keyCode !== f || !this._activateOnTab || this._activate();
  }
  /**
   * Is called when the mouse moves across the renderer element
   * @private
   * @param {MouseEvent} e - The mouse event.
   */
  _onMouseMove(e) {
    e.movementX === 0 && e.movementY === 0 || this._deactivate();
  }
  /** Destroys the accessibility system. Removes all elements and listeners. */
  destroy() {
    this._deactivate(), this._destroyTouchHook(), this._div = null, this._pool = null, this._children = null, this._renderer = null, this._activateOnTab && globalThis.removeEventListener("keydown", this._onKeyDown);
  }
  /**
   * Enables or disables the accessibility system.
   * @param enabled - Whether to enable or disable accessibility.
   */
  setAccessibilityEnabled(e) {
    e ? this._activate() : this._deactivate();
  }
};
d.extension = {
  type: [
    a.WebGLSystem,
    a.WebGPUSystem
  ],
  name: "accessibility"
};
d.defaultOptions = {
  /**
   * Whether to enable accessibility features on initialization
   * @default false
   */
  enabledByDefault: !1,
  /**
   * Whether to visually show the accessibility divs for debugging
   * @default false
   */
  debug: !1,
  /**
   * Whether to activate accessibility when tab key is pressed
   * @default true
   */
  activateOnTab: !0,
  /**
   * Whether to deactivate accessibility when mouse moves
   * @default true
   */
  deactivateOnMouseMove: !0
};
let M = d;
export {
  M as AccessibilitySystem
};
//# sourceMappingURL=index328.js.map

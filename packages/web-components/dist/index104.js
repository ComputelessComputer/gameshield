import "./index20.js";
import "./index21.js";
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
import { deprecation as c } from "./index137.js";
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
import "./index99.js";
import "./index100.js";
import { DisplayObject as d } from "./index101.js";
import { EventSystem as m } from "./index103.js";
import { FederatedEvent as v } from "./index160.js";
function u(t) {
  return t === "dynamic" || t === "static";
}
const s = {
  /**
   * Property-based event handler for the `click` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onclick = (event) => {
   *  //some function here that happens on click
   * }
   */
  onclick: null,
  /**
   * Property-based event handler for the `mousedown` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onmousedown = (event) => {
   *  //some function here that happens on mousedown
   * }
   */
  onmousedown: null,
  /**
   * Property-based event handler for the `mouseenter` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onmouseenter = (event) => {
   *  //some function here that happens on mouseenter
   * }
   */
  onmouseenter: null,
  /**
   * Property-based event handler for the `mouseleave` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onmouseleave = (event) => {
   *  //some function here that happens on mouseleave
   * }
   */
  onmouseleave: null,
  /**
   * Property-based event handler for the `mousemove` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onmousemove = (event) => {
   *  //some function here that happens on mousemove
   * }
   */
  onmousemove: null,
  /**
   * Property-based event handler for the `globalmousemove` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onglobalmousemove = (event) => {
   *  //some function here that happens on globalmousemove
   * }
   */
  onglobalmousemove: null,
  /**
   * Property-based event handler for the `mouseout` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onmouseout = (event) => {
   *  //some function here that happens on mouseout
   * }
   */
  onmouseout: null,
  /**
   * Property-based event handler for the `mouseover` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onmouseover = (event) => {
   *  //some function here that happens on mouseover
   * }
   */
  onmouseover: null,
  /**
   * Property-based event handler for the `mouseup` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onmouseup = (event) => {
   *  //some function here that happens on mouseup
   * }
   */
  onmouseup: null,
  /**
   * Property-based event handler for the `mouseupoutside` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onmouseupoutside = (event) => {
   *  //some function here that happens on mouseupoutside
   * }
   */
  onmouseupoutside: null,
  /**
   * Property-based event handler for the `pointercancel` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onpointercancel = (event) => {
   *  //some function here that happens on pointercancel
   * }
   */
  onpointercancel: null,
  /**
   * Property-based event handler for the `pointerdown` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onpointerdown = (event) => {
   *  //some function here that happens on pointerdown
   * }
   */
  onpointerdown: null,
  /**
   * Property-based event handler for the `pointerenter` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onpointerenter = (event) => {
   *  //some function here that happens on pointerenter
   * }
   */
  onpointerenter: null,
  /**
   * Property-based event handler for the `pointerleave` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onpointerleave = (event) => {
   *  //some function here that happens on pointerleave
   * }
   */
  onpointerleave: null,
  /**
   * Property-based event handler for the `pointermove` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onpointermove = (event) => {
   *  //some function here that happens on pointermove
   * }
   */
  onpointermove: null,
  /**
   * Property-based event handler for the `globalpointermove` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onglobalpointermove = (event) => {
   *  //some function here that happens on globalpointermove
   * }
   */
  onglobalpointermove: null,
  /**
   * Property-based event handler for the `pointerout` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onpointerout = (event) => {
   *  //some function here that happens on pointerout
   * }
   */
  onpointerout: null,
  /**
   * Property-based event handler for the `pointerover` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onpointerover = (event) => {
   *  //some function here that happens on pointerover
   * }
   */
  onpointerover: null,
  /**
   * Property-based event handler for the `pointertap` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onpointertap = (event) => {
   *  //some function here that happens on pointertap
   * }
   */
  onpointertap: null,
  /**
   * Property-based event handler for the `pointerup` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onpointerup = (event) => {
   *  //some function here that happens on pointerup
   * }
   */
  onpointerup: null,
  /**
   * Property-based event handler for the `pointerupoutside` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onpointerupoutside = (event) => {
   *  //some function here that happens on pointerupoutside
   * }
   */
  onpointerupoutside: null,
  /**
   * Property-based event handler for the `rightclick` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onrightclick = (event) => {
   *  //some function here that happens on rightclick
   * }
   */
  onrightclick: null,
  /**
   * Property-based event handler for the `rightdown` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onrightdown = (event) => {
   *  //some function here that happens on rightdown
   * }
   */
  onrightdown: null,
  /**
   * Property-based event handler for the `rightup` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onrightup = (event) => {
   *  //some function here that happens on rightup
   * }
   */
  onrightup: null,
  /**
   * Property-based event handler for the `rightupoutside` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onrightupoutside = (event) => {
   *  //some function here that happens on rightupoutside
   * }
   */
  onrightupoutside: null,
  /**
   * Property-based event handler for the `tap` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.ontap = (event) => {
   *  //some function here that happens on tap
   * }
   */
  ontap: null,
  /**
   * Property-based event handler for the `touchcancel` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.ontouchcancel = (event) => {
   *  //some function here that happens on touchcancel
   * }
   */
  ontouchcancel: null,
  /**
   * Property-based event handler for the `touchend` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.ontouchend = (event) => {
   *  //some function here that happens on touchend
   * }
   */
  ontouchend: null,
  /**
   * Property-based event handler for the `touchendoutside` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.ontouchendoutside = (event) => {
   *  //some function here that happens on touchendoutside
   * }
   */
  ontouchendoutside: null,
  /**
   * Property-based event handler for the `touchmove` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.ontouchmove = (event) => {
   *  //some function here that happens on touchmove
   * }
   */
  ontouchmove: null,
  /**
   * Property-based event handler for the `globaltouchmove` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onglobaltouchmove = (event) => {
   *  //some function here that happens on globaltouchmove
   * }
   */
  onglobaltouchmove: null,
  /**
   * Property-based event handler for the `touchstart` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.ontouchstart = (event) => {
   *  //some function here that happens on touchstart
   * }
   */
  ontouchstart: null,
  /**
   * Property-based event handler for the `wheel` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onwheel = (event) => {
   *  //some function here that happens on wheel
   * }
   */
  onwheel: null,
  /**
   * @ignore
   */
  _internalInteractive: void 0,
  /**
   * Enable interaction events for the DisplayObject. Touch, pointer and mouse
   * @memberof PIXI.DisplayObject#
   */
  get interactive() {
    return this._internalInteractive ?? u(m.defaultEventMode);
  },
  set interactive(t) {
    c(
      "7.2.0",
      // eslint-disable-next-line max-len
      "Setting interactive is deprecated, use eventMode = 'none'/'passive'/'auto'/'static'/'dynamic' instead."
    ), this._internalInteractive = t, this.eventMode = t ? "static" : "auto";
  },
  /**
   * @ignore
   */
  _internalEventMode: void 0,
  /**
   * Enable interaction events for the DisplayObject. Touch, pointer and mouse.
   * This now replaces the `interactive` property.
   * There are 5 types of interaction settings:
   * - `'none'`: Ignores all interaction events, even on its children.
   * - `'passive'`: Does not emit events and ignores all hit testing on itself and non-interactive children.
   * Interactive children will still emit events.
   * - `'auto'`: Does not emit events but is hit tested if parent is interactive. Same as `interactive = false` in v7
   * - `'static'`: Emit events and is hit tested. Same as `interaction = true` in v7
   * - `'dynamic'`: Emits events and is hit tested but will also receive mock interaction events fired from a ticker to
   * allow for interaction when the mouse isn't moving
   * @example
   * import { Sprite } from 'pixi.js';
   *
   * const sprite = new Sprite(texture);
   * sprite.eventMode = 'static';
   * sprite.on('tap', (event) => {
   *     // Handle event
   * });
   * @memberof PIXI.DisplayObject#
   * @since 7.2.0
   */
  get eventMode() {
    return this._internalEventMode ?? m.defaultEventMode;
  },
  set eventMode(t) {
    this._internalInteractive = u(t), this._internalEventMode = t;
  },
  /**
   * Determines if the displayObject is interactive or not
   * @returns {boolean} Whether the displayObject is interactive or not
   * @memberof PIXI.DisplayObject#
   * @since 7.2.0
   * @example
   * import { Sprite } from 'pixi.js';
   * const sprite = new Sprite(texture);
   * sprite.eventMode = 'static';
   * sprite.isInteractive(); // true
   *
   * sprite.eventMode = 'dynamic';
   * sprite.isInteractive(); // true
   *
   * sprite.eventMode = 'none';
   * sprite.isInteractive(); // false
   *
   * sprite.eventMode = 'passive';
   * sprite.isInteractive(); // false
   *
   * sprite.eventMode = 'auto';
   * sprite.isInteractive(); // false
   */
  isInteractive() {
    return this.eventMode === "static" || this.eventMode === "dynamic";
  },
  /**
   * Determines if the children to the displayObject can be clicked/touched
   * Setting this to false allows PixiJS to bypass a recursive `hitTest` function
   * @memberof PIXI.Container#
   */
  interactiveChildren: !0,
  /**
   * Interaction shape. Children will be hit first, then this shape will be checked.
   * Setting this will cause this shape to be checked in hit tests rather than the displayObject's bounds.
   * @example
   * import { Rectangle, Sprite } from 'pixi.js';
   *
   * const sprite = new Sprite(texture);
   * sprite.interactive = true;
   * sprite.hitArea = new Rectangle(0, 0, 100, 100);
   * @member {PIXI.IHitArea}
   * @memberof PIXI.DisplayObject#
   */
  hitArea: null,
  /**
   * Unlike `on` or `addListener` which are methods from EventEmitter, `addEventListener`
   * seeks to be compatible with the DOM's `addEventListener` with support for options.
   * **IMPORTANT:** _Only_ available if using the `@pixi/events` package.
   * @memberof PIXI.DisplayObject
   * @param type - The type of event to listen to.
   * @param listener - The listener callback or object.
   * @param options - Listener options, used for capture phase.
   * @example
   * // Tell the user whether they did a single, double, triple, or nth click.
   * button.addEventListener('click', {
   *     handleEvent(e): {
   *         let prefix;
   *
   *         switch (e.detail) {
   *             case 1: prefix = 'single'; break;
   *             case 2: prefix = 'double'; break;
   *             case 3: prefix = 'triple'; break;
   *             default: prefix = e.detail + 'th'; break;
   *         }
   *
   *         console.log('That was a ' + prefix + 'click');
   *     }
   * });
   *
   * // But skip the first click!
   * button.parent.addEventListener('click', function blockClickOnce(e) {
   *     e.stopImmediatePropagation();
   *     button.parent.removeEventListener('click', blockClickOnce, true);
   * }, {
   *     capture: true,
   * });
   */
  addEventListener(t, o, e) {
    const i = typeof e == "boolean" && e || typeof e == "object" && e.capture, n = typeof e == "object" ? e.signal : void 0, a = typeof e == "object" ? e.once === !0 : !1, r = typeof o == "function" ? void 0 : o;
    t = i ? `${t}capture` : t;
    const p = typeof o == "function" ? o : o.handleEvent, l = this;
    n && n.addEventListener("abort", () => {
      l.off(t, p, r);
    }), a ? l.once(t, p, r) : l.on(t, p, r);
  },
  /**
   * Unlike `off` or `removeListener` which are methods from EventEmitter, `removeEventListener`
   * seeks to be compatible with the DOM's `removeEventListener` with support for options.
   * **IMPORTANT:** _Only_ available if using the `@pixi/events` package.
   * @memberof PIXI.DisplayObject
   * @param type - The type of event the listener is bound to.
   * @param listener - The listener callback or object.
   * @param options - The original listener options. This is required to deregister a capture phase listener.
   */
  removeEventListener(t, o, e) {
    const i = typeof e == "boolean" && e || typeof e == "object" && e.capture, n = typeof o == "function" ? void 0 : o;
    t = i ? `${t}capture` : t, o = typeof o == "function" ? o : o.handleEvent, this.off(t, o, n);
  },
  /**
   * Dispatch the event on this {@link PIXI.DisplayObject} using the event's {@link PIXI.EventBoundary}.
   *
   * The target of the event is set to `this` and the `defaultPrevented` flag is cleared before dispatch.
   *
   * **IMPORTANT:** _Only_ available if using the `@pixi/events` package.
   * @memberof PIXI.DisplayObject
   * @param e - The event to dispatch.
   * @returns Whether the {@link PIXI.FederatedEvent.preventDefault preventDefault}() method was not invoked.
   * @example
   * // Reuse a click event!
   * button.dispatchEvent(clickEvent);
   */
  dispatchEvent(t) {
    if (!(t instanceof v))
      throw new Error("DisplayObject cannot propagate events outside of the Federated Events API");
    return t.defaultPrevented = !1, t.path = null, t.target = this, t.manager.dispatchEvent(t), !t.defaultPrevented;
  }
};
d.mixin(s);
export {
  s as FederatedDisplayObject
};
//# sourceMappingURL=index104.js.map

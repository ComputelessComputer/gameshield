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
import { Point as y } from "./index33.js";
import "./index34.js";
import "./index35.js";
import "./index36.js";
import "./index37.js";
import "./index38.js";
import "./index39.js";
import "./index40.js";
import P from "./index41.js";
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
import "./index79.js";
import "./index80.js";
import "./index81.js";
import { EventsTicker as g } from "./index243.js";
import { FederatedMouseEvent as E } from "./index244.js";
import { FederatedPointerEvent as l } from "./index245.js";
import { FederatedWheelEvent as T } from "./index105.js";
const f = 2048, M = new y(), d = new y();
class Gt {
  /**
   * @param rootTarget - The holder of the event boundary.
   */
  constructor(t) {
    this.dispatch = new P(), this.moveOnAll = !1, this.enableGlobalMoveEvents = !0, this.mappingState = {
      trackingData: {}
    }, this.eventPool = /* @__PURE__ */ new Map(), this._allInteractiveElements = [], this._hitElements = [], this._isPointerMoveEvent = !1, this.rootTarget = t, this.hitPruneFn = this.hitPruneFn.bind(this), this.hitTestFn = this.hitTestFn.bind(this), this.mapPointerDown = this.mapPointerDown.bind(this), this.mapPointerMove = this.mapPointerMove.bind(this), this.mapPointerOut = this.mapPointerOut.bind(this), this.mapPointerOver = this.mapPointerOver.bind(this), this.mapPointerUp = this.mapPointerUp.bind(this), this.mapPointerUpOutside = this.mapPointerUpOutside.bind(this), this.mapWheel = this.mapWheel.bind(this), this.mappingTable = {}, this.addEventMapping("pointerdown", this.mapPointerDown), this.addEventMapping("pointermove", this.mapPointerMove), this.addEventMapping("pointerout", this.mapPointerOut), this.addEventMapping("pointerleave", this.mapPointerOut), this.addEventMapping("pointerover", this.mapPointerOver), this.addEventMapping("pointerup", this.mapPointerUp), this.addEventMapping("pointerupoutside", this.mapPointerUpOutside), this.addEventMapping("wheel", this.mapWheel);
  }
  /**
   * Adds an event mapping for the event `type` handled by `fn`.
   *
   * Event mappings can be used to implement additional or custom events. They take an event
   * coming from the upstream scene (or directly from the {@link PIXI.EventSystem}) and dispatch new downstream events
   * generally trickling down and bubbling up to {@link PIXI.EventBoundary.rootTarget this.rootTarget}.
   *
   * To modify the semantics of existing events, the built-in mapping methods of EventBoundary should be overridden
   * instead.
   * @param type - The type of upstream event to map.
   * @param fn - The mapping method. The context of this function must be bound manually, if desired.
   */
  addEventMapping(t, e) {
    this.mappingTable[t] || (this.mappingTable[t] = []), this.mappingTable[t].push({
      fn: e,
      priority: 0
    }), this.mappingTable[t].sort((i, n) => i.priority - n.priority);
  }
  /**
   * Dispatches the given event
   * @param e
   * @param type
   */
  dispatchEvent(t, e) {
    t.propagationStopped = !1, t.propagationImmediatelyStopped = !1, this.propagate(t, e), this.dispatch.emit(e || t.type, t);
  }
  /**
   * Maps the given upstream event through the event boundary and propagates it downstream.
   * @param e
   */
  mapEvent(t) {
    if (!this.rootTarget)
      return;
    const e = this.mappingTable[t.type];
    if (e)
      for (let i = 0, n = e.length; i < n; i++)
        e[i].fn(t);
    else
      console.warn(`[EventBoundary]: Event mapping not defined for ${t.type}`);
  }
  /**
   * Finds the DisplayObject that is the target of a event at the given coordinates.
   *
   * The passed (x,y) coordinates are in the world space above this event boundary.
   * @param x
   * @param y
   */
  hitTest(t, e) {
    g.pauseUpdate = !0;
    const i = this._isPointerMoveEvent && this.enableGlobalMoveEvents ? "hitTestMoveRecursive" : "hitTestRecursive", n = this[i](
      this.rootTarget,
      this.rootTarget.eventMode,
      M.set(t, e),
      this.hitTestFn,
      this.hitPruneFn
    );
    return n && n[0];
  }
  /**
   * Propagate the passed event from from {@link PIXI.EventBoundary.rootTarget this.rootTarget} to its
   * target {@code e.target}.
   * @param e - The event to propagate.
   * @param type
   */
  propagate(t, e) {
    if (!t.target)
      return;
    const i = t.composedPath();
    t.eventPhase = t.CAPTURING_PHASE;
    for (let n = 0, o = i.length - 1; n < o; n++)
      if (t.currentTarget = i[n], this.notifyTarget(t, e), t.propagationStopped || t.propagationImmediatelyStopped)
        return;
    if (t.eventPhase = t.AT_TARGET, t.currentTarget = t.target, this.notifyTarget(t, e), !(t.propagationStopped || t.propagationImmediatelyStopped)) {
      t.eventPhase = t.BUBBLING_PHASE;
      for (let n = i.length - 2; n >= 0; n--)
        if (t.currentTarget = i[n], this.notifyTarget(t, e), t.propagationStopped || t.propagationImmediatelyStopped)
          return;
    }
  }
  /**
   * Emits the event {@code e} to all interactive display objects. The event is propagated in the bubbling phase always.
   *
   * This is used in the `globalpointermove` event.
   * @param e - The emitted event.
   * @param type - The listeners to notify.
   * @param targets - The targets to notify.
   */
  all(t, e, i = this._allInteractiveElements) {
    if (i.length === 0)
      return;
    t.eventPhase = t.BUBBLING_PHASE;
    const n = Array.isArray(e) ? e : [e];
    for (let o = i.length - 1; o >= 0; o--)
      n.forEach((s) => {
        t.currentTarget = i[o], this.notifyTarget(t, s);
      });
  }
  /**
   * Finds the propagation path from {@link PIXI.EventBoundary.rootTarget rootTarget} to the passed
   * {@code target}. The last element in the path is {@code target}.
   * @param target
   */
  propagationPath(t) {
    const e = [t];
    for (let i = 0; i < f && t !== this.rootTarget; i++) {
      if (!t.parent)
        throw new Error("Cannot find propagation path to disconnected target");
      e.push(t.parent), t = t.parent;
    }
    return e.reverse(), e;
  }
  hitTestMoveRecursive(t, e, i, n, o, s = !1) {
    let r = !1;
    if (this._interactivePrune(t))
      return null;
    if ((t.eventMode === "dynamic" || e === "dynamic") && (g.pauseUpdate = !1), t.interactiveChildren && t.children) {
      const u = t.children;
      for (let h = u.length - 1; h >= 0; h--) {
        const a = u[h], p = this.hitTestMoveRecursive(
          a,
          this._isInteractive(e) ? e : a.eventMode,
          i,
          n,
          o,
          s || o(t, i)
        );
        if (p) {
          if (p.length > 0 && !p[p.length - 1].parent)
            continue;
          const m = t.isInteractive();
          (p.length > 0 || m) && (m && this._allInteractiveElements.push(t), p.push(t)), this._hitElements.length === 0 && (this._hitElements = p), r = !0;
        }
      }
    }
    const c = this._isInteractive(e), v = t.isInteractive();
    return c && v && this._allInteractiveElements.push(t), s || this._hitElements.length > 0 ? null : r ? this._hitElements : c && !o(t, i) && n(t, i) ? v ? [t] : [] : null;
  }
  /**
   * Recursive implementation for {@link PIXI.EventBoundary.hitTest hitTest}.
   * @param currentTarget - The DisplayObject that is to be hit tested.
   * @param eventMode - The event mode for the `currentTarget` or one of its parents.
   * @param location - The location that is being tested for overlap.
   * @param testFn - Callback that determines whether the target passes hit testing. This callback
   *  can assume that `pruneFn` failed to prune the display object.
   * @param pruneFn - Callback that determiness whether the target and all of its children
   *  cannot pass the hit test. It is used as a preliminary optimization to prune entire subtrees
   *  of the scene graph.
   * @returns An array holding the hit testing target and all its ancestors in order. The first element
   *  is the target itself and the last is {@link PIXI.EventBoundary.rootTarget rootTarget}. This is the opposite
   *  order w.r.t. the propagation path. If no hit testing target is found, null is returned.
   */
  hitTestRecursive(t, e, i, n, o) {
    if (this._interactivePrune(t) || o(t, i))
      return null;
    if ((t.eventMode === "dynamic" || e === "dynamic") && (g.pauseUpdate = !1), t.interactiveChildren && t.children) {
      const c = t.children;
      for (let v = c.length - 1; v >= 0; v--) {
        const u = c[v], h = this.hitTestRecursive(
          u,
          this._isInteractive(e) ? e : u.eventMode,
          i,
          n,
          o
        );
        if (h) {
          if (h.length > 0 && !h[h.length - 1].parent)
            continue;
          const a = t.isInteractive();
          return (h.length > 0 || a) && h.push(t), h;
        }
      }
    }
    const s = this._isInteractive(e), r = t.isInteractive();
    return s && n(t, i) ? r ? [t] : [] : null;
  }
  _isInteractive(t) {
    return t === "static" || t === "dynamic";
  }
  _interactivePrune(t) {
    return !!(!t || t.isMask || !t.visible || !t.renderable || t.eventMode === "none" || t.eventMode === "passive" && !t.interactiveChildren || t.isMask);
  }
  /**
   * Checks whether the display object or any of its children cannot pass the hit test at all.
   *
   * {@link PIXI.EventBoundary}'s implementation uses the {@link PIXI.DisplayObject.hitArea hitArea}
   * and {@link PIXI.DisplayObject._mask} for pruning.
   * @param displayObject
   * @param location
   */
  hitPruneFn(t, e) {
    var i;
    if (t.hitArea && (t.worldTransform.applyInverse(e, d), !t.hitArea.contains(d.x, d.y)))
      return !0;
    if (t._mask) {
      const n = t._mask.isMaskData ? t._mask.maskObject : t._mask;
      if (n && !((i = n.containsPoint) != null && i.call(n, e)))
        return !0;
    }
    return !1;
  }
  /**
   * Checks whether the display object passes hit testing for the given location.
   * @param displayObject
   * @param location
   * @returns - Whether `displayObject` passes hit testing for `location`.
   */
  hitTestFn(t, e) {
    return t.eventMode === "passive" ? !1 : t.hitArea ? !0 : t.containsPoint ? t.containsPoint(e) : !1;
  }
  /**
   * Notify all the listeners to the event's `currentTarget`.
   *
   * If the `currentTarget` contains the property `on<type>`, then it is called here,
   * simulating the behavior from version 6.x and prior.
   * @param e - The event passed to the target.
   * @param type
   */
  notifyTarget(t, e) {
    var o, s;
    e = e ?? t.type;
    const i = `on${e}`;
    (s = (o = t.currentTarget)[i]) == null || s.call(o, t);
    const n = t.eventPhase === t.CAPTURING_PHASE || t.eventPhase === t.AT_TARGET ? `${e}capture` : e;
    this.notifyListeners(t, n), t.eventPhase === t.AT_TARGET && this.notifyListeners(t, e);
  }
  /**
   * Maps the upstream `pointerdown` events to a downstream `pointerdown` event.
   *
   * `touchstart`, `rightdown`, `mousedown` events are also dispatched for specific pointer types.
   * @param from
   */
  mapPointerDown(t) {
    if (!(t instanceof l)) {
      console.warn("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    const e = this.createPointerEvent(t);
    if (this.dispatchEvent(e, "pointerdown"), e.pointerType === "touch")
      this.dispatchEvent(e, "touchstart");
    else if (e.pointerType === "mouse" || e.pointerType === "pen") {
      const n = e.button === 2;
      this.dispatchEvent(e, n ? "rightdown" : "mousedown");
    }
    const i = this.trackingData(t.pointerId);
    i.pressTargetsByButton[t.button] = e.composedPath(), this.freeEvent(e);
  }
  /**
   * Maps the upstream `pointermove` to downstream `pointerout`, `pointerover`, and `pointermove` events, in that order.
   *
   * The tracking data for the specific pointer has an updated `overTarget`. `mouseout`, `mouseover`,
   * `mousemove`, and `touchmove` events are fired as well for specific pointer types.
   * @param from - The upstream `pointermove` event.
   */
  mapPointerMove(t) {
    var c, v;
    if (!(t instanceof l)) {
      console.warn("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    this._allInteractiveElements.length = 0, this._hitElements.length = 0, this._isPointerMoveEvent = !0;
    const e = this.createPointerEvent(t);
    this._isPointerMoveEvent = !1;
    const i = e.pointerType === "mouse" || e.pointerType === "pen", n = this.trackingData(t.pointerId), o = this.findMountedTarget(n.overTargets);
    if (((c = n.overTargets) == null ? void 0 : c.length) > 0 && o !== e.target) {
      const u = t.type === "mousemove" ? "mouseout" : "pointerout", h = this.createPointerEvent(t, u, o);
      if (this.dispatchEvent(h, "pointerout"), i && this.dispatchEvent(h, "mouseout"), !e.composedPath().includes(o)) {
        const a = this.createPointerEvent(t, "pointerleave", o);
        for (a.eventPhase = a.AT_TARGET; a.target && !e.composedPath().includes(a.target); )
          a.currentTarget = a.target, this.notifyTarget(a), i && this.notifyTarget(a, "mouseleave"), a.target = a.target.parent;
        this.freeEvent(a);
      }
      this.freeEvent(h);
    }
    if (o !== e.target) {
      const u = t.type === "mousemove" ? "mouseover" : "pointerover", h = this.clonePointerEvent(e, u);
      this.dispatchEvent(h, "pointerover"), i && this.dispatchEvent(h, "mouseover");
      let a = o == null ? void 0 : o.parent;
      for (; a && a !== this.rootTarget.parent && a !== e.target; )
        a = a.parent;
      if (!a || a === this.rootTarget.parent) {
        const p = this.clonePointerEvent(e, "pointerenter");
        for (p.eventPhase = p.AT_TARGET; p.target && p.target !== o && p.target !== this.rootTarget.parent; )
          p.currentTarget = p.target, this.notifyTarget(p), i && this.notifyTarget(p, "mouseenter"), p.target = p.target.parent;
        this.freeEvent(p);
      }
      this.freeEvent(h);
    }
    const s = [], r = this.enableGlobalMoveEvents ?? !0;
    this.moveOnAll ? s.push("pointermove") : this.dispatchEvent(e, "pointermove"), r && s.push("globalpointermove"), e.pointerType === "touch" && (this.moveOnAll ? s.splice(1, 0, "touchmove") : this.dispatchEvent(e, "touchmove"), r && s.push("globaltouchmove")), i && (this.moveOnAll ? s.splice(1, 0, "mousemove") : this.dispatchEvent(e, "mousemove"), r && s.push("globalmousemove"), this.cursor = (v = e.target) == null ? void 0 : v.cursor), s.length > 0 && this.all(e, s), this._allInteractiveElements.length = 0, this._hitElements.length = 0, n.overTargets = e.composedPath(), this.freeEvent(e);
  }
  /**
   * Maps the upstream `pointerover` to downstream `pointerover` and `pointerenter` events, in that order.
   *
   * The tracking data for the specific pointer gets a new `overTarget`.
   * @param from - The upstream `pointerover` event.
   */
  mapPointerOver(t) {
    var s;
    if (!(t instanceof l)) {
      console.warn("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    const e = this.trackingData(t.pointerId), i = this.createPointerEvent(t), n = i.pointerType === "mouse" || i.pointerType === "pen";
    this.dispatchEvent(i, "pointerover"), n && this.dispatchEvent(i, "mouseover"), i.pointerType === "mouse" && (this.cursor = (s = i.target) == null ? void 0 : s.cursor);
    const o = this.clonePointerEvent(i, "pointerenter");
    for (o.eventPhase = o.AT_TARGET; o.target && o.target !== this.rootTarget.parent; )
      o.currentTarget = o.target, this.notifyTarget(o), n && this.notifyTarget(o, "mouseenter"), o.target = o.target.parent;
    e.overTargets = i.composedPath(), this.freeEvent(i), this.freeEvent(o);
  }
  /**
   * Maps the upstream `pointerout` to downstream `pointerout`, `pointerleave` events, in that order.
   *
   * The tracking data for the specific pointer is cleared of a `overTarget`.
   * @param from - The upstream `pointerout` event.
   */
  mapPointerOut(t) {
    if (!(t instanceof l)) {
      console.warn("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    const e = this.trackingData(t.pointerId);
    if (e.overTargets) {
      const i = t.pointerType === "mouse" || t.pointerType === "pen", n = this.findMountedTarget(e.overTargets), o = this.createPointerEvent(t, "pointerout", n);
      this.dispatchEvent(o), i && this.dispatchEvent(o, "mouseout");
      const s = this.createPointerEvent(t, "pointerleave", n);
      for (s.eventPhase = s.AT_TARGET; s.target && s.target !== this.rootTarget.parent; )
        s.currentTarget = s.target, this.notifyTarget(s), i && this.notifyTarget(s, "mouseleave"), s.target = s.target.parent;
      e.overTargets = null, this.freeEvent(o), this.freeEvent(s);
    }
    this.cursor = null;
  }
  /**
   * Maps the upstream `pointerup` event to downstream `pointerup`, `pointerupoutside`,
   * and `click`/`rightclick`/`pointertap` events, in that order.
   *
   * The `pointerupoutside` event bubbles from the original `pointerdown` target to the most specific
   * ancestor of the `pointerdown` and `pointerup` targets, which is also the `click` event's target. `touchend`,
   * `rightup`, `mouseup`, `touchendoutside`, `rightupoutside`, `mouseupoutside`, and `tap` are fired as well for
   * specific pointer types.
   * @param from - The upstream `pointerup` event.
   */
  mapPointerUp(t) {
    if (!(t instanceof l)) {
      console.warn("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    const e = performance.now(), i = this.createPointerEvent(t);
    if (this.dispatchEvent(i, "pointerup"), i.pointerType === "touch")
      this.dispatchEvent(i, "touchend");
    else if (i.pointerType === "mouse" || i.pointerType === "pen") {
      const r = i.button === 2;
      this.dispatchEvent(i, r ? "rightup" : "mouseup");
    }
    const n = this.trackingData(t.pointerId), o = this.findMountedTarget(n.pressTargetsByButton[t.button]);
    let s = o;
    if (o && !i.composedPath().includes(o)) {
      let r = o;
      for (; r && !i.composedPath().includes(r); ) {
        if (i.currentTarget = r, this.notifyTarget(i, "pointerupoutside"), i.pointerType === "touch")
          this.notifyTarget(i, "touchendoutside");
        else if (i.pointerType === "mouse" || i.pointerType === "pen") {
          const c = i.button === 2;
          this.notifyTarget(i, c ? "rightupoutside" : "mouseupoutside");
        }
        r = r.parent;
      }
      delete n.pressTargetsByButton[t.button], s = r;
    }
    if (s) {
      const r = this.clonePointerEvent(i, "click");
      r.target = s, r.path = null, n.clicksByButton[t.button] || (n.clicksByButton[t.button] = {
        clickCount: 0,
        target: r.target,
        timeStamp: e
      });
      const c = n.clicksByButton[t.button];
      if (c.target === r.target && e - c.timeStamp < 200 ? ++c.clickCount : c.clickCount = 1, c.target = r.target, c.timeStamp = e, r.detail = c.clickCount, r.pointerType === "mouse") {
        const v = r.button === 2;
        this.dispatchEvent(r, v ? "rightclick" : "click");
      } else
        r.pointerType === "touch" && this.dispatchEvent(r, "tap");
      this.dispatchEvent(r, "pointertap"), this.freeEvent(r);
    }
    this.freeEvent(i);
  }
  /**
   * Maps the upstream `pointerupoutside` event to a downstream `pointerupoutside` event, bubbling from the original
   * `pointerdown` target to `rootTarget`.
   *
   * (The most specific ancestor of the `pointerdown` event and the `pointerup` event must the
   * `{@link PIXI.EventBoundary}'s root because the `pointerup` event occurred outside of the boundary.)
   *
   * `touchendoutside`, `mouseupoutside`, and `rightupoutside` events are fired as well for specific pointer
   * types. The tracking data for the specific pointer is cleared of a `pressTarget`.
   * @param from - The upstream `pointerupoutside` event.
   */
  mapPointerUpOutside(t) {
    if (!(t instanceof l)) {
      console.warn("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    const e = this.trackingData(t.pointerId), i = this.findMountedTarget(e.pressTargetsByButton[t.button]), n = this.createPointerEvent(t);
    if (i) {
      let o = i;
      for (; o; )
        n.currentTarget = o, this.notifyTarget(n, "pointerupoutside"), n.pointerType === "touch" ? this.notifyTarget(n, "touchendoutside") : (n.pointerType === "mouse" || n.pointerType === "pen") && this.notifyTarget(n, n.button === 2 ? "rightupoutside" : "mouseupoutside"), o = o.parent;
      delete e.pressTargetsByButton[t.button];
    }
    this.freeEvent(n);
  }
  /**
   * Maps the upstream `wheel` event to a downstream `wheel` event.
   * @param from - The upstream `wheel` event.
   */
  mapWheel(t) {
    if (!(t instanceof T)) {
      console.warn("EventBoundary cannot map a non-wheel event as a wheel event");
      return;
    }
    const e = this.createWheelEvent(t);
    this.dispatchEvent(e), this.freeEvent(e);
  }
  /**
   * Finds the most specific event-target in the given propagation path that is still mounted in the scene graph.
   *
   * This is used to find the correct `pointerup` and `pointerout` target in the case that the original `pointerdown`
   * or `pointerover` target was unmounted from the scene graph.
   * @param propagationPath - The propagation path was valid in the past.
   * @returns - The most specific event-target still mounted at the same location in the scene graph.
   */
  findMountedTarget(t) {
    if (!t)
      return null;
    let e = t[0];
    for (let i = 1; i < t.length && t[i].parent === e; i++)
      e = t[i];
    return e;
  }
  /**
   * Creates an event whose {@code originalEvent} is {@code from}, with an optional `type` and `target` override.
   *
   * The event is allocated using {@link PIXI.EventBoundary#allocateEvent this.allocateEvent}.
   * @param from - The {@code originalEvent} for the returned event.
   * @param [type=from.type] - The type of the returned event.
   * @param target - The target of the returned event.
   */
  createPointerEvent(t, e, i) {
    const n = this.allocateEvent(l);
    return this.copyPointerData(t, n), this.copyMouseData(t, n), this.copyData(t, n), n.nativeEvent = t.nativeEvent, n.originalEvent = t, n.target = i ?? this.hitTest(n.global.x, n.global.y) ?? this._hitElements[0], typeof e == "string" && (n.type = e), n;
  }
  /**
   * Creates a wheel event whose {@code originalEvent} is {@code from}.
   *
   * The event is allocated using {@link PIXI.EventBoundary#allocateEvent this.allocateEvent}.
   * @param from - The upstream wheel event.
   */
  createWheelEvent(t) {
    const e = this.allocateEvent(T);
    return this.copyWheelData(t, e), this.copyMouseData(t, e), this.copyData(t, e), e.nativeEvent = t.nativeEvent, e.originalEvent = t, e.target = this.hitTest(e.global.x, e.global.y), e;
  }
  /**
   * Clones the event {@code from}, with an optional {@code type} override.
   *
   * The event is allocated using {@link PIXI.EventBoundary#allocateEvent this.allocateEvent}.
   * @param from - The event to clone.
   * @param [type=from.type] - The type of the returned event.
   */
  clonePointerEvent(t, e) {
    const i = this.allocateEvent(l);
    return i.nativeEvent = t.nativeEvent, i.originalEvent = t.originalEvent, this.copyPointerData(t, i), this.copyMouseData(t, i), this.copyData(t, i), i.target = t.target, i.path = t.composedPath().slice(), i.type = e ?? i.type, i;
  }
  /**
   * Copies wheel {@link PIXI.FederatedWheelEvent} data from {@code from} into {@code to}.
   *
   * The following properties are copied:
   * + deltaMode
   * + deltaX
   * + deltaY
   * + deltaZ
   * @param from
   * @param to
   */
  copyWheelData(t, e) {
    e.deltaMode = t.deltaMode, e.deltaX = t.deltaX, e.deltaY = t.deltaY, e.deltaZ = t.deltaZ;
  }
  /**
   * Copies pointer {@link PIXI.FederatedPointerEvent} data from {@code from} into {@code to}.
   *
   * The following properties are copied:
   * + pointerId
   * + width
   * + height
   * + isPrimary
   * + pointerType
   * + pressure
   * + tangentialPressure
   * + tiltX
   * + tiltY
   * @param from
   * @param to
   */
  copyPointerData(t, e) {
    t instanceof l && e instanceof l && (e.pointerId = t.pointerId, e.width = t.width, e.height = t.height, e.isPrimary = t.isPrimary, e.pointerType = t.pointerType, e.pressure = t.pressure, e.tangentialPressure = t.tangentialPressure, e.tiltX = t.tiltX, e.tiltY = t.tiltY, e.twist = t.twist);
  }
  /**
   * Copies mouse {@link PIXI.FederatedMouseEvent} data from {@code from} to {@code to}.
   *
   * The following properties are copied:
   * + altKey
   * + button
   * + buttons
   * + clientX
   * + clientY
   * + metaKey
   * + movementX
   * + movementY
   * + pageX
   * + pageY
   * + x
   * + y
   * + screen
   * + shiftKey
   * + global
   * @param from
   * @param to
   */
  copyMouseData(t, e) {
    t instanceof E && e instanceof E && (e.altKey = t.altKey, e.button = t.button, e.buttons = t.buttons, e.client.copyFrom(t.client), e.ctrlKey = t.ctrlKey, e.metaKey = t.metaKey, e.movement.copyFrom(t.movement), e.screen.copyFrom(t.screen), e.shiftKey = t.shiftKey, e.global.copyFrom(t.global));
  }
  /**
   * Copies base {@link PIXI.FederatedEvent} data from {@code from} into {@code to}.
   *
   * The following properties are copied:
   * + isTrusted
   * + srcElement
   * + timeStamp
   * + type
   * @param from - The event to copy data from.
   * @param to - The event to copy data into.
   */
  copyData(t, e) {
    e.isTrusted = t.isTrusted, e.srcElement = t.srcElement, e.timeStamp = performance.now(), e.type = t.type, e.detail = t.detail, e.view = t.view, e.which = t.which, e.layer.copyFrom(t.layer), e.page.copyFrom(t.page);
  }
  /**
   * @param id - The pointer ID.
   * @returns The tracking data stored for the given pointer. If no data exists, a blank
   *  state will be created.
   */
  trackingData(t) {
    return this.mappingState.trackingData[t] || (this.mappingState.trackingData[t] = {
      pressTargetsByButton: {},
      clicksByButton: {},
      overTarget: null
    }), this.mappingState.trackingData[t];
  }
  /**
   * Allocate a specific type of event from {@link PIXI.EventBoundary#eventPool this.eventPool}.
   *
   * This allocation is constructor-agnostic, as long as it only takes one argument - this event
   * boundary.
   * @param constructor - The event's constructor.
   */
  allocateEvent(t) {
    this.eventPool.has(t) || this.eventPool.set(t, []);
    const e = this.eventPool.get(t).pop() || new t(this);
    return e.eventPhase = e.NONE, e.currentTarget = null, e.path = null, e.target = null, e;
  }
  /**
   * Frees the event and puts it back into the event pool.
   *
   * It is illegal to reuse the event until it is allocated again, using `this.allocateEvent`.
   *
   * It is also advised that events not allocated from {@link PIXI.EventBoundary#allocateEvent this.allocateEvent}
   * not be freed. This is because of the possibility that the same event is freed twice, which can cause
   * it to be allocated twice & result in overwriting.
   * @param event - The event to be freed.
   * @throws Error if the event is managed by another event boundary.
   */
  freeEvent(t) {
    if (t.manager !== this)
      throw new Error("It is illegal to free an event not managed by this EventBoundary!");
    const e = t.constructor;
    this.eventPool.has(e) || this.eventPool.set(e, []), this.eventPool.get(e).push(t);
  }
  /**
   * Similar to {@link PIXI.EventEmitter.emit}, except it stops if the `propagationImmediatelyStopped` flag
   * is set on the event.
   * @param e - The event to call each listener with.
   * @param type - The event key.
   */
  notifyListeners(t, e) {
    const i = t.currentTarget._events[e];
    if (i && t.currentTarget.isInteractive())
      if ("fn" in i)
        i.once && t.currentTarget.removeListener(e, i.fn, void 0, !0), i.fn.call(i.context, t);
      else
        for (let n = 0, o = i.length; n < o && !t.propagationImmediatelyStopped; n++)
          i[n].once && t.currentTarget.removeListener(e, i[n].fn, void 0, !0), i[n].fn.call(i[n].context, t);
  }
}
export {
  Gt as EventBoundary
};
//# sourceMappingURL=index242.js.map

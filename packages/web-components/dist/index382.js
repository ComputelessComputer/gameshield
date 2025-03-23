import P from "./index157.js";
import { Point as m } from "./index383.js";
import { warn as g } from "./index338.js";
import { EventsTicker as f } from "./index384.js";
import { FederatedMouseEvent as T } from "./index385.js";
import { FederatedPointerEvent as d } from "./index386.js";
import { FederatedWheelEvent as y } from "./index387.js";
const b = 2048, M = new m(), E = new m();
class S {
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
   * coming from the upstream scene (or directly from the {@link EventSystem}) and dispatch new downstream events
   * generally trickling down and bubbling up to {@link EventBoundary.rootTarget this.rootTarget}.
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
   * @param e - The event to dispatch.
   * @param type - The type of event to dispatch. Defaults to `e.type`.
   */
  dispatchEvent(t, e) {
    t.propagationStopped = !1, t.propagationImmediatelyStopped = !1, this.propagate(t, e), this.dispatch.emit(e || t.type, t);
  }
  /**
   * Maps the given upstream event through the event boundary and propagates it downstream.
   * @param e - The event to map.
   */
  mapEvent(t) {
    if (!this.rootTarget)
      return;
    const e = this.mappingTable[t.type];
    if (e)
      for (let i = 0, n = e.length; i < n; i++)
        e[i].fn(t);
    else
      g(`[EventBoundary]: Event mapping not defined for ${t.type}`);
  }
  /**
   * Finds the Container that is the target of a event at the given coordinates.
   *
   * The passed (x,y) coordinates are in the world space above this event boundary.
   * @param x - The x coordinate of the event.
   * @param y - The y coordinate of the event.
   */
  hitTest(t, e) {
    f.pauseUpdate = !0;
    const n = this._isPointerMoveEvent && this.enableGlobalMoveEvents ? "hitTestMoveRecursive" : "hitTestRecursive", s = this[n](
      this.rootTarget,
      this.rootTarget.eventMode,
      M.set(t, e),
      this.hitTestFn,
      this.hitPruneFn
    );
    return s && s[0];
  }
  /**
   * Propagate the passed event from from {@link EventBoundary.rootTarget this.rootTarget} to its
   * target {@code e.target}.
   * @param e - The event to propagate.
   * @param type - The type of event to propagate. Defaults to `e.type`.
   */
  propagate(t, e) {
    if (!t.target)
      return;
    const i = t.composedPath();
    t.eventPhase = t.CAPTURING_PHASE;
    for (let n = 0, s = i.length - 1; n < s; n++)
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
   * Emits the event {@code e} to all interactive containers. The event is propagated in the bubbling phase always.
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
    for (let s = i.length - 1; s >= 0; s--)
      n.forEach((a) => {
        t.currentTarget = i[s], this.notifyTarget(t, a);
      });
  }
  /**
   * Finds the propagation path from {@link EventBoundary.rootTarget rootTarget} to the passed
   * {@code target}. The last element in the path is {@code target}.
   * @param target - The target to find the propagation path to.
   */
  propagationPath(t) {
    const e = [t];
    for (let i = 0; i < b && t !== this.rootTarget && t.parent; i++) {
      if (!t.parent)
        throw new Error("Cannot find propagation path to disconnected target");
      e.push(t.parent), t = t.parent;
    }
    return e.reverse(), e;
  }
  hitTestMoveRecursive(t, e, i, n, s, a = !1) {
    let r = !1;
    if (this._interactivePrune(t))
      return null;
    if ((t.eventMode === "dynamic" || e === "dynamic") && (f.pauseUpdate = !1), t.interactiveChildren && t.children) {
      const v = t.children;
      for (let l = v.length - 1; l >= 0; l--) {
        const o = v[l], u = this.hitTestMoveRecursive(
          o,
          this._isInteractive(e) ? e : o.eventMode,
          i,
          n,
          s,
          a || s(t, i)
        );
        if (u) {
          if (u.length > 0 && !u[u.length - 1].parent)
            continue;
          const p = t.isInteractive();
          (u.length > 0 || p) && (p && this._allInteractiveElements.push(t), u.push(t)), this._hitElements.length === 0 && (this._hitElements = u), r = !0;
        }
      }
    }
    const h = this._isInteractive(e), c = t.isInteractive();
    return c && c && this._allInteractiveElements.push(t), a || this._hitElements.length > 0 ? null : r ? this._hitElements : h && !s(t, i) && n(t, i) ? c ? [t] : [] : null;
  }
  /**
   * Recursive implementation for {@link EventBoundary.hitTest hitTest}.
   * @param currentTarget - The Container that is to be hit tested.
   * @param eventMode - The event mode for the `currentTarget` or one of its parents.
   * @param location - The location that is being tested for overlap.
   * @param testFn - Callback that determines whether the target passes hit testing. This callback
   *  can assume that `pruneFn` failed to prune the container.
   * @param pruneFn - Callback that determiness whether the target and all of its children
   *  cannot pass the hit test. It is used as a preliminary optimization to prune entire subtrees
   *  of the scene graph.
   * @returns An array holding the hit testing target and all its ancestors in order. The first element
   *  is the target itself and the last is {@link EventBoundary.rootTarget rootTarget}. This is the opposite
   *  order w.r.t. the propagation path. If no hit testing target is found, null is returned.
   */
  hitTestRecursive(t, e, i, n, s) {
    if (this._interactivePrune(t) || s(t, i))
      return null;
    if ((t.eventMode === "dynamic" || e === "dynamic") && (f.pauseUpdate = !1), t.interactiveChildren && t.children) {
      const h = t.children, c = i;
      for (let v = h.length - 1; v >= 0; v--) {
        const l = h[v], o = this.hitTestRecursive(
          l,
          this._isInteractive(e) ? e : l.eventMode,
          c,
          n,
          s
        );
        if (o) {
          if (o.length > 0 && !o[o.length - 1].parent)
            continue;
          const u = t.isInteractive();
          return (o.length > 0 || u) && o.push(t), o;
        }
      }
    }
    const a = this._isInteractive(e), r = t.isInteractive();
    return a && n(t, i) ? r ? [t] : [] : null;
  }
  _isInteractive(t) {
    return t === "static" || t === "dynamic";
  }
  _interactivePrune(t) {
    return !t || !t.visible || !t.renderable || !t.measurable || t.eventMode === "none" || t.eventMode === "passive" && !t.interactiveChildren;
  }
  /**
   * Checks whether the container or any of its children cannot pass the hit test at all.
   *
   * {@link EventBoundary}'s implementation uses the {@link Container.hitArea hitArea}
   * and {@link Container._maskEffect} for pruning.
   * @param container - The container to prune.
   * @param location - The location to test for overlap.
   */
  hitPruneFn(t, e) {
    if (t.hitArea && (t.worldTransform.applyInverse(e, E), !t.hitArea.contains(E.x, E.y)))
      return !0;
    if (t.effects && t.effects.length)
      for (let i = 0; i < t.effects.length; i++) {
        const n = t.effects[i];
        if (n.containsPoint && !n.containsPoint(e, this.hitTestFn))
          return !0;
      }
    return !1;
  }
  /**
   * Checks whether the container passes hit testing for the given location.
   * @param container - The container to test.
   * @param location - The location to test for overlap.
   * @returns - Whether `container` passes hit testing for `location`.
   */
  hitTestFn(t, e) {
    return t.hitArea ? !0 : t != null && t.containsPoint ? (t.worldTransform.applyInverse(e, E), t.containsPoint(E)) : !1;
  }
  /**
   * Notify all the listeners to the event's `currentTarget`.
   *
   * If the `currentTarget` contains the property `on<type>`, then it is called here,
   * simulating the behavior from version 6.x and prior.
   * @param e - The event passed to the target.
   * @param type - The type of event to notify. Defaults to `e.type`.
   */
  notifyTarget(t, e) {
    var s, a;
    if (!t.currentTarget.isInteractive())
      return;
    e ?? (e = t.type);
    const i = `on${e}`;
    (a = (s = t.currentTarget)[i]) == null || a.call(s, t);
    const n = t.eventPhase === t.CAPTURING_PHASE || t.eventPhase === t.AT_TARGET ? `${e}capture` : e;
    this._notifyListeners(t, n), t.eventPhase === t.AT_TARGET && this._notifyListeners(t, e);
  }
  /**
   * Maps the upstream `pointerdown` events to a downstream `pointerdown` event.
   *
   * `touchstart`, `rightdown`, `mousedown` events are also dispatched for specific pointer types.
   * @param from - The upstream `pointerdown` event.
   */
  mapPointerDown(t) {
    if (!(t instanceof d)) {
      g("EventBoundary cannot map a non-pointer event as a pointer event");
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
    var h, c;
    if (!(t instanceof d)) {
      g("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    this._allInteractiveElements.length = 0, this._hitElements.length = 0, this._isPointerMoveEvent = !0;
    const e = this.createPointerEvent(t);
    this._isPointerMoveEvent = !1;
    const i = e.pointerType === "mouse" || e.pointerType === "pen", n = this.trackingData(t.pointerId), s = this.findMountedTarget(n.overTargets);
    if (((h = n.overTargets) == null ? void 0 : h.length) > 0 && s !== e.target) {
      const v = t.type === "mousemove" ? "mouseout" : "pointerout", l = this.createPointerEvent(t, v, s);
      if (this.dispatchEvent(l, "pointerout"), i && this.dispatchEvent(l, "mouseout"), !e.composedPath().includes(s)) {
        const o = this.createPointerEvent(t, "pointerleave", s);
        for (o.eventPhase = o.AT_TARGET; o.target && !e.composedPath().includes(o.target); )
          o.currentTarget = o.target, this.notifyTarget(o), i && this.notifyTarget(o, "mouseleave"), o.target = o.target.parent;
        this.freeEvent(o);
      }
      this.freeEvent(l);
    }
    if (s !== e.target) {
      const v = t.type === "mousemove" ? "mouseover" : "pointerover", l = this.clonePointerEvent(e, v);
      this.dispatchEvent(l, "pointerover"), i && this.dispatchEvent(l, "mouseover");
      let o = s == null ? void 0 : s.parent;
      for (; o && o !== this.rootTarget.parent && o !== e.target; )
        o = o.parent;
      if (!o || o === this.rootTarget.parent) {
        const p = this.clonePointerEvent(e, "pointerenter");
        for (p.eventPhase = p.AT_TARGET; p.target && p.target !== s && p.target !== this.rootTarget.parent; )
          p.currentTarget = p.target, this.notifyTarget(p), i && this.notifyTarget(p, "mouseenter"), p.target = p.target.parent;
        this.freeEvent(p);
      }
      this.freeEvent(l);
    }
    const a = [], r = this.enableGlobalMoveEvents ?? !0;
    this.moveOnAll ? a.push("pointermove") : this.dispatchEvent(e, "pointermove"), r && a.push("globalpointermove"), e.pointerType === "touch" && (this.moveOnAll ? a.splice(1, 0, "touchmove") : this.dispatchEvent(e, "touchmove"), r && a.push("globaltouchmove")), i && (this.moveOnAll ? a.splice(1, 0, "mousemove") : this.dispatchEvent(e, "mousemove"), r && a.push("globalmousemove"), this.cursor = (c = e.target) == null ? void 0 : c.cursor), a.length > 0 && this.all(e, a), this._allInteractiveElements.length = 0, this._hitElements.length = 0, n.overTargets = e.composedPath(), this.freeEvent(e);
  }
  /**
   * Maps the upstream `pointerover` to downstream `pointerover` and `pointerenter` events, in that order.
   *
   * The tracking data for the specific pointer gets a new `overTarget`.
   * @param from - The upstream `pointerover` event.
   */
  mapPointerOver(t) {
    var a;
    if (!(t instanceof d)) {
      g("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    const e = this.trackingData(t.pointerId), i = this.createPointerEvent(t), n = i.pointerType === "mouse" || i.pointerType === "pen";
    this.dispatchEvent(i, "pointerover"), n && this.dispatchEvent(i, "mouseover"), i.pointerType === "mouse" && (this.cursor = (a = i.target) == null ? void 0 : a.cursor);
    const s = this.clonePointerEvent(i, "pointerenter");
    for (s.eventPhase = s.AT_TARGET; s.target && s.target !== this.rootTarget.parent; )
      s.currentTarget = s.target, this.notifyTarget(s), n && this.notifyTarget(s, "mouseenter"), s.target = s.target.parent;
    e.overTargets = i.composedPath(), this.freeEvent(i), this.freeEvent(s);
  }
  /**
   * Maps the upstream `pointerout` to downstream `pointerout`, `pointerleave` events, in that order.
   *
   * The tracking data for the specific pointer is cleared of a `overTarget`.
   * @param from - The upstream `pointerout` event.
   */
  mapPointerOut(t) {
    if (!(t instanceof d)) {
      g("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    const e = this.trackingData(t.pointerId);
    if (e.overTargets) {
      const i = t.pointerType === "mouse" || t.pointerType === "pen", n = this.findMountedTarget(e.overTargets), s = this.createPointerEvent(t, "pointerout", n);
      this.dispatchEvent(s), i && this.dispatchEvent(s, "mouseout");
      const a = this.createPointerEvent(t, "pointerleave", n);
      for (a.eventPhase = a.AT_TARGET; a.target && a.target !== this.rootTarget.parent; )
        a.currentTarget = a.target, this.notifyTarget(a), i && this.notifyTarget(a, "mouseleave"), a.target = a.target.parent;
      e.overTargets = null, this.freeEvent(s), this.freeEvent(a);
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
    if (!(t instanceof d)) {
      g("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    const e = performance.now(), i = this.createPointerEvent(t);
    if (this.dispatchEvent(i, "pointerup"), i.pointerType === "touch")
      this.dispatchEvent(i, "touchend");
    else if (i.pointerType === "mouse" || i.pointerType === "pen") {
      const r = i.button === 2;
      this.dispatchEvent(i, r ? "rightup" : "mouseup");
    }
    const n = this.trackingData(t.pointerId), s = this.findMountedTarget(n.pressTargetsByButton[t.button]);
    let a = s;
    if (s && !i.composedPath().includes(s)) {
      let r = s;
      for (; r && !i.composedPath().includes(r); ) {
        if (i.currentTarget = r, this.notifyTarget(i, "pointerupoutside"), i.pointerType === "touch")
          this.notifyTarget(i, "touchendoutside");
        else if (i.pointerType === "mouse" || i.pointerType === "pen") {
          const h = i.button === 2;
          this.notifyTarget(i, h ? "rightupoutside" : "mouseupoutside");
        }
        r = r.parent;
      }
      delete n.pressTargetsByButton[t.button], a = r;
    }
    if (a) {
      const r = this.clonePointerEvent(i, "click");
      r.target = a, r.path = null, n.clicksByButton[t.button] || (n.clicksByButton[t.button] = {
        clickCount: 0,
        target: r.target,
        timeStamp: e
      });
      const h = n.clicksByButton[t.button];
      if (h.target === r.target && e - h.timeStamp < 200 ? ++h.clickCount : h.clickCount = 1, h.target = r.target, h.timeStamp = e, r.detail = h.clickCount, r.pointerType === "mouse") {
        const c = r.button === 2;
        this.dispatchEvent(r, c ? "rightclick" : "click");
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
   * `{@link EventBoundary}'s root because the `pointerup` event occurred outside of the boundary.)
   *
   * `touchendoutside`, `mouseupoutside`, and `rightupoutside` events are fired as well for specific pointer
   * types. The tracking data for the specific pointer is cleared of a `pressTarget`.
   * @param from - The upstream `pointerupoutside` event.
   */
  mapPointerUpOutside(t) {
    if (!(t instanceof d)) {
      g("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    const e = this.trackingData(t.pointerId), i = this.findMountedTarget(e.pressTargetsByButton[t.button]), n = this.createPointerEvent(t);
    if (i) {
      let s = i;
      for (; s; )
        n.currentTarget = s, this.notifyTarget(n, "pointerupoutside"), n.pointerType === "touch" ? this.notifyTarget(n, "touchendoutside") : (n.pointerType === "mouse" || n.pointerType === "pen") && this.notifyTarget(n, n.button === 2 ? "rightupoutside" : "mouseupoutside"), s = s.parent;
      delete e.pressTargetsByButton[t.button];
    }
    this.freeEvent(n);
  }
  /**
   * Maps the upstream `wheel` event to a downstream `wheel` event.
   * @param from - The upstream `wheel` event.
   */
  mapWheel(t) {
    if (!(t instanceof y)) {
      g("EventBoundary cannot map a non-wheel event as a wheel event");
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
   * The event is allocated using {@link EventBoundary#allocateEvent this.allocateEvent}.
   * @param from - The {@code originalEvent} for the returned event.
   * @param [type=from.type] - The type of the returned event.
   * @param target - The target of the returned event.
   */
  createPointerEvent(t, e, i) {
    const n = this.allocateEvent(d);
    return this.copyPointerData(t, n), this.copyMouseData(t, n), this.copyData(t, n), n.nativeEvent = t.nativeEvent, n.originalEvent = t, n.target = i ?? this.hitTest(n.global.x, n.global.y) ?? this._hitElements[0], typeof e == "string" && (n.type = e), n;
  }
  /**
   * Creates a wheel event whose {@code originalEvent} is {@code from}.
   *
   * The event is allocated using {@link EventBoundary#allocateEvent this.allocateEvent}.
   * @param from - The upstream wheel event.
   */
  createWheelEvent(t) {
    const e = this.allocateEvent(y);
    return this.copyWheelData(t, e), this.copyMouseData(t, e), this.copyData(t, e), e.nativeEvent = t.nativeEvent, e.originalEvent = t, e.target = this.hitTest(e.global.x, e.global.y), e;
  }
  /**
   * Clones the event {@code from}, with an optional {@code type} override.
   *
   * The event is allocated using {@link EventBoundary#allocateEvent this.allocateEvent}.
   * @param from - The event to clone.
   * @param [type=from.type] - The type of the returned event.
   */
  clonePointerEvent(t, e) {
    const i = this.allocateEvent(d);
    return i.nativeEvent = t.nativeEvent, i.originalEvent = t.originalEvent, this.copyPointerData(t, i), this.copyMouseData(t, i), this.copyData(t, i), i.target = t.target, i.path = t.composedPath().slice(), i.type = e ?? i.type, i;
  }
  /**
   * Copies wheel {@link FederatedWheelEvent} data from {@code from} into {@code to}.
   *
   * The following properties are copied:
   * + deltaMode
   * + deltaX
   * + deltaY
   * + deltaZ
   * @param from - The event to copy data from.
   * @param to - The event to copy data into.
   */
  copyWheelData(t, e) {
    e.deltaMode = t.deltaMode, e.deltaX = t.deltaX, e.deltaY = t.deltaY, e.deltaZ = t.deltaZ;
  }
  /**
   * Copies pointer {@link FederatedPointerEvent} data from {@code from} into {@code to}.
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
   * @param from - The event to copy data from.
   * @param to - The event to copy data into.
   */
  copyPointerData(t, e) {
    t instanceof d && e instanceof d && (e.pointerId = t.pointerId, e.width = t.width, e.height = t.height, e.isPrimary = t.isPrimary, e.pointerType = t.pointerType, e.pressure = t.pressure, e.tangentialPressure = t.tangentialPressure, e.tiltX = t.tiltX, e.tiltY = t.tiltY, e.twist = t.twist);
  }
  /**
   * Copies mouse {@link FederatedMouseEvent} data from {@code from} to {@code to}.
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
   * @param from - The event to copy data from.
   * @param to - The event to copy data into.
   */
  copyMouseData(t, e) {
    t instanceof T && e instanceof T && (e.altKey = t.altKey, e.button = t.button, e.buttons = t.buttons, e.client.copyFrom(t.client), e.ctrlKey = t.ctrlKey, e.metaKey = t.metaKey, e.movement.copyFrom(t.movement), e.screen.copyFrom(t.screen), e.shiftKey = t.shiftKey, e.global.copyFrom(t.global));
  }
  /**
   * Copies base {@link FederatedEvent} data from {@code from} into {@code to}.
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
   * Allocate a specific type of event from {@link EventBoundary#eventPool this.eventPool}.
   *
   * This allocation is constructor-agnostic, as long as it only takes one argument - this event
   * boundary.
   * @param constructor - The event's constructor.
   */
  allocateEvent(t) {
    this.eventPool.has(t) || this.eventPool.set(t, []);
    const e = this.eventPool.get(t).pop() || new t(this);
    return e.eventPhase = e.NONE, e.currentTarget = null, e.defaultPrevented = !1, e.path = null, e.target = null, e;
  }
  /**
   * Frees the event and puts it back into the event pool.
   *
   * It is illegal to reuse the event until it is allocated again, using `this.allocateEvent`.
   *
   * It is also advised that events not allocated from {@link EventBoundary#allocateEvent this.allocateEvent}
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
   * Similar to {@link EventEmitter.emit}, except it stops if the `propagationImmediatelyStopped` flag
   * is set on the event.
   * @param e - The event to call each listener with.
   * @param type - The event key.
   */
  _notifyListeners(t, e) {
    const i = t.currentTarget._events[e];
    if (i)
      if ("fn" in i)
        i.once && t.currentTarget.removeListener(e, i.fn, void 0, !0), i.fn.call(i.context, t);
      else
        for (let n = 0, s = i.length; n < s && !t.propagationImmediatelyStopped; n++)
          i[n].once && t.currentTarget.removeListener(e, i[n].fn, void 0, !0), i[n].fn.call(i[n].context, t);
  }
}
export {
  S as EventBoundary
};
//# sourceMappingURL=index382.js.map

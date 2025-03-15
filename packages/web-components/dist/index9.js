class w {
  constructor() {
    this.events = [], this.isTracking = !1, this.boundHandlers = {};
  }
  /**
   * Start tracking user interactions
   */
  startTracking() {
    this.isTracking || (this.isTracking = !0, this.events = [], this.boundHandlers = {
      mousemove: this.handleMouseMove.bind(this),
      mousedown: this.handleMouseEvent.bind(this, "mousedown"),
      mouseup: this.handleMouseEvent.bind(this, "mouseup"),
      keydown: this.handleKeyEvent.bind(this, "keydown"),
      keyup: this.handleKeyEvent.bind(this, "keyup")
    }, window.addEventListener("mousemove", this.boundHandlers.mousemove, { passive: !0 }), window.addEventListener("mousedown", this.boundHandlers.mousedown, { passive: !0 }), window.addEventListener("mouseup", this.boundHandlers.mouseup, { passive: !0 }), window.addEventListener("keydown", this.boundHandlers.keydown, { passive: !0 }), window.addEventListener("keyup", this.boundHandlers.keyup, { passive: !0 }));
  }
  /**
   * Stop tracking user interactions
   */
  stopTracking() {
    this.isTracking && (this.isTracking = !1, window.removeEventListener("mousemove", this.boundHandlers.mousemove), window.removeEventListener("mousedown", this.boundHandlers.mousedown), window.removeEventListener("mouseup", this.boundHandlers.mouseup), window.removeEventListener("keydown", this.boundHandlers.keydown), window.removeEventListener("keyup", this.boundHandlers.keyup));
  }
  /**
   * Reset the analyzer state
   */
  reset() {
    this.events = [], this.isTracking && (this.stopTracking(), this.startTracking());
  }
  /**
   * Analyze collected behavior data and return metrics
   */
  analyze() {
    const t = this.calculateMovementSmoothness(), n = this.calculateReactionTime(), s = this.calculateInteractionDensity(), r = this.calculatePatternVariability(), o = t * 0.35 + n * 0.25 + s * 0.2 + r * 0.2, a = o > 0.6;
    return {
      movementSmoothnessScore: t,
      reactionTimeScore: n,
      interactionDensity: s,
      patternVariability: r,
      overallHumanScore: o,
      isHuman: a
    };
  }
  /**
   * Handle mouse movement events
   */
  handleMouseMove(t) {
    if (this.isTracking) {
      if (this.events.length > 0) {
        const n = this.events[this.events.length - 1];
        if (n.type === "mousemove" && t.timeStamp - n.timestamp < 50)
          return;
      }
      this.events.push({
        type: "mousemove",
        timestamp: t.timeStamp,
        x: t.clientX,
        y: t.clientY
      });
    }
  }
  /**
   * Handle mouse events (down/up)
   */
  handleMouseEvent(t, n) {
    this.isTracking && this.events.push({
      type: t,
      timestamp: n.timeStamp,
      x: n.clientX,
      y: n.clientY
    });
  }
  /**
   * Handle keyboard events (down/up)
   */
  handleKeyEvent(t, n) {
    this.isTracking && this.events.push({
      type: t,
      timestamp: n.timeStamp,
      key: n.key
    });
  }
  /**
   * Calculate movement smoothness score
   * Measures how natural and smooth the mouse movements are
   */
  calculateMovementSmoothness() {
    const t = this.events.filter((a) => a.type === "mousemove");
    if (t.length < 10)
      return 0.5;
    let n = 0, s = 0;
    for (let a = 2; a < t.length; a++) {
      const e = t[a - 2], i = t[a - 1], u = t[a];
      if (!e.x || !e.y || !i.x || !i.y || !u.x || !u.y)
        continue;
      const m = (i.timestamp - e.timestamp) / 1e3, c = (u.timestamp - i.timestamp) / 1e3;
      if (m === 0 || c === 0)
        continue;
      const d = (i.x - e.x) / m, v = (i.y - e.y) / m, y = (u.x - i.x) / c, p = (u.y - i.y) / c, h = y - d, l = p - v, k = Math.sqrt(h * h + l * l);
      n += k, s++;
    }
    if (s === 0)
      return 0.5;
    const r = n / s;
    return Math.min(1, Math.max(0, 1 - Math.abs(r - 50) / 50));
  }
  /**
   * Calculate reaction time score
   * Measures how quickly the user responds to game events
   */
  calculateReactionTime() {
    const t = this.events.filter((e) => e.type === "keydown" || e.type === "keyup"), n = this.events.filter((e) => e.type === "mousedown" || e.type === "mouseup");
    if (t.length + n.length < 5)
      return 0.5;
    let s = 0, r = 0;
    for (let e = 0; e < t.length - 1; e++)
      if (t[e].type === "keydown" && t[e + 1].type === "keyup" && t[e].key === t[e + 1].key) {
        const i = t[e + 1].timestamp - t[e].timestamp;
        s += i, r++;
      }
    for (let e = 0; e < n.length - 1; e++)
      if (n[e].type === "mousedown" && n[e + 1].type === "mouseup") {
        const i = n[e + 1].timestamp - n[e].timestamp;
        s += i, r++;
      }
    if (r === 0)
      return 0.5;
    const o = s / r;
    return o < 50 ? 0.1 : o > 1e3 ? 0.3 : Math.max(0, 1 - Math.abs(o - 200) / 150);
  }
  /**
   * Calculate interaction density
   * Measures the frequency and distribution of interactions
   */
  calculateInteractionDensity() {
    if (this.events.length < 5)
      return 0.5;
    const t = (this.events[this.events.length - 1].timestamp - this.events[0].timestamp) / 1e3;
    if (t === 0)
      return 0.5;
    const n = this.events.length / t;
    let s = 0;
    for (let e = 1; e < this.events.length; e++) {
      const i = this.events[e].timestamp - this.events[e - 1].timestamp;
      s += i * i;
    }
    const r = s / (this.events.length - 1), o = Math.min(1, r / 1e4);
    return Math.min(1, Math.max(0, 1 - Math.abs(n - 5) / 5)) * 0.6 + o * 0.4;
  }
  /**
   * Calculate pattern variability
   * Measures how random and unpredictable the interactions are
   */
  calculatePatternVariability() {
    const t = this.events.filter((o) => o.type === "mousemove");
    if (t.length < 10)
      return 0.5;
    let n = 0, s = { x: 0, y: 0 };
    for (let o = 1; o < t.length; o++) {
      const a = t[o - 1], e = t[o];
      if (!a.x || !a.y || !e.x || !e.y)
        continue;
      const i = e.x - a.x, u = e.y - a.y;
      (s.x > 0 && i < 0 || s.x < 0 && i > 0 || s.y > 0 && u < 0 || s.y < 0 && u > 0) && n++, s = { x: i, y: u };
    }
    const r = n / (t.length - 1);
    return Math.min(1, r * 2);
  }
}
export {
  w as BehaviorAnalyzer
};
//# sourceMappingURL=index9.js.map

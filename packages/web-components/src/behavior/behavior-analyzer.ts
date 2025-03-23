import { BehaviorMetrics, InteractionEvent, InteractionEventType } from '../types';

/**
 * BehaviorAnalyzer
 * 
 * Tracks and analyzes user interactions to determine if the user is human
 * based on interaction patterns, movement smoothness, and other metrics.
 */
export class BehaviorAnalyzer {
  private events: InteractionEvent[] = [];
  private isTracking = false;
  private boundHandlers: { [key: string]: (event: Event) => void } = {};
  
  /**
   * Start tracking user interactions
   */
  public startTracking(): void {
    if (this.isTracking) return;
    
    this.isTracking = true;
    this.events = [];
    
    // Bind event handlers
    this.boundHandlers = {
      mousemove: this.handleMouseMove.bind(this) as EventListener,
      mousedown: this.handleMouseEvent.bind(this, 'mousedown') as EventListener,
      mouseup: this.handleMouseEvent.bind(this, 'mouseup') as EventListener,
      keydown: this.handleKeyEvent.bind(this, 'keydown') as EventListener,
      keyup: this.handleKeyEvent.bind(this, 'keyup') as EventListener
    };
    
    // Add event listeners
    window.addEventListener('mousemove', this.boundHandlers.mousemove, { passive: true });
    window.addEventListener('mousedown', this.boundHandlers.mousedown, { passive: true });
    window.addEventListener('mouseup', this.boundHandlers.mouseup, { passive: true });
    window.addEventListener('keydown', this.boundHandlers.keydown, { passive: true });
    window.addEventListener('keyup', this.boundHandlers.keyup, { passive: true });
  }
  
  /**
   * Stop tracking user interactions
   */
  public stopTracking(): void {
    if (!this.isTracking) return;
    
    this.isTracking = false;
    
    // Remove event listeners
    window.removeEventListener('mousemove', this.boundHandlers.mousemove);
    window.removeEventListener('mousedown', this.boundHandlers.mousedown);
    window.removeEventListener('mouseup', this.boundHandlers.mouseup);
    window.removeEventListener('keydown', this.boundHandlers.keydown);
    window.removeEventListener('keyup', this.boundHandlers.keyup);
  }
  
  /**
   * Reset the analyzer state
   */
  public reset(): void {
    this.events = [];
    if (this.isTracking) {
      this.stopTracking();
      this.startTracking();
    }
  }
  
  /**
   * Analyze collected behavior data and return metrics
   */
  public analyze(): BehaviorMetrics {
    // Calculate metrics based on collected events
    const movementSmoothnessScore = this.calculateMovementSmoothness();
    const reactionTimeScore = this.calculateReactionTime();
    const interactionDensity = this.calculateInteractionDensity();
    const patternVariability = this.calculatePatternVariability();
    
    // Calculate overall human score (weighted average)
    const overallHumanScore = (
      movementSmoothnessScore * 0.35 +
      reactionTimeScore * 0.25 +
      interactionDensity * 0.2 +
      patternVariability * 0.2
    );
    
    // Determine if the user is human based on threshold
    const isHuman = overallHumanScore > 0.6;
    
    return {
      movementSmoothnessScore,
      reactionTimeScore,
      interactionDensity,
      patternVariability,
      overallHumanScore,
      isHuman
    };
  }
  
  /**
   * Handle mouse movement events
   */
  private handleMouseMove(event: MouseEvent): void {
    if (!this.isTracking) return;
    
    // Throttle mouse move events to avoid overwhelming the analyzer
    if (this.events.length > 0) {
      const lastEvent = this.events[this.events.length - 1];
      if (
        lastEvent.type === 'mousemove' && 
        event.timeStamp - lastEvent.timestamp < 50
      ) {
        return;
      }
    }
    
    this.events.push({
      type: 'mousemove',
      timestamp: event.timeStamp,
      x: event.clientX,
      y: event.clientY
    });
  }
  
  /**
   * Handle mouse events (down/up)
   */
  private handleMouseEvent(type: InteractionEventType, event: MouseEvent): void {
    if (!this.isTracking) return;
    
    this.events.push({
      type,
      timestamp: event.timeStamp,
      x: event.clientX,
      y: event.clientY
    });
  }
  
  /**
   * Handle keyboard events (down/up)
   */
  private handleKeyEvent(type: InteractionEventType, event: KeyboardEvent): void {
    if (!this.isTracking) return;
    
    this.events.push({
      type,
      timestamp: event.timeStamp,
      key: event.key
    });
  }
  
  /**
   * Calculate movement smoothness score
   * Measures how natural and smooth the mouse movements are
   */
  private calculateMovementSmoothness(): number {
    const mouseEvents = this.events.filter(e => e.type === 'mousemove');
    if (mouseEvents.length < 10) return 0.5; // Not enough data
    
    let totalJerk = 0;
    let count = 0;
    
    for (let i = 2; i < mouseEvents.length; i++) {
      const e1 = mouseEvents[i - 2];
      const e2 = mouseEvents[i - 1];
      const e3 = mouseEvents[i];
      
      if (!e1.x || !e1.y || !e2.x || !e2.y || !e3.x || !e3.y) continue;
      
      // Calculate acceleration changes (jerk)
      const dt1 = (e2.timestamp - e1.timestamp) / 1000; // in seconds
      const dt2 = (e3.timestamp - e2.timestamp) / 1000; // in seconds
      
      if (dt1 === 0 || dt2 === 0) continue;
      
      const vx1 = (e2.x - e1.x) / dt1;
      const vy1 = (e2.y - e1.y) / dt1;
      const vx2 = (e3.x - e2.x) / dt2;
      const vy2 = (e3.y - e2.y) / dt2;
      
      const ax1 = vx2 - vx1;
      const ay1 = vy2 - vy1;
      
      // Jerk magnitude
      const jerk = Math.sqrt(ax1 * ax1 + ay1 * ay1);
      totalJerk += jerk;
      count++;
    }
    
    if (count === 0) return 0.5;
    
    const avgJerk = totalJerk / count;
    // Bots typically have very low or very high jerk
    // Convert to a score between 0 and 1 (higher is more human-like)
    const normalizedJerk = Math.min(1, Math.max(0, 1 - Math.abs(avgJerk - 50) / 50));
    return normalizedJerk;
  }
  
  /**
   * Calculate reaction time score
   * Measures how quickly the user responds to game events
   */
  private calculateReactionTime(): number {
    const keyEvents = this.events.filter(e => e.type === 'keydown' || e.type === 'keyup');
    const mouseEvents = this.events.filter(e => e.type === 'mousedown' || e.type === 'mouseup');
    
    if (keyEvents.length + mouseEvents.length < 5) return 0.5; // Not enough data
    
    // Calculate average time between key/mouse down and up events
    let totalReactionTime = 0;
    let count = 0;
    
    // Check key press durations
    for (let i = 0; i < keyEvents.length - 1; i++) {
      if (keyEvents[i].type === 'keydown' && keyEvents[i + 1].type === 'keyup' && keyEvents[i].key === keyEvents[i + 1].key) {
        const duration = keyEvents[i + 1].timestamp - keyEvents[i].timestamp;
        totalReactionTime += duration;
        count++;
      }
    }
    
    // Check mouse click durations
    for (let i = 0; i < mouseEvents.length - 1; i++) {
      if (mouseEvents[i].type === 'mousedown' && mouseEvents[i + 1].type === 'mouseup') {
        const duration = mouseEvents[i + 1].timestamp - mouseEvents[i].timestamp;
        totalReactionTime += duration;
        count++;
      }
    }
    
    if (count === 0) return 0.5;
    
    const avgReactionTime = totalReactionTime / count;
    
    // Human reaction times are typically between 100ms and 400ms
    // Too fast or too slow is suspicious
    if (avgReactionTime < 50) return 0.1; // Too fast, likely a bot
    if (avgReactionTime > 1000) return 0.3; // Too slow, might be a bot
    
    // Normalize to a 0-1 scale with peak at ~200ms
    const normalizedScore = Math.max(0, 1 - Math.abs(avgReactionTime - 200) / 150);
    return normalizedScore;
  }
  
  /**
   * Calculate interaction density
   * Measures the frequency and distribution of interactions
   */
  private calculateInteractionDensity(): number {
    if (this.events.length < 5) return 0.5; // Not enough data
    
    const duration = (this.events[this.events.length - 1].timestamp - this.events[0].timestamp) / 1000;
    if (duration === 0) return 0.5;
    
    // Calculate events per second
    const eventsPerSecond = this.events.length / duration;
    
    // Bots often have very consistent event frequency
    // Calculate variance in time between events
    let totalVariance = 0;
    for (let i = 1; i < this.events.length; i++) {
      const timeDiff = this.events[i].timestamp - this.events[i - 1].timestamp;
      totalVariance += timeDiff * timeDiff;
    }
    
    const avgVariance = totalVariance / (this.events.length - 1);
    const normalizedVariance = Math.min(1, avgVariance / 10000);
    
    // Combine frequency and variance
    // Humans have moderate frequency with high variance
    const frequencyScore = Math.min(1, Math.max(0, 1 - Math.abs(eventsPerSecond - 5) / 5));
    
    return (frequencyScore * 0.6 + normalizedVariance * 0.4);
  }
  
  /**
   * Calculate pattern variability
   * Measures how random and unpredictable the interactions are
   */
  private calculatePatternVariability(): number {
    const mouseEvents = this.events.filter(e => e.type === 'mousemove');
    if (mouseEvents.length < 10) return 0.5; // Not enough data
    
    // Calculate direction changes in mouse movement
    let directionChanges = 0;
    let prevDirection = { x: 0, y: 0 };
    
    for (let i = 1; i < mouseEvents.length; i++) {
      const prev = mouseEvents[i - 1];
      const curr = mouseEvents[i];
      
      if (!prev.x || !prev.y || !curr.x || !curr.y) continue;
      
      const dx = curr.x - prev.x;
      const dy = curr.y - prev.y;
      
      // Check if direction changed
      if (
        (prevDirection.x > 0 && dx < 0) ||
        (prevDirection.x < 0 && dx > 0) ||
        (prevDirection.y > 0 && dy < 0) ||
        (prevDirection.y < 0 && dy > 0)
      ) {
        directionChanges++;
      }
      
      prevDirection = { x: dx, y: dy };
    }
    
    // Calculate direction change ratio
    const changeRatio = directionChanges / (mouseEvents.length - 1);
    
    // Humans typically have more direction changes
    // Bots often move in straight lines or perfect curves
    return Math.min(1, changeRatio * 2);
  }
}

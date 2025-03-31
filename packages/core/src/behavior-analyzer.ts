import { BehaviorAnalyzerOptions, BehaviorMetrics } from './types';

/**
 * BehaviorAnalyzer class for analyzing user behavior during gameplay
 * to determine if the user is human or a bot.
 */
export class BehaviorAnalyzer {
  private options: Required<BehaviorAnalyzerOptions>;
  private isTracking: boolean = false;
  private startTime: number = 0;
  private mousePositions: Array<{ x: number; y: number; timestamp: number }> = [];
  private clickEvents: Array<{ x: number; y: number; timestamp: number }> = [];
  private keyEvents: Array<{ key: string; timestamp: number }> = [];
  private gameEvents: Array<{ type: string; timestamp: number; data?: any }> = [];

  /**
   * Creates a new BehaviorAnalyzer instance.
   * @param options Configuration options for the behavior analyzer
   */
  constructor(options: BehaviorAnalyzerOptions = {}) {
    // Set default options
    this.options = {
      movementSmoothnessThreshold: options.movementSmoothnessThreshold ?? 0.6,
      reactionTimeThreshold: options.reactionTimeThreshold ?? 200,
      interactionDensityThreshold: options.interactionDensityThreshold ?? 0.5,
      patternVariabilityThreshold: options.patternVariabilityThreshold ?? 0.7
    };
  }

  /**
   * Starts tracking user behavior.
   * @param container The HTML element to attach event listeners to
   */
  public startTracking(container: HTMLElement): void {
    if (this.isTracking) {
      return;
    }

    this.isTracking = true;
    this.startTime = Date.now();
    this.mousePositions = [];
    this.clickEvents = [];
    this.keyEvents = [];
    this.gameEvents = [];

    // Track mouse movements
    container.addEventListener('mousemove', this.handleMouseMove);
    
    // Track mouse clicks
    container.addEventListener('mousedown', this.handleMouseClick);
    
    // Track key presses
    container.addEventListener('keydown', this.handleKeyDown);
    
    // Track touch events for mobile
    container.addEventListener('touchstart', this.handleTouchStart);
    container.addEventListener('touchmove', this.handleTouchMove);
    container.addEventListener('touchend', this.handleTouchEnd);
  }

  /**
   * Stops tracking user behavior.
   * @param container The HTML element to remove event listeners from
   */
  public stopTracking(container: HTMLElement): void {
    if (!this.isTracking) {
      return;
    }

    this.isTracking = false;

    // Remove event listeners
    container.removeEventListener('mousemove', this.handleMouseMove);
    container.removeEventListener('mousedown', this.handleMouseClick);
    container.removeEventListener('keydown', this.handleKeyDown);
    container.removeEventListener('touchstart', this.handleTouchStart);
    container.removeEventListener('touchmove', this.handleTouchMove);
    container.removeEventListener('touchend', this.handleTouchEnd);
  }

  /**
   * Records a game-specific event.
   * @param type The type of event
   * @param data Optional data associated with the event
   */
  public recordGameEvent(type: string, data?: any): void {
    if (!this.isTracking) {
      return;
    }

    this.gameEvents.push({
      type,
      timestamp: Date.now(),
      data
    });
  }

  /**
   * Analyzes the collected behavior data to determine if the user is human.
   * @returns Behavior metrics with human determination
   */
  public analyze(): BehaviorMetrics {
    // Calculate metrics
    const movementSmoothness = this.calculateMovementSmoothness();
    const reactionTime = this.calculateReactionTime();
    const interactionDensity = this.calculateInteractionDensity();
    const patternVariability = this.calculatePatternVariability();

    // Calculate confidence based on all metrics
    const metrics = [
      movementSmoothness / this.options.movementSmoothnessThreshold,
      this.options.reactionTimeThreshold / (reactionTime.average || this.options.reactionTimeThreshold),
      interactionDensity.eventsPerSecond / this.options.interactionDensityThreshold,
      patternVariability / this.options.patternVariabilityThreshold
    ].filter(value => !isNaN(value) && isFinite(value));

    // Average of all metrics, capped at 1.0
    const confidence = Math.min(
      metrics.reduce((sum, value) => sum + value, 0) / metrics.length,
      1.0
    );

    // Determine if human based on confidence threshold
    const isHuman = confidence >= 0.7;

    return {
      isHuman,
      confidence,
      movementSmoothness,
      reactionTime,
      interactionDensity: {
        eventsPerSecond: interactionDensity.eventsPerSecond,
        pattern: interactionDensity.pattern
      },
      patternVariability
    };
  }

  /**
   * Calculates the smoothness of mouse movements.
   * @returns Smoothness score between 0 and 1
   */
  private calculateMovementSmoothness(): number {
    if (this.mousePositions.length < 3) {
      return 0;
    }

    let totalAngularChange = 0;
    let totalDistance = 0;

    for (let i = 1; i < this.mousePositions.length - 1; i++) {
      const prev = this.mousePositions[i - 1];
      const current = this.mousePositions[i];
      const next = this.mousePositions[i + 1];

      // Calculate vectors
      const v1 = {
        x: current.x - prev.x,
        y: current.y - prev.y
      };
      const v2 = {
        x: next.x - current.x,
        y: next.y - current.y
      };

      // Calculate magnitudes
      const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
      const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);

      // Skip if no movement
      if (mag1 === 0 || mag2 === 0) {
        continue;
      }

      // Calculate dot product
      const dotProduct = v1.x * v2.x + v1.y * v2.y;
      
      // Calculate cosine of angle between vectors
      const cosAngle = dotProduct / (mag1 * mag2);
      
      // Calculate angle (in radians)
      const angle = Math.acos(Math.max(-1, Math.min(1, cosAngle)));
      
      totalAngularChange += angle;
      totalDistance += mag1;
    }

    // Normalize by total distance
    if (totalDistance === 0) {
      return 0;
    }

    // Calculate smoothness (inverse of angular change per unit distance)
    // Higher values mean smoother movement
    const rawSmoothness = 1 - (totalAngularChange / totalDistance / Math.PI);
    
    // Normalize to 0-1 range
    return Math.max(0, Math.min(1, rawSmoothness));
  }

  /**
   * Calculates reaction time metrics.
   * @returns Object containing average reaction time and variance
   */
  private calculateReactionTime(): { average: number; variance: number } {
    const reactionTimes: number[] = [];

    // Calculate reaction times between game events and user responses
    for (let i = 0; i < this.gameEvents.length; i++) {
      const gameEvent = this.gameEvents[i];
      
      // Find the next user interaction after this game event
      const nextInteraction = [...this.clickEvents, ...this.keyEvents]
        .filter(e => e.timestamp > gameEvent.timestamp)
        .sort((a, b) => a.timestamp - b.timestamp)[0];
      
      if (nextInteraction) {
        const reactionTime = nextInteraction.timestamp - gameEvent.timestamp;
        
        // Only consider reasonable reaction times (100ms to 2000ms)
        if (reactionTime >= 100 && reactionTime <= 2000) {
          reactionTimes.push(reactionTime);
        }
      }
    }

    if (reactionTimes.length === 0) {
      return { average: 0, variance: 0 };
    }

    // Calculate average
    const average = reactionTimes.reduce((sum, time) => sum + time, 0) / reactionTimes.length;
    
    // Calculate variance
    const variance = reactionTimes.reduce((sum, time) => sum + Math.pow(time - average, 2), 0) / reactionTimes.length;

    return { average, variance };
  }

  /**
   * Calculates interaction density metrics.
   * @returns Object containing events per second and pattern classification
   */
  private calculateInteractionDensity(): { eventsPerSecond: number; pattern: 'human' | 'bot' | 'uncertain' } {
    const allEvents = [
      ...this.mousePositions,
      ...this.clickEvents,
      ...this.keyEvents
    ].sort((a, b) => a.timestamp - b.timestamp);

    if (allEvents.length < 2) {
      return { eventsPerSecond: 0, pattern: 'uncertain' };
    }

    // Calculate total duration in seconds
    const duration = (allEvents[allEvents.length - 1].timestamp - allEvents[0].timestamp) / 1000;
    
    if (duration === 0) {
      return { eventsPerSecond: 0, pattern: 'uncertain' };
    }

    // Calculate events per second
    const eventsPerSecond = allEvents.length / duration;

    // Calculate time intervals between events
    const intervals: number[] = [];
    for (let i = 1; i < allEvents.length; i++) {
      intervals.push(allEvents[i].timestamp - allEvents[i - 1].timestamp);
    }

    // Calculate variance of intervals
    const avgInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;
    const intervalVariance = intervals.reduce((sum, interval) => sum + Math.pow(interval - avgInterval, 2), 0) / intervals.length;
    
    // Normalize variance
    const normalizedVariance = Math.min(1, intervalVariance / (avgInterval * avgInterval));

    // Determine pattern based on variance
    // Bots often have very consistent timing (low variance)
    let pattern: 'human' | 'bot' | 'uncertain';
    if (normalizedVariance < 0.1) {
      pattern = 'bot';
    } else if (normalizedVariance > 0.3) {
      pattern = 'human';
    } else {
      pattern = 'uncertain';
    }

    return { eventsPerSecond, pattern };
  }

  /**
   * Calculates pattern variability in user interactions.
   * @returns Variability score between 0 and 1
   */
  private calculatePatternVariability(): number {
    if (this.mousePositions.length < 10) {
      return 0;
    }

    // Calculate direction changes
    let directionChanges = 0;
    let prevDirection = { x: 0, y: 0 };

    for (let i = 1; i < this.mousePositions.length; i++) {
      const prev = this.mousePositions[i - 1];
      const current = this.mousePositions[i];
      
      const direction = {
        x: Math.sign(current.x - prev.x),
        y: Math.sign(current.y - prev.y)
      };
      
      // Check if direction changed
      if (
        (prevDirection.x !== 0 || prevDirection.y !== 0) && // Skip first comparison
        (direction.x !== prevDirection.x || direction.y !== prevDirection.y)
      ) {
        directionChanges++;
      }
      
      prevDirection = direction;
    }

    // Calculate normalized variability
    // More direction changes indicate more human-like behavior
    const maxChanges = this.mousePositions.length - 1;
    const normalizedChanges = Math.min(directionChanges / (maxChanges * 0.5), 1);

    return normalizedChanges;
  }

  // Event handlers
  private handleMouseMove = (event: MouseEvent): void => {
    if (!this.isTracking) {
      return;
    }

    // Throttle recording to avoid excessive data
    if (this.mousePositions.length === 0 || 
        Date.now() - this.mousePositions[this.mousePositions.length - 1].timestamp >= 50) {
      this.mousePositions.push({
        x: event.clientX,
        y: event.clientY,
        timestamp: Date.now()
      });
    }
  };

  private handleMouseClick = (event: MouseEvent): void => {
    if (!this.isTracking) {
      return;
    }

    this.clickEvents.push({
      x: event.clientX,
      y: event.clientY,
      timestamp: Date.now()
    });
  };

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (!this.isTracking) {
      return;
    }

    this.keyEvents.push({
      key: event.key,
      timestamp: Date.now()
    });
  };

  private handleTouchStart = (event: TouchEvent): void => {
    if (!this.isTracking || !event.touches[0]) {
      return;
    }

    const touch = event.touches[0];
    this.clickEvents.push({
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now()
    });
  };

  private handleTouchMove = (event: TouchEvent): void => {
    if (!this.isTracking || !event.touches[0]) {
      return;
    }

    const touch = event.touches[0];
    // Throttle recording to avoid excessive data
    if (this.mousePositions.length === 0 || 
        Date.now() - this.mousePositions[this.mousePositions.length - 1].timestamp >= 50) {
      this.mousePositions.push({
        x: touch.clientX,
        y: touch.clientY,
        timestamp: Date.now()
      });
    }
  };

  private handleTouchEnd = (event: TouchEvent): void => {
    // Just record the event timestamp
    if (!this.isTracking) {
      return;
    }

    this.gameEvents.push({
      type: 'touchend',
      timestamp: Date.now()
    });
  };
}

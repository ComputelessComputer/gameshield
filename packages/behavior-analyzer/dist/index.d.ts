import { BehaviorAnalysisResult } from './types';
export * from './types';
/**
 * BehaviorAnalyzer
 *
 * Tracks and analyzes user interactions to determine if the user is human
 * based on interaction patterns, movement smoothness, and other metrics.
 */
export declare class BehaviorAnalyzer {
    private events;
    private isTracking;
    private boundHandlers;
    /**
     * Start tracking user interactions
     */
    startTracking(): void;
    /**
     * Stop tracking user interactions
     */
    stopTracking(): void;
    /**
     * Reset the analyzer state
     */
    reset(): void;
    /**
     * Analyze collected behavior data and return metrics
     */
    analyze(): BehaviorAnalysisResult;
    /**
     * Handle mouse movement events
     */
    private handleMouseMove;
    /**
     * Handle mouse events (down/up)
     */
    private handleMouseEvent;
    /**
     * Handle keyboard events (down/up)
     */
    private handleKeyEvent;
    /**
     * Calculate movement smoothness score
     * Measures how natural and smooth the mouse movements are
     */
    private calculateMovementSmoothness;
    /**
     * Calculate reaction time score
     * Measures how quickly the user responds to game events
     */
    private calculateReactionTime;
    /**
     * Calculate interaction density
     * Measures the frequency and distribution of interactions
     */
    private calculateInteractionDensity;
    /**
     * Calculate pattern variability
     * Measures how random and unpredictable the interactions are
     */
    private calculatePatternVariability;
}

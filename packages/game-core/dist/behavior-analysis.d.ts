/**
 * Behavior Analysis Module
 *
 * This module tracks and analyzes user behavior during gameplay to determine
 * if the interaction patterns match those of a human or an automated bot.
 */
export interface InteractionPoint {
    x: number;
    y: number;
    timestamp: number;
    type: 'move' | 'click' | 'touch' | 'keypress';
    key?: string;
}
export interface BehaviorMetrics {
    movementSmoothness: number;
    movementVariability: number;
    reactionTimes: number[];
    averageReactionTime: number;
    decisionConsistency: number;
    errorRate: number;
    interactionDensity: number;
    pausePatterns: number[];
    interactionPoints: InteractionPoint[];
}
export declare class BehaviorAnalyzer {
    private interactionPoints;
    private gameStartTime;
    private lastAnalysisTime;
    private reactionTimes;
    private expectedReactionEvents;
    constructor();
    /**
     * Record a user interaction point
     */
    recordInteraction(x: number, y: number, type: InteractionPoint['type'], key?: string): void;
    /**
     * Register an expected reaction event (e.g., an obstacle appears that the user should react to)
     */
    registerExpectedReaction(eventId: string): void;
    /**
     * Record when the user reacted to an expected event
     */
    recordReaction(eventId: string): void;
    /**
     * Calculate movement smoothness based on the recorded interaction points
     */
    private calculateMovementSmoothness;
    /**
     * Calculate movement variability
     */
    private calculateMovementVariability;
    /**
     * Calculate interaction density (interactions per second)
     */
    private calculateInteractionDensity;
    /**
     * Calculate pause patterns
     */
    private calculatePausePatterns;
    /**
     * Calculate decision consistency
     */
    private calculateDecisionConsistency;
    /**
     * Calculate error rate
     */
    private calculateErrorRate;
    /**
     * Analyze behavior and return metrics
     */
    analyzeBehavior(): BehaviorMetrics;
    /**
     * Determine if the behavior appears to be human
     */
    isHumanBehavior(): {
        isHuman: boolean;
        confidence: number;
    };
    /**
     * Reset the analyzer
     */
    reset(): void;
}
export declare const behaviorAnalyzer: BehaviorAnalyzer;

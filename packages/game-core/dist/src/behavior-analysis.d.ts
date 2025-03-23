/**
 * Behavior Analysis Module
 *
 * This module handles analysis of user interactions to determine if
 * they exhibit human-like or bot-like behavior. It's a critical component
 * for improving CAPTCHA security.
 *
 * @packageDocumentation
 */
import { GameResult } from './types';
/**
 * Risk factor types that can be detected
 */
export type RiskFactor = 'too-fast' | 'too-perfect' | 'pattern-based' | 'no-variance' | 'impossible-score' | 'too-few-inputs' | 'timing-anomaly' | 'input-consistency' | 'suspicious-movements';
/**
 * Risk level categorization
 */
export type RiskLevel = 'low' | 'medium' | 'high';
/**
 * Analysis result interface
 */
export interface BehaviorAnalysisResult {
    /** Overall risk score (0-100) */
    score: number;
    /** Categorized risk level */
    level: RiskLevel;
    /** Detected risk factors */
    factors: RiskFactor[];
    /** Detailed risk breakdown */
    details: Record<string, number>;
    /** Confidence level (0-1) */
    confidence: number;
    /** Timestamp of analysis */
    timestamp: number;
}
/**
 * Analyze user behavior patterns for bot detection
 */
export declare class BehaviorAnalyzer {
    private static RISK_WEIGHTS;
    /**
     * Analyze game result to determine if behavior appears human
     *
     * @param result - Game completion result with metrics
     * @returns Behavior analysis result
     */
    static analyze(result: GameResult): BehaviorAnalysisResult;
    /**
     * Calculate the final risk result
     *
     * @param factors - Detected risk factors
     * @param details - Detailed risk breakdown
     * @param overrideScore - Optional score override
     * @returns Complete analysis result
     * @private
     */
    private static createResult;
    /**
     * Check if completion time is suspiciously fast
     *
     * @param time - Completion time in milliseconds
     * @returns True if time is suspiciously fast
     * @private
     */
    private static isTooFast;
    /**
     * Check if score is suspiciously high
     *
     * @param score - Game score (0-100)
     * @returns True if score is suspiciously high
     * @private
     */
    private static isScoreSuspicious;
    /**
     * Check if there are too few inputs for valid human interaction
     *
     * @param metrics - Interaction metrics
     * @returns True if there are too few inputs
     * @private
     */
    private static hasTooFewInputs;
    /**
     * Analyze movement patterns for signs of automation
     *
     * @param metrics - Interaction metrics
     * @returns Movement pattern analysis result
     * @private
     */
    private static analyzeMovementPatterns;
    /**
     * Analyze timing consistency for signs of automation
     *
     * @param metrics - Interaction metrics
     * @returns Timing analysis result
     * @private
     */
    private static analyzeTimingConsistency;
    /**
     * Calculate risk score for a particular factor
     *
     * @param factor - Risk factor to calculate score for
     * @param value - Raw value associated with the factor
     * @returns Risk score contribution (0-100)
     * @private
     */
    private static calculateRiskScore;
}

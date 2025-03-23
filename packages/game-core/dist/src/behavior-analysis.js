/**
 * Behavior Analysis Module
 *
 * This module handles analysis of user interactions to determine if
 * they exhibit human-like or bot-like behavior. It's a critical component
 * for improving CAPTCHA security.
 *
 * @packageDocumentation
 */
import { BEHAVIOR_THRESHOLDS } from './constants';
import { debug } from './utils';
/**
 * Analyze user behavior patterns for bot detection
 */
export class BehaviorAnalyzer {
    /**
     * Analyze game result to determine if behavior appears human
     *
     * @param result - Game completion result with metrics
     * @returns Behavior analysis result
     */
    static analyze(result) {
        const factors = [];
        const details = {};
        if (!result.metrics) {
            // Cannot analyze without metrics
            return this.createResult([], {}, 0);
        }
        // Get metrics from result
        const metrics = result.metrics;
        // Check for suspiciously fast completion time
        if (this.isTooFast(result.time)) {
            factors.push('too-fast');
            details['too-fast'] = this.calculateRiskScore('too-fast', result.time);
        }
        // Check for impossibly high score
        if (this.isScoreSuspicious(result.score)) {
            factors.push('impossible-score');
            details['impossible-score'] = this.calculateRiskScore('impossible-score', result.score);
        }
        // Check for too few inputs
        if (this.hasTooFewInputs(metrics)) {
            factors.push('too-few-inputs');
            details['too-few-inputs'] = this.calculateRiskScore('too-few-inputs', metrics.mouseMovements + metrics.keyPresses);
        }
        // Analyze movement patterns if we have enough data
        if (metrics.mouseMovements > 10) {
            const movementAnalysis = this.analyzeMovementPatterns(metrics);
            if (movementAnalysis.isAutomated) {
                factors.push('pattern-based');
                factors.push('suspicious-movements');
                details['pattern-based'] = movementAnalysis.patternScore;
                details['suspicious-movements'] = movementAnalysis.suspiciousScore;
            }
            if (movementAnalysis.noVariance) {
                factors.push('no-variance');
                details['no-variance'] = this.calculateRiskScore('no-variance', 0);
            }
        }
        // Analyze timing consistency if we have timing data
        if (metrics.interactionDuration > 0) {
            const timingAnalysis = this.analyzeTimingConsistency(metrics);
            if (timingAnalysis.hasAnomaly) {
                factors.push('timing-anomaly');
                details['timing-anomaly'] = this.calculateRiskScore('timing-anomaly', timingAnalysis.anomalyScore);
            }
            if (timingAnalysis.tooConsistent) {
                factors.push('input-consistency');
                details['input-consistency'] = this.calculateRiskScore('input-consistency', timingAnalysis.consistencyScore);
            }
        }
        // If game had a perfect score too quickly, mark as too perfect
        if (result.score > 95 && result.time < 5000) {
            factors.push('too-perfect');
            details['too-perfect'] = this.calculateRiskScore('too-perfect', 100 - (result.time / 50));
        }
        // Calculate aggregate risk score
        const riskResult = this.createResult(factors, details);
        debug('Behavior analysis', riskResult);
        return riskResult;
    }
    /**
     * Calculate the final risk result
     *
     * @param factors - Detected risk factors
     * @param details - Detailed risk breakdown
     * @param overrideScore - Optional score override
     * @returns Complete analysis result
     * @private
     */
    static createResult(factors, details, overrideScore) {
        // Calculate total risk score (0-100)
        let score;
        if (overrideScore !== undefined) {
            score = overrideScore;
        }
        else {
            score = factors.reduce((total, factor) => {
                return total + (details[factor] || 0);
            }, 0);
            // Cap at 100
            score = Math.min(100, score);
        }
        // Determine risk level
        let level;
        if (score < 30) {
            level = 'low';
        }
        else if (score < 70) {
            level = 'medium';
        }
        else {
            level = 'high';
        }
        // Calculate confidence based on how many metrics we analyzed
        const metricsAnalyzed = Object.keys(details).length;
        const confidence = Math.min(1, metricsAnalyzed / 5);
        return {
            score,
            level,
            factors,
            details,
            confidence,
            timestamp: Date.now()
        };
    }
    /**
     * Check if completion time is suspiciously fast
     *
     * @param time - Completion time in milliseconds
     * @returns True if time is suspiciously fast
     * @private
     */
    static isTooFast(time) {
        return time < 1000;
    }
    /**
     * Check if score is suspiciously high
     *
     * @param score - Game score (0-100)
     * @returns True if score is suspiciously high
     * @private
     */
    static isScoreSuspicious(score) {
        return score > 95;
    }
    /**
     * Check if there are too few inputs for valid human interaction
     *
     * @param metrics - Interaction metrics
     * @returns True if there are too few inputs
     * @private
     */
    static hasTooFewInputs(metrics) {
        const totalInputs = metrics.mouseMovements + metrics.keyPresses;
        return totalInputs < BEHAVIOR_THRESHOLDS.MIN_MOUSE_MOVEMENTS;
    }
    /**
     * Analyze movement patterns for signs of automation
     *
     * @param metrics - Interaction metrics
     * @returns Movement pattern analysis result
     * @private
     */
    static analyzeMovementPatterns(metrics) {
        // This is a placeholder for more complex pattern analysis
        // In a real implementation, this would analyze actual movement data
        // For now, we're using simple heuristics based on metrics
        const mouseMovements = metrics.mouseMovements;
        const keyPresses = metrics.keyPresses;
        // Check for reasonable ratio of mouse to key inputs
        const ratio = mouseMovements / (keyPresses || 1);
        const isRatioSuspicious = ratio > 100 || ratio < 0.01;
        // Simplistic "pattern detection" for demo purposes
        // Ideally this would use more sophisticated algorithms
        const patternScore = isRatioSuspicious ? 60 : 0;
        // Check for suspiciously regular timing between inputs
        // This is a simplified placeholder - real implementation would be more sophisticated
        const suspiciousScore = isRatioSuspicious ? 40 : 0;
        return {
            isAutomated: patternScore > 50,
            patternScore,
            suspiciousScore,
            noVariance: false // Placeholder for actual variance analysis
        };
    }
    /**
     * Analyze timing consistency for signs of automation
     *
     * @param metrics - Interaction metrics
     * @returns Timing analysis result
     * @private
     */
    static analyzeTimingConsistency(metrics) {
        // This is a placeholder for more complex timing analysis
        // In a real implementation, this would analyze actual timing data
        // For now, we're using simple heuristics
        const duration = metrics.interactionDuration;
        const inputs = metrics.mouseMovements + metrics.keyPresses;
        // If inputs per second is unrealistically high, flag as anomaly
        const inputsPerSecond = inputs / (duration / 1000);
        const hasAnomaly = inputsPerSecond > 20; // More than 20 inputs per second is suspicious
        // For now, use simplified scoring
        const anomalyScore = hasAnomaly ? 70 : 0;
        // Placeholder for consistency analysis
        // This would normally analyze the variance of timing between inputs
        const tooConsistent = false;
        const consistencyScore = 0;
        return {
            hasAnomaly,
            anomalyScore,
            tooConsistent,
            consistencyScore
        };
    }
    /**
     * Calculate risk score for a particular factor
     *
     * @param factor - Risk factor to calculate score for
     * @param value - Raw value associated with the factor
     * @returns Risk score contribution (0-100)
     * @private
     */
    static calculateRiskScore(factor, value) {
        // Get base weight for this factor
        const baseWeight = this.RISK_WEIGHTS[factor] || 10;
        // Apply factor-specific scaling
        switch (factor) {
            case 'too-fast':
                // Scale based on how much faster than threshold
                return baseWeight * (1000 / Math.max(value, 100));
            case 'impossible-score':
                // Scale based on how close to 100%
                return baseWeight * ((value - 90) / 10);
            case 'too-few-inputs':
                // Scale based on how far below threshold
                return baseWeight * (1 - (value / BEHAVIOR_THRESHOLDS.MIN_MOUSE_MOVEMENTS));
            default:
                // Use raw value as provided
                return baseWeight * (value / 100);
        }
    }
}
BehaviorAnalyzer.RISK_WEIGHTS = {
    'too-fast': 30,
    'too-perfect': 25,
    'pattern-based': 20,
    'no-variance': 20,
    'impossible-score': 40,
    'too-few-inputs': 15,
    'timing-anomaly': 25,
    'input-consistency': 15,
    'suspicious-movements': 20
};

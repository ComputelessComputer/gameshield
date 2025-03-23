/**
 * Behavior Analysis Module
 *
 * This module tracks and analyzes user behavior during gameplay to determine
 * if the interaction patterns match those of a human or an automated bot.
 */
export class BehaviorAnalyzer {
    constructor() {
        this.interactionPoints = [];
        this.reactionTimes = [];
        this.expectedReactionEvents = new Map();
        this.gameStartTime = Date.now();
        this.lastAnalysisTime = this.gameStartTime;
    }
    /**
     * Record a user interaction point
     */
    recordInteraction(x, y, type, key) {
        const timestamp = Date.now();
        this.interactionPoints.push({
            x,
            y,
            timestamp,
            type,
            key
        });
    }
    /**
     * Register an expected reaction event (e.g., an obstacle appears that the user should react to)
     */
    registerExpectedReaction(eventId) {
        this.expectedReactionEvents.set(eventId, Date.now());
    }
    /**
     * Record when the user reacted to an expected event
     */
    recordReaction(eventId) {
        const eventTime = this.expectedReactionEvents.get(eventId);
        if (eventTime) {
            const reactionTime = Date.now() - eventTime;
            this.reactionTimes.push(reactionTime);
            this.expectedReactionEvents.delete(eventId);
        }
    }
    /**
     * Calculate movement smoothness based on the recorded interaction points
     */
    calculateMovementSmoothness() {
        if (this.interactionPoints.length < 3) {
            return 0.5; // Not enough data, return neutral value
        }
        // Calculate jerk (rate of change of acceleration) which is lower for human movements
        let jerkSum = 0;
        let count = 0;
        const movePoints = this.interactionPoints.filter(p => p.type === 'move');
        for (let i = 2; i < movePoints.length; i++) {
            const p1 = movePoints[i - 2];
            const p2 = movePoints[i - 1];
            const p3 = movePoints[i];
            const dt1 = (p2.timestamp - p1.timestamp) / 1000; // Convert to seconds
            const dt2 = (p3.timestamp - p2.timestamp) / 1000;
            if (dt1 > 0 && dt2 > 0) {
                // Calculate velocities
                const vx1 = (p2.x - p1.x) / dt1;
                const vy1 = (p2.y - p1.y) / dt1;
                const vx2 = (p3.x - p2.x) / dt2;
                const vy2 = (p3.y - p2.y) / dt2;
                // Calculate accelerations
                const ax = (vx2 - vx1) / ((dt1 + dt2) / 2);
                const ay = (vy2 - vy1) / ((dt1 + dt2) / 2);
                // Calculate jerk magnitude
                const jerkMagnitude = Math.sqrt(ax * ax + ay * ay);
                jerkSum += jerkMagnitude;
                count++;
            }
        }
        if (count === 0)
            return 0.5;
        const avgJerk = jerkSum / count;
        // Convert to a 0-1 scale where higher is smoother (lower jerk)
        // Using an exponential decay function to map jerk to smoothness
        return Math.exp(-avgJerk / 500);
    }
    /**
     * Calculate movement variability
     */
    calculateMovementVariability() {
        if (this.interactionPoints.length < 5) {
            return 0.5; // Not enough data
        }
        const movePoints = this.interactionPoints.filter(p => p.type === 'move');
        if (movePoints.length < 5)
            return 0.5;
        // Calculate speeds between consecutive points
        const speeds = [];
        for (let i = 1; i < movePoints.length; i++) {
            const p1 = movePoints[i - 1];
            const p2 = movePoints[i];
            const dt = (p2.timestamp - p1.timestamp) / 1000; // Convert to seconds
            if (dt > 0) {
                const dx = p2.x - p1.x;
                const dy = p2.y - p1.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const speed = distance / dt;
                speeds.push(speed);
            }
        }
        if (speeds.length === 0)
            return 0.5;
        // Calculate standard deviation of speeds
        const avgSpeed = speeds.reduce((sum, speed) => sum + speed, 0) / speeds.length;
        const variance = speeds.reduce((sum, speed) => sum + Math.pow(speed - avgSpeed, 2), 0) / speeds.length;
        const stdDev = Math.sqrt(variance);
        // Normalize to a 0-1 scale
        // Bots tend to have very consistent speeds (low variability) or extremely erratic speeds
        // Humans have a moderate amount of variability
        const normalizedVariability = Math.min(1, stdDev / (avgSpeed * 0.5));
        return normalizedVariability;
    }
    /**
     * Calculate interaction density (interactions per second)
     */
    calculateInteractionDensity() {
        const totalTime = (Date.now() - this.gameStartTime) / 1000; // in seconds
        if (totalTime <= 0)
            return 0;
        return this.interactionPoints.length / totalTime;
    }
    /**
     * Calculate pause patterns
     */
    calculatePausePatterns() {
        const pauses = [];
        for (let i = 1; i < this.interactionPoints.length; i++) {
            const timeDiff = this.interactionPoints[i].timestamp - this.interactionPoints[i - 1].timestamp;
            if (timeDiff > 500) { // Only count pauses longer than 500ms
                pauses.push(timeDiff);
            }
        }
        return pauses;
    }
    /**
     * Calculate decision consistency
     */
    calculateDecisionConsistency() {
        // This is a simplified implementation
        // A more sophisticated version would identify similar game situations and compare responses
        return 0.7; // Placeholder value
    }
    /**
     * Calculate error rate
     */
    calculateErrorRate() {
        // This is a simplified implementation
        // A more sophisticated version would track corrections in movement
        return 0.2; // Placeholder value
    }
    /**
     * Analyze behavior and return metrics
     */
    analyzeBehavior() {
        const movementSmoothness = this.calculateMovementSmoothness();
        const movementVariability = this.calculateMovementVariability();
        const interactionDensity = this.calculateInteractionDensity();
        const pausePatterns = this.calculatePausePatterns();
        const decisionConsistency = this.calculateDecisionConsistency();
        const errorRate = this.calculateErrorRate();
        const avgReactionTime = this.reactionTimes.length > 0
            ? this.reactionTimes.reduce((sum, time) => sum + time, 0) / this.reactionTimes.length
            : 0;
        this.lastAnalysisTime = Date.now();
        return {
            movementSmoothness,
            movementVariability,
            reactionTimes: [...this.reactionTimes],
            averageReactionTime: avgReactionTime,
            decisionConsistency,
            errorRate,
            interactionDensity,
            pausePatterns,
            interactionPoints: [...this.interactionPoints]
        };
    }
    /**
     * Determine if the behavior appears to be human
     */
    isHumanBehavior() {
        const metrics = this.analyzeBehavior();
        // Weighted scoring of different metrics
        let score = 0;
        let totalWeight = 0;
        // Movement smoothness (weight: 3)
        // Humans have smooth but not too perfect movement
        const smoothnessScore = metrics.movementSmoothness > 0.3 && metrics.movementSmoothness < 0.95 ? 1 : 0;
        score += smoothnessScore * 3;
        totalWeight += 3;
        // Movement variability (weight: 2)
        // Humans have moderate variability
        const variabilityScore = metrics.movementVariability > 0.2 && metrics.movementVariability < 0.8 ? 1 : 0;
        score += variabilityScore * 2;
        totalWeight += 2;
        // Reaction time (weight: 2)
        // Humans have reaction times typically between 200-800ms
        const reactionScore = metrics.averageReactionTime > 200 && metrics.averageReactionTime < 800 ? 1 : 0;
        score += reactionScore * 2;
        totalWeight += 2;
        // Interaction density (weight: 1)
        // Bots often have very high or very low interaction density
        const densityScore = metrics.interactionDensity > 0.5 && metrics.interactionDensity < 10 ? 1 : 0;
        score += densityScore * 1;
        totalWeight += 1;
        // Pause patterns (weight: 1)
        // Humans have natural pauses
        const pauseScore = metrics.pausePatterns.length > 0 ? 1 : 0;
        score += pauseScore * 1;
        totalWeight += 1;
        // Calculate final score as a percentage
        const finalScore = totalWeight > 0 ? score / totalWeight : 0.5;
        // Determine if human based on threshold
        const isHuman = finalScore >= 0.7;
        return {
            isHuman,
            confidence: finalScore
        };
    }
    /**
     * Reset the analyzer
     */
    reset() {
        this.interactionPoints = [];
        this.gameStartTime = Date.now();
        this.lastAnalysisTime = this.gameStartTime;
        this.reactionTimes = [];
        this.expectedReactionEvents.clear();
    }
}
// Export a singleton instance
export const behaviorAnalyzer = new BehaviorAnalyzer();

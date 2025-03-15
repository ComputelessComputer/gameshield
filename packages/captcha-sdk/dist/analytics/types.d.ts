/**
 * Verification data collected during a CAPTCHA verification attempt
 */
export interface VerificationData {
    sessionId: string;
    timestamp: number;
    success: boolean;
    gameType: string;
    difficulty: string;
    duration: number;
    attempts: number;
    clientInfo: {
        userAgent: string;
        ip?: string;
        fingerprint?: string;
        geolocation?: {
            country?: string;
            region?: string;
        };
    };
    behaviorMetrics?: {
        mouseMovements?: number;
        keyPresses?: number;
        interactionPattern?: string;
        responseTime?: number;
    };
}
/**
 * Data specifically related to suspected malicious activity
 */
export interface MaliciousActivityData extends VerificationData {
    riskScore: number;
    flags: string[];
    evidence?: any;
}
/**
 * Aggregated statistics for the admin dashboard
 */
export interface GameShieldStats {
    totalVerifications: number;
    successRate: number;
    averageDuration: number;
    maliciousAttempts: number;
    gameTypeDistribution: Record<string, number>;
    difficultyDistribution: Record<string, number>;
    timeSeriesData: {
        timestamp: number;
        verifications: number;
        successRate: number;
        maliciousAttempts: number;
    }[];
    geoDistribution?: Record<string, number>;
}
/**
 * Provider interface for GameShield analytics
 */
export interface GameShieldAnalyticsProvider {
    /**
     * Record a verification attempt
     */
    recordVerificationAttempt(data: VerificationData): Promise<void>;
    /**
     * Record suspected malicious activity
     */
    recordMaliciousActivity(data: MaliciousActivityData): Promise<void>;
    /**
     * Get aggregated statistics
     */
    getStats(filters?: StatsFilters): Promise<GameShieldStats>;
    /**
     * Get raw verification data
     */
    getVerificationData(filters?: DataFilters): Promise<VerificationData[]>;
    /**
     * Get malicious activity data
     */
    getMaliciousActivityData(filters?: DataFilters): Promise<MaliciousActivityData[]>;
}
/**
 * Filters for retrieving statistics
 */
export interface StatsFilters {
    startDate?: Date;
    endDate?: Date;
    gameTypes?: string[];
    difficulties?: string[];
    groupBy?: 'hour' | 'day' | 'week' | 'month';
}
/**
 * Filters for retrieving raw data
 */
export interface DataFilters {
    startDate?: Date;
    endDate?: Date;
    gameTypes?: string[];
    difficulties?: string[];
    success?: boolean;
    limit?: number;
    offset?: number;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
}

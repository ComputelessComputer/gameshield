import { GameShieldAnalyticsProvider, VerificationData, MaliciousActivityData, GameShieldStats, StatsFilters, DataFilters } from '../types';
/**
 * A simple analytics provider that stores data in localStorage
 * This is intended for demo purposes only and should not be used in production
 */
export declare class LocalStorageAnalyticsProvider implements GameShieldAnalyticsProvider {
    private readonly VERIFICATION_KEY;
    private readonly MALICIOUS_KEY;
    constructor();
    /**
     * Record a verification attempt in localStorage
     */
    recordVerificationAttempt(data: VerificationData): Promise<void>;
    /**
     * Record malicious activity in localStorage
     */
    recordMaliciousActivity(data: MaliciousActivityData): Promise<void>;
    /**
     * Get aggregated statistics from stored data
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
    /**
     * Apply filters to data
     */
    private applyFiltersToData;
    /**
     * Get empty stats object
     */
    private getEmptyStats;
    /**
     * Get timestamp for the start of the day
     */
    private getDayTimestamp;
}

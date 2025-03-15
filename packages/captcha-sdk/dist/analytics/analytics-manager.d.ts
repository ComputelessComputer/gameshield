import { GameShieldAnalyticsProvider, VerificationData, MaliciousActivityData, GameShieldStats, StatsFilters, DataFilters } from './types';
/**
 * Analytics Manager for GameShield
 * Handles analytics providers and data collection
 */
export declare class AnalyticsManager {
    private provider;
    private readonly defaultProvider;
    constructor(provider?: GameShieldAnalyticsProvider);
    /**
     * Set a custom analytics provider
     */
    setProvider(provider: GameShieldAnalyticsProvider): void;
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
    /**
     * Enrich data with browser information
     */
    private enrichData;
    /**
     * Generate a simple browser fingerprint
     * This is a very basic implementation and should be replaced with a proper fingerprinting library in production
     */
    private generateSimpleFingerprint;
}

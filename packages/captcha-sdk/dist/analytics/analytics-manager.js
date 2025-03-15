import { LocalStorageAnalyticsProvider } from './providers/local-storage-provider';
/**
 * Analytics Manager for GameShield
 * Handles analytics providers and data collection
 */
export class AnalyticsManager {
    constructor(provider) {
        this.defaultProvider = new LocalStorageAnalyticsProvider();
        this.provider = provider || this.defaultProvider;
    }
    /**
     * Set a custom analytics provider
     */
    setProvider(provider) {
        this.provider = provider;
    }
    /**
     * Record a verification attempt
     */
    async recordVerificationAttempt(data) {
        try {
            // Enrich data with browser information
            const enrichedData = this.enrichData(data);
            await this.provider.recordVerificationAttempt(enrichedData);
        }
        catch (error) {
            console.error('Failed to record verification attempt:', error);
        }
    }
    /**
     * Record suspected malicious activity
     */
    async recordMaliciousActivity(data) {
        try {
            // Enrich data with browser information
            const enrichedData = this.enrichData(data);
            await this.provider.recordMaliciousActivity(enrichedData);
        }
        catch (error) {
            console.error('Failed to record malicious activity:', error);
        }
    }
    /**
     * Get aggregated statistics
     */
    async getStats(filters) {
        return this.provider.getStats(filters);
    }
    /**
     * Get raw verification data
     */
    async getVerificationData(filters) {
        return this.provider.getVerificationData(filters);
    }
    /**
     * Get malicious activity data
     */
    async getMaliciousActivityData(filters) {
        return this.provider.getMaliciousActivityData(filters);
    }
    /**
     * Enrich data with browser information
     */
    enrichData(data) {
        if (typeof window === 'undefined')
            return data;
        return {
            ...data,
            timestamp: data.timestamp || Date.now(),
            clientInfo: {
                ...data.clientInfo,
                userAgent: window.navigator.userAgent,
                // Generate a simple fingerprint based on available browser information
                // This is a very basic implementation and should be replaced with a proper fingerprinting library in production
                fingerprint: this.generateSimpleFingerprint()
            }
        };
    }
    /**
     * Generate a simple browser fingerprint
     * This is a very basic implementation and should be replaced with a proper fingerprinting library in production
     */
    generateSimpleFingerprint() {
        if (typeof window === 'undefined')
            return '';
        const components = [
            window.navigator.userAgent,
            window.navigator.language,
            window.screen.colorDepth,
            window.screen.width + 'x' + window.screen.height,
            new Date().getTimezoneOffset(),
            !!window.sessionStorage,
            !!window.localStorage,
            !!window.indexedDB
        ];
        // Create a simple hash of the components
        return components.join('###');
    }
}

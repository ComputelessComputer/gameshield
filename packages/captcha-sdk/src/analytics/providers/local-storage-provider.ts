import { 
  GameShieldAnalyticsProvider, 
  VerificationData, 
  MaliciousActivityData, 
  GameShieldStats,
  StatsFilters,
  DataFilters
} from '../types';

/**
 * A simple analytics provider that stores data in localStorage
 * This is intended for demo purposes only and should not be used in production
 */
export class LocalStorageAnalyticsProvider implements GameShieldAnalyticsProvider {
  private readonly VERIFICATION_KEY = 'gameshield_verification_data';
  private readonly MALICIOUS_KEY = 'gameshield_malicious_data';
  
  constructor() {
    // Initialize storage if it doesn't exist
    if (typeof window !== 'undefined') {
      if (!localStorage.getItem(this.VERIFICATION_KEY)) {
        localStorage.setItem(this.VERIFICATION_KEY, JSON.stringify([]));
      }
      if (!localStorage.getItem(this.MALICIOUS_KEY)) {
        localStorage.setItem(this.MALICIOUS_KEY, JSON.stringify([]));
      }
    }
  }
  
  /**
   * Record a verification attempt in localStorage
   */
  async recordVerificationAttempt(data: VerificationData): Promise<void> {
    if (typeof window === 'undefined') return;
    
    try {
      const storedData = JSON.parse(localStorage.getItem(this.VERIFICATION_KEY) || '[]');
      storedData.push({
        ...data,
        timestamp: data.timestamp || Date.now()
      });
      
      // Limit storage to prevent localStorage from getting too large
      const limitedData = storedData.slice(-1000);
      localStorage.setItem(this.VERIFICATION_KEY, JSON.stringify(limitedData));
    } catch (error) {
      console.error('Failed to record verification attempt:', error);
    }
  }
  
  /**
   * Record malicious activity in localStorage
   */
  async recordMaliciousActivity(data: MaliciousActivityData): Promise<void> {
    if (typeof window === 'undefined') return;
    
    try {
      const storedData = JSON.parse(localStorage.getItem(this.MALICIOUS_KEY) || '[]');
      storedData.push({
        ...data,
        timestamp: data.timestamp || Date.now()
      });
      
      // Limit storage to prevent localStorage from getting too large
      const limitedData = storedData.slice(-500);
      localStorage.setItem(this.MALICIOUS_KEY, JSON.stringify(limitedData));
    } catch (error) {
      console.error('Failed to record malicious activity:', error);
    }
  }
  
  /**
   * Get aggregated statistics from stored data
   */
  async getStats(filters?: StatsFilters): Promise<GameShieldStats> {
    if (typeof window === 'undefined') {
      return this.getEmptyStats();
    }
    
    try {
      const verificationData: VerificationData[] = JSON.parse(
        localStorage.getItem(this.VERIFICATION_KEY) || '[]'
      );
      
      const maliciousData: MaliciousActivityData[] = JSON.parse(
        localStorage.getItem(this.MALICIOUS_KEY) || '[]'
      );
      
      // Apply filters
      const filteredData = this.applyFiltersToData(verificationData, filters);
      
      if (filteredData.length === 0) {
        return this.getEmptyStats();
      }
      
      // Calculate statistics
      const totalVerifications = filteredData.length;
      const successfulVerifications = filteredData.filter(d => d.success).length;
      const successRate = totalVerifications > 0 
        ? successfulVerifications / totalVerifications 
        : 0;
      
      const durations = filteredData
        .filter(d => d.duration !== undefined)
        .map(d => d.duration);
      
      const averageDuration = durations.length > 0 
        ? durations.reduce((sum, val) => sum + val, 0) / durations.length 
        : 0;
      
      // Game type distribution
      const gameTypeDistribution: Record<string, number> = {};
      filteredData.forEach(d => {
        gameTypeDistribution[d.gameType] = (gameTypeDistribution[d.gameType] || 0) + 1;
      });
      
      // Difficulty distribution
      const difficultyDistribution: Record<string, number> = {};
      filteredData.forEach(d => {
        difficultyDistribution[d.difficulty] = (difficultyDistribution[d.difficulty] || 0) + 1;
      });
      
      // Time series data - group by day for simplicity
      const timeSeriesMap = new Map<number, {
        verifications: number;
        successful: number;
        malicious: number;
      }>();
      
      // Process verification data for time series
      filteredData.forEach(d => {
        const dayTimestamp = this.getDayTimestamp(d.timestamp);
        const existing = timeSeriesMap.get(dayTimestamp) || { 
          verifications: 0, 
          successful: 0,
          malicious: 0
        };
        
        existing.verifications++;
        if (d.success) {
          existing.successful++;
        }
        
        timeSeriesMap.set(dayTimestamp, existing);
      });
      
      // Process malicious data for time series
      maliciousData.forEach(d => {
        const dayTimestamp = this.getDayTimestamp(d.timestamp);
        const existing = timeSeriesMap.get(dayTimestamp) || { 
          verifications: 0, 
          successful: 0,
          malicious: 0
        };
        
        existing.malicious++;
        timeSeriesMap.set(dayTimestamp, existing);
      });
      
      // Convert map to array and sort by timestamp
      const timeSeriesData = Array.from(timeSeriesMap.entries())
        .map(([timestamp, data]) => ({
          timestamp,
          verifications: data.verifications,
          successRate: data.verifications > 0 
            ? data.successful / data.verifications 
            : 0,
          maliciousAttempts: data.malicious
        }))
        .sort((a, b) => a.timestamp - b.timestamp);
      
      return {
        totalVerifications,
        successRate,
        averageDuration,
        maliciousAttempts: maliciousData.length,
        gameTypeDistribution,
        difficultyDistribution,
        timeSeriesData
      };
    } catch (error) {
      console.error('Failed to get stats:', error);
      return this.getEmptyStats();
    }
  }
  
  /**
   * Get raw verification data
   */
  async getVerificationData(filters?: DataFilters): Promise<VerificationData[]> {
    if (typeof window === 'undefined') return [];
    
    try {
      const data: VerificationData[] = JSON.parse(
        localStorage.getItem(this.VERIFICATION_KEY) || '[]'
      );
      
      return this.applyFiltersToData(data, filters);
    } catch (error) {
      console.error('Failed to get verification data:', error);
      return [];
    }
  }
  
  /**
   * Get malicious activity data
   */
  async getMaliciousActivityData(filters?: DataFilters): Promise<MaliciousActivityData[]> {
    if (typeof window === 'undefined') return [];
    
    try {
      const data: MaliciousActivityData[] = JSON.parse(
        localStorage.getItem(this.MALICIOUS_KEY) || '[]'
      );
      
      return this.applyFiltersToData(data, filters);
    } catch (error) {
      console.error('Failed to get malicious activity data:', error);
      return [];
    }
  }
  
  /**
   * Apply filters to data
   */
  private applyFiltersToData<T extends VerificationData>(
    data: T[], 
    filters?: StatsFilters | DataFilters
  ): T[] {
    if (!filters) return data;
    
    return data.filter(item => {
      // Filter by date range
      if (filters.startDate && item.timestamp < filters.startDate.getTime()) {
        return false;
      }
      
      if (filters.endDate && item.timestamp > filters.endDate.getTime()) {
        return false;
      }
      
      // Filter by game type
      if (filters.gameTypes && filters.gameTypes.length > 0 && 
          !filters.gameTypes.includes(item.gameType)) {
        return false;
      }
      
      // Filter by difficulty
      if (filters.difficulties && filters.difficulties.length > 0 && 
          !filters.difficulties.includes(item.difficulty)) {
        return false;
      }
      
      // Filter by success (if DataFilters)
      if ('success' in filters && filters.success !== undefined && 
          item.success !== filters.success) {
        return false;
      }
      
      return true;
    });
  }
  
  /**
   * Get empty stats object
   */
  private getEmptyStats(): GameShieldStats {
    return {
      totalVerifications: 0,
      successRate: 0,
      averageDuration: 0,
      maliciousAttempts: 0,
      gameTypeDistribution: {},
      difficultyDistribution: {},
      timeSeriesData: []
    };
  }
  
  /**
   * Get timestamp for the start of the day
   */
  private getDayTimestamp(timestamp: number): number {
    const date = new Date(timestamp);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  }
}

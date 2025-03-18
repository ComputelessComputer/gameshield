import { 
  GameShieldAnalyticsProvider, 
  VerificationData, 
  MaliciousActivityData, 
  GameShieldStats,
  StatsFilters,
  DataFilters
} from '../types';

/**
 * Server API Analytics Provider
 * 
 * This provider sends analytics data to a server API endpoint
 * for storage and retrieval. Suitable for production use.
 */
export class ServerApiProvider implements GameShieldAnalyticsProvider {
  private apiEndpoint: string;
  private apiKey: string;
  private batchQueue: {
    verifications: VerificationData[];
    malicious: MaliciousActivityData[];
  };
  private batchSize: number;
  private flushInterval: number;
  private flushTimer: NodeJS.Timeout | null = null;
  
  /**
   * Create a new ServerApiProvider
   * 
   * @param options - Provider configuration
   */
  constructor(options: {
    apiEndpoint: string;
    apiKey: string;
    batchSize?: number;
    flushIntervalMs?: number;
  }) {
    this.apiEndpoint = options.apiEndpoint;
    this.apiKey = options.apiKey;
    this.batchSize = options.batchSize || 10;
    this.flushInterval = options.flushIntervalMs || 30000; // 30 seconds default
    this.batchQueue = {
      verifications: [],
      malicious: []
    };
    
    // Start flush timer if in browser environment
    if (typeof window !== 'undefined') {
      this.startFlushTimer();
    }
  }
  
  /**
   * Record a verification attempt
   */
  async recordVerificationAttempt(data: VerificationData): Promise<void> {
    // Add to batch queue
    this.batchQueue.verifications.push({
      ...data,
      timestamp: data.timestamp || Date.now()
    });
    
    // Flush if batch size reached
    if (this.batchQueue.verifications.length >= this.batchSize) {
      await this.flushVerificationQueue();
    }
  }
  
  /**
   * Record suspected malicious activity
   */
  async recordMaliciousActivity(data: MaliciousActivityData): Promise<void> {
    // Add to batch queue
    this.batchQueue.malicious.push({
      ...data,
      timestamp: data.timestamp || Date.now()
    });
    
    // Flush immediately for malicious activity (higher priority)
    await this.flushMaliciousQueue();
  }
  
  /**
   * Get aggregated statistics
   */
  async getStats(filters?: StatsFilters): Promise<GameShieldStats> {
    try {
      const queryParams = this.buildQueryParams(filters);
      const response = await fetch(`${this.apiEndpoint}/stats?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to get stats:', error);
      return this.getEmptyStats();
    }
  }
  
  /**
   * Get raw verification data
   */
  async getVerificationData(filters?: DataFilters): Promise<VerificationData[]> {
    try {
      const queryParams = this.buildQueryParams(filters);
      const response = await fetch(`${this.apiEndpoint}/verification-data?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to get verification data:', error);
      return [];
    }
  }
  
  /**
   * Get malicious activity data
   */
  async getMaliciousActivityData(filters?: DataFilters): Promise<MaliciousActivityData[]> {
    try {
      const queryParams = this.buildQueryParams(filters);
      const response = await fetch(`${this.apiEndpoint}/malicious-data?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to get malicious activity data:', error);
      return [];
    }
  }
  
  /**
   * Flush verification data queue to server
   */
  private async flushVerificationQueue(): Promise<void> {
    if (this.batchQueue.verifications.length === 0) return;
    
    const dataToSend = [...this.batchQueue.verifications];
    this.batchQueue.verifications = [];
    
    try {
      const response = await fetch(`${this.apiEndpoint}/verification-batch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(dataToSend)
      });
      
      if (!response.ok) {
        // Put data back in queue on failure
        this.batchQueue.verifications = [...dataToSend, ...this.batchQueue.verifications];
        throw new Error(`API error: ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to send verification data:', error);
      // Put data back in queue on failure
      this.batchQueue.verifications = [...dataToSend, ...this.batchQueue.verifications];
    }
  }
  
  /**
   * Flush malicious activity data queue to server
   */
  private async flushMaliciousQueue(): Promise<void> {
    if (this.batchQueue.malicious.length === 0) return;
    
    const dataToSend = [...this.batchQueue.malicious];
    this.batchQueue.malicious = [];
    
    try {
      const response = await fetch(`${this.apiEndpoint}/malicious-batch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(dataToSend)
      });
      
      if (!response.ok) {
        // Put data back in queue on failure
        this.batchQueue.malicious = [...dataToSend, ...this.batchQueue.malicious];
        throw new Error(`API error: ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to send malicious activity data:', error);
      // Put data back in queue on failure
      this.batchQueue.malicious = [...dataToSend, ...this.batchQueue.malicious];
    }
  }
  
  /**
   * Start the flush timer
   */
  private startFlushTimer(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }
    
    this.flushTimer = setInterval(async () => {
      await this.flushVerificationQueue();
      await this.flushMaliciousQueue();
    }, this.flushInterval);
  }
  
  /**
   * Stop the flush timer
   */
  public stopFlushTimer(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flushTimer = null;
    }
  }
  
  /**
   * Build query parameters from filters
   */
  private buildQueryParams(filters?: StatsFilters | DataFilters): string {
    if (!filters) return '';
    
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value === undefined) return;
      
      if (key === 'startDate' || key === 'endDate') {
        params.append(key, (value as Date).toISOString());
      } else if (Array.isArray(value)) {
        value.forEach(v => params.append(`${key}[]`, v));
      } else {
        params.append(key, String(value));
      }
    });
    
    return params.toString();
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
   * Manually flush all queued data
   * Useful when page is about to unload
   */
  public async flushAll(): Promise<void> {
    await Promise.all([
      this.flushVerificationQueue(),
      this.flushMaliciousQueue()
    ]);
  }
  
  /**
   * Clean up resources
   */
  public dispose(): void {
    this.stopFlushTimer();
    this.flushAll().catch(console.error);
  }
}

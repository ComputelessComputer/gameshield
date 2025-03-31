/**
 * Admin dashboard types
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

export interface MaliciousActivityData extends VerificationData {
  riskScore: number;
  flags: string[];
  evidence?: Record<string, unknown>;
}

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

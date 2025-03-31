import { MaliciousActivityData, GameShieldStats } from './types';

/**
 * Mock malicious activity data
 */
export const mockMaliciousData: MaliciousActivityData[] = [
  {
    sessionId: 'session-123',
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
    success: false,
    gameType: 'puzzle',
    difficulty: 'medium',
    duration: 3200,
    attempts: 1,
    clientInfo: {
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      fingerprint: 'fp-123'
    },
    riskScore: 85,
    flags: ['impossible-score', 'too-fast']
  },
  {
    sessionId: 'session-456',
    timestamp: Date.now() - 4 * 60 * 60 * 1000,
    success: false,
    gameType: 'maze',
    difficulty: 'easy',
    duration: 1800,
    attempts: 2,
    clientInfo: {
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
      fingerprint: 'fp-456'
    },
    riskScore: 75,
    flags: ['too-few-inputs']
  },
  {
    sessionId: 'session-789',
    timestamp: Date.now() - 8 * 60 * 60 * 1000,
    success: false,
    gameType: 'pattern',
    difficulty: 'hard',
    duration: 2500,
    attempts: 3,
    clientInfo: {
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
      fingerprint: 'fp-789'
    },
    riskScore: 90,
    flags: ['impossible-score', 'too-fast', 'too-few-inputs']
  }
];

/**
 * Mock stats data
 */
export const mockStats: GameShieldStats = {
  totalVerifications: 1245,
  successRate: 0.78,
  averageDuration: 12500,
  maliciousAttempts: 87,
  gameTypeDistribution: {
    'puzzle': 450,
    'maze': 380,
    'pattern': 415
  },
  difficultyDistribution: {
    'easy': 520,
    'medium': 625,
    'hard': 100
  },
  timeSeriesData: [
    { timestamp: Date.now() - 6 * 24 * 60 * 60 * 1000, verifications: 180, successRate: 0.75, maliciousAttempts: 12 },
    { timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000, verifications: 195, successRate: 0.77, maliciousAttempts: 15 },
    { timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000, verifications: 210, successRate: 0.79, maliciousAttempts: 18 },
    { timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000, verifications: 225, successRate: 0.76, maliciousAttempts: 14 },
    { timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000, verifications: 215, successRate: 0.80, maliciousAttempts: 16 },
    { timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000, verifications: 220, successRate: 0.81, maliciousAttempts: 12 }
  ]
};

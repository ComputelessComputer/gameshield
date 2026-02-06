// Site types
export interface Site {
  id: string;
  siteKey: string;
  name: string;
  domains: string[];
  settings: SiteSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface SiteSettings {
  difficulty: 'easy' | 'medium' | 'hard';
  minLinesRequired: number;
  maxSolveTime: number; // seconds
  theme: 'light' | 'dark' | 'auto';
}

export interface CreateSiteRequest {
  name: string;
  domains: string[];
  settings?: Partial<SiteSettings>;
}

export interface UpdateSiteRequest {
  name?: string;
  domains?: string[];
  settings?: Partial<SiteSettings>;
}

// API Key types
export interface ApiKey {
  id: string;
  siteId: string;
  keyPrefix: string;
  name: string;
  createdAt: Date;
  revokedAt: Date | null;
}

export interface CreateApiKeyRequest {
  name: string;
}

export interface CreateApiKeyResponse {
  id: string;
  secretKey: string; // Only returned once
  keyPrefix: string;
  name: string;
}

// Challenge types
export interface Challenge {
  id: string;
  siteId: string;
  challengeData: ChallengeData;
  token: string;
  status: ChallengeStatus;
  expiresAt: Date;
  createdAt: Date;
}

export type ChallengeStatus = 'pending' | 'completed' | 'expired';

export interface ChallengeData {
  seed: number;
  difficulty: 'easy' | 'medium' | 'hard';
  minLinesRequired: number;
  maxSolveTime: number;
}

export interface ChallengeRequest {
  // Optional fingerprint for analytics
  fingerprint?: string;
}

export interface ChallengeResponse {
  challengeId: string;
  token: string;
  difficulty: 'easy' | 'medium' | 'hard';
  minLinesRequired: number;
  maxSolveTime: number;
  seed: number;
}

// Solution types
export interface GameMove {
  piece: PieceType;
  rotation: number;
  x: number;
  y: number;
  timestamp: number;
}

export type PieceType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';

export interface RedeemRequest {
  challengeId: string;
  token: string;
  moves: GameMove[];
  finalScore: number;
  linesCleared: number;
  solveTime: number; // milliseconds
}

export interface RedeemResponse {
  success: boolean;
  verificationToken?: string;
  error?: string;
}

// Verification types
export interface VerifyRequest {
  secret: string;
  response: string; // verification token
}

export interface VerifyResponse {
  success: boolean;
  challengeId?: string;
  score?: number;
  linesCleared?: number;
  solveTime?: number;
  error?: string;
}

// Analytics types
export interface AnalyticsEvent {
  id: string;
  siteId: string;
  eventType: AnalyticsEventType;
  solveTimeMs: number | null;
  success: boolean;
  metadata: Record<string, unknown>;
  createdAt: Date;
}

export type AnalyticsEventType =
  | 'challenge_created'
  | 'challenge_started'
  | 'challenge_completed'
  | 'challenge_failed'
  | 'challenge_expired'
  | 'verification_success'
  | 'verification_failed';

export interface AnalyticsOverview {
  totalChallenges: number;
  successRate: number;
  avgSolveTime: number;
  challengesByDay: { date: string; count: number }[];
  successByDay: { date: string; success: number; failed: number }[];
}

export interface RealtimeEvent {
  type: AnalyticsEventType;
  siteId: string;
  timestamp: Date;
  data?: Record<string, unknown>;
}

// Widget configuration
export interface WidgetConfig {
  siteKey: string;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact';
  callback?: string;
  errorCallback?: string;
  expiredCallback?: string;
}

// Error types
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// Default settings
export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  difficulty: 'medium',
  minLinesRequired: 2,
  maxSolveTime: 120,
  theme: 'auto',
};

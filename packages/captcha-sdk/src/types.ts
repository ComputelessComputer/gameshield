import { GameType, Difficulty } from '../../game-core';

/**
 * Token payload structure for verification tokens
 */
export interface TokenPayload {
  sessionId: string;
  timestamp: number;
  gameType: GameType;
  difficulty: Difficulty;
  score: number;
  success: boolean;
  behaviorScore: number;
}

/**
 * Game result after completion
 */
export interface GameResult {
  success: boolean;
  score: number;
  time: number;
  metrics?: {
    mouseMovements?: number;
    keyPresses?: number;
    interactionPattern?: string;
  };
}

/**
 * Behavior analysis result
 */
export interface BehaviorAnalysisResult {
  score: number;
  level: 'low' | 'medium' | 'high';
  factors: string[];
}

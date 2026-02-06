import type { GameMove } from '../game/engine.js';

export interface ChallengeResponse {
  challengeId: string;
  token: string;
  difficulty: 'easy' | 'medium' | 'hard';
  minLinesRequired: number;
  maxSolveTime: number;
  seed: number;
}

export interface RedeemResponse {
  success: boolean;
  verificationToken?: string;
  error?: string;
}

export class GameShieldClient {
  private baseUrl: string;
  private siteKey: string;

  constructor(siteKey: string, baseUrl: string = 'http://localhost:3001') {
    this.siteKey = siteKey;
    this.baseUrl = baseUrl;
  }

  async getChallenge(fingerprint?: string): Promise<ChallengeResponse> {
    const response = await fetch(`${this.baseUrl}/api/v1/${this.siteKey}/challenge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fingerprint }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to get challenge');
    }

    return response.json();
  }

  async redeemChallenge(
    challengeId: string,
    token: string,
    moves: GameMove[],
    finalScore: number,
    linesCleared: number,
    solveTime: number
  ): Promise<RedeemResponse> {
    const response = await fetch(`${this.baseUrl}/api/v1/${this.siteKey}/redeem`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        challengeId,
        token,
        moves,
        finalScore,
        linesCleared,
        solveTime,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.error || 'Failed to redeem challenge' };
    }

    return response.json();
  }
}

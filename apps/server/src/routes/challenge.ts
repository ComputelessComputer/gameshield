import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { db, sites, challenges, verificationTokens } from '../db/index.js';
import { generateId, generateToken, hashToken, generateSeed } from '../services/crypto.js';
import { verifyGameplay } from '../services/tetris-verifier.js';
import { recordEvent } from '../services/analytics.js';
import { eq, and } from 'drizzle-orm';
import type { ChallengeResponse, RedeemResponse, GameMove } from '@gameshield/shared';

const app = new Hono();

// Create a new challenge
app.post(
  '/:siteKey/challenge',
  zValidator(
    'json',
    z.object({
      fingerprint: z.string().optional(),
    }).optional()
  ),
  async (c) => {
    const siteKey = c.req.param('siteKey');
    const body = c.req.valid('json') || {};

    // Find the site
    const site = await db.query.sites.findFirst({
      where: eq(sites.siteKey, siteKey),
    });

    if (!site) {
      return c.json({ error: 'Site not found' }, 404);
    }

    // Generate challenge
    const challengeId = generateId();
    const token = generateToken();
    const seed = generateSeed();
    const expiresAt = new Date(Date.now() + site.settings.maxSolveTime * 1000 + 60000); // Extra minute buffer

    await db.insert(challenges).values({
      id: challengeId,
      siteId: site.id,
      challengeData: {
        seed,
        difficulty: site.settings.difficulty,
        minLinesRequired: site.settings.minLinesRequired,
        maxSolveTime: site.settings.maxSolveTime,
      },
      tokenHash: hashToken(token),
      status: 'pending',
      expiresAt,
      createdAt: new Date(),
    });

    await recordEvent(site.id, 'challenge_created', true, undefined, {
      fingerprint: body.fingerprint,
    });

    const response: ChallengeResponse = {
      challengeId,
      token,
      difficulty: site.settings.difficulty,
      minLinesRequired: site.settings.minLinesRequired,
      maxSolveTime: site.settings.maxSolveTime,
      seed,
    };

    return c.json(response);
  }
);

// Redeem challenge (submit solution)
app.post(
  '/:siteKey/redeem',
  zValidator(
    'json',
    z.object({
      challengeId: z.string(),
      token: z.string(),
      moves: z.array(
        z.object({
          piece: z.enum(['I', 'O', 'T', 'S', 'Z', 'J', 'L']),
          rotation: z.number().min(0).max(3),
          x: z.number(),
          y: z.number(),
          timestamp: z.number(),
        })
      ),
      finalScore: z.number(),
      linesCleared: z.number(),
      solveTime: z.number(),
    })
  ),
  async (c) => {
    const siteKey = c.req.param('siteKey');
    const body = c.req.valid('json');

    // Find the site
    const site = await db.query.sites.findFirst({
      where: eq(sites.siteKey, siteKey),
    });

    if (!site) {
      return c.json({ success: false, error: 'Site not found' } as RedeemResponse, 404);
    }

    // Find the challenge
    const challenge = await db.query.challenges.findFirst({
      where: and(
        eq(challenges.id, body.challengeId),
        eq(challenges.siteId, site.id)
      ),
    });

    if (!challenge) {
      return c.json({ success: false, error: 'Challenge not found' } as RedeemResponse, 404);
    }

    // Verify token
    if (hashToken(body.token) !== challenge.tokenHash) {
      await recordEvent(site.id, 'challenge_failed', false, body.solveTime, {
        reason: 'invalid_token',
      });
      return c.json({ success: false, error: 'Invalid token' } as RedeemResponse, 400);
    }

    // Check if challenge is still valid
    if (challenge.status !== 'pending') {
      await recordEvent(site.id, 'challenge_failed', false, body.solveTime, {
        reason: 'challenge_already_used',
      });
      return c.json({ success: false, error: 'Challenge already used' } as RedeemResponse, 400);
    }

    if (new Date() > challenge.expiresAt) {
      await db
        .update(challenges)
        .set({ status: 'expired' })
        .where(eq(challenges.id, challenge.id));
      await recordEvent(site.id, 'challenge_expired', false, body.solveTime);
      return c.json({ success: false, error: 'Challenge expired' } as RedeemResponse, 400);
    }

    // Check solve time
    if (body.solveTime > challenge.challengeData.maxSolveTime * 1000) {
      await recordEvent(site.id, 'challenge_failed', false, body.solveTime, {
        reason: 'solve_time_exceeded',
      });
      return c.json({ success: false, error: 'Solve time exceeded' } as RedeemResponse, 400);
    }

    // Verify gameplay
    const verification = verifyGameplay(
      challenge.challengeData.seed,
      body.moves as GameMove[],
      body.linesCleared,
      body.finalScore
    );

    if (!verification.valid) {
      await recordEvent(site.id, 'challenge_failed', false, body.solveTime, {
        reason: 'invalid_gameplay',
        error: verification.error,
      });
      return c.json({ success: false, error: verification.error } as RedeemResponse, 400);
    }

    // Check minimum lines requirement
    if (verification.linesCleared < challenge.challengeData.minLinesRequired) {
      await recordEvent(site.id, 'challenge_failed', false, body.solveTime, {
        reason: 'insufficient_lines',
        linesCleared: verification.linesCleared,
        required: challenge.challengeData.minLinesRequired,
      });
      return c.json({
        success: false,
        error: `Need to clear at least ${challenge.challengeData.minLinesRequired} lines`,
      } as RedeemResponse, 400);
    }

    // Mark challenge as completed
    await db
      .update(challenges)
      .set({ status: 'completed' })
      .where(eq(challenges.id, challenge.id));

    // Generate verification token
    const verificationToken = generateToken();
    const tokenExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await db.insert(verificationTokens).values({
      id: generateId(),
      siteId: site.id,
      challengeId: challenge.id,
      tokenHash: hashToken(verificationToken),
      status: 'valid',
      score: verification.score,
      linesCleared: verification.linesCleared,
      solveTimeMs: body.solveTime,
      expiresAt: tokenExpiresAt,
      createdAt: new Date(),
    });

    await recordEvent(site.id, 'challenge_completed', true, body.solveTime, {
      linesCleared: verification.linesCleared,
      score: verification.score,
    });

    return c.json({
      success: true,
      verificationToken,
    } as RedeemResponse);
  }
);

export default app;

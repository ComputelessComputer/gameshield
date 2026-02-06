import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { db, sites, apiKeys, verificationTokens } from '../db/index.js';
import { hashToken } from '../services/crypto.js';
import { recordEvent } from '../services/analytics.js';
import { eq, and, isNull } from 'drizzle-orm';
import type { VerifyResponse } from '@gameshield/shared';

const app = new Hono();

// Server-to-server verification (compatible with reCAPTCHA/hCaptcha siteverify)
app.post(
  '/:siteKey/siteverify',
  zValidator(
    'json',
    z.object({
      secret: z.string(),
      response: z.string(),
    })
  ),
  async (c) => {
    const siteKey = c.req.param('siteKey');
    const { secret, response: token } = c.req.valid('json');

    // Find the site
    const site = await db.query.sites.findFirst({
      where: eq(sites.siteKey, siteKey),
    });

    if (!site) {
      return c.json({ success: false, error: 'Site not found' } as VerifyResponse, 404);
    }

    // Verify the secret key
    const apiKey = await db.query.apiKeys.findFirst({
      where: and(
        eq(apiKeys.siteId, site.id),
        eq(apiKeys.keyHash, hashToken(secret)),
        isNull(apiKeys.revokedAt)
      ),
    });

    if (!apiKey) {
      return c.json({ success: false, error: 'Invalid secret key' } as VerifyResponse, 401);
    }

    // Find the verification token
    const tokenHash = hashToken(token);
    const verificationToken = await db.query.verificationTokens.findFirst({
      where: and(
        eq(verificationTokens.siteId, site.id),
        eq(verificationTokens.tokenHash, tokenHash)
      ),
    });

    if (!verificationToken) {
      await recordEvent(site.id, 'verification_failed', false, undefined, {
        reason: 'token_not_found',
      });
      return c.json({ success: false, error: 'Token not found' } as VerifyResponse, 404);
    }

    // Check token status
    if (verificationToken.status === 'used') {
      await recordEvent(site.id, 'verification_failed', false, undefined, {
        reason: 'token_already_used',
      });
      return c.json({ success: false, error: 'Token already used' } as VerifyResponse, 400);
    }

    if (verificationToken.status === 'expired' || new Date() > verificationToken.expiresAt) {
      if (verificationToken.status !== 'expired') {
        await db
          .update(verificationTokens)
          .set({ status: 'expired' })
          .where(eq(verificationTokens.id, verificationToken.id));
      }
      await recordEvent(site.id, 'verification_failed', false, undefined, {
        reason: 'token_expired',
      });
      return c.json({ success: false, error: 'Token expired' } as VerifyResponse, 400);
    }

    // Mark token as used
    await db
      .update(verificationTokens)
      .set({ status: 'used', usedAt: new Date() })
      .where(eq(verificationTokens.id, verificationToken.id));

    await recordEvent(site.id, 'verification_success', true, verificationToken.solveTimeMs);

    return c.json({
      success: true,
      challengeId: verificationToken.challengeId,
      score: verificationToken.score,
      linesCleared: verificationToken.linesCleared,
      solveTime: verificationToken.solveTimeMs,
    } as VerifyResponse);
  }
);

export default app;

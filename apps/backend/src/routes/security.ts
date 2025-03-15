import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { SecurityUtils } from '../../../../packages/security-utils';

// Create a security router
export const securityRouter = new Hono();

// Initialize security utils
const securityUtils = new SecurityUtils({
  jwtSecret: process.env.JWT_SECRET || 'gameshield-default-jwt-secret-change-in-production',
  encryptionKey: process.env.ENCRYPTION_KEY || 'gameshield-default-encryption-key-change-in-production',
  tokenExpiration: parseInt(process.env.TOKEN_EXPIRATION || '300')
});

// Define validation schema for verify request
const verifySchema = z.object({
  token: z.string().min(1)
});

// Verify CAPTCHA token endpoint
securityRouter.post('/verify', zValidator('json', verifySchema), async (c) => {
  try {
    const { token } = c.req.valid('json');
    
    // Verify the token
    const result = securityUtils.verifyCaptcha(token);
    
    // Log verification attempt
    console.log(`Verification attempt: ${result.valid ? 'Valid' : 'Invalid'}, Human: ${result.isHuman}, Confidence: ${result.confidence}`);
    
    // Return the verification result
    return c.json({
      valid: result.valid && result.isHuman,
      isHuman: result.isHuman,
      confidence: result.confidence,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error verifying token:', error);
    
    return c.json({
      valid: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: Date.now()
    }, 400);
  }
});

// Generate a new session ID endpoint
securityRouter.get('/session', (c) => {
  const sessionId = securityUtils.generateSessionId();
  
  return c.json({
    sessionId,
    timestamp: Date.now()
  });
});

// Endpoint to check API status
securityRouter.get('/status', (c) => {
  return c.json({
    status: 'ok',
    service: 'GameShield Security API',
    version: '0.1.0',
    timestamp: Date.now()
  });
});

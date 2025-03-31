import { VerificationResult, VerificationOptions } from './types';
import { TokenValidator } from './token-validator';

/**
 * Verifies a GameShield token
 * @param token Token string to verify
 * @param options Verification options
 * @returns Verification result
 */
export async function verifyToken(
  token: string,
  options: VerificationOptions = {}
): Promise<VerificationResult> {
  // Create token validator
  const validator = new TokenValidator(options);
  
  // Validate the token
  return validator.validate(token);
}

import { createHash, randomBytes } from 'crypto';

export function generateToken(): string {
  return randomBytes(32).toString('base64url');
}

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export function generateSiteKey(): string {
  return `gs_pk_${randomBytes(16).toString('hex')}`;
}

export function generateSecretKey(): string {
  return `gs_sk_${randomBytes(24).toString('hex')}`;
}

export function generateId(): string {
  return randomBytes(12).toString('hex');
}

export function generateSeed(): number {
  return Math.floor(Math.random() * 2147483647);
}

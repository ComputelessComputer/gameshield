import { sqliteTable, text, integer, blob } from 'drizzle-orm/sqlite-core';

export const sites = sqliteTable('sites', {
  id: text('id').primaryKey(),
  siteKey: text('site_key').notNull().unique(),
  name: text('name').notNull(),
  domains: text('domains', { mode: 'json' }).$type<string[]>().notNull(),
  settings: text('settings', { mode: 'json' }).$type<{
    difficulty: 'easy' | 'medium' | 'hard';
    minLinesRequired: number;
    maxSolveTime: number;
    theme: 'light' | 'dark' | 'auto';
  }>().notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const apiKeys = sqliteTable('api_keys', {
  id: text('id').primaryKey(),
  siteId: text('site_id').notNull().references(() => sites.id, { onDelete: 'cascade' }),
  keyHash: text('key_hash').notNull(),
  keyPrefix: text('key_prefix').notNull(),
  name: text('name').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  revokedAt: integer('revoked_at', { mode: 'timestamp' }),
});

export const challenges = sqliteTable('challenges', {
  id: text('id').primaryKey(),
  siteId: text('site_id').notNull().references(() => sites.id, { onDelete: 'cascade' }),
  challengeData: text('challenge_data', { mode: 'json' }).$type<{
    seed: number;
    difficulty: 'easy' | 'medium' | 'hard';
    minLinesRequired: number;
    maxSolveTime: number;
  }>().notNull(),
  tokenHash: text('token_hash').notNull(),
  status: text('status').$type<'pending' | 'completed' | 'expired'>().notNull().default('pending'),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const verificationTokens = sqliteTable('verification_tokens', {
  id: text('id').primaryKey(),
  siteId: text('site_id').notNull().references(() => sites.id, { onDelete: 'cascade' }),
  challengeId: text('challenge_id').notNull().references(() => challenges.id, { onDelete: 'cascade' }),
  tokenHash: text('token_hash').notNull().unique(),
  status: text('status').$type<'valid' | 'used' | 'expired'>().notNull().default('valid'),
  score: integer('score').notNull(),
  linesCleared: integer('lines_cleared').notNull(),
  solveTimeMs: integer('solve_time_ms').notNull(),
  usedAt: integer('used_at', { mode: 'timestamp' }),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const analyticsEvents = sqliteTable('analytics_events', {
  id: text('id').primaryKey(),
  siteId: text('site_id').notNull().references(() => sites.id, { onDelete: 'cascade' }),
  eventType: text('event_type').$type<
    | 'challenge_created'
    | 'challenge_started'
    | 'challenge_completed'
    | 'challenge_failed'
    | 'challenge_expired'
    | 'verification_success'
    | 'verification_failed'
  >().notNull(),
  solveTimeMs: integer('solve_time_ms'),
  success: integer('success', { mode: 'boolean' }).notNull(),
  metadata: text('metadata', { mode: 'json' }).$type<Record<string, unknown>>(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

// Type exports
export type Site = typeof sites.$inferSelect;
export type NewSite = typeof sites.$inferInsert;
export type ApiKey = typeof apiKeys.$inferSelect;
export type NewApiKey = typeof apiKeys.$inferInsert;
export type Challenge = typeof challenges.$inferSelect;
export type NewChallenge = typeof challenges.$inferInsert;
export type VerificationToken = typeof verificationTokens.$inferSelect;
export type NewVerificationToken = typeof verificationTokens.$inferInsert;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
export type NewAnalyticsEvent = typeof analyticsEvents.$inferInsert;

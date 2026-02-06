import { db, analyticsEvents } from '../db/index.js';
import { generateId } from './crypto.js';
import type { AnalyticsEventType } from '@gameshield/shared';
import { eq, sql, and, gte, lte } from 'drizzle-orm';

export async function recordEvent(
  siteId: string,
  eventType: AnalyticsEventType,
  success: boolean,
  solveTimeMs?: number,
  metadata?: Record<string, unknown>
): Promise<void> {
  await db.insert(analyticsEvents).values({
    id: generateId(),
    siteId,
    eventType,
    success,
    solveTimeMs: solveTimeMs ?? null,
    metadata: metadata ?? null,
    createdAt: new Date(),
  });
}

export async function getOverview(siteId: string, days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const events = await db
    .select()
    .from(analyticsEvents)
    .where(
      and(
        eq(analyticsEvents.siteId, siteId),
        gte(analyticsEvents.createdAt, startDate)
      )
    );

  const totalChallenges = events.filter(
    (e) => e.eventType === 'challenge_created'
  ).length;

  const completedChallenges = events.filter(
    (e) => e.eventType === 'challenge_completed'
  );

  const successRate =
    totalChallenges > 0 ? completedChallenges.length / totalChallenges : 0;

  const solveTimes = completedChallenges
    .map((e) => e.solveTimeMs)
    .filter((t): t is number => t !== null);

  const avgSolveTime =
    solveTimes.length > 0
      ? solveTimes.reduce((a, b) => a + b, 0) / solveTimes.length
      : 0;

  // Group by day
  const challengesByDay = new Map<string, number>();
  const successByDay = new Map<string, { success: number; failed: number }>();

  events.forEach((event) => {
    const date = event.createdAt.toISOString().split('T')[0];

    if (event.eventType === 'challenge_created') {
      challengesByDay.set(date, (challengesByDay.get(date) || 0) + 1);
    }

    if (
      event.eventType === 'challenge_completed' ||
      event.eventType === 'challenge_failed'
    ) {
      const current = successByDay.get(date) || { success: 0, failed: 0 };
      if (event.eventType === 'challenge_completed') {
        current.success++;
      } else {
        current.failed++;
      }
      successByDay.set(date, current);
    }
  });

  return {
    totalChallenges,
    successRate,
    avgSolveTime,
    challengesByDay: Array.from(challengesByDay.entries()).map(([date, count]) => ({
      date,
      count,
    })),
    successByDay: Array.from(successByDay.entries()).map(([date, data]) => ({
      date,
      ...data,
    })),
  };
}

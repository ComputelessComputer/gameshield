import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { db, sites } from '../db/index.js';
import { getOverview } from '../services/analytics.js';
import { eq } from 'drizzle-orm';

const app = new Hono();

// Get analytics overview for a site
app.get(
  '/:siteId/overview',
  zValidator(
    'query',
    z.object({
      days: z.string().transform(Number).default('30'),
    })
  ),
  async (c) => {
    const siteId = c.req.param('siteId');
    const { days } = c.req.valid('query');

    const site = await db.query.sites.findFirst({
      where: eq(sites.id, siteId),
    });

    if (!site) {
      return c.json({ error: 'Site not found' }, 404);
    }

    const overview = await getOverview(siteId, days);
    return c.json(overview);
  }
);

export default app;

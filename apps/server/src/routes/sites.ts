import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { db, sites, apiKeys } from '../db/index.js';
import {
  generateId,
  generateSiteKey,
  generateSecretKey,
  hashToken,
} from '../services/crypto.js';
import { eq, isNull } from 'drizzle-orm';
import { DEFAULT_SITE_SETTINGS } from '@gameshield/shared';
import type { CreateApiKeyResponse } from '@gameshield/shared';

const app = new Hono();

// List all sites
app.get('/', async (c) => {
  const allSites = await db.select().from(sites);
  return c.json(
    allSites.map((site) => ({
      id: site.id,
      siteKey: site.siteKey,
      name: site.name,
      domains: site.domains,
      settings: site.settings,
      createdAt: site.createdAt,
      updatedAt: site.updatedAt,
    }))
  );
});

// Get a site by ID
app.get('/:id', async (c) => {
  const id = c.req.param('id');
  const site = await db.query.sites.findFirst({
    where: eq(sites.id, id),
  });

  if (!site) {
    return c.json({ error: 'Site not found' }, 404);
  }

  return c.json({
    id: site.id,
    siteKey: site.siteKey,
    name: site.name,
    domains: site.domains,
    settings: site.settings,
    createdAt: site.createdAt,
    updatedAt: site.updatedAt,
  });
});

// Create a new site
app.post(
  '/',
  zValidator(
    'json',
    z.object({
      name: z.string().min(1).max(100),
      domains: z.array(z.string()).min(1),
      settings: z
        .object({
          difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
          minLinesRequired: z.number().min(1).max(10).optional(),
          maxSolveTime: z.number().min(30).max(300).optional(),
          theme: z.enum(['light', 'dark', 'auto']).optional(),
        })
        .optional(),
    })
  ),
  async (c) => {
    const body = c.req.valid('json');
    const id = generateId();
    const siteKey = generateSiteKey();
    const now = new Date();

    const settings = {
      ...DEFAULT_SITE_SETTINGS,
      ...body.settings,
    };

    await db.insert(sites).values({
      id,
      siteKey,
      name: body.name,
      domains: body.domains,
      settings,
      createdAt: now,
      updatedAt: now,
    });

    return c.json(
      {
        id,
        siteKey,
        name: body.name,
        domains: body.domains,
        settings,
        createdAt: now,
        updatedAt: now,
      },
      201
    );
  }
);

// Update a site
app.patch(
  '/:id',
  zValidator(
    'json',
    z.object({
      name: z.string().min(1).max(100).optional(),
      domains: z.array(z.string()).min(1).optional(),
      settings: z
        .object({
          difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
          minLinesRequired: z.number().min(1).max(10).optional(),
          maxSolveTime: z.number().min(30).max(300).optional(),
          theme: z.enum(['light', 'dark', 'auto']).optional(),
        })
        .optional(),
    })
  ),
  async (c) => {
    const id = c.req.param('id');
    const body = c.req.valid('json');

    const site = await db.query.sites.findFirst({
      where: eq(sites.id, id),
    });

    if (!site) {
      return c.json({ error: 'Site not found' }, 404);
    }

    const updates: Partial<typeof site> = {
      updatedAt: new Date(),
    };

    if (body.name) updates.name = body.name;
    if (body.domains) updates.domains = body.domains;
    if (body.settings) {
      updates.settings = {
        ...site.settings,
        ...body.settings,
      };
    }

    await db.update(sites).set(updates).where(eq(sites.id, id));

    const updatedSite = await db.query.sites.findFirst({
      where: eq(sites.id, id),
    });

    return c.json(updatedSite);
  }
);

// Delete a site
app.delete('/:id', async (c) => {
  const id = c.req.param('id');

  const site = await db.query.sites.findFirst({
    where: eq(sites.id, id),
  });

  if (!site) {
    return c.json({ error: 'Site not found' }, 404);
  }

  await db.delete(sites).where(eq(sites.id, id));

  return c.json({ success: true });
});

// List API keys for a site
app.get('/:id/keys', async (c) => {
  const siteId = c.req.param('id');

  const keys = await db.query.apiKeys.findMany({
    where: eq(apiKeys.siteId, siteId),
  });

  return c.json(
    keys.map((key) => ({
      id: key.id,
      keyPrefix: key.keyPrefix,
      name: key.name,
      createdAt: key.createdAt,
      revokedAt: key.revokedAt,
    }))
  );
});

// Create API key for a site
app.post(
  '/:id/keys',
  zValidator(
    'json',
    z.object({
      name: z.string().min(1).max(100),
    })
  ),
  async (c) => {
    const siteId = c.req.param('id');
    const body = c.req.valid('json');

    const site = await db.query.sites.findFirst({
      where: eq(sites.id, siteId),
    });

    if (!site) {
      return c.json({ error: 'Site not found' }, 404);
    }

    const id = generateId();
    const secretKey = generateSecretKey();
    const keyPrefix = secretKey.substring(0, 12);

    await db.insert(apiKeys).values({
      id,
      siteId,
      keyHash: hashToken(secretKey),
      keyPrefix,
      name: body.name,
      createdAt: new Date(),
    });

    const response: CreateApiKeyResponse = {
      id,
      secretKey, // Only returned once!
      keyPrefix,
      name: body.name,
    };

    return c.json(response, 201);
  }
);

// Revoke API key
app.delete('/:siteId/keys/:keyId', async (c) => {
  const { siteId, keyId } = c.req.param();

  const key = await db.query.apiKeys.findFirst({
    where: eq(apiKeys.id, keyId),
  });

  if (!key || key.siteId !== siteId) {
    return c.json({ error: 'API key not found' }, 404);
  }

  await db
    .update(apiKeys)
    .set({ revokedAt: new Date() })
    .where(eq(apiKeys.id, keyId));

  return c.json({ success: true });
});

export default app;

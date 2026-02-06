import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { corsMiddleware } from './middleware/cors.js';
import challengeRoutes from './routes/challenge.js';
import verifyRoutes from './routes/verify.js';
import sitesRoutes from './routes/sites.js';
import analyticsRoutes from './routes/analytics.js';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', corsMiddleware);

// Health check
app.get('/health', (c) => c.json({ status: 'ok', timestamp: new Date().toISOString() }));

// API routes
const api = new Hono();

// Public widget endpoints
api.route('/', challengeRoutes);
api.route('/', verifyRoutes);

// Admin endpoints
api.route('/admin/sites', sitesRoutes);
api.route('/admin/analytics', analyticsRoutes);

app.route('/api/v1', api);

// 404 handler
app.notFound((c) => c.json({ error: 'Not found' }, 404));

// Error handler
app.onError((err, c) => {
  console.error('Server error:', err);
  return c.json({ error: 'Internal server error' }, 500);
});

const port = parseInt(process.env.PORT || '3001', 10);

console.log(`Starting GameShield server on port ${port}...`);

serve({
  fetch: app.fetch,
  port,
});

console.log(`Server running at http://localhost:${port}`);

export default app;
export type AppType = typeof app;

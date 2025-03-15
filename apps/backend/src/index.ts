import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { securityRouter } from './routes/security';
import { cors } from 'hono/cors';

// Create the main Hono app
const app = new Hono();

// Add middleware
app.use('*', logger());
app.use('*', cors({
  origin: '*', // In production, you should restrict this to your domains
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
}));

// Add routes
app.route('/api', securityRouter);

// Health check endpoint
app.get('/', (c) => {
  return c.json({
    status: 'ok',
    service: 'GameShield API',
    version: '0.1.0'
  });
});

// Error handling
app.onError((err, c) => {
  console.error(`Error: ${err.message}`);
  return c.json({
    error: {
      message: err.message,
      status: c.res.status || 500
    }
  }, 500);
});

// Start the server
const port = parseInt(process.env.PORT || '3000');
console.log(`Server is running on port ${port}`);

export default {
  port,
  fetch: app.fetch
};

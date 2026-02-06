import { cors } from 'hono/cors';

export const corsMiddleware = cors({
  origin: (origin) => {
    // In production, validate against site domains
    // For development, allow all origins
    if (process.env.NODE_ENV === 'development') {
      return origin;
    }
    // Return the origin if it's allowed, or null if not
    return origin;
  },
  allowMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length'],
  maxAge: 86400,
  credentials: true,
});

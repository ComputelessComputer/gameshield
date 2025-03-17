# API Reference

Welcome to the GameShield API reference. This section provides detailed documentation for all APIs and SDK methods available in GameShield.

## Quick Links

- [SDK Methods](/api/sdk-methods) - Client-side JavaScript SDK documentation
- [Server API](/api/server) - Server-side API endpoints and usage
- [Configuration](/api/configuration) - Complete configuration options

## Overview

GameShield provides three main interfaces:

1. **Client-Side SDK**: JavaScript library for CAPTCHA challenges
   - Game generation and management
   - User interaction handling
   - Analytics integration
   - UI customization

2. **Server-Side API**: RESTful endpoints for:
   - Token verification
   - Analytics data access
   - Admin operations
   - System health monitoring

3. **Analytics System**: Comprehensive monitoring with:
   - Built-in localStorage provider
   - Custom provider support
   - Real-time metrics
   - Risk scoring

## Getting Started

### 1. Install the SDK

```bash
npm install @gameshield/captcha-sdk
# or
yarn add @gameshield/captcha-sdk
# or
pnpm add @gameshield/captcha-sdk
```

### 2. Basic Implementation

```typescript
import { CaptchaSDK } from '@gameshield/captcha-sdk';

const captcha = new CaptchaSDK({
  container: document.getElementById('captcha-container'),
  theme: 'light',
  gameType: 'pong',
  difficulty: 'medium',
  onSuccess: (token) => {
    // Send token to your server
  },
  onFailure: (error) => {
    console.error('Verification failed:', error);
  }
});
```

### 3. Server-Side Verification

```typescript
import { verifyToken } from '@gameshield/captcha-sdk/server';

async function validateCaptcha(token: string) {
  try {
    const result = await verifyToken(token);
    return result.valid;
  } catch (error) {
    console.error('Verification error:', error);
    return false;
  }
}
```

## Next Steps

1. Explore [SDK Methods](/api/sdk-methods) for detailed client-side options
2. Review [Server API](/api/server) for backend integration
3. Configure your implementation using the [Configuration Guide](/api/configuration)
4. Set up analytics with the [Analytics System Guide](/guide/analytics-system)
5. Access monitoring through the [Admin Dashboard](/guide/admin-dashboard)

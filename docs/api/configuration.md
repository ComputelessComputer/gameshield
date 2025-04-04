# Configuration Reference

This document covers all configuration options available in GameShield.

## Client Configuration

### CaptchaOptions

```typescript
interface CaptchaOptions {
  // Required options
  container: HTMLElement;
  theme: 'light' | 'dark';
  gameType: GameType;
  difficulty: 'easy' | 'medium' | 'hard';
  onSuccess: (token: string) => void;
  onFailure: (error: Error) => void;

  // Optional settings
  analyticsProvider?: AnalyticsProvider;
  customStyles?: CaptchaStyles;
  timeout?: number;
  autoReset?: boolean;
  locale?: string;
}
```

### Analytics Configuration

```typescript
interface AnalyticsConfig {
  provider: 'localStorage' | 'custom';
  endpoint?: string;
  apiKey?: string;
  batchSize?: number;
  flushInterval?: number;
  retryAttempts?: number;
}
```

### Game-Specific Settings

```typescript
interface GameSettings {
  snake: {
    gridSize: number;
    speed: number;
    targetLength: number;
  };
  breakout: {
    brickRows: number;
    brickColumns: number;
    clearanceRequired: number;
  };
  // ... other game configurations
}
```

## Server Configuration

### Environment Variables

```bash
# Core Settings
GAMESHIELD_SECRET_KEY=your_secret_key
GAMESHIELD_ENV=production|development
GAMESHIELD_PORT=3000

# Security
GAMESHIELD_TOKEN_EXPIRY=3600
GAMESHIELD_MAX_ATTEMPTS=5
GAMESHIELD_RATE_LIMIT=100

# Analytics
GAMESHIELD_ANALYTICS_PROVIDER=localStorage|custom
GAMESHIELD_ANALYTICS_ENDPOINT=https://your-analytics-server.com
GAMESHIELD_ANALYTICS_API_KEY=your_api_key

# Admin Dashboard
GAMESHIELD_ADMIN_ENABLED=true
GAMESHIELD_ADMIN_PORT=3001
GAMESHIELD_ADMIN_SECRET=admin_secret_key
```

### Admin Dashboard Configuration

```typescript
interface AdminConfig {
  enabled: boolean;
  port: number;
  secretKey: string;
  corsOrigins: string[];
  sessionTimeout: number;
  metrics: {
    retentionDays: number;
    aggregationInterval: string;
  };
  alerts: {
    enabled: boolean;
    thresholds: {
      failureRate: number;
      maliciousActivity: number;
      highRiskScore: number;
    };
    notifications: {
      email?: string[];
      webhook?: string;
      slack?: string;
    };
  };
}
```

## Custom Provider Implementation

### Analytics Provider

```typescript
class CustomAnalyticsProvider implements AnalyticsProvider {
  constructor(config: AnalyticsConfig) {
    // Initialize with custom configuration
  }

  async initialize(): Promise<void> {
    // Setup provider
  }

  async trackEvent(eventName: string, data: any): Promise<void> {
    // Implement event tracking
  }

  async getMetrics(): Promise<AnalyticsMetrics> {
    // Return analytics metrics
  }
}
```

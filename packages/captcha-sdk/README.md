# GameShield Captcha SDK

A JavaScript/TypeScript SDK for integrating GameShield CAPTCHA verification into web applications.

## Features

- Interactive game-based CAPTCHA verification
- Multiple game types (puzzle, maze, pattern)
- Adjustable difficulty levels
- Analytics for tracking verification attempts and detecting malicious behavior
- Customizable UI and behavior

## Installation

```bash
npm install captcha-sdk
# or
yarn add captcha-sdk
# or
pnpm add captcha-sdk
```

## Basic Usage

```javascript
import { createCaptcha } from 'captcha-sdk';

// Create a captcha instance
const captcha = createCaptcha({
  container: document.getElementById('captcha-container'),
  gameType: 'puzzle',
  difficulty: 'medium',
  onSuccess: (token) => {
    console.log('Verification successful!', token);
    // Send token to your server for verification
  },
  onFailure: () => {
    console.log('Verification failed!');
  }
});

// Start the captcha
captcha.start();
```

## Analytics

The SDK includes a flexible analytics system that can be used to track verification attempts and detect malicious behavior.

```javascript
import { createCaptcha, LocalStorageAnalyticsProvider } from 'captcha-sdk';

// Create a captcha instance with analytics
const captcha = createCaptcha({
  container: document.getElementById('captcha-container'),
  gameType: 'puzzle',
  difficulty: 'medium',
  analyticsProvider: new LocalStorageAnalyticsProvider(),
  enableAnalytics: true,
  onSuccess: (token) => {
    console.log('Verification successful!', token);
  }
});

// Get analytics data
const analytics = captcha.getAnalytics();
const stats = await analytics.getStats();
console.log('Verification stats:', stats);
```

## Custom Analytics Providers

You can create custom analytics providers by implementing the `GameShieldAnalyticsProvider` interface:

```typescript
import { GameShieldAnalyticsProvider, VerificationData, MaliciousActivityData } from 'captcha-sdk';

class MyCustomAnalyticsProvider implements GameShieldAnalyticsProvider {
  async recordVerificationAttempt(data: VerificationData): Promise<void> {
    // Implement your custom logic
  }
  
  async recordMaliciousActivity(data: MaliciousActivityData): Promise<void> {
    // Implement your custom logic
  }
  
  async getStats(filters?: StatsFilters): Promise<GameShieldStats> {
    // Implement your custom logic
  }
  
  async getVerificationData(filters?: DataFilters): Promise<VerificationData[]> {
    // Implement your custom logic
  }
  
  async getMaliciousActivityData(filters?: DataFilters): Promise<MaliciousActivityData[]> {
    // Implement your custom logic
  }
}
```

## License

ISC

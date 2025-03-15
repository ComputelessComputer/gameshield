# Admin Dashboard

The GameShield Admin Dashboard provides a comprehensive view of your CAPTCHA verification statistics and security metrics. It helps you monitor user interactions, detect malicious activity, and optimize your verification process.

## Overview

The admin dashboard is accessible at the `/admin` route of your application and provides:

- Key performance metrics for CAPTCHA verifications
- Visualization of verification trends over time
- Distribution of game types and difficulty levels
- Detailed logs of malicious activity

![Admin Dashboard](/images/admin-dashboard.png)

## Key Features

### Real-time Analytics

The dashboard displays real-time analytics for your GameShield CAPTCHA implementation, including:

- **Total Verifications**: The total number of CAPTCHA verification attempts
- **Success Rate**: The percentage of successful verifications
- **Average Completion Time**: The average time users take to complete the CAPTCHA
- **Malicious Attempts**: The number of detected suspicious or malicious verification attempts

### Verification Trends

Track verification patterns over time with interactive charts that show:

- Daily/weekly/monthly verification volumes
- Success rates over time
- Malicious activity trends

### Game Type Distribution

Understand which game types are most effective with distribution charts showing:

- Verification attempts by game type (puzzle, maze, pattern, etc.)
- Success rates by game type
- Completion times by game type

### Malicious Activity Monitoring

The dashboard includes a detailed log of suspicious activities:

- High-risk verification attempts
- Automated bot detection events
- Unusual behavior patterns
- Risk scores and specific flags for each incident

## Configuration

### Analytics Provider

The admin dashboard can be configured to use different analytics providers:

```javascript
import { createCaptcha, LocalStorageAnalyticsProvider } from 'captcha-sdk';

// Use the built-in localStorage provider (for demos)
const captcha = createCaptcha({
  // other options...
  analyticsProvider: new LocalStorageAnalyticsProvider(),
  enableAnalytics: true
});

// Or implement your own provider
const captcha = createCaptcha({
  // other options...
  analyticsProvider: new MyCustomAnalyticsProvider(),
  enableAnalytics: true
});
```

### Data Retention and Privacy

By default, the analytics system anonymizes user data and only stores essential information for security and performance analysis. You can configure:

- Data retention periods
- Level of detail in logs
- IP anonymization options

## Custom Analytics Providers

GameShield follows a provider pattern for analytics, allowing you to:

1. Use the included `LocalStorageProvider` for demos and testing
2. Implement your own analytics provider for self-hosting
3. Connect to a premium cloud service (coming soon)

### Implementing a Custom Provider

To create your own analytics provider, implement the `GameShieldAnalyticsProvider` interface:

```typescript
import { GameShieldAnalyticsProvider, VerificationData, MaliciousActivityData } from 'captcha-sdk';

class MyDatabaseProvider implements GameShieldAnalyticsProvider {
  async recordVerificationAttempt(data: VerificationData): Promise<void> {
    // Store verification data in your database
  }
  
  async recordMaliciousActivity(data: MaliciousActivityData): Promise<void> {
    // Store malicious activity data in your database
  }
  
  async getStats(filters?: StatsFilters): Promise<GameShieldStats> {
    // Retrieve and calculate statistics from your database
  }
  
  async getVerificationData(filters?: DataFilters): Promise<VerificationData[]> {
    // Retrieve verification data with optional filtering
  }
  
  async getMaliciousActivityData(filters?: DataFilters): Promise<MaliciousActivityData[]> {
    // Retrieve malicious activity data with optional filtering
  }
}
```

## Best Practices

- **Regular Monitoring**: Check your dashboard regularly to identify unusual patterns
- **Adjust Difficulty**: Use the analytics to fine-tune game difficulty based on user success rates
- **Security Alerts**: Set up notifications for spikes in malicious activity
- **Performance Optimization**: Monitor completion times to ensure a smooth user experience

## Next Steps

- [Customize your CAPTCHA settings](/guide/customization)
- [Understand security features](/guide/security-features)
- [Implement server-side verification](/guide/integration-examples#server-side-verification)

# Analytics System

The GameShield Analytics System provides comprehensive tracking and analysis of CAPTCHA verification attempts, user behavior, and security metrics. This guide explains the technical architecture and implementation details of the analytics system.

## Architecture Overview

The GameShield analytics system follows a provider pattern that offers flexibility and extensibility:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────────────┐
│                 │     │                 │     │                         │
│   CaptchaSDK    │────▶│ AnalyticsManager│────▶│ GameShieldAnalytics     │
│                 │     │                 │     │ Provider                │
└─────────────────┘     └─────────────────┘     └─────────────────────────┘
                                                           │
                                                           │
                                                           ▼
                                          ┌─────────────────────────────────┐
                                          │                                 │
                                          │  LocalStorageProvider           │
                                          │  (or custom implementation)     │
                                          │                                 │
                                          └─────────────────────────────────┘
```

## Components

### 1. Analytics Manager

The `AnalyticsManager` acts as a coordinator between the CaptchaSDK and the analytics provider. It:

- Enriches raw data with additional context
- Handles the recording of verification attempts
- Manages the detection and recording of malicious activity
- Provides an interface for retrieving statistics and data

```typescript
// Example usage
const analyticsManager = new AnalyticsManager(analyticsProvider);
await analyticsManager.recordVerificationAttempt(verificationData);
const stats = await analyticsManager.getStats();
```

### 2. Analytics Provider Interface

The `GameShieldAnalyticsProvider` interface defines the contract that all analytics providers must implement:

```typescript
export interface GameShieldAnalyticsProvider {
  // Record a verification attempt
  recordVerificationAttempt(data: VerificationData): Promise<void>;
  
  // Record detected malicious activity
  recordMaliciousActivity(data: MaliciousActivityData): Promise<void>;
  
  // Get aggregated statistics
  getStats(filters?: StatsFilters): Promise<GameShieldStats>;
  
  // Get raw verification data
  getVerificationData(filters?: DataFilters): Promise<VerificationData[]>;
  
  // Get raw malicious activity data
  getMaliciousActivityData(filters?: DataFilters): Promise<MaliciousActivityData[]>;
}
```

### 3. LocalStorage Provider

The `LocalStorageProvider` is a reference implementation that stores analytics data in the browser's localStorage. It's intended for demonstration and testing purposes.

```typescript
// Example usage
const provider = new LocalStorageProvider();
const captcha = createCaptcha({
  container: 'captcha-container',
  analyticsProvider: provider,
  enableAnalytics: true
});
```

## Data Models

### Verification Data

The `VerificationData` interface represents a single CAPTCHA verification attempt:

```typescript
export interface VerificationData {
  sessionId: string;        // Unique session identifier
  timestamp: number;        // Unix timestamp of the attempt
  success: boolean;         // Whether verification was successful
  gameType: string;         // Type of game (puzzle, maze, etc.)
  difficulty: string;       // Difficulty level
  duration: number;         // Time taken to complete (ms)
  attempts: number;         // Number of attempts in this session
  clientInfo: {             // Client information
    userAgent: string;      // Browser user agent
    ip?: string;            // IP address (if available)
    fingerprint?: string;   // Browser fingerprint
    geolocation?: {         // Geolocation data (if available)
      country?: string;
      region?: string;
    };
  };
  behaviorMetrics?: {       // User behavior metrics
    mouseMovements?: number;  // Number of mouse movements
    keyPresses?: number;      // Number of key presses
    interactionPattern?: string; // Pattern of user interaction
    responseTime?: number;    // Response time to challenges
  };
}
```

### Malicious Activity Data

The `MaliciousActivityData` interface extends `VerificationData` with additional fields for security analysis:

```typescript
export interface MaliciousActivityData extends VerificationData {
  riskScore: number;        // Risk score (0-100)
  flags: string[];          // Security flags triggered
  evidence?: any;           // Additional evidence (optional)
}
```

### Aggregated Statistics

The `GameShieldStats` interface represents aggregated statistics for analysis:

```typescript
export interface GameShieldStats {
  totalVerifications: number;  // Total verification attempts
  successRate: number;         // Success rate (0-1)
  averageDuration: number;     // Average completion time (ms)
  maliciousAttempts: number;   // Number of malicious attempts
  gameTypeDistribution: Record<string, number>;  // Distribution by game type
  difficultyDistribution: Record<string, number>; // Distribution by difficulty
  timeSeriesData: {            // Time series data for trends
    timestamp: number;
    verifications: number;
    successRate: number;
    maliciousAttempts: number;
  }[];
  geoDistribution?: Record<string, number>; // Optional geo distribution
}
```

## Malicious Behavior Detection

The analytics system includes built-in detection of potentially malicious behavior:

### Risk Scoring

Each verification attempt is analyzed for suspicious patterns and assigned a risk score:

- **Low Risk (0-30)**: Normal human behavior
- **Medium Risk (31-70)**: Suspicious but not conclusive
- **High Risk (71-100)**: Likely automated or malicious

### Detection Flags

The system can detect various suspicious behaviors:

- **impossible-score**: Unrealistically high scores
- **too-fast**: Completion time too short for human interaction
- **too-few-inputs**: Not enough mouse/keyboard inputs for the challenge
- **pattern-mismatch**: Interaction pattern doesn't match human behavior
- **multiple-failures**: Repeated failures from same session

## Implementation in CaptchaSDK

The CaptchaSDK integrates with the analytics system through the following methods:

```typescript
// Initialize with analytics
const captcha = createCaptcha({
  container: 'captcha-container',
  analyticsProvider: new LocalStorageProvider(),
  enableAnalytics: true
});

// Access analytics
const analytics = captcha.getAnalytics();
const stats = await analytics.getStats();
const verifications = await analytics.getVerificationData();
const maliciousActivity = await analytics.getMaliciousActivityData();
```

## Custom Provider Implementation

To implement a custom analytics provider (e.g., for server-side storage):

1. Create a class that implements the `GameShieldAnalyticsProvider` interface
2. Implement all required methods
3. Pass an instance to the CaptchaSDK

Example with a server-side database:

```typescript
import { GameShieldAnalyticsProvider, VerificationData, MaliciousActivityData } from 'captcha-sdk';

class ServerDatabaseProvider implements GameShieldAnalyticsProvider {
  private apiEndpoint: string;
  
  constructor(apiEndpoint: string) {
    this.apiEndpoint = apiEndpoint;
  }
  
  async recordVerificationAttempt(data: VerificationData): Promise<void> {
    await fetch(`${this.apiEndpoint}/verification`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }
  
  async recordMaliciousActivity(data: MaliciousActivityData): Promise<void> {
    await fetch(`${this.apiEndpoint}/malicious`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }
  
  async getStats(filters?: StatsFilters): Promise<GameShieldStats> {
    const response = await fetch(`${this.apiEndpoint}/stats?${new URLSearchParams(filters as any)}`);
    return await response.json();
  }
  
  async getVerificationData(filters?: DataFilters): Promise<VerificationData[]> {
    const response = await fetch(`${this.apiEndpoint}/verification?${new URLSearchParams(filters as any)}`);
    return await response.json();
  }
  
  async getMaliciousActivityData(filters?: DataFilters): Promise<MaliciousActivityData[]> {
    const response = await fetch(`${this.apiEndpoint}/malicious?${new URLSearchParams(filters as any)}`);
    return await response.json();
  }
}
```

## Privacy and Data Protection

The analytics system is designed with privacy in mind:

- IP addresses are hashed or anonymized by default
- Sensitive user data is never collected
- All data collection complies with GDPR and other privacy regulations
- Data retention policies can be configured

## Performance Considerations

- The analytics system is designed to have minimal impact on CAPTCHA performance
- Data is sent asynchronously to avoid blocking the main thread
- The LocalStorageProvider has built-in limits to prevent excessive storage use
- For high-traffic sites, consider implementing a custom provider with server-side storage

## Next Steps

- [View the Admin Dashboard Guide](/guide/admin-dashboard)
- [Implement Server-Side Verification](/guide/integration-examples#server-side-verification)
- [Customize Security Settings](/guide/security-features)

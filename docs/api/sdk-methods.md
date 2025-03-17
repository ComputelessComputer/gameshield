# SDK Methods

This section provides detailed documentation for all client-side SDK methods available in GameShield.

## CaptchaSDK Class

### Constructor

```typescript
new CaptchaSDK(options: CaptchaOptions)
```

#### Options
- `container`: HTMLElement - The container element where the CAPTCHA will be rendered
- `theme`: 'light' | 'dark' - The visual theme
- `gameType`: GameType - Type of game challenge
- `difficulty`: 'easy' | 'medium' | 'hard'
- `onSuccess`: (token: string) => void
- `onFailure`: (error: Error) => void
- `analyticsProvider?`: AnalyticsProvider - Custom analytics provider implementation

### Core Methods

#### verify()
Manually triggers the verification process.

#### reset()
Resets the current CAPTCHA challenge.

#### isVerified()
Returns whether the current challenge has been completed successfully.

#### getToken()
Returns the verification token if available.

## Analytics Integration

### AnalyticsManager

```typescript
class AnalyticsManager {
  addProvider(provider: AnalyticsProvider): void
  trackVerification(result: VerificationResult): void
  trackMaliciousActivity(data: MaliciousActivityData): void
  getRiskScore(): number
}
```

### AnalyticsProvider Interface

```typescript
interface AnalyticsProvider {
  initialize(): Promise<void>
  trackEvent(eventName: string, data: any): void
  getMetrics(): Promise<AnalyticsMetrics>
}
```

## Event Types

### VerificationResult
```typescript
interface VerificationResult {
  success: boolean
  gameType: GameType
  difficulty: string
  duration: number
  attempts: number
}
```

### MaliciousActivityData
```typescript
interface MaliciousActivityData {
  type: string
  timestamp: number
  details: Record<string, any>
  riskScore: number
}
```

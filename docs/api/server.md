# Server API Reference

This section covers the server-side APIs available in GameShield.

## Token Verification

### POST /api/verify
Verifies a CAPTCHA token.

#### Request
```json
{
  "token": "string",
  "gameType": "string",
  "timestamp": "number"
}
```

#### Response
```json
{
  "valid": "boolean",
  "score": "number",
  "timestamp": "number",
  "metadata": {
    "gameType": "string",
    "difficulty": "string",
    "completionTime": "number"
  }
}
```

## Analytics API

### GET /api/analytics/metrics
Retrieves analytics metrics for the specified time range.

#### Query Parameters
- `startDate`: ISO date string
- `endDate`: ISO date string
- `metrics`: Array of metric names

#### Response
```json
{
  "verificationAttempts": "number",
  "successRate": "number",
  "averageCompletionTime": "number",
  "maliciousActivityCount": "number",
  "riskScoreDistribution": {
    "low": "number",
    "medium": "number",
    "high": "number"
  }
}
```

### GET /api/analytics/malicious-activity
Retrieves detected malicious activity records.

#### Query Parameters
- `startDate`: ISO date string
- `endDate`: ISO date string
- `minRiskScore`: number (optional)

#### Response
```json
{
  "activities": [
    {
      "id": "string",
      "timestamp": "number",
      "type": "string",
      "riskScore": "number",
      "details": "object"
    }
  ],
  "totalCount": "number"
}
```

## Admin API

### POST /api/admin/config
Updates GameShield configuration.

#### Request
```json
{
  "analyticsProvider": {
    "type": "string",
    "config": "object"
  },
  "gameSettings": {
    "enabledGames": "string[]",
    "defaultDifficulty": "string"
  },
  "securitySettings": {
    "minRiskScoreThreshold": "number",
    "autoBlockThreshold": "number"
  }
}
```

### GET /api/admin/health
Returns system health and status information.

#### Response
```json
{
  "status": "string",
  "uptime": "number",
  "activeGames": "number",
  "verificationRate": "number",
  "lastUpdate": "string"
}
```

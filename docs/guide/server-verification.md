# Server Verification

After the user completes the CAPTCHA, your backend must verify the token before trusting the request. This follows the same `siteverify` pattern used by reCAPTCHA and hCaptcha.

## Using the SDK

```bash
npm install @gameshield/server-sdk
```

```ts
import { GameShield } from '@gameshield/server-sdk';

const gs = new GameShield({
  siteKey: 'gs_pk_...',
  secretKey: 'gs_sk_...',
});

// In your route handler
const result = await gs.verify(token);

if (result.success) {
  // Token is valid — proceed
  console.log('Lines cleared:', result.linesCleared);
  console.log('Solve time:', result.solveTime, 'ms');
} else {
  // Reject the request
  console.error('Verification failed:', result.error);
}
```

## SDK options

```ts
const gs = new GameShield({
  siteKey: 'gs_pk_...',    // required
  secretKey: 'gs_sk_...',  // required
  apiUrl: 'https://...',   // default: https://api.gameshield.dev
  timeout: 10000,          // default: 10000ms
});
```

## Response fields

| Field          | Type      | Description                              |
| -------------- | --------- | ---------------------------------------- |
| `success`      | `boolean` | Whether verification passed              |
| `challengeId`  | `string`  | The challenge that was solved            |
| `score`        | `number`  | Player's game score                      |
| `linesCleared` | `number`  | Number of Tetris lines cleared           |
| `solveTime`    | `number`  | Time to solve in milliseconds            |
| `error`        | `string`  | Error message (if `success` is `false`)  |

## Direct API call

If you're not using Node.js, call the API directly:

```bash
curl -X POST https://your-api.com/api/v1/YOUR_SITE_KEY/siteverify \
  -H "Content-Type: application/json" \
  -d '{
    "secret": "gs_sk_...",
    "response": "VERIFICATION_TOKEN"
  }'
```

Response:

```json
{
  "success": true,
  "challengeId": "abc123",
  "score": 1200,
  "linesCleared": 4,
  "solveTime": 45000
}
```

## Express example

```ts
import express from 'express';
import { GameShield } from '@gameshield/server-sdk';

const app = express();
const gs = new GameShield({
  siteKey: process.env.GAMESHIELD_SITE_KEY!,
  secretKey: process.env.GAMESHIELD_SECRET_KEY!,
});

app.post('/register', async (req, res) => {
  const { email, password, 'captcha-token': token } = req.body;

  const verification = await gs.verify(token);
  if (!verification.success) {
    return res.status(400).json({ error: 'CAPTCHA verification failed' });
  }

  // Create the user...
  res.json({ ok: true });
});
```

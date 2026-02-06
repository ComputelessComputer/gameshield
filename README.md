<pre>
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⣾⣿⣿⣷⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣤⣤⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣤⣤⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣿⣿⣿⣿⣿⣿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
</pre>

# GameShield

A CAPTCHA alternative that replaces image puzzles with Tetris. Users prove they're human by playing a quick game — moves are verified server-side via deterministic replay.

## How it works

```mermaid
sequenceDiagram
    participant W as Widget
    participant S as Server
    participant Y as Your Server

    W->>S: request challenge
    S-->>W: seed + config
    Note over W: user plays Tetris
    W->>S: moves + score
    S-->>W: verification token
    Y->>S: siteverify (token)
    S-->>Y: success / fail
```

1. Widget requests a challenge — server returns a **seed** (determines piece sequence)
2. User plays Tetris, clears the required lines
3. Widget submits all **moves** back to the server
4. Server **replays the game deterministically** using the same seed and validates the result
5. Server issues a one-time **verification token**
6. Your backend verifies the token via `siteverify` (same pattern as reCAPTCHA/hCaptcha)

## Architecture

```
gameshield/
|-- apps/
|   |-- server/          # Hono API -- challenges, verification, analytics
|   +-- dashboard/       # React admin UI -- site management, analytics
|-- packages/
|   |-- widget/          # Lit web component -- <gameshield-captcha>
|   |-- server-sdk/      # Node.js SDK for server-side token verification
|   +-- shared/          # Shared TypeScript types
+-- docker/              # Docker Compose + nginx config
```

## Setup

Start the server, then create a site and API key via the admin API:

```bash
# 1. create a site (returns your site key)
curl -X POST http://localhost:3001/api/v1/admin/sites \
  -H "Content-Type: application/json" \
  -d '{"name": "My App", "domains": ["localhost"]}'
# -> { "siteKey": "gs_pk_...", ... }

# 2. create a secret key for server-side verification
curl -X POST http://localhost:3001/api/v1/admin/sites/SITE_ID/keys \
  -H "Content-Type: application/json" \
  -d '{"name": "production"}'
# -> { "secretKey": "gs_sk_...", ... }  (shown once)
```

Or use the dashboard at `http://localhost:5173` to manage sites and keys through the UI.

## Usage

**Client** — drop the widget into any page:

```html
<gameshield-captcha site-key="gs_pk_..." api-url="https://your-api.com"></gameshield-captcha>
```

**Server** — verify the token:

```ts
import { GameShield } from '@gameshield/server-sdk';

const gs = new GameShield({
  siteKey: 'gs_pk_...',
  secretKey: 'gs_sk_...',
});

const result = await gs.verify(token);
if (result.success) {
  // human confirmed
}
```

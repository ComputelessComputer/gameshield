# Getting Started

GameShield is a Tetris-based CAPTCHA. Users prove they're human by clearing lines in a quick game. Moves are replayed server-side using a deterministic seed to validate the result.

## How it works

```
┌──────────┐     challenge      ┌──────────┐
│          │ ──────────────────► │          │
│  Widget  │                    │  Server  │
│          │ ◄────────────────  │          │
│  (plays  │   seed + config    │ (Hono +  │
│  Tetris) │                    │  Drizzle)│
│          │  moves + score     │          │
│          │ ──────────────────►│          │
│          │                    │          │
│          │ ◄────────────────  │          │
└──────────┘  verification      └──────────┘
                 token               │
                                     │ siteverify
                                     ▼
                              ┌──────────────┐
                              │  Your Server  │
                              │  (server-sdk) │
                              └──────────────┘
```

1. Widget requests a challenge — server returns a **seed** (determines piece sequence)
2. User plays Tetris and clears the required lines
3. Widget submits all **moves** to the server
4. Server **replays the game deterministically** and validates the result
5. Server issues a one-time **verification token**
6. Your backend verifies the token via `siteverify`

## Prerequisites

- Node.js 20+
- pnpm 9+

## Install

```bash
# clone the repo
git clone https://github.com/ComputelessComputer/gameshield.git
cd gameshield

# install dependencies
pnpm install
```

## Development

```bash
# start all services (server + dashboard + widget)
pnpm dev
```

This runs everything via Turborepo:

| Service    | URL                    |
| ---------- | ---------------------- |
| Server     | http://localhost:3001   |
| Dashboard  | http://localhost:5173   |
| Widget dev | http://localhost:5174   |

## Project structure

```
gameshield/
├── apps/
│   ├── server/          # Hono API — challenges, verification, analytics
│   └── dashboard/       # React admin UI — site management, analytics
├── packages/
│   ├── widget/          # Lit web component — <gameshield-captcha>
│   ├── server-sdk/      # Node.js SDK for server-side token verification
│   └── shared/          # Shared TypeScript types
├── docs/                # This site (VitePress)
└── docker/              # Docker Compose + nginx config
```

## Next steps

- [Integrate the widget](/guide/widget) into your frontend
- [Verify tokens](/guide/server-verification) on your backend

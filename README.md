# Gameshield - Generative Game CAPTCHA

> Inspired by [Guillermo Rauch](https://x.com/rauchg)'s [Doom CAPTCHA](https://doom-captcha.vercel.app)

## Overview

Gameshield is an innovative, open-source CAPTCHA system designed to prevent web crawling and bot interactions using interactive, randomly generated games. Unlike traditional CAPTCHA methods, which rely on text-based or image recognition challenges, this approach leverages generative games that require real-time human interaction to verify authenticity.

## Features

- 🎮 Interactive Generative Games – Unique mini-games that adapt dynamically.
- 🔒 Enhanced Security – Resistant to automated solvers and AI-based attacks.
- 🖥️ Easy Integration – Framework-agnostic Web Components for any tech stack.
- 🌍 Accessible – Designed to be user-friendly and inclusive.
- 🚀 Optimized for Performance – Runs efficiently in both browser and mobile environments.
- 🧠 Behavior Analysis – Advanced detection of human vs bot interaction patterns.
- 🔐 Token-based Verification – Secure JWT tokens for server-side validation.

## Monorepo Structure

This project follows a monorepo architecture using Turborepo + pnpm for efficient package management.

```
/gameshield
├── apps/
│   ├── backend/                              # Hono-based API for verification
│   └── frontend/                             # Next.js demo application
├── packages/
│   ├── game-core/                            # Core game logic & behavior analysis
│   ├── captcha-sdk/                          # SDK for integration
│   ├── security-utils/                       # Security & token utilities
│   ├── web-components/                       # Lit-based Web Components
│   └── utils/                                # Helper functions
├── infra/                                    # Deployment & infrastructure
├── docs/                                     # Documentation
├── package.json                              # Root dependencies & scripts
├── turbo.json                                # Monorepo configuration
└── .github/workflows/                        # CI/CD setup
```

## Getting Started

### Prerequisites

Ensure you have the following installed:

- pnpm (for package management)
- Node.js (LTS) (for development)
- Bun (for running the backend)
- Turborepo (for monorepo management)

### Installation

Clone the repository and install dependencies:

```
git clone https://github.com/your-username/gameshield.git
cd gameshield
pnpm install
```

### Running the Project

To start all applications simultaneously:

```
pnpm run dev
```

This will:

- Start the frontend demo at http://localhost:3000
- Start the API server at http://localhost:3001
- Start the Web Components demo at http://localhost:3002

### Running Individual Components

To run just the frontend:

```
pnpm --filter gameshield-demo dev
```

To run the backend:

```
pnpm --filter gameshield-api dev
```

To run the Web Components demo:

```
pnpm --filter gameshield-web-components dev
```

### Integration Guide

#### Using Web Components (Recommended)

The easiest way to integrate GameShield is using our Web Components, which work with any framework or vanilla HTML:

```html
<!-- Via CDN -->
<script type="module" src="https://cdn.jsdelivr.net/npm/gameshield-web-components/dist/index.js"></script>

<!-- In your HTML -->
<game-shield
  api-key="your-api-key"
  game-type="random"
  difficulty="medium">
</game-shield>

<script>
  const captcha = document.querySelector('game-shield');
  
  captcha.addEventListener('success', (e) => {
    console.log('CAPTCHA verified with token:', e.detail.token);
    // Send token to your server for verification
  });
  
  captcha.addEventListener('failure', () => {
    console.log('CAPTCHA verification failed');
  });
</script>
```

#### Using the SDK (Legacy)

You can also integrate the CAPTCHA using our JavaScript SDK:

```
pnpm add @gameshield/captcha-sdk
```

Example usage:

```javascript
import { generateCaptcha } from "@gameshield/captcha-sdk";

const captcha = generateCaptcha({
  container: document.getElementById("captcha-container"),
  gameType: "random", // Options: 'pong', 'snake', 'breakout', 'dino-run', 'random'
  difficulty: "medium", // Options: 'easy', 'medium', 'hard'
  onSuccess: (token) => {
    // Send token to your server for verification
    console.log("Verification successful, token:", token);
  },
  onFailure: () => {
    console.log("Verification failed");
  },
  apiEndpoint: "https://your-api.com/verify" // Optional: for server-side verification
});
```

#### Server-side Verification

To verify the CAPTCHA token on your server:

```javascript
import { SecurityUtils } from "@gameshield/security-utils";

// Initialize with your secret keys
const securityUtils = new SecurityUtils({
  jwtSecret: process.env.JWT_SECRET,
  encryptionKey: process.env.ENCRYPTION_KEY
});

// In your API route handler
app.post("/verify", (req, res) => {
  const { token } = req.body;
  
  const result = securityUtils.verifyCaptcha(token);
  
  if (result.valid && result.isHuman) {
    // Token is valid and user is human
    res.json({ success: true });
  } else {
    // Invalid token or bot detected
    res.status(400).json({ 
      success: false, 
      message: result.error || "Verification failed" 
    });
  }
});
```

## How It Works

GameShield uses a combination of game interaction and behavior analysis to determine if a user is human:

1. **Game Challenge**: Users complete a simple mini-game (Pong, Snake, Breakout, or Dino Run).
2. **Behavior Analysis**: During gameplay, the system analyzes:
   - Movement patterns (smoothness, variability)
   - Reaction times
   - Decision-making patterns
   - Interaction density
3. **Token Generation**: Upon successful completion, a secure JWT token is generated containing behavior metrics.
4. **Server Verification**: The token can be verified server-side to confirm the user is human.

## Web Components Implementation

GameShield is built using Lit, a lightweight library for building fast, reactive web components:

- **Framework Agnostic**: Works with React, Vue, Angular, Svelte, or vanilla HTML
- **Shadow DOM Encapsulation**: Styles and JavaScript are isolated from the rest of your application
- **Custom Elements**: Uses the Web Components standard for maximum compatibility
- **Small Bundle Size**: Minimal impact on your application's performance

## Deployment

### Frontend Deployment

```
pnpm --filter gameshield-demo build
```

Host it on Vercel, Netlify, or any static hosting provider.

### Backend Deployment

```
pnpm --filter gameshield-api build
```

The backend uses Bun and Hono, making it ideal for deployment on Fly.io, Cloudflare Workers, or similar platforms.

### Web Components Deployment

```
pnpm --filter gameshield-web-components build
```

The built web components can be deployed to a CDN like jsDelivr or unpkg.

## Environment Variables

For production, set these environment variables:

```
# Backend
JWT_SECRET=your-secure-jwt-secret
ENCRYPTION_KEY=your-secure-encryption-key
TOKEN_EXPIRATION=300 # in seconds

# Frontend
NEXT_PUBLIC_API_URL=https://your-api-url.com
```

## Contributing

We welcome contributions! Follow these steps to get involved:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Commit your changes (git commit -m "Add new feature").
4. Push to your branch (git push origin feature-branch).
5. Open a pull request.

## Testing

Run tests across all packages:

```
pnpm run test
```

For specific package tests:

```
pnpm --filter <package-name> test
```

## License

This project is licensed under the MIT License.

## Contact

For any questions, feel free to open an issue or reach out at jeeheontransformers@gmail.com.

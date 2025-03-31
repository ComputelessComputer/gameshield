# GameShield - Generative Game CAPTCHA

> Inspired by [Guillermo Rauch](https://x.com/rauchg)'s [Doom CAPTCHA](https://doom-captcha.vercel.app)

## Overview

GameShield is an innovative, open-source CAPTCHA system designed to prevent web crawling and bot interactions using interactive, randomly generated games. Unlike traditional CAPTCHA methods, which rely on text-based or image recognition challenges, this approach leverages generative games that require real-time human interaction to verify authenticity.

## Features

- 🎮 Interactive Generative Games – Unique mini-games that adapt dynamically
- 🔒 Enhanced Security – Resistant to automated solvers and AI-based attacks
- ⚛️ React-based – Built with React for seamless integration with modern web apps
- 🌍 Accessible – Designed to be user-friendly and inclusive
- 🚀 Optimized for Performance – Runs efficiently in both browser and mobile environments
- 🧠 Behavior Analysis – Advanced detection of human vs bot interaction patterns
- 🔐 Token-based Verification – Secure verification tokens for server-side validation

## Monorepo Structure

This project follows a clean, modular monorepo architecture using Turborepo + pnpm for efficient package management.

```
/gameshield
├── apps/
│   └── frontend/                             # Next.js demo application
├── packages/
│   ├── core/                                 # Core CAPTCHA logic (@gameshield/core)
│   ├── react/                                # React UI components (@gameshield/react)
│   └── server/                               # Server-side validation (@gameshield/server)
├── docs/                                     # Documentation
├── package.json                              # Root dependencies & scripts
└── turbo.json                                # Monorepo configuration
```

### Package Details

#### @gameshield/core

The logic engine with no UI dependencies:

- Game challenge generation
- Token/session management
- Verification logic
- Behavior analysis for bot detection

#### @gameshield/react

React-based UI components:

- Ready-to-use GameShield component
- Hooks for custom integrations
- Theming and customization options
- Event handling (success, failure, timeout)

#### @gameshield/server

Server-side validation and management:

- API routes/middleware for verification
- Token validation
- Security features (rate limiting, IP protection)

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/gameshield.git
cd gameshield

# Install dependencies
pnpm install
```

### Development

```bash
# Start the development server
pnpm dev

# Build all packages
pnpm build
```

## Usage

### React Component

```jsx
import { GameShield } from "@gameshield/react";

function MyForm() {
  return (
    <form>
      <h2>Contact Form</h2>

      {/* Other form fields */}

      <div className="captcha-container">
        <GameShield
          size="400px"
          gameType="random"
          difficulty="medium"
          onSuccess={(token) => {
            console.log("Verified:", token);
            // Send token to your server for verification
          }}
          onFailure={(reason) => console.log("Failed:", reason)}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
```

### Server-side Verification

```javascript
import { verifyToken } from "@gameshield/server";

// In your API route handler
app.post("/verify", (req, res) => {
  const { token } = req.body;

  const result = verifyToken(token);

  if (result.valid) {
    // Token is valid and user is human
    res.json({ success: true });
  } else {
    // Invalid token or bot detected
    res.status(400).json({
      success: false,
      message: result.error || "Verification failed",
    });
  }
});
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by [Doom CAPTCHA](https://doom-captcha.vercel.app) by Guillermo Rauch
- Built with [React](https://reactjs.org/), [Next.js](https://nextjs.org/), and [PixiJS](https://pixijs.com/)

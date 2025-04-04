# 🎮 GameShield 🛡️

A game-based CAPTCHA system that replaces traditional text and image challenges with interactive mini-games.

## Features

- 🎮 Interactive mini-games (Snake, Breakout, Tetris)
- 🔒 Enhanced security against bots
- ⚛️ React components for easy integration
- 🌍 Accessible and user-friendly
- 🚀 Optimized for performance

## Quick Start

```bash
# Install
pnpm install

# Development
# Run all packages in development mode
turbo run dev

# Run only the frontend app
turbo run dev -F frontend

# Run only specific packages
turbo run dev -F @gameshield/core
turbo run dev -F @gameshield/react

# Build
# Build all packages
turbo run build

# Build only specific packages
turbo run build -F @gameshield/react
turbo run build -F @gameshield/server

# Run other tasks defined in turbo.json
turbo run typecheck
turbo run test
```

## Usage

```jsx
import { GameShield } from "@gameshield/react";

function MyForm() {
  return (
    <form>
      <GameShield
        size="400px"
        gameType="random"
        difficulty="medium"
        onSuccess={(token) => {
          // Send token to server for verification
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

Server verification:

```javascript
import { verifyToken } from "@gameshield/server";

app.post("/verify", (req, res) => {
  const { token } = req.body;
  const result = verifyToken(token);

  if (result.valid) {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
});
```

## Packages

- **@gameshield/core**: Game logic and verification
- **@gameshield/react**: React components and hooks
- **@gameshield/server**: Server-side validation

## License

MIT License

## Acknowledgments

Inspired by [Doom CAPTCHA](https://doom-captcha.vercel.app) by Guillermo Rauch

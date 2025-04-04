# API Reference

Welcome to the GameShield API reference. This section provides detailed documentation for all APIs and methods available in the GameShield packages.

## Quick Links

- [@gameshield/core](/api/core) - Core functionality and game engine
- [@gameshield/react](/api/react) - React component documentation
- [@gameshield/server](/api/server) - Server-side verification API

## Overview

GameShield follows a modular architecture with three main packages:

1. **@gameshield/core**: Core functionality for CAPTCHA challenges

   - Game generation and management
   - User interaction handling
   - Behavior analysis
   - Token generation

2. **@gameshield/react**: React components and hooks

   - Ready-to-use GameShield component
   - Custom hooks for advanced use cases
   - TypeScript support
   - Responsive design

3. **@gameshield/server**: Server-side verification
   - Token verification
   - Security utilities
   - Rate limiting
   - IP protection

## Getting Started

### 1. Install the Packages

```bash
# Install the React package (includes core as a dependency)
npm install @gameshield/react

# For server-side verification
npm install @gameshield/server

# Or using yarn
yarn add @gameshield/react
yarn add @gameshield/server

# Or using pnpm
pnpm add @gameshield/react
pnpm add @gameshield/server
```

### 2. Client-Side Implementation

#### React Component

```jsx
import React, { useState } from "react";
import { GameShield } from "@gameshield/react";

function ContactForm() {
  const [token, setToken] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please complete the CAPTCHA verification");
      return;
    }

    // Send form data with token to your server
    fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CAPTCHA-Token": token,
      },
      body: JSON.stringify({
        name: e.target.name.value,
        email: e.target.email.value,
      }),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" required />
      <input name="email" type="email" required />

      <GameShield
        size="400px"
        gameType="random"
        difficulty="medium"
        onSuccess={setToken}
      />

      <button type="submit" disabled={!token}>
        Submit
      </button>
    </form>
  );
}
```

#### Core API (Vanilla JavaScript)

```javascript
import { createGameShield } from "@gameshield/core";

const container = document.getElementById("captcha-container");
let token = null;

const gameShield = createGameShield({
  container,
  size: "400px",
  gameType: "random",
  difficulty: "medium",
  onSuccess: (captchaToken) => {
    token = captchaToken;
    document.getElementById("submit-button").disabled = false;
  },
  onFailure: (reason) => {
    console.error("Verification failed:", reason);
  },
});

document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();

  if (!token) {
    alert("Please complete the CAPTCHA verification");
    return;
  }

  // Send form data with token to your server
  // ...
});
```

### 3. Server-Side Verification

```javascript
const express = require("express");
const { verifyToken } = require("@gameshield/server");

const app = express();
app.use(express.json());

app.post("/api/submit", (req, res) => {
  const token = req.headers["x-captcha-token"];

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "CAPTCHA token is required",
    });
  }

  const verification = verifyToken(token);

  if (verification.valid) {
    // Process the form submission
    // ...

    return res.json({
      success: true,
      message: "Form submitted successfully",
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "CAPTCHA verification failed",
      reason: verification.reason,
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

## Next Steps

1. Explore the [@gameshield/core API](/api/core) for detailed core functionality
2. Review the [@gameshield/react API](/api/react) for React component options
3. Learn about the [@gameshield/server API](/api/server) for server-side verification
4. Check out the [Integration Examples](/guide/integration-examples) for common use cases
5. Read about [Behavior Analysis](/guide/behavior-analysis) for advanced security features

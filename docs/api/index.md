# API Reference

Welcome to the Gameshield API reference. This section provides detailed documentation for all the APIs and SDK methods available in Gameshield.

## Overview

Gameshield provides two main interfaces for integration:

1. **Client-Side SDK**: A JavaScript library for embedding and managing CAPTCHA challenges in your web application
2. **Server-Side API**: Endpoints for verifying CAPTCHA tokens and managing your integration

## SDK Structure

The Gameshield SDK is organized into several modules:

- **Core**: Main functionality for generating and managing CAPTCHA challenges
- **Games**: Individual game implementations and their configurations
- **UI**: Components for rendering the CAPTCHA interface
- **Utils**: Helper functions for common tasks

## Basic Usage

```javascript
import { generateCaptcha } from '@gameshield/captcha-sdk';

// Initialize a CAPTCHA challenge
const captcha = generateCaptcha({
  container: document.getElementById('captcha-container'),
  theme: 'light',
  gameType: 'pong', // Options: 'pong', 'snake', 'breakout', 'dino-run', 'puzzle', 'maze', 'pattern', 'random'
  difficulty: 'medium', // Options: 'easy', 'medium', 'hard'
  onSuccess: (token) => {
    console.log('Verification successful', token);
    // Send token to your server for validation
  },
  onFailure: (error) => {
    console.error('Verification failed', error);
  }
});

// Check if the CAPTCHA has been completed
const isVerified = captcha.isVerified();

// Reset the CAPTCHA if needed
captcha.reset();

// Manually trigger verification (usually not needed)
captcha.verify();
```

## Game Types

Gameshield offers several game types for CAPTCHA verification:

| Game Type | Description | Difficulty Levels |
|-----------|-------------|-------------------|
| `pong` | A reflex-based game where users hit a ball with a paddle | easy, medium, hard |
| `snake` | A pattern completion game where users collect specific items | easy, medium, hard |
| `breakout` | A brick-breaking game requiring precision and timing | easy, medium, hard |
| `dino-run` | A timing-based game where users jump over obstacles | easy, medium, hard |
| `puzzle` | A sliding puzzle where users arrange tiles to complete an image | easy, medium, hard |
| `maze` | A navigation challenge through a procedurally generated maze | easy, medium, hard |
| `pattern` | A pattern matching game where users select elements by criteria | easy, medium, hard |
| `random` | Randomly selects one of the available game types | easy, medium, hard |

## Server-Side Verification

For secure verification, always validate CAPTCHA tokens on your server:

```javascript
// Server-side code (Node.js example)
const { verifyToken } = require('@gameshield/captcha-sdk/server');

async function validateCaptcha(token) {
  try {
    const result = await verifyToken(token);
    return result.valid;
  } catch (error) {
    console.error('CAPTCHA verification error:', error);
    return false;
  }
}
```

## Explore the API

For detailed information about specific APIs, please refer to the following sections:

- [SDK Methods](/api/sdk-methods): Client-side JavaScript methods
- [Server API](/api/server): Server-side verification endpoints
- [Configuration](/api/configuration): Available configuration options

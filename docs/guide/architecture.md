# GameShield Architecture

GameShield follows a clean, modular architecture designed to provide flexibility, maintainability, and optimal performance. This document explains the overall architecture and how the different packages work together.

## Modular Package Structure

GameShield is organized into three main packages:

```
/gameshield
├── packages/
│   ├── core/                                 # Core CAPTCHA logic (@gameshield/core)
│   ├── react/                                # React UI components (@gameshield/react)
│   └── server/                               # Server-side validation (@gameshield/server)
```

This modular approach offers several advantages:

- **Separation of Concerns**: Each package has a clear, focused responsibility
- **Flexibility**: Use only the packages you need for your specific use case
- **Maintainability**: Changes to one package don't necessarily affect others
- **Performance**: Bundle only what you need, reducing client-side payload

## Package Responsibilities

### @gameshield/core

The core package contains all the essential logic with no UI dependencies:

- Game challenge generation and management
- Behavior analysis algorithms
- Token generation and handling
- Security utilities

This package can be used directly if you want to build a custom UI or integrate with a different framework.

### @gameshield/react

The React package provides ready-to-use React components:

- `GameShield` main component for easy integration
- Custom hooks for advanced use cases
- Theming and styling utilities
- Event handling for verification lifecycle

This package depends on `@gameshield/core` and provides a React-specific implementation.

### @gameshield/server

The server package handles verification and security on the server side:

- Token verification
- Security features (rate limiting, IP protection)
- Configuration options for different environments
- Analytics data processing (optional)

## Data Flow

Here's how data flows through the GameShield system:

1. **Client Initialization**:
   - The React component is rendered in the browser
   - It initializes the core game engine and behavior analyzer

2. **User Interaction**:
   - User plays the game challenge
   - Behavior analyzer collects interaction data
   - Game engine determines if the challenge is completed successfully

3. **Verification**:
   - Upon successful completion, core package generates a verification token
   - Token contains encrypted game results and behavior analysis data
   - React component emits success event with the token

4. **Server Validation**:
   - Client sends the token to the server
   - Server package validates the token
   - Server confirms the verification and allows the protected action

## Technical Implementation

### Game Engine

The game engine uses PixiJS, a fast 2D rendering library, to create interactive game experiences:

```
┌─────────────────────┐
│    Game Factory     │
└─────────────────────┘
          │
          ▼
┌─────────────────────┐
│    Game Instance    │
└─────────────────────┘
          │
          ▼
┌─────────────────────┐
│     PixiJS App      │
└─────────────────────┘
```

### Behavior Analysis

The behavior analyzer uses sophisticated algorithms to detect human vs bot interaction patterns:

```
┌─────────────────────┐
│  Event Collection   │
└─────────────────────┘
          │
          ▼
┌─────────────────────┐
│  Pattern Analysis   │
└─────────────────────┘
          │
          ▼
┌─────────────────────┐
│   Risk Assessment   │
└─────────────────────┘
```

### Token System

The token system uses secure cryptographic methods:

```
┌─────────────────────┐
│   Session Creation  │
└─────────────────────┘
          │
          ▼
┌─────────────────────┐
│  Data Compilation   │
└─────────────────────┘
          │
          ▼
┌─────────────────────┐
│  Token Generation   │
└─────────────────────┘
```

## Integration with Frontend

The React component seamlessly integrates with any React application:

```jsx
import { GameShield } from '@gameshield/react';

function MyForm() {
  return (
    <form>
      {/* Form fields */}
      
      <GameShield 
        onSuccess={handleVerification}
        size="400px"
      />
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Server-side Integration

The server package can be used with any Node.js server framework:

```javascript
import express from 'express';
import { verifyToken } from '@gameshield/server';

const app = express();

app.post('/api/verify', (req, res) => {
  const { token } = req.body;
  
  const result = verifyToken(token);
  
  if (result.valid) {
    // Proceed with protected action
    res.json({ success: true });
  } else {
    res.status(400).json({ 
      success: false, 
      message: 'Verification failed' 
    });
  }
});
```

## Next Steps

- Learn about the [@gameshield/core](/guide/packages/core) package
- Explore the [@gameshield/react](/guide/packages/react) component
- Set up [server-side verification](/guide/packages/server)

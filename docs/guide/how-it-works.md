# How GameShield Works

This page explains the technical architecture and operational flow of GameShield's game-based CAPTCHA system.

## Architecture Overview

GameShield follows a modular architecture with three main packages:

1. **Core Package**: Contains the essential logic for game generation, behavior analysis, and token management
2. **React Package**: Provides React components for easy integration into React applications
3. **Server Package**: Handles server-side verification and security features

<img src="/gameshield_how_it_works.png" darkSrc="/gameshield_how_it_works_dark.png" alt="GameShield Architecture" width="600px"/>

## Verification Process

### 1. Challenge Generation

When a CAPTCHA is requested, the system:

- Generates a unique session ID
- Randomly selects a game type from the available options (Pong, Snake, Breakout, Dino Run)
- Creates game parameters based on the specified difficulty level
- Applies randomization to prevent pattern recognition

### 2. User Interaction

The user is presented with an interactive game that requires human-like decision making and motor skills:

- Each game is designed to be engaging yet simple to understand
- Games require natural interaction patterns that are difficult for bots to simulate
- The 1:1 aspect ratio ensures consistent display across different devices
- The component adapts to different screen sizes while maintaining playability

### 3. Behavior Analysis

During gameplay, the system analyzes multiple factors:

- Movement patterns (mouse/touch movements)
- Reaction times to game events
- Interaction density and distribution
- Pattern variability and natural inconsistencies

These factors are analyzed to determine if the user's behavior matches human patterns.

### 4. Token Generation

Upon successful completion:

- The system analyzes the collected behavior data
- A verification token is generated containing game results and behavior metrics
- This token is passed to your application via the `onSuccess` callback

### 5. Server Verification

For complete security, your server should:

- Receive the token from the client
- Use the server package to verify the token's validity
- Process the user's request only after successful verification

## Security Measures

GameShield employs multiple layers of security:

### Dynamic Challenges

Each game instance is uniquely generated, making it impossible to create a database of solutions.

### Behavior Analysis

Beyond just completing the game, the system analyzes how the user interacts with the challenge, detecting automation attempts.

### Token-based Verification

Verification tokens contain encrypted data about the game session and behavior analysis results.

### Server-side Validation

All tokens must be verified on the server side, preventing client-side tampering.

### Responsive Design

The 1:1 aspect ratio ensures consistent gameplay across different devices, preventing exploits based on screen size variations.

## Technical Implementation

### Game Engine

GameShield uses PixiJS, a fast 2D rendering library, to create interactive game experiences:

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

### React Integration

The React component provides a seamless integration experience:

```jsx
<GameShield
  size="400px"
  gameType="random"
  difficulty="medium"
  onSuccess={(token) => verifyToken(token)}
/>
```

### Server Verification

The server package makes it easy to verify tokens:

```javascript
import { verifyToken } from '@gameshield/server';

app.post('/api/verify', (req, res) => {
  const { token } = req.body;
  const result = verifyToken(token);
  
  if (result.valid) {
    // Token is valid, proceed with protected action
    res.json({ success: true });
  } else {
    // Token is invalid, reject the request
    res.status(400).json({ success: false });
  }
});
```

## Performance Optimization

GameShield is designed for minimal impact on user experience:

- Lightweight implementation with minimal dependencies
- Efficient rendering using PixiJS
- Responsive design that adapts to different screen sizes
- Optimized game logic for smooth performance

## Next Steps

- Learn about the [modular architecture](/guide/architecture) in detail
- Explore the [@gameshield/core](/guide/packages/core) package
- Integrate the [React component](/guide/packages/react) into your application
- Set up [server-side verification](/guide/packages/server)

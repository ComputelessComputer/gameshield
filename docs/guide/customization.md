# Customization

Gameshield offers extensive customization options to ensure the CAPTCHA experience matches your website's design and meets your specific requirements.

## Appearance Customization 🎨

### Theme Options

Gameshield comes with built-in themes that you can easily apply:

```javascript
import { generateCaptcha } from '@gameshield/captcha-sdk';

generateCaptcha({
  container: document.getElementById('captcha-container'),
  theme: 'light', // Options: 'light', 'dark', 'auto' (follows system preference)
});
```

### Custom Styling

For more control, you can customize individual style elements:

```javascript
generateCaptcha({
  container: document.getElementById('captcha-container'),
  styles: {
    borderRadius: '8px',
    fontFamily: 'Roboto, sans-serif',
    colors: {
      primary: '#3498db',
      secondary: '#2ecc71',
      background: '#f8f9fa',
      text: '#333333',
      border: '#e0e0e0'
    },
    shadows: {
      container: '0 4px 6px rgba(0, 0, 0, 0.1)',
      buttons: '0 2px 4px rgba(0, 0, 0, 0.05)'
    }
  }
});
```

### Custom CSS

You can also apply your own CSS classes for complete control:

```javascript
generateCaptcha({
  container: document.getElementById('captcha-container'),
  classNames: {
    container: 'my-captcha-container',
    gameArea: 'my-game-area',
    controls: 'my-controls',
    button: 'my-button'
  }
});
```

```css
/* In your CSS file */
.my-captcha-container {
  /* Your custom styles */
}

.my-game-area {
  /* Your custom styles */
}

/* etc. */
```

## Behavior Customization ⚙️

### Game Selection

Control which games appear and their frequency:

```javascript
generateCaptcha({
  container: document.getElementById('captcha-container'),
  gameTypes: ['puzzle', 'pattern', 'maze'], // Only use these game types
  preferredGameType: 'pattern', // Try to use this game type when possible
  excludeGameTypes: ['physics'], // Never use these game types
});
```

### Difficulty Settings

Adjust the challenge difficulty:

```javascript
generateCaptcha({
  container: document.getElementById('captcha-container'),
  difficulty: 'medium', // Options: 'easy', 'medium', 'hard', 'adaptive'
  // 'adaptive' adjusts difficulty based on user behavior
});
```

### Timeout and Expiration

Configure time-related settings:

```javascript
generateCaptcha({
  container: document.getElementById('captcha-container'),
  timeoutSeconds: 120, // Challenge expires after this many seconds
  expiryBehavior: 'refresh', // What happens when time expires: 'refresh', 'fail', or 'warn'
});
```

### Callback Functions

Customize behavior with callback functions:

```javascript
generateCaptcha({
  container: document.getElementById('captcha-container'),
  onLoad: () => {
    console.log('CAPTCHA loaded successfully');
  },
  onSuccess: (token) => {
    console.log('Verification successful', token);
    // Send token to your server
  },
  onFailure: (error) => {
    console.error('Verification failed', error);
  },
  onExpire: () => {
    console.warn('CAPTCHA expired');
  },
  onError: (error) => {
    console.error('CAPTCHA error', error);
  }
});
```

## Accessibility Customization ♿

### Accessibility Options

Enhance accessibility for all users:

```javascript
generateCaptcha({
  container: document.getElementById('captcha-container'),
  accessibility: {
    highContrast: true, // Enable high contrast mode
    reducedMotion: true, // Reduce animations for users with vestibular disorders
    largeTargets: true, // Increase clickable area sizes
    audioFeedback: true, // Provide audio feedback for interactions
    keyboardNavigation: true // Enable comprehensive keyboard navigation
  }
});
```

### Language and Localization

Support multiple languages:

```javascript
generateCaptcha({
  container: document.getElementById('captcha-container'),
  language: 'es', // ISO language code (default: 'en')
  // Supported languages: 'en', 'es', 'fr', 'de', 'ja', 'zh', etc.
  
  // Or provide custom translations
  translations: {
    title: 'Verify you are human',
    instructions: 'Complete the game to proceed',
    successMessage: 'Verification successful',
    failureMessage: 'Verification failed, please try again',
    refreshButton: 'New challenge',
    // etc.
  }
});
```

## Advanced Customization 🔧

### Custom Game Assets

Use your own game assets:

```javascript
generateCaptcha({
  container: document.getElementById('captcha-container'),
  assets: {
    images: {
      puzzleImages: [
        '/path/to/image1.jpg',
        '/path/to/image2.jpg'
      ],
      icons: {
        refresh: '/path/to/refresh-icon.svg',
        success: '/path/to/success-icon.svg',
        failure: '/path/to/failure-icon.svg'
      }
    },
    audio: {
      success: '/path/to/success-sound.mp3',
      failure: '/path/to/failure-sound.mp3'
    }
  }
});
```

### Custom Game Logic

For advanced use cases, you can even create custom game types:

```javascript
import { registerCustomGame } from '@gameshield/captcha-sdk';

// Define a custom game
registerCustomGame({
  name: 'my-custom-game',
  
  // Game initialization
  init: (container, options) => {
    // Setup game elements
    // Return game controller
  },
  
  // Verification logic
  verify: (gameState) => {
    // Return true if game was completed successfully
    return gameState.isCompleted && gameState.score > 5;
  },
  
  // Cleanup
  destroy: (gameController) => {
    // Clean up resources
  }
});

// Use your custom game
generateCaptcha({
  container: document.getElementById('captcha-container'),
  gameTypes: ['my-custom-game']
});
```

## Server-Side Customization

### Verification Settings

Customize server-side verification behavior:

```javascript
// Server-side code
const { configureVerification } = require('@gameshield/captcha-sdk/server');

configureVerification({
  strictMode: true, // More stringent verification
  tokenTtl: 300, // Token time-to-live in seconds
  allowedOrigins: ['https://yourdomain.com'], // Restrict verification to specific origins
  ipRateLimiting: {
    enabled: true,
    maxAttempts: 10,
    timeWindowSeconds: 60
  }
});
```

## Best Practices

When customizing Gameshield, consider these best practices:

1. **Balance security and usability**: More difficult games may be more secure but can frustrate users
2. **Test with real users**: Gather feedback on your customizations from actual users
3. **Consider accessibility**: Ensure your customizations don't exclude users with disabilities
4. **Performance impact**: Custom assets may affect load times
5. **Mobile optimization**: Test customizations on various device sizes

## Next Steps

- Explore [integration examples](/guide/integration-examples) for implementation ideas
- Check out the [API reference](/api/configuration) for all configuration options
- Visit our [troubleshooting guide](/guide/troubleshooting) if you encounter issues

# Getting Started with GameShield

This guide will help you quickly integrate GameShield's game-based CAPTCHA into your web application.

## Quick Start

### 1. Installation

Install the GameShield SDK using your preferred package manager:

```bash
# Using npm
npm install @gameshield/captcha-sdk

# Using yarn
yarn add @gameshield/captcha-sdk

# Using pnpm (recommended)
pnpm add @gameshield/captcha-sdk
```

### 2. Basic Implementation

Add GameShield to your web application:

```typescript
import { CaptchaSDK } from '@gameshield/captcha-sdk';

// Initialize the CAPTCHA
const captcha = new CaptchaSDK({
  container: document.getElementById('captcha-container'),
  theme: 'light',
  gameType: 'pong',
  onSuccess: (token) => {
    // Send token to your server for verification
    verifyToken(token);
  },
  onFailure: (error) => {
    console.error('Verification failed:', error);
  }
});
```

### 3. Server-Side Verification

Verify the CAPTCHA token on your server:

```typescript
import { verifyToken } from '@gameshield/captcha-sdk/server';

async function verifyToken(token: string) {
  try {
    const result = await verifyToken(token);
    return result.valid;
  } catch (error) {
    console.error('Verification error:', error);
    return false;
  }
}
```

## Features Overview

### Available Games
- **Pong**: Classic paddle game
- **Snake**: Pattern collection game
- **Breakout**: Brick-breaking challenge
- **Maze**: Navigation puzzle
- **Pattern**: Pattern matching game

### Customization Options
- Light/dark themes
- Multiple difficulty levels
- Custom styling
- Game selection
- Analytics integration

## Advanced Setup

### Analytics Integration

Enable analytics to track verification metrics:

```typescript
import { CaptchaSDK, LocalStorageProvider } from '@gameshield/captcha-sdk';

const captcha = new CaptchaSDK({
  container: element,
  analyticsProvider: new LocalStorageProvider(),
  // ... other options
});
```

### Custom Styling

Apply custom styles to match your brand:

```typescript
const captcha = new CaptchaSDK({
  container: element,
  theme: 'light',
  customStyles: {
    container: {
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    game: {
      background: '#f5f5f5'
    },
    button: {
      background: '#0070f3',
      color: 'white'
    }
  }
});
```

### Error Handling

Implement robust error handling:

```typescript
const captcha = new CaptchaSDK({
  // ... other options
  onError: (error) => {
    switch (error.code) {
      case 'NETWORK_ERROR':
        showRetryButton();
        break;
      case 'VERIFICATION_FAILED':
        resetCaptcha();
        break;
      default:
        console.error('Unknown error:', error);
    }
  }
});
```

## Integration Examples

### React Component
```tsx
import { useEffect, useRef } from 'react';
import { CaptchaSDK } from '@gameshield/captcha-sdk';

function CaptchaComponent({ onVerify }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    const captcha = new CaptchaSDK({
      container: containerRef.current,
      onSuccess: onVerify
    });

    return () => captcha.destroy();
  }, [onVerify]);

  return <div ref={containerRef} />;
}
```

### Form Integration
```typescript
const form = document.querySelector('form');
let captchaToken = null;

const captcha = new CaptchaSDK({
  container: document.getElementById('captcha'),
  onSuccess: (token) => {
    captchaToken = token;
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  if (!captchaToken) {
    alert('Please complete the CAPTCHA');
    return;
  }

  // Submit form with token
  const formData = new FormData(form);
  formData.append('captchaToken', captchaToken);
  
  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      // Handle success
    }
  } catch (error) {
    console.error('Submission failed:', error);
  }
});
```

## Best Practices

### Security
1. Always verify tokens server-side
2. Implement rate limiting
3. Use HTTPS for all requests
4. Keep your API keys secure

### Performance
1. Load the SDK asynchronously
2. Initialize CAPTCHA only when needed
3. Clean up instances properly
4. Use appropriate difficulty levels

### User Experience
1. Show clear error messages
2. Provide retry options
3. Maintain consistent styling
4. Consider accessibility

## Troubleshooting

### Common Issues

1. **CAPTCHA Not Loading**
   - Check container element exists
   - Verify SDK installation
   - Check for console errors

2. **Verification Failing**
   - Validate token format
   - Check server configuration
   - Verify API keys

3. **Style Issues**
   - Check CSS conflicts
   - Verify container size
   - Review custom styles

### Debug Mode

Enable debug mode for detailed logs:

```typescript
const captcha = new CaptchaSDK({
  debug: true,
  // ... other options
});
```

## Next Steps

1. Explore [Integration Examples](/guide/integration-examples)
2. Review [API Reference](/api)
3. Set up [Analytics](/guide/analytics-system)
4. Configure [Admin Dashboard](/guide/admin-dashboard)

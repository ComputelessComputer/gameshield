# Troubleshooting

This guide provides solutions to common issues you might encounter when implementing and using GameShield.

## Common Issues

### CAPTCHA Not Displaying

If the CAPTCHA game isn't appearing on your page:

1. **Check Console Errors**: Open your browser's developer tools (F12 or right-click → Inspect) and check the console for any JavaScript errors.

2. **Import Issues**: Ensure you're importing the components correctly:

   ```javascript
   // React
   import { GameShield } from '@gameshield/react';
   
   // Core (vanilla JS)
   import { createGameShield } from '@gameshield/core';
   ```

3. **Container Element**: Make sure the container element exists in the DOM when you initialize the CAPTCHA:

   ```javascript
   // Bad: Container might not exist yet
   document.addEventListener('DOMContentLoaded', () => {
     const gameShield = createGameShield({
       container: document.getElementById('captcha-container'),
       size: '400px'
     });
   });

   // Good: Wait for the element to be available
   function initCaptcha() {
     const container = document.getElementById('captcha-container');
     if (!container) {
       console.error('Captcha container not found');
       return;
     }
     
     const gameShield = createGameShield({ 
       container,
       size: '400px',
       gameType: 'random',
       difficulty: 'medium'
     });
   }
   ```

4. **Network Issues**: Check if the GameShield resources are being loaded correctly in the Network tab of your browser's developer tools.

5. **Content Security Policy (CSP)**: If you have a strict CSP, you may need to allow resources from GameShield domains:

   ```html
   <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://cdn.gameshield.dev; connect-src 'self' https://api.gameshield.dev;">
   ```

6. **Size Property**: Make sure you're providing a valid size for the component:

   ```jsx
   // React
   <GameShield size="400px" /> // Valid
   <GameShield size={400} /> // Valid
   <GameShield /> // Valid (uses default size)
   
   // Invalid
   <GameShield size="large" /> // Not a valid size
   ```

### Verification Failures

If the CAPTCHA verification is failing:

1. **Token Expiration**: CAPTCHA tokens expire after 5 minutes. Ensure you're verifying the token promptly after it's generated.

2. **Server Configuration**: Check that your server-side verification is correctly implemented:

   ```javascript
   // Node.js example
   const { verifyToken } = require('@gameshield/server');

   // Verify the token
   const verification = verifyToken(token);
   
   if (verification.valid) {
     // Token is valid
     console.log('Verification successful');
   } else {
     // Token is invalid
     console.error('Verification failed:', verification.reason);
   }
   ```

3. **Network Issues**: Ensure your server can reach the GameShield verification API.

4. **Token Transmission**: Verify that the token is being correctly sent from the client to your server:

   ```javascript
   // Client-side
   fetch('/api/verify', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'X-CAPTCHA-Token': captchaToken // Recommended header approach
     },
     body: JSON.stringify({ formData })
   });
   ```

5. **Multiple Verifications**: Each token can only be verified once. If you're trying to verify the same token multiple times, subsequent attempts will fail.

### Performance Issues

If you're experiencing slow loading or performance issues:

1. **Lazy Loading**: Consider loading the CAPTCHA only when needed:

   ```jsx
   // React example with lazy loading
   import React, { useState } from 'react';
   import { GameShield } from '@gameshield/react';
   
   function ContactForm() {
     const [showCaptcha, setShowCaptcha] = useState(false);
     const [token, setToken] = useState(null);
     
     const handleSubmitAttempt = (e) => {
       e.preventDefault();
       if (!showCaptcha) {
         setShowCaptcha(true);
         return;
       }
       
       if (!token) {
         alert('Please complete the CAPTCHA verification');
         return;
       }
       
       // Continue with form submission
     };
     
     return (
       <form onSubmit={handleSubmitAttempt}>
         {/* Form fields */}
         
         {showCaptcha && (
           <GameShield
             size="400px"
             onSuccess={setToken}
           />
         )}
         
         <button type="submit">
           {showCaptcha ? 'Submit' : 'Continue'}
         </button>
       </form>
     );
   }
   ```

2. **Resource Optimization**: Use the production build of the packages:

   ```bash
   # Development dependencies
   npm install --save-dev @gameshield/core @gameshield/react @gameshield/server
   
   # Production build
   npm run build
   ```

3. **Preconnect Hint**: Add preconnect hints to your HTML to establish early connections:

   ```html
   <link rel="preconnect" href="https://api.gameshield.dev">
   <link rel="preconnect" href="https://cdn.gameshield.dev">
   ```

4. **Game Type Selection**: Some game types are more resource-intensive than others. If performance is critical, specify lighter game types:

   ```javascript
   const gameShield = createGameShield({
     container: document.getElementById('captcha-container'),
     gameType: 'pong', // 'pong' is less resource-intensive than 'breakout'
     size: '400px'
   });
   ```

### Mobile-Specific Issues

If you're having problems on mobile devices:

1. **Viewport Configuration**: Ensure your page has the correct viewport meta tag:

   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
   ```

2. **Touch Events**: Make sure touch events are working correctly. GameShield supports touch interactions, but they might be affected by other touch event handlers on your page.

3. **Size Adaptation**: The 1:1 aspect ratio of GameShield ensures consistent display across devices, but you might need to adjust the size for smaller screens:

   ```jsx
   // React example with responsive sizing
   import React, { useState, useEffect } from 'react';
   import { GameShield } from '@gameshield/react';
   
   function ResponsiveCaptcha() {
     const [size, setSize] = useState('400px');
     
     useEffect(() => {
       const handleResize = () => {
         const screenWidth = window.innerWidth;
         if (screenWidth < 480) {
           setSize('300px');
         } else if (screenWidth < 768) {
           setSize('350px');
         } else {
           setSize('400px');
         }
       };
       
       handleResize();
       window.addEventListener('resize', handleResize);
       return () => window.removeEventListener('resize', handleResize);
     }, []);
     
     return <GameShield size={size} />;
   }
   ```

4. **Performance**: Mobile devices might have limited resources. Consider using the 'pong' game type which is less resource-intensive.

### Browser Compatibility

GameShield is compatible with modern browsers:

| Browser | Minimum Version | Support Level |
|---------|----------------|---------------|
| Chrome | 55+ | Full support |
| Firefox | 55+ | Full support |
| Safari | 11+ | Full support |
| Edge | 79+ (Chromium-based) | Full support |
| IE | Not supported | Not compatible |

For older browsers, you can implement a fallback:

```javascript
function initCaptcha() {
  // Check for WebGL support (required for GameShield)
  const canvas = document.createElement('canvas');
  const hasWebGL = !!(window.WebGLRenderingContext && 
    (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  
  if (!hasWebGL) {
    // Fallback to a simpler CAPTCHA or message
    document.getElementById('captcha-container').innerHTML = 
      '<p>Your browser does not support our advanced CAPTCHA. Please upgrade your browser or use a different one.</p>';
    return;
  }
  
  // Initialize GameShield
  const gameShield = createGameShield({
    container: document.getElementById('captcha-container'),
    size: '400px'
  });
}
```

## Network and Firewall Issues

If you're behind a corporate firewall or in a restricted network environment:

1. **Allowlist Domains**: Ensure the following domains are allowed:
   - `api.gameshield.dev`
   - `cdn.gameshield.dev`
   - `assets.gameshield.dev`

2. **Proxy Configuration**: If you're using a proxy, make sure it's correctly configured for WebSocket connections.

3. **Self-Hosting**: For environments with strict network policies, consider self-hosting the GameShield resources. Contact our support team for more information.

## Debugging Tools

### Debug Mode

Enable debug mode to get detailed logging:

```javascript
import { configureCore } from '@gameshield/core';

configureCore({
  debug: true, // Enable debug logging
  logLevel: 'verbose' // 'error', 'warn', 'info', 'debug', or 'verbose'
});
```

### React DevTools

When using the React component, you can inspect it with React DevTools:

1. Install [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) browser extension
2. Open your page and inspect the GameShield component
3. Check the props and state to ensure everything is configured correctly

### Network Analysis

Use your browser's developer tools to analyze network requests:

1. Open developer tools (F12 or right-click → Inspect)
2. Go to the Network tab
3. Filter for requests to `gameshield.dev`
4. Check for any failed requests or error responses

### Server-Side Logging

Implement detailed logging in your server-side verification:

```javascript
// Node.js example
const { verifyToken, configureServer } = require('@gameshield/server');

// Enable server-side debugging
configureServer({
  debug: true,
  logLevel: 'verbose'
});

app.post('/api/verify-captcha', (req, res) => {
  const token = req.headers['x-captcha-token'] || req.body.captchaToken;
  
  console.log('Verifying token:', token);
  
  try {
    const verification = verifyToken(token);
    console.log('Verification result:', verification);
    
    if (verification.valid) {
      res.json({ success: true });
    } else {
      console.warn('Invalid CAPTCHA token:', verification.reason);
      res.status(400).json({ 
        success: false, 
        error: 'Invalid CAPTCHA',
        reason: verification.reason
      });
    }
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ success: false, error: 'Verification error' });
  }
});
```

## Common Error Codes

| Error Code | Description | Solution |
|------------|-------------|----------|
| `invalid_token` | The token is invalid or has expired | Generate a new CAPTCHA token |
| `token_already_used` | The token has already been verified | Generate a new CAPTCHA token |
| `invalid_secret_key` | The secret key is invalid | Check your server configuration |
| `rate_limit_exceeded` | Too many verification attempts | Implement rate limiting on your side |
| `network_error` | Failed to connect to verification API | Check your network connection |
| `game_not_completed` | The game was not successfully completed | Ensure the user completes the game |
| `behavior_analysis_failed` | Behavior analysis detected bot-like patterns | This is expected for automated tests |

## Getting Additional Help

If you're still experiencing issues:

1. **Check Documentation**: Review the package-specific documentation:
   - [@gameshield/core](/guide/packages/core)
   - [@gameshield/react](/guide/packages/react)
   - [@gameshield/server](/guide/packages/server)

2. **Community Forums**: Visit our [GitHub Discussions](https://github.com/ComputelessComputer/gameshield/discussions) to see if others have encountered similar issues.

3. **GitHub Issues**: Search existing [GitHub Issues](https://github.com/ComputelessComputer/gameshield/issues) or create a new one with detailed information about your problem.

4. **Contact Support**: For critical issues or if you have a support contract, contact our support team at support@gameshield.dev.

When reporting an issue, please include:

- GameShield package versions (@gameshield/core, @gameshield/react, @gameshield/server)
- Browser and OS information
- Detailed description of the problem
- Steps to reproduce
- Any error messages from the console
- Network request logs if applicable

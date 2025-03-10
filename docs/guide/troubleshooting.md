# Troubleshooting

This guide provides solutions to common issues you might encounter when implementing and using Gameshield.

## Common Issues

### CAPTCHA Not Displaying

If the CAPTCHA game isn't appearing on your page:

1. **Check Console Errors**: Open your browser's developer tools (F12 or right-click → Inspect) and check the console for any JavaScript errors.

2. **Verify API Key**: Ensure you're using a valid API key and that it's properly configured:

   ```javascript
   import { configure } from '@gameshield/captcha-sdk';

   configure({
     apiKey: 'YOUR_API_KEY', // Check this is correct
     environment: 'production'
   });
   ```

3. **Container Element**: Make sure the container element exists in the DOM when you initialize the CAPTCHA:

   ```javascript
   // Bad: Container might not exist yet
   document.addEventListener('DOMContentLoaded', () => {
     const captcha = generateCaptcha({
       container: document.getElementById('captcha-container')
     });
   });

   // Good: Wait for the element to be available
   function initCaptcha() {
     const container = document.getElementById('captcha-container');
     if (!container) {
       console.error('Captcha container not found');
       return;
     }
     
     const captcha = generateCaptcha({ container });
   }
   ```

4. **Network Issues**: Check if the CAPTCHA resources are being loaded correctly in the Network tab of your browser's developer tools.

5. **Content Security Policy (CSP)**: If you have a strict CSP, you may need to allow resources from Gameshield domains:

   ```html
   <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://cdn.gameshield.dev; connect-src 'self' https://api.gameshield.dev;">
   ```

### Verification Failures

If the CAPTCHA verification is failing:

1. **Token Expiration**: CAPTCHA tokens expire after 5 minutes. Ensure you're verifying the token promptly after it's generated.

2. **Server Configuration**: Check that your server-side verification is correctly implemented:

   ```javascript
   // Node.js example
   const { verifyToken } = require('@gameshield/captcha-sdk-server');

   // Make sure you're using the correct secret key
   const result = await verifyToken(token, 'YOUR_SECRET_KEY');
   ```

3. **Network Issues**: Ensure your server can reach the Gameshield verification API.

4. **Token Transmission**: Verify that the token is being correctly sent from the client to your server:

   ```javascript
   // Client-side
   fetch('/api/verify', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({ token: captchaToken })
   });
   ```

5. **Multiple Verifications**: Each token can only be verified once. If you're trying to verify the same token multiple times, subsequent attempts will fail.

### Performance Issues

If you're experiencing slow loading or performance issues:

1. **Lazy Loading**: Consider loading the CAPTCHA only when needed:

   ```javascript
   // Only load the CAPTCHA when the form is about to be submitted
   submitButton.addEventListener('click', (e) => {
     e.preventDefault();
     
     if (!captchaInitialized) {
       initCaptcha();
       captchaInitialized = true;
     } else {
       // Continue with form submission if CAPTCHA is already verified
       if (captchaVerified) {
         form.submit();
       }
     }
   });
   ```

2. **Resource Optimization**: Use the minified version of the SDK in production:

   ```html
   <script src="https://cdn.jsdelivr.net/npm/@gameshield/captcha-sdk@latest/dist/captcha-sdk.min.js"></script>
   ```

3. **Preconnect Hint**: Add preconnect hints to your HTML to establish early connections:

   ```html
   <link rel="preconnect" href="https://api.gameshield.dev">
   <link rel="preconnect" href="https://cdn.gameshield.dev">
   ```

4. **Game Type Selection**: Some game types are more resource-intensive than others. If performance is critical, specify lighter game types:

   ```javascript
   const captcha = generateCaptcha({
     container: document.getElementById('captcha-container'),
     gameTypes: ['simple-puzzle', 'pattern-match'] // Specify lighter game types
   });
   ```

### Mobile-Specific Issues

If you're having problems on mobile devices:

1. **Viewport Configuration**: Ensure your page has the correct viewport meta tag:

   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
   ```

2. **Touch Events**: Make sure touch events are not being blocked by other elements or event handlers.

3. **Container Size**: Ensure the CAPTCHA container has sufficient width and height on mobile screens:

   ```css
   .gameshield-container {
     width: 100%;
     min-height: 250px;
     max-width: 400px;
     margin: 0 auto;
   }
   ```

4. **Game Type Compatibility**: Some game types may work better on mobile than others. Consider specifying mobile-friendly game types:

   ```javascript
   const captcha = generateCaptcha({
     container: document.getElementById('captcha-container'),
     gameTypes: ['tap-sequence', 'simple-puzzle'] // Mobile-friendly games
   });
   ```

## Browser Compatibility

Gameshield supports all modern browsers, but you may encounter issues with older browsers:

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| Chrome | 60+ | Full support |
| Firefox | 55+ | Full support |
| Safari | 11+ | Full support |
| Edge | 79+ (Chromium-based) | Full support |
| IE | Not supported | Consider a polyfill or fallback |

For older browsers, you can implement a fallback:

```javascript
function initCaptcha() {
  if (typeof GameshieldCaptcha === 'undefined') {
    // Fallback to a simpler CAPTCHA or message
    document.getElementById('captcha-container').innerHTML = 
      '<p>Your browser does not support our advanced CAPTCHA. Please upgrade your browser or use a different one.</p>';
    return;
  }
  
  // Initialize Gameshield CAPTCHA
  const captcha = GameshieldCaptcha.generateCaptcha({
    container: document.getElementById('captcha-container')
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

3. **Self-Hosting**: For environments with strict network policies, consider self-hosting the Gameshield resources. Contact our support team for more information.

## Debugging Tools

### SDK Debug Mode

Enable debug mode to get detailed logging:

```javascript
import { configure } from '@gameshield/captcha-sdk';

configure({
  apiKey: 'YOUR_API_KEY',
  environment: 'development',
  debug: true // Enable debug logging
});
```

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
app.post('/api/verify-captcha', async (req, res) => {
  const { token } = req.body;
  
  console.log('Verifying token:', token);
  
  try {
    const result = await verifyToken(token);
    console.log('Verification result:', result);
    
    if (result.valid) {
      res.json({ success: true });
    } else {
      console.warn('Invalid CAPTCHA token:', result.error);
      res.status(400).json({ success: false, error: 'Invalid CAPTCHA' });
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
| `invalid_api_key` | The API key is invalid | Check your API key configuration |
| `rate_limit_exceeded` | Too many verification attempts | Implement rate limiting on your side |
| `network_error` | Failed to connect to verification API | Check your network connection |
| `game_not_completed` | The game was not successfully completed | Ensure the user completes the game |

## Getting Additional Help

If you're still experiencing issues:

1. **Check Documentation**: Review the [API Reference](/api/) for detailed information on all methods and options.

2. **Community Forums**: Visit our [GitHub Discussions](https://github.com/ComputelessComputer/gameshield/discussions) to see if others have encountered similar issues.

3. **GitHub Issues**: Search existing [GitHub Issues](https://github.com/ComputelessComputer/gameshield/issues) or create a new one with detailed information about your problem.

4. **Contact Support**: For critical issues or if you have a support contract, contact our support team at support@gameshield.dev.

When reporting an issue, please include:

- Gameshield SDK version
- Browser and OS information
- Detailed description of the problem
- Steps to reproduce
- Any error messages from the console
- Network request logs if applicable

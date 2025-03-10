# Installation Guide

This guide provides detailed instructions for installing and configuring Gameshield in different environments.

## Installation Methods

There are several ways to integrate Gameshield into your project:

### Method 1: NPM/PNPM Package

For projects using Node.js, installing via npm or pnpm is the recommended approach:

```bash
# Using npm
npm install @gameshield/captcha-sdk

# Using pnpm
pnpm add @gameshield/captcha-sdk
```

Then import it in your code:

```javascript
// ES Modules
import { generateCaptcha } from '@gameshield/captcha-sdk';

// CommonJS
const { generateCaptcha } = require('@gameshield/captcha-sdk');
```

### Method 2: CDN

For quick integration without a build step, you can use the CDN version:

```html
<!-- Latest version -->
<script src="https://cdn.jsdelivr.net/npm/@gameshield/captcha-sdk@latest/dist/captcha-sdk.min.js"></script>

<!-- Specific version (recommended for production) -->
<script src="https://cdn.jsdelivr.net/npm/@gameshield/captcha-sdk@1.0.0/dist/captcha-sdk.min.js"></script>
```

The SDK will be available globally as `GameshieldCaptcha`:

```javascript
const captcha = GameshieldCaptcha.generateCaptcha({
  container: document.getElementById('captcha-container')
});
```

### Method 3: Direct Download

You can download the JavaScript files directly and include them in your project:

1. Download the latest release from [GitHub Releases](https://github.com/your-username/gameshield/releases)
2. Extract the files
3. Include the script in your HTML:

```html
<script src="path/to/captcha-sdk.min.js"></script>
```

## Server-Side Component

For complete security, you should also install the server-side component to verify CAPTCHA tokens:

### Node.js

```bash
npm install @gameshield/captcha-sdk-server
```

```javascript
const { verifyToken } = require('@gameshield/captcha-sdk-server');

// In your API route handler
app.post('/verify-captcha', async (req, res) => {
  const { token } = req.body;
  
  try {
    const result = await verifyToken(token);
    if (result.valid) {
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, error: 'Invalid CAPTCHA' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Verification error' });
  }
});
```

### Other Server Environments

For other server environments (PHP, Python, Ruby, etc.), you can use our REST API directly:

```
POST https://api.gameshield.dev/verify
Content-Type: application/json

{
  "token": "CAPTCHA_TOKEN",
  "secret": "YOUR_SECRET_KEY"
}
```

## Configuration

After installation, you'll need to configure Gameshield with your API key:

```javascript
import { configure } from '@gameshield/captcha-sdk';

configure({
  apiKey: 'YOUR_API_KEY',
  environment: 'production' // or 'development'
});
```

## Next Steps

- See the [Getting Started](/guide/getting-started) guide for basic usage
- Explore [Game Types](/guide/game-types) to understand the different CAPTCHA challenges
- Check out [Integration Examples](/guide/integration-examples) for common scenarios

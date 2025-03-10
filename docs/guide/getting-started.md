# Getting Started with Gameshield

This guide will help you quickly integrate Gameshield into your web application to protect your forms and sensitive actions from bots.

## Prerequisites

Before you begin, make sure you have:

- A web application where you want to implement CAPTCHA protection
- Basic knowledge of HTML, CSS, and JavaScript
- Node.js and npm/pnpm installed (if using the npm package)

## Quick Start

### 1. Install the SDK

#### Using npm/pnpm

```bash
# Using npm
npm install @gameshield/captcha-sdk

# Using pnpm
pnpm add @gameshield/captcha-sdk
```

#### Using CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@gameshield/captcha-sdk@latest/dist/captcha-sdk.min.js"></script>
```

### 2. Add the CAPTCHA to your form

```html
<form id="my-form">
  <!-- Your form fields -->
  <input type="text" name="username" placeholder="Username">
  <input type="password" name="password" placeholder="Password">
  
  <!-- CAPTCHA container -->
  <div id="captcha-container"></div>
  
  <button type="submit">Submit</button>
</form>
```

### 3. Initialize the CAPTCHA

```javascript
// If using modules
import { generateCaptcha } from '@gameshield/captcha-sdk';

// Initialize the CAPTCHA
const captcha = generateCaptcha({
  container: document.getElementById('captcha-container'),
  onSuccess: () => {
    console.log('CAPTCHA completed successfully');
  },
  onFailure: () => {
    console.log('CAPTCHA failed');
  }
});

// Validate the form submission
document.getElementById('my-form').addEventListener('submit', function(event) {
  if (!captcha.isVerified()) {
    event.preventDefault();
    alert('Please complete the CAPTCHA challenge');
  }
});
```

## Server-side Verification

For enhanced security, you should also verify the CAPTCHA token on your server:

```javascript
// Server-side code (Node.js example)
const express = require('express');
const { verifyToken } = require('@gameshield/captcha-sdk/server');

const app = express();
app.use(express.json());

app.post('/api/form-submit', async (req, res) => {
  const { captchaToken, ...formData } = req.body;
  
  try {
    // Verify the CAPTCHA token
    const isValid = await verifyToken(captchaToken);
    
    if (!isValid) {
      return res.status(400).json({ error: 'CAPTCHA verification failed' });
    }
    
    // Process form submission
    // ...
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});
```

## Next Steps

- Check out the [Installation](/guide/installation) page for more detailed setup instructions
- Learn about different [Game Types](/guide/game-types) available in Gameshield
- See [Integration Examples](/guide/integration-examples) for common use cases
- Explore the [API Reference](/api/) for advanced configuration options

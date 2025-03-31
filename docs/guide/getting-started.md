# Getting Started with GameShield

This guide will help you quickly integrate GameShield into your application. GameShield uses a modular architecture, allowing you to use only the components you need.

## Installation

### React Applications

For React applications, you'll need the React component package:

```bash
# Using npm
npm install @gameshield/react

# Using yarn
yarn add @gameshield/react

# Using pnpm
pnpm add @gameshield/react
```

### Server-side Verification

If you need server-side verification (recommended for production):

```bash
# Using npm
npm install @gameshield/server

# Using yarn
yarn add @gameshield/server

# Using pnpm
pnpm add @gameshield/server
```

## Basic Integration

### Client-side Integration

Add the GameShield component to your form:

```jsx
import React, { useState } from 'react';
import { GameShield } from '@gameshield/react';

function ContactForm() {
  const [token, setToken] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token) {
      alert('Please complete the CAPTCHA verification');
      return;
    }
    
    // Include the token in your form submission
    const formData = new FormData(e.target);
    formData.append('captchaToken', token);
    
    // Send the form data to your server
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        alert('Form submitted successfully!');
      } else {
        alert('Form submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again later.');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>
      
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required></textarea>
      </div>
      
      <div className="captcha-container">
        <GameShield
          size="400px"
          gameType="random"
          difficulty="medium"
          onSuccess={(captchaToken) => {
            setToken(captchaToken);
            console.log('Verification successful!');
          }}
          onFailure={(reason) => {
            console.log('Verification failed:', reason);
          }}
        />
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
}

export default ContactForm;
```

### Server-side Verification

On your server, verify the token:

```javascript
import express from 'express';
import { verifyToken } from '@gameshield/server';

const app = express();
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { captchaToken } = req.body;
  
  // Verify the CAPTCHA token
  const verification = verifyToken(captchaToken);
  
  if (!verification.valid) {
    return res.status(400).json({
      success: false,
      message: 'CAPTCHA verification failed'
    });
  }
  
  // Token is valid, process the form submission
  // ...
  
  return res.status(200).json({
    success: true,
    message: 'Form submitted successfully'
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## Component Properties

The `GameShield` component accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | string \| number | `"400px"` | Size of the component (maintains 1:1 aspect ratio) |
| `gameType` | string | `"random"` | Type of game to display (`"pong"`, `"snake"`, `"breakout"`, `"dino-run"`, or `"random"`) |
| `difficulty` | string | `"medium"` | Difficulty level (`"easy"`, `"medium"`, or `"hard"`) |
| `onSuccess` | function | - | Callback when verification succeeds, receives token as parameter |
| `onFailure` | function | - | Callback when verification fails, receives reason as parameter |
| `onTimeout` | function | - | Callback when verification times out |
| `className` | string | `""` | Additional CSS class for styling |

## Next Steps

- Learn about the [architecture](/guide/architecture) of GameShield
- Explore the [@gameshield/core](/guide/packages/core) package
- Customize the [React component](/guide/packages/react)
- Set up [server-side verification](/guide/packages/server)

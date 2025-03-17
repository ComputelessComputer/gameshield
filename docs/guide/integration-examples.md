# Integration Examples

This guide provides practical examples of integrating Gameshield into various frameworks and environments.

## Frontend Frameworks

### React Integration

```jsx
import React, { useEffect, useRef } from 'react';
import { generateCaptcha } from '@gameshield/captcha-sdk';

function GameshieldCaptcha({ onVerify }) {
  const containerRef = useRef(null);
  const captchaRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && !captchaRef.current) {
      captchaRef.current = generateCaptcha({
        container: containerRef.current,
        onSuccess: (token) => {
          onVerify(token);
        }
      });
    }

    return () => {
      if (captchaRef.current) {
        captchaRef.current.destroy();
        captchaRef.current = null;
      }
    };
  }, [onVerify]);

  return <div ref={containerRef} className="gameshield-container"></div>;
}

// Usage in a form
function ContactForm() {
  const [token, setToken] = React.useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert('Please complete the CAPTCHA');
      return;
    }
    
    // Submit form with token
    const formData = new FormData(e.target);
    formData.append('captchaToken', token);
    
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      // Handle response
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <input type="text" name="name" placeholder="Your Name" required />
      <input type="email" name="email" placeholder="Your Email" required />
      
      {/* Gameshield CAPTCHA */}
      <GameshieldCaptcha onVerify={setToken} />
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Vue.js Integration

```vue
<template>
  <div>
    <div ref="captchaContainer" class="gameshield-container"></div>
  </div>
</template>

<script>
import { generateCaptcha } from '@gameshield/captcha-sdk';

export default {
  name: 'GameshieldCaptcha',
  props: {
    onVerify: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      captchaInstance: null
    };
  },
  mounted() {
    this.initCaptcha();
  },
  beforeUnmount() {
    if (this.captchaInstance) {
      this.captchaInstance.destroy();
      this.captchaInstance = null;
    }
  },
  methods: {
    initCaptcha() {
      this.captchaInstance = generateCaptcha({
        container: this.$refs.captchaContainer,
        onSuccess: (token) => {
          this.onVerify(token);
        }
      });
    }
  }
};
</script>

<!-- Usage in a form component -->
<template>
  <form @submit.prevent="handleSubmit">
    <!-- Form fields -->
    <input type="text" v-model="name" placeholder="Your Name" required />
    <input type="email" v-model="email" placeholder="Your Email" required />
    
    <!-- Gameshield CAPTCHA -->
    <gameshield-captcha :on-verify="setCaptchaToken" />
    
    <button type="submit" :disabled="!captchaToken">Submit</button>
  </form>
</template>

<script>
import GameshieldCaptcha from './GameshieldCaptcha.vue';

export default {
  components: {
    GameshieldCaptcha
  },
  data() {
    return {
      name: '',
      email: '',
      captchaToken: null
    };
  },
  methods: {
    setCaptchaToken(token) {
      this.captchaToken = token;
    },
    async handleSubmit() {
      if (!this.captchaToken) {
        alert('Please complete the CAPTCHA');
        return;
      }
      
      try {
        const response = await fetch('/api/submit-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            captchaToken: this.captchaToken
          })
        });
        const data = await response.json();
        // Handle response
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
  }
};
</script>
```

### Angular Integration

```typescript
// gameshield-captcha.component.ts
import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { generateCaptcha } from '@gameshield/captcha-sdk';

@Component({
  selector: 'app-gameshield-captcha',
  template: '<div #captchaContainer class="gameshield-container"></div>'
})
export class GameshieldCaptchaComponent implements OnInit, OnDestroy {
  @ViewChild('captchaContainer', { static: true }) captchaContainer!: ElementRef;
  @Output() verify = new EventEmitter<string>();
  
  private captchaInstance: any = null;

  ngOnInit() {
    this.initCaptcha();
  }

  ngOnDestroy() {
    if (this.captchaInstance) {
      this.captchaInstance.destroy();
      this.captchaInstance = null;
    }
  }

  private initCaptcha() {
    this.captchaInstance = generateCaptcha({
      container: this.captchaContainer.nativeElement,
      onSuccess: (token: string) => {
        this.verify.emit(token);
      }
    });
  }
}

// Usage in a form component
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-form',
  template: `
    <form (ngSubmit)="onSubmit()" [formGroup]="contactForm">
      <input type="text" formControlName="name" placeholder="Your Name" required>
      <input type="email" formControlName="email" placeholder="Your Email" required>
      
      <app-gameshield-captcha (verify)="setCaptchaToken($event)"></app-gameshield-captcha>
      
      <button type="submit" [disabled]="!captchaToken || contactForm.invalid">Submit</button>
    </form>
  `
})
export class ContactFormComponent {
  contactForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });
  
  captchaToken: string | null = null;
  
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}
  
  setCaptchaToken(token: string) {
    this.captchaToken = token;
  }
  
  onSubmit() {
    if (!this.captchaToken) {
      alert('Please complete the CAPTCHA');
      return;
    }
    
    const formData = {
      ...this.contactForm.value,
      captchaToken: this.captchaToken
    };
    
    this.http.post('/api/submit-form', formData)
      .subscribe(
        response => {
          // Handle success
        },
        error => {
          console.error('Form submission error:', error);
        }
      );
  }
}
```

## Backend Verification

### Node.js (Express)

```javascript
const express = require('express');
const { verifyToken } from '@gameshield/captcha-sdk-server';

const app = express();
app.use(express.json());

app.post('/api/submit-form', async (req, res) => {
  const { captchaToken, ...formData } = req.body;
  
  // Verify the CAPTCHA token
  try {
    const verification = await verifyToken(captchaToken);
    
    if (!verification.valid) {
      return res.status(400).json({
        success: false,
        message: 'CAPTCHA verification failed'
      });
    }
    
    // Process the form data
    // ...
    
    return res.json({
      success: true,
      message: 'Form submitted successfully'
    });
  } catch (error) {
    console.error('CAPTCHA verification error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during verification'
    });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### PHP

```php
<?php
// verify_captcha.php

function verifyCaptchaToken($token) {
    $apiKey = 'YOUR_API_SECRET_KEY';
    $url = 'https://api.gameshield.dev/verify';
    
    $data = [
        'token' => $token,
        'secret' => $apiKey
    ];
    
    $options = [
        'http' => [
            'header' => "Content-type: application/json\r\n",
            'method' => 'POST',
            'content' => json_encode($data)
        ]
    ];
    
    $context = stream_context_create($options);
    $response = file_get_contents($url, false, $context);
    
    if ($response === FALSE) {
        return [
            'valid' => false,
            'error' => 'Failed to connect to verification API'
        ];
    }
    
    return json_decode($response, true);
}

// Usage in form handler
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $captchaToken = $_POST['captchaToken'] ?? '';
    
    if (empty($captchaToken)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'CAPTCHA token is required']);
        exit;
    }
    
    $verification = verifyCaptchaToken($captchaToken);
    
    if (!$verification['valid']) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'CAPTCHA verification failed']);
        exit;
    }
    
    // Process form data
    // ...
    
    echo json_encode(['success' => true, 'message' => 'Form submitted successfully']);
}
?>
```

### Python (Flask)

```python
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

def verify_captcha_token(token):
    api_key = 'YOUR_API_SECRET_KEY'
    url = 'https://api.gameshield.dev/verify'
    
    data = {
        'token': token,
        'secret': api_key
    }
    
    try:
        response = requests.post(url, json=data)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {
            'valid': False,
            'error': str(e)
        }

@app.route('/api/submit-form', methods=['POST'])
def submit_form():
    data = request.json
    captcha_token = data.get('captchaToken')
    
    if not captcha_token:
        return jsonify({
            'success': False,
            'message': 'CAPTCHA token is required'
        }), 400
    
    verification = verify_captcha_token(captcha_token)
    
    if not verification.get('valid'):
        return jsonify({
            'success': False,
            'message': 'CAPTCHA verification failed'
        }), 400
    
    # Process form data
    # ...
    
    return jsonify({
        'success': True,
        'message': 'Form submitted successfully'
    })

if __name__ == '__main__':
    app.run(debug=True)
```

## Special Use Cases

### Multi-step Forms

For multi-step forms, you can verify the CAPTCHA at the final step:

```javascript
// Frontend (React example)
function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [captchaToken, setCaptchaToken] = useState(null);
  
  const handleNextStep = () => {
    setStep(step + 1);
  };
  
  const handlePrevStep = () => {
    setStep(step - 1);
  };
  
  const handleSubmit = async () => {
    if (!captchaToken) {
      alert('Please complete the CAPTCHA');
      return;
    }
    
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          captchaToken
        })
      });
      const data = await response.json();
      // Handle response
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };
  
  return (
    <div>
      {step === 1 && (
        <div>
          <h2>Step 1: Personal Information</h2>
          {/* Step 1 fields */}
          <button onClick={handleNextStep}>Next</button>
        </div>
      )}
      
      {step === 2 && (
        <div>
          <h2>Step 2: Additional Details</h2>
          {/* Step 2 fields */}
          <button onClick={handlePrevStep}>Back</button>
          <button onClick={handleNextStep}>Next</button>
        </div>
      )}
      
      {step === 3 && (
        <div>
          <h2>Step 3: Verification</h2>
          <GameshieldCaptcha onVerify={setCaptchaToken} />
          <button onClick={handlePrevStep}>Back</button>
          <button onClick={handleSubmit} disabled={!captchaToken}>Submit</button>
        </div>
      )}
    </div>
  );
}
```

### Rate Limiting and Timeouts

For enhanced security, implement rate limiting and token timeouts:

```javascript
// Server-side (Node.js example)
const express = require('express');
const { verifyToken } = require('@gameshield/captcha-sdk-server');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json());

// Rate limiting middleware
const formSubmitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per windowMs
  message: 'Too many form submissions from this IP, please try again later.'
});

app.post('/api/submit-form', formSubmitLimiter, async (req, res) => {
  const { captchaToken, ...formData } = req.body;
  
  // Verify the CAPTCHA token
  try {
    const verification = await verifyToken(captchaToken);
    
    if (!verification.valid) {
      return res.status(400).json({
        success: false,
        message: 'CAPTCHA verification failed'
      });
    }
    
    // Check token age (optional, if supported by your verification response)
    if (verification.timestamp) {
      const tokenAge = Date.now() - new Date(verification.timestamp).getTime();
      const maxTokenAge = 5 * 60 * 1000; // 5 minutes
      
      if (tokenAge > maxTokenAge) {
        return res.status(400).json({
          success: false,
          message: 'CAPTCHA token has expired, please try again'
        });
      }
    }
    
    // Process the form data
    // ...
    
    return res.json({
      success: true,
      message: 'Form submitted successfully'
    });
  } catch (error) {
    console.error('CAPTCHA verification error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during verification'
    });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## Next Steps

- Check out the [Customization](/guide/customization) guide to learn how to style and configure Gameshield
- Visit the [Troubleshooting](/guide/troubleshooting) page if you encounter any issues
- Explore the [API Reference](/api/) for detailed information on all available methods and options

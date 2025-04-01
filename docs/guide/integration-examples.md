# Integration Examples

This guide provides practical examples of integrating GameShield into various frameworks and environments.

## Frontend Frameworks

### React Integration

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
    
    // Submit form with token
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'X-CAPTCHA-Token': token
        },
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
      
      {/* GameShield CAPTCHA */}
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
      
      <button type="submit" disabled={!token}>Submit</button>
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
import { createGameShield } from '@gameshield/core';

export default {
  name: 'GameShieldCaptcha',
  props: {
    onVerify: {
      type: Function,
      required: true
    },
    gameType: {
      type: String,
      default: 'random'
    },
    difficulty: {
      type: String,
      default: 'medium'
    },
    size: {
      type: [String, Number],
      default: '400px'
    }
  },
  data() {
    return {
      gameShieldInstance: null
    };
  },
  mounted() {
    this.initCaptcha();
  },
  beforeUnmount() {
    if (this.gameShieldInstance) {
      this.gameShieldInstance.destroy();
      this.gameShieldInstance = null;
    }
  },
  methods: {
    initCaptcha() {
      this.gameShieldInstance = createGameShield({
        container: this.$refs.captchaContainer,
        gameType: this.gameType,
        difficulty: this.difficulty,
        size: this.size,
        onSuccess: (token) => {
          this.onVerify(token);
        },
        onFailure: (reason) => {
          this.$emit('failure', reason);
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
    
    <!-- GameShield CAPTCHA -->
    <game-shield-captcha 
      :on-verify="setCaptchaToken" 
      :game-type="'pong'"
      :difficulty="'easy'"
      :size="'450px'"
      @failure="handleFailure"
    />
    
    <button type="submit" :disabled="!captchaToken">Submit</button>
  </form>
</template>

<script>
import GameShieldCaptcha from './GameShieldCaptcha.vue';

export default {
  components: {
    GameShieldCaptcha
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
    handleFailure(reason) {
      console.error('CAPTCHA verification failed:', reason);
    },
    async handleSubmit() {
      if (!this.captchaToken) {
        alert('Please complete the CAPTCHA verification');
        return;
      }
      
      try {
        const response = await fetch('/api/submit-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CAPTCHA-Token': this.captchaToken
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email
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
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { createGameShield } from '@gameshield/core';

@Component({
  selector: 'app-gameshield-captcha',
  template: '<div #captchaContainer class="gameshield-container" [style.width]="size" [style.height]="size"></div>'
})
export class GameShieldCaptchaComponent implements OnInit, OnDestroy {
  @ViewChild('captchaContainer', { static: true }) captchaContainer!: ElementRef;
  @Output() verify = new EventEmitter<string>();
  @Output() failure = new EventEmitter<string>();
  
  @Input() gameType: string = 'random';
  @Input() difficulty: string = 'medium';
  @Input() size: string = '400px';
  
  private gameShieldInstance: any = null;

  ngOnInit() {
    this.initCaptcha();
  }

  ngOnDestroy() {
    if (this.gameShieldInstance) {
      this.gameShieldInstance.destroy();
      this.gameShieldInstance = null;
    }
  }

  private initCaptcha() {
    this.gameShieldInstance = createGameShield({
      container: this.captchaContainer.nativeElement,
      gameType: this.gameType,
      difficulty: this.difficulty,
      size: this.size,
      onSuccess: (token: string) => {
        this.verify.emit(token);
      },
      onFailure: (reason: string) => {
        this.failure.emit(reason);
      }
    });
  }
}

// contact-form.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contact-form',
  template: `
    <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" formControlName="name" class="form-control">
        <div *ngIf="contactForm.get('name')?.invalid && contactForm.get('name')?.touched">
          Name is required
        </div>
      </div>
      
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" formControlName="email" class="form-control">
        <div *ngIf="contactForm.get('email')?.invalid && contactForm.get('email')?.touched">
          Valid email is required
        </div>
      </div>
      
      <app-gameshield-captcha 
        (verify)="setCaptchaToken($event)"
        (failure)="handleFailure($event)"
        [gameType]="'breakout'"
        [difficulty]="'medium'"
        [size]="'450px'"
      ></app-gameshield-captcha>
      
      <button type="submit" [disabled]="!captchaToken || contactForm.invalid">Submit</button>
    </form>
  `
})
export class ContactFormComponent {
  contactForm: FormGroup = this.formBuilder.group({
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
  
  handleFailure(reason: string) {
    console.error('CAPTCHA verification failed:', reason);
  }
  
  onSubmit() {
    if (this.contactForm.invalid || !this.captchaToken) {
      return;
    }
    
    const headers = new HttpHeaders({
      'X-CAPTCHA-Token': this.captchaToken
    });
    
    this.http.post('/api/submit-form', this.contactForm.value, { headers })
      .subscribe(
        (response) => {
          console.log('Form submitted successfully', response);
        },
        (error) => {
          console.error('Error submitting form', error);
        }
      );
  }
}
```

## Backend Verification

### Node.js (Express)

```javascript
const express = require('express');
const { verifyToken } = require('@gameshield/server');

const app = express();
app.use(express.json());

app.post('/api/submit-form', async (req, res) => {
  // Get token from header or body
  const token = req.headers['x-captcha-token'] || req.body.captchaToken;
  
  if (!token) {
    return res.status(400).json({
      success: false,
      message: 'CAPTCHA token is required'
    });
  }
  
  // Verify the CAPTCHA token
  try {
    const verification = verifyToken(token);
    
    if (!verification.valid) {
      return res.status(400).json({
        success: false,
        message: 'CAPTCHA verification failed',
        reason: verification.reason
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
    $secretKey = getenv('GAMESHIELD_SECRET_KEY');
    $url = 'https://api.gameshield.dev/verify';
    
    $data = [
        'token' => $token,
        'secret' => $secretKey
    ];
    
    $options = [
        'http' => [
            'header'  => "Content-type: application/json\r\n",
            'method'  => 'POST',
            'content' => json_encode($data)
        ]
    ];
    
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    
    if ($result === FALSE) {
        return [
            'valid' => false,
            'reason' => 'Failed to connect to verification service'
        ];
    }
    
    return json_decode($result, true);
}

// Process form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get token from header or POST data
    $token = $_SERVER['HTTP_X_CAPTCHA_TOKEN'] ?? $_POST['captchaToken'] ?? '';
    
    if (empty($token)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'CAPTCHA token is required']);
        exit;
    }
    
    $verification = verifyCaptchaToken($token);
    
    if (!$verification['valid']) {
        http_response_code(400);
        echo json_encode([
            'success' => false, 
            'message' => 'CAPTCHA verification failed',
            'reason' => $verification['reason'] ?? 'Unknown reason'
        ]);
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
import os

app = Flask(__name__)

def verify_captcha_token(token):
    secret_key = os.environ.get('GAMESHIELD_SECRET_KEY')
    url = 'https://api.gameshield.dev/verify'
    
    data = {
        'token': token,
        'secret': secret_key
    }
    
    try:
        response = requests.post(url, json=data)
        return response.json()
    except Exception as e:
        return {
            'valid': False,
            'reason': str(e)
        }

@app.route('/api/submit-form', methods=['POST'])
def submit_form():
    # Get token from header or JSON data
    token = request.headers.get('X-CAPTCHA-Token') or request.json.get('captchaToken')
    
    if not token:
        return jsonify({
            'success': False,
            'message': 'CAPTCHA token is required'
        }), 400
    
    verification = verify_captcha_token(token)
    
    if not verification.get('valid'):
        return jsonify({
            'success': False,
            'message': 'CAPTCHA verification failed',
            'reason': verification.get('reason', 'Unknown reason')
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

```jsx
// React example
import React, { useState } from 'react';
import { GameShield } from '@gameshield/react';

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
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async () => {
    if (!captchaToken) {
      alert('Please complete the CAPTCHA verification');
      return;
    }
    
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CAPTCHA-Token': captchaToken
        },
        body: JSON.stringify(formData)
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
          <input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            value={formData.name || ''} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Your Email" 
            value={formData.email || ''} 
            onChange={handleChange} 
            required 
          />
          <button onClick={handleNextStep}>Next</button>
        </div>
      )}
      
      {step === 2 && (
        <div>
          <h2>Step 2: Additional Details</h2>
          <textarea 
            name="message" 
            placeholder="Your Message" 
            value={formData.message || ''} 
            onChange={handleChange} 
            required 
          />
          <button onClick={handlePrevStep}>Back</button>
          <button onClick={handleNextStep}>Next</button>
        </div>
      )}
      
      {step === 3 && (
        <div>
          <h2>Step 3: Verification</h2>
          <GameShield
            size="400px"
            gameType="random"
            difficulty="medium"
            onSuccess={setCaptchaToken}
          />
          <button onClick={handlePrevStep}>Back</button>
          <button onClick={handleSubmit} disabled={!captchaToken}>Submit</button>
        </div>
      )}
    </div>
  );
}
```

### Rate Limiting and Security

For enhanced security, implement rate limiting and additional security measures:

```javascript
// Server-side (Node.js example)
const express = require('express');
const { verifyToken, configureServer } = require('@gameshield/server');
const rateLimit = require('express-rate-limit');

// Configure GameShield server
configureServer({
  secretKey: process.env.GAMESHIELD_SECRET_KEY,
  tokenExpiration: 300, // 5 minutes in seconds
  rateLimit: {
    enabled: true,
    maxRequests: 100,
    windowMs: 15 * 60 * 1000 // 15 minutes
  },
  ipProtection: {
    enabled: true,
    blacklist: [],
    suspiciousAttempts: 5
  }
});

const app = express();
app.use(express.json());

// Rate limiting middleware
const formSubmitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per windowMs
  message: 'Too many form submissions from this IP, please try again later.'
});

app.post('/api/submit-form', formSubmitLimiter, async (req, res) => {
  const token = req.headers['x-captcha-token'] || req.body.captchaToken;
  
  if (!token) {
    return res.status(400).json({
      success: false,
      message: 'CAPTCHA token is required'
    });
  }
  
  // Verify the CAPTCHA token
  try {
    const verification = verifyToken(token);
    
    if (!verification.valid) {
      return res.status(400).json({
        success: false,
        message: 'CAPTCHA verification failed',
        reason: verification.reason
      });
    }
    
    // Access behavior metrics for additional security checks
    const { behaviorMetrics } = verification.data;
    
    if (behaviorMetrics.confidence < 0.7) {
      return res.status(400).json({
        success: false,
        message: 'Suspicious behavior detected'
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

## Next Steps

- Check out the [Behavior Analysis](/guide/behavior-analysis) guide to learn how GameShield detects bots
- Visit the [Troubleshooting](/guide/troubleshooting) page if you encounter any issues
- Explore the API references for [@gameshield/core](/guide/packages/core), [@gameshield/react](/guide/packages/react), and [@gameshield/server](/guide/packages/server) packages

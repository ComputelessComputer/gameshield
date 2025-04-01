# @gameshield/react

The `@gameshield/react` package provides React components for easy integration of GameShield into React applications. It's built on top of the `@gameshield/core` package and offers a seamless way to add game-based CAPTCHA verification to your forms.

## Installation

```bash
# Using npm
npm install @gameshield/react

# Using yarn
yarn add @gameshield/react

# Using pnpm
pnpm add @gameshield/react
```

## Key Features

- **Ready-to-use Components**: Drop-in solution for React applications
- **React Hooks**: Custom hooks for advanced use cases
- **TypeScript Support**: Full type definitions for better developer experience
- **Responsive Design**: Automatically adapts to different screen sizes
- **Customizable**: Theming and styling options to match your application

## Basic Usage

Add the GameShield component to your form:

```jsx
import React, { useState } from 'react';
import { GameShield } from '@gameshield/react';

function ContactForm() {
  const [token, setToken] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!token) {
      alert('Please complete the CAPTCHA verification');
      return;
    }
    
    // Submit the form with the token
    console.log('Form submitted with token:', token);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      
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
```

## Component API

### GameShield Component

The main component for adding CAPTCHA verification to your application.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | string \| number | `"400px"` | Size of the component (maintains 1:1 aspect ratio) |
| `gameType` | string | `"random"` | Type of game to display (`"pong"`, `"snake"`, `"breakout"`, `"dino-run"`, or `"random"`) |
| `difficulty` | string | `"medium"` | Difficulty level (`"easy"`, `"medium"`, or `"hard"`) |
| `onSuccess` | function | - | Callback when verification succeeds, receives token as parameter |
| `onFailure` | function | - | Callback when verification fails, receives reason as parameter |
| `onTimeout` | function | - | Callback when verification times out |
| `className` | string | `""` | Additional CSS class for styling |
| `style` | object | `{}` | Additional inline styles |

#### Methods

The `GameShield` component exposes the following methods via a ref:

```jsx
import React, { useRef } from 'react';
import { GameShield } from '@gameshield/react';

function MyForm() {
  const gameShieldRef = useRef(null);
  
  const handleReset = () => {
    if (gameShieldRef.current) {
      gameShieldRef.current.reset();
    }
  };
  
  return (
    <div>
      <GameShield ref={gameShieldRef} />
      <button onClick={handleReset}>Reset CAPTCHA</button>
    </div>
  );
}
```

Available methods:

- `reset()`: Resets the CAPTCHA to its initial state

## Advanced Usage

### Custom Styling

You can customize the appearance of the GameShield component using CSS:

```jsx
import { GameShield } from '@gameshield/react';
import './custom-captcha.css';

function MyForm() {
  return (
    <GameShield
      className="custom-captcha"
      size="450px"
    />
  );
}
```

```css
/* custom-captcha.css */
.custom-captcha {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
```

### Using with Form Libraries

#### Formik Example

```jsx
import { Formik, Form, Field } from 'formik';
import { GameShield } from '@gameshield/react';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  captchaToken: Yup.string().required('Please complete the CAPTCHA')
});

function ContactForm() {
  return (
    <Formik
      initialValues={{ name: '', email: '', captchaToken: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log('Form submitted:', values);
      }}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
          </div>
          
          <div>
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
          </div>
          
          <div>
            <GameShield
              onSuccess={(token) => {
                setFieldValue('captchaToken', token);
              }}
            />
            {errors.captchaToken && touched.captchaToken ? (
              <div>{errors.captchaToken}</div>
            ) : null}
          </div>
          
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}
```

#### React Hook Form Example

```jsx
import { useForm } from 'react-hook-form';
import { GameShield } from '@gameshield/react';

function ContactForm() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log('Form submitted:', data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...register('name', { required: true })} />
        {errors.name && <span>This field is required</span>}
      </div>
      
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
        {errors.email && <span>Please enter a valid email</span>}
      </div>
      
      <div>
        <GameShield
          onSuccess={(token) => {
            setValue('captchaToken', token, { shouldValidate: true });
          }}
        />
        <input type="hidden" {...register('captchaToken', { required: true })} />
        {errors.captchaToken && <span>Please complete the CAPTCHA</span>}
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Server-side Rendering (SSR)

The GameShield component uses browser-specific APIs like `ResizeObserver` and PixiJS, which are not available during server-side rendering. To use it with Next.js or other SSR frameworks, you need to dynamically import it:

```jsx
// ContactForm.js
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the GameShield component with SSR disabled
const GameShield = dynamic(
  () => import('@gameshield/react').then((mod) => mod.GameShield),
  { ssr: false }
);

function ContactForm() {
  const [token, setToken] = useState(null);
  
  return (
    <form>
      {/* Form fields */}
      
      <div className="captcha-container">
        <GameShield
          onSuccess={setToken}
        />
      </div>
      
      <button type="submit" disabled={!token}>
        Submit
      </button>
    </form>
  );
}

export default ContactForm;
```

## TypeScript Support

The package includes full TypeScript definitions:

```tsx
import React from 'react';
import { GameShield, GameShieldProps, GameType, Difficulty } from '@gameshield/react';

// Type-safe props
const gameType: GameType = 'pong';
const difficulty: Difficulty = 'medium';

function MyForm() {
  // Type-safe event handlers
  const handleSuccess = (token: string) => {
    console.log('Verification successful:', token);
  };
  
  const handleFailure = (reason: string) => {
    console.log('Verification failed:', reason);
  };
  
  // All props are type-checked
  const props: GameShieldProps = {
    size: '400px',
    gameType,
    difficulty,
    onSuccess: handleSuccess,
    onFailure: handleFailure
  };
  
  return <GameShield {...props} />;
}
```

## Next Steps

- Learn about [server-side verification](/guide/packages/server) with the server package
- Explore [integration examples](/guide/integration-examples) for common use cases

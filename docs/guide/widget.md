# Widget

The GameShield widget is a [Lit](https://lit.dev) web component. Add it to any page with a single HTML tag.

## Basic usage

```html
<gameshield-captcha
  site-key="gs_pk_..."
  api-url="https://your-api.com"
></gameshield-captcha>

<script type="module" src="https://your-cdn.com/gameshield-widget.js"></script>
```

## Attributes

| Attribute              | Type                         | Default                | Description                         |
| ---------------------- | ---------------------------- | ---------------------- | ----------------------------------- |
| `site-key`             | `string`                     | —                      | Your public site key (`gs_pk_...`)  |
| `api-url`              | `string`                     | `http://localhost:3001` | GameShield API endpoint            |
| `theme`                | `'light' \| 'dark' \| 'auto'` | `'auto'`              | Color scheme                        |
| `data-callback`        | `string`                     | —                      | Global function name called on success |
| `data-error-callback`  | `string`                     | —                      | Global function name called on error   |

## Callbacks

### Option 1: Global functions

```html
<gameshield-captcha
  site-key="gs_pk_..."
  data-callback="onVerified"
  data-error-callback="onError"
></gameshield-captcha>

<script>
  function onVerified(token) {
    console.log('Verified:', token);
    document.getElementById('captcha-token').value = token;
  }

  function onError(error) {
    console.error('Failed:', error);
  }
</script>
```

### Option 2: Events

```js
const captcha = document.querySelector('gameshield-captcha');

captcha.addEventListener('success', (e) => {
  console.log('Token:', e.detail.token);
});

captcha.addEventListener('error', (e) => {
  console.error('Error:', e.detail.error);
});
```

## Reading the token

After successful verification, retrieve the token programmatically:

```js
const captcha = document.querySelector('gameshield-captcha');
const token = captcha.getVerificationToken();
```

## Form integration

A typical form setup:

```html
<form id="signup" method="POST" action="/register">
  <input type="email" name="email" required />
  <input type="password" name="password" required />

  <gameshield-captcha
    site-key="gs_pk_..."
    data-callback="onVerified"
  ></gameshield-captcha>
  <input type="hidden" name="captcha-token" id="captcha-token" />

  <button type="submit">Sign Up</button>
</form>

<script>
  function onVerified(token) {
    document.getElementById('captcha-token').value = token;
  }
</script>
```

# Gameshield - Generative Game CAPTCHA

## Overview

Gameshield is an innovative, open-source CAPTCHA system designed to prevent web crawling and bot interactions using interactive, randomly generated games. Unlike traditional CAPTCHA methods, which rely on text-based or image recognition challenges, this approach leverages generative games that require real-time human interaction to verify authenticity.

## Features

- 🎮 Interactive Generative Games – Unique mini-games that adapt dynamically.
- 🔒 Enhanced Security – Resistant to automated solvers and AI-based attacks.
- 🖥️ Easy Integration – Comes with a lightweight SDK for developers.
- 🌍 Accessible – Designed to be user-friendly and inclusive.
- 🚀 Optimized for Performance – Runs efficiently in both browser and mobile environments.

## Monorepo Structure

This project follows a monorepo architecture using Turborepo + pnpm for efficient package management.

```
/gameshield
│── /apps
│ ├── landing-page                            # Public-facing website
│ ├── api                                     # Backend API for verification
│ ├── admin-dashboard                         # (Optional) Admin UI for monitoring
│── /packages
│ ├── game-core                               # Core game logic
│ ├── captcha-sdk                             # SDK for integration
│ ├── shared-ui                               # Reusable UI components
│ ├── utils                                   # Helper functions
│── /infra # Deployment & infrastructure
│── /docs # Documentation
│── package.json                              # Root dependencies & scripts
│── turbo.json                                # Monorepo configuration
│── .github/workflows                         # CI/CD setup
```

## Getting Started

### Prerequisites

Ensure you have the following installed:

- pnpm (for package management)
- Node.js (LTS) (for backend development)
- Turborepo (for monorepo management)

### Installation

Clone the repository and install dependencies:

```
git clone https://github.com/your-username/gameshield.git
cd gameshield
pnpm install
```

### Running the Project

To start all applications simultaneously:

```
pnpm run dev
```

This will:

- Start the landing page at http://localhost:3000
- Start the API server at http://localhost:3001

### Running Individual Components

To run just the frontend:

```
pnpm --filter landing-page dev
```

To run the backend:

```
pnpm --filter api dev
```

### Integration Guide

#### Using the SDK

You can integrate the CAPTCHA into your website using the provided SDK:

```
pnpm add @gameshield/captcha-sdk
```

Example usage:

```javascript
import { generateCaptcha } from "@gameshield/captcha-sdk";

generateCaptcha({
  container: document.getElementById("captcha-container"),
});
```

## Deployment

### Frontend Deployment

```
pnpm --filter landing-page build
```

Host it on Vercel, Netlify, or any static hosting provider.

### Backend Deployment

```
pnpm --filter api build
```

Host it on Fly.io, Cloudflare Workers, or DigitalOcean.

## Contributing

We welcome contributions! Follow these steps to get involved:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Commit your changes (git commit -m "Add new feature").
4. Push to your branch (git push origin feature-branch).
5. Open a pull request.

## Roadmap

## License

This project is licensed under the MIT License.

## Contact

For any questions, feel free to open an issue or reach out at jeeheontransformers@gmail.com.

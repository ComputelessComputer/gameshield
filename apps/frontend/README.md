# GameShield Frontend

A Next.js application that demonstrates the integration of GameShield web components for secure and interactive CAPTCHA alternatives.

## Overview

This frontend application showcases the GameShield CAPTCHA system, which uses interactive mini-games to verify human users in a more engaging way than traditional CAPTCHAs. The application is built with Next.js and integrates with the GameShield web components package.

## Features

- Interactive game-based CAPTCHA verification
- Multiple game types (puzzle, maze, pattern)
- Adjustable difficulty levels (easy, medium, hard)
- Real-time verification status feedback
- Modern, responsive UI with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15.2.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm
- **Monorepo Structure**: Part of a Turborepo monorepo

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm 8.x or higher

### Installation

Since this is part of a monorepo, you should install dependencies at the root level:

```bash
# At the root of the monorepo
pnpm install
```

### Development

To start the development server:

```bash
# From the frontend directory
pnpm dev

# Or from the root of the monorepo
pnpm --filter frontend dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Build

To build the application:

```bash
# From the frontend directory
pnpm build

# Or from the root of the monorepo
pnpm --filter frontend build
```

## Integration with GameShield Web Components

This application demonstrates how to integrate the GameShield web components package in a Next.js application. The integration includes:

1. Importing the web components package
2. Handling TypeScript type definitions for custom elements
3. Managing component events and state
4. Providing a user-friendly interface for the CAPTCHA system

## Project Structure

- `src/app/` - Next.js App Router files
- `src/app/components/` - React components
- `src/app/page.tsx` - Main page component
- `src/types/` - TypeScript type definitions

## License

[MIT](LICENSE)

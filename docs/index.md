---
layout: home
title: GameShield
hero:
  name: "GameShield"
  text: "Game-as-a-CAPTCHA"
  tagline: Prevent bots with interactive games that humans love to play
  image:
    src: /logo.png
    alt: GameShield Logo
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/ComputelessComputer/gameshield

features:
  - icon: 🎮
    title: Interactive Games
    details: Verify users with fun mini-games instead of frustrating text challenges
  - icon: ⚛️
    title: React-based
    details: Seamlessly integrate with React applications using our dedicated components
  - icon: 🧠
    title: Behavior Analysis
    details: Advanced detection of human vs bot interaction patterns
  - icon: 🔒
    title: Enhanced Security
    details: Resistant to automated solvers and AI-based attacks
  - icon: 🚀
    title: Optimized Performance
    details: Lightweight and efficient in both browser and mobile environments
  - icon: 🧩
    title: Modular Architecture
    details: Use only what you need with our core, React, and server packages
---

## What is GameShield?

GameShield is an innovative, open-source CAPTCHA system designed to prevent web crawling and bot interactions using interactive, randomly generated games. Unlike traditional CAPTCHA methods, which rely on text-based or image recognition challenges, this approach leverages games that require real-time human interaction to verify authenticity.

## Quick Installation

```bash
# Install the React component
npm install @gameshield/react

# For server-side verification
npm install @gameshield/server
```

## Basic Usage

```jsx
import { GameShield } from "@gameshield/react";

function MyForm() {
  return (
    <form>
      <div className="captcha-container">
        <GameShield
          size="400px"
          gameType="random"
          difficulty="medium"
          onSuccess={(token) => console.log("Verified:", token)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Why GameShield?

Traditional CAPTCHAs frustrate users with illegible text or endless image grids. GameShield transforms verification into an engaging experience that users actually enjoy, while providing stronger security against automated attacks.

[Learn more about how it works →](/guide/how-it-works)

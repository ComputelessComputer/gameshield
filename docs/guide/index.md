# What is GameShield?

GameShield is an innovative CAPTCHA system that uses interactive games to verify human users instead of traditional text or image recognition challenges. By leveraging the natural interaction patterns of humans, GameShield provides a more engaging and effective way to protect your website from bots.

## The Problem with Traditional CAPTCHAs

Traditional CAPTCHAs have several drawbacks:

- **Poor User Experience**: Distorted text is frustrating to decipher
- **Accessibility Issues**: Many CAPTCHAs are difficult for users with disabilities
- **Decreasing Effectiveness**: AI has become increasingly capable of solving traditional CAPTCHAs
- **User Frustration**: "Select all traffic lights" challenges can be ambiguous and time-consuming

## The GameShield Solution

GameShield addresses these issues by:

- **Engaging Interaction**: Using fun mini-games that users enjoy playing
- **Natural Behavior Analysis**: Analyzing interaction patterns that are difficult for bots to simulate
- **Adaptive Difficulty**: Adjusting challenge complexity based on risk assessment
- **Improved Accessibility**: Offering multiple game types to accommodate different abilities

## Key Features

- **Interactive Games**: A variety of mini-games that are fun to play
- **Behavior Analysis**: Advanced detection of human vs bot interaction patterns
- **Enhanced Security**: Multiple layers of protection against automated attacks
- **React Integration**: Seamless integration with React applications
- **Performance Optimized**: Lightweight implementation with minimal impact on page load
- **Modular Architecture**: Use only the packages you need

## How It Works

1. **Challenge Generation**: When a user needs to be verified, GameShield presents them with an interactive game challenge
2. **Interaction Monitoring**: As the user plays the game, GameShield monitors their interaction patterns
3. **Behavior Analysis**: The system analyzes the collected behavior data to determine if the user is human
4. **Token Generation**: Upon successful verification, a secure token is generated
5. **Server Verification**: The token can be verified server-side to confirm the user is human

## Modular Architecture

GameShield follows a modular architecture with three main packages:

- **[@gameshield/core](/guide/packages/core)**: The core logic engine with no UI dependencies
- **[@gameshield/react](/guide/packages/react)**: React UI components for easy integration
- **[@gameshield/server](/guide/packages/server)**: Server-side verification and security features

This modular approach allows you to use only the components you need and makes it easy to integrate GameShield into your existing application.

## Getting Started

Ready to add GameShield to your application? Continue to the [Getting Started](/guide/getting-started) guide.

// Export the main GameShield web component
export { GameShield } from './game-shield';

// Export types for public API using type export syntax
export type {
  GameType,
  Difficulty,
  GameOptions,
  GameResult,
  BehaviorMetrics
} from './types';

// Export utilities for server-side verification
export { SecurityUtils } from './security/security-utils';

// Define custom elements to ensure they're registered
import './game-shield';

// Add a convenient initialization function for non-module environments
declare global {
  interface Window {
    GameShield: {
      init: () => void;
    };
  }
}

// Initialize function for script tag usage
if (typeof window !== 'undefined') {
  window.GameShield = {
    init: () => {
      // This function is called when the script is loaded via a script tag
      console.log('GameShield initialized');
    }
  };
}

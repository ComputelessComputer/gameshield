/**
 * Utility functions for the GameShield Game Core
 * 
 * @packageDocumentation
 */

import { GameType, Difficulty } from './types';
import { DEFAULT_ASSETS_PATH } from './constants';

/**
 * Generate a random number between min and max (inclusive)
 * 
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Random number between min and max
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a random element from an array
 * 
 * @param array - Array to select from
 * @returns Random element from the array
 */
export function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Get random game type excluding specified types
 * 
 * @param exclude - Array of game types to exclude
 * @returns Random game type
 */
export function randomGameType(exclude: GameType[] = []): GameType {
  const gameTypes: GameType[] = ['puzzle', 'breakout', 'snake', 'pong', 'dino-run'];
  const availableTypes = gameTypes.filter(type => !exclude.includes(type));
  
  if (availableTypes.length === 0) {
    // If all types are excluded, default to puzzle
    return 'puzzle';
  }
  
  return randomElement(availableTypes);
}

/**
 * Convert difficulty level to numeric value
 * 
 * @param difficulty - Difficulty level
 * @returns Numeric difficulty value (0-1)
 */
export function difficultyToValue(difficulty: Difficulty): number {
  switch (difficulty) {
    case 'easy': return 0.25;
    case 'medium': return 0.5;
    case 'hard': return 0.85;
    default: return 0.5;
  }
}

/**
 * Check if an element is visible in the viewport
 * 
 * @param element - HTML element to check
 * @returns True if element is visible
 */
export function isElementVisible(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Load asset from URL with optional timeout
 * 
 * @param url - URL of the asset to load
 * @param timeout - Optional timeout in milliseconds
 * @returns Promise resolving to the loaded asset
 */
export function loadAsset(url: string, timeout = 5000): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    const timer = setTimeout(() => {
      reject(new Error(`Asset load timeout: ${url}`));
    }, timeout);
    
    img.onload = () => {
      clearTimeout(timer);
      resolve(img);
    };
    
    img.onerror = () => {
      clearTimeout(timer);
      reject(new Error(`Failed to load asset: ${url}`));
    };
    
    img.src = url;
  });
}

/**
 * Get asset URL based on asset name and type
 * 
 * @param assetName - Name of the asset
 * @param type - Asset type (png, jpg, svg, etc.)
 * @param assetsPath - Custom assets path (optional)
 * @returns Full URL to the asset
 */
export function getAssetUrl(
  assetName: string, 
  type = 'png', 
  assetsPath = DEFAULT_ASSETS_PATH
): string {
  return `${assetsPath}/${assetName}.${type}`;
}

/**
 * Debug logger (only active in development)
 * 
 * @param message - Message to log
 * @param data - Optional data to log
 */
export function debug(message: string, data?: any): void {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[GameShield] ${message}`, data || '');
  }
}

/**
 * Throttle function execution
 * 
 * @param fn - Function to throttle
 * @param delay - Delay in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
}

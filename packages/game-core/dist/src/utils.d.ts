/**
 * Utility functions for the GameShield Game Core
 *
 * @packageDocumentation
 */
import { GameType, Difficulty } from './types';
/**
 * Generate a random number between min and max (inclusive)
 *
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Random number between min and max
 */
export declare function randomInt(min: number, max: number): number;
/**
 * Generate a random element from an array
 *
 * @param array - Array to select from
 * @returns Random element from the array
 */
export declare function randomElement<T>(array: T[]): T;
/**
 * Get random game type excluding specified types
 *
 * @param exclude - Array of game types to exclude
 * @returns Random game type
 */
export declare function randomGameType(exclude?: GameType[]): GameType;
/**
 * Convert difficulty level to numeric value
 *
 * @param difficulty - Difficulty level
 * @returns Numeric difficulty value (0-1)
 */
export declare function difficultyToValue(difficulty: Difficulty): number;
/**
 * Check if an element is visible in the viewport
 *
 * @param element - HTML element to check
 * @returns True if element is visible
 */
export declare function isElementVisible(element: HTMLElement): boolean;
/**
 * Load asset from URL with optional timeout
 *
 * @param url - URL of the asset to load
 * @param timeout - Optional timeout in milliseconds
 * @returns Promise resolving to the loaded asset
 */
export declare function loadAsset(url: string, timeout?: number): Promise<HTMLImageElement>;
/**
 * Get asset URL based on asset name and type
 *
 * @param assetName - Name of the asset
 * @param type - Asset type (png, jpg, svg, etc.)
 * @param assetsPath - Custom assets path (optional)
 * @returns Full URL to the asset
 */
export declare function getAssetUrl(assetName: string, type?: string, assetsPath?: string): string;
/**
 * Debug logger (only active in development)
 *
 * @param message - Message to log
 * @param data - Optional data to log
 */
export declare function debug(message: string, data?: any): void;
/**
 * Throttle function execution
 *
 * @param fn - Function to throttle
 * @param delay - Delay in milliseconds
 * @returns Throttled function
 */
export declare function throttle<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void;

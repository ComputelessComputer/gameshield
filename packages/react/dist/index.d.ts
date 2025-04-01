import { GameType, Size, Difficulty } from '@gameshield/core';
import React$1 from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

/**
 * Props for the GameShield React component
 */
interface GameShieldProps {
    /**
     * The type of game to display
     * @default 'random'
     */
    gameType?: GameType;
    /**
     * The size of the game container (maintains 1:1 aspect ratio)
     * @default '400px'
     */
    size?: Size;
    /**
     * The difficulty level of the game
     * @default 'medium'
     */
    difficulty?: Difficulty;
    /**
     * Callback when verification succeeds, receives token as parameter
     */
    onSuccess?: (token: string) => void;
    /**
     * Callback when verification fails, receives reason as parameter
     */
    onFailure?: (reason: string) => void;
    /**
     * Callback when verification times out
     */
    onTimeout?: () => void;
    /**
     * Additional CSS class name for the container
     */
    className?: string;
    /**
     * Additional inline styles for the container
     */
    style?: React.CSSProperties;
}

/**
 * GameShield React component
 *
 * A CAPTCHA alternative that uses interactive games to verify human users.
 * Maintains a perfect 1:1 aspect ratio with a maximum size of 500px.
 */
declare const GameShield: React$1.ForwardRefExoticComponent<GameShieldProps & React$1.RefAttributes<{
    reset: () => void;
}>>;

/**
 * Options for the useGameShield hook
 */
interface UseGameShieldOptions {
    /**
     * The type of game to display
     * @default 'random'
     */
    gameType?: GameType;
    /**
     * The size of the game container (maintains 1:1 aspect ratio)
     * @default '400px'
     */
    size?: Size;
    /**
     * The difficulty level of the game
     * @default 'medium'
     */
    difficulty?: Difficulty;
    /**
     * Callback when verification succeeds, receives token as parameter
     */
    onSuccess?: (token: string) => void;
    /**
     * Callback when verification fails, receives reason as parameter
     */
    onFailure?: (reason: string) => void;
    /**
     * Callback when verification times out
     */
    onTimeout?: () => void;
}
/**
 * Return value of the useGameShield hook
 */
interface UseGameShieldReturn {
    /**
     * Ref to be attached to the container element
     */
    ref: React.RefObject<HTMLDivElement>;
    /**
     * Whether verification is in progress
     */
    isVerifying: boolean;
    /**
     * Whether verification was successful
     */
    isVerified: boolean;
    /**
     * Verification token (if successful)
     */
    token: string | null;
    /**
     * Error message (if verification failed)
     */
    error: string | null;
    /**
     * Reset the CAPTCHA
     */
    reset: () => void;
}
/**
 * Custom hook for using GameShield in React components
 *
 * @param options Configuration options
 * @returns Object with ref, state, and methods
 */
declare function useGameShield(options?: UseGameShieldOptions): UseGameShieldReturn;

interface CaptchaProps extends Omit<GameShieldProps, 'size'> {
    /**
     * Size of the captcha square in pixels
     * If undefined, the captcha will be contained within its parent element
     */
    size?: number;
}
/**
 * Captcha component for GameShield
 *
 * A simplified interface for the GameShield component that maintains a perfect 1:1 aspect ratio.
 * If size is undefined, it adapts to its parent container size.
 *
 * @example
 * ```tsx
 * <Captcha size={400} className="border rounded" />
 * ```
 */
declare function Captcha({ size, className, style, ...props }: CaptchaProps): react_jsx_runtime.JSX.Element;

export { Captcha, type CaptchaProps, GameShield, type GameShieldProps, useGameShield };

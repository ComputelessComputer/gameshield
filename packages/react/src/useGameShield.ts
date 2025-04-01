import { useRef, useEffect, useState, useCallback } from 'react';
import { createGameShield, GameType, Difficulty, Size } from '@gameshield/core';

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
export function useGameShield(options: UseGameShieldOptions = {}): UseGameShieldReturn {
  // Reference to the container element
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Reference to the GameShield instance
  const gameShieldRef = useRef<ReturnType<typeof createGameShield> | null>(null);
  
  // State for tracking verification status
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Default options
  const {
    gameType = 'random',
    size = '400px',
    difficulty = 'medium',
    onSuccess,
    onFailure,
    onTimeout
  } = options;
  
  // Reset function
  const reset = useCallback(() => {
    // Reset state
    setIsVerifying(true);
    setIsVerified(false);
    setToken(null);
    setError(null);
    
    // Reset GameShield instance
    if (gameShieldRef.current) {
      gameShieldRef.current.reset();
    }
  }, []);
  
  // Initialize GameShield when the container ref is available
  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    
    // Reset state
    setIsVerifying(true);
    setIsVerified(false);
    setToken(null);
    setError(null);
    
    // Success handler
    const handleSuccess = (newToken: string) => {
      setIsVerifying(false);
      setIsVerified(true);
      setToken(newToken);
      
      // Call external handler if provided
      if (onSuccess) {
        onSuccess(newToken);
      }
    };
    
    // Failure handler
    const handleFailure = (reason: string) => {
      setIsVerifying(false);
      setIsVerified(false);
      setError(reason);
      
      // Call external handler if provided
      if (onFailure) {
        onFailure(reason);
      }
    };
    
    // Timeout handler
    const handleTimeout = () => {
      setIsVerifying(false);
      setIsVerified(false);
      setError('Verification timed out');
      
      // Call external handler if provided
      if (onTimeout) {
        onTimeout();
      }
    };
    
    // Create GameShield instance
    gameShieldRef.current = createGameShield({
      container: containerRef.current,
      gameType,
      size,
      difficulty,
      onSuccess: handleSuccess,
      onFailure: handleFailure,
      onTimeout: handleTimeout
    });
    
    // Clean up on unmount
    return () => {
      if (gameShieldRef.current) {
        gameShieldRef.current.destroy();
        gameShieldRef.current = null;
      }
    };
  }, [gameType, size, difficulty, onSuccess, onFailure, onTimeout]);
  
  return {
    ref: containerRef as React.RefObject<HTMLDivElement>,
    isVerifying,
    isVerified,
    token,
    error,
    reset
  };
}

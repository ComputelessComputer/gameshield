import { GameType, Difficulty, Size } from '@gameshield/core';

/**
 * Props for the GameShield React component
 */
export interface GameShieldProps {
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

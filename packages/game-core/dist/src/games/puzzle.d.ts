/**
 * Puzzle Game Implementation
 *
 * A sliding puzzle game where players rearrange pieces to form a complete image.
 *
 * @packageDocumentation
 */
import * as PIXI from 'pixi.js';
import { BaseGame } from './base-game';
/**
 * Configuration specific to puzzle games
 */
export interface PuzzleGameConfig {
    /** Number of rows in the puzzle */
    rows?: number;
    /** Number of columns in the puzzle */
    columns?: number;
    /** Custom image URL to use for the puzzle */
    imageUrl?: string;
    /** Number of random moves to shuffle the puzzle */
    shuffleMoves?: number;
}
/**
 * Class representing a sliding puzzle game implementation
 */
export declare class PuzzleGame extends BaseGame {
    /** Grid dimensions */
    private rows;
    private columns;
    /** Puzzle pieces */
    private pieces;
    /** Empty cell position */
    private emptyCell;
    /** Original image */
    private image;
    /** Whether the puzzle is solved */
    private isSolved;
    /** Number of moves made */
    private moveCount;
    /** Piece positions in solved state */
    private solvedPositions;
    /** Custom configuration */
    private puzzleConfig;
    /** Piece metadata */
    private pieceMetadata;
    /**
     * Create a new PuzzleGame instance
     *
     * @param options - Game creation options
     */
    constructor(options: any);
    /**
     * Initialize the puzzle game
     *
     * @protected
     */
    protected initialize(): void;
    /**
     * Create puzzle pieces from the loaded image
     *
     * @private
     */
    private createPuzzlePieces;
    /**
     * Create a single puzzle piece
     *
     * @param row - Row position
     * @param col - Column position
     * @param width - Piece width
     * @param height - Piece height
     * @returns Puzzle piece sprite
     * @private
     */
    private createPiece;
    /**
     * Create a texture for a puzzle piece from the main image
     *
     * @param row - Row position
     * @param col - Column position
     * @param width - Piece width
     * @param height - Piece height
     * @returns Texture for the piece
     * @private
     */
    private createPieceTexture;
    /**
     * Get a random color for puzzle pieces
     *
     * @private
     */
    private getRandomColor;
    /**
     * Shuffle the puzzle by making random valid moves
     *
     * @private
     */
    private shufflePuzzle;
    /**
     * Get pieces adjacent to the empty cell
     *
     * @returns Array of neighboring pieces
     * @private
     */
    private getEmptyCellNeighbors;
    /**
     * Find a puzzle piece at a specific row and column
     *
     * @param row - Row position
     * @param col - Column position
     * @returns Puzzle piece at the position, or null if not found
     * @private
     */
    private findPieceAt;
    /**
     * Handle a click on a puzzle piece
     *
     * @param piece - Clicked puzzle piece
     * @private
     */
    private handlePieceClick;
    /**
     * Swap a piece with the empty cell
     *
     * @param piece - Piece to swap
     * @private
     */
    private swapWithEmptyCell;
    /**
     * Check if the puzzle is correctly solved
     *
     * @returns True if puzzle is solved
     * @private
     */
    private checkPuzzleSolved;
    /**
     * Handle the puzzle being solved
     *
     * @private
     */
    private handlePuzzleSolved;
    /**
     * Show success message when puzzle is completed
     *
     * @private
     */
    private showSuccessMessage;
    /**
     * Update game state on each frame
     *
     * @param ticker - PIXI ticker
     * @protected
     */
    protected update(ticker: PIXI.Ticker): void;
    /**
     * Get rows based on difficulty
     *
     * @returns Number of rows
     * @private
     */
    private getDifficultyBasedRows;
    /**
     * Get columns based on difficulty
     *
     * @returns Number of columns
     * @private
     */
    private getDifficultyBasedColumns;
    /**
     * Get number of shuffle moves based on difficulty
     *
     * @returns Number of shuffle moves
     * @private
     */
    private getDifficultyBasedShuffleMoves;
    /**
     * Get default image URL based on available assets
     *
     * @returns URL to the default puzzle image
     * @private
     */
    private getDefaultImageUrl;
}

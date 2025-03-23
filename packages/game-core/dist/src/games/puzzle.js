/**
 * Puzzle Game Implementation
 *
 * A sliding puzzle game where players rearrange pieces to form a complete image.
 *
 * @packageDocumentation
 */
import * as PIXI from 'pixi.js';
import { BaseGame } from './base-game';
import { randomInt, getAssetUrl } from '../utils';
/**
 * Class representing a sliding puzzle game implementation
 */
export class PuzzleGame extends BaseGame {
    /**
     * Create a new PuzzleGame instance
     *
     * @param options - Game creation options
     */
    constructor(options) {
        super(options.app, {
            width: options.width,
            height: options.height,
            difficulty: options.difficulty,
            backgroundColor: options.backgroundColor,
            assetsPath: options.assetsPath,
            onLoad: options.onLoad
        });
        /** Puzzle pieces */
        this.pieces = [];
        /** Empty cell position */
        this.emptyCell = { row: 0, col: 0 };
        /** Original image */
        this.image = null;
        /** Whether the puzzle is solved */
        this.isSolved = false;
        /** Number of moves made */
        this.moveCount = 0;
        /** Piece positions in solved state */
        this.solvedPositions = [];
        /** Piece metadata */
        this.pieceMetadata = new Map();
        // Set up puzzle specific options based on difficulty
        this.puzzleConfig = {
            rows: options.rows || this.getDifficultyBasedRows(),
            columns: options.columns || this.getDifficultyBasedColumns(),
            imageUrl: options.imageUrl || this.getDefaultImageUrl(),
            shuffleMoves: options.shuffleMoves || this.getDifficultyBasedShuffleMoves()
        };
        this.rows = this.puzzleConfig.rows;
        this.columns = this.puzzleConfig.columns;
        // Set completion callback if provided
        if (options.onComplete) {
            this.setCompletionCallback(options.onComplete);
        }
        // Initialize the game
        this.init();
    }
    /**
     * Initialize the puzzle game
     *
     * @protected
     */
    initialize() {
        // Create a loading message
        const loadingText = new PIXI.Text('Loading puzzle...', {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xffffff
        });
        loadingText.anchor.set(0.5);
        loadingText.x = this.config.width / 2;
        loadingText.y = this.config.height / 2;
        this.container.addChild(loadingText);
        // Load the puzzle image
        PIXI.Assets.load(this.puzzleConfig.imageUrl)
            .then(texture => {
            // Remove loading text
            this.container.removeChild(loadingText);
            // Create the original image for reference
            this.image = new PIXI.Sprite(texture);
            this.image.width = this.config.width;
            this.image.height = this.config.height;
            // Create the puzzle pieces
            this.createPuzzlePieces();
            // Shuffle the puzzle
            this.shufflePuzzle();
            // Set up the game tick
            this.app.ticker.add(this.update.bind(this));
        })
            .catch(error => {
            console.error('Failed to load puzzle image:', error);
            // Show error message
            loadingText.text = 'Failed to load puzzle image!';
            loadingText.style.fill = 0xff0000;
        });
    }
    /**
     * Create puzzle pieces from the loaded image
     *
     * @private
     */
    createPuzzlePieces() {
        if (!this.image)
            return;
        const pieceWidth = this.config.width / this.columns;
        const pieceHeight = this.config.height / this.rows;
        // Store solved positions for later verification
        this.solvedPositions = [];
        // Create a container for pieces
        const piecesContainer = new PIXI.Container();
        this.container.addChild(piecesContainer);
        // Create each piece
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.columns; col++) {
                // Skip the last piece (will be empty)
                if (row === this.rows - 1 && col === this.columns - 1) {
                    this.emptyCell = { row, col };
                    continue;
                }
                const piece = this.createPiece(row, col, pieceWidth, pieceHeight);
                piecesContainer.addChild(piece);
                // Store the piece
                this.pieces.push(piece);
                // Store the solved position
                this.solvedPositions.push({
                    x: col * pieceWidth,
                    y: row * pieceHeight
                });
            }
        }
    }
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
    createPiece(row, col, width, height) {
        if (!this.image)
            throw new Error('Image not loaded');
        // Create a texture from a part of the original image
        const texture = this.createPieceTexture(row, col, width, height);
        // Create sprite from the texture
        const piece = new PIXI.Sprite(texture);
        // Position the piece
        piece.x = col * width;
        piece.y = row * height;
        piece.width = width;
        piece.height = height;
        // Add interactivity
        piece.eventMode = 'static';
        piece.cursor = 'pointer';
        piece.on('pointerdown', () => this.handlePieceClick(piece));
        // Store metadata for the piece using a Map instead of directly on the sprite
        this.pieceMetadata.set(piece, { row, col, originalIndex: row * this.columns + col });
        return piece;
    }
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
    createPieceTexture(row, col, width, height) {
        if (!this.image)
            throw new Error('Image not loaded');
        // For simplicity, create a new texture using a colored rectangle
        // In a real implementation, we would properly slice the source image
        const graphics = new PIXI.Graphics();
        graphics.beginFill(this.getRandomColor());
        graphics.drawRect(0, 0, width, height);
        graphics.endFill();
        // Add a number to identify the piece
        const text = new PIXI.Text(`${row},${col}`, {
            fontSize: 16,
            fill: 0xffffff,
        });
        text.anchor.set(0.5);
        text.position.set(width / 2, height / 2);
        graphics.addChild(text);
        // Generate texture from the graphics - using renderTexture in PIXI v8
        const renderTexture = PIXI.RenderTexture.create({
            width: width,
            height: height
        });
        this.app.renderer.render(graphics, { renderTexture });
        return renderTexture;
    }
    /**
     * Get a random color for puzzle pieces
     *
     * @private
     */
    getRandomColor() {
        const colors = [0x3498db, 0x2ecc71, 0xe74c3c, 0xf1c40f, 0x9b59b6, 0x1abc9c, 0xd35400];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    /**
     * Shuffle the puzzle by making random valid moves
     *
     * @private
     */
    shufflePuzzle() {
        const moves = this.puzzleConfig.shuffleMoves;
        // Make random moves
        for (let i = 0; i < moves; i++) {
            // Get neighbors of empty cell
            const neighbors = this.getEmptyCellNeighbors();
            // Pick a random neighbor to swap with empty cell
            if (neighbors.length > 0) {
                const randomIndex = Math.floor(Math.random() * neighbors.length);
                this.swapWithEmptyCell(neighbors[randomIndex]);
            }
        }
    }
    /**
     * Get pieces adjacent to the empty cell
     *
     * @returns Array of neighboring pieces
     * @private
     */
    getEmptyCellNeighbors() {
        const neighbors = [];
        const { row, col } = this.emptyCell;
        // Check each direction
        const directions = [
            { row: -1, col: 0 }, // up
            { row: 1, col: 0 }, // down
            { row: 0, col: -1 }, // left
            { row: 0, col: 1 } // right
        ];
        for (const dir of directions) {
            const newRow = row + dir.row;
            const newCol = col + dir.col;
            // If the new position is valid
            if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.columns) {
                // Find the piece at this position
                const piece = this.findPieceAt(newRow, newCol);
                if (piece) {
                    neighbors.push(piece);
                }
            }
        }
        return neighbors;
    }
    /**
     * Find a puzzle piece at a specific row and column
     *
     * @param row - Row position
     * @param col - Column position
     * @returns Puzzle piece at the position, or null if not found
     * @private
     */
    findPieceAt(row, col) {
        const pieceWidth = this.config.width / this.columns;
        const pieceHeight = this.config.height / this.rows;
        // Calculate expected position
        const x = col * pieceWidth;
        const y = row * pieceHeight;
        // Find a piece close to this position
        for (const piece of this.pieces) {
            const closeX = Math.abs(piece.x - x) < 5;
            const closeY = Math.abs(piece.y - y) < 5;
            if (closeX && closeY) {
                return piece;
            }
        }
        return null;
    }
    /**
     * Handle a click on a puzzle piece
     *
     * @param piece - Clicked puzzle piece
     * @private
     */
    handlePieceClick(piece) {
        if (!this.isRunning || this.isSolved)
            return;
        // Check if this piece is adjacent to the empty cell
        const neighbors = this.getEmptyCellNeighbors();
        if (neighbors.includes(piece)) {
            // Swap piece with empty cell
            this.swapWithEmptyCell(piece);
            this.moveCount++;
            // Check if puzzle is solved
            if (this.checkPuzzleSolved()) {
                this.isSolved = true;
                this.handlePuzzleSolved();
            }
        }
    }
    /**
     * Swap a piece with the empty cell
     *
     * @param piece - Piece to swap
     * @private
     */
    swapWithEmptyCell(piece) {
        // Get the piece metadata
        const metadata = this.pieceMetadata.get(piece);
        if (!metadata)
            return;
        // Store the piece position
        const pieceX = piece.x;
        const pieceY = piece.y;
        // Calculate empty cell position
        const emptyCellX = this.emptyCell.col * (this.config.width / this.columns);
        const emptyCellY = this.emptyCell.row * (this.config.height / this.rows);
        // Move the piece to the empty cell
        piece.x = emptyCellX;
        piece.y = emptyCellY;
        // Update metadata for the piece
        const oldRow = metadata.row;
        const oldCol = metadata.col;
        metadata.row = this.emptyCell.row;
        metadata.col = this.emptyCell.col;
        this.pieceMetadata.set(piece, metadata);
        // Update empty cell to the piece's old position
        this.emptyCell.row = oldRow;
        this.emptyCell.col = oldCol;
    }
    /**
     * Check if the puzzle is correctly solved
     *
     * @returns True if puzzle is solved
     * @private
     */
    checkPuzzleSolved() {
        // For each piece, check if it's in its original position
        for (const piece of this.pieces) {
            const metadata = this.pieceMetadata.get(piece);
            if (!metadata)
                continue;
            // If this is the empty cell, continue
            if (metadata.row === this.rows - 1 && metadata.col === this.columns - 1) {
                continue;
            }
            // Check if the piece is in the correct position
            if (metadata.row * this.columns + metadata.col !== metadata.originalIndex) {
                return false;
            }
        }
        return true;
    }
    /**
     * Handle the puzzle being solved
     *
     * @private
     */
    handlePuzzleSolved() {
        // Calculate score based on time and moves
        const timeFactor = Math.max(0, 1 - (Date.now() - this.startTime) / 60000); // 1 minute max
        const movesFactor = Math.max(0, 1 - this.moveCount / (this.rows * this.columns * 3));
        // Weight time more than moves
        const score = Math.round((timeFactor * 0.7 + movesFactor * 0.3) * 100);
        // Show success message
        this.showSuccessMessage();
        // Complete the game
        this.complete(true, score, {
            moves: this.moveCount,
            time: Date.now() - this.startTime,
            grid: `${this.rows}x${this.columns}`
        });
    }
    /**
     * Show success message when puzzle is completed
     *
     * @private
     */
    showSuccessMessage() {
        // Create overlay
        const overlay = new PIXI.Graphics();
        overlay.beginFill(0x000000, 0.7);
        overlay.drawRect(0, 0, this.config.width, this.config.height);
        overlay.endFill();
        this.container.addChild(overlay);
        // Create success message
        const message = new PIXI.Text('Puzzle Completed!', {
            fontFamily: 'Arial',
            fontSize: 32,
            fill: 0xffffff,
            align: 'center'
        });
        message.anchor.set(0.5);
        message.x = this.config.width / 2;
        message.y = this.config.height / 2;
        this.container.addChild(message);
        // Show additional stats
        const stats = new PIXI.Text(`Moves: ${this.moveCount}\nTime: ${((Date.now() - this.startTime) / 1000).toFixed(1)}s`, {
            fontFamily: 'Arial',
            fontSize: 20,
            fill: 0xffffff,
            align: 'center'
        });
        stats.anchor.set(0.5);
        stats.x = this.config.width / 2;
        stats.y = this.config.height / 2 + 60;
        this.container.addChild(stats);
    }
    /**
     * Update game state on each frame
     *
     * @param ticker - PIXI ticker
     * @protected
     */
    update(ticker) {
        const delta = ticker.deltaTime;
        // In a full implementation, this would:
        // - Apply any animations (like smooth piece movement)
        // - Check for puzzle completion if moves were made
        // - Update time and score displays
        // For demo purposes, check if puzzle is solved
        if (this.isRunning && !this.isSolved && this.checkPuzzleSolved()) {
            this.handlePuzzleSolved();
        }
    }
    /**
     * Get rows based on difficulty
     *
     * @returns Number of rows
     * @private
     */
    getDifficultyBasedRows() {
        switch (this.config.difficulty) {
            case 'easy': return 3;
            case 'medium': return 4;
            case 'hard': return 5;
            default: return 4;
        }
    }
    /**
     * Get columns based on difficulty
     *
     * @returns Number of columns
     * @private
     */
    getDifficultyBasedColumns() {
        switch (this.config.difficulty) {
            case 'easy': return 3;
            case 'medium': return 4;
            case 'hard': return 5;
            default: return 4;
        }
    }
    /**
     * Get number of shuffle moves based on difficulty
     *
     * @returns Number of shuffle moves
     * @private
     */
    getDifficultyBasedShuffleMoves() {
        const baseMoves = this.rows * this.columns * 2;
        switch (this.config.difficulty) {
            case 'easy': return baseMoves;
            case 'medium': return baseMoves * 2;
            case 'hard': return baseMoves * 3;
            default: return baseMoves * 2;
        }
    }
    /**
     * Get default image URL based on available assets
     *
     * @returns URL to the default puzzle image
     * @private
     */
    getDefaultImageUrl() {
        // Get a random image from the predefined set
        const images = [
            'puzzle1',
            'puzzle2',
            'puzzle3',
            'puzzle4'
        ];
        const imageName = images[randomInt(0, images.length - 1)];
        return getAssetUrl(imageName, 'jpg', this.config.assetsPath);
    }
}

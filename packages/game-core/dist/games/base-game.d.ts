import * as PIXI from "pixi.js";
import { BehaviorAnalyzer } from "../behavior-analysis";
export interface GameConfig {
    width?: number;
    height?: number;
    backgroundColor?: number;
    difficulty?: 'easy' | 'medium' | 'hard';
    successThreshold?: number;
    timeLimit?: number;
}
export interface GameResult {
    success: boolean;
    score: number;
    message: string;
    behaviorAnalysis?: {
        isHuman: boolean;
        confidence: number;
    };
}
export declare abstract class BaseGame {
    protected app: PIXI.Application;
    protected config: GameConfig;
    protected container: HTMLElement | null;
    protected onComplete: (result: GameResult) => void;
    protected behaviorAnalyzer: BehaviorAnalyzer;
    constructor(config?: GameConfig);
    setCompletionCallback(callback: (result: GameResult) => void): void;
    mount(container: HTMLElement | string): void;
    protected setupInteractionTracking(): void;
    protected completeGame(success: boolean, score: number, message: string): void;
    destroy(): void;
    protected abstract init(): void;
    protected abstract cleanup(): void;
}

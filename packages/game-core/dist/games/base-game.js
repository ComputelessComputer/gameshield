import * as PIXI from "pixi.js";
import { BehaviorAnalyzer } from "../behavior-analysis";
export class BaseGame {
    constructor(config = {}) {
        this.container = null;
        this.onComplete = () => { };
        this.config = {
            width: config.width || 400,
            height: config.height || 300,
            backgroundColor: config.backgroundColor || 0x1099bb,
            difficulty: config.difficulty || 'medium',
            successThreshold: config.successThreshold || 3,
            timeLimit: config.timeLimit || 30
        };
        this.app = new PIXI.Application({
            width: this.config.width,
            height: this.config.height,
            backgroundColor: this.config.backgroundColor
        });
        // Initialize behavior analyzer
        this.behaviorAnalyzer = new BehaviorAnalyzer();
    }
    setCompletionCallback(callback) {
        this.onComplete = callback;
    }
    mount(container) {
        if (typeof container === 'string') {
            const element = document.getElementById(container);
            if (!element) {
                throw new Error(`Container element with id '${container}' not found`);
            }
            this.container = element;
        }
        else {
            this.container = container;
        }
        if (this.container) {
            this.container.appendChild(this.app.view);
            this.setupInteractionTracking();
            this.init();
        }
    }
    setupInteractionTracking() {
        // Track mouse/touch movements
        if (this.app.view) {
            this.app.view.addEventListener('mousemove', (e) => {
                const rect = this.app.view.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                this.behaviorAnalyzer.recordInteraction(x, y, 'move');
            });
            this.app.view.addEventListener('click', (e) => {
                const rect = this.app.view.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                this.behaviorAnalyzer.recordInteraction(x, y, 'click');
            });
            this.app.view.addEventListener('touchmove', (e) => {
                const rect = this.app.view.getBoundingClientRect();
                const touch = e.touches[0];
                const x = touch.clientX - rect.left;
                const y = touch.clientY - rect.top;
                this.behaviorAnalyzer.recordInteraction(x, y, 'touch');
            });
            // Track keyboard input
            window.addEventListener('keydown', (e) => {
                this.behaviorAnalyzer.recordInteraction(0, 0, 'keypress', e.key);
            });
        }
    }
    completeGame(success, score, message) {
        // Include behavior analysis in the game result
        const behaviorResult = this.behaviorAnalyzer.isHumanBehavior();
        const result = {
            success,
            score,
            message,
            behaviorAnalysis: behaviorResult
        };
        this.onComplete(result);
    }
    destroy() {
        this.cleanup();
        if (this.app) {
            this.app.destroy(true);
        }
        // Remove event listeners
        if (this.app.view) {
            this.app.view.removeEventListener('mousemove', () => { });
            this.app.view.removeEventListener('click', () => { });
            this.app.view.removeEventListener('touchmove', () => { });
            window.removeEventListener('keydown', () => { });
        }
    }
}

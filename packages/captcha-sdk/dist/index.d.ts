import { GameOptions, GameType } from 'game-core';
export interface CaptchaOptions {
    container: HTMLElement | string;
    gameOptions?: GameOptions;
    onSuccess?: (token: string) => void;
    onFailure?: () => void;
    difficulty?: 'easy' | 'medium' | 'hard';
    gameType?: GameType;
    apiEndpoint?: string;
}
export declare class CaptchaSDK {
    private game;
    private options;
    private isVerified;
    private securityUtils;
    private sessionId;
    private token;
    constructor(options: CaptchaOptions);
    initialize(): void;
    start(): void;
    private handleGameComplete;
    private generateClientFingerprint;
    private verifyWithServer;
    verify(): boolean;
    getToken(): string | null;
    reset(): void;
    destroy(): void;
}
export declare function generateCaptcha(options: CaptchaOptions): CaptchaSDK;
export default CaptchaSDK;

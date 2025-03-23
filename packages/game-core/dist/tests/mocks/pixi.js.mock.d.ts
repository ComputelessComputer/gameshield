declare const pixiMock: {
    Application: {
        new (options: any): {
            stage: any;
            renderer: any;
            ticker: any;
            destroy: any;
        };
    };
    Container: {
        new (): {
            addChild(child: any): any;
            removeChild(child: any): any;
            destroy(): void;
            children: any[];
            position: {
                x: number;
                y: number;
            };
            scale: {
                x: number;
                y: number;
            };
            rotation: number;
            visible: boolean;
            alpha: number;
        };
    };
    Graphics: {
        new (): {
            beginFill: jest.Mock<any, any, any>;
            lineStyle: jest.Mock<any, any, any>;
            drawRect: jest.Mock<any, any, any>;
            drawCircle: jest.Mock<any, any, any>;
            drawRoundedRect: jest.Mock<any, any, any>;
            endFill: jest.Mock<any, any, any>;
            clear: jest.Mock<any, any, any>;
            destroy: jest.Mock<any, any, any>;
            position: {
                x: number;
                y: number;
            };
            scale: {
                x: number;
                y: number;
            };
            rotation: number;
            visible: boolean;
            alpha: number;
        };
    };
    Sprite: {
        new (): {
            destroy: jest.Mock<any, any, any>;
            position: {
                x: number;
                y: number;
            };
            scale: {
                x: number;
                y: number;
            };
            rotation: number;
            visible: boolean;
            alpha: number;
            anchor: {
                x: number;
                y: number;
            };
        };
    };
    Text: {
        new (text: string, style: any): {
            destroy: jest.Mock<any, any, any>;
            text: string;
            style: any;
            position: {
                x: number;
                y: number;
            };
            scale: {
                x: number;
                y: number;
            };
            rotation: number;
            visible: boolean;
            alpha: number;
            anchor: {
                x: number;
                y: number;
            };
        };
    };
    Texture: {
        from: jest.Mock<any, any, any>;
    };
    Assets: {
        load: jest.Mock<any, any, any>;
    };
    utils: {
        EventEmitter: {
            new (): {
                on(event: string, callback: Function): /*elided*/ any;
                emit(event: string, ...args: any[]): /*elided*/ any;
                off(event: string, callback: Function): /*elided*/ any;
                callbacks: Record<string, Function[]>;
            };
        };
    };
};
export default pixiMock;

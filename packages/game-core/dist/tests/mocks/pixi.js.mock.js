// Mock for Pixi.js library
const pixiMock = {
    Application: class Application {
        constructor(options) {
            this.stage = new pixiMock.Container();
            this.renderer = {
                view: document.createElement('canvas'),
                resize: jest.fn(),
                render: jest.fn(),
            };
            this.ticker = {
                add: jest.fn(),
                remove: jest.fn(),
                start: jest.fn(),
                stop: jest.fn(),
            };
            this.destroy = jest.fn();
        }
    },
    Container: class Container {
        constructor() {
            this.children = [];
            this.position = { x: 0, y: 0 };
            this.scale = { x: 1, y: 1 };
            this.rotation = 0;
            this.visible = true;
            this.alpha = 1;
        }
        addChild(child) {
            this.children.push(child);
            return child;
        }
        removeChild(child) {
            const index = this.children.indexOf(child);
            if (index !== -1) {
                this.children.splice(index, 1);
            }
            return child;
        }
        destroy() {
            this.children = [];
        }
    },
    Graphics: class Graphics {
        constructor() {
            this.beginFill = jest.fn().mockReturnThis();
            this.lineStyle = jest.fn().mockReturnThis();
            this.drawRect = jest.fn().mockReturnThis();
            this.drawCircle = jest.fn().mockReturnThis();
            this.drawRoundedRect = jest.fn().mockReturnThis();
            this.endFill = jest.fn().mockReturnThis();
            this.clear = jest.fn().mockReturnThis();
            this.destroy = jest.fn();
            this.position = { x: 0, y: 0 };
            this.scale = { x: 1, y: 1 };
            this.rotation = 0;
            this.visible = true;
            this.alpha = 1;
        }
    },
    Sprite: class Sprite {
        constructor() {
            this.destroy = jest.fn();
            this.position = { x: 0, y: 0 };
            this.scale = { x: 1, y: 1 };
            this.rotation = 0;
            this.visible = true;
            this.alpha = 1;
            this.anchor = { x: 0, y: 0 };
        }
    },
    Text: class Text {
        constructor(text, style) {
            this.destroy = jest.fn();
            this.text = text;
            this.style = style;
            this.position = { x: 0, y: 0 };
            this.scale = { x: 1, y: 1 };
            this.rotation = 0;
            this.visible = true;
            this.alpha = 1;
            this.anchor = { x: 0, y: 0 };
        }
    },
    Texture: {
        from: jest.fn().mockReturnValue({}),
    },
    Assets: {
        load: jest.fn().mockResolvedValue({}),
    },
    utils: {
        EventEmitter: class EventEmitter {
            constructor() {
                this.callbacks = {};
            }
            on(event, callback) {
                if (!this.callbacks[event]) {
                    this.callbacks[event] = [];
                }
                this.callbacks[event].push(callback);
                return this;
            }
            emit(event, ...args) {
                const callbacks = this.callbacks[event] || [];
                callbacks.forEach(callback => callback(...args));
                return this;
            }
            off(event, callback) {
                if (!this.callbacks[event])
                    return this;
                this.callbacks[event] = this.callbacks[event].filter(cb => cb !== callback);
                return this;
            }
        }
    }
};
export default pixiMock;

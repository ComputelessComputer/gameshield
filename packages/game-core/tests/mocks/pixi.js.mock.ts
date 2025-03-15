// Mock for Pixi.js library
const pixiMock = {
  Application: class Application {
    constructor(options: any) {
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
    stage: any;
    renderer: any;
    ticker: any;
    destroy: any;
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
    addChild(child: any) {
      this.children.push(child);
      return child;
    }
    removeChild(child: any) {
      const index = this.children.indexOf(child);
      if (index !== -1) {
        this.children.splice(index, 1);
      }
      return child;
    }
    destroy() {
      this.children = [];
    }
    children: any[];
    position: { x: number; y: number };
    scale: { x: number; y: number };
    rotation: number;
    visible: boolean;
    alpha: number;
  },
  Graphics: class Graphics {
    constructor() {
      this.position = { x: 0, y: 0 };
      this.scale = { x: 1, y: 1 };
      this.rotation = 0;
      this.visible = true;
      this.alpha = 1;
    }
    beginFill = jest.fn().mockReturnThis();
    lineStyle = jest.fn().mockReturnThis();
    drawRect = jest.fn().mockReturnThis();
    drawCircle = jest.fn().mockReturnThis();
    drawRoundedRect = jest.fn().mockReturnThis();
    endFill = jest.fn().mockReturnThis();
    clear = jest.fn().mockReturnThis();
    destroy = jest.fn();
    position: { x: number; y: number };
    scale: { x: number; y: number };
    rotation: number;
    visible: boolean;
    alpha: number;
  },
  Sprite: class Sprite {
    constructor() {
      this.position = { x: 0, y: 0 };
      this.scale = { x: 1, y: 1 };
      this.rotation = 0;
      this.visible = true;
      this.alpha = 1;
      this.anchor = { x: 0, y: 0 };
    }
    destroy = jest.fn();
    position: { x: number; y: number };
    scale: { x: number; y: number };
    rotation: number;
    visible: boolean;
    alpha: number;
    anchor: { x: number; y: number };
  },
  Text: class Text {
    constructor(text: string, style: any) {
      this.text = text;
      this.style = style;
      this.position = { x: 0, y: 0 };
      this.scale = { x: 1, y: 1 };
      this.rotation = 0;
      this.visible = true;
      this.alpha = 1;
      this.anchor = { x: 0, y: 0 };
    }
    destroy = jest.fn();
    text: string;
    style: any;
    position: { x: number; y: number };
    scale: { x: number; y: number };
    rotation: number;
    visible: boolean;
    alpha: number;
    anchor: { x: number; y: number };
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
      on(event: string, callback: Function) {
        if (!this.callbacks[event]) {
          this.callbacks[event] = [];
        }
        this.callbacks[event].push(callback);
        return this;
      }
      emit(event: string, ...args: any[]) {
        const callbacks = this.callbacks[event] || [];
        callbacks.forEach(callback => callback(...args));
        return this;
      }
      off(event: string, callback: Function) {
        if (!this.callbacks[event]) return this;
        this.callbacks[event] = this.callbacks[event].filter(cb => cb !== callback);
        return this;
      }
      callbacks: Record<string, Function[]>;
    }
  }
};

export default pixiMock;

import { jest } from '@jest/globals';

// Mock Canvas and WebGL context
class MockCanvas {
  getContext() {
    return {
      // WebGL context methods
      createBuffer: jest.fn(),
      bindBuffer: jest.fn(),
      bufferData: jest.fn(),
      createShader: jest.fn(),
      shaderSource: jest.fn(),
      compileShader: jest.fn(),
      createProgram: jest.fn(),
      attachShader: jest.fn(),
      linkProgram: jest.fn(),
      useProgram: jest.fn(),
      getAttribLocation: jest.fn(),
      enableVertexAttribArray: jest.fn(),
      vertexAttribPointer: jest.fn(),
      drawArrays: jest.fn(),
      clearColor: jest.fn(),
      clear: jest.fn(),
      viewport: jest.fn(),
      getShaderParameter: jest.fn().mockReturnValue(true),
      getProgramParameter: jest.fn().mockReturnValue(true),
      getShaderInfoLog: jest.fn(),
      getProgramInfoLog: jest.fn(),
      
      // 2D context methods
      fillRect: jest.fn(),
      clearRect: jest.fn(),
      getImageData: jest.fn().mockReturnValue({
        data: new Uint8ClampedArray(4),
      }),
      putImageData: jest.fn(),
      createImageData: jest.fn(),
      setTransform: jest.fn(),
      drawImage: jest.fn(),
      save: jest.fn(),
      restore: jest.fn(),
      translate: jest.fn(),
      rotate: jest.fn(),
      scale: jest.fn(),
      beginPath: jest.fn(),
      closePath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      fill: jest.fn(),
      arc: jest.fn(),
    };
  }
  
  // Canvas properties and methods
  toDataURL() {
    return '';
  }
  
  getBoundingClientRect() {
    return {
      width: 800,
      height: 600,
      top: 0,
      left: 0,
      right: 800,
      bottom: 600
    };
  }
}

// Mock PIXI.js
jest.mock('pixi.js', () => {
  return {
    Application: jest.fn().mockImplementation(() => {
      return {
        view: new MockCanvas(),
        renderer: {
          resize: jest.fn(),
          render: jest.fn(),
          plugins: {
            interaction: {
              on: jest.fn(),
              off: jest.fn()
            }
          },
          extract: {
            canvas: jest.fn().mockReturnValue(new MockCanvas())
          }
        },
        stage: {
          addChild: jest.fn(),
          removeChild: jest.fn(),
          children: []
        },
        ticker: {
          add: jest.fn(),
          remove: jest.fn(),
          start: jest.fn(),
          stop: jest.fn()
        },
        destroy: jest.fn()
      };
    }),
    Container: jest.fn().mockImplementation(() => {
      return {
        addChild: jest.fn(),
        removeChild: jest.fn(),
        children: [],
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        visible: true,
        destroy: jest.fn()
      };
    }),
    Sprite: jest.fn().mockImplementation(() => {
      return {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        visible: true,
        destroy: jest.fn(),
        on: jest.fn(),
        off: jest.fn(),
        interactive: false,
        buttonMode: false
      };
    }),
    Graphics: jest.fn().mockImplementation(() => {
      return {
        beginFill: jest.fn().mockReturnThis(),
        drawRect: jest.fn().mockReturnThis(),
        drawCircle: jest.fn().mockReturnThis(),
        endFill: jest.fn().mockReturnThis(),
        clear: jest.fn().mockReturnThis(),
        lineStyle: jest.fn().mockReturnThis(),
        moveTo: jest.fn().mockReturnThis(),
        lineTo: jest.fn().mockReturnThis(),
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        visible: true,
        destroy: jest.fn()
      };
    }),
    Text: jest.fn().mockImplementation(() => {
      return {
        x: 0,
        y: 0,
        text: '',
        style: {},
        visible: true,
        destroy: jest.fn()
      };
    }),
    Texture: {
      from: jest.fn().mockReturnValue({})
    }
  };
});

// Mock DOM elements and browser APIs
globalThis.HTMLCanvasElement = MockCanvas;
globalThis.document.createElement = (tag) => {
  if (tag === "canvas") {
    return new MockCanvas();
  }
  return {
    style: {},
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    appendChild: jest.fn(),
    removeChild: jest.fn(),
    querySelector: jest.fn(),
    querySelectorAll: jest.fn().mockReturnValue([]),
    getElementsByTagName: jest.fn().mockReturnValue([]),
    getBoundingClientRect: jest.fn().mockReturnValue({
      width: 800,
      height: 600,
      top: 0,
      left: 0,
      right: 800,
      bottom: 600
    })
  };
};

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    key: jest.fn((i) => Object.keys(store)[i] || null),
    get length() {
      return Object.keys(store).length;
    }
  };
})();

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock
});

Object.defineProperty(globalThis, 'sessionStorage', {
  value: localStorageMock
});

// Mock requestAnimationFrame and cancelAnimationFrame
globalThis.requestAnimationFrame = jest.fn(callback => {
  return setTimeout(callback, 0);
});

globalThis.cancelAnimationFrame = jest.fn(id => {
  clearTimeout(id);
});

globalThis.innerWidth = 800;
globalThis.innerHeight = 600;

// Mock fetch API
globalThis.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
    blob: () => Promise.resolve(new Blob()),
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
    headers: new Map(),
    status: 200,
    statusText: 'OK'
  })
);

// Mock navigator
Object.defineProperty(globalThis, 'navigator', {
  value: {
    userAgent: 'jest-test-environment',
    language: 'en-US',
    languages: ['en-US', 'en'],
    platform: 'test',
    vendor: 'Jest',
    plugins: [],
    onLine: true,
    geolocation: {
      getCurrentPosition: jest.fn(),
      watchPosition: jest.fn()
    }
  }
});

// Mock window.location
Object.defineProperty(globalThis, 'location', {
  value: {
    href: 'https://example.com',
    host: 'example.com',
    hostname: 'example.com',
    origin: 'https://example.com',
    pathname: '/',
    protocol: 'https:',
    search: '',
    hash: '',
    assign: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn()
  }
});

// Mock image loading
globalThis.Image = class {
  constructor() {
    setTimeout(() => {
      this.onload && this.onload();
    }, 0);
  }
};

// Add custom matchers if needed
expect.extend({
  // Add custom matchers here
});

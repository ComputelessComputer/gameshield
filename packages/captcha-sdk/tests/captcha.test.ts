import {
  jest,
  describe,
  beforeEach,
  afterEach,
  test,
  expect,
} from "@jest/globals";
import { createCaptcha } from "../src/index";
import { GameResult } from "../src/types";

jest.mock("game-core", () => ({
  createGame: jest.fn().mockReturnValue({
    mount: jest.fn(),
    start: jest.fn(),
    pause: jest.fn(),
    resume: jest.fn(),
    reset: jest.fn(),
    destroy: jest.fn(),
    on: jest.fn((event, callback) => {
      if (event === "complete") {
        (global as any).completeCallback = callback;
      }
      return { off: jest.fn() };
    }),
  }),
  GameType: {
    PUZZLE: "puzzle",
    SNAKE: "snake",
    PONG: "pong",
    BREAKOUT: "breakout",
    DINO_RUN: "dino-run",
  },
  Difficulty: {
    EASY: "easy",
    MEDIUM: "medium",
    HARD: "hard",
  },
}));

describe("Captcha SDK", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div") as HTMLDivElement;
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    jest.clearAllMocks();
  });

  test("createCaptcha should create a captcha instance", () => {
    const onSuccess = jest.fn();
    const onFailure = jest.fn();

    const captcha = createCaptcha({
      container,
      onSuccess,
      onFailure,
    });

    expect(captcha).toBeDefined();
    expect(typeof captcha.isUserVerified).toBe("function");
    expect(typeof captcha.reset).toBe("function");
    expect(typeof captcha.getToken).toBe("function");
  });

  test("isUserVerified should return false initially", () => {
    const captcha = createCaptcha({ container });
    expect(captcha.isUserVerified()).toBe(false);
  });

  test("should call onSuccess when captcha is completed successfully", () => {
    const onSuccess = jest.fn();

    createCaptcha({
      container,
      onSuccess,
      minScore: 60,
    });

    const mockResult: GameResult = {
      success: true,
      score: 100,
      time: 5000,
      metrics: {
        mouseMovements: 10,
        keyPresses: 5,
        interactionPattern: "normal",
      },
    };

    if ((global as any).completeCallback) {
      (global as any).completeCallback(mockResult);
    }

    expect(onSuccess).toHaveBeenCalled();
  });

  test("should call onFailure when captcha is completed unsuccessfully", () => {
    const onSuccess = jest.fn();
    const onFailure = jest.fn();

    createCaptcha({
      container,
      onSuccess,
      onFailure,
      minScore: 60,
    });

    const mockResult: GameResult = {
      success: false,
      score: 30,
      time: 5000,
      metrics: {
        mouseMovements: 2,
        keyPresses: 1,
        interactionPattern: "suspicious",
      },
    };

    if ((global as any).completeCallback) {
      (global as any).completeCallback(mockResult);
    }

    expect(onFailure).toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
  });

  test("getToken should return a valid token after successful completion", () => {
    const captcha = createCaptcha({ container });

    expect(captcha.getToken()).toBeNull();

    const mockResult: GameResult = {
      success: true,
      score: 100,
      time: 5000,
      metrics: {
        mouseMovements: 10,
        keyPresses: 5,
        interactionPattern: "normal",
      },
    };

    if ((global as any).completeCallback) {
      (global as any).completeCallback(mockResult);
    }

    const token = captcha.getToken();
    expect(typeof token).toBe("string");
    expect(token?.length).toBeGreaterThan(0);
  });

  test("reset should reset the captcha state", () => {
    const captcha = createCaptcha({ container });

    const mockResult: GameResult = {
      success: true,
      score: 100,
      time: 5000,
      metrics: {
        mouseMovements: 10,
        keyPresses: 5,
        interactionPattern: "normal",
      },
    };

    if ((global as any).completeCallback) {
      (global as any).completeCallback(mockResult);
    }

    expect(captcha.isUserVerified()).toBe(true);
    expect(captcha.getToken()).not.toBeNull();

    captcha.reset();

    expect(captcha.isUserVerified()).toBe(false);
    expect(captcha.getToken()).toBeNull();
  });
});

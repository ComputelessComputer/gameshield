"use client";

import { RefreshCcwIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { GameType, Difficulty } from "@gameshield/core";

// Import GameShield component with SSR disabled
const GameShield = dynamic(
  () => import("@gameshield/react").then((mod) => mod.GameShield),
  { ssr: false },
);

export default function GameshieldDemo() {
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [captchaKey, setCaptchaKey] = useState(0);
  const [gameType, setGameType] = useState<GameType>("random");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");

  const handleSuccess = (token: string) => {
    console.log("Verification successful:", token);
    setIsVerified(true);
    setError(null);
  };

  const handleFailure = (reason: string) => {
    console.log("Verification failed:", reason);
    setIsVerified(false);
    setError(reason);
  };

  const handleRefresh = () => {
    setCaptchaKey((prev) => prev + 1);
    setIsVerified(false);
    setError(null);
  };

  const gameTypes = [
    { value: "random", label: "Random" },
    { value: "pong", label: "Pong" },
    { value: "snake", label: "Snake" },
    { value: "breakout", label: "Breakout" },
    { value: "dino-run", label: "Dino Run" },
    { value: "tetris", label: "Tetris" },
    { value: "flappy-bird", label: "Flappy Bird" },
    { value: "asteroids", label: "Asteroids" },
    { value: "pacman", label: "Pac-Man" },
  ];

  const difficultyLevels = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-4">
      <div className="mb-4 flex w-full max-w-[400px] flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Game Type
          </label>
          <select
            value={gameType}
            onChange={(e) => setGameType(e.target.value as GameType)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          >
            {gameTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Difficulty
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          >
            {difficultyLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative aspect-square w-full max-w-[400px]">
        <GameShield
          key={`captcha-${captchaKey}`}
          size={400}
          gameType={gameType}
          difficulty={difficulty}
          className="rounded-lg shadow-md"
          onSuccess={handleSuccess}
          onFailure={handleFailure}
        />
      </div>

      {isVerified && (
        <div className="mt-4 text-center text-green-600">
          Verification successful!
        </div>
      )}

      {error && (
        <div className="mt-4 text-center text-red-600">
          Verification failed: {error}
        </div>
      )}

      <div className="mt-4 flex gap-4">
        <button
          onClick={handleRefresh}
          className="inline-flex cursor-pointer items-center gap-2 border border-black bg-transparent px-4 py-2 text-black transition-all hover:scale-95 hover:bg-gray-50"
        >
          <RefreshCcwIcon className="h-4 w-4" /> Refresh
        </button>
      </div>
    </div>
  );
}

"use client";

import { RefreshCcwIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const handleSpacebarPress = (event: KeyboardEvent) => {
      // Only trigger refresh on spacebar when overlay is visible
      if ((isVerified || error) && event.key === " ") {
        event.preventDefault(); // Prevent page scrolling
        handleRefresh();
      }
    };

    document.addEventListener("keydown", handleSpacebarPress);

    return () => {
      document.removeEventListener("keydown", handleSpacebarPress);
    };
  }, [isVerified, error]); // Re-add listener when these states change

  const gameTypes = [
    { value: "random", label: "Random" },
    { value: "snake", label: "Snake" },
    { value: "breakout", label: "Breakout" },
    { value: "tetris", label: "Tetris" },
  ];

  const difficultyLevels = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-4">
      <div className="mb-4 flex w-full max-w-[400px] flex-row gap-4">
        <div className="w-1/2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Game Type
          </label>
          <select
            value={gameType}
            onChange={(e) => {
              setGameType(e.target.value as GameType);
              setCaptchaKey((prev) => prev + 1); // Reset the game when type changes
              setIsVerified(false);
              setError(null);
              e.target.blur();
            }}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          >
            {gameTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Difficulty
          </label>
          <select
            value={difficulty}
            onChange={(e) => {
              setDifficulty(e.target.value as Difficulty);
              setCaptchaKey((prev) => prev + 1); // Reset the game when difficulty changes
              setIsVerified(false);
              setError(null);
              e.target.blur();
            }}
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

        {/* Overlay for verification result */}
        {(isVerified || error) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-black/70">
            {isVerified && (
              <div className="flex flex-col items-center gap-4">
                <div className="text-2xl font-bold text-green-400">
                  Verification Successful!
                </div>
                <button
                  onClick={handleRefresh}
                  className="inline-flex cursor-pointer items-center gap-2 border border-white bg-transparent px-4 py-2 text-white transition-all hover:scale-95 hover:bg-white/10"
                >
                  <RefreshCcwIcon className="h-4 w-4" /> Try Again
                </button>
              </div>
            )}

            {error && (
              <div className="flex flex-col items-center gap-4">
                <div className="text-2xl font-bold text-red-400">
                  Verification Failed
                </div>
                <div className="mb-2 text-white/80">{error}</div>
                <button
                  onClick={handleRefresh}
                  className="inline-flex cursor-pointer items-center gap-2 border border-white bg-transparent px-4 py-2 text-white transition-all hover:scale-95 hover:bg-white/10"
                >
                  <RefreshCcwIcon className="h-4 w-4" /> Try Again (Spacebar)
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

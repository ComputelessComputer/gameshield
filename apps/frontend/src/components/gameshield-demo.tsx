"use client";

import { RefreshCcwIcon } from "lucide-react";
import { useGameShield } from "@gameshield/react";

export default function GameshieldDemo() {
  // Use the hook instead of the component with ref
  const { ref: gameShieldRef, reset, isVerified, error } = useGameShield({
    gameType: "random",
    difficulty: "medium",
    size: "100%",
    onSuccess: (token) => {
      console.log("Verification successful:", token);
    },
    onFailure: (reason) => {
      console.log("Verification failed:", reason);
    }
  });

  const handleRefresh = () => {
    reset();
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div className="aspect-square w-full max-w-[500px]">
        <div
          ref={gameShieldRef}
          className="h-full w-full rounded-lg shadow-md"
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

      <button
        onClick={handleRefresh}
        className="mt-4 inline-flex cursor-pointer items-center gap-2 border border-black bg-transparent px-4 py-2 text-black transition-all hover:scale-95 hover:bg-gray-50"
      >
        <RefreshCcwIcon className="h-4 w-4" /> Refresh
      </button>
    </div>
  );
}

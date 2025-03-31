"use client";

import { RefreshCcwIcon } from "lucide-react";
import { useRef } from "react";
import { GameShield } from "@gameshield/react";

export default function GameshieldDemo() {
  const gameShieldRef = useRef<{ reset: () => void } | null>(null);

  const handleRefresh = () => {
    if (gameShieldRef.current) {
      gameShieldRef.current.reset();
    }
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div className="aspect-square w-full max-w-[500px]">
        <GameShield
          ref={gameShieldRef}
          gameType="random"
          difficulty="medium"
          size="100%"
          onSuccess={(token) => {
            console.log("Verification successful:", token);
          }}
          onFailure={(reason) => {
            console.log("Verification failed:", reason);
          }}
        />
      </div>

      <button
        onClick={handleRefresh}
        className="mt-4 inline-flex cursor-pointer items-center gap-2 border border-black bg-transparent px-4 py-2 text-black transition-all hover:scale-95 hover:bg-gray-50"
      >
        <RefreshCcwIcon className="h-4 w-4" /> Refresh
      </button>
    </div>
  );
}

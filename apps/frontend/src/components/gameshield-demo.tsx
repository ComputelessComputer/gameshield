"use client";

import { RefreshCcwIcon } from "lucide-react";
import { useEffect, useRef } from "react";

export default function GameshieldDemo() {
  const gameShieldRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    import("@gameshield/web-components");
  }, []);

  const handleRefresh = () => {
    if (gameShieldRef.current && "reset" in gameShieldRef.current) {
      // @ts-expect-error - Custom element method
      gameShieldRef.current.reset();
    }
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div className="aspect-square w-full max-w-[500px]">
        {/* @ts-expect-error - Custom element */}
        <game-shield
          ref={gameShieldRef}
          game-type="random"
          difficulty="medium"
          size="100%"
          style={{
            width: "100%",
            height: "100%",
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

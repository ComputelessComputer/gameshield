"use client";

import { cn } from "@/utils";
import { RefreshCcwIcon } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export default function GameshieldDemo() {
  const [isVerified, setIsVerified] = useState(false);
  const gameShieldRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Dynamically import the web component to avoid SSR issues
    import("@gameshield/web-components");
  }, []);

  useEffect(() => {
    const currentRef = gameShieldRef.current;
    
    // Define event handlers with proper type casting
    const handleSuccess = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsVerified(true);
      console.log('Verification success:', customEvent.detail);
    };

    const handleFailure = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsVerified(false);
      console.log('Verification failed:', customEvent.detail);
    };

    const handleTimeout = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsVerified(false);
      console.log('Verification timed out:', customEvent.detail);
    };

    // Add event listeners with type casting
    currentRef?.addEventListener('success', handleSuccess as EventListener);
    currentRef?.addEventListener('failure', handleFailure as EventListener);
    currentRef?.addEventListener('timeout', handleTimeout as EventListener);

    return () => {
      // Remove event listeners with type casting
      currentRef?.removeEventListener('success', handleSuccess as EventListener);
      currentRef?.removeEventListener('failure', handleFailure as EventListener);
      currentRef?.removeEventListener('timeout', handleTimeout as EventListener);
    };
  }, []);

  const handleRefresh = () => {
    if (gameShieldRef.current && "reset" in gameShieldRef.current) {
      // @ts-expect-error - Custom element method
      gameShieldRef.current.reset();
      setIsVerified(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-8 border border-neutral-200 bg-white p-6">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-center text-2xl font-bold">
          Gameshield CAPTCHA Demo
        </h2>
        <button
          onClick={handleRefresh}
          className="inline-flex cursor-pointer items-center gap-2 bg-blue-500 px-4 py-2 text-white transition-all hover:scale-95 hover:bg-blue-600"
        >
          <RefreshCcwIcon className="h-4 w-4" /> Refresh
        </button>
      </div>

      <div className="my-4 flex w-full justify-center">
        <div className="w-full max-w-[500px] overflow-hidden rounded-lg">
          {/* @ts-expect-error - Custom element */}
          <game-shield
            ref={gameShieldRef}
            game-type="random"
            difficulty="medium"
            size="100%"
          />
        </div>
      </div>

      <div className="w-full">
        <div
          className={cn(
            "p-4 text-center",
            isVerified
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800",
          )}
        >
          {isVerified ? (
            <>
              <span className="text-lg font-medium">✅ You are worthy!</span>
              <p className="mt-2 text-sm">
                You have successfully completed the CAPTCHA.
              </p>
            </>
          ) : (
            <>
              <span className="text-lg font-medium">
                🛡️ You shall not pass!
              </span>
              <p className="mt-2 text-sm">
                Please complete the CAPTCHA to verify you are human.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

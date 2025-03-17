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

  const handleSuccess = () => {
    setIsVerified(true);
    console.log("Verification successful!");
  };

  const handleFailure = () => {
    setIsVerified(false);
    console.log("Verification failed!");
  };

  const handleTimeout = () => {
    setIsVerified(false);
    console.log("Verification timed out!");
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-8 border border-neutral-200 bg-white p-6">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-center text-2xl font-bold">
          Gameshield CAPTCHA Demo
        </h2>
        <button
          onClick={() => {
            if (gameShieldRef.current && "reset" in gameShieldRef.current) {
              // @ts-ignore - Custom element method
              gameShieldRef.current.reset();
              setIsVerified(false);
            }
          }}
          className="inline-flex cursor-pointer items-center gap-2 bg-blue-500 px-4 py-2 text-white transition-all hover:scale-95 hover:bg-blue-600"
        >
          <RefreshCcwIcon className="h-4 w-4" /> Refresh
        </button>
      </div>

      <div className="my-4 flex w-full justify-center">
        {/* @ts-ignore - Custom element */}
        <game-shield
          ref={gameShieldRef}
          game-type="random"
          difficulty="medium"
          width="400px"
          height="300px"
          onSuccess={handleSuccess}
          onFailure={handleFailure}
          onTimeout={handleTimeout}
        />
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

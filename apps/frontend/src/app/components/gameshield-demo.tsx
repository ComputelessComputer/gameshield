"use client";

import { useEffect, useState, useRef } from "react";

// Disable TypeScript checking for this specific JSX element
// @ts-ignore
declare namespace JSX {
  interface IntrinsicElements {
    "game-shield": any;
  }
}

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
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto p-6 bg-white border border-neutral-200">
      <h2 className="text-2xl font-bold text-center">
        GameShield CAPTCHA Demo
      </h2>

      <div className="w-full flex justify-center my-4">
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
          className={`p-4 rounded-md text-center ${
            isVerified
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {isVerified ? (
            <>
              <span className="text-lg">✓ Verified</span>
              <p className="mt-2 text-sm">
                You have successfully completed the CAPTCHA.
              </p>
            </>
          ) : (
            <>
              <span className="text-lg">✗ Not Verified</span>
              <p className="mt-2 text-sm">
                Please complete the CAPTCHA to verify you are human.
              </p>
            </>
          )}
        </div>
      </div>

      <button
        onClick={() => {
          if (gameShieldRef.current && "reset" in gameShieldRef.current) {
            // @ts-ignore - Custom element method
            gameShieldRef.current.reset();
            setIsVerified(false);
          }
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Submit Form
      </button>
    </div>
  );
}

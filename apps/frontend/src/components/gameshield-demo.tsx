"use client";

import { RefreshCcwIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

// Import Captcha component with SSR disabled
const Captcha = dynamic(
  () => import("@gameshield/react").then((mod) => mod.Captcha),
  { ssr: false },
);

export default function GameshieldDemo() {
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [captchaKey, setCaptchaKey] = useState(0);
  const [showSized, setShowSized] = useState(true);

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

  const toggleSize = () => {
    setShowSized(!showSized);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-4">
      <div className="relative aspect-square w-full max-w-[400px]">
        {showSized ? (
          // Example with fixed size in pixels
          <Captcha
            key={`sized-${captchaKey}`}
            size={400}
            gameType="random"
            difficulty="medium"
            className="rounded-lg shadow-md"
            onSuccess={handleSuccess}
            onFailure={handleFailure}
          />
        ) : (
          // Example with undefined size (fills container)
          <Captcha
            key={`unsized-${captchaKey}`}
            gameType="random"
            difficulty="medium"
            className="rounded-lg shadow-md"
            onSuccess={handleSuccess}
            onFailure={handleFailure}
          />
        )}
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

        <button
          onClick={toggleSize}
          className="border border-blue-600 bg-blue-600 px-4 py-2 text-white transition-all hover:scale-95 hover:bg-blue-700"
        >
          {showSized ? "Switch to Auto Size" : "Switch to Fixed Size"}
        </button>
      </div>
    </div>
  );
}

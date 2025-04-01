import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { createGameShield } from "@gameshield/core";
import { GameShieldProps } from "./types";

/**
 * GameShield React component
 *
 * A CAPTCHA alternative that uses interactive games to verify human users.
 * Maintains a perfect 1:1 aspect ratio with a maximum size of 500px.
 */
export const GameShield = forwardRef<{ reset: () => void }, GameShieldProps>(
  function GameShield(
    {
      gameType = "random",
      size = "100%",
      difficulty = "medium",
      onSuccess,
      onFailure,
      onTimeout,
      className,
      style,
    },
    ref
  ) {
    // Reference to the container element
    const containerRef = useRef<HTMLDivElement>(null);

    // Reference to the GameShield instance
    const gameShieldRef = useRef<ReturnType<typeof createGameShield> | null>(
      null
    );

    // Parse size to CSS value
    const parsedSize = typeof size === "number" ? `${size}px` : size;

    // Expose the reset method to the parent component via ref
    useImperativeHandle(ref, () => ({
      reset: () => {
        if (gameShieldRef.current) {
          gameShieldRef.current.reset();
        }
      },
    }));

    // Initialize GameShield on mount
    useEffect(() => {
      if (!containerRef.current) {
        return;
      }

      // Small delay to ensure proper container sizing
      setTimeout(() => {
        // Create GameShield instance
        gameShieldRef.current = createGameShield({
          container: containerRef.current!,
          gameType,
          size: parsedSize,
          difficulty,
          onSuccess,
          onFailure,
          onTimeout,
        });
      }, 0);

      // Clean up on unmount
      return () => {
        if (gameShieldRef.current) {
          gameShieldRef.current.destroy();
          gameShieldRef.current = null;
        }
      };
    }, [gameType, parsedSize, difficulty, onSuccess, onFailure, onTimeout]);

    return (
      <div
        className={`gameshield-container ${className || ""}`}
        style={{
          width: "100%",
          height: "100%",
          aspectRatio: "1/1",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...style,
        }}
      >
        <div
          ref={containerRef}
          className="gameshield-content aspect-square"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#1a1a1a",
          }}
        />
      </div>
    );
  }
);

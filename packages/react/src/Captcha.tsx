import { useRef, useEffect } from "react";
import { GameShield } from "./GameShield";
import type { GameShieldProps } from "./types";

export interface CaptchaProps extends Omit<GameShieldProps, "size"> {
  /**
   * Size of the captcha square in pixels
   * If undefined, the captcha will be contained within its parent element
   */
  size?: number;
}

/**
 * Captcha component for GameShield
 *
 * A simplified interface for the GameShield component that maintains a perfect 1:1 aspect ratio.
 * If size is undefined, it adapts to its parent container size.
 *
 * @example
 * ```tsx
 * <Captcha size={400} className="border rounded" />
 * ```
 */
export function Captcha({ size, className, style, ...props }: CaptchaProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Use an effect to resize the container when it's parent changes size
  // Only needed when size is undefined
  useEffect(() => {
    if (size !== undefined || !containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      // This will trigger a re-render when the parent size changes
      if (containerRef.current) {
        containerRef.current.style.width = "100%";
        containerRef.current.style.height = "100%";
      }
    });

    resizeObserver.observe(
      containerRef.current.parentElement || containerRef.current
    );

    return () => {
      if (containerRef.current) {
        resizeObserver.disconnect();
      }
    };
  }, [size]);

  // Determine the styles based on whether size is defined
  const containerStyle =
    size !== undefined
      ? {
          width: `${size}px`,
          height: `${size}px`,
          maxWidth: "100%",
          maxHeight: "100%",
          ...style,
        }
      : {
          width: "100%",
          height: "100%",
          ...style,
        };

  return (
    <div
      ref={containerRef}
      className={`gameshield-captcha-container ${className || ""}`}
      style={{
        ...containerStyle,
        aspectRatio: "1/1",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <GameShield
        size="100%"
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          maxHeight: "100%",
        }}
        {...props}
      />
    </div>
  );
}

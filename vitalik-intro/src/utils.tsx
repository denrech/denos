import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const AnimatedText: React.FC<{
  text: string;
  style?: React.CSSProperties;
  delay?: number;
  mode?: "fade" | "slide" | "scale" | "typewriter" | "wordByWord" | "shake" | "bounce" | "zoom" | "reveal";
}> = ({ text, style, delay = 0, mode = "fade" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = Math.max(0, frame - delay);

  if (mode === "wordByWord") {
    const words = text.split(" ");
    return (
      <div style={style}>
        {words.map((word, i) => {
          const wordDelay = i * 4;
          const opacity = interpolate(localFrame - wordDelay, [0, 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const y = interpolate(localFrame - wordDelay, [0, 12], [30, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                opacity,
                transform: `translateY(${y}px)`,
                marginRight: "0.3em",
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    );
  }

  if (mode === "typewriter") {
    const chars = Math.floor(localFrame * 1.2);
    return <div style={style}>{text.slice(0, chars)}</div>;
  }

  if (mode === "shake") {
    const opacity = interpolate(localFrame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
    const shake = Math.sin(localFrame * 1.5) * 4;
    return (
      <div style={{ ...style, opacity, transform: `translateX(${shake}px)` }}>
        {text}
      </div>
    );
  }

  if (mode === "bounce") {
    const s = spring({ frame: localFrame, fps, config: { damping: 8 } });
    return (
      <div style={{ ...style, transform: `scale(${s})`, opacity: s }}>
        {text}
      </div>
    );
  }

  if (mode === "zoom") {
    const scale = interpolate(localFrame, [0, 30], [0.3, 1], { extrapolateRight: "clamp" });
    const opacity = interpolate(localFrame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
    return (
      <div style={{ ...style, transform: `scale(${scale})`, opacity }}>{text}</div>
    );
  }

  if (mode === "slide") {
    const x = interpolate(localFrame, [0, 25], [-100, 0], { extrapolateRight: "clamp" });
    const opacity = interpolate(localFrame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
    return (
      <div style={{ ...style, transform: `translateX(${x}px)`, opacity }}>
        {text}
      </div>
    );
  }

  if (mode === "scale") {
    const s = spring({ frame: localFrame, fps, config: { damping: 12, stiffness: 100 } });
    return <div style={{ ...style, transform: `scale(${s})` }}>{text}</div>;
  }

  if (mode === "reveal") {
    const clipWidth = interpolate(localFrame, [0, 30], [0, 100], { extrapolateRight: "clamp" });
    return (
      <div style={{ ...style, clipPath: `inset(0 ${100 - clipWidth}% 0 0)` }}>
        {text}
      </div>
    );
  }

  const opacity = interpolate(localFrame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  return <div style={{ ...style, opacity }}>{text}</div>;
};

export const TITLE_STYLE: React.CSSProperties = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontWeight: 800,
  color: "#fff",
  textAlign: "center",
  textShadow: "0 4px 30px rgba(0,0,0,0.8)",
  letterSpacing: "-0.02em",
};

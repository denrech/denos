import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedText, TITLE_STYLE } from "../utils";

// Scene 2: "личный самолёт и охрана"
// Background: blue sky gradient with moving clouds, Icon: private jet
export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const jetX = interpolate(frame, [0, 150], [-400, 2200]);
  const jetY = 350 + Math.sin(frame * 0.1) * 20;

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, #0f1c2e 0%, #1e3a5f 40%, #2c5282 70%, #4a6fa5 100%)",
      }}
    >
      {/* Moving clouds */}
      {Array.from({ length: 8 }).map((_, i) => {
        const seed = i * 91;
        const baseX = (seed * 13) % 1920;
        const y = 100 + (seed % 5) * 150;
        const speed = 0.5 + (i % 3) * 0.3;
        const x = (baseX - frame * speed * 2) % 2400;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 200 + (seed % 100),
              height: 60,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(255,255,255,0.4), rgba(255,255,255,0.05))",
              filter: "blur(10px)",
            }}
          />
        );
      })}

      {/* Private jet flying */}
      <div
        style={{
          position: "absolute",
          left: jetX,
          top: jetY,
          transform: "scaleX(1)",
        }}
      >
        <svg width="320" height="120" viewBox="0 0 320 120">
          {/* Contrail */}
          <path
            d="M 50 60 Q -50 60 -150 65"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          {/* Body */}
          <ellipse cx="170" cy="60" rx="120" ry="18" fill="#f5f5f5" />
          <ellipse cx="170" cy="60" rx="120" ry="18" fill="none" stroke="#888" strokeWidth="1" />
          {/* Windows */}
          {Array.from({ length: 8 }).map((_, i) => (
            <circle key={i} cx={120 + i * 18} cy="56" r="3" fill="#4a90e2" />
          ))}
          {/* Wings */}
          <path d="M 160 65 L 110 90 L 180 70 Z" fill="#d0d0d0" />
          <path d="M 160 55 L 110 30 L 180 50 Z" fill="#d0d0d0" />
          {/* Tail */}
          <path d="M 270 60 L 290 30 L 295 60 Z" fill="#d0d0d0" />
          {/* Nose */}
          <ellipse cx="290" cy="60" rx="10" ry="8" fill="#888" />
        </svg>
      </div>

      {/* Security shield icon */}
      <div
        style={{
          position: "absolute",
          right: "10%",
          top: "60%",
          opacity: interpolate(frame, [60, 100], [0, 1], {
            extrapolateRight: "clamp",
          }),
          transform: `rotate(${interpolate(frame, [60, 150], [-20, 0])}deg)`,
        }}
      >
        <svg width="140" height="160" viewBox="0 0 140 160">
          <path
            d="M 70 10 L 130 30 L 130 80 Q 130 130 70 150 Q 10 130 10 80 L 10 30 Z"
            fill="rgba(255,255,255,0.1)"
            stroke="#fff"
            strokeWidth="3"
          />
          <text x="70" y="95" fontSize="60" fill="#fff" textAnchor="middle">
            ✕
          </text>
        </svg>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "10%",
          width: "100%",
          padding: "0 100px",
        }}
      >
        <AnimatedText
          text="ЛИЧНЫЙ САМОЛЁТ"
          style={{
            ...TITLE_STYLE,
            fontSize: 80,
            color: "#fff",
            letterSpacing: "0.05em",
          }}
          mode="slide"
        />
        <AnimatedText
          text="и охрана? Забудьте."
          style={{
            ...TITLE_STYLE,
            fontSize: 50,
            color: "#a3d4ff",
            marginTop: 15,
          }}
          mode="slide"
          delay={30}
        />
      </div>
    </AbsoluteFill>
  );
};

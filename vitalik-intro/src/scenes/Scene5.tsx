import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedText, TITLE_STYLE } from "../utils";

// Scene 5: "именно этого человека ненавидят"
// Background: red pulsing, Icon: angry emoji / fist
export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = Math.sin(frame * 0.2) * 0.1 + 0.9;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at center,
          rgba(${180 + Math.sin(frame * 0.1) * 30}, 20, 20, 1) 0%,
          rgba(80, 0, 0, 1) 50%,
          rgba(20, 0, 0, 1) 100%)`,
      }}
    >
      {/* Pulsing rings */}
      {[0, 30, 60, 90].map((offset) => {
        const ringFrame = (frame + offset) % 120;
        const scale = ringFrame / 120;
        const opacity = 1 - scale;
        return (
          <div
            key={offset}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) scale(${scale * 4})`,
              width: 300,
              height: 300,
              borderRadius: "50%",
              border: `4px solid rgba(255, 50, 50, ${opacity * 0.6})`,
            }}
          />
        );
      })}

      {/* Lightning bolts */}
      {Array.from({ length: 12 }).map((_, i) => {
        const seed = i * 67;
        const angle = (i / 12) * Math.PI * 2;
        const dist = 400;
        const x = 960 + Math.cos(angle) * dist;
        const y = 540 + Math.sin(angle) * dist;
        const flash = (frame + seed) % 30 < 5 ? 1 : 0.3;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x - 4,
              top: y - 40,
              width: 8,
              height: 80,
              background: `linear-gradient(180deg, #ff3030, #ff8080)`,
              opacity: flash,
              transform: `rotate(${(angle * 180) / Math.PI + 90}deg)`,
              boxShadow: "0 0 20px #ff3030",
            }}
          />
        );
      })}

      {/* Angry face icon */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "30%",
          transform: `translateX(-50%) scale(${pulse * interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" })})`,
        }}
      >
        <svg width="280" height="280" viewBox="0 0 280 280">
          {/* Face */}
          <circle cx="140" cy="140" r="120" fill="#FFD93D" stroke="#000" strokeWidth="4" />
          {/* Angry eyebrows */}
          <path d="M 70 100 L 120 120" stroke="#000" strokeWidth="8" strokeLinecap="round" />
          <path d="M 210 100 L 160 120" stroke="#000" strokeWidth="8" strokeLinecap="round" />
          {/* Eyes */}
          <circle cx="100" cy="140" r="10" fill="#000" />
          <circle cx="180" cy="140" r="10" fill="#000" />
          {/* Angry mouth */}
          <path
            d="M 90 200 Q 140 170 190 200"
            stroke="#000"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          {/* Steam */}
          <path
            d="M 50 60 Q 40 40 55 30 Q 65 20 60 5"
            stroke="#fff"
            strokeWidth="4"
            fill="none"
            opacity={(Math.sin(frame * 0.3) + 1) / 2}
            strokeLinecap="round"
          />
          <path
            d="M 220 60 Q 230 40 215 30 Q 205 20 210 5"
            stroke="#fff"
            strokeWidth="4"
            fill="none"
            opacity={(Math.cos(frame * 0.3) + 1) / 2}
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "12%",
          width: "100%",
          padding: "0 100px",
          transform: `translateX(${Math.sin(frame * 1.2) * 6}px)`,
        }}
      >
        <AnimatedText
          text="ЕГО НЕНАВИДЯТ"
          style={{
            ...TITLE_STYLE,
            fontSize: 130,
            color: "#fff",
            letterSpacing: "0.05em",
            textShadow: "0 0 40px #ff0000, 0 4px 30px rgba(0,0,0,0.8)",
          }}
          mode="shake"
        />
      </div>
    </AbsoluteFill>
  );
};

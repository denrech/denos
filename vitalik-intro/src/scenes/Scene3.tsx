import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedText, TITLE_STYLE } from "../utils";

// Scene 3: "Представьте человека в мятой футболке с единорогами"
// Background: pastel rainbow, Icon: unicorn t-shirt
export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const hue = (frame * 1.2) % 360;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${frame * 0.8}deg,
          hsl(${hue}, 60%, 75%) 0%,
          hsl(${(hue + 60) % 360}, 70%, 70%) 35%,
          hsl(${(hue + 120) % 360}, 65%, 75%) 70%,
          hsl(${(hue + 180) % 360}, 70%, 80%) 100%)`,
      }}
    >
      {/* Floating sparkles */}
      {Array.from({ length: 30 }).map((_, i) => {
        const seed = i * 53;
        const x = (seed * 19) % 1920;
        const y = 100 + ((seed * 7) % 800);
        const float = Math.sin((frame + seed) * 0.05) * 30;
        const rotate = (frame + seed) * 2;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y + float,
              fontSize: 24 + (seed % 20),
              transform: `rotate(${rotate}deg)`,
              opacity: 0.7,
            }}
          >
            ✦
          </div>
        );
      })}

      {/* Unicorn t-shirt */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "25%",
          transform: `translateX(-50%) rotate(${Math.sin(frame * 0.05) * 3}deg) scale(${interpolate(
            frame,
            [0, 20],
            [0, 1],
            { extrapolateRight: "clamp" }
          )})`,
        }}
      >
        <svg width="380" height="420" viewBox="0 0 380 420">
          {/* T-shirt body - wrinkled */}
          <path
            d="M 80 80 Q 60 70 50 100 L 30 160 L 70 180 L 70 380 Q 70 400 90 400 L 290 400 Q 310 400 310 380 L 310 180 L 350 160 L 330 100 Q 320 70 300 80 L 240 100 Q 220 130 190 130 Q 160 130 140 100 Z"
            fill="#fff"
            stroke="#666"
            strokeWidth="3"
          />
          {/* Wrinkles */}
          <path d="M 100 200 Q 120 210 100 230" stroke="#ccc" strokeWidth="2" fill="none" />
          <path d="M 260 220 Q 280 230 260 250" stroke="#ccc" strokeWidth="2" fill="none" />
          <path d="M 150 320 Q 170 330 150 350" stroke="#ccc" strokeWidth="2" fill="none" />
          {/* Unicorn */}
          <g transform="translate(190, 260)">
            {/* Body */}
            <ellipse cx="0" cy="0" rx="70" ry="40" fill="#FFB6E1" />
            {/* Head */}
            <ellipse cx="50" cy="-20" rx="35" ry="30" fill="#FFB6E1" />
            {/* Horn */}
            <polygon points="55,-50 50,-80 60,-50" fill="#FFD700" />
            <line x1="52" y1="-55" x2="57" y2="-75" stroke="#FFA500" strokeWidth="1" />
            {/* Mane */}
            <path d="M 30 -40 Q 20 -60 35 -55 Q 25 -45 40 -45 Q 30 -35 45 -35" fill="#FF69B4" />
            <path d="M -30 -10 Q -50 -20 -40 5 Q -60 0 -45 15" fill="#FF69B4" />
            {/* Eye */}
            <circle cx="60" cy="-25" r="3" fill="#000" />
            {/* Legs */}
            <rect x="-50" y="35" width="8" height="25" fill="#FFB6E1" />
            <rect x="-20" y="35" width="8" height="25" fill="#FFB6E1" />
            <rect x="20" y="35" width="8" height="25" fill="#FFB6E1" />
            <rect x="50" y="35" width="8" height="25" fill="#FFB6E1" />
            {/* Rainbow tail */}
            <path d="M -65 -10 Q -90 -30 -85 0 Q -100 -10 -95 15" stroke="#FF0000" strokeWidth="4" fill="none" />
            <path d="M -70 -5 Q -95 -25 -90 5" stroke="#FFA500" strokeWidth="3" fill="none" />
            <path d="M -75 0 Q -100 -20 -95 10" stroke="#FFFF00" strokeWidth="3" fill="none" />
          </g>
          {/* Rainbow under unicorn */}
          <path d="M 100 320 Q 190 280 280 320" stroke="#FF0000" strokeWidth="4" fill="none" />
          <path d="M 105 328 Q 190 290 275 328" stroke="#FFA500" strokeWidth="3" fill="none" />
          <path d="M 110 336 Q 190 300 270 336" stroke="#FFFF00" strokeWidth="3" fill="none" />
          <path d="M 115 344 Q 190 310 265 344" stroke="#00CC00" strokeWidth="3" fill="none" />
          <path d="M 120 352 Q 190 320 260 352" stroke="#0099FF" strokeWidth="3" fill="none" />
          <path d="M 125 360 Q 190 330 255 360" stroke="#9933FF" strokeWidth="3" fill="none" />
        </svg>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "8%",
          width: "100%",
          padding: "0 100px",
        }}
      >
        <AnimatedText
          text="Просто мятая футболка"
          style={{
            ...TITLE_STYLE,
            fontSize: 78,
            color: "#fff",
            textShadow: "0 4px 20px rgba(255,105,180,0.6)",
          }}
          mode="bounce"
        />
        <AnimatedText
          text="с единорогами 🦄"
          style={{
            ...TITLE_STYLE,
            fontSize: 56,
            color: "#fff",
            marginTop: 15,
          }}
          mode="bounce"
          delay={25}
        />
      </div>
    </AbsoluteFill>
  );
};

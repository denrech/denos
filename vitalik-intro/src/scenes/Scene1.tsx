import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedText, TITLE_STYLE } from "../utils";

// Scene 1: "Представьте человека, которому не нужны костюм за десять тысяч долларов"
// Background: dark with falling gold particles, Icon: suit disintegrating
export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a15 60%, #000 100%)",
      }}
    >
      {/* Falling gold particles */}
      {Array.from({ length: 40 }).map((_, i) => {
        const seed = i * 137;
        const x = (seed * 7) % 1920;
        const speed = 1 + ((seed * 3) % 100) / 50;
        const y = ((frame * speed + seed) % 1200) - 100;
        const size = 3 + (seed % 5);
        const opacity = 0.3 + ((seed * 5) % 70) / 100;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FFD700, #FFA500)",
              boxShadow: "0 0 10px #FFD700",
              opacity,
            }}
          />
        );
      })}

      {/* Suit icon - tie disintegrating */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "30%",
          transform: `translateX(-50%) scale(${interpolate(
            frame,
            [0, 30],
            [0, 1],
            { extrapolateRight: "clamp" }
          )})`,
          opacity: interpolate(frame, [100, 140], [1, 0.2], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        <svg width="200" height="280" viewBox="0 0 200 280">
          {/* Suit jacket */}
          <path
            d="M 50 80 L 80 50 L 100 70 L 120 50 L 150 80 L 160 280 L 40 280 Z"
            fill="#1a1a1a"
            stroke="#444"
            strokeWidth="2"
          />
          {/* Lapels */}
          <path d="M 80 50 L 100 70 L 100 200 L 70 220 Z" fill="#0d0d0d" />
          <path d="M 120 50 L 100 70 L 100 200 L 130 220 Z" fill="#0d0d0d" />
          {/* Tie */}
          <path
            d="M 95 70 L 105 70 L 110 100 L 100 200 L 90 100 Z"
            fill="#8B0000"
          />
          {/* Dollar signs falling off */}
          <text
            x="100"
            y="40"
            fontSize="30"
            fill="#FFD700"
            textAnchor="middle"
            opacity={interpolate(frame, [40, 80], [0, 1], {
              extrapolateRight: "clamp",
            })}
            transform={`translate(0, ${interpolate(frame, [40, 150], [0, -60], {
              extrapolateRight: "clamp",
            })})`}
          >
            $
          </text>
          <text
            x="60"
            y="180"
            fontSize="24"
            fill="#FFD700"
            textAnchor="middle"
            opacity={interpolate(frame, [60, 100], [0, 1], {
              extrapolateRight: "clamp",
            })}
            transform={`translate(${interpolate(frame, [60, 150], [0, -40], {
              extrapolateRight: "clamp",
            })}, ${interpolate(frame, [60, 150], [0, 50], {
              extrapolateRight: "clamp",
            })})`}
          >
            $
          </text>
          <text
            x="140"
            y="180"
            fontSize="24"
            fill="#FFD700"
            textAnchor="middle"
            opacity={interpolate(frame, [80, 120], [0, 1], {
              extrapolateRight: "clamp",
            })}
            transform={`translate(${interpolate(frame, [80, 150], [0, 40], {
              extrapolateRight: "clamp",
            })}, ${interpolate(frame, [80, 150], [0, 50], {
              extrapolateRight: "clamp",
            })})`}
          >
            $
          </text>
        </svg>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "15%",
          width: "100%",
          padding: "0 100px",
        }}
      >
        <AnimatedText
          text="Костюм за $10 000?"
          style={{ ...TITLE_STYLE, fontSize: 90, color: "#FFD700" }}
          mode="wordByWord"
          delay={20}
        />
        <AnimatedText
          text="Ему это не нужно."
          style={{
            ...TITLE_STYLE,
            fontSize: 56,
            color: "#fff",
            marginTop: 20,
            opacity: 0.9,
          }}
          mode="fade"
          delay={70}
        />
      </div>
    </AbsoluteFill>
  );
};

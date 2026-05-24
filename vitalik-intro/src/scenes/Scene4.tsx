import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedText, TITLE_STYLE } from "../utils";

// Scene 4: "только что вышел из университетской библиотеки"
// Background: dark bookshelf silhouette, Icon: stack of books opening
export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, #2c1810 0%, #1a0e08 50%, #0a0604 100%)",
      }}
    >
      {/* Bookshelf silhouettes - background */}
      {Array.from({ length: 60 }).map((_, i) => {
        const seed = i * 31;
        const x = (i % 30) * 70 + ((seed % 20) - 10);
        const row = Math.floor(i / 30);
        const y = 50 + row * 250;
        const h = 150 + (seed % 80);
        const w = 30 + (seed % 25);
        const colors = ["#3a1f0a", "#2d1808", "#1f1006", "#4a2b15", "#3a2510"];
        const color = colors[seed % colors.length];
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: w,
              height: h,
              background: color,
              borderTop: "3px solid #5a3520",
              opacity: 0.7,
            }}
          />
        );
      })}

      {/* Dust particles floating */}
      {Array.from({ length: 30 }).map((_, i) => {
        const seed = i * 47;
        const x = (seed * 11) % 1920;
        const y = 100 + ((seed * 13) % 800);
        const float = Math.sin((frame + seed) * 0.03) * 50;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + float,
              top: y - frame * 0.3,
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: "rgba(255, 200, 100, 0.4)",
              boxShadow: "0 0 4px rgba(255,200,100,0.6)",
            }}
          />
        );
      })}

      {/* Stack of books */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "30%",
          transform: `translateX(-50%)`,
        }}
      >
        <svg width="400" height="400" viewBox="0 0 400 400">
          {/* Book 1 (bottom) */}
          <g transform={`translate(0, ${interpolate(frame, [0, 25], [200, 0], { extrapolateRight: "clamp" })})`}>
            <rect x="50" y="320" width="280" height="40" fill="#8B0000" stroke="#5a0000" strokeWidth="2" />
            <rect x="50" y="320" width="280" height="6" fill="#FFD700" />
            <rect x="50" y="354" width="280" height="6" fill="#FFD700" />
          </g>
          {/* Book 2 */}
          <g transform={`translate(0, ${interpolate(frame, [10, 35], [200, 0], { extrapolateRight: "clamp" })})`}>
            <rect x="70" y="280" width="260" height="40" fill="#1E3A5F" stroke="#0d1f33" strokeWidth="2" />
            <text x="200" y="306" fontSize="18" fill="#FFD700" textAnchor="middle">CRYPTO</text>
          </g>
          {/* Book 3 */}
          <g transform={`translate(0, ${interpolate(frame, [20, 45], [200, 0], { extrapolateRight: "clamp" })})`}>
            <rect x="60" y="240" width="280" height="40" fill="#2d5016" stroke="#1a3009" strokeWidth="2" />
            <rect x="60" y="240" width="280" height="6" fill="#FFD700" />
          </g>
          {/* Book 4 - open at top */}
          <g
            transform={`translate(${interpolate(frame, [30, 60], [0, 0])}, ${interpolate(frame, [30, 55], [-200, 0], { extrapolateRight: "clamp" })})`}
          >
            <path
              d="M 60 200 L 200 180 L 340 200 L 340 240 L 200 220 L 60 240 Z"
              fill="#f5e6d3"
              stroke="#3a2510"
              strokeWidth="2"
            />
            <line x1="200" y1="180" x2="200" y2="220" stroke="#3a2510" strokeWidth="2" />
            {/* Text lines on pages */}
            {Array.from({ length: 4 }).map((_, i) => (
              <React.Fragment key={i}>
                <line x1="80" y1={205 + i * 7} x2="190" y2={200 + i * 7} stroke="#8b7355" strokeWidth="1" />
                <line x1="210" y1={200 + i * 7} x2="320" y2={205 + i * 7} stroke="#8b7355" strokeWidth="1" />
              </React.Fragment>
            ))}
          </g>
          {/* Glow */}
          <ellipse
            cx="200"
            cy="200"
            rx="180"
            ry="20"
            fill="url(#glowGrad)"
            opacity={interpolate(frame, [40, 80], [0, 0.6], { extrapolateRight: "clamp" })}
          />
          <defs>
            <radialGradient id="glowGrad">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "12%",
          width: "100%",
          padding: "0 100px",
        }}
      >
        <AnimatedText
          text="Вышел из библиотеки..."
          style={{
            ...TITLE_STYLE,
            fontSize: 72,
            color: "#FFD700",
            fontFamily: '"Courier New", monospace',
          }}
          mode="typewriter"
        />
        <AnimatedText
          text="и переписал мир"
          style={{
            ...TITLE_STYLE,
            fontSize: 52,
            color: "#fff",
            marginTop: 20,
            fontFamily: '"Courier New", monospace',
          }}
          mode="typewriter"
          delay={60}
        />
      </div>
    </AbsoluteFill>
  );
};

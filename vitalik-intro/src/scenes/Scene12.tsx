import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedText, TITLE_STYLE } from "../utils";

// Scene 12: "построил систему, которая отнимает власть у Уолл-стрит"
// Background: dark with neural network nodes, Icon: blockchain network
export const Scene12: React.FC = () => {
  const frame = useCurrentFrame();

  // Generate nodes
  const nodes = Array.from({ length: 25 }).map((_, i) => {
    const seed = i * 37;
    const angle = (i / 25) * Math.PI * 2 + frame * 0.005;
    const radius = 200 + ((seed * 11) % 250);
    const x = 960 + Math.cos(angle) * radius;
    const y = 540 + Math.sin(angle * 1.3) * radius * 0.7;
    return { x, y, i };
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at center,
          #0a0e2e 0%,
          #050818 60%,
          #000 100%)`,
      }}
    >
      {/* Network grid background */}
      <svg style={{ position: "absolute", inset: 0 }} width="100%" height="100%">
        <defs>
          <pattern id="grid" patternUnits="userSpaceOnUse" width="80" height="80">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(100,150,255,0.08)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Connection lines between nodes */}
        {nodes.map((node, i) =>
          nodes.slice(i + 1).map((other, j) => {
            const dist = Math.hypot(node.x - other.x, node.y - other.y);
            if (dist > 350) return null;
            const op = interpolate(frame, [i * 2, i * 2 + 30], [0, 0.4], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const pulse = (Math.sin((frame + i * 5) * 0.1) + 1) / 2;
            return (
              <line
                key={`${i}-${j}`}
                x1={node.x}
                y1={node.y}
                x2={other.x}
                y2={other.y}
                stroke={`rgba(100, 200, 255, ${op * (0.4 + pulse * 0.6)})`}
                strokeWidth="1.5"
              />
            );
          })
        )}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const appear = interpolate(frame, [i * 2, i * 2 + 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const pulse = (Math.sin((frame + i * 7) * 0.1) + 1) / 2;
          return (
            <g key={i}>
              <circle
                cx={node.x}
                cy={node.y}
                r={(8 + pulse * 4) * appear}
                fill="rgba(100, 200, 255, 0.2)"
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={4 * appear}
                fill="#60a5fa"
              />
            </g>
          );
        })}
      </svg>

      {/* Falling Wall Street logo */}
      <div
        style={{
          position: "absolute",
          left: "10%",
          top: interpolate(frame, [60, 130], [200, 1200], { extrapolateRight: "clamp" }),
          transform: `rotate(${interpolate(frame, [60, 130], [0, 90], { extrapolateRight: "clamp" })}deg)`,
          opacity: interpolate(frame, [60, 100, 130], [1, 1, 0], { extrapolateRight: "clamp" }),
        }}
      >
        <svg width="220" height="180" viewBox="0 0 220 180">
          {/* Bank columns building */}
          <polygon points="20,80 110,30 200,80" fill="#FFD700" stroke="#000" strokeWidth="2" />
          {Array.from({ length: 5 }).map((_, i) => (
            <rect key={i} x={30 + i * 35} y="80" width="20" height="80" fill="#FFD700" stroke="#000" strokeWidth="2" />
          ))}
          <rect x="10" y="160" width="200" height="15" fill="#FFD700" stroke="#000" strokeWidth="2" />
          <text x="110" y="50" fontSize="14" fill="#000" textAnchor="middle" fontWeight="bold">$$$$</text>
        </svg>
      </div>

      {/* Central ETH symbol pulse */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) scale(${1 + Math.sin(frame * 0.1) * 0.05})`,
          opacity: interpolate(frame, [20, 50], [0, 0.4], { extrapolateRight: "clamp" }),
        }}
      >
        <svg width="200" height="280" viewBox="0 0 200 280">
          <polygon points="100,10 180,140 100,110 20,140" fill="rgba(100,200,255,0.5)" />
          <polygon points="100,140 180,150 100,260 20,150" fill="rgba(100,200,255,0.3)" />
        </svg>
      </div>

      <div
        style={{
          position: "absolute",
          top: "8%",
          width: "100%",
          padding: "0 100px",
          textAlign: "center",
        }}
      >
        <AnimatedText
          text="Он построил систему"
          style={{
            ...TITLE_STYLE,
            fontSize: 72,
            color: "#60a5fa",
            textShadow: "0 0 30px rgba(100,200,255,0.6)",
          }}
          mode="zoom"
        />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "10%",
          width: "100%",
          padding: "0 100px",
          textAlign: "center",
        }}
      >
        <AnimatedText
          text="которая отнимает власть"
          style={{
            ...TITLE_STYLE,
            fontSize: 60,
            color: "#fff",
          }}
          mode="fade"
          delay={80}
        />
        <AnimatedText
          text="у Уолл-стрит."
          style={{
            ...TITLE_STYLE,
            fontSize: 90,
            color: "#FFD700",
            marginTop: 20,
            textShadow: "0 0 40px rgba(255,215,0,0.7)",
          }}
          mode="bounce"
          delay={110}
        />
      </div>
    </AbsoluteFill>
  );
};

import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedText, TITLE_STYLE } from "../utils";

// Scene 11: "Не на обложках Forbes. Не строит яхты"
// Background: magazine cover style, Icon: Forbes mag + yacht crossed out
export const Scene11: React.FC = () => {
  const frame = useCurrentFrame();
  const stampScale1 = interpolate(frame, [40, 55], [3, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const stampOp1 = interpolate(frame, [40, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const stampScale2 = interpolate(frame, [100, 115], [3, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const stampOp2 = interpolate(frame, [100, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
      }}
    >
      {/* Diagonal lines pattern */}
      <svg style={{ position: "absolute", inset: 0 }} width="100%" height="100%">
        <defs>
          <pattern id="diag" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform={`rotate(45) translate(${frame * 0.3}, 0)`}>
            <line x1="0" y1="0" x2="0" y2="20" stroke="rgba(0,0,0,0.04)" strokeWidth="6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diag)" />
      </svg>

      {/* Forbes magazine cover */}
      <div
        style={{
          position: "absolute",
          left: "12%",
          top: "20%",
          width: 400,
          height: 540,
          background: "#fff",
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          transform: `rotate(${-5 + Math.sin(frame * 0.05) * 1}deg) scale(${interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" })})`,
          padding: 0,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{ background: "#e8472b", padding: "20px 30px", borderBottom: "5px solid #000" }}>
          <div style={{ fontSize: 56, fontWeight: 900, color: "#fff", fontFamily: "serif", letterSpacing: "-0.02em" }}>
            Forbes
          </div>
          <div style={{ fontSize: 16, color: "#fff", marginTop: 5, fontFamily: "serif" }}>
            BILLIONAIRES · 2024
          </div>
        </div>
        {/* Person silhouette */}
        <div style={{ padding: 30, textAlign: "center" }}>
          <div
            style={{
              width: 150,
              height: 150,
              borderRadius: "50%",
              background: "linear-gradient(180deg, #ccc, #888)",
              margin: "20px auto",
              position: "relative",
            }}
          >
            <div style={{ position: "absolute", fontSize: 80, top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "#fff" }}>?</div>
          </div>
          <div style={{ fontSize: 36, fontWeight: 900, color: "#000", marginTop: 20, fontFamily: "serif" }}>
            THE RICH
          </div>
          <div style={{ fontSize: 24, color: "#666", marginTop: 10, fontFamily: "serif" }}>
            and famous
          </div>
        </div>
        {/* Red stamp NO */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) rotate(-15deg) scale(${stampScale1})`,
            opacity: stampOp1,
          }}
        >
          <div
            style={{
              border: "8px solid #c00",
              color: "#c00",
              padding: "15px 50px",
              fontSize: 80,
              fontWeight: 900,
              fontFamily: "sans-serif",
              background: "rgba(255,255,255,0.7)",
              transform: "skewX(-5deg)",
            }}
          >
            NOT HERE
          </div>
        </div>
      </div>

      {/* Yacht illustration */}
      <div
        style={{
          position: "absolute",
          right: "10%",
          top: "30%",
          transform: `rotate(${5 + Math.sin(frame * 0.05) * 1}deg) scale(${interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" })})`,
        }}
      >
        <svg width="500" height="400" viewBox="0 0 500 400">
          {/* Water */}
          <path d="M 0 280 Q 125 270 250 280 Q 375 290 500 280 L 500 400 L 0 400 Z" fill="#4a90e2" />
          <path d="M 0 290 Q 125 285 250 290 Q 375 295 500 290" stroke="#fff" strokeWidth="2" fill="none" />
          {/* Yacht body */}
          <path d="M 80 270 L 420 270 L 380 320 L 120 320 Z" fill="#fff" stroke="#333" strokeWidth="3" />
          {/* Cabin */}
          <rect x="150" y="200" width="220" height="70" fill="#fff" stroke="#333" strokeWidth="3" />
          {/* Windows */}
          <rect x="170" y="220" width="40" height="30" fill="#87CEEB" stroke="#333" strokeWidth="2" />
          <rect x="220" y="220" width="40" height="30" fill="#87CEEB" stroke="#333" strokeWidth="2" />
          <rect x="270" y="220" width="40" height="30" fill="#87CEEB" stroke="#333" strokeWidth="2" />
          <rect x="320" y="220" width="40" height="30" fill="#87CEEB" stroke="#333" strokeWidth="2" />
          {/* Upper deck */}
          <rect x="200" y="150" width="120" height="50" fill="#fff" stroke="#333" strokeWidth="3" />
          {/* Antenna */}
          <line x1="260" y1="150" x2="260" y2="100" stroke="#333" strokeWidth="3" />
          <circle cx="260" cy="100" r="6" fill="#FFD700" />
        </svg>
        {/* Red X stamp */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) rotate(15deg) scale(${stampScale2})`,
            opacity: stampOp2,
          }}
        >
          <svg width="400" height="400" viewBox="0 0 400 400">
            <line x1="50" y1="50" x2="350" y2="350" stroke="#c00" strokeWidth="20" strokeLinecap="round" />
            <line x1="350" y1="50" x2="50" y2="350" stroke="#c00" strokeWidth="20" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "8%",
          width: "100%",
          padding: "0 100px",
          textAlign: "center",
        }}
      >
        <AnimatedText
          text="Без обложек. Без яхт."
          style={{
            ...TITLE_STYLE,
            fontSize: 90,
            color: "#000",
            textShadow: "0 4px 20px rgba(255,255,255,0.6)",
          }}
          mode="reveal"
          delay={120}
        />
      </div>
    </AbsoluteFill>
  );
};

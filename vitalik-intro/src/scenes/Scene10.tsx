import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedText, TITLE_STYLE } from "../utils";

// Scene 10: "но летает эконом-классом"
// Background: airplane cabin perspective, Icon: small economy seats
export const Scene10: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #87CEEB 0%, #B0E0E6 50%, #E0F0F5 100%)",
      }}
    >
      {/* Clouds moving */}
      {Array.from({ length: 10 }).map((_, i) => {
        const seed = i * 79;
        const baseX = (seed * 17) % 1920;
        const y = 50 + (i % 4) * 200;
        const x = (baseX - frame * 3) % 2400;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 250 + (seed % 150),
              height: 80,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(255,255,255,0.95), rgba(255,255,255,0.4))",
              filter: "blur(8px)",
            }}
          />
        );
      })}

      {/* Airplane window frame */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) scale(${interpolate(frame, [0, 30], [0.3, 1], { extrapolateRight: "clamp" })})`,
        }}
      >
        <svg width="600" height="700" viewBox="0 0 600 700">
          {/* Outer cabin wall */}
          <rect x="0" y="0" width="600" height="700" fill="#e8e8e8" rx="40" />
          {/* Window */}
          <rect x="100" y="100" width="400" height="500" fill="#87CEEB" rx="200" />
          <rect x="100" y="100" width="400" height="500" fill="none" stroke="#999" strokeWidth="6" rx="200" />
          {/* Inner shade */}
          <rect x="120" y="120" width="360" height="460" fill="none" stroke="#bbb" strokeWidth="2" rx="180" />
          {/* Sky view inside window */}
          <defs>
            <clipPath id="windowClip">
              <rect x="120" y="120" width="360" height="460" rx="180" />
            </clipPath>
          </defs>
          <g clipPath="url(#windowClip)">
            <rect x="120" y="120" width="360" height="460" fill="#5fa8d3" />
            {/* Wing */}
            <polygon points="120,400 480,420 480,500 120,520" fill="#dcdcdc" stroke="#999" strokeWidth="2" />
            <polygon points="350,420 480,420 480,500 380,470" fill="#bbb" />
            {/* Engine */}
            <ellipse cx="380" cy="445" rx="40" ry="15" fill="#666" />
            {/* Clouds inside window */}
            <ellipse cx={200 - frame * 2} cy="250" rx="60" ry="20" fill="rgba(255,255,255,0.7)" />
            <ellipse cx={350 - frame * 2} cy="200" rx="50" ry="18" fill="rgba(255,255,255,0.8)" />
          </g>
        </svg>
      </div>

      {/* Economy class label */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            background: "#FFD700",
            color: "#000",
            padding: "12px 40px",
            borderRadius: 8,
            fontSize: 32,
            fontWeight: 800,
            fontFamily: "sans-serif",
            letterSpacing: "0.1em",
            transform: `rotate(${Math.sin(frame * 0.1) * 2}deg)`,
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
          }}
        >
          ECONOMY CLASS · 23B
        </div>
      </div>

      {/* Small seat icons */}
      <div
        style={{
          position: "absolute",
          left: "10%",
          bottom: "20%",
          opacity: interpolate(frame, [40, 80], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <svg width="200" height="200" viewBox="0 0 200 200">
          {[0, 60, 120].map((x, i) => (
            <g key={i} transform={`translate(${x}, 60)`}>
              <rect x="0" y="40" width="40" height="50" fill="#4a5568" rx="4" />
              <rect x="0" y="20" width="40" height="30" fill="#2d3748" rx="4" />
              <rect x="0" y="90" width="40" height="10" fill="#1a202c" />
            </g>
          ))}
        </svg>
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
          text="Эконом-классом."
          style={{
            ...TITLE_STYLE,
            fontSize: 90,
            color: "#1a202c",
            textShadow: "0 4px 20px rgba(255,255,255,0.8)",
          }}
          mode="bounce"
          delay={50}
        />
      </div>
    </AbsoluteFill>
  );
};

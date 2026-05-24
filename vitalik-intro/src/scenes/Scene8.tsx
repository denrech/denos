import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedText, TITLE_STYLE } from "../utils";

// Scene 8: "Его зовут Виталик Бутерин"
// Background: ethereal purple with ETH diamond, Icon: Ethereum logo rotating
export const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rotateY = (frame * 2) % 360;
  const nameSpring = spring({ frame: frame - 40, fps, config: { damping: 10 } });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 40%,
          #4c1d95 0%,
          #2e1065 40%,
          #1e0a3c 70%,
          #000 100%)`,
      }}
    >
      {/* Energy waves */}
      {[0, 40, 80, 120].map((offset) => {
        const ringFrame = (frame + offset) % 160;
        const scale = ringFrame / 160;
        const opacity = (1 - scale) * 0.5;
        return (
          <div
            key={offset}
            style={{
              position: "absolute",
              left: "50%",
              top: "40%",
              transform: `translate(-50%, -50%) scale(${scale * 6})`,
              width: 200,
              height: 200,
              borderRadius: "50%",
              border: `2px solid rgba(150, 100, 255, ${opacity})`,
            }}
          />
        );
      })}

      {/* Particle dust */}
      {Array.from({ length: 60 }).map((_, i) => {
        const seed = i * 43;
        const angle = (i / 60) * Math.PI * 2;
        const radius = 200 + ((seed * 7) % 300);
        const speed = 0.5 + (i % 5) * 0.1;
        const x = 960 + Math.cos(angle + frame * 0.01 * speed) * radius;
        const y = 432 + Math.sin(angle + frame * 0.01 * speed) * radius;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: "#c4b5fd",
              boxShadow: "0 0 8px #a78bfa",
              opacity: 0.7,
            }}
          />
        );
      })}

      {/* Ethereum diamond */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "20%",
          transform: `translateX(-50%) perspective(800px) rotateY(${rotateY}deg) scale(${interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" })})`,
        }}
      >
        <svg width="280" height="380" viewBox="0 0 280 380">
          {/* Top half */}
          <polygon points="140,10 250,180 140,140 30,180" fill="#8b5cf6" stroke="#fff" strokeWidth="3" />
          {/* Bottom half */}
          <polygon points="140,200 250,200 140,370 30,200" fill="#7c3aed" stroke="#fff" strokeWidth="3" />
          {/* Middle inner */}
          <polygon points="140,140 250,180 140,200 30,180" fill="#a78bfa" />
          {/* Reflection on top */}
          <polygon
            points="140,10 200,140 140,140"
            fill="rgba(255,255,255,0.3)"
          />
          {/* Highlight */}
          <line x1="140" y1="10" x2="140" y2="370" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
        </svg>
      </div>

      {/* Name reveal */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          width: "100%",
          textAlign: "center",
          transform: `scale(${nameSpring})`,
          opacity: nameSpring,
        }}
      >
        <div
          style={{
            ...TITLE_STYLE,
            fontSize: 130,
            color: "#fff",
            letterSpacing: "0.02em",
            textShadow: "0 0 60px rgba(150,100,255,1), 0 0 100px rgba(150,100,255,0.5)",
          }}
        >
          ВИТАЛИК
        </div>
        <div
          style={{
            ...TITLE_STYLE,
            fontSize: 130,
            color: "#a78bfa",
            letterSpacing: "0.02em",
            marginTop: -20,
            textShadow: "0 0 60px rgba(150,100,255,1)",
          }}
        >
          БУТЕРИН
        </div>
      </div>
    </AbsoluteFill>
  );
};

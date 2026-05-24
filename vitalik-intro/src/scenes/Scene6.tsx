import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedText, TITLE_STYLE } from "../utils";

// Scene 6: "боятся и обсуждают за закрытыми дверями"
// Background: dark corridor with light through keyhole, Icon: closed door
export const Scene6: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center,
          #1a1a2e 0%,
          #0a0a15 70%,
          #000 100%)`,
      }}
    >
      {/* Corridor floor perspective lines */}
      <svg
        style={{ position: "absolute", inset: 0 }}
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
      >
        <defs>
          <linearGradient id="floorGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#222" />
            <stop offset="100%" stopColor="#000" />
          </linearGradient>
        </defs>
        <polygon points="0,1080 1920,1080 1200,540 720,540" fill="url(#floorGrad)" />
        {/* Floor lines */}
        {Array.from({ length: 8 }).map((_, i) => {
          const t = i / 8;
          const y = 540 + t * 540;
          const xL = 720 - t * 720;
          const xR = 1200 + t * 720;
          return (
            <line key={i} x1={xL} y1={y} x2={xR} y2={y} stroke="#333" strokeWidth="1" />
          );
        })}
        {/* Side walls */}
        <polygon points="0,0 720,540 720,540 0,1080" fill="rgba(15,15,25,0.9)" />
        <polygon points="1920,0 1200,540 1200,540 1920,1080" fill="rgba(15,15,25,0.9)" />
      </svg>

      {/* Door in the distance */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "30%",
          transform: `translateX(-50%) scale(${interpolate(frame, [0, 60], [0.5, 1.1], { extrapolateRight: "clamp" })})`,
        }}
      >
        <svg width="300" height="500" viewBox="0 0 300 500">
          {/* Door frame */}
          <rect x="20" y="20" width="260" height="480" fill="#3a2818" stroke="#1a0e08" strokeWidth="4" />
          {/* Door */}
          <rect x="40" y="40" width="220" height="440" fill="#5a3520" stroke="#3a2510" strokeWidth="2" />
          {/* Door panels */}
          <rect x="60" y="60" width="80" height="180" fill="none" stroke="#3a2510" strokeWidth="3" />
          <rect x="160" y="60" width="80" height="180" fill="none" stroke="#3a2510" strokeWidth="3" />
          <rect x="60" y="270" width="80" height="180" fill="none" stroke="#3a2510" strokeWidth="3" />
          <rect x="160" y="270" width="80" height="180" fill="none" stroke="#3a2510" strokeWidth="3" />
          {/* Handle */}
          <circle cx="230" cy="260" r="8" fill="#FFD700" />
          {/* Light through keyhole */}
          <g
            opacity={interpolate(frame, [30, 70], [0, 1], { extrapolateRight: "clamp" })}
          >
            <ellipse cx="230" cy="260" rx="60" ry="6" fill="rgba(255,220,100,0.6)" filter="blur(8px)" />
            <circle cx="230" cy="260" r="3" fill="#FFEB99" />
          </g>
          {/* Light leak under door */}
          <rect
            x="40"
            y="480"
            width="220"
            height="4"
            fill="rgba(255,220,100,0.8)"
            opacity={interpolate(frame, [40, 90], [0, 1], { extrapolateRight: "clamp" })}
          />
        </svg>
      </div>

      {/* Whispers - speech bubbles */}
      {[
        { x: 100, y: 150, delay: 30, text: "тс-с..." },
        { x: 1620, y: 250, delay: 50, text: "опасно..." },
        { x: 150, y: 700, delay: 70, text: "угроза..." },
        { x: 1550, y: 800, delay: 90, text: "что делать?" },
      ].map((bubble, i) => {
        const op = interpolate(frame - bubble.delay, [0, 20, 80, 100], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: bubble.x,
              top: bubble.y,
              opacity: op,
              padding: "12px 24px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.3)",
              backdropFilter: "blur(4px)",
              color: "#fff",
              fontSize: 28,
              fontFamily: "sans-serif",
              fontStyle: "italic",
            }}
          >
            {bubble.text}
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          bottom: "8%",
          width: "100%",
          padding: "0 100px",
        }}
      >
        <AnimatedText
          text="За закрытыми дверями"
          style={{
            ...TITLE_STYLE,
            fontSize: 80,
            color: "#fff",
          }}
          mode="reveal"
        />
        <AnimatedText
          text="о нём шепчут со страхом"
          style={{
            ...TITLE_STYLE,
            fontSize: 50,
            color: "#FFD700",
            marginTop: 20,
            fontStyle: "italic",
          }}
          mode="reveal"
          delay={45}
        />
      </div>
    </AbsoluteFill>
  );
};

import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedText, TITLE_STYLE } from "../utils";

// Scene 7: "самые могущественные банкиры планеты"
// Background: NYC skyline silhouette, Icon: bank building / dollar signs
export const Scene7: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, #1a0a2e 0%, #2c0e3f 30%, #3d1a5f 60%, #1a0a2e 100%)",
      }}
    >
      {/* Stars */}
      {Array.from({ length: 50 }).map((_, i) => {
        const seed = i * 71;
        const x = (seed * 17) % 1920;
        const y = ((seed * 23) % 500);
        const twinkle = (Math.sin((frame + seed) * 0.1) + 1) / 2;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 2,
              height: 2,
              borderRadius: "50%",
              background: "#fff",
              opacity: twinkle * 0.8,
              boxShadow: `0 0 4px rgba(255,255,255,${twinkle})`,
            }}
          />
        );
      })}

      {/* NYC skyline buildings */}
      <svg
        style={{ position: "absolute", bottom: 0, left: 0 }}
        width="1920"
        height="700"
        viewBox="0 0 1920 700"
      >
        {/* Building 1 */}
        <rect x="50" y="350" width="120" height="350" fill="#0a0a15" />
        {/* Building 2 - tall */}
        <rect x="180" y="150" width="100" height="550" fill="#0a0a15" />
        <polygon points="180,150 230,80 280,150" fill="#0a0a15" />
        {/* Building 3 */}
        <rect x="290" y="250" width="150" height="450" fill="#0a0a15" />
        {/* Empire State style */}
        <rect x="450" y="100" width="140" height="600" fill="#0a0a15" />
        <rect x="490" y="40" width="60" height="60" fill="#0a0a15" />
        <line x1="520" y1="0" x2="520" y2="40" stroke="#0a0a15" strokeWidth="4" />
        {/* Building 5 */}
        <rect x="600" y="200" width="180" height="500" fill="#0a0a15" />
        {/* Wall Street center bank */}
        <rect x="790" y="180" width="240" height="520" fill="#0a0a15" />
        {/* Columns */}
        {Array.from({ length: 6 }).map((_, i) => (
          <rect key={i} x={810 + i * 35} y="400" width="20" height="300" fill="#1a1a2e" />
        ))}
        {/* Triangle pediment */}
        <polygon points="790,400 910,300 1030,400" fill="#0a0a15" stroke="#FFD700" strokeWidth="2" />
        {/* Building 7 */}
        <rect x="1040" y="280" width="130" height="420" fill="#0a0a15" />
        {/* Building 8 - tall */}
        <rect x="1180" y="120" width="110" height="580" fill="#0a0a15" />
        {/* Building 9 */}
        <rect x="1300" y="250" width="160" height="450" fill="#0a0a15" />
        {/* Building 10 */}
        <rect x="1470" y="180" width="120" height="520" fill="#0a0a15" />
        {/* Building 11 */}
        <rect x="1600" y="320" width="140" height="380" fill="#0a0a15" />
        {/* Building 12 */}
        <rect x="1750" y="200" width="120" height="500" fill="#0a0a15" />

        {/* Windows lit up */}
        {Array.from({ length: 120 }).map((_, i) => {
          const seed = i * 41;
          const x = 60 + (seed * 7) % 1800;
          const y = 200 + (seed * 11) % 480;
          const on = (frame + seed) % 90 < 60;
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width="6"
              height="8"
              fill={on ? "#FFD700" : "#3a2510"}
              opacity={on ? 0.9 : 0.3}
            />
          );
        })}
      </svg>

      {/* Floating dollar signs */}
      {Array.from({ length: 15 }).map((_, i) => {
        const seed = i * 89;
        const x = (seed * 13) % 1920;
        const baseY = 100 + (seed % 400);
        const float = Math.sin((frame + seed) * 0.04) * 30;
        const op = interpolate(frame, [20, 60], [0, 0.7], { extrapolateRight: "clamp" });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: baseY + float,
              fontSize: 40 + (seed % 30),
              color: "#FFD700",
              opacity: op,
              textShadow: "0 0 10px rgba(255,215,0,0.8)",
              transform: `rotate(${Math.sin((frame + seed) * 0.05) * 15}deg)`,
            }}
          >
            $
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          top: "10%",
          width: "100%",
          padding: "0 100px",
        }}
      >
        <AnimatedText
          text="МОГУЩЕСТВЕННЫЕ БАНКИРЫ"
          style={{
            ...TITLE_STYLE,
            fontSize: 78,
            color: "#FFD700",
            letterSpacing: "0.03em",
            textShadow: "0 0 30px rgba(255,215,0,0.6)",
          }}
          mode="zoom"
        />
        <AnimatedText
          text="всей планеты"
          style={{
            ...TITLE_STYLE,
            fontSize: 60,
            color: "#fff",
            marginTop: 20,
          }}
          mode="zoom"
          delay={30}
        />
      </div>
    </AbsoluteFill>
  );
};

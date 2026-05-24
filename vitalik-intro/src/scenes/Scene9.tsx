import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedText, TITLE_STYLE } from "../utils";

// Scene 9: "Ему чуть за тридцать. Миллиарды на счетах"
// Background: matrix digital rain green, Icon: money counter
export const Scene9: React.FC = () => {
  const frame = useCurrentFrame();
  const count = Math.floor(interpolate(frame, [20, 120], [0, 5800], { extrapolateRight: "clamp" }));
  const age = Math.floor(interpolate(frame, [10, 60], [0, 31], { extrapolateRight: "clamp" }));

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #001a00 0%, #000a00 100%)",
      }}
    >
      {/* Matrix digital rain */}
      {Array.from({ length: 40 }).map((_, col) => {
        const x = col * 50;
        const speed = 2 + ((col * 7) % 5);
        const offset = (col * 31) % 500;
        return (
          <div key={col} style={{ position: "absolute", left: x, top: 0, height: "100%" }}>
            {Array.from({ length: 20 }).map((_, i) => {
              const charSeed = col * 100 + i * 13;
              const chars = "01アイウエオカキクケコサシスセソタチツテト";
              const ch = chars[charSeed % chars.length];
              const y = ((frame * speed + offset + i * 50) % 1200) - 50;
              const op = Math.max(0, 1 - i * 0.1);
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    top: y,
                    color: i === 0 ? "#fff" : "#00ff41",
                    fontSize: 24,
                    fontFamily: "monospace",
                    opacity: op,
                    textShadow: "0 0 8px #00ff41",
                  }}
                >
                  {ch}
                </div>
              );
            })}
          </div>
        );
      })}

      {/* Age counter top */}
      <div
        style={{
          position: "absolute",
          left: "10%",
          top: "20%",
          background: "rgba(0, 30, 0, 0.8)",
          border: "2px solid #00ff41",
          borderRadius: 12,
          padding: "30px 50px",
          fontFamily: "monospace",
          boxShadow: "0 0 30px rgba(0,255,65,0.4)",
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ color: "#00ff41", fontSize: 30, opacity: 0.7 }}>AGE</div>
        <div style={{ color: "#fff", fontSize: 120, fontWeight: 700, lineHeight: 1, textShadow: "0 0 20px #00ff41" }}>
          {age}
        </div>
        <div style={{ color: "#00ff41", fontSize: 24, marginTop: 5 }}>YEARS_OLD</div>
      </div>

      {/* Money counter */}
      <div
        style={{
          position: "absolute",
          right: "8%",
          top: "30%",
          background: "rgba(0, 30, 0, 0.8)",
          border: "2px solid #FFD700",
          borderRadius: 12,
          padding: "30px 50px",
          fontFamily: "monospace",
          boxShadow: "0 0 30px rgba(255,215,0,0.5)",
          opacity: interpolate(frame, [20, 50], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ color: "#FFD700", fontSize: 28, opacity: 0.8 }}>NET_WORTH</div>
        <div style={{ color: "#fff", fontSize: 100, fontWeight: 700, lineHeight: 1, textShadow: "0 0 20px #FFD700" }}>
          ${count}M
        </div>
        <div style={{ color: "#FFD700", fontSize: 22, marginTop: 5 }}>USD</div>
      </div>

      {/* Bottom text */}
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
          text="Тридцать лет."
          style={{
            ...TITLE_STYLE,
            fontSize: 80,
            color: "#00ff41",
            fontFamily: "monospace",
            textShadow: "0 0 30px #00ff41",
          }}
          mode="fade"
          delay={60}
        />
        <AnimatedText
          text="Миллиарды на счетах."
          style={{
            ...TITLE_STYLE,
            fontSize: 60,
            color: "#FFD700",
            fontFamily: "monospace",
            marginTop: 15,
            textShadow: "0 0 30px #FFD700",
          }}
          mode="fade"
          delay={90}
        />
      </div>
    </AbsoluteFill>
  );
};

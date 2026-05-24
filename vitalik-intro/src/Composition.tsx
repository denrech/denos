import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Scene1 } from "./scenes/Scene1";
import { Scene2 } from "./scenes/Scene2";
import { Scene3 } from "./scenes/Scene3";
import { Scene4 } from "./scenes/Scene4";
import { Scene5 } from "./scenes/Scene5";
import { Scene6 } from "./scenes/Scene6";
import { Scene7 } from "./scenes/Scene7";
import { Scene8 } from "./scenes/Scene8";
import { Scene9 } from "./scenes/Scene9";
import { Scene10 } from "./scenes/Scene10";
import { Scene11 } from "./scenes/Scene11";
import { Scene12 } from "./scenes/Scene12";

const SCENE = 150; // 5 seconds at 30 fps

export const VitalikIntro: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Sequence from={0} durationInFrames={SCENE}>
        <Scene1 />
      </Sequence>
      <Sequence from={SCENE * 1} durationInFrames={SCENE}>
        <Scene2 />
      </Sequence>
      <Sequence from={SCENE * 2} durationInFrames={SCENE}>
        <Scene3 />
      </Sequence>
      <Sequence from={SCENE * 3} durationInFrames={SCENE}>
        <Scene4 />
      </Sequence>
      <Sequence from={SCENE * 4} durationInFrames={SCENE}>
        <Scene5 />
      </Sequence>
      <Sequence from={SCENE * 5} durationInFrames={SCENE}>
        <Scene6 />
      </Sequence>
      <Sequence from={SCENE * 6} durationInFrames={SCENE}>
        <Scene7 />
      </Sequence>
      <Sequence from={SCENE * 7} durationInFrames={SCENE}>
        <Scene8 />
      </Sequence>
      <Sequence from={SCENE * 8} durationInFrames={SCENE}>
        <Scene9 />
      </Sequence>
      <Sequence from={SCENE * 9} durationInFrames={SCENE}>
        <Scene10 />
      </Sequence>
      <Sequence from={SCENE * 10} durationInFrames={SCENE}>
        <Scene11 />
      </Sequence>
      <Sequence from={SCENE * 11} durationInFrames={SCENE}>
        <Scene12 />
      </Sequence>
    </AbsoluteFill>
  );
};

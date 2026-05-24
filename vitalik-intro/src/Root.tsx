import { Composition } from "remotion";
import { VitalikIntro } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="VitalikIntro"
        component={VitalikIntro}
        durationInFrames={60 * 30}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

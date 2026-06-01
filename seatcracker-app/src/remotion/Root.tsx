import { Composition, Folder, Still } from "remotion";
import { SeatCrackerAd, SeatCrackerThumbnail } from "./SeatCrackerAd";

export const RemotionRoot = () => {
  return (
    <Folder name="SeatCracker">
      <Composition
        id="SeatCrackerAd60"
        component={SeatCrackerAd}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ variant: "short" as const }}
      />
      <Still
        id="SeatCrackerThumbnail"
        component={SeatCrackerThumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="SeatCrackerAd150"
        component={SeatCrackerAd}
        durationInFrames={4500}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ variant: "long" as const }}
      />
    </Folder>
  );
};

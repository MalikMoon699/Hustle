import {
  AbsoluteFill,
  Audio,
  Sequence,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Player } from "@remotion/player";
import React from "react";

export const VideoPlayer = ({ videoData }) => {
  const scenes = videoData.scenes || [];

  const lastScene = scenes[scenes.length - 1];
  let durationInSeconds = 30;
  if (lastScene && lastScene.timestamp) {
    const [, end] = lastScene.timestamp.split(" - ");
    const [endMin, endSec] = end.split(":").map(Number);
    durationInSeconds = endMin * 60 + endSec;
  }

  const fps = 30;
  const durationInFrames = Math.round(durationInSeconds * fps);

  return (
    <div
      id="videoSection"
      style={{
        width: "100%",
        aspectRatio: "16 / 9",
        maxWidth: "1200px",
        margin: "0 auto",
        borderRadius: "4px",
        overflow: "hidden",
      }}
      className="video-player-container"
    >
      <Player
        component={VideoComposition}
        durationInFrames={durationInFrames}
        fps={fps}
        compositionWidth={1920}
        compositionHeight={1080}
        style={{ width: "100%", height: "100%" }}
        inputProps={{ videoData }}
        controls
        // autoPlay
        acknowledgeRemotionLicense
      />
    </div>
  );
};

// const VideoComposition = ({ videoData }) => {
//   const frame = useCurrentFrame();
//   const { fps } = useVideoConfig();

//   const scenes = videoData.scenes || [];
//   const wordsArray = videoData?.captions?.fullResponse?.words || [];

//   const parseTimestamp = (timestamp) => {
//     const [start, end] = timestamp.split(" - ");
//     const [startMin, startSec] = start.split(":").map(Number);
//     const [endMin, endSec] = end.split(":").map(Number);
//     return {
//       startFrame: (startMin * 60 + startSec) * fps,
//       durationInFrames: (endMin * 60 + endSec - startMin * 60 - startSec) * fps,
//       startTimeMs: startMin * 60 * 1000 + startSec * 1000,
//       endTimeMs: endMin * 60 * 1000 + endSec * 1000,
//     };
//   };

//   return (
//     <AbsoluteFill
//       style={{
//         backgroundColor: "#000",
//         fontFamily: "Arial, sans-serif",
//       }}
//     >
//       {scenes.map((scene, index) => {
//         const { startFrame, durationInFrames, startTimeMs, endTimeMs } =
//           parseTimestamp(scene.timestamp);

//         // Filter words that fall within this scene’s time range
//         const sceneWords = wordsArray
//           .filter((word) => word.start >= startTimeMs && word.end <= endTimeMs)
//           .map((word) => word.text)
//           .join(" ");

//         const opacity = interpolate(
//           frame,
//           [
//             startFrame,
//             startFrame + fps * 0.5,
//             startFrame + durationInFrames - fps * 0.5,
//             startFrame + durationInFrames,
//           ],
//           [0, 1, 1, 0],
//           { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
//         );

//         return (
//           <Sequence
//             key={index}
//             from={startFrame}
//             durationInFrames={durationInFrames}
//           >
//             <AbsoluteFill style={{ opacity }}>
//               {scene.imageUrl ? (
//                 <Img
//                   src={scene.imageUrl}
//                   style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                 />
//               ) : (
//                 <AbsoluteFill style={{ backgroundColor: "#000" }} />
//               )}

//               {/* Caption at bottom */}
//               <AbsoluteFill
//                 style={{
//                   justifyContent: "flex-end",
//                   alignItems: "center",
//                   paddingBottom: 60,
//                   paddingLeft: 40,
//                   paddingRight: 40,
//                 }}
//               >
//                 <div
//                   style={{
//                     fontSize: 38,
//                     color: "white",
//                     textShadow: "2px 2px 10px black",
//                     textAlign: "center",
//                     background: "rgba(0,0,0,0.5)",
//                     padding: "16px 32px",
//                     borderRadius: 16,
//                     maxWidth: "90%",
//                     lineHeight: 1.4,
//                   }}
//                 >
//                   {sceneWords}
//                 </div>
//               </AbsoluteFill>
//             </AbsoluteFill>
//           </Sequence>
//         );
//       })}

//       {videoData.voiceUrl && <Audio src={videoData.voiceUrl} />}
//     </AbsoluteFill>
//   );
// };

const VideoComposition = ({ videoData }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scenes = videoData.scenes || [];
  const wordsArray = videoData?.captions?.fullResponse?.words || [];

  const parseTimestamp = (timestamp) => {
    const [start, end] = timestamp.split(" - ");
    const [startMin, startSec] = start.split(":").map(Number);
    const [endMin, endSec] = end.split(":").map(Number);
    return {
      startFrame: (startMin * 60 + startSec) * fps,
      durationInFrames: (endMin * 60 + endSec - startMin * 60 - startSec) * fps,
      startTimeMs: startMin * 60 * 1000 + startSec * 1000,
      endTimeMs: endMin * 60 * 1000 + endSec * 1000,
    };
  };

  const currentTimeMs = (frame / fps) * 1000;

  return (
    <AbsoluteFill
      style={{ backgroundColor: "#000", fontFamily: "Arial, sans-serif" }}
    >
      {scenes.map((scene, index) => {
        const { startFrame, durationInFrames, startTimeMs, endTimeMs } =
          parseTimestamp(scene.timestamp);
        const sceneWords = wordsArray
          .filter(
            (word) =>
              word.start >= startTimeMs &&
              word.end <= endTimeMs &&
              word.end <= currentTimeMs,
          )
          .map((word) => word.text)
          .join(" ");

        const opacity = interpolate(
          frame,
          [
            startFrame,
            startFrame + fps * 0.5,
            startFrame + durationInFrames - fps * 0.5,
            startFrame + durationInFrames,
          ],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        return (
          <Sequence
            key={index}
            from={startFrame}
            durationInFrames={durationInFrames}
          >
            <AbsoluteFill style={{ opacity }}>
              {scene.imageUrl ? (
                <Img
                  src={scene.imageUrl}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <AbsoluteFill style={{ backgroundColor: "#000" }} />
              )}
              <AbsoluteFill
                style={{
                  justifyContent: "flex-end",
                  alignItems: "center",
                  paddingBottom: 60,
                  paddingLeft: 40,
                  paddingRight: 40,
                }}
              >
                <div
                  style={{
                    fontSize: 38,
                    color: "white",
                    textShadow: "2px 2px 10px black",
                    textAlign: "center",
                    background: "rgba(0,0,0,0.5)",
                    padding: "16px 32px",
                    borderRadius: 16,
                    maxWidth: "90%",
                    lineHeight: 1.4,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {sceneWords}
                </div>
              </AbsoluteFill>
            </AbsoluteFill>
          </Sequence>
        );
      })}

      {videoData.voiceUrl && <Audio src={videoData.voiceUrl} />}
    </AbsoluteFill>
  );
};

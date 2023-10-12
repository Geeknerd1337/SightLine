/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import {
  VideoTimelineBackground,
  VideoTimelineSeeker,
  TimelineContainer,
} from "@/styles/VideoStyles";
import WaveSurfer from "wavesurfer.js";
import styled from "@emotion/styled";
import Hover from "wavesurfer.js/dist/plugins/hover";
import Timeline from "wavesurfer.js/dist/plugins/timeline";

import { Colors } from "@/styles/colors";
import { ModalContent } from "./Video";

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;
  padding-top: 35px;

  & .controlbutton {
    width: 50px;
    height: auto;
  }
`;
import { Results } from "../helpers/AnalysisFunctions";
interface VideoTimelineProps {
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  results: Results | null;
  setWarnings?: React.Dispatch<React.SetStateAction<Results | null>>;
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setModalContent?: React.Dispatch<React.SetStateAction<ModalContent | null>>;
}

//TODO: The modal content should be converted to components at some point so we can do stuff like embed links and shit
// there is a copy of the following 3 variabls in Video.tsx, this is bad and shitty
const LightModalContent: ModalContent = {
  title: "Light Warning",
  text: "This portion of the video contains flashing lights which can be cause seizures in those suffering from eplipsy. Be sure to include a warnings that flashing lights may be present or consider adding a setting to disable them entirely.",
};

const BlueModalContent: ModalContent = {
  title: "Blue Light Warning",
  text: "This portion of the video contains blue light which can cause eye strain and headaches. Be sure to include a warnings that blue light may be present or consider adding a setting to disable them entirely.",
};

const LuminanceModalWarning: ModalContent = {
  title: "Luminance Warning",
  text: "This portion of the video contains a large change in luminance which can cause eye strain and headaches. Be sure to include a warnings that luminance changes may be present or consider adding a setting to disable them entirely.",
};

export default function VideoTimeline(props: VideoTimelineProps) {
  const [seekerPosition, setSeekerPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null); // Declare the ref

  useEffect(() => {
    const videoElement = props.videoRef.current;

    if (videoElement) {
      videoElement.addEventListener("loadeddata", () => {
        try {
          const bottomTimline = Timeline.create({
            container: "#waveform",
            height: 20,
            timeInterval: 0.1,
            primaryLabelInterval: 1,
            style: {
              fontSize: "15px",
              color: `${Colors.Gold}`,
            },
          });

          const ws = WaveSurfer.create({
            container: "#waveform",
            waveColor: `${Colors.Charcoal}`,
            progressColor: `${Colors.Charcoal}`,
            media: videoElement,
            height: "auto",
            cursorColor: `${Colors.Gold}`,
            minPxPerSec: 100,
            plugins: [
              Hover.create({
                lineColor: "#ff0000",
                lineWidth: 2,
                labelBackground: "#555",
                labelColor: "#fff",
                labelSize: "11px",
              }),
              bottomTimline,
            ],
          });

          waveSurferRef.current = ws;

          // Rewind to the beginning on finished playing
          ws.on("finish", () => {
            ws.setTime(0);
          });
        } catch (error) {
          console.error("Error initializing WaveSurfer:", error);
          // Handle initialization error here, e.g., display an error message to the user.
        }
      });
    }
  }, [props.videoRef]);

  const updateVideoTime = (clientX: number) => {
    if (!timelineRef.current || !props.videoRef.current) return;

    const bounds = timelineRef.current.getBoundingClientRect();
    const clickPosition = clientX - bounds.left;
    const percentage = clickPosition / bounds.width;
    const newTime = percentage * props.videoRef.current.duration;

    props.videoRef.current.currentTime = newTime;
    setSeekerPosition(percentage * 100);
  };

  useEffect(() => {
    const updateSeekerPosition = () => {
      if (!props.videoRef.current) return;
      const percentage =
        (props.videoRef.current.currentTime / props.videoRef.current.duration) *
        100;
      setSeekerPosition(percentage);

      // // Get the warnings for the current time
      // if (props.results) {
      //   const flashWarning = props.results.flashWarning.filter(
      //     (warning) =>
      //       warning.startTime <= props.videoRef.current!.currentTime &&
      //       warning.endTime >= props.videoRef.current!.currentTime
      //   );

      //   const contrastWarnings = props.results.contrastWarning.filter(
      //     (warning) =>
      //       warning.startTime <= props.videoRef.current!.currentTime &&
      //       warning.endTime >= props.videoRef.current!.currentTime
      //   );

      //   const blueLightWarnings = props.results.blueLightWarning.filter(
      //     (warning) =>
      //       warning.startTime <= props.videoRef.current!.currentTime &&
      //       warning.endTime >= props.videoRef.current!.currentTime
      //   );

      //   // Set the warnings as a results object
      //   const warnings: Results = {
      //     flashWarning,
      //     contrastWarning: contrastWarnings,
      //     blueLightWarning: blueLightWarnings,
      //   };

      //   // Set the warnings
      //   props.setWarnings && props.setWarnings(warnings);

      //   console.log(warnings);
      // }
    };

    props.videoRef.current?.addEventListener(
      "timeupdate",
      updateSeekerPosition
    );

    return () => {
      props.videoRef.current?.removeEventListener(
        "timeupdate",
        updateSeekerPosition
      );
    };
  }, [props, props.videoRef]);

  return (
    <TimelineContainer>
      <VideoTimelineBackground
        id="video-timeline"
        ref={timelineRef}
        onClick={(e) => !isDragging && updateVideoTime(e.clientX)}
        onMouseDown={() => setIsDragging(true)}
        onMouseMove={(e) => isDragging && updateVideoTime(e.clientX)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        <div className="waveformContainer" id="waveform"></div>
        <VideoTimelineSeeker
          style={{ left: `${seekerPosition}%` }}
        ></VideoTimelineSeeker>

        <div className="warningContainer">
          <div className="warningRow">
            {/* Map all the flash warnings from results*/}
            {props.videoRef.current &&
              props.results &&
              props.results.flashWarning.map((flash, index) => {
                return (
                  <button
                    className="warning"
                    style={{
                      position: "absolute",
                      left: `${
                        (flash.startTime / props.videoRef.current!.duration) *
                        100
                      }%`,
                      width: `${
                        ((flash.endTime - flash.startTime) /
                          props.videoRef.current!.duration) *
                        100
                      }%`,
                      height: "100%",
                      backgroundColor: "red",
                    }}
                    key={index}
                    onClick={() => {
                      props.setModalContent &&
                        props.setModalContent(LightModalContent);
                      props.setModalOpen && props.setModalOpen(true);
                    }}
                  ></button>
                );
              })}
          </div>
          <div className="warningRow">
            {props.videoRef.current &&
              props.results &&
              props.results.contrastWarning.map((contrast, index) => {
                return (
                  <button
                    className="warning"
                    style={{
                      position: "absolute",
                      left: `${
                        (contrast.startTime /
                          props.videoRef.current!.duration) *
                        100
                      }%`,
                      width: `${
                        ((contrast.endTime - contrast.startTime) /
                          props.videoRef.current!.duration) *
                        100
                      }%`,
                      height: "100%",
                      backgroundColor: "green",
                    }}
                    key={index}
                    onClick={() => {
                      props.setModalContent &&
                        props.setModalContent(LuminanceModalWarning);
                      props.setModalOpen && props.setModalOpen(true);
                    }}
                  ></button>
                );
              })}
          </div>
          <div className="warningRow">
            {props.videoRef.current &&
              props.results &&
              props.results.blueLightWarning.map((bluelight, index) => {
                return (
                  <button
                    className="warning"
                    style={{
                      position: "absolute",
                      left: `${
                        (bluelight.startTime /
                          props.videoRef.current!.duration) *
                        100
                      }%`,
                      width: `${
                        ((bluelight.endTime - bluelight.startTime) /
                          props.videoRef.current!.duration) *
                        100
                      }%`,
                      height: "100%",
                      backgroundColor: "blue",
                    }}
                    key={index}
                    onClick={() => {
                      props.setModalContent &&
                        props.setModalContent(BlueModalContent);
                      props.setModalOpen && props.setModalOpen(true);
                    }}
                  ></button>
                );
              })}
          </div>
        </div>
      </VideoTimelineBackground>
      <ButtonsContainer>
        <img
          className="controlbutton"
          src="/videoplayer/back.svg"
          alt="back 10 seconds"
          onClick={() => {
            if (props.videoRef.current) {
              props.videoRef.current.currentTime -= 10;
            }
          }}
        />
        {props.videoRef.current?.paused ? (
          <img
            className="controlbutton"
            src="/videoplayer/play_arrow.svg"
            alt="play"
            onClick={() => {
              if (props.videoRef.current) {
                props.videoRef.current.play();
              }
            }}
          />
        ) : (
          <img
            className="controlbutton"
            src="/videoplayer/pause.svg"
            alt="pause"
            onClick={() => {
              if (props.videoRef.current) {
                props.videoRef.current.pause();
              }
            }}
          />
        )}
        <img
          className="controlbutton"
          src="/videoplayer/forward.svg"
          alt="forward 10 seconds"
          onClick={() => {
            if (props.videoRef.current) {
              props.videoRef.current.currentTime += 10;
            }
          }}
        />
      </ButtonsContainer>
    </TimelineContainer>
  );
}

//This used to be in the above function, moving it here in case I need it later
//   const audioContext = new AudioContext();

//   useEffect(() => {
//     if (props.videoRef.current) {
//       props.videoRef.current.currentTime = 0;

//       const video = props.videoRef.current;

//       // Set up the audio context
//       const audioContext = new AudioContext();
//       const source = audioContext.createMediaElementSource(video);
//       const analyser = audioContext.createAnalyser();
//       source.connect(analyser);
//       analyser.connect(audioContext.destination);

//       analyser.fftSize = 2048;
//       const bufferLength = analyser.frequencyBinCount;
//       const dataArray = new Uint8Array(bufferLength);

//       analyser.getByteTimeDomainData(dataArray);

//       const canvas = canvasRef.current;

//       if (canvas) {
//         const ctx = canvas.getContext("2d");
//         if (ctx) {
//           const width = canvas.width;
//           const height = canvas.height;

//           ctx.clearRect(0, 0, width, height);
//           ctx.beginPath();
//           const sliceWidth = (width * 1.0) / bufferLength;
//           let x = 0;

//           for (let i = 0; i < bufferLength; i++) {
//             const v = dataArray[i] / 128.0;
//             const y = (v * height) / 2;

//             if (i === 0) {
//               ctx.moveTo(x, y);
//             } else {
//               ctx.lineTo(x, y);
//             }

//             x += sliceWidth;
//           }

//           ctx.lineTo(width, height / 2);
//           ctx.strokeStyle = "red";
//           ctx.lineWidth = 2;
//           ctx.stroke();
//         }
//       }
//     }
//   }, [props.videoRef]);

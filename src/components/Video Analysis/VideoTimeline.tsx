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
            timeInterval: 0.2,
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
                      backgroundColor: "#FF6B6B",
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
                      backgroundColor: "#65FFA9",
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
                      backgroundColor: "#6B7CFF",
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

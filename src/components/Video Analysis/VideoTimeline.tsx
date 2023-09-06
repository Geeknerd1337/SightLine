import React, { useEffect, useRef, useState } from "react";
import {
  VideoTimelineBackground,
  VideoTimelineSeeker,
} from "@/styles/VideoStyles";

interface VideoTimelineProps {
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
}

export default function VideoTimeline(props: VideoTimelineProps) {
  const [seekerPosition, setSeekerPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

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
  }, [props.videoRef]);

  return (
    <VideoTimelineBackground
      id="video-timeline"
      ref={timelineRef}
      onClick={(e) => !isDragging && updateVideoTime(e.clientX)}
      onMouseDown={() => setIsDragging(true)}
      onMouseMove={(e) => isDragging && updateVideoTime(e.clientX)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
    >
      <VideoTimelineSeeker
        style={{ left: `${seekerPosition}%` }}
      ></VideoTimelineSeeker>
    </VideoTimelineBackground>
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

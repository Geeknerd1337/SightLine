import { VideoTimelineBackground, VideoWaveform } from "@/styles/VideoStyles";
import { useEffect, useRef } from "react";
//Video timeline props
interface VideoTimelineProps {
  //Videoref
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  //Canvasref
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
}

export default function VideoTimeline(props: VideoTimelineProps) {
  //Canvasref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContext = new AudioContext();

  useEffect(() => {
    if (props.videoRef.current) {
      props.videoRef.current.currentTime = 0;

      const video = props.videoRef.current;

      // Set up the audio context
      const audioContext = new AudioContext();
      const source = audioContext.createMediaElementSource(video);
      const analyser = audioContext.createAnalyser();
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      analyser.fftSize = 2048;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      analyser.getByteTimeDomainData(dataArray);

      const canvas = canvasRef.current;

      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const width = canvas.width;
          const height = canvas.height;

          ctx.clearRect(0, 0, width, height);
          ctx.beginPath();
          const sliceWidth = (width * 1.0) / bufferLength;
          let x = 0;

          for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            const y = (v * height) / 2;

            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }

            x += sliceWidth;
          }

          ctx.lineTo(width, height / 2);
          ctx.strokeStyle = "red";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
    }
  }, [props.videoRef]);

  return (
    <VideoTimelineBackground>
      <VideoWaveform ref={canvasRef} />
    </VideoTimelineBackground>
  );
}

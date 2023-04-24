import { useState, useRef } from "react";

interface SandboxResponse {
  result: number;
  analysis: Record<string, any>;
}

const getFrameLuminance = (canvas: HTMLCanvasElement): number => {
  // get the canvas context
  const context = canvas.getContext("2d");

  if (!context) {
    return -1;
  }

  // get the pixel data for the canvas
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  // calculate the average luminance of the frame
  let sum = 0;
  for (let i = 0; i < imageData.data.length; i += 4) {
    const r = imageData.data[i];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    sum += luminance;
  }
  const avgLuminance = sum / (imageData.data.length / 4);

  return avgLuminance;
};

export default function Sandbox() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [luminanceValues, setLuminanceValues] = useState<number[]>([]);

  const handleVideoLoad = async () => {
    // wait for the video to be loaded
    await videoRef.current?.play();

    // create a canvas element with the same dimensions as the video
    const canvas = canvasRef.current!;
    canvas.width = videoRef.current!.videoWidth;
    canvas.height = videoRef.current!.videoHeight;

    // loop through each frame of the video
    const values: number[] = [];
    for (let i = 0; i < videoRef.current!.duration; i += 1 / 30) {
      // set the video time to the current frame
      videoRef.current!.currentTime = i;

      // draw the current frame onto the canvas
      canvas.getContext("2d")!.drawImage(videoRef.current!, 0, 0);

      // get the luminance of the current frame
      const luminance = getFrameLuminance(canvas);

      // add the luminance to the list of values
      values.push(luminance);
    }

    // update the state with the list of luminance values
    setLuminanceValues(values);
  };

  return (
    <>
      <video ref={videoRef} onLoadedData={handleVideoLoad}>
        <source src="/path/to/video.mp4" type="video/mp4" />
      </video>
      <canvas ref={canvasRef} style={{}} />
      <ul>
        {luminanceValues.map((value, i) => (
          <li key={i}>{value.toFixed(2)}</li>
        ))}
      </ul>
    </>
  );
}

import { useState, useRef } from "react";

import { getFrameLuminance, getMidpoints, checkFlashes } from "@/components/Analysis";

interface SandboxResponse {
  result: number;
  analysis: Record<string, any>;
}

export default function Sandbox() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [luminanceValues, setLuminanceValues] = useState<number[]>([]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // load the video file
    const videoUrl = URL.createObjectURL(file);
    videoRef.current!.src = videoUrl;

    // wait for the video to be loaded
    await videoRef.current?.play();

    // create a canvas element with the same dimensions as the video
    const canvas = canvasRef.current!;
    canvas.width = videoRef.current!.videoWidth;
    canvas.height = videoRef.current!.videoHeight;

    const frames = videoRef.current!.duration * 20;
    let lastFrame = -1;

    // loop through each frame of the video
    const values: number[] = [];
    for (let i = 0; i < videoRef.current!.duration; i += 1 / 90) {
      const currentFrame = Math.floor(i * 20);
      videoRef.current!.currentTime = i;
      videoRef.current?.pause();

      console.log("Frame: " + currentFrame + "Old Frame: " + lastFrame);

      if (currentFrame === lastFrame) continue;

      // draw the current frame onto the canvas
      canvas.getContext("2d")!.drawImage(videoRef.current!, 0, 0);

      // get the luminance of the current frame
      const luminance = getFrameLuminance(canvas);

      // console.log("Frame: " + currentFrame + " Luminance: " + luminance);

      // add the luminance to the list of values
      values.push(luminance);

      // set the video time to the current frame

      lastFrame = Math.floor(i * 20);

      //Wait for the next frame
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    //SEE IF WE CAN FIND FPS FROM VIDEO
    const fps = 30;

    const midpoints = getMidpoints(values);
    const flashNum = checkFlashes(values, midpoints, fps);

    document.getElementById("flash")!.innerHTML = "Number of flashes: " + flashNum.toString();


    // update the state with the list of luminance values
    setLuminanceValues(values);
  };

  return (
    <>
      <input type="file" accept="video/*" onChange={handleFileUpload} />
      <video ref={videoRef} style={{}} controls>
        <source src="" type="video/mp4" />
      </video>
      <canvas hidden ref={canvasRef} style={{}} />
      <ul>
        {luminanceValues.map((value, i) => (
          <li key={i}>
            Frame:{i}: {value.toFixed(2)}
          </li>
        ))}
      </ul>
      <p id="flash"></p>
    </>
  );
}

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

const getMidpoints = (values: any) =>{
  let count = 0

  const midpoints: number[] = [];

  //find the spots where the luminance is between the last and next values
  for (let i = 1; i < values.length - 1; i++){
      let brighterThanNext = (values[i] >= values[i + 1]);
      let brighterThanPrev = (values[i] >= values[i - 1]);
      let darkerThanNext = (values[i] <= values[i + 1]);
      let darkerThanPrev = (values[i] <= values[i - 1]);

      if(brighterThanNext && brighterThanPrev || darkerThanNext && darkerThanPrev){
        midpoints.push(i)
      }
  }

  return midpoints
}

const checkFlashes = (values: any, midpoints: any, fps:number) =>{

  let flashNum = 0;

  //check how many flashes there are in a second
  for (let i = 0; i < midpoints.length - 1; i++){
    let j = 0;
    let inTime = true;
    
    if (flashNum > 6) {
      break;
    }
    else {
      flashNum = 0;
    }

    while (inTime){
      j += 1;

      if ((i + j) < midpoints.length) {
        //if the this point is still in the second
        if ((midpoints[i + j] - midpoints[i]) <= fps){
        //if it counts as a flash
          if (Math.abs(values[midpoints[i + j]] - values[midpoints[i]]) > 20){
            flashNum += 1;
          }
        }
        else {
          inTime = false;
        }
      }
      else {
        break;
      }
    }
  }

  return flashNum;
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
      <canvas ref={canvasRef} style={{}} />
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

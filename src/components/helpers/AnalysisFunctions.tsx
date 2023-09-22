import React from 'react';
import { getFrameLuminance } from './flash';

export const Analyze = async (
  videoRef: React.RefObject<HTMLVideoElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  callback: (e: any) => void
) => {
  // wait for the video to be loaded
  await videoRef.current?.play();

  // create a canvas element with the same dimensions as the video
  const canvas = canvasRef.current!;
  canvas.width = videoRef.current!.videoWidth;
  canvas.height = videoRef.current!.videoHeight;

  const numPixels = canvas.width * canvas.height;

  const frames = videoRef.current!.duration * 20;
  let lastFrame = -1;

  // loop through each frame of the video
  const values: number[] = [];
  const BLvalues: number[] = [];
  const Flashes: Flash[] = [];
  const FlashWarnings: Warning[] = [];

  let lastFlash = -1;
  let currentSecond = 0;
  let flashesPerSecond = 0;

  let lastSecond = 0;

  for (let i = 0; i < videoRef.current!.duration; i += 1 / 90) {
    const currentFrame = Math.floor(i * 20);
    videoRef.current!.currentTime = i;
    videoRef.current?.pause();

    currentSecond = Math.floor(i);

    //console.log("Frame: " + currentFrame + "Old Frame: " + lastFrame);

    if (currentFrame === lastFrame) continue;

    // draw the current frame onto the canvas
    canvas.getContext('2d')!.drawImage(videoRef.current!, 0, 0);

    // get the luminance of the current frame
    const luminance = getFrameLuminance(canvas);

    //Get the ditance between the luminance and lastflash
    const distance = Math.abs(luminance - lastFlash);

    if (distance > 20) {
      if (lastSecond !== currentSecond) {
        if (flashesPerSecond < 3) {
        }
      }

      flashesPerSecond += 1;
    }

    lastFlash = luminance;

    // const numBLpixels = getFrameBlueLight(canvas);

    // BLvalues.push(Math.floor((numBLpixels / numPixels) * 100));

    // console.log("Frame: " + currentFrame + " Luminance: " + luminance);

    // add the luminance to the list of values
    // values.push(luminance);

    // set the video time to the current frame

    lastFrame = Math.floor(i * 20);
    lastSecond = currentSecond;

    //Wait for the next frame
    await new Promise((resolve) => setTimeout(resolve, 25));
  }

  // const fps = 30;

  // const midpoints = getMidpoints(values);
  // const flashNum = checkFlashes(values, midpoints, fps);

  console.log('BLARR: ' + BLvalues);

  let returnObj: Results = {
    flashWarning: FlashWarnings,
    blueLightWarning: [],
    contrastWarning: [],
  };

  if (callback) callback(returnObj);
  return returnObj;
  // document.getElementById("flash")!.innerHTML =
  //   "Number of flashes: " + flashNum.toString();

  // update the state with the list of luminance values
  // setLuminanceValues(values);
};

// Results interface
export interface Results {
  flashWarning: Warning[];
  blueLightWarning: Warning[];
  contrastWarning: Warning[];
}

export interface Warning {
  startTime: number;
  endTime: number;
}

//A flash is a data point consisting of a second and the number of flashes in that second
interface Flash {
  flashes: number;
}

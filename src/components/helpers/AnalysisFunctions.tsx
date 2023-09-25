import React from 'react';
import { getFrameLuminance } from './flash';
import { getMidpoints } from './flash';
import { checkFlashes } from './flash';
import { getFlashArr } from './flash';

import { FlashAnalyzer } from './FlashAnalyzer';

export const Analyze = async (
  videoRef: React.RefObject<HTMLVideoElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  callback: (e: any) => void
) => {
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

  let flashAnalyzer = new FlashAnalyzer();

  for (let i = 0; i < videoRef.current!.duration; i += 1 / 90) {
    const currentFrame = Math.floor(i * 20);
    videoRef.current!.currentTime = i;
    videoRef.current?.pause();

    currentSecond = Math.floor(i);

    //console.log("Frame: " + currentFrame + "Old Frame: " + lastFrame);

    if (currentFrame === lastFrame) continue;

    // draw the current frame onto the canvas
    canvas.getContext('2d')!.drawImage(videoRef.current!, 0, 0);

    let flashNum = 0;

    //flashes
    // for (let i = 0; i < 60; i += 1) {
    //   values[i] = getFrameLuminance(canvas);
    //   const midpoints = getMidpoints(values);
    //   flashNum = checkFlashes(values, midpoints, 30);
    //   var flashes = getFlashArr(values, midpoints, 30);
    // }

    await flashAnalyzer.analyze(canvas, videoRef);

    lastFrame = Math.floor(i * 20);
    lastSecond = currentSecond;

    //Wait for the next frame
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  let returnObj: Results = {
    flashWarning: FlashWarnings,
    blueLightWarning: [],
    contrastWarning: [],
  };

  if (callback) callback(returnObj);
  return returnObj;
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
  second: number;
}

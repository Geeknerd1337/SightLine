import React from 'react';
import { getFrameLuminance } from './flash';
import { getMidpoints } from './flash';
import { checkFlashes } from './flash';
import { getFlashArr } from './flash';

import { FlashAnalyzer } from './FlashAnalyzer';

function pixelDataDifference(data1: Uint8Array, data2: Uint8Array): number {
  // Compare the pixel data of two frames and return the difference
  let difference = 0;
  for (let i = 0; i < data1.length; i++) {
    difference += Math.abs(data1[i] - data2[i]);
  }
  return difference;
}

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


  let previousFrameData: Uint8Array | null = null;
  let currentFrame = 0;

  for (let i = 0; i < videoRef.current!.duration; i += 1 / 65) {
    videoRef.current!.currentTime = i;
    videoRef.current?.pause();

    currentSecond = Math.floor(i);

    canvas.getContext('2d')!.drawImage(videoRef.current!, 0, 0);
    const currentFrameData = new Uint8Array(
      canvas
        .getContext('2d')!
        .getImageData(0, 0, canvas.width, canvas.height).data
    );

    if (previousFrameData) {
      // Compare the pixel data of the two frames
      const pixelDifference = pixelDataDifference(
        currentFrameData,
        previousFrameData
      );

      if (pixelDifference > 0) {
        // Frame has changed
        // You can perform additional analysis or actions here
          getFrameLuminance(canvas)
          //try and run it through each function
        currentFrame++;
      }
    }

    previousFrameData = currentFrameData;

   
    await new Promise((resolve) => setTimeout(resolve, 25));
  }

  let returnObj: Results = {
    flashWarning: flashAnalyzer.FlashWarnings,
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

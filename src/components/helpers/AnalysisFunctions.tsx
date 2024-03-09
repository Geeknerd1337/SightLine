import React from 'react';
import { getFrameLuminance } from './flash';
import { getMidpoints } from './flash';
import { checkFlashes } from './flash';
import { getFlashArr } from './flash';
//comment for github

import { FlashAnalyzer } from './FlashAnalyzer';
import { BlueLightAnalyzer } from './BlueLightAnalyzer';
import { LuminanceAnalyzer } from './LuminanceAnalyzer';

function pixelDataDifference(data1: Uint8Array, data2: Uint8Array): number {
  // Compare the pixel data of two frames and return the difference
  let difference = 0;
  const length = data1.length;

  for (let i = 0; i < length; i++) {
    const pixelDiff = data1[i] - data2[i];
    difference += pixelDiff < 0 ? -pixelDiff : pixelDiff;
  }

  return difference;
}

export const Analyze = async (
  videoRef: React.RefObject<HTMLVideoElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  callback: (e: any) => void
) => {
  ///Creating the canvas from the video reference
  const canvas = canvasRef.current!;
  canvas.width = videoRef.current!.videoWidth;
  canvas.height = videoRef.current!.videoHeight;

  //Flash analzyer
  let flashAnalyzer = new FlashAnalyzer();
  let blueLightAnalyzer = new BlueLightAnalyzer();
  let luminanceAnalyzer = new LuminanceAnalyzer();

  //An array representing the pixel values of the previous frame
  let previousFrameData: Uint8Array | null = null;

  //The current frame of the video
  let currentFrame = 0;

  for (let i = 0; i < videoRef.current!.duration; i += 1 / 30) {
    //Move through the video very slowly and pausing it
    videoRef.current!.currentTime = i;
    videoRef.current?.pause();

    const context = canvas.getContext('2d', { willReadFrequently: true });

    //Drawing the videos current frame to the canvas
    context!.drawImage(videoRef.current!, 0, 0);

    const imageData = context!.getImageData(0, 0, canvas.width, canvas.height);

    //Converting the canvas into an array of pixel data
    const currentFrameData = new Uint8Array(imageData.data);

    //If there is a previous frame to compare to
    if (previousFrameData) {
      // Compare the pixel data of the two frames
      const pixelDifference = pixelDataDifference(
        currentFrameData,
        previousFrameData
      );

      //if the previous frame is different than the current frame
      if (pixelDifference > 0) {
        // Frame has changed
        // You can perform additional analysis or actions here
        await flashAnalyzer.analyze(
          canvas,
          videoRef,
          currentFrame,
          context,
          imageData
        );
        await blueLightAnalyzer.analyze(
          canvas,
          videoRef,
          currentFrame,
          context,
          imageData
        );
        await luminanceAnalyzer.analyze(
          canvas,
          videoRef,
          currentFrame,
          context,
          imageData
        );
        currentFrame++;
      }
    }

    previousFrameData = currentFrameData;

    // //flashes
    // // for (let i = 0; i < 60; i += 1) {
    // //   values[i] = getFrameLuminance(canvas);
    // //   const midpoints = getMidpoints(values);
    // //   flashNum = checkFlashes(values, midpoints, 30);
    // //   var flashes = getFlashArr(values, midpoints, 30);
    // // }

    await new Promise((resolve) => setTimeout(resolve, 5));
  }

  let returnObj: Results = {
    flashWarning: flashAnalyzer.FlashWarnings,
    blueLightWarning: blueLightAnalyzer.BlueLightWarnings,
    contrastWarning: luminanceAnalyzer.LuminanceWarnings,
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
  difference: number;
}


//A flash is a data point consisting of a second and the number of flashes in that second
interface Flash {
  flashes: number;
  second: number;

}

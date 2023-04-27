import { useState, useRef } from "react";

interface SandboxResponse {
  result: number;
  analysis: Record<string, any>;
}

const removeDuplicates = (arr:any) => {
  let unique = arr.reduce(function (acc:any, curr:any) {
      if (!acc.includes(curr))
          acc.push(curr);
      return acc;
  }, []);
  return unique;
}

//https://github.com/zygisS22/color-palette-extraction/blob/master/index.js
const findBiggestColorRange = (rgbValues: any) => {
  /**
   * Min is initialized to the maximum value posible
   * from there we procced to find the minimum value for that color channel
   *
   * Max is initialized to the minimum value posible
   * from there we procced to fin the maximum value for that color channel
   */
  let rMin = Number.MAX_VALUE;
  let gMin = Number.MAX_VALUE;
  let bMin = Number.MAX_VALUE;

  let rMax = Number.MIN_VALUE;
  let gMax = Number.MIN_VALUE;
  let bMax = Number.MIN_VALUE;

  rgbValues.forEach((pixel: any) => {
    rMin = Math.min(rMin, pixel.r);
    gMin = Math.min(gMin, pixel.g);
    bMin = Math.min(bMin, pixel.b);

    rMax = Math.max(rMax, pixel.r);
    gMax = Math.max(gMax, pixel.g);
    bMax = Math.max(bMax, pixel.b);
  });

  const rRange = rMax - rMin;
  const gRange = gMax - gMin;
  const bRange = bMax - bMin;

  // determine which color has the biggest difference
  const biggestRange = Math.max(rRange, gRange, bRange);
  if (biggestRange === rRange) {
    return "r";
  } else if (biggestRange === gRange) {
    return "g";
  } else {
    return "b";
  }
};

//https://github.com/zygisS22/color-palette-extraction/blob/master/index.js
const quantization:any = (rgbValues: any, depth: number) => {
  const MAX_DEPTH = 4;

  // Base case
  if (depth === MAX_DEPTH || rgbValues.length === 0) {
    const color = rgbValues.reduce(
      (prev: any, curr: any) => {
        prev.r += curr.r;
        prev.g += curr.g;
        prev.b += curr.b;

        return prev;
      },
      {
        r: 0,
        g: 0,
        b: 0,
      }
    );

    color.r = Math.round(color.r / rgbValues.length);
    color.g = Math.round(color.g / rgbValues.length);
    color.b = Math.round(color.b / rgbValues.length);

    return [color];
  }
  
  /**
   *  Recursively do the following:
   *  1. Find the pixel channel (red,green or blue) with biggest difference/range
   *  2. Order by this channel
   *  3. Divide in half the rgb colors list
   *  4. Repeat process again, until desired depth or base case
   */
  const componentToSortBy = findBiggestColorRange(rgbValues);
  rgbValues.sort((p1: any, p2: any) => {
    return p1[componentToSortBy] - p2[componentToSortBy];
  });

  const mid = rgbValues.length / 2;
  return [
    ...quantization(rgbValues.slice(0, mid), depth + 1),
    ...quantization(rgbValues.slice(mid + 1), depth + 1),
  ];
};


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

const getRGBArray = (canvas: HTMLCanvasElement): any => {
  // get the canvas context
  const context = canvas.getContext("2d");

  if (!context) {
    return -1;
  }

  // get the pixel data for the canvas
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  let RGB = []

  // calculate the average luminance of the frame
  for (let i = 0; i < imageData.data.length; i += 4) {
    const red = imageData.data[i];
    const green = imageData.data[i + 1];
    const blu = imageData.data[i + 2];

    const rgb = {
      r: red,
      g: green,
      b: blu
  };
    RGB.push(rgb);
  
  }

  return RGB;
};


//const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
const getContrastArray = (RGB: any): any => {

  const contrastArray = []
  let ratio = 0;

  for (let i = 0; i < RGB.length; i++){
      for (let j = 0; j < RGB.length; j++){

        if (i != j){
          const lum1 = RGB[i].r * 0.2126 + RGB[i].g * 0.7152 + RGB[i].b * 0.0722;
          const lum2 = RGB[j].r * 0.2126 + RGB[j].g * 0.7152 + RGB[j].b * 0.0722;

          if (lum1 > lum2){
            ratio = (lum2  + 0.05) / (lum1 + 0.05) 
          }
          else {
            ratio = (lum1  + 0.05) / (lum2 + 0.05) 
          }

          //const temp = [ratio, RGB[i], RGB[j]];
          //contrastArray.push(temp);
          contrastArray.push(ratio);
        }
      }
  }

  return contrastArray;
}


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
  const [contrastValues, setContrastValues] = useState<number[]>([]);

  let contrast: number[];

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

      let RGB = getRGBArray(canvas);
      //RGB = quantization(RGB, 0);
      //RGB = removeDuplicates(RGB);

      let contrastSet = getContrastArray(RGB);

      //contrast = [...contrast, ...contrastSet];

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

    //setContrastValues(contrast);
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

      <ul>
        {contrastValues.map((con, i) => (
          <li key={i}>
            Contrast:{i}: {con.toFixed(2)}
          </li>
        ))}
      </ul>
    </>
  );
}

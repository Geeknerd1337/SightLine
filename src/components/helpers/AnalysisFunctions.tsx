//get hue from rgb
const RGBToHue = (r: number, g: number, b: number): number => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return 60 * h < 0 ? 60 * h + 360 : 60 * h;
};

const getFrameBlueLight = (canvas: HTMLCanvasElement): number => {
  // get the canvas context
  const context = canvas.getContext('2d');

  let numBLpixels = 0;

  if (!context) {
    return -1;
  }

  // get the pixel data for the canvas
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < imageData.data.length; i += 4) {
    const r = imageData.data[i];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];

    let hue = RGBToHue(r, g, b);

    if (hue >= 150 && hue <= 240) {
      numBLpixels += 1;
    }
  }

  return numBLpixels;
};

const getFrameLuminance = (canvas: HTMLCanvasElement): number => {
  // get the canvas context
  const context = canvas.getContext('2d');

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

const getMidpoints = (values: any) => {
  let count = 0;

  const midpoints: number[] = [];

  //find the spots where the luminance is between the last and next values
  for (let i = 1; i < values.length - 1; i++) {
    let brighterThanNext = values[i] >= values[i + 1];
    let brighterThanPrev = values[i] >= values[i - 1];
    let darkerThanNext = values[i] <= values[i + 1];
    let darkerThanPrev = values[i] <= values[i - 1];

    if (
      (brighterThanNext && brighterThanPrev) ||
      (darkerThanNext && darkerThanPrev)
    ) {
      midpoints.push(i);
    }
  }

  return midpoints;
};

const checkFlashes = (values: any, midpoints: any, fps: number) => {
  let flashNum = 0;

  //check how many flashes there are in a second
  for (let i = 0; i < midpoints.length - 1; i++) {
    let j = 0;
    let inTime = true;

    if (flashNum > 6) {
      break;
    } else {
      flashNum = 0;
    }

    while (inTime) {
      j += 1;

      if (i + j < midpoints.length) {
        //if the this point is still in the second
        if (midpoints[i + j] - midpoints[i] <= fps) {
          //if it counts as a flash
          if (Math.abs(values[midpoints[i + j]] - values[midpoints[i]]) > 20) {
            flashNum += 1;
          }
        } else {
          inTime = false;
        }
      } else {
        break;
      }
    }
  }

  return flashNum;
};

const getFlashArr = (values: any, midpoints: any, fps: number) => {
  let flashNum = 0;
  let flashes = [];

  //check how many flashes there are in a second
  for (let i = 0; i < midpoints.length - 1; i++) {
    let j = 0;
    let inTime = true;
    let curSecondFlashCount = 0;

    if (flashNum > 6) {
      break;
    } else {
      flashNum = 0;
    }
    while (inTime) {
      j += 1;

      if (i + j < midpoints.length) {
        //if the this point is still in the second
        if (midpoints[i + j] - midpoints[i] <= fps) {
          //if it counts as a flash
          if (Math.abs(values[midpoints[i + j]] - values[midpoints[i]]) > 20) {
            // flashNum += 1;
            curSecondFlashCount++;
          }
        } else {
        }
      } else {
        break;
      }
    }
    flashes.push(curSecondFlashCount);
  }

  return flashes;
};

//A flash is a data point consisting of a second and the number of flashes in that second
interface Flash {
  flashes: number;
}

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

  let lastFlash = -1;
  let currentSecond = 0;

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
      //For the current second, increment the number of flashes
      if (currentSecond === lastSecond) {
        //Compare the flash length to the current second length
        if (Flashes.length === 0 || Flashes.length - 1 < currentSecond) {
          Flashes.push({ flashes: 1 });
        } else {
          Flashes[Flashes.length - 1].flashes += 1;
        }
      }
    }

    lastFlash = luminance;

    const numBLpixels = getFrameBlueLight(canvas);

    BLvalues.push(Math.floor((numBLpixels / numPixels) * 100));

    // console.log("Frame: " + currentFrame + " Luminance: " + luminance);

    // add the luminance to the list of values
    values.push(luminance);

    // set the video time to the current frame

    lastFrame = Math.floor(i * 20);
    lastSecond = currentSecond;

    //Wait for the next frame
    await new Promise((resolve) => setTimeout(resolve, 25));
  }

  const fps = 30;

  const midpoints = getMidpoints(values);
  const flashNum = checkFlashes(values, midpoints, fps);

  console.log('BLARR: ' + BLvalues);

  let returnObj = {
    luminanceArr: values,
    BLarr: BLvalues,
    FlashArray: Flashes,
  };
  console.log(returnObj);

  if (callback) callback(returnObj);
  return returnObj;
  // document.getElementById("flash")!.innerHTML =
  //   "Number of flashes: " + flashNum.toString();

  // update the state with the list of luminance values
  // setLuminanceValues(values);
};

// Results interface
interface Results {
  flashWarning: Warning[];
  blueLightWarning: Warning[];
  contrastWarning: Warning[];
}

interface Warning {
  startTime: number;
  endTime: number;
}

//A flash is a data point consisting of a second and the number of flashes in that second
interface Flash {
  flashes: number;
}

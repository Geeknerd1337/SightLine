export const getFrameLuminance = async (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D | null,
  imageData: ImageData
): Promise<number> => {
  return new Promise<number>((resolve, reject) => {
    // get the canvas context

    if (!context) {
      reject(new Error('Canvas context not available.'));
      return;
    }

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

    resolve(avgLuminance);
  });
};

export const getMidpoints = (values: any) => {
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

export const checkFlashes = (values: any, midpoints: any, fps: number) => {
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

export const getFlashArr = (values: any, midpoints: any, fps: number) => {
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

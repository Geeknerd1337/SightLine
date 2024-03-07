import { BlueWarning } from './AnalysisFunctions';
import { getFrameLuminance } from './flash';
//flash analyzer class
export class BlueLightAnalyzer {
  //The flash warnings
  BlueLightWarnings: BlueWarning[] = [];
  //Last frame blue percentage
  LastFrameBluePercentage: number = 0;

  LastSecond: number = 0;
  LastFrame: number = 0;

  //The flashes that occur every second
  FlashesPerSecond: number = 0;
  StartSecond: number = -1;
  EndSecond: number = 0;

  constructor() {}

  async analyze(
    canvas: HTMLCanvasElement,
    videoRef: React.RefObject<HTMLVideoElement>,
    currentFrame: number,
    context: CanvasRenderingContext2D | null,
    imageData: ImageData
  ) {
    //Log the frame luminance
    const frameBlueLight = await getFrameBlueLight(canvas, context, imageData);
    //Get the current second
    const currentSecond = Math.floor(videoRef.current!.currentTime);
    //Check if the current second is different from the last second

    if (!videoRef.current) {
      //Exit
      return;
    }

    if (currentFrame != this.LastFrame) {
      //If the frame is 0, set the last frame luminance to the current frame luminance
      if (currentFrame == 0) {
        this.LastFrameBluePercentage = frameBlueLight;
      }

      //console.log('Blue Light Percentage: ' + frameBlueLight);

      if (frameBlueLight > 0.68 && this.StartSecond == -1) {
        this.StartSecond = videoRef.current?.currentTime;
      }

      if (
        (frameBlueLight < 0.68 ||
          videoRef.current?.currentTime > videoRef.current?.duration - 1.5) &&
        this.StartSecond != -1
      ) {
        this.EndSecond = videoRef.current?.currentTime;
        this.BlueLightWarnings.push({
          startTime: this.StartSecond,
          endTime: this.EndSecond,
          difference: (frameBlueLight - 0.68)
        });

        this.StartSecond = -1;
      }
    }

    if (this.LastSecond != currentSecond) {
      this.LastSecond = currentSecond;
    }
  }
}

//Async method to get the percentage of blue in each pixel as an average accross a whole frame
export const getFrameBlueLight = async (
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

    // get the pixel data for the canvas
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    let sum = 0;
    for (let i = 0; i < imageData.data.length; i += 4) {
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];
      const blue = r + g + b !== 0 ? (b as number) / (r + g + b) : 0;

      //Log the r g and b
      sum += blue;
    }
    const avgBlue = sum / (imageData.data.length / 4);

    resolve(avgBlue);
  });
};

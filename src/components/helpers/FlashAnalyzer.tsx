import { Warning } from './AnalysisFunctions';
import { getFrameLuminance } from './flash';
//flash analyzer class
export class FlashAnalyzer {
  //The flash warnings
  FlashWarnings: Warning[] = [];
  //Last frame luminance
  LastFrameLuminance: number = 0;

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
    const frameLuminance = await getFrameLuminance(canvas, context, imageData);
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
        this.LastFrameLuminance = frameLuminance;
      }

      //If the distance between the last frame luminance and the current frame luminance is greater than 100, increase the flashes per second
      if (Math.abs(this.LastFrameLuminance - frameLuminance) > 100) {
        this.FlashesPerSecond++;
      }

      this.LastFrameLuminance = frameLuminance;
    }

    if (this.LastSecond != currentSecond) {
      //If the flashes per second is greater than 3, set the start second to the current second
      if (this.FlashesPerSecond > 3 && this.StartSecond == -1) {
        this.StartSecond = videoRef.current?.currentTime;
        //console.log('SETTING START SECOND');
      }

      console.log(this.FlashesPerSecond);

      //If the flashes per second is less than 3 , or its the end of the video, set the end second to the current second and add a warning
      if (
        (this.FlashesPerSecond < 3 ||
          videoRef.current?.currentTime > videoRef.current?.duration - 1.5) &&
        this.StartSecond != -1
      ) {
        this.EndSecond = videoRef.current?.currentTime;
        this.FlashWarnings.push({
          startTime: this.StartSecond,
          endTime: this.EndSecond,
        });

        this.StartSecond = -1;
      }

      this.FlashesPerSecond = 0;

      this.LastSecond = currentSecond;
    }
  }
}

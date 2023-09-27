import { Warning } from './AnalysisFunctions';
import { getFrameLuminance } from './flash';
//flash analyzer class
export class FlashAnalyzer {
  FlashWarnings: Warning[] = [];
  LastFrameLuminance: number = 0;
  LastSecond: number = 0;
  LastFrame: number = 0;
  FlashesPerSecond: number = 0;
  StartSecond: number = 0;
  EndSecond: number = 0;

  constructor() {}

  async analyze(
    canvas: HTMLCanvasElement,
    videoRef: React.RefObject<HTMLVideoElement>,
    currentFrame: number
  ) {
    //Log the frame luminance
    const frameLuminance = await getFrameLuminance(canvas);
    //Get the current second
    const currentSecond = Math.floor(videoRef.current!.currentTime);
    //Check if the current second is different from the last second

    if (currentFrame != this.LastFrame) {
      //If the frame is 0, set the last frame luminance to the current frame luminance
      if (currentFrame == 0) {
        this.LastFrameLuminance = frameLuminance;
      }

      //If the distance between the last frame luminance and the current frame luminance is greater than 100, increase the flashes per second
      if (Math.abs(this.LastFrameLuminance - frameLuminance) > 20) {
        this.FlashesPerSecond++;
        console.log(
          'FLASH at frame ' +
            currentFrame +
            ' at time ' +
            currentSecond +
            ' seconds'
        );
      }

      this.LastFrameLuminance = frameLuminance;
    }

    if (this.LastSecond != currentSecond) {
      //If the flashes per second is greater than 3, set the start second to the current second
      if (this.FlashesPerSecond > 3) {
        this.StartSecond = currentSecond;
      }

      //If the flashes per second is less than 3, set the end second to the current second and add a warning
      if (this.FlashesPerSecond < 3 && this.StartSecond != 0) {
        this.EndSecond = currentSecond;
        this.FlashWarnings.push({
          startTime: this.StartSecond,
          endTime: this.EndSecond,
        });
        this.FlashesPerSecond = 0;
        this.StartSecond = 0;
      }

      this.LastSecond = currentSecond;
    }

    //Wait one second
    console.log(frameLuminance);
  }
}

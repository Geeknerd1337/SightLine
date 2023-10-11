import { Warning } from './AnalysisFunctions';
import { getFrameLuminance } from './flash';
//flash analyzer class
export class LuminanceAnalyzer {
  //The flash warnings
  LuminanceWarnings: Warning[] = [];

  LastFrame: number = 0;

  StartSecond: number = -1;
  EndSecond: number = -1;

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

    if (!videoRef.current) {
      //Exit
      return;
    }

    if (currentFrame != this.LastFrame) {
      //If the frame luminance is higher than 200
      console.log(frameLuminance);
      if (frameLuminance > 10) {
        // console.log(
        //   'Frame Luminance Boundary Reached(' + this.StartSecond + ')'
        // );
        if (this.StartSecond == -1) {
          this.StartSecond = videoRef.current?.currentTime;
        } else {
          //If the time between the current video time and the start second is > 5 seconds
        }
      } else {
        if (this.StartSecond != -1) {
          //   console.log(
          //     'Time since start second: ' +
          //       (videoRef.current?.currentTime - this.StartSecond)
          //   );
          if (videoRef.current?.currentTime - this.StartSecond >= 0.5) {
            this.EndSecond = videoRef.current?.currentTime;
          }
        }
      }

      if (
        (this.EndSecond != -1 && this.StartSecond != -1) ||
        (videoRef.current?.currentTime > videoRef.current?.duration - 5.0 &&
          this.StartSecond != -1)
      ) {
        // console.log(
        //   'PUSHING LUMINANCE WARNING: (' +
        //     this.StartSecond +
        //     ':' +
        //     videoRef.current?.currentTime +
        //     ' ? ' +
        //     this.EndSecond +
        //     ')'
        // );
        this.LuminanceWarnings.push({
          startTime: this.StartSecond,
          endTime: videoRef.current?.currentTime,
        });
        this.StartSecond = -1;
        this.EndSecond = -1;
      }
    }
    this.LastFrame = currentFrame;
  }
}

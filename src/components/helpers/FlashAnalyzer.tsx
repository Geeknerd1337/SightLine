import { Warning } from './AnalysisFunctions';
import { getFrameLuminance } from './flash';
//flash analyzer class
export class FlashAnalyzer {
  FlashWarnings: Warning[] = [];

  constructor() {}

  async analyze(
    canvas: HTMLCanvasElement,
    videoRef: React.RefObject<HTMLVideoElement>
  ) {
    //Log the frame luminance
    const frameLuminance = await getFrameLuminance(canvas);
    //Wait one second
    console.log(frameLuminance);
  }
}

import WaveForm from "@/components/Video Analysis/WaveForm";
import WaveFormVideo from "@/components/Video Analysis/WaveFormVideo";
import { Background } from "@/styles/HomeViewStyles";

export default function Sandbox() {
  return (
    <div>
      <Background>
        {/* <WaveFormVideo></WaveFormVideo> */}
        <WaveForm></WaveForm>
      </Background>
    </div>
  );
}

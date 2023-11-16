import { Background } from "@/styles/HomeViewStyles";
import Intro from "@/components/Intro";
import Video from "@/components/Video Analysis/Video";
import InfoButton from "@/components/InfoButton";

// * home page
export default function HomeView() {
  return (
    <>
      <Background>
        <Video />
        <InfoButton />
      </Background>

      <Intro />
    </>
  );
}

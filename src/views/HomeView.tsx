import { Background } from "@/styles/HomeViewStyles";
import Intro from "@/components/Intro";
import Video from "@/components/Video Analysis/Video";
// * home page
export default function HomeView() {
  return (
    <>
      <Background>
        <Video />
      </Background>
      <Intro />
    </>
  );
}

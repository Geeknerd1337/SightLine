import { Background } from '@/styles/HomeViewStyles';
import Intro from '@/components/Intro';
import Video from '@/components/Video Analysis/Video';
import InfoButton from '@/components/InfoButton';
import NavBar from '@/components/NavBar';

// * home page
export default function HomeView() {
  return (
    <>
      <Background>
        <NavBar />
        <Video />
      </Background>

      <Intro />
    </>
  );
}

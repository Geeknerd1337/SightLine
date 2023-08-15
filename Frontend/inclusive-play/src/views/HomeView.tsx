import { Background } from '@/styles/HomeViewStyles';

export const ANALYSIS_STATE = {
  INITIAL: 0,
  LOADING: 1,
  LOADED: 2,
  ANALYZING: 3,
  ANALYZED: 4,
};

// * home page
export default function HomeView() {
  return <Background>Hello world!</Background>;
}

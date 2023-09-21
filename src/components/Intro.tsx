import { Background } from "@/styles/IntroStyles";
import Logo from "./LogoAnimation";

const backgroundVariants = {
  show: {
    opacity: 1,
    transition: {
      duration: 1,
      delay: 0.5,
    },
  },
  hide: {
    opacity: 0,
    transition: {
      duration: 0.5,
      delay: 3.4,
    },
  },
};

export default function Intro() {
  return (
    <Background variants={backgroundVariants} initial="show" animate="hide">
      <Logo></Logo>
    </Background>
  );
}
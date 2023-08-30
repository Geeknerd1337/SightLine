import { Background, Logo } from "@/styles/IntroStyles";
import { motion } from "framer-motion";

import { useState, useEffect } from "react";

const backgroundVariants = {
  initial: {
    opacity: 1,
    transition: {
      duration: 1,
      delay: 0.5,
    },
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
      delay: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 1,
      delay: 0.5,
    },
  },
};

const logoVariants = {
  initial: {
    opacity: 1,
    y: "100vh",
    transition: {
      duration: 1,
      delay: 0.5,
    },
  },
  center: {
    opacity: 1,
    y: "0vh",
    transition: {
      duration: 1,
      delay: 0.5,
    },
  },
  exit: {
    opacity: 0,
    y: "-100vh",
    transition: {
      duration: 1,
      delay: 0.5,
    },
  },
};

export default function Intro() {
  const [animationState, setAnimationState] = useState("initial");
  useEffect(() => {
    setTimeout(() => setAnimationState("center"), 0);
    setTimeout(() => setAnimationState("exit"), 2000);
    setTimeout(() => setAnimationState("fade"), 4000);
  }, []);

  return (
    <Background
      variants={backgroundVariants}
      initial="initial"
      animate={
        animationState === "initial" || animationState === "center"
          ? "animate"
          : "exit"
      }
    >
      <Logo
        src="logo.svg"
        alt="logo"
        variants={logoVariants}
        initial="initial"
        animate={animationState}
      />
    </Background>
  );
}

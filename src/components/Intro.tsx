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
    opacity: 0,
    scale: 0.5,
    transition: {
      duration: 1,
    },
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 150,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Intro() {
  const [animationState, setAnimationState] = useState("initial");
  useEffect(() => {
    setTimeout(() => setAnimationState("animate"), 0);
    setTimeout(() => setAnimationState("exit"), 2000);
  }, []);

  return (
    <Background
      variants={backgroundVariants}
      initial="initial"
      animate={
        animationState === "initial" || animationState === "animate"
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

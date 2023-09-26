import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const pathColor = "#ffd167";

const logoVariants = {
  initial: {
    opacity: 0,
    scale: 0.5,
    transition: {},
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
    },
  },
};

const pathVariants = {
  initial: {
    opacity: 0,
    pathLength: 0,
    fillOpacity: 0,
    transition: {
      duration: 0.5,
    },
  },
  animate: {
    opacity: 1,
    pathLength: 1,
    fillOpacity: 1,
    transition: {
      duration: 2,
    },
  },
};

const circleVariants = {
  initial: {
    opacity: 0,
    pathLength: 0,
    fillOpacity: 0,
    transition: {
      delay: 1,
    },
  },
  animate: {
    opacity: 1,
    pathLength: 1,
    fillOpacity: 1,
    transition: {
      duration: 1.5,
    },
  },
};

export default function Logo() {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAnimating(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="400"
      height="400"
      viewBox="0 0 468.61 201.86"
      variants={logoVariants}
      initial="initial"
      animate={isAnimating ? "animate" : "initial"}
    >
      <motion.path
        d="M336.08,302.75c0-6.34-.3-12.47.1-18.56.32-5.11-1-7-6.61-7.67-37.57-4.3-67-39.19-65.55-77.11,1.46-38.19,28.27-67.86,66.47-73.38,2.8-.41,4.24-1.29,4.16-4.3-.4-15.12,2.79-13.9-13.25-13-47,2.69-89.95,18.94-131.77,39-27.44,13.19-51.31,31.46-73.72,51.84-2.82,2.58-2.35,4,.25,6.25,28.48,24.47,59.53,44.91,94,60.1,4.72,2.08,9.39,4.28,14.06,6.47,2.3,1.07,5.06,2.27,3.63,5.43s-4.06,1.87-6.44.85c-39.19-16.69-75.55-38-107.7-66.13-1.63-1.42-3.39-2.7-5-4.12-4.2-3.68-4.54-6.42-.45-10.51,5.18-5.17,10.75-9.95,16.22-14.82,33.07-29.39,72-48.2,113.14-63.22,31.57-11.53,64-18.14,97.64-18.7,6.55-.1,6.55-.23,6.55,6.5,0,4.5.11,9,0,13.5-.11,3.14,1.1,4.45,4.31,4.62,31,1.7,58.91,25.8,66.61,54.91,6.41,24.28,2.6,46.92-13.18,67-13.3,16.91-30.53,27-52.08,29.12-3,.3-4.1,1.51-4,4.39.11,3.49.2,7,0,10.49-.25,3.64,1.39,4.83,4.72,4.42,18.34-2.22,36.88-3.4,55-6.89,33.82-6.53,65.08-20.19,94.74-37.53,21.53-12.58,40.65-28.42,59.4-44.71,8.11-7,8-6.91-.43-13.92A373.61,373.61,0,0,0,453.2,131.64c-1.24-.49-2.78-.8-3.56-1.71-1.12-1.3-1.66-3.09-2.45-4.67,1.74-.44,3.82-1.73,5.17-1.18,10.49,4.24,21,8.53,31.21,13.37,32,15.14,60.52,35.59,87.37,58.48,2.65,2.26,4.68,4.63.87,7.68-18.58,14.88-36.44,30.79-55.9,44.43-32.76,23-69.19,38.49-108.26,47.37a315.92,315.92,0,0,1-66.32,7.64C339.86,303.06,338.39,302.89,336.08,302.75Zm3.76-171.11c-38.8-.59-69.1,32.13-69.81,67.84-.82,40.88,31.91,70.75,67,71.69,42,1.12,71.28-31.35,72.35-68C410.56,163.46,377.38,131,339.84,131.64Z"
        transform="translate(-105.3 -101.19)"
        strokeWidth="3"
        fill="transparent"
        stroke={pathColor}
        variants={pathVariants}
      />
      <motion.path
        d="M339.07,214.15c-6.45,0-12.24-5.6-12.26-12a12.4,12.4,0,0,1,12.21-12,12,12,0,0,1,.05,24Z"
        transform="translate(-105.3 -101.19)"
        strokeWidth="3"
        fill="transparent"
        stroke={pathColor}
        variants={circleVariants}
      />
    </motion.svg>
  );
}

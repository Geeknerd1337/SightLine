import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  text: string;
};

const defaultAnimation = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};

export default function TextAnimation({ text }: Props) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAnimating(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={{}}>
      <motion.span
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
          hidden: {},
        }}
        initial="hidden"
        animate={isAnimating ? "visible" : "hidden"}
        aria-hidden
      >
        {text.split("").map((char, charIndex) => (
          <motion.span
            variants={defaultAnimation}
            key={`${char}-${charIndex}`}
            className="inline-block"
            style={{
              color: "#ffd167",
              fontSize: "xxx-large",
              fontStyle: "italic",
              fontWeight: "bold",
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </div>
  );
}

import { motion } from "framer-motion";
import Backdrop from "../Backdrop";

interface InfoModalProps {
  handleClose: () => void;
  text: string;
  modalOpen: boolean;
}

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

export default function InfoModal({ handleClose, text }: InfoModalProps) {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="info-modal"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="info-text">
          <h1>Hello</h1>
          <h3>{text}</h3>
        </div>
        <button onClick={handleClose}>Close</button>
      </motion.div>
    </Backdrop>
  );
}

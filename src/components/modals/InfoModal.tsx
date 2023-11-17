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
    y: "15vh",
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
        <div className="info-modal-text">
          <h3>Hello</h3>
          <h5>{text}</h5>
        </div>

        <motion.button
          className="close-button"
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClose}
        >
          Close
        </motion.button>
      </motion.div>
    </Backdrop>
  );
}

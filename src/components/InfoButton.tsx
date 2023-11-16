import { motion } from "framer-motion";
import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

export default function InfoButton() {
  const [modalOpen, setModalOpen] = useState(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);
  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="info-button"
        onClick={() => (modalOpen ? close() : open())}
      >
        <FaInfoCircle size="2rem" color="white" />
      </motion.button>
    </div>
  );
}

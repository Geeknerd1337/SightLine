import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import InfoModal from "./modals/InfoModal";

export default function InfoButton() {
  const [modalOpen, setModalOpen] = useState(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  return (
    <div style={{ height: "5vh" }}>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="info-button"
        onClick={() => (modalOpen ? close() : open())}
      >
        <FaInfoCircle size="2rem" color="white" />
      </motion.button>

      <AnimatePresence
        // Disable any initial animations on children that
        // are present when the component is first rendered
        initial={false}
        // Only render one component at a time.
        // The exiting component will finish its exit
        // animation before entering component is rendered
        mode="wait"
        // Fires when all exiting nodes have completed animating out
        onExitComplete={() => null}
      >
        {modalOpen && (
          <InfoModal
            modalOpen={modalOpen}
            handleClose={close}
            text="Analyses videos for flashing lights, luminance, and blue light accessibility by collecting the image data for the individual frames and using them in formulas from WCAG."
          />
        )}
      </AnimatePresence>
    </div>
  );
}

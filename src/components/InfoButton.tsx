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
            text={
              <>
                This website was created to analyze videos with a focus on
                enhancing accessibility awareness for a wide range of users,
                including game developers and content creators. It assesses
                videos based on three key aspects of accessibility:
                Seizure-Inducing Flashing, Blue Light Impact, and Luminance
                Levels.
                <br />
                RGB values are taken from each frame of the video.
                Then the tool figures out what percentage of the pixels in 
                each frame fall into the hue range of harmful blue light. 
                Next, it calculates the overall luminance value of each 
                frame using the RGB values. It finds areas with excessive
                luminance values. Finally, it compares luminance values 
                of each frame looking for changes large enough to be 
                considered a flash. If it finds three flashes in a second.
                Then, that area of the video could potentially trigger a 
                photosensitive seizure.
                By addressing these aspects, the website aims to make
                videos more inclusive and considerate of diverse user needs.
                <br />
                <br />
              </>
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
}

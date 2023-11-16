import { BackDrop } from "@/styles/ModalStyles";
import { motion } from "framer-motion";
import React, { MouseEvent } from "react";

interface BackdropProps {
  children: React.ReactNode;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
}

export default function Backdrop({ children, onClick }: BackdropProps) {
  return (
    <BackDrop>
      <motion.div
        onClick={onClick}
        className="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    </BackDrop>
  );
}

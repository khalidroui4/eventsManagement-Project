import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/profile.css";

export default function Modal({ title, isOpen, onClose, children }) {
  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        onClick={onClose}
        style={{ zIndex: 100000 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, type: "spring", bounce: 0.4 }}
        >
          {title && <h2>{title}</h2>}
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}

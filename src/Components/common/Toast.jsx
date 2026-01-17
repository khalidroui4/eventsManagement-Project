import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Toast({ message, type, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const variants = {
        initial: { opacity: 0, y: 50, scale: 0.3 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } },
    };

    const colors = {
        success: "#4caf50",
        error: "#f44336",
        info: "#2196f3",
        warning: "#ff9800",
    };

    const icons = {
        success: "✅",
        error: "❌",
        info: "ℹ️",
        warning: "⚠️",
    };

    return (
        <motion.div
            layout
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                background: "#333",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                zIndex: 9999,
                borderLeft: `4px solid ${colors[type] || colors.info}`
            }}
        >
            <span>{icons[type] || icons.info}</span>
            <span style={{ fontSize: "14px", fontWeight: "500" }}>{message}</span>
        </motion.div>
    );
}

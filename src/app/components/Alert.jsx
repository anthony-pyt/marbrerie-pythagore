"use client";
import { useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

const Alert = ({
  message,
  type = "info",
  duration = 5000,
  onClose,
  isVisible,
}) => {
  // useEffect(() => {
  //   if (isVisible && duration) {
  //     const timer = setTimeout(() => {
  //       onClose && onClose();
  //     }, duration);
  //     return () => clearTimeout(timer);
  //   }
  // }, [isVisible, duration, onClose]);

  // Configuration des styles basée sur ton code d'erreur haut de gamme
  const config = {
    success: {
      classes: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
      icon: "solar:check-circle-linear",
    },
    error: {
      classes: "text-red-400 bg-red-400/10 border-red-400/20",
      icon: "solar:danger-triangle-linear",
    },
    warning: {
      classes: "text-or bg-or/10 border-or/20",
      icon: "solar:shield-warning-linear",
    },
    info: {
      classes: "text-blue-700 bg-blue-400/10 border-blue-400/20",
      icon: "solar:info-circle-linear",
    },
  };

  const current = config[type] || config.info;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`
            flex items-center gap-4 w-full max-w-xl 
            p-2 border backdrop-blur-md shadow-2xl
            ${current.classes}
          `}
        >
          {/* Icône de type */}
          <Icon icon={current.icon} className="flex-shrink-0 text-xl" />

          {/* Message */}
          <div className="flex-grow">
            <p className="text-[10px] uppercase tracking-[0.2em] font-medium leading-relaxed">
              {message}
            </p>
          </div>

          {/* Bouton de fermeture */}
          <button
            onClick={onClose}
            className="group relative p-1 transition-colors hover:text-white"
          >
            <Icon icon="lucide:x" className="text-lg" />
            <span className="absolute inset-0 scale-0 group-hover:scale-100 transition-transform bg-white/5 rounded-full" />
          </button>

          {/* Barre de progression (Optionnelle pour le luxe) */}
          {/* <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: duration / 1000, ease: "linear" }}
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-current opacity-30 origin-left"
          /> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;

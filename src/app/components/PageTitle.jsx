import React from "react";
import { motion } from "framer-motion";

const PageTitle = ({
  title,
  subtitle,
  accentColor = "bg-gradient-to-b from-or-light to-white",
}) => {
  return (
    <div className="relative w-full py-12 md:py-24 px-4 text-center">
      {/* Effet d'accent en arrière-plan */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`absolute inset-0 h-2/5 w-full -z-10 ${accentColor} blur-2xl`}
      ></motion.div>

      {/* Contenu principal */}
      <div className="relative">
        {/* Titre principal */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-2xl md:text-6xl font-bold text-secondary tracking-tight"
        >
          {title}
        </motion.h1>

        {/* Sous-titre */}
        {subtitle && (
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="mt-4 text-lg md:text-xl text-gray-600"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default PageTitle;

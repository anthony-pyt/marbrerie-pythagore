"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PageTitle = ({ title }) => {
  const [randomNumber, setRandomNumber] = useState(1);

  useEffect(() => {
    // On garde l'idée de l'image de fond aléatoire pour la variété
    setRandomNumber(Math.floor(Math.random() * 10) + 1);
  }, []);

  return (
    <div className="relative w-full bg-white overflow-hidden h-64 md:h-80 flex items-center justify-center">
      {/* Background avec effet de parallaxe léger et masque */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0 opacity-30 grayscale-[0.5]"
        style={{
          backgroundImage: `url('/images/bg/wave-${randomNumber}.png')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />

      {/* Dégradé pour assurer la transition douce avec le reste de la page blanche */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white z-10" />

      <div className="relative z-20 flex flex-col items-center px-4">
        {/* Petit label au dessus (optionnel mais très 'luxe') */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-or text-[10px] uppercase tracking-[0.5em] font-bold mb-4"
        >
          PYTHAGORE
        </motion.span>

        {/* Titre principal */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-secondary text-3xl md:text-5xl lg:text-6xl font-light uppercase tracking-[0.15em] leading-tight"
        >
          {title}
        </motion.h1>

        {/* Ligne dorée animée */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "80px", opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
          className="h-[1px] bg-or mt-8"
        />
      </div>
    </div>
  );
};

export default PageTitle;

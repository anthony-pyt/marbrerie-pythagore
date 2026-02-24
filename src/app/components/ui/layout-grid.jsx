"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { Icon } from "@iconify/react";

export const LayoutGrid = ({ cards }) => {
  const [selected, setSelected] = useState(null);

  const goToDetails = (card) => {
    const url = `/matieres/produits/${card.imageable?.id}`;
    window.open(url);
  };

  return (
    <div className="w-full h-full p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-8 relative">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          className={cn(
            card.className,
            "relative group flex flex-col w-full bg-white border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:border-transparent overflow-hidden cursor-pointer",
          )}
          whileHover={{ y: -5 }}
          onClick={() => goToDetails(card)}
        >
          <ImageComponent card={card} />
          <InfoComponent card={card} />
        </motion.div>
      ))}
    </div>
  );
};

const ImageComponent = ({ card }) => {
  const product = card.imageable;
  const category = product?.product?.category;

  return (
    <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
      <motion.img
        layoutId={`image-${card.id}-image`}
        src={card.thumbnail}
        className="object-cover transition-transform duration-700 group-hover:scale-110 h-full w-full"
        alt={product?.label}
      />

      {/* Overlay subtil au survol */}
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="bg-white/90 px-4 py-2 backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-secondary">
            Découvrir
          </span>
        </div>
      </div>

      {/* Badge Catégorie (Top-Left comme le modèle) */}
      <div className="absolute top-3 left-3 z-20">
        {category?.logo_url ? (
          <div className="bg-white/80 backdrop-blur-md p-1.5 shadow-sm border border-gray-100/50">
            <img
              src={category.logo_url}
              alt={category.label}
              className="h-4 w-auto object-contain"
            />
          </div>
        ) : (
          <span className="bg-white/80 backdrop-blur-md px-2 py-1 text-[9px] uppercase tracking-widest text-secondary font-bold shadow-sm border border-gray-100/50">
            {category?.label || "Matière"}
          </span>
        )}
      </div>

      {/* Icône Coeur (Coup de coeur) */}
      {product?.heart === 1 && (
        <div className="absolute top-3 right-3 z-20">
          <Icon
            icon="solar:heart-bold"
            className="text-red-500 drop-shadow-sm"
            width="20"
          />
        </div>
      )}
    </div>
  );
};

const InfoComponent = ({ card }) => {
  const product = card.imageable;  

  return (
    <div className="p-5 flex flex-col flex-grow bg-white">
      {/* Titre */}
      <h3 className="text-sm font-medium uppercase tracking-wider text-secondary mb-3 line-clamp-1">
        {product?.label}
      </h3>
      {/* Bouton d'action qui apparaît au hover */}
      <div className="mt-4 overflow-hidden h-0 group-hover:h-8 transition-all duration-300">
        <button className="w-full h-full bg-secondary text-white text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2">
          Fiche technique
          <Icon icon="solar:arrow-right-outline" width="12" />
        </button>
      </div>
    </div>
  );
};

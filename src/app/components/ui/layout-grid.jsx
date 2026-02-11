"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import Image from "next/image";

export const LayoutGrid = ({ cards }) => {
  const [selected, setSelected] = useState(null);
  const [lastSelected, setLastSelected] = useState(null);

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  const goToDetails = (card) => {
    const url = `/matieres/produits/${card.imageable?.id}`;
    window.open(url, "_blank");
  };

  return (
    <div className="w-full h-full p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-6 relative">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          className={cn(
            card.className,
            "h-96 relative overflow-hidden border border-gray-100 rounded-none cursor-pointer group",
          )}
        >
          <motion.div
            onClick={() => goToDetails(card)}
            className={cn(
              card.className,
              "relative overflow-hidden h-full w-full bg-white transition-all duration-500",
              selected?.id === card.id
                ? "fixed inset-0 h-2/3 w-full md:w-1/2 m-auto z-[70] shadow-2xl"
                : "z-10",
            )}
            layoutId={`card-${card.id}`}
          >
            <ImageComponent card={card} selected={selected} />
          </motion.div>
        </motion.div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "fixed h-full w-full left-0 top-0 bg-secondary/80 backdrop-blur-sm z-10",
          selected?.id ? "pointer-events-auto" : "pointer-events-none",
        )}
        animate={{ opacity: selected?.id ? 1 : 0 }}
      />
    </div>
  );
};

const ImageComponent = ({ card, selected }) => {
  return (
    <motion.div className="h-full w-full relative group">
      {!selected && (
        <>
          {/* Badge Catégorie - Style Étiquette Exposition */}
          <div className="z-20 absolute top-0 right-0">
            {card.imageable?.product?.category?.logo_url != null ? (
              <div className="bg-white/90 backdrop-blur-md px-3 py-2 border-l border-b border-gray-100">
                <img
                  src={card.imageable?.product?.category?.logo_url}
                  className="h-4 w-auto object-contain"
                  alt={card.imageable?.product?.category?.label}
                />
              </div>
            ) : (
              <div className="bg-white/90 backdrop-blur-md px-4 py-1 border-l border-b border-or">
                <span className="text-or text-[10px] uppercase tracking-[0.2em] font-bold">
                  {card.imageable?.product?.category?.label}
                </span>
              </div>
            )}
          </div>

          {/* Label Produit - Style Minimaliste */}
          <div className="z-20 absolute bottom-0 left-0 w-full p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-secondary/80 to-transparent">
            <p className="text-white text-xs uppercase tracking-[0.3em] font-light italic">
              {card.imageable?.label}
            </p>
          </div>
        </>
      )}

      <motion.img
        layoutId={`image-${card.id}-image`}
        src={card.thumbnail}
        className={cn(
          "object-cover object-center absolute inset-0 h-full w-full transition duration-700 group-hover:scale-110",
          !selected && "grayscale-[0.5] group-hover:grayscale-0",
        )}
        alt={card.imageable?.label}
      />
    </motion.div>
  );
};

"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import Button from "../Button";
import Image from "next/image";

export const LayoutGrid = ({ cards }) => {
  const [selected, setSelected] = useState(null);
  const [lastSelected, setLastSelected] = useState(null);
  console.log(cards);
  

  const handleClick = (card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    <div className="w-full h-full p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative ">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          className={cn(
            card.className,
            "h-96 relative overflow-hidden border rounded-xl cursor-pointer"
          )}
        >
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              card.className,
              "relative overflow-hidden",
              selected?.id === card.id
                ? "rounded-2xl fixed inset-0 h-2/3 w-full md:w-1/2 m-auto flex justify-center items-center flex-wrap flex-col z-[70]"
                : lastSelected?.id === card.id
                ? "z-10 bg-white rounded-xl h-full w-full"
                : "bg-white rounded-xl h-full w-full"
            )}
            layoutId={`card-${card.id}`}
          >
            {selected?.id === card.id && <SelectedCard selected={selected} />}
            <ImageComponent card={card} selected={selected} />
          </motion.div>
        </motion.div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "fixed h-full w-full left-0 top-0 bg-black opacity-0 z-10",
          selected?.id ? "pointer-events-auto" : "pointer-events-none"
        )}
        animate={{ opacity: selected?.id ? 0.7 : 0 }}
      />
    </div>
  );
};

const ImageComponent = ({ card, selected }) => {
  return (
    <motion.div>
      {!selected && (
        <>
          <div className="z-10 absolute top-1 right-1 flex items-center">
            {card.imageable?.product?.category?.logo_url != null ? (
              <img
                src={card.imageable?.product?.category?.logo_url}
                className="h-4 p-0.5 bg-white rounded-lg px-2"
                alt={card.imageable?.product?.category?.label}
              />
            ) : (
              <div className="border border-or inline-flex justify-self-center items-center px-2 rounded-lg bg-white">
                <span className="text-or text-xs">
                  {card.imageable?.product?.category?.label}
                </span>
              </div>
            )}
          </div>
          <div className="z-10 absolute bottom-1 left-1 bg-secondary bg-opacity-50 px-2 rounded-lg">
            <p className="text-white">{card.imageable?.label}</p>
          </div>
        </>
      )}
      <motion.img
        layoutId={`image-${card.id}-image`}
        src={card.image_url}
        height="500"
        width="500"
        className={cn(
          "object-cover object-top absolute inset-0 h-full w-full transition duration-200"
        )}
        alt={card.imageable?.label}
      />
    </motion.div>
  );
};

const SelectedCard = ({ selected }) => {
  const goToDetails = (card) => {
    const url = `/matieres/produits/${card.imageable?.id}`;
    window.open(url, "_blank");
  };

  return (
    <div className="h-full w-full flex flex-col justify-end relative z-[60]">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.6,
        }}
        className="absolute inset-0 h-full w-full z-10"
      />
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 100,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="p-4 z-[70] bg-black bg-opacity-50 text-white uppercase flex justify-between items-center"
      >
        <div className="flex items-center space-x-2">
          <span className="flex items-center">
            {selected.imageable.product.category.logo_url != null ? (
              <img
                src={selected.imageable.product.category?.logo_url}
                className="h-4 p-0.5 bg-white rounded-lg px-2"
                alt={selected.imageable.product.category.label}
              />
            ) : (
              <div className="border border-or inline-flex justify-self-center items-center px-2 rounded-lg bg-white">
                <span className="text-or text-xs">
                  {selected.imageable.product.category.label}
                </span>
              </div>
            )}
          </span>
          <span>{selected?.imageable.label}</span>
        </div>
        <Button
          text="Voir la fiche"
          color="or"
          size="small"
          onClick={() => goToDetails(selected)}
        />
      </motion.div>
    </div>
  );
};

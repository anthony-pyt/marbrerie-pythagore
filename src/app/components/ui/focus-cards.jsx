"use client";
import React, { useState } from "react";
import { cn } from "../../lib/utils";
import Link from "next/link";

export const Card = React.memo(({ card, index, hovered, setHovered }) => (
  <Link
    href={card.linkedin || "#"}
    passHref
    target="_blank"
    onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
    className={cn(
      // Suppression du rounded-lg, passage en angles droits
      "relative bg-secondary overflow-hidden h-80 md:h-[450px] w-full transition-all duration-500 ease-in-out border border-white/5",
      hovered !== null &&
        hovered !== index &&
        "opacity-40 grayscale blur-[2px] scale-[0.98]",
    )}
  >
    <img
      src={card.src}
      alt={card.name}
      className={cn(
        "object-cover absolute inset-0 h-full w-full transition-transform duration-700",
        hovered === index ? "scale-105" : "scale-100",
      )}
    />

    {/* Overlay Gradient Style Pythagore */}
    <div
      className={cn(
        "absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent transition-opacity duration-500",
        hovered === index ? "opacity-90" : "opacity-60",
      )}
    />

    {/* Contenu Texte */}
    <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
      <div className="relative overflow-hidden">
        {/* Ligne décorative qui s'anime au hover */}
        <div
          className={cn(
            "h-[1px] bg-or mb-4 transition-all duration-500 origin-left",
            hovered === index ? "w-12" : "w-0",
          )}
        />

        <div className="text-lg md:text-xl font-light text-white uppercase tracking-[0.2em] leading-none mb-2">
          {card.name}
        </div>

        {card.job && (
          <div
            className={cn(
              "text-[10px] text-or uppercase tracking-[0.3em] transition-all duration-500 delay-100",
              hovered === index
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2",
            )}
          >
            {card.job}
          </div>
        )}
      </div>
    </div>
  </Link>
));

Card.displayName = "Card";

export function FocusCards({ cards }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.name}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}

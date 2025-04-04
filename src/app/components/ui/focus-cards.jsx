"use client";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "../../lib/utils";
import Link from "next/link";

export const Card = React.memo(({ card, index, hovered, setHovered }) => (
  <Link href={card.linkedin} passHref target="_blank"
    onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
    className={cn(
      "rounded-lg relative bg-gray-100 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out",
      hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
    )}
  >
    <Image
      src={card.src}
      alt={card.name}
      fill
      sizes="(min-width: 250px) 33vw, (min-width: 640px) 50vw, 100vw"
      className="object-cover absolute inset-0"
    />
    <div
      className={cn(
        "absolute inset-0 bg-black/5 flex flex-col justify-end py-8 px-4 transition-opacity duration-300",
        hovered === index ? "opacity-100" : "opacity-50"
      )}
    >
      <div className="bg-white rounded-lg px-2">
        <div className="text-xl md:text-2xl font-medium text-gray-700">
          {card.name}
        </div>
        {card.job && <div className="text-xs text-gray-700">{card.job}</div>}
      </div>
    </div>
  </Link>
));

Card.displayName = "Card";

export function FocusCards({ cards }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-10 max-w-7xl mx-auto mdlg:px-8 w-full">
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

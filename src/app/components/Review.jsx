"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

// Helper natif ultra-léger pour remplacer Moment.js (Français par défaut)
const getRelativeTimeString = (dateInput) => {
  const date = new Date(dateInput);
  const now = new Date();
  const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);

  const units = [
    { unit: "year", amount: 31536000 },
    { unit: "month", amount: 2628000 },
    { unit: "day", amount: 86400 },
    { unit: "hour", amount: 3600 },
    { unit: "minute", amount: 60 },
    { unit: "second", amount: 1 },
  ];

  const rtf = new Intl.RelativeTimeFormat("fr", { numeric: "auto" });

  for (const { unit, amount } of units) {
    if (Math.abs(diffInSeconds) >= amount || unit === "second") {
      return rtf.format(Math.round(diffInSeconds / amount), unit);
    }
  }
  return "";
};

const Review = ({ note, date, name, comment, avatar }) => {
  const ratingMap = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
  const starsCount = typeof note === "string" ? ratingMap[note] : note;

  // Gestion propre du fallback d'image sans mutation directe du DOM
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=101010&color=fff`;
  const [imgSrc, setImgSrc] = useState(avatar || fallbackAvatar);

  const cleanComment = comment
    ? comment.includes("(Original)")
      ? comment.split("(Original)")[1].trim()
      : comment.replace(/\(Translated by Google\)[\s\S]*/, "").trim()
    : "";

  return (
    <div className="group relative flex flex-col w-full md:w-[350px] transition-all duration-500 hover:-translate-y-1">
      {/* 1. Header / Avatar sécurisé (Plus de chevauchement possible) */}
      <div className="relative z-10 flex items-center gap-4 pl-8 translate-y-6">
        <div className="relative flex-shrink-0">
          <img
            src={imgSrc}
            alt={`Avatar de ${name}`}
            width={64}
            height={64}
            className="h-16 w-16 rounded-full border-2 border-white object-cover grayscale shadow-md transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:shadow-xl"
            onError={() => setImgSrc(fallbackAvatar)}
            unoptimized={
              imgSrc.startsWith("data:") ||
              imgSrc.startsWith("https://ui-avatars.com")
            }
          />
          {/* Badge Google plus visible et net */}
          <div className="absolute -bottom-1 -right-1 rounded-full bg-white p-1.5 shadow-md flex items-center justify-center">
            <Icon icon="logos:google-icon" className="text-[10px]" />
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm pr-4 py-1 rounded-r-md transition-all">
          <h5 className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary leading-tight line-clamp-1">
            {name}
          </h5>
          <p className="mt-0.5 text-[10px] font-medium tracking-widest text-gray-400 uppercase">
            {getRelativeTimeString(date)}
          </p>
        </div>
      </div>

      {/* 2. Le corps de l'avis */}
      <div className="flex flex-grow flex-col border border-gray-100 bg-white p-8 pt-10 shadow-sm transition-all duration-500 group-hover:border-or/30 group-hover:shadow-2xl">
        {/* Étoiles stylisées avec micro-animation au survol */}
        <div className="mb-4 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Icon
              key={i}
              icon="ic:round-star"
              className={`text-base transition-transform duration-300 group-hover:scale-110 ${
                i < starsCount ? "text-or" : "text-gray-100"
              }`}
              style={{ transitionDelay: `${i * 40}ms` }}
            />
          ))}
        </div>

        {/* Commentaire avec guillemet ornemental */}
        <div className="relative flex-grow">
          <Icon
            icon="fa:quote-left"
            className="absolute -left-3 -top-3 text-5xl text-gray-200 opacity-10 transition-all duration-500 group-hover:text-or group-hover:opacity-15"
          />
          <p className="relative z-10 text-sm font-light leading-relaxed italic text-gray-600">
            {cleanComment || comment}
          </p>
        </div>

        {/* Signature : La ligne d'or */}
        <div className="mt-6 flex items-center gap-2">
          <div className="h-[1px] w-8 bg-or transition-all duration-500 group-hover:w-16" />
          <div className="h-[4px] w-[4px] rounded-full bg-or opacity-0 transition-all duration-500 group-hover:scale-125 group-hover:opacity-100" />
        </div>
      </div>

      {/* Ombre de sol dynamique */}
      <div className="absolute -bottom-3 inset-x-6 h-6 bg-black/[0.04] blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
    </div>
  );
};

export default Review;

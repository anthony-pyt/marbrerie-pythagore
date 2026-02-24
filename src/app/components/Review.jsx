"use client";

import { Icon } from "@iconify/react";
import moment from "moment";
import "moment/locale/fr";
moment.locale("fr");

const Review = ({ note, date, name, comment, avatar }) => {
  const ratingMap = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
  const starsCount = typeof note === "string" ? ratingMap[note] : note;

  const cleanComment = comment
    ? comment.replace(/\(Translated by Google\)[\s\S]*/, "").trim()
    : "";

  return (
    <div className="group relative flex flex-col w-full md:w-[350px] mt-12 transition-all duration-500">
      {/* 1. Header / Avatar décalé (L'esprit ServiceCard) */}
      <div className="relative h-24 w-full">
        <div className="absolute left-8 top-0 flex items-center gap-4 z-10">
          <div className="relative">
            <img
              src={avatar}
              alt={name}
              className="w-16 h-16 object-cover grayscale group-hover:grayscale-0 transition-all duration-700 shadow-lg border-2 border-white rounded-full"
              onError={(e) =>
                (e.target.src = `https://ui-avatars.com/api/?name=${name}&background=secondary&color=fff`)
              }
            />
            {/* Petit badge Google */}
            <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
              <Icon icon="logos:google-icon" className="text-xs" />
            </div>
          </div>
          <div className="pt-2">
            <h5 className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary leading-none">
              {name}
            </h5>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
              {moment(date).fromNow()}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Le corps de l'avis (Boîte blanche surélevée) */}
      <div className="bg-white p-8 pt-12 shadow-sm border border-gray-100 transition-all duration-500 group-hover:shadow-xl group-hover:border-or/20 flex-grow flex flex-col">
        {/* Étoiles stylisées */}
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Icon
              key={i}
              icon="ic:round-star"
              className={`text-base ${i < starsCount ? "text-or" : "text-gray-100"}`}
            />
          ))}
        </div>

        {/* Commentaire avec guillemet stylisé */}
        <div className="relative flex-grow">
          <Icon
            icon="fa:quote-left"
            className="absolute -left-4 -top-2 text-gray-50 opacity-10 text-4xl group-hover:text-or/20 transition-colors"
          />
          <p className="text-sm leading-relaxed text-gray-600 italic font-light relative z-10">
            {cleanComment ||
              "L'excellence du travail de la pierre par Pythagore."}
          </p>
        </div>

        {/* Signature : La ligne d'or (identique à ServiceCard) */}
        <div className="mt-6">
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-8 bg-or transition-all duration-500 group-hover:w-16" />
            <div className="h-[4px] w-[4px] rounded-full bg-or opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        </div>
      </div>

      {/* Ombre de sol discrète */}
      <div className="absolute -bottom-2 inset-x-8 h-4 bg-black/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  );
};

export default Review;

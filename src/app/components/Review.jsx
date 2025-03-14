"use client";

import { Icon } from "@iconify/react";
import moment from "moment";
import "moment/locale/fr";
moment.locale("fr");

const Review = ({ note, date, name, comment, id }) => {
  const ratingMap = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
  };

  // Création d'un tableau avec autant d'éléments que la note pour les étoiles
  const stars = Array.from({ length: ratingMap[note] || 0 }, (_, index) => index);

  // Nettoyage du commentaire pour supprimer la traduction automatique de Google
  const cleanComment = comment
    ? comment.replace(/\(Translated by Google\)[\s\S]*/, "").trim()
    : "";

  return (
    <div className="bg-gray-100 rounded-3xl overflow-hidden w-80 h-64 p-6 m-4 flex flex-col justify-between">
      <div className="flex flex-col">
        <p className="font-semibold">{name}</p>
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500 mb-3">{moment(date).fromNow()}</p>
          <div className="flex items-center mb-4 justify-end">
            {/* Étoiles */}
            <div className="flex text-yellow-500">
              {stars.map((_, index) => (
                <Icon
                  key={index}
                  icon="line-md:star-filled"
                  className="text-xl"
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-700 truncate-multiline">
          {cleanComment}
        </p>
      </div>
      <div className="flex justify-end">
        <img
          src="/images/divers/google.png"
          alt="logo de google"
          className="h-6"
        />
      </div>
    </div>
  );
};

export default Review;

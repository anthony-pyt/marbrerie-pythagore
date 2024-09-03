"use client";

import { Icon } from "@iconify/react";
import moment from "moment";
import "moment/locale/fr";
moment.locale("fr");

const AvisClient = ({ note, date, name, text }) => {
  // Création d'un tableau avec autant d'éléments que la note pour les étoiles
  const stars = Array.from({ length: note }, (_, index) => index);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-80 h-52 p-6 m-4 border border-gray-200">
      <div className="flex flex-col">
        <p className="text-lg font-semibold mb-1">{name}</p>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500 mb-3">
            {moment(date, "DD/MM/y").fromNow()}
          </p>
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
        <p className="text-sm text-gray-700 truncate-multiline">{text}</p>
      </div>
    </div>
  );
};

export default AvisClient;

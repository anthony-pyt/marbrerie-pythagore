"use client";

import { Icon } from "@iconify/react";

const AvisClient = ({ note, date, name, text }) => {
  // Création d'un tableau avec autant d'éléments que la note pour les étoiles
  const stars = Array.from({ length: note }, (_, index) => index);

  return (
    <div className="rounded-xl bg-primary shadow w-64 h-72 p-5 overflow-hidden flex flex-col m-4">
      <div className="inline-block">
        <div className="inline-flex items-center">
          {stars.map((_, index) => (
            <Icon
              key={index} // Ajoute une clé unique pour chaque élément généré
              icon="line-md:star-filled"
              className="text-or min-w-6 max-w-6 min-h-6 max-h-6"
            />
          ))}
        </div>
      </div>
      <div className="overflow-hidden flex-1 mt-3">
        <div className="flex items-center justify-between space-x-2 mb-3">
          <h4>Avis</h4>
          <p className="font-title text-sm">du {date}</p>
        </div>
        <p className="font-title text-sm underline underline-offset-2">{name}</p>
        <p className="truncate-multiline text-sm">
          {text}
        </p>
      </div>
    </div>
  );
};

export default AvisClient;
